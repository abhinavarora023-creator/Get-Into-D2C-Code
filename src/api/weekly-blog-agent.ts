import { createServerFn } from '@tanstack/react-start';
import { runWeeklyBlogAgent } from '@/lib/blog-agent-core';

export const triggerWeeklyBlogAgent = createServerFn({ method: 'POST' })
  .validator((data?: { secret?: string }) => data)
  .handler(async ({ data }) => {
    const cronSecret = process.env.CRON_SECRET || process.env.BLOG_AGENT_SECRET;
    if (cronSecret && data?.secret !== cronSecret) {
      throw new Error('Unauthorized: Invalid CRON_SECRET');
    }
    console.log('⚡ [Server Function] triggerWeeklyBlogAgent executed');
    return await runWeeklyBlogAgent();
  });
