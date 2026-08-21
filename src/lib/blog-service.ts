import { createClient } from '@supabase/supabase-js';
import { BLOG_POSTS, type BlogPost, type BlogSection } from './blog-posts';

export type UnifiedBlogPost = BlogPost & {
  faqs?: { question: string; answer: string }[];
  meta_title?: string;
  meta_description?: string;
  bodyMarkdown?: string;
};

// Helper: Convert Markdown string into structured BlogSection[]
export function parseMarkdownToSections(markdown: string): BlogSection[] {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const sections: BlogSection[] = [];

  let currentParagraph = '';
  let currentList: string[] = [];
  let isNumberedList = false;

  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      sections.push({ type: 'p', text: currentParagraph.trim() });
      currentParagraph = '';
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumberedList) {
        sections.push({ type: 'ol', items: [...currentList] });
      } else {
        sections.push({ type: 'ul', items: [...currentList] });
      }
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      sections.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
    } else if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      sections.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
    } else if (line.startsWith('> ')) {
      flushParagraph();
      flushList();
      sections.push({ type: 'quote', text: line.replace(/^>\s+/, '') });
    } else if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      if (currentList.length > 0 && !isNumberedList) flushList();
      isNumberedList = true;
      currentList.push(line.replace(/^\d+\.\s+/, ''));
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      if (currentList.length > 0 && isNumberedList) flushList();
      isNumberedList = false;
      currentList.push(line.replace(/^[-*]\s+/, ''));
    } else {
      flushList();
      if (currentParagraph) {
        currentParagraph += ' ' + line;
      } else {
        currentParagraph = line;
      }
    }
  }

  flushParagraph();
  flushList();

  return sections;
}

export async function fetchSupabaseBlogPosts(): Promise<UnifiedBlogPost[]> {
  const supabaseUrl =
    typeof window !== 'undefined'
      ? import.meta.env.VITE_SUPABASE_URL
      : process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

  const supabaseKey =
    typeof window !== 'undefined'
      ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      : process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => {
      const parsedSections = parseMarkdownToSections(row.body || '');
      const year = row.published_date
        ? new Date(row.published_date).getFullYear().toString()
        : '2026';

      return {
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt || '',
        readTime: `${row.read_time_minutes || 5} min read`,
        category: row.category || 'Playbook',
        date: year,
        sections: parsedSections.length > 0 ? parsedSections : [{ type: 'p', text: row.body || '' }],
        faqs: Array.isArray(row.faqs) ? row.faqs : [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        bodyMarkdown: row.body,
      };
    });
  } catch {
    return [];
  }
}

export async function getAllBlogPosts(): Promise<UnifiedBlogPost[]> {
  const dbPosts = await fetchSupabaseBlogPosts();
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));

  // Merge static posts that aren't overridden in DB
  const staticPostsFiltered = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug));
  return [...dbPosts, ...staticPostsFiltered];
}

export async function getBlogPostBySlug(slug: string): Promise<UnifiedBlogPost | null> {
  const all = await getAllBlogPosts();
  return all.find((p) => p.slug === slug) || null;
}
