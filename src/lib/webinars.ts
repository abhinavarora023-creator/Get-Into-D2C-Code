export interface WebinarSpeaker {
  name: string;
  role: string;
  company?: string;
  image: string;
  bio: string;
}

export interface WebinarChapter {
  title: string;
  desc: string;
}

export interface WebinarGalleryImage {
  src: string;
  alt: string;
  title: string;
  tag: string;
  description: string;
}

export interface WebinarPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  category: string;
  status: "recorded" | "upcoming";
  duration: string;
  youtubeId?: string;
  youtubeUrl?: string;
  coverImage: string;
  galleryImages: WebinarGalleryImage[];
  speakers: WebinarSpeaker[];
  chapters: WebinarChapter[];
  faqs: { q: string; a: string }[];
}

export const WEBINARS: WebinarPost[] = [
  {
    slug: "proven-playbook-to-build-a-d2c-brand",
    title: "The Proven Playbook to Build a D2C Brand in India",
    subtitle:
      "A complete masterclass on zero-to-one product development, supplier sourcing, margin architecture, CAC control, and quick commerce scaling.",
    excerpt:
      "Watch the complete recorded session with seasoned D2C founders and growth operators breaking down real unit economics, vendor negotiations, and omnichannel expansion.",
    date: "August 2026",
    category: "Masterclass 001",
    status: "recorded",
    duration: "Full Masterclass",
    youtubeId: "r4PXgaDdZuc",
    youtubeUrl: "https://www.youtube.com/watch?v=r4PXgaDdZuc",
    coverImage: "/webinar-speakers-panel.png",
    galleryImages: [
      {
        src: "/webinar-speakers-panel.png",
        alt: "GetIntoD2C Live Webinar Speaker Panel",
        title: "Unfiltered Operator Round-Table",
        tag: "Live Panel Discussion",
        description:
          "Four D2C operators and angel investors trading candid notes on early manufacturing hurdles, product formulation bottlenecks, CAC escalation, and dark store inventory management.",
      },
      {
        src: "/webinar-live-session.jpg",
        alt: "Live D2C Playbook and Unit Economics Teardown",
        title: "Unit Economics & Margin Diagnostics",
        tag: "Live Q&A & Playbook Teardown",
        description:
          "Detailed breakdowns of gross margin targets (65%+), RTO management, packaging requirements for marketplace readiness, and cash conversion cycles.",
      },
    ],
    speakers: [
      {
        name: "Gaurav Virmani",
        role: "Founder @ Go Whipped · 3X D2C Founder",
        image: "/gaurav-virmani.jpg",
        bio: "Deep expertise in zero-to-one consumer formulations, navigating Indian contract manufacturers, negotiating realistic MOQs, and achieving product-market fit.",
      },
      {
        name: "Kandarp Malhotra",
        role: "Growth Marketer @ XTCY",
        image: "/kandarp-malhotra.jpeg",
        bio: "Specialist in omnichannel performance marketing, CAC optimization, and scaling fast-moving consumer brands across Blinkit, Zepto, and Instamart.",
      },
    ],
    chapters: [
      {
        title: "Sourcing & Supplier Negotiations",
        desc: "How each founder vetted their first contract manufacturer, negotiated low MOQs without quality compromises, and avoided costly initial inventory traps.",
      },
      {
        title: "The First 100 Paid Customers",
        desc: "Tactical zero-budget and organic acquisition channels that actually drove initial orders, avoiding paid ad burnout before product validation.",
      },
      {
        title: "Unit Economics & Margin Architecture",
        desc: "A transparent breakdown of real COGS, gross margins, shipping and RTO costs, and pricing structures designed for sustainable profitability from day one.",
      },
      {
        title: "Quick Commerce Scaling (Blinkit, Zepto, Instamart)",
        desc: "The exact playbook to prepare packaging, meet platform compliance, and unlock localized instant delivery growth across top metro clusters.",
      },
      {
        title: "Scaling Paid Ads & CAC Control",
        desc: "Knowing the exact signals when it is time to deploy performance marketing budgets on Meta and Google without burning cash on false positives.",
      },
      {
        title: "The #1 Costly Mistake to Avoid",
        desc: "Unfiltered founder lessons on the biggest pitfalls, regulatory blind spots, and operational traps to skip entirely as a first-time consumer entrepreneur.",
      },
    ],
    faqs: [
      {
        q: "Is this full webinar recording completely free to watch?",
        a: "Yes. The live session has concluded, and we have made the entire masterclass recording publicly available on YouTube and this page for aspiring and scaling D2C founders.",
      },
      {
        q: "How can I access the actionable D2C Playbook and frameworks mentioned in the video?",
        a: "You can join our curated D2C Founders' WhatsApp Community (/for-founders) or connect directly with our advisory team to get our implementation frameworks, pricing calculators, and sourcing checklists.",
      },
      {
        q: "How can I be notified about future live workshops, dinners, and founder sessions?",
        a: "We host regular offline founder dinners in Bengaluru, Mumbai, and Delhi, alongside focused masterclasses. Apply to join our invitation-only WhatsApp community to get first access when dates go live.",
      },
      {
        q: "Can GetIntoD2C help me launch or audit my consumer brand?",
        a: "Absolutely. We run an end-to-end launchpad for early-stage founders (from formulation and manufacturer sourcing to Shopify store build and GTM execution), as well as comprehensive brand & unit economics audits for live brands.",
      },
    ],
  },
];

export function getWebinar(slug: string): WebinarPost | undefined {
  return WEBINARS.find((w) => w.slug === slug);
}
