import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { BLOG_POSTS, getPost, type BlogSection } from "@/lib/blog-posts";

import { getBlogPostSchemas, createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
    return { post, others };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Not found, GetIntoD2C" }] };
    }
    return {
      meta: [
        { title: `${post.title} — GetIntoD2C` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://getintod2c.in/blog/${post.slug}`,
        },
        { property: "og:image", content: "/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: "/og-image.png" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://getintod2c.in/blog/${post.slug}`,
        },
      ],
      scripts: getBlogPostSchemas(post).map(createJsonLdScript),
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
        <h2 key={i} className="mt-14 font-serif text-3xl leading-tight md:text-4xl">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-10 font-serif text-2xl leading-tight">
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
        <div key={i} className="mt-8 overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#0a0a0a] text-white">
              <tr>
                {section.headers.map((h, j) => (
                  <th key={j} className="px-5 py-4 font-mono text-xs uppercase tracking-[0.2em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, j) => (
                <tr key={j} className="border-t border-black/10 odd:bg-white even:bg-black/[0.02]">
                  {row.map((cell, k) => (
                    <td key={k} className="px-5 py-4 align-top text-sm text-black/80 md:text-base">
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

function BlogPostPage() {
  const { post, others } = Route.useLoaderData();

  return (
    <main className="relative bg-white text-[#0a0a0a]">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 md:pt-48">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-black/60 transition-colors hover:text-[#e11d2a]"
        >
          <span aria-hidden>←</span> Back to journal
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/50">
          <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 text-[#e11d2a]">
            {post.category}
          </span>
          <span>{post.readTime}</span>
          <span aria-hidden>•</span>
          <span>{post.date}</span>
        </div>

        <h1 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-black/70">{post.excerpt}</p>

        <div className="mt-10 h-px w-full bg-black/10" />

        <div className="mt-4">
          {post.sections.map((section: BlogSection, i: number) => renderSection(section, i))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#0a0a0a] p-8 text-white md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d2a]">
            Build Your Brand
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            Ready to build a brand worth remembering?
          </h2>
          <p className="mt-4 text-white/70">
            GetIntoD2C is the launchpad for founders building the next generation of Indian consumer
            brands.
          </p>
          <a
            href="/#book"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c41a24]"
          >
            Start with us
            <span aria-hidden>→</span>
          </a>
        </div>
      </article>

      {others.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">Keep reading</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((p) => (
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
