export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  serviceType: string;
  tagline: string;
  description: string;
  whoItsFor: string[];
  problemsSolved: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedCategorySlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: "d2c-brand-audit",
    title: "D2C Brand & Margin Audit Services",
    shortTitle: "Brand Audit",
    serviceType: "D2C Brand Audit & Margin Optimization",
    tagline: "A calm, honest diagnostic of where your D2C brand leaks margin: positioning, pricing architecture, CAC, and unit economics.",
    description: "Our D2C Brand Audit provides founders with a thorough, senior-level diagnostic of their business fundamentals. We dissect your contribution margins, customer acquisition cost efficiency, positioning clarity, and retention dynamics to isolate why margins are compressing and provide a prioritized 90-day action plan.",
    whoItsFor: [
      "Founders doing ₹10L to ₹1Cr monthly who feel their ad spend is no longer compounding profitably.",
      "Early-stage brands preparing for outside capital or an aggressive scaling phase.",
      "Operators who suspect margin leakage across COD returns, shipping, packaging, or discounting.",
    ],
    problemsSolved: [
      "Rising Meta and Google Customer Acquisition Costs (CAC) eroding profitability.",
      "High Cash on Delivery (COD) Return-to-Origin (RTO) rates draining cash flow.",
      "Discount addiction masking weak underlying customer repeat purchase intent.",
      "Confusing product positioning that fails to differentiate from marketplace commodities.",
    ],
    deliverables: [
      "Complete Unit Economics & Contribution Margin Diagnostic (COGS, shipping, payment gateway, RTO, CAC).",
      "Positioning & Messaging Clarity Review against direct category competitors.",
      "Storefront & PDP Conversion Rate (CRO) Teardown identifying drop-off friction.",
      "Performance Marketing & Ad Creative Audit assessing creative fatigue and MER.",
      "Prioritized 90-Day Margin Recovery & Growth Roadmap.",
    ],
    processSteps: [
      {
        title: "1. Data & Context Intake",
        desc: "We review your read-only Shopify analytics, ad accounts, unit economics, and logistics metrics without disrupting your daily operations.",
      },
      {
        title: "2. Comprehensive Teardown",
        desc: "Our studio leads analyze your funnel, pricing tiers, CAC-to-LTV ratios, and competitive positioning whitespace.",
      },
      {
        title: "3. Action Plan Presentation",
        desc: "We deliver an unvarnished audit report detailing the exact sequence of fixes needed to restore healthy contribution margins.",
      },
      {
        title: "4. Implementation Alignment",
        desc: "A 1:1 strategy session with studio leads to walk through tactical execution, tooling, and accountability.",
      },
    ],
    faqs: [
      {
        question: "How long does a D2C Brand Audit take?",
        answer: "A standard Brand Audit is delivered within 10 to 14 business days following complete intake of your performance, store, and unit economics data.",
      },
      {
        question: "What access or data do you require?",
        answer: "We typically require read-only access to your Shopify analytics, Meta/Google ad managers, and a high-level summary of your COGS, packaging, and logistics fee structures.",
      },
      {
        question: "How does this differ from an agency audit?",
        answer: "Agencies typically audit only your ad account to sell a media-buying retainer. We audit the entire business engine: positioning, unit economics, margin architecture, packaging, and retention.",
      },
    ],
    relatedCategorySlugs: ["fmcg", "skincare", "healthy-snacking", "fashion-accessories"],
    metaTitle: "D2C Brand Audit Services India | GetIntoD2C",
    metaDescription: "Diagnose where your D2C brand leaks margin. Comprehensive audit of positioning, unit economics, CAC, and conversion funnels for Indian consumer founders.",
  },
  {
    slug: "d2c-positioning",
    title: "D2C Brand Positioning & Identity Design",
    shortTitle: "Positioning & Identity",
    serviceType: "Brand Positioning & Identity Design",
    tagline: "Sharper messaging, category whitespace mapping, and visual identity systems that resonate with Indian consumer psychology.",
    description: "Great consumer brands are not born from generic templates. We help founders unearth the emotional hook and category whitespace that makes their product memorable, and translate that positioning into tactile packaging and high-fidelity storefront design.",
    whoItsFor: [
      "Pre-launch founders looking to establish a distinct premium brand identity from Day 1.",
      "Established brands trapped in price competition who want to command healthy pricing power through distinct positioning.",
      "Founders whose current visual branding does not match the premium quality of their physical product.",
    ],
    problemsSolved: [
      "Commoditization and price wars against cheaper marketplace alternatives.",
      "High bounce rates caused by confusing brand messaging on landing pages.",
      "Packaging that fails to capture consumer attention on social feeds or retail shelves.",
      "Incoherent brand voice across paid ads, storefront, and physical unboxing.",
    ],
    deliverables: [
      "Whitespace Category Opportunity Analysis and Competitor Matrix.",
      "Core Brand Positioning Framework (Tagline, Value Proposition, Brand Story).",
      "Tactile Packaging & Label Design Direction engineered for unboxing delight.",
      "Digital Visual Identity Guidelines (Color, Typography, Photography Style).",
      "Tone of Voice Playbook for social, web copy, and customer touchpoints.",
    ],
    processSteps: [
      {
        title: "1. Founder Immersion",
        desc: "We dive into your formulation, origin story, and consumer insights to identify your brand's unique emotional anchor.",
      },
      {
        title: "2. Whitespace Mapping",
        desc: "We analyze Indian consumer psychology and market incumbents to define an uncontested position.",
      },
      {
        title: "3. Tactile & Visual Systems",
        desc: "We design packaging, storefront aesthetics, and messaging that feel like the brand you always envisioned.",
      },
      {
        title: "4. Launch Playbook",
        desc: "We hand off complete brand identity guidelines ready for manufacturer printing and web implementation.",
      },
    ],
    faqs: [
      {
        question: "Do you design physical packaging as well as digital assets?",
        answer: "Yes. We focus heavily on tactile identity—the hand-feel, label hierarchy, compliance typography, and unboxing psychology that consumer products require.",
      },
      {
        question: "How do you ensure our positioning resonates with Indian consumers?",
        answer: "We anchor every positioning framework in real Indian consumer buying habits, price elasticity, and cultural nuances across Tier 1 and Tier 2 metro hubs.",
      },
    ],
    relatedCategorySlugs: ["skincare", "fashion-accessories", "beverages", "healthy-snacking"],
    metaTitle: "D2C Brand Positioning & Identity Agency India | GetIntoD2C",
    metaDescription: "Craft distinct brand positioning and tactile packaging design for Indian consumer startups. Stand out, command pricing power, and build cult loyalty.",
  },
  {
    slug: "d2c-growth",
    title: "D2C Growth Engine & Performance Marketing",
    shortTitle: "Growth Engine",
    serviceType: "D2C Growth Marketing",
    tagline: "Meta, Google Search, marketplace, and creator-led acquisition systems built for compounding scale and lower CAC.",
    description: "Paid acquisition without unit economic discipline leads to rapid capital burnout. Our Growth Engine service builds systematic customer acquisition funnels that balance in-platform efficiency with true blended Marketing Efficiency Ratio (MER).",
    whoItsFor: [
      "Revenue-stage consumer brands looking to scale monthly ad spend past ₹5L profitably.",
      "Founders who want to build an internal growth operating system rather than relying on black-box agencies.",
      "Brands experiencing Meta ad creative fatigue and diminishing ROAS returns.",
    ],
    problemsSolved: [
      "Customer Acquisition Cost (CAC) outpacing first-order Average Order Value.",
      "Ad creative fatigue requiring endless unstrategic testing.",
      "Reliance on single-channel ad tactics vulnerable to platform algorithm shifts.",
      "Misleading in-platform ROAS numbers obscuring real contribution margin losses.",
    ],
    deliverables: [
      "Multi-Angle Creative Testing Framework (Founder stories, UGC, product teardowns).",
      "Campaign Structure Architecture (Advantage+ Shopping paired with concept testing).",
      "Blended Marketing Efficiency Ratio (MER) & Contribution Margin Dashboard.",
      "First-Party Data Capture Strategy to insulate against ad tracking loss.",
    ],
    processSteps: [
      {
        title: "1. Unit Economics Baseline",
        desc: "We establish your maximum allowable CAC based on your true gross margins and 90-day LTV.",
      },
      {
        title: "2. Creative Matrix Build",
        desc: "We produce and orchestrate high-converting creative angles tailored to diverse consumer motivations.",
      },
      {
        title: "3. Full Funnel Deployment",
        desc: "We test concepts systematically and graduate verified winners into compounding scale campaigns.",
      },
      {
        title: "4. Continuous Optimization",
        desc: "Weekly reviews of contribution margin, MER, creative wear-out, and localized targeting.",
      },
    ],
    faqs: [
      {
        question: "Do you operate as an outsourced ad agency?",
        answer: "No. We operate as a growth studio partnering with your team. We build the growth engine, define creative frameworks, and calibrate your economics so your brand compounds value sustainably.",
      },
      {
        question: "What minimum ad budget is recommended?",
        answer: "We typically work with brands ready to deploy at least ₹1.5L to ₹5L monthly in validated performance media.",
      },
    ],
    relatedCategorySlugs: ["healthy-snacking", "skincare", "health-supplements", "fashion-accessories"],
    metaTitle: "D2C Performance Marketing & Growth Engine India | GetIntoD2C",
    metaDescription: "Scale your Indian D2C brand with disciplined performance marketing, creative diversity, and contribution-margin-first acquisition systems.",
  },
  {
    slug: "d2c-gtm-strategy",
    title: "D2C Go-To-Market (GTM) Strategy Consultancy",
    shortTitle: "GTM Strategy",
    serviceType: "Go-To-Market Strategy Consultancy",
    tagline: "Launch plans, pricing logic, channel orchestration, and clear timelines from first shelf to first crore for modern consumer brands.",
    description: "Launching a consumer brand in India requires orchestrated timing across production, compliance, digital storefront, and instant delivery channels. Our GTM Strategy service equips founders with an institutional launch blueprint that eliminates costly trial-and-error.",
    whoItsFor: [
      "Pre-launch founders ready to bring their first formulations or products to market.",
      "Corporate executives and family business operators launching a modern consumer subsidiary.",
      "Founders expanding from single-channel D2C into quick commerce and Amazon.",
    ],
    problemsSolved: [
      "Launching with flawed pricing architecture that fails to absorb distribution commissions.",
      "Premature ad spend burn before product-market fit or review signals are established.",
      "Supply chain and MOQ miscalculations tying up working capital in slow-moving inventory.",
      "Confusion over when to launch on quick-commerce platforms like Zepto, Blinkit, and Instamart.",
    ],
    deliverables: [
      "Chronological 90-Day GTM Launch Roadmap (Pre-launch, Day Zero, Scale phase).",
      "Comprehensive Pricing & Channel Margin Architecture (D2C vs Quick Commerce vs Marketplaces).",
      "Contract Manufacturer (OEM/ODM) Vetting & MOQ Negotiation Playbook.",
      "Compliance & Operational Launch Checklist (FSSAI, CDSCO, Legal Metrology, GST, Barcoding).",
      "VIP Waitlist & Organic Seeding Campaign Strategy.",
    ],
    processSteps: [
      {
        title: "1. Market Sizing & Feasibility",
        desc: "We analyze category incumbents, retail price bands, and regulatory requirements.",
      },
      {
        title: "2. Economics & Pricing Architecture",
        desc: "We structure COGS, packaging budgets, and channel margins to protect 65%+ gross margins.",
      },
      {
        title: "3. Channel Sequencing",
        desc: "We plan the exact timeline for D2C storefront launch, creator seeding, and quick-commerce onboarding.",
      },
      {
        title: "4. Day-0 Launch Orchestration",
        desc: "We execute VIP waitlist activation and track early review velocity to establish immediate traction.",
      },
    ],
    faqs: [
      {
        question: "How early in our product journey should we engage for GTM Strategy?",
        answer: "Ideally 60 to 90 days prior to your target commercial launch date, while formulations, packaging specs, and inventory orders are being finalized.",
      },
      {
        question: "Does this include quick-commerce guidance?",
        answer: "Yes. In 2026, quick commerce is an essential discovery channel for Indian consumables. We plan dark store inventory allocations alongside your primary D2C site.",
      },
    ],
    relatedCategorySlugs: ["fmcg", "beverages", "healthy-snacking", "health-supplements"],
    metaTitle: "D2C GTM Strategy Consultancy India | GetIntoD2C",
    metaDescription: "End-to-end Go-To-Market strategy consultancy for consumer founders in India. Navigate pricing, channel sequencing, quick commerce, and launch milestones.",
  },
  {
    slug: "d2c-cro",
    title: "D2C Conversion Rate Optimization (CRO) & Funnel",
    shortTitle: "CRO & Funnel",
    serviceType: "E-Commerce CRO & Funnel Optimization",
    tagline: "Higher AOV, frictionless mobile checkouts, RTO reduction, and high-converting product detail pages.",
    description: "Driving traffic to a leaking storefront burns ad dollars. We redesign and optimize product detail pages, checkout flows, and bundling mechanics to maximize conversion rate and Average Order Value for Indian mobile shoppers.",
    whoItsFor: [
      "Stores with healthy top-of-funnel traffic converting below industry benchmarks (< 1.5%).",
      "Brands looking to increase Average Order Value (AOV) through intelligent bundling.",
      "Operators suffering high cart and checkout abandonment on mobile devices.",
    ],
    problemsSolved: [
      "Friction-heavy multi-step checkouts causing drop-offs on Indian mobile networks.",
      "Lack of trust signals (verified reviews, delivery timelines, COD transparency).",
      "Weak Product Detail Pages (PDPs) that fail to answer buyer objections above the fold.",
      "Low cart value making unit economics sensitive to shipping fees.",
    ],
    deliverables: [
      "Mobile-First PDP Redesign Specification and Wireframes.",
      "Checkout Flow Optimization integrating 1-click UPI solutions.",
      "AOV Acceleration Strategy (Tiered bundle discounts, free-gift thresholds, post-purchase upsells).",
      "Trust Architecture Implementation (Sticky CTAs, pin-code delivery estimators, review displays).",
    ],
    processSteps: [
      {
        title: "1. Funnel Analytics Deep Dive",
        desc: "We inspect heatmaps, session recordings, and drop-off analytics across every checkout stage.",
      },
      {
        title: "2. PDP Friction Identification",
        desc: "We pinpoint mobile layout bottlenecks, slow loading scripts, and missing trust signals.",
      },
      {
        title: "3. Redesign & Wireframing",
        desc: "We design clean, high-converting product detail and cart components optimized for touch screens.",
      },
      {
        title: "4. Deployment & Testing",
        desc: "We guide implementation on your Shopify storefront and monitor conversion lift.",
      },
    ],
    faqs: [
      {
        question: "Do you build directly on Shopify?",
        answer: "Yes. Our CRO recommendations are built specifically for modern Shopify Liquid and headless architectures commonly used by Indian consumer brands.",
      },
      {
        question: "What Average Order Value lift is typical?",
        answer: "Structured product bundles, minimum-order free-shipping thresholds and tiered checkout incentives can be used to improve average order value, depending on category, pricing and catalog structure.",
      },
    ],
    relatedCategorySlugs: ["skincare", "fashion-accessories", "healthy-snacking", "health-supplements"],
    metaTitle: "D2C Conversion Rate Optimization (CRO) India | GetIntoD2C",
    metaDescription: "Optimize your D2C Shopify store for Indian mobile buyers. Higher AOV, 1-click checkouts, trusted PDP layouts, and lower abandonment.",
  },
  {
    slug: "d2c-retention",
    title: "D2C Customer Retention & Lifecycle Systems",
    shortTitle: "Retention Systems",
    serviceType: "Retention & Lifecycle Marketing",
    tagline: "Repeat order rate optimization, automated WhatsApp commerce, and subscription flows that maximize customer LTV.",
    description: "Acquiring a customer once is an expense; retaining them across a compounding lifetime value is where Indian consumer brands achieve true enterprise value. We build automated WhatsApp, SMS, and email lifecycle flows that drive repeat purchase velocity.",
    whoItsFor: [
      "Consumable brands (food, skincare, supplements) with repeat purchase rates below 25%.",
      "Brands struggling to communicate with Indian customers due to declining email open rates.",
      "Merchants dealing with high COD Return-to-Origin rates on initial orders.",
    ],
    problemsSolved: [
      "Low email engagement (open rates below 15%) among Indian consumer demographics.",
      "High COD RTO losses from unverified impulse buyers.",
      "Inability to trigger automated re-order reminders based on real consumption cycles.",
      "Customer churn following first-time discount promotions.",
    ],
    deliverables: [
      "Automated WhatsApp Business API Architecture (Abandoned cart, shipping updates, replenishment alerts).",
      "Pre-Dispatch COD Order Verification Bot slashing return-to-origin rates.",
      "Consumable Replenishment Logic triggered at specific usage intervals (e.g. Day 25 for 30-day supply).",
      "VIP Customer Segmentation and Early Access Drop Systems.",
    ],
    processSteps: [
      {
        title: "1. Cohort & Retention Analysis",
        desc: "We analyze repeat purchase intervals and identify your highest-value customer segments.",
      },
      {
        title: "2. Lifecycle Flow Architecture",
        desc: "We map out conversational WhatsApp and email workflows tailored to consumption habits.",
      },
      {
        title: "3. COD Verification Setup",
        desc: "We implement pre-dispatch confirmation workflows to verify pin codes and intent.",
      },
      {
        title: "4. Retention Monitoring",
        desc: "Ongoing optimization of repeat order rates, re-order velocity, and customer lifetime value.",
      },
    ],
    faqs: [
      {
        question: "Why focus on WhatsApp over email in India?",
        answer: "Indian consumers engage significantly faster on messaging channels compared to email. Automated WhatsApp flows offer substantially higher open and read rates than traditional email newsletters, making them ideal for time-sensitive order updates and replenishment alerts.",
      },
      {
        question: "How much can COD verification reduce RTO?",
        answer: "Pre-dispatch address confirmation and phone verification can help reduce avoidable COD returns, with impact varying by geography, customer mix and category.",
      },
    ],
    relatedCategorySlugs: ["healthy-snacking", "skincare", "health-supplements", "fmcg"],
    metaTitle: "D2C Retention Marketing & WhatsApp Systems India | GetIntoD2C",
    metaDescription: "Boost repeat purchase rates and reduce COD RTO with automated WhatsApp commerce, lifecycle replenishment, and customer retention systems.",
  },
];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
