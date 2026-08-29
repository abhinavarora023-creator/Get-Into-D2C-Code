import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env / .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });
dotenv.config({ path: resolve(__dirname, '../.env') });

async function run() {
  console.log('--- 🤖 Triggering weekly-blog-agent ---');
  const funcModule = await import('../netlify/functions/weekly-blog-agent.ts');
  const handler = funcModule.default;
  const fakeReq = new Request('https://localhost/weekly-blog-agent', { method: 'POST' });
  const response = await handler(fakeReq);
  const data = await response.json();
  console.log('\n--- 📊 Execution Result ---');
  console.log(JSON.stringify(data, null, 2));
}

run().catch(console.error);

