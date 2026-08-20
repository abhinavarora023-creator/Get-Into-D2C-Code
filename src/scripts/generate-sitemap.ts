import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "../lib/blog-posts";

const SITE_URL = "https://getintod2c.in";

export function generateSitemapXml(): string {
  const staticRoutes = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/for-founders", priority: "0.8", changefreq: "monthly" },
    { url: "/registerations", priority: "0.8", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
  ];

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const urlsXml = allRoutes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("generate-sitemap.ts")) {
  const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
  const xml = generateSitemapXml();
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`[SITEMAP] Generated ${outputPath} with ${BLOG_POSTS.length + 4} URLs.`);
}
