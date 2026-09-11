export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudyData {
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  category: string;
  stage: string;
  isTeardown: boolean;
  relationshipType:
    | "Studio Partner & Mentor"
    | "Studio Client Engagement"
    | "Editorial Research Teardown";
  founderOrLeader: string;
  founderRole: string;
  challenge: string;
  diagnosis: string;
  strategy: string[];
  execution: string[];
  servicesProvided: string[];
  outcomes: string[];
  metrics?: CaseStudyMetric[];
  lessons: string[];
  testimonialQuote?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedServiceSlugs: string[];
  relatedCategorySlugs: string[];
  relatedArticleSlug?: string;
  metaTitle: string;
  metaDescription: string;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "bakedbuzz",
    brand: "BakedBuzz",
    title: "BakedBuzz — Positioning & Launch Architecture for Modern Healthy Snacking",
    subtitle:
      "Crafting an authentic, taste-forward clean-label narrative to carve out distinct shelf space in India's competitive packaged goods sector.",
    category: "Modern Snacking & FMCG",
    stage: "Launch & Category Entry",
    isTeardown: false,
    relationshipType: "Studio Client Engagement",
    founderOrLeader: "Raunak Mahandarani",
    founderRole: "Founder, BakedBuzz / Healthy Snacking",
    challenge:
      "India's packaged snacking category is flooded with ambiguous 'baked not fried' and 'diet' claims that consumers often distrust. BakedBuzz needed sharp, defensible positioning that communicated authentic ingredient integrity without compromising on appetite appeal.",
    diagnosis:
      "Health claims alone rarely drive high repeat purchase rates in Indian snacking. The brand identity needed to lead with irresistible flavor and tactile snacking rituals, positioning nutritional benefits as a natural consequence rather than a clinical chore.",
    strategy: [
      "Develop a distinct brand narrative emphasizing taste satisfaction alongside clean, baked production.",
      "Position the product for contemporary urban micro-moments: mid-day office slumps, travel snacks, and guilt-free evening indulgence.",
      "Design packaging communication hierarchies that highlight ingredients clearly within the first 3 seconds of customer evaluation.",
    ],
    execution: [
      "Formulated the core brand positioning book, defining typography, tone of voice, and sensory brand attributes.",
      "Refined secondary packaging specifications for optimal shelf presence and digital storefront thumbnail clarity.",
      "Established initial go-to-market messaging playbooks tailored for direct-to-consumer and modern retail channels.",
    ],
    servicesProvided: [
      "D2C Brand Positioning",
      "Go-To-Market (GTM) Strategy",
      "Packaging Communication Architecture",
    ],
    outcomes: [
      "Successfully carved out a clear, differentiated brand identity ahead of commercial rollout.",
      "Strong positive reception from early customer cohorts validating both taste appeal and clean ingredient perception.",
      "Founder equipped with structured messaging playbooks for retail buyer presentations and consumer marketing.",
    ],
    testimonialQuote: {
      quote:
        "Launching a healthy snacking brand is no small task. Having this team in my corner has made all the difference. They get the vision.",
      author: "Raunak Mahandarani",
      role: "Founder, BakedBuzz / Healthy Snacking",
    },
    lessons: [
      "In FMCG snacking, consumers buy health with their heads but repeat with their tastebuds. Never let health overshadow appetite appeal.",
      "Packaging front-of-pack copy must answer 'What is it?' and 'Why should I care?' in under three seconds.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-growth"],
    relatedCategorySlugs: ["healthy-snacking", "fmcg"],
    metaTitle: "BakedBuzz Healthy Snacking Case Study — GetIntoD2C",
    metaDescription:
      "Read how BakedBuzz developed a taste-first, clean-label positioning strategy for India's competitive snacking sector with GetIntoD2C.",
  },
  {
    slug: "plan-your-legacy",
    brand: "Plan Your Legacy",
    title: "Plan Your Legacy — Brand Architecture & Calm Onboarding for High-Trust Services",
    subtitle:
      "Structuring a legacy and advisory practice from the ground up with emotional clarity, founder empathy, and friction-free client journeys.",
    category: "Advisory & Direct Consumer Services",
    stage: "Zero-to-One Setup",
    isTeardown: false,
    relationshipType: "Studio Client Engagement",
    founderOrLeader: "Ashok Mathur",
    founderRole: "Founder, Plan Your Legacy",
    challenge:
      "Legacy planning, estate structuring, and wealth continuity are inherently sensitive, emotionally charged domains. The founder required a brand identity and operational client journey that inspired deep trust without sounding clinical or intimidating.",
    diagnosis:
      "High-consideration personal services cannot rely on aggressive conversion copywriting. The entire client discovery and onboarding experience needed to project dignity, transparency, and calm competence from the first interaction.",
    strategy: [
      "Design an empathetic brand narrative anchored in family continuity, peace of mind, and generational stewardship.",
      "Create clear, tiered service definitions so prospective clients immediately understand engagement scope without friction.",
      "Streamline the initial inquiry and diagnostic intake workflow to eliminate unnecessary form fields and emotional fatigue.",
    ],
    execution: [
      "Developed comprehensive foundational positioning frameworks, voice guidelines, and visual identity directions.",
      "Engineered structured client consultation flows prioritizing empathetic listening and clear follow-up deliverables.",
      "Built a seamless intake infrastructure ensuring confidentiality and prompt client communication.",
    ],
    servicesProvided: [
      "Brand Positioning & Narrative Architecture",
      "Client Journey & Onboarding Optimization",
      "Go-To-Market (GTM) Strategy",
    ],
    outcomes: [
      "Delivered a complete, operational brand architecture ready to serve clients with poise and dignity.",
      "Established high-trust inquiry workflows that consistently convert high-net-worth referrals into active advisory clients.",
    ],
    testimonialQuote: {
      quote:
        "The team is helping us set Plan Your Legacy up from the ground up so we can start serving clients the right way, with clarity and calm.",
      author: "Ashok Mathur",
      role: "Founder, Plan Your Legacy",
    },
    lessons: [
      "In high-consideration consumer services, calm clarity builds more sustainable conversion momentum than urgency tactics.",
      "Respecting client privacy and providing transparent engagement roadmaps are foundational to referral velocity.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-brand-audit"],
    relatedCategorySlugs: ["fmcg"],
    metaTitle: "Plan Your Legacy Case Study — GetIntoD2C Advisory Studio",
    metaDescription:
      "How Plan Your Legacy partnered with GetIntoD2C to build a calm, high-trust brand architecture and onboarding experience from the ground up.",
  },
  {
    slug: "bennys-bowl",
    brand: "Benny's Bowl",
    title: "Benny's Bowl — Visual Storytelling & Pre-Launch Anticipation in Fresh Food",
    subtitle:
      "Crafting appetizing, premium visual content and community anticipation for a young consumer food brand prior to official campaign deployment.",
    category: "Food & Pet Nutrition",
    stage: "Pre-Launch & Creative Production",
    isTeardown: false,
    relationshipType: "Studio Client Engagement",
    founderOrLeader: "Anushk Johri",
    founderRole: "Founder, Benny's Bowl",
    challenge:
      "For an emerging food brand, capturing early consumer credibility is notoriously difficult without an existing retail footprint. Benny's Bowl needed striking visual assets that conveyed fresh, high-grade ingredients and provoked immediate organic desire.",
    diagnosis:
      "In modern food commerce, visual clarity precedes conversion. Before spending on performance advertising, the brand required aspirational creative assets that would stimulate organic word-of-mouth and inbound waitlist inquiries.",
    strategy: [
      "Establish a vibrant, premium visual language highlighting fresh whole ingredients and wholesome preparation.",
      "Focus pre-launch storytelling around ingredient transparency and the emotional joy of pet nutrition.",
      "Deploy preview content across social touchpoints to seed anticipation and collect organic direct inquiries.",
    ],
    execution: [
      "Directed high-conversion visual staging and product photography guidelines.",
      "Constructed pre-launch landing and social collateral showcasing product freshness and portion convenience.",
      "Designed inbound response flows to manage direct customer inquiries ahead of official distribution rollout.",
    ],
    servicesProvided: [
      "Brand Positioning & Visual Direction",
      "Creative Content Production Direction",
      "Go-To-Market (GTM) Strategy",
    ],
    outcomes: [
      "Generated strong organic anticipation with customer inquiries filling direct message queues prior to official ad rollout.",
      "Armed the founder with premium, high-converting creative assets proven across early customer touchpoints.",
    ],
    testimonialQuote: {
      quote:
        "For a young food brand, visuals are everything. They made our product look so good, our DMs were full before the campaign even officially launched.",
      author: "Anushk Johri",
      role: "Founder, Benny's Bowl",
    },
    lessons: [
      "For consumer food and nutrition brands, high-quality visual execution is the primary driver of initial trust.",
      "Building pre-launch curiosity through authentic visual staging significantly reduces subsequent customer acquisition costs.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-growth"],
    relatedCategorySlugs: ["fmcg", "healthy-snacking"],
    metaTitle: "Benny's Bowl Case Study — GetIntoD2C Growth Studio",
    metaDescription:
      "How Benny's Bowl leveraged high-conversion visual storytelling and pre-launch anticipation to fill inbound demand with GetIntoD2C.",
  },
  {
    slug: "bluorng",
    brand: "BLUORNG",
    title: "BLUORNG — The Zero-Restock Scarcity Playbook in Indian Luxury Streetwear",
    subtitle:
      "An editorial teardown analyzing how BLUORNG combined heavy-GSM textiles, cultural storytelling, and strict inventory caps to build India's premier homegrown streetwear label.",
    category: "Fashion & Luxury Apparel",
    stage: "Editorial Research Teardown",
    isTeardown: true,
    relationshipType: "Editorial Research Teardown",
    founderOrLeader: "Siddhant Sabharwal & Mokam Singh",
    founderRole: "Co-Founders, BLUORNG (Editorial Teardown Subject)",
    challenge:
      "Indian domestic streetwear historically struggled against imported luxury labels. Domestic consumers perceived homegrown brands as fast-fashion or discount-driven, questioning whether Indian labels could command ₹4,000+ price tags for T-shirts.",
    diagnosis:
      "Continuous restocking and deep discounting erode brand cachet. BLUORNG recognized that luxury streetwear thrives on cultural relevance, tangible fabric weight (240+ GSM), and genuine unbending scarcity.",
    strategy: [
      "Enforce a strict 'Zero-Restock' rule: once a limited-edition drop sells through, it is permanently retired.",
      "Invest aggressively in fabric craftsmanship—heavyweight French terry, intricate 3D puff prints, and custom hardware.",
      "Expand from online drops into experiential flagship spaces (Delhi, Mumbai, Hyderabad) to let consumers experience fabric weight in person.",
    ],
    execution: [
      "Analyzed by GetIntoD2C's research desk as a premier benchmark for brand equity protection and pricing power in Indian D2C.",
      "Extracted actionable frameworks on drop cadences, anti-discounting discipline, and omnichannel flagship economics.",
    ],
    servicesProvided: [
      "GetIntoD2C Research Teardown",
      "Brand Equity & Scarcity Framework Analysis",
    ],
    outcomes: [
      "Scaled into GQ India's Streetwear Label of the Year (2023) while remaining bootstrapped.",
      "Proven domestic model for commanding 70%+ gross margins without participating in seasonal marketplace discounting.",
    ],
    lessons: [
      "True scarcity cannot be faked: when a collection sells out, refusing to reprint preserves lifetime brand equity.",
      "High price points require undeniable physical craftsmanship that customers can feel immediately upon unboxing.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-retention"],
    relatedCategorySlugs: ["fashion-accessories"],
    relatedArticleSlug: "bluorng-scarcity-streetwear",
    metaTitle: "BLUORNG Scarcity Teardown — GetIntoD2C D2C Research",
    metaDescription:
      "Explore GetIntoD2C's deep editorial teardown of BLUORNG: how zero-restock drops, 240+ GSM fabrics, and flagship retail built an Indian streetwear icon.",
  },
  {
    slug: "the-whole-truth",
    brand: "The Whole Truth",
    title: "The Whole Truth — Radical Candor & Ingredient Transparency in Modern Food",
    subtitle:
      "An editorial teardown on how Shashank Mehta turned ingredient honesty into a formidable brand moat against legacy FMCG conglomerates.",
    category: "Modern Snacking & Health",
    stage: "Editorial Research Teardown",
    isTeardown: true,
    relationshipType: "Editorial Research Teardown",
    founderOrLeader: "Shashank Mehta",
    founderRole: "Founder, The Whole Truth (Editorial Teardown Subject)",
    challenge:
      "Legacy food brands have spent decades using ambiguous nutritional terminology, misleading serving sizes, and hidden palm oil. Breaking through required disproving widespread consumer cynicism towards 'healthy' packaged snacks.",
    diagnosis:
      "In a market conditioned to distrust claims, the only credible differentiator is radical, unvarnished honesty. Packaging needed to reveal every ingredient on the front of the pack in large, readable type.",
    strategy: [
      "Declare ingredients boldly on the front of packaging with zero hidden additives or asterisks.",
      "Publish candid educational content detailing the reality of food manufacturing and industrial sweetening agents.",
      "Price honestly for high-quality whole foods, resisting the temptation to use cheap fillers for artificial margin expansion.",
    ],
    execution: [
      "Studied by the GetIntoD2C research desk to provide founders with actionable frameworks on clean-label brand building.",
      "Integrated key findings into GetIntoD2C's FMCG and Healthy Snacking category blueprints.",
    ],
    servicesProvided: [
      "GetIntoD2C Research Teardown",
      "Clean-Label Positioning & Educational Moat Analysis",
    ],
    outcomes: [
      "Built one of India's most admired healthy snacking brands with exceptional organic word-of-mouth.",
      "Successfully expanded from pure-play D2C into quick-commerce platforms and nationwide modern trade.",
    ],
    lessons: [
      "Radical honesty is the ultimate retention engine: consumers who feel respected never return to deceptive alternatives.",
      "Educational content that empowers consumers creates stronger brand loyalty than discount-driven performance ads.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-retention"],
    relatedCategorySlugs: ["healthy-snacking", "fmcg"],
    relatedArticleSlug: "successful-d2c-brand-case-studies-india",
    metaTitle: "The Whole Truth Brand Teardown — GetIntoD2C D2C Research",
    metaDescription:
      "How The Whole Truth used front-of-pack ingredient candor and educational marketing to challenge legacy FMCG giants. A GetIntoD2C teardown.",
  },
  {
    slug: "foxtale",
    brand: "Foxtale",
    title: "Foxtale — Hero SKU Concentration & Consumer Trial Validation in Skincare",
    subtitle:
      "An editorial teardown examining how Romita Mazumdar validated formulations through hundreds of trials to drive rapid omnichannel scale.",
    category: "Skincare & Personal Care",
    stage: "Editorial Research Teardown",
    isTeardown: true,
    relationshipType: "Editorial Research Teardown",
    founderOrLeader: "Romita Mazumdar",
    founderRole: "Founder, Foxtale (Editorial Teardown Subject)",
    challenge:
      "The Indian skincare space is notoriously crowded. Many new entrants burn capital launching wide catalogs that fail to resonate, resulting in high customer acquisition costs and slow repeat purchases.",
    diagnosis:
      "Success in consumer beauty requires obsessing over formulation efficacy and skin-feel before scaling marketing. Concentrating resources on two exceptional hero SKUs generates the repeat momentum needed for sustainable scale.",
    strategy: [
      "Conduct hundreds of consumer blind trials before finalizing formulations to guarantee immediate sensory appeal.",
      "Concentrate early ad spend and marketing buzz around two hero products (cleanser and vitamin C serum).",
      "Leverage high-frequency repeat purchase cycles to fuel quick commerce expansion and modern retail penetration.",
    ],
    execution: [
      "Researched by the GetIntoD2C team as an exemplary case of hero SKU focus and contribution margin discipline in personal care.",
      "Framework referenced throughout GetIntoD2C's Skincare Category guide.",
    ],
    servicesProvided: [
      "GetIntoD2C Research Teardown",
      "Hero SKU Formulation Strategy Analysis",
    ],
    outcomes: [
      "Over 70% of early brand revenue generated by two core hero products.",
      "Rapid omnichannel expansion across Nykaa, Amazon, Blinkit, and physical beauty retail.",
    ],
    lessons: [
      "Hero product focus protects cash flow and operational bandwidth during early growth stages.",
      "Rigorous pre-launch formulation trials dramatically improve retention rates and lower long-term blended CAC.",
    ],
    relatedServiceSlugs: ["d2c-positioning", "d2c-growth"],
    relatedCategorySlugs: ["skincare"],
    relatedArticleSlug: "successful-d2c-brand-case-studies-india",
    metaTitle: "Foxtale Skincare Strategy Teardown — GetIntoD2C Research",
    metaDescription:
      "A deep dive into Foxtale's hero SKU concentration, formulation trials, and quick-commerce growth playbook. GetIntoD2C Research.",
  },
];
