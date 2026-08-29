import type { Config } from "@netlify/functions";
import { runWeeklyBlogAgent } from "../../src/lib/blog-agent-core.ts";

export default async (req: Request) => {
  console.log("⚡ [Netlify Scheduled Function] weekly-blog-agent triggered");
  try {
    const result = await runWeeklyBlogAgent();
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ Netlify Function Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Scheduled trigger: runs every Monday at 06:00 UTC
export const config: Config = {
  schedule: "0 6 * * 1",
};
