import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BLOG_POSTS } from './blog-posts.ts';

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
  read_time_minutes?: number;
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

  const isSupabaseConnected = Boolean(supabaseUrl && serviceRoleKey);
  let supabase: any = null;

  if (isSupabaseConnected) {
    try {
      supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        realtime: {
          transport: typeof WebSocket !== 'undefined' ? WebSocket : (null as any),
        },
      });
    } catch (e: any) {
      console.warn('⚠️ Could not initialize Supabase client:', e?.message || e);
    }
  } else {
    console.warn('⚠️ [Blog Agent Warning] Supabase credentials not connected. Running agent in generation/preview mode.');
  }

  // STEP 1: Topic Deduplication (Fetch past 90 days topics from DB + static posts)
  const staticTopics = BLOG_POSTS.map((p) => `- "${p.title}"`);
  let dbTopicsText: string[] = [];

  if (supabase) {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentPosts, error: fetchErr } = await supabase
      .from('blog_posts')
      .select('title, slug')
      .gte('created_at', ninetyDaysAgo);

    if (fetchErr) {
      console.warn('⚠️ Warning fetching past blog posts from DB:', fetchErr.message);
    } else if (recentPosts && recentPosts.length > 0) {
      dbTopicsText = recentPosts.map((p: any) => `- "${p.title}"`);
    }
  }

  const coveredTopicsText = [...staticTopics, ...dbTopicsText].join('\n') || '- None';

  // STEP 2: Research Topics via Google Gemini with Live Web Search
  let trendTopics: TopicData[] = [];

  if (geminiKey) {
    try {
      console.log('🔍 Researching trending Indian D2C industry topics via Gemini 2.0 Flash + Search Grounding...');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
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
    const fallbackTopicPool: (TopicData & { faqs: FAQ[]; body: string })[] = [
      {
        topic: 'How Quick-Commerce Platforms (Zepto, Blinkit, Instamart) Are Changing Indian D2C Distribution in 2026',
        category: 'Strategy',
        keywords: ['Quick-Commerce', 'D2C India', 'Distribution', 'Zepto', 'Blinkit'],
        summary: 'Indian D2C brands are leveraging quick-commerce as a primary customer discovery and instant replenishment channel.',
        faqs: [
          {
            question: 'Why is quick-commerce critical for Indian D2C brands in 2026?',
            answer: 'Quick-commerce provides instant 10-minute delivery gratification, drastically boosting replenishment frequency and brand trial.',
          },
          {
            question: 'How should D2C brands mitigate Cash on Delivery (COD) Return-to-Origin (RTO)?',
            answer: 'Implement automated WhatsApp order verification prior to dispatch and offer small prepaid discounts.',
          },
          {
            question: 'What unit economics margin threshold is required for scaling on quick commerce?',
            answer: 'Brands must maintain gross margins of 65%–75% to absorb CAC, dark store margins, and platform delivery commissions.',
          },
        ],
        body: `## Executive Overview\n\nIndian D2C brands are leveraging quick-commerce as a primary customer discovery and instant replenishment channel.\n\n## 1. Quick-Commerce as a Primary Discovery Engine\n\nIn 2026, Indian D2C brands cannot rely solely on Meta and Google performance ads. Platforms like Zepto, Blinkit, and Swiggy Instamart have transformed from emergency grocery apps into high-converting product discovery channels.\n\n### Key Distribution Strategies\n- **Dark Store Staging**: Keep high-velocity SKUs in regional dark stores.\n- **Impulse Pack Sizes**: Launch trial packs specifically designed for instant checkout.\n\n## 2. Unit Economics and RTO Management\n\nReturn to Origin (RTO) remains the single biggest profit drain for Indian D2C merchants.\n\n| Metric | Industry Standard | Optimized Target |\n|---|---|---|\n| Gross Margin | 55% | 75%+ |\n| COD RTO Rate | 25% | < 12% |\n| Repeat Customer Rate | 15% | 35% |\n\n## Actionable Checklist for Founders\n\n1. Audit gross margins before spending on performance marketing.\n2. Implement pre-dispatch order verification via WhatsApp API.\n3. Expand into dark store quick-commerce for top 20% bestseller items.`,
      },
      {
        topic: 'Mastering WhatsApp Retention and COD RTO Reduction for Indian D2C Brands',
        category: 'Operations',
        keywords: ['WhatsApp Automation', 'COD Verification', 'RTO Reduction', 'Retention', 'Logistics'],
        summary: 'How leading Indian consumer brands use automated WhatsApp conversational flows to lower Return-to-Origin below 10% and drive repeat purchases.',
        faqs: [
          {
            question: 'How much does WhatsApp order verification reduce RTO rates?',
            answer: 'Pre-dispatch address verification and phone confirmation via WhatsApp typically reduces COD RTO rates by 35% to 50%.',
          },
          {
            question: 'What is the best incentive to convert COD to prepaid on WhatsApp?',
            answer: 'Offering instant cashback, extra reward points, or a flat 5% discount at order confirmation reliably converts 20-30% of COD buyers to UPI.',
          },
          {
            question: 'When should retention re-order messages be triggered?',
            answer: 'Trigger automated replenishment alerts based on consumption cycle data (e.g. Day 25 for a 30-day consumable skincare or nutrition product).',
          },
        ],
        body: `## Executive Summary\n\nCash on Delivery (COD) remains both a revenue unlock and an operational nightmare for Indian D2C businesses. Automated WhatsApp API workflows have emerged as the single most effective tool for verifying orders, slashing RTO, and compounding repeat customer lifetime value.\n\n## 1. The Pre-Dispatch Verification Funnel\n\nUnconfirmed COD orders represent dead freight and tied-up inventory. Implementing an automated WhatsApp bot at the moment of order placement ensures:\n- Pin-code and address validation\n- Intent confirmation before label printing\n- Instant UPI payment switch incentives\n\n## 2. Retention via Conversational Commerce\n\nEmail marketing in India suffers from low open rates (~12%), while WhatsApp delivers 80%+ open rates within 15 minutes of broadcast.\n\n| Metric | Email Marketing | WhatsApp Flow |\n|---|---|---|\n| Open Rate | 12% - 15% | 85% - 92% |\n| Click-Through Rate | 1.8% | 14.5% |\n| Conversion Rate | 0.6% | 4.2% |\n\n## Actionable Framework for Founders\n\n1. Integrate WhatsApp Business API with Shopify and Shiprocket/Delhivery.\n2. Enable automatic cancellation for unverified high-risk COD orders.\n3. Build consumable replenishment flows tailored to customer re-order intervals.`,
      },
      {
        topic: 'The 2026 Meta Ads & Performance Marketing Playbook: Controlling CAC at Scale',
        category: 'Growth',
        keywords: ['Meta Ads', 'CAC Control', 'Creative Strategy', 'First-Party Data', 'Performance Marketing'],
        summary: 'A tactical blueprint for scaling Meta and Google ad spend profitably while keeping Customer Acquisition Cost within healthy unit economic limits.',
        faqs: [
          {
            question: 'What is a sustainable Blended CAC ratio for Indian D2C brands?',
            answer: 'A healthy brand should target a Customer Acquisition Cost of under 30% of First-Order AOV, and under 15% of 6-month Customer Lifetime Value.',
          },
          {
            question: 'How many ad creatives should a D2C brand test weekly?',
            answer: 'Scaling brands spending 5L+ monthly should test 15-20 new creative iterations (hooks, angles, UGC, visual formats) weekly.',
          },
          {
            question: 'Should brands use Advantage+ Shopping Campaigns (ASC)?',
            answer: 'Yes, but pair ASC with separate broad-targeting concept testing ad sets to discover breakout winning hooks without burning budget.',
          },
        ],
        body: `## Executive Overview\n\nRising ad platform CPMs and signal degradation mean generic product ads no longer scale profitably. Successful Indian D2C brands in 2026 treat creative production as their primary targeting lever.\n\n## 1. The Creative Diversity Matrix\n\nTo prevent ad fatigue and expand total addressable audience:\n- **Problem-Agitation Hooks**: Highlight painful daily micro-frustrations.\n- **Founder-Led Storytelling**: Authentic breakdown of product formulation and mission.\n- **Scientific / Ingredient Teardowns**: Lab tests, certifications, and before-after evidence.\n\n## 2. Blended ROAS vs In-Platform ROAS\n\n| Stage | In-Platform ROAS Target | Marketing Efficiency Ratio (MER) |\n|---|---|---|\n| Early Launch (< 10L/mo) | 2.5x - 3.2x | 3.5x+ |\n| Growth Scaling (10L - 50L/mo) | 1.8x - 2.4x | 2.8x - 3.2x |\n| Omnichannel Scale (50L+/mo) | 1.5x - 2.0x | 2.2x - 2.6x |\n\n## Actionable Steps for Growth Teams\n\n1. Move from static images to dynamic 15-second mobile-first UGC video formats.\n2. Optimize landing pages for sub-2-second mobile load time.\n3. Track weekly MER (Total Revenue / Total Marketing Spend) as the North Star.`,
      },
    ];

    // Pick the first topic that hasn't been covered in past posts
    const availableTopic = fallbackTopicPool.find(
      (item) => !coveredTopicsText.toLowerCase().includes(item.topic.toLowerCase().slice(0, 30))
    ) || fallbackTopicPool[0];

    trendTopics = [availableTopic];
  }

  // STEP 3: Generate Full Authoritative Article
  const generatedPosts: any[] = [];

  for (const trend of trendTopics) {
    let blog: GeneratedBlogJson;

    if (geminiKey) {
      try {
        console.log(`📝 Writing 1000-1200 word authoritative SEO post for: "${trend.topic}"...`);
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

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
  "read_time_minutes": 6,
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
      const matchedFallback = (trend as any).body
        ? (trend as any)
        : null;

      blog = {
        title: trend.topic,
        slug: trend.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: trend.summary,
        meta_title: `${trend.topic} | GetIntoD2C`,
        meta_description: trend.summary.slice(0, 155),
        read_time_minutes: 6,
        faqs: matchedFallback?.faqs || [
          {
            question: `Why is this topic critical for Indian D2C brands in 2026?`,
            answer: 'Disciplined execution, unit-economic rigor, and customer retention systems are essential to scaling profitably.',
          },
        ],
        body: matchedFallback?.body || `## Overview\n\n${trend.summary}\n\n## Strategic Takeaways\n\n1. **Execution Rigor**: Build compounding retention flywheels.\n2. **Margin Protection**: Maintain 70%+ gross margins.`,
      };
    }

    const wordCount = blog.body.split(/\s+/).length;
    const cleanSlug = blog.slug || trend.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const postPayload = {
      slug: cleanSlug,
      title: blog.title,
      body: blog.body,
      excerpt: blog.excerpt,
      author: 'Get Into D2C Editorial Agent',
      category: blog.category || trend.category || 'Playbook',
      status: 'published',
      published_date: new Date().toISOString(),
      read_time_minutes: blog.read_time_minutes || Math.max(3, Math.ceil(wordCount / 200)),
      faqs: blog.faqs || [],
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      created_at: new Date().toISOString(),
    };

    // STEP 4: Insert into Supabase Database (if available)
    if (supabase) {
      console.log(`💾 Saving generated post to Supabase database (slug: "${cleanSlug}")...`);
      const { data: inserted, error: dbErr } = await supabase
        .from('blog_posts')
        .insert(postPayload)
        .select()
        .single();

      if (dbErr) {
        console.error('❌ Database insertion failed:', dbErr.message);
        generatedPosts.push(postPayload);
      } else if (inserted) {
        console.log(`✅ Successfully published article to Supabase: "${inserted.title}" (${cleanSlug})`);
        generatedPosts.push(inserted);
      }
    } else {
      console.log(`ℹ️ [Preview Mode] Generated post ready: "${postPayload.title}" (${cleanSlug})`);
      generatedPosts.push(postPayload);
    }
  }

  // STEP 5: Trigger Netlify Build Hook (Redeployment)
  if (netlifyBuildHook && generatedPosts.length > 0) {
    try {
      console.log('🚀 Triggering Netlify Build Hook for site redeployment...');
      await fetch(netlifyBuildHook, { method: 'POST' });
    } catch (e: any) {
      console.error('❌ Failed to trigger Netlify build hook:', e?.message || e);
    }
  }

  return {
    success: true,
    count: generatedPosts.length,
    posts: generatedPosts,
    timestamp,
  };
}

