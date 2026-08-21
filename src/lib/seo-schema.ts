import { BLOG_POSTS, type BlogPost } from "./blog-posts";

const SITE_URL = "https://getintod2c.in";
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
 * 1. Homepage Schemas: Organization, WebSite, 6 Services, 5 FAQs
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
      "A warm, considered D2C brand launchpad, building agency, and GTM strategy consultancy for founders of FMCG, skincare, healthy snacking, health supplements, beverage, and fashion accessories in India.",
    foundingDate: "2013",
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
      "Unit Economics",
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
      "D2C Brand Launchpad & Growth Studio India | GTM Strategy & Brand Building",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const services = [
    {
      title: "D2C Brand Audit Services",
      serviceType: "D2C Brand Audit & Margin Optimization",
      description:
        "A calm, honest diagnostic of where your D2C brand leaks margin: positioning, pricing architecture, CAC, and unit economics.",
    },
    {
      title: "D2C GTM Strategy Consultancy",
      serviceType: "Go-To-Market Strategy Consultancy",
      description:
        "Launch plans, pricing logic, channel orchestration, and clear timelines from first shelf to first crore for modern D2C brands.",
    },
    {
      title: "End to End D2C Brand Launch Services",
      serviceType: "D2C Brand Launchpad & Incubator",
      description:
        "Complete institutional launchpad for consumer founders: product validation, manufacturer sourcing, tech stack, compliance, and growth engine.",
    },
    {
      title: "D2C Brand Building & Positioning Agency",
      serviceType: "Brand Positioning & Identity Design",
      description:
        "Sharper positioning frameworks, whitespace analysis, messaging, and visual identity systems that resonate with Indian consumers.",
    },
    {
      title: "Growth Engine & Performance Marketing",
      serviceType: "D2C Growth Marketing",
      description:
        "Meta, Google Search, marketplace, and creator-led acquisition systems built for compounding scale and lower CAC.",
    },
    {
      title: "D2C Conversion Rate Optimization (CRO) & Funnel",
      serviceType: "E-Commerce CRO & Funnel Optimization",
      description:
        "Higher AOV, frictionless mobile checkouts, RTO reduction, and high-converting product detail pages.",
    },
    {
      title: "D2C Customer Retention Systems",
      serviceType: "Retention & Lifecycle Marketing",
      description:
        "Repeat order rate optimization, automated WhatsApp commerce, and subscription flows that maximize customer LTV.",
    },
    {
      title: "Niche Category D2C Launchpad",
      serviceType: "Vertical-Specific D2C Incubation",
      description:
        "Specialized launch strategies for FMCG, skincare, healthy snacking, health supplements, beverage, and fashion accessories brands.",
    },
  ];

  const serviceSchemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.serviceType,
    description: s.description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: "India",
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is GetIntoD2C launch studio for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Founders and operators building D2C brands who want senior-level thinking on positioning, GTM strategy, unit economics, and retention. Whether you're pre-launch or scaling between ₹50L and ₹100Cr ARR, we provide end-to-end guidance.",
        },
      },
      {
        "@type": "Question",
        name: "What does an End-to-End D2C Brand Launch Service include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our end-to-end launchpad covers market validation, white space positioning, supplier and manufacturer guidance, pricing and unit economics architecture, Shopify tech stack setup, compliance and logistics integration, and omnichannel GTM execution.",
        },
      },
      {
        "@type": "Question",
        name: "How does GetIntoD2C help lower CAC and fix leaking margins in D2C?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Through our D2C Brand Audit and Growth Engine, we diagnose margin leakages across ad spend, RTO/COD costs, discount dependency, and packaging. We optimize unit economics, improve CRO on product pages, and deploy automated WhatsApp retention flows to increase repeat purchase rates.",
        },
      },
      {
        "@type": "Question",
        name: "Which niche D2C categories do you specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We specialize in high-growth consumer categories including FMCG, Skincare & Personal Care, Healthy Snacking, Health Supplements & Nutraceuticals, Beverages, and Fashion Accessories.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between a Brand Audit and the 3-Month Partnership?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Brand Audit is a focused diagnostic surfacing gaps in positioning, pricing, and unit economics with a prioritized action plan. The 3-Month Partnership is an ongoing advisory engagement with weekly 1:1 sessions, strategy reviews, and hands-on coaching.",
        },
      },
      {
        "@type": "Question",
        name: "How much capital is required to launch a D2C brand in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A lean D2C launch in India typically requires between ₹3 Lakhs to ₹10 Lakhs for initial inventory (with low MOQs), packaging, e-commerce tech stack, compliance, and initial validation ad spend. Our launchpad helps founders avoid unnecessary capital burn.",
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
 * 3. /registerations Page Schemas: BreadcrumbList + Event/EducationEvent
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
        name: "Register",
        item: `${SITE_URL}/registerations`,
      },
    ],
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: "The Proven Playbook to Build a D2C Brand in India",
    description:
      "Join us for an exclusive live workshop with successful D2C founders and Angel Investors. Learn how to build, scale and grow a profitable D2C business in India.",
    startDate: "2026-08-26T16:00:00+05:30",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${SITE_URL}/registerations`,
    },
    image: `${SITE_URL}/gaurav-virmani.jpg`,
    organizer: {
      "@type": "Organization",
      name: "GetIntoD2C",
      url: SITE_URL,
    },
    performer: {
      "@type": "Person",
      name: "Gaurav Virmani",
      jobTitle: "Founder @ Go Whipped, 3X D2C Founder",
    },
    offers: {
      "@type": "Offer",
      price: "59",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/registerations`,
      validFrom: "2026-08-01",
    },
    maximumAttendeeCapacity: 200,
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
    name: "Journal, GetIntoD2C",
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

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: "GetIntoD2C",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
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

