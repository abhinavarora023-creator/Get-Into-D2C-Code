import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface TopicData {
  topic: string;
  category: string;
  keywords: string[];
  summary: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GeneratedBlogJson {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  faqs: FAQ[];
  meta_title: string;
  meta_description: string;
  category?: string;
}

export interface BlogAgentResult {
  success: boolean;
  count: number;
  posts: any[];
  error?: string;
  timestamp: string;
}

export async function runWeeklyBlogAgent(): Promise<BlogAgentResult> {
  const timestamp = new Date().toISOString();
  console.log(`🤖 BLOG AGENT — Execution Started: ${timestamp}`);

  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    '';
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
  const netlifyBuildHook = process.env.NETLIFY_BUILD_HOOK_URL || '';

  if (!supabaseUrl || !serviceRoleKey) {
    const errorMsg = 'Missing Supabase credentials (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required)';
    console.error(`❌ [Blog Agent Error] ${errorMsg}`);
    return { success: false, count: 0, posts: [], error: errorMsg, timestamp };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // STEP 1: Topic Deduplication (Fetch past 90 days topics from DB)
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentPosts, error: fetchErr } = await supabase
    .from('blog_posts')
    .select('title, slug')
    .gte('created_at', ninetyDaysAgo);

  if (fetchErr) {
    console.warn('⚠️ Warning fetching past blog posts from DB:', fetchErr.message);
  }

  const coveredTopicsText =
    recentPosts && recentPosts.length > 0
      ? recentPosts.map((p) => `- "${p.title}"`).join('\n')
      : '- None';

  // STEP 2: Research Topics via Google Gemini with Live Web Search
  let trendTopics: TopicData[] = [];

  if (geminiKey) {
    try {
      console.log('🔍 Researching trending Indian D2C industry topics via Gemini 2.0 Flash + Search Grounding...');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        tools: [{ googleSearch: {} }] as any,
      });

      const researchPrompt = `
You are an expert content strategist researching trending Indian Direct-to-Consumer (D2C) industry topics, quick-commerce news, performance marketing updates, logistics/RTO breakthroughs, and scaling stories from the past month.

TOPIC DEDUPLICATION:
Do NOT pick topics substantially similar to these already covered topics:
${coveredTopicsText}

Output a JSON array ONLY with 1 distinct timely object matching this exact format:
[
  {
    "topic": "Specific actionable topic title for Indian D2C founders",
    "category": "Playbook",
    "keywords": ["D2C", "India", "E-commerce", "Growth"],
    "summary": "2-sentence summary of why this is timely"
  }
]
`;

      const result = await model.generateContent(researchPrompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        trendTopics = JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn('⚠️ Gemini Research error, using fallback strategy topic:', err?.message || err);
    }
  } else {
    console.warn('⚠️ GOOGLE_GEMINI_API_KEY missing. Using fallback D2C topic strategy.');
  }

  if (!trendTopics || trendTopics.length === 0) {
    trendTopics = [
      {
        topic: 'How Quick-Commerce Platforms (Zepto, Blinkit, Instamart) Are Changing Indian D2C Distribution in 2026',
        category: 'Strategy',
        keywords: ['Quick-Commerce', 'D2C India', 'Distribution', 'Zepto', 'Blinkit'],
        summary: 'Indian D2C brands are leveraging quick-commerce as a primary customer discovery and instant replenishment channel.',
      },
    ];
  }

  // STEP 3: Generate Full Authoritative Article
  const insertedPosts: any[] = [];

  for (const trend of trendTopics) {
    let blog: GeneratedBlogJson;

    if (geminiKey) {
      try {
        console.log(`📝 Writing 1000-1200 word authoritative SEO post for: "${trend.topic}"...`);
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const articlePrompt = `
Write an in-depth, 1000-1200 word authoritative SEO blog post tailored specifically for Indian D2C brand founders on: "${trend.topic}".
Category: ${trend.category}
Keywords: ${trend.keywords.join(', ')}

GUIDELINES:
- Include real Indian market context (unit economics, Indian logistics, COD/RTO mitigation, GST, quick commerce, WhatsApp marketing).
- Use structured Markdown formatting with ## and ### headings, bullet points, and comparative markdown tables.
- Include actionable playbooks, margin breakdowns, and concrete step-by-step steps.

Return ONLY valid JSON matching this exact structure:
{
  "title": "SEO-optimized Title under 70 chars",
  "slug": "url-friendly-lowercase-slug",
  "excerpt": "Compelling 2-sentence summary",
  "meta_title": "Title tag under 60 chars",
  "meta_description": "Meta description under 155 chars",
  "faqs": [
    { "question": "Question 1", "answer": "Answer 1" },
    { "question": "Question 2", "answer": "Answer 2" },
    { "question": "Question 3", "answer": "Answer 3" }
  ],
  "body": "Full markdown body with ## and ### headings, lists, tables, and actionable insights"
}
`;

        const res = await model.generateContent(articlePrompt);
        const text = res.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('❌ Failed to parse JSON from Gemini article output');
          continue;
        }
        blog = JSON.parse(jsonMatch[0]);
      } catch (err: any) {
        console.error('❌ Article generation error:', err?.message || err);
        continue;
      }
    } else {
      // Fallback post when API key is missing
      blog = {
        title: trend.topic,
        slug: trend.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: trend.summary,
        meta_title: `${trend.topic} | GetIntoD2C`,
        meta_description: trend.summary.slice(0, 155),
        faqs: [
          {
            question: 'Why is quick-commerce critical for Indian D2C brands in 2026?',
            answer: 'Quick-commerce provides instant 10-minute delivery gratification, drastically boosting replenishment frequency and brand trial.',
          },
        ],
        body: `## Overview\n\n${trend.summary}\n\n## Key Takeaways for D2C Founders\n\n1. **Omnichannel Presence**: Combine storefront D2C with quick-commerce.\n2. **Unit Economics**: Maintain 70%+ gross margins to absorb logistics costs.`,
      };
    }

    const wordCount = blog.body.split(/\s+/).length;
    const cleanSlug = blog.slug || trend.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // STEP 4: Insert into Supabase Database
    console.log(`💾 Saving generated post to Supabase database (slug: "${cleanSlug}")...`);
    const { data: inserted, error: dbErr } = await supabase
      .from('blog_posts')
      .insert({
        slug: cleanSlug,
        title: blog.title,
        body: blog.body,
        excerpt: blog.excerpt,
        author: 'Editorial AI',
        category: blog.category || trend.category || 'Playbook',
        status: 'published',
        published_date: new Date().toISOString(),
        read_time_minutes: Math.max(3, Math.ceil(wordCount / 200)),
        faqs: blog.faqs || [],
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbErr) {
      console.error('❌ Database insertion failed:', dbErr.message);
    } else if (inserted) {
      console.log(`✅ Successfully published article: "${inserted.title}" (${cleanSlug})`);
      insertedPosts.push(inserted);
    }
  }

  // STEP 5: Trigger Netlify Build Hook (Redeployment)
  if (netlifyBuildHook && insertedPosts.length > 0) {
    try {
      console.log('🚀 Triggering Netlify Build Hook for site redeployment...');
      await fetch(netlifyBuildHook, { method: 'POST' });
    } catch (e: any) {
      console.error('❌ Failed to trigger Netlify build hook:', e?.message || e);
    }
  }

  return {
    success: true,
    count: insertedPosts.length,
    posts: insertedPosts,
    timestamp,
  };
}
