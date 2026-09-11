import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "../lib/blog-posts.ts";
import { WEBINARS } from "../lib/webinars.ts";
import { SERVICES } from "../lib/services-data.ts";
import { CATEGORIES } from "../lib/categories-data.ts";
import { CASE_STUDIES } from "../lib/case-studies-data.ts";
import { RESOURCES } from "../lib/resources-data.ts";

const SITE_URL = "https://getintod2c.in";

interface RouteItem {
  url: string;
  priority: string;
  changefreq: string;
}

export function generateSitemapXml(): string {
  // 1. Core Static Hubs & Information Pages
  const staticRoutes: RouteItem[] = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.9", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "weekly" },
    { url: "/categories", priority: "0.9", changefreq: "weekly" },
    { url: "/case-studies", priority: "0.9", changefreq: "weekly" },
    { url: "/resources", priority: "0.9", changefreq: "weekly" },
    { url: "/for-founders", priority: "0.8", changefreq: "monthly" },
    { url: "/webinars", priority: "0.8", changefreq: "weekly" },
    { url: "/registrations", priority: "0.8", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "daily" },
    { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" },
  ];

  // 2. Specialized Services
  const serviceRoutes: RouteItem[] = SERVICES.map((service) => ({
    url: `/services/${service.slug}`,
    priority: "0.85",
    changefreq: "monthly",
  }));

  // 3. Category Verticals
  const categoryRoutes: RouteItem[] = CATEGORIES.map((category) => ({
    url: `/categories/${category.slug}`,
    priority: "0.85",
    changefreq: "monthly",
  }));

  // 4. Case Studies & Teardowns
  const caseStudyRoutes: RouteItem[] = CASE_STUDIES.map((cs) => ({
    url: `/case-studies/${cs.slug}`,
    priority: "0.85",
    changefreq: "monthly",
  }));

  // 5. Practical Founder Resources & Frameworks
  const resourceRoutes: RouteItem[] = RESOURCES.map((resource) => ({
    url: `/resources/${resource.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  // 6. Webinars & Masterclasses
  const webinarRoutes: RouteItem[] = WEBINARS.map((webinar) => ({
    url: `/webinars/${webinar.slug}`,
    priority: "0.75",
    changefreq: "monthly",
  }));

  // 7. Journal / Blog Posts
  const blogRoutes: RouteItem[] = BLOG_POSTS.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  // Combine and de-duplicate
  const seen = new Set<string>();
  const allRoutes: RouteItem[] = [];

  for (const r of [
    ...staticRoutes,
    ...serviceRoutes,
    ...categoryRoutes,
    ...caseStudyRoutes,
    ...resourceRoutes,
    ...webinarRoutes,
    ...blogRoutes,
  ]) {
    if (!seen.has(r.url)) {
      seen.add(r.url);
      allRoutes.push(r);
    }
  }

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

const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
const xml = generateSitemapXml();
fs.writeFileSync(outputPath, xml, "utf-8");
console.log(`[SITEMAP] Generated ${outputPath} successfully.`);
