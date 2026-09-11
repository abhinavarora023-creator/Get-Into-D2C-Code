import { BLOG_POSTS, type BlogPost } from "./blog-posts";

export const BASE_URL = "https://getintod2c.in";
export const SITE_URL = BASE_URL;
const LOGO_URL = "https://getintod2c.in/getintod2c-logo.png";

/**
 * Utility to turn JSON-LD schema objects into TanStack Router script definitions
 */
export function createJsonLdScript(schema: Record<string, any> | Array<Record<string, any>>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema),
  };
}

/**
 * 1. Homepage Schemas: Organization, WebSite, 6 Services, 6 FAQs
 */
export function getHomepageSchemas() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "GetIntoD2C",
    legalName: "GetIntoD2C (A Unit of Parlexa)",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa.",
    parentOrganization: {
      "@type": "Organization",
      name: "Parlexa",
      url: "https://parlexa.in",
      foundingDate: "2013",
    },
    knowsAbout: [
      "D2C Brand Building",
      "GTM Strategy",
      "Brand Audit",
      "Unit Economics Optimization",
      "Customer Acquisition Cost Optimization",
      "Conversion Rate Optimization",
      "Customer Retention Systems",
      "Omnichannel Launch",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "GetIntoD2C",
    url: SITE_URL,
    description:
      "India-focused D2C growth studio and founder community for consumer brands.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const services = [
    {
      title: "D2C Brand Audit",
      slug: "d2c-brand-audit",
      serviceType: "D2C Brand Audit & Margin Optimization",
      description:
        "Comprehensive diagnostic of positioning, unit economics, contribution margins, and marketing leakage.",
    },
    {
      title: "Brand Positioning & Identity",
      slug: "d2c-positioning",
      serviceType: "Brand Positioning & Identity Architecture",
      description:
        "Defensible market positioning, whitespace analysis, customer persona mapping, and brand narrative design.",
    },
    {
      title: "Growth Engine & Performance",
      slug: "d2c-growth",
      serviceType: "Paid Acquisition & Funnel Architecture",
      description:
        "Full-funnel Meta and Google acquisition architecture engineered for scalable payback periods.",
    },
    {
      title: "Go-To-Market (GTM) Strategy",
      slug: "d2c-gtm-strategy",
      serviceType: "Omnichannel Launch & Channel Strategy",
      description:
        "Phased launch roadmaps, channel sequencing across Shopify, Amazon, and Quick Commerce.",
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      slug: "d2c-cro",
      serviceType: "E-Commerce CRO & Checkout Optimization",
      description:
        "Mobile UX friction elimination, average order value expansion, and RTO risk mitigation.",
    },
    {
      title: "Customer Retention Systems",
      slug: "d2c-retention",
      serviceType: "Retention & Lifecycle Marketing",
      description:
        "Automated WhatsApp workflows, email replenishment sequences, and VIP repurchase loops.",
    },
  ];

  const serviceSchemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.serviceType,
    description: s.description,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GetIntoD2C?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. It operates as a specialized growth business unit of Parlexa.",
        },
      },
      {
        "@type": "Question",
        name: "Who is GetIntoD2C for, and where does it operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GetIntoD2C is built specifically for founders and operators of Indian consumer brands. We serve early-stage founders launching new concepts as well as revenue-stage founders looking to scale profitably.",
        },
      },
      {
        "@type": "Question",
        name: "What services does the Growth Studio offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our studio provides six core disciplines: Brand Audit, Brand Positioning & Identity, Growth Engine, Go-To-Market Strategy, Conversion Rate Optimization (CRO), and Customer Retention Systems.",
        },
      },
      {
        "@type": "Question",
        name: "Which consumer categories does GetIntoD2C specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We focus on six high-potential Indian consumer sectors: Skincare & Personal Care, FMCG, Healthy Snacking, Health Supplements & Nutraceuticals, Beverages, and Fashion Accessories.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Founder Community, and how do founders join?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Founder Community is a curated, invitation-only network for active Indian D2C operators to exchange real playbooks, vetted vendors, and tactical advice. Founders apply via our For Founders page.",
        },
      },
      {
        "@type": "Question",
        name: "What is the relationship between GetIntoD2C and Parlexa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GetIntoD2C is an operating unit of Parlexa, an enterprise digital and technology advisory firm founded in 2013.",
        },
      },
    ],
  };

  return [
    organizationSchema,
    webSiteSchema,
    ...serviceSchemas,
    faqSchema,
  ];
}

