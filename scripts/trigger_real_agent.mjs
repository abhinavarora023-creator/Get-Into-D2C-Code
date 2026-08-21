import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env / .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });
dotenv.config({ path: resolve(__dirname, '../.env') });

async function run() {
  console.log('--- 🤖 Triggering weekly-blog-agent locally ---');
  
  // Dynamic import of TS module using tsx or compiled module
  try {
    const { runWeeklyBlogAgent } = await import('../src/lib/blog-agent-core.ts');
    const result = await runWeeklyBlogAgent();
    console.log('\n--- 📊 Agent Run Result ---');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error running blog agent locally:', err);
  }
}

run().catch(console.error);
