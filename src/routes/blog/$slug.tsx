import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { type BlogSection, EDITORIAL_AUTHOR } from "@/lib/blog-posts";
import { getBlogPostBySlug, getAllBlogPosts, type UnifiedBlogPost } from "@/lib/blog-service";
import { getBlogPostSchemas, getFAQPageSchema, createJsonLdScript, BASE_URL } from "@/lib/seo-schema";
import { SERVICES } from "@/lib/services-data";
import { CATEGORIES } from "@/lib/categories-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { ArrowUpRight, BookOpen, Layers, Users, Video, ShieldCheck, Briefcase } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) throw notFound();
    const allPosts = await getAllBlogPosts();
    const others = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
    return { post, others };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Not found | GetIntoD2C" }] };
    }

    const schemas = getBlogPostSchemas(post).map(createJsonLdScript);
    if (post.faqs && post.faqs.length > 0) {
      schemas.push(createJsonLdScript(getFAQPageSchema(post.faqs)));
    }

    const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

    return {
      meta: [
        { title: `${post.meta_title || post.title} | GetIntoD2C Journal` },
        { name: "description", content: post.meta_description || post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        { property: "og:image", content: `${BASE_URL}/og-image.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: `${BASE_URL}/og-image.png` },
      ],
      links: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
      scripts: schemas,
    };
  },
});

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "p":
      return (
        <p key={i} className="mt-6 text-lg leading-relaxed text-black/80">
          {section.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={i}
          className="mt-14 font-serif text-3xl leading-tight md:text-4xl text-[#0a0a0a]"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-10 font-serif text-2xl leading-tight text-[#0a0a0a]">
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={i} className="mt-6 space-y-3">
          {section.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-lg text-black/80">
              <span
                aria-hidden
                className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#e11d2a]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mt-6 space-y-4 counter-reset-[step]">
          {section.items.map((item, j) => (
            <li key={j} className="flex gap-4 text-lg text-black/80">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] font-mono text-xs text-white">
                {j + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-10 border-l-4 border-[#e11d2a] bg-black/[0.03] p-6 md:p-8"
        >
          <p className="font-serif text-2xl italic leading-snug text-black md:text-3xl">
            &ldquo;{section.text}&rdquo;
          </p>
          {section.cite ? (
            <footer className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-black/60">
              {section.cite}
            </footer>
          ) : null}
        </blockquote>
      );
    case "table":
      return (
        <div
          key={i}
          className="mt-8 overflow-x-auto rounded-2xl border border-black/10"
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#0a0a0a] text-white">
              <tr>
                {section.headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-5 py-4 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, j) => (
                <tr
                  key={j}
                  className="border-t border-black/10 odd:bg-white even:bg-black/[0.02]"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className="px-5 py-4 align-top text-sm text-black/80 md:text-base"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/**
 * Contextual discovery helper: maps post topics to relevant studio services and category hubs
 */
function getRelatedResources(post: UnifiedBlogPost) {
  const s = `${post.slug} ${post.title} ${post.category}`.toLowerCase();

  let serviceSlugs = ["d2c-brand-audit", "d2c-growth"];
  let categorySlugs = ["fmcg", "skincare"];
  let caseStudySlugs = ["gowhipped", "bakedbuzz"];

  if (s.includes("quick-commerce") || s.includes("distribution") || s.includes("launch")) {
    serviceSlugs = ["d2c-gtm-strategy", "d2c-growth"];
    categorySlugs = ["fmcg", "healthy-snacking"];
    caseStudySlugs = ["gowhipped", "bakedbuzz"];
  } else if (s.includes("bluorng") || s.includes("streetwear") || s.includes("bonkers")) {
    serviceSlugs = ["d2c-positioning", "d2c-retention"];
    categorySlugs = ["fashion-accessories", "skincare"];
    caseStudySlugs = ["bluorng"];
  } else if (s.includes("margins") || s.includes("cac") || s.includes("unit economics")) {
    serviceSlugs = ["d2c-brand-audit", "d2c-cro"];
    categorySlugs = ["health-supplements", "skincare"];
    caseStudySlugs = ["gowhipped", "plan-your-legacy"];
  } else if (s.includes("repeat") || s.includes("retention") || s.includes("order rate")) {
    serviceSlugs = ["d2c-retention", "d2c-cro"];
    categorySlugs = ["skincare", "fmcg"];
    caseStudySlugs = ["foxtale", "the-whole-truth"];
  } else if (s.includes("positioning") || s.includes("pricing")) {
    serviceSlugs = ["d2c-positioning", "d2c-brand-audit"];
    categorySlugs = ["beverages", "healthy-snacking"];
    caseStudySlugs = ["bakedbuzz", "the-whole-truth"];
  } else if (s.includes("niche") || s.includes("fail") || s.includes("checklist")) {
    serviceSlugs = ["d2c-gtm-strategy", "d2c-brand-audit"];
    categorySlugs = ["health-supplements", "beverages"];
    caseStudySlugs = ["plan-your-legacy", "bennys-bowl"];
  } else if (s.includes("case-studies") || s.includes("successful-d2c")) {
    caseStudySlugs = ["foxtale", "the-whole-truth", "bluorng"];
  }

  const matchedServices = SERVICES.filter((srv) => serviceSlugs.includes(srv.slug));
  const matchedCategories = CATEGORIES.filter((cat) => categorySlugs.includes(cat.slug));
  const matchedCaseStudies = CASE_STUDIES.filter((cs) => caseStudySlugs.includes(cs.slug));

  return { matchedServices, matchedCategories, matchedCaseStudies };
}

function BlogPostPage() {
  const { post, others } = Route.useLoaderData();
  const { matchedServices, matchedCategories, matchedCaseStudies } = getRelatedResources(post);

  // Author attribution with standardized fallback
  const author = post.author || EDITORIAL_AUTHOR;

  return (
    <main className="relative bg-white text-[#0a0a0a]">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 pb-16 pt-40 md:pt-48">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-black/60 transition-colors hover:text-[#e11d2a]"
        >
          <span aria-hidden>←</span> Back to journal
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/50">
          <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 text-[#e11d2a] font-medium">
            {post.category}
          </span>
          <span>{post.readTime}</span>
          <span aria-hidden>•</span>
          <span>{post.date}</span>
        </div>

        <h1 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl text-[#0a0a0a]">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-black/70">
          {post.excerpt}
        </p>

        {/* Top Author Metadata byline */}
        <div className="mt-8 flex items-center gap-3 border-y border-black/10 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0a0a] text-xs font-semibold text-white">
            {author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-black">{author.name}</div>
            <div className="text-xs text-black/50">{author.role}</div>
          </div>
        </div>

        <div className="mt-4">
          {post.sections.map((section: BlogSection, i: number) =>
            renderSection(section, i),
          )}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16 rounded-3xl border border-black/10 bg-black/[0.02] p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {post.faqs.map((faq: { question: string; answer: string }, idx: number) => (
                <div key={idx} className="border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-lg text-black">{faq.question}</h3>
                  <p className="mt-2 text-black/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reusable Author Profile Card */}
        <div className="mt-16 rounded-3xl border border-black/10 bg-[#f9f9f9] p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-base font-bold text-white">
              {author.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
                Published By
              </div>
              <h3 className="text-lg font-medium text-black">{author.name}</h3>
              <p className="text-xs text-black/60">{author.role}</p>
              <p className="pt-2 text-sm text-black/75 leading-relaxed">
                {author.bio}
              </p>
              <div className="pt-2">
                <a
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#e11d2a] hover:underline"
                >
                  Learn more about GetIntoD2C &amp; Parlexa &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-12 rounded-3xl bg-[#0a0a0a] p-8 text-white md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d2a]">
            Build Your Brand
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            Ready to build a brand worth remembering?
          </h2>
          <p className="mt-4 text-white/70">
            GetIntoD2C is the launchpad and growth studio for founders building the next
            generation of Indian consumer brands.
          </p>
          <a
            href="/#book"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c41a24]"
          >
            Schedule Diagnostic Brief
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </article>

      {/* Reusable Related Resources: Studio Services & Category Frameworks */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="border-t border-black/10 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d2a]">
                Explore Solutions
              </p>
              <h2 className="mt-2 font-serif text-2xl md:text-3xl text-black">
                Related Studio Capabilities &amp; Category Frameworks
              </h2>
            </div>
            <a
              href="/services"
              className="hidden md:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/70 hover:text-[#e11d2a]"
            >
              All Services <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matchedServices.slice(0, 2).map((srv) => (
              <a
                key={srv.slug}
                href={`/services/${srv.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-black/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-black/50">
                    <span>Studio Service</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-[#e11d2a]" />
                  </div>
                  <h3 className="mt-2 font-serif text-base text-black group-hover:text-[#e11d2a] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs text-black/60 line-clamp-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <span className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#e11d2a]">
                  Service Details &rarr;
                </span>
              </a>
            ))}

            {matchedCategories.slice(0, 2).map((cat) => (
              <a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-black/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-black/50">
                    <span>Category Playbook</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-[#e11d2a]" />
                  </div>
                  <h3 className="mt-2 font-serif text-base text-black group-hover:text-[#e11d2a] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-black/60 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
                <span className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#e11d2a]">
                  View Sector Playbook &rarr;
                </span>
              </a>
            ))}

            {matchedCaseStudies.slice(0, 2).map((cs) => (
              <a
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:border-black/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-black/50">
                    <span>{cs.isTeardown ? "Research Teardown" : "Case Study"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-[#e11d2a]" />
                  </div>
                  <h3 className="mt-2 font-serif text-base text-black group-hover:text-[#e11d2a] transition-colors">
                    {cs.brand} — {cs.category}
                  </h3>
                  <p className="mt-2 text-xs text-black/60 line-clamp-2 leading-relaxed">
                    {cs.subtitle}
                  </p>
                </div>
                <span className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#e11d2a]">
                  Read Case Study &rarr;
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-black">
                  Watch The Proven Playbook to Build a D2C Brand in India
                </p>
                <p className="text-xs text-black/60">
                  Full recorded masterclass teardown with angel investors and 3X founders.
                </p>
              </div>
            </div>
            <a
              href="/webinars/proven-playbook-to-build-a-d2c-brand"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-medium text-white hover:bg-black/80 transition-colors"
            >
              Watch Recording
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Further Reading */}
      {others.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            Keep reading
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((p: UnifiedBlogPost) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-2xl border border-black/10 p-6 transition-all hover:-translate-y-0.5 hover:border-[#e11d2a]/50 hover:shadow-[0_20px_60px_-30px_rgba(225,29,42,0.35)]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e11d2a]">
                  {p.category}
                </p>
                <h3 className="mt-3 font-serif text-xl leading-snug transition-colors group-hover:text-[#e11d2a]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-black/60">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