/**
 * 2. /for-founders Page Schemas: BreadcrumbList + FAQPage
 */
export function getForFoundersSchemas() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "For Founders",
        item: `${SITE_URL}/for-founders`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this really just a WhatsApp group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. That's the point. It's the fastest, most honest place founders already spend their day — so we meet you there instead of building yet another app you'll ignore.",
        },
      },
      {
        "@type": "Question",
        name: "How is membership decided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every application is read personally. We look for early-stage D2C founders with real intent — pre-launch is welcome, so are revenue-stage teams. It's about signal, not scale.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a fee to join?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The community is free and invitation-based.",
        },
      },
      {
        "@type": "Question",
        name: "What about in-person events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Small, curated in-person editions across Bengaluru, Mumbai and Delhi are coming soon — community members get first access.",
        },
      },
      {
        "@type": "Question",
        name: "Can my co-founder join?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — add their details in the form. Co-founders are reviewed together so the group stays intimate.",
        },
      },
    ],
  };

  return [breadcrumbSchema, faqSchema];
}

/**
 * 3. /registrations Page Schemas: BreadcrumbList + EducationEvent
 */
export function getRegistrationsSchemas() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Workshop Registrations",
        item: `${SITE_URL}/registrations`,
      },
    ],
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: "The Proven Playbook to Build a D2C Brand in India",
    description:
      "Live interactive masterclasses and upcoming cohorts for Indian consumer brand founders. Gain access to practical frameworks, unit economics models, and live speaker recordings.",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${SITE_URL}/registrations`,
    },
    image: `${SITE_URL}/gaurav-virmani.jpg`,
    organizer: {
      "@type": "Organization",
      name: "GetIntoD2C",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "59",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/registrations`,
    },
  };

  return [breadcrumbSchema, eventSchema];
}

/**
 * 4. /blog Index Page Schemas: BreadcrumbList + Blog
 */
export function getBlogIndexSchemas() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Journal | GetIntoD2C",
    description:
      "Field notes, case studies and playbooks on building D2C brands in India.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "GetIntoD2C",
      url: SITE_URL,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return [breadcrumbSchema, blogSchema];
}

/**
 * 5. /blog/$slug Post Page Schemas: BreadcrumbList + BlogPosting
 */
export function getBlogPostSchemas(post: BlogPost) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  const authorSchema = post.author
    ? {
        "@type": post.author.name.includes("Desk") || post.author.name.includes("Team")
          ? "Organization"
          : "Person",
        name: post.author.name,
        jobTitle: post.author.role,
        url: post.author.profileUrl || `${SITE_URL}/about`,
      }
    : {
        "@type": "Organization",
        name: "GetIntoD2C Editorial & Advisory Desk",
        url: `${SITE_URL}/about`,
      };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    articleSection: post.category,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "GetIntoD2C",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };

  return [breadcrumbSchema, blogPostingSchema];
}

/**
 * 6. Dynamic FAQ Page Schema for AI Blog Posts with FAQs
 */
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 7. /webinars Index Page Schemas
 */
export function getWebinarsIndexSchemas() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Masterclasses & Webinars",
        item: `${SITE_URL}/webinars`,
      },
    ],
  };

  return [breadcrumbSchema];
}

/**
 * 8. /webinars/$slug Post Page Schemas
 */
export function getWebinarPostSchemas(webinar: any) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Webinars",
        item: `${SITE_URL}/webinars`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: webinar.title,
        item: `${SITE_URL}/webinars/${webinar.slug}`,
      },
    ],
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: webinar.title,
    description: webinar.excerpt,
    thumbnailUrl: webinar.coverImage?.startsWith("http") ? webinar.coverImage : `${SITE_URL}${webinar.coverImage || "/gaurav-virmani.jpg"}`,
    uploadDate: "2026-08-01T00:00:00+05:30",
    embedUrl: webinar.youtubeId ? `https://www.youtube.com/embed/${webinar.youtubeId}` : undefined,
  };

  return [breadcrumbSchema, videoSchema];
}
