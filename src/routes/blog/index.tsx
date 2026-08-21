import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getAllBlogPosts, type UnifiedBlogPost } from "@/lib/blog-service";
import { getBlogIndexSchemas, createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  loader: async () => {
    const posts = await getAllBlogPosts();
    return { posts };
  },
  head: () => ({
    meta: [
      {
        title:
          "D2C Journal & Playbooks — Case Studies, Unit Economics & GTM | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Field notes, successful D2C brand case studies in India, GTM playbooks, unit economics templates, CAC reduction, and launch checklists for founders.",
      },
      {
        name: "keywords",
        content:
          "Successful D2C brand case studies India, How to start a D2C brand in India, D2C unit economics template, How to fix leaking margins in D2C, How to lower CAC D2C, D2C brand positioning framework, D2C launch checklist",
      },
      {
        property: "og:title",
        content:
          "D2C Journal & Playbooks — Case Studies, Unit Economics & GTM | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Proven case studies, GTM frameworks, and margin optimization playbooks for D2C founders in India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "D2C Journal & Playbooks — GetIntoD2C",
      },
      {
        name: "twitter:description",
        content:
          "Case studies, unit economics, and actionable playbooks on building profitable D2C brands in India.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/blog" }],
    scripts: getBlogIndexSchemas().map(createJsonLdScript),
  }),
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <main className="relative bg-white text-[#0a0a0a]">
      <Nav />
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-40 md:pt-48">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d2a]">
          Journal
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">
          Field notes for D2C founders.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-black/70">
          Case studies, playbooks and lessons from the brands rewriting Indian
          consumer. Written for founders in the trenches.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="grid gap-6 md:gap-8">
          {posts.map((post: UnifiedBlogPost) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block rounded-3xl border border-black/10 bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-[#e11d2a]/50 hover:shadow-[0_20px_60px_-30px_rgba(225,29,42,0.35)] md:p-10"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/50">
                <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 text-[#e11d2a]">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
                <span aria-hidden>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="mt-5 font-serif text-2xl leading-tight transition-colors group-hover:text-[#e11d2a] md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 text-black/70 md:text-lg">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a]">
                Read the piece
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
