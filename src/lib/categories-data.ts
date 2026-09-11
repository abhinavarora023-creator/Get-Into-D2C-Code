export interface CategoryData {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  marketDynamics: string[];
  keyChallenges: string[];
  growthPlaybooks: string[];
  recommendedServiceSlugs: string[];
  relatedCaseStudy?: { title: string; slug: string; excerpt: string };
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    slug: "skincare",
    name: "Skincare & Personal Care",
    tag: "Category · Ritual",
    tagline: "Elevating daily routine into ritual. Helping beauty founders master hero SKU positioning, tactile packaging, and high-retention formulations.",
    description: "The Indian skincare market is experiencing explosive demand for efficacy-driven, clean formulations. However, high competition and rising customer acquisition costs mean generic product lines burn out quickly. We help founders identify clinical and lifestyle whitespaces, launch concentrated hero SKUs, and build retention flywheels that command high lifetime value.",
    marketDynamics: [
      "Indian consumers increasingly seek active ingredient transparency (Niacinamide, Salicylic Acid, Vitamin C, Peptides).",
      "Quick commerce (Blinkit, Zepto) is transforming daily beauty replenishment in top metro clusters.",
      "Regulatory compliance under CDSCO and Ayush requires rigorous documentation and Certificate of Analysis (COA) protocols.",
    ],
    keyChallenges: [
      "Extremely high ad CPMs on Meta and Google in beauty categories.",
      "Product leakage and pump dispenser damage during courier transit.",
      "High competition from legacy FMCG brands and heavily funded D2C players.",
    ],
    growthPlaybooks: [
      "Hero SKU Focus: Build 70%+ of initial revenue around 2-3 hero products before catalog expansion.",
      "Tactile Unboxing: Heavy glass bottles, custom droppers, and sealed tamper-evident secondary packaging.",
      "Automated WhatsApp Replenishment: Trigger re-order nudges at Day 25 of a 30-day serum consumption cycle.",
    ],
    recommendedServiceSlugs: ["d2c-positioning", "d2c-brand-audit", "d2c-retention"],
    relatedCaseStudy: {
      title: "How Foxtale Scaled Through Hero SKU Focus & Consumer Trials",
      slug: "successful-d2c-brand-case-studies-india",
      excerpt: "Why focusing on two high-performing hero products drove over 70% of early revenue and rapid Nykaa and quick commerce expansion.",
    },
    faqs: [
      {
        question: "What licenses are mandatory to sell skincare online in India?",
        answer: "Skincare and cosmetics require appropriate state cosmetic manufacturing or loan licenses from the State Licensing Authority (SLA) / CDSCO, alongside Legal Metrology and GST compliance.",
      },
      {
        question: "What gross margin threshold is required for skincare D2C?",
        answer: "Successful skincare brands target 70% to 80% gross margins to withstand high customer acquisition costs, marketplace commissions, and shipping expenses.",
      },
    ],
    metaTitle: "Skincare D2C Brand Launch & Growth India | GetIntoD2C",
    metaDescription: "Master skincare D2C launch in India. Efficacy positioning, hero SKU strategy, packaging design, CDSCO compliance, and retention systems.",
  },
  {
    slug: "fmcg",
    name: "FMCG & Packaged Goods",
    tag: "Category · Velocity",
    tagline: "Everyday consumer essentials, engineered for shelf velocity, repeat habit, and healthy unit economics across online D2C and quick commerce.",
    description: "Fast Moving Consumer Goods require high velocity and tight cost discipline. We help FMCG founders structure pricing architectures that protect healthy gross margins even after accounting for platform commissions, distributor margins, and shipping costs.",
    marketDynamics: [
      "Shift from scheduled monthly grocery orders to 10-minute quick-commerce replenishment.",
      "Increasing demand for organic, preservative-free, and regional specialty pantry essentials.",
      "Need for omnichannel presence across D2C website, quick commerce, and modern trade.",
    ],
    keyChallenges: [
      "Lower Average Order Value (AOV) requiring smart bundling to cover fixed courier fees.",
      "Short shelf-life and batch expiry management across distributed dark stores.",
      "Low barrier to entry attracting aggressive price undercutting from regional commodity players.",
    ],
    growthPlaybooks: [
      "Value Multipacks & Subscriptions: Sell multi-packs and bundles online to elevate AOV above ₹600.",
      "Quick-Commerce Dark Store Staging: Allocate fast-moving SKUs directly into regional dark stores.",
      "Clean Label Architecture: Front-of-pack transparency that highlights quality without hidden additives.",
    ],
    recommendedServiceSlugs: ["d2c-gtm-strategy", "d2c-brand-audit", "d2c-growth"],
    faqs: [
      {
        question: "How do you achieve profitability on low-ticket FMCG items online?",
        answer: "By setting minimum purchase thresholds, creating curated multi-packs, and leveraging quick commerce for high-density single items while using your D2C site for high-ticket bundles.",
      },
      {
        question: "What FSSAI regulations apply to online packaged food brands?",
        answer: "Brands must secure an FSSAI Central or State license, display mandatory nutritional panels, ingredient declarations, batch numbers, and expiry dates clearly on both packaging and product listing pages.",
      },
    ],
    metaTitle: "FMCG D2C Brand Strategy & Launch India | GetIntoD2C",
    metaDescription: "Scale your packaged consumer goods brand in India. Margin architecture, quick-commerce dark store integration, and omnichannel GTM strategy.",
  },
  {
    slug: "healthy-snacking",
    name: "Modern Healthy Snacking",
    tag: "Category · Craving",
    tagline: "Clean labels, bold flavor palettes, and high-frequency impulse purchasing loops built for instant grocery delivery and modern snacking culture.",
    description: "Modern Indian consumers are abandoning oily, deep-fried snacks in favor of roasted, baked, protein-rich, and clean-label alternatives. We partner with snacking founders to engineer bold packaging, impulse price points, and high-repeat replenishment loops.",
    marketDynamics: [
      "High impulse purchase frequency driven by evening snack cravings and office desk snacking.",
      "Rapid trial unlocked by ₹49–₹149 trial pack pricing on Zepto, Blinkit, and Swiggy Instamart.",
      "Heightened scrutiny of palm oil, maltodextrin, and artificial sweetener claims.",
    ],
    keyChallenges: [
      "Volumetric freight weight eating margins when shipping lightweight puffed or baked snacks.",
      "Packaging barrier requirements to prevent moisture absorption and oil rancidity.",
      "High repeat rate required to overcome high initial ad acquisition costs.",
    ],
    growthPlaybooks: [
      "The Trial-to-Box Ladder: Drive low-friction first trial on quick commerce, then convert to monthly variety boxes on D2C.",
      "High-Barrier Nitrogen-Flushed Packaging: Preserve crunch and extend ambient shelf life past 6 months.",
      "WhatsApp Re-Order Workflows: Automated reminders timed to weekly household replenishment cycles.",
    ],
    recommendedServiceSlugs: ["d2c-brand-audit", "d2c-gtm-strategy", "d2c-cro"],
    relatedCaseStudy: {
      title: "How The Whole Truth Built a Cult Following Through Radical Honesty",
      slug: "successful-d2c-brand-case-studies-india",
      excerpt: "100% ingredient transparency displayed on front-of-pack created immense customer trust and massive quick-commerce repeat velocity.",
    },
    faqs: [
      {
        question: "How do you solve high shipping costs on lightweight snack packages?",
        answer: "By packaging in space-efficient flat-bottom pouches, setting minimum box orders (e.g. pack of 6), and optimizing outer carton dimensions to prevent dimensional weight surcharges.",
      },
      {
        question: "What repeat purchase rate should a healthy snacking brand target?",
        answer: "A healthy consumable snacking brand should target at least 30% to 40% repeat purchase rates within 90 days of first purchase.",
      },
    ],
    metaTitle: "Healthy Snacking D2C Launchpad India | GetIntoD2C",
    metaDescription: "Launch and scale clean-label healthy snacking brands in India. Impulse pricing, nitrogen barrier packaging, and quick-commerce velocity.",
  },
  {
    slug: "health-supplements",
    name: "Health Supplements & Nutraceuticals",
    tag: "Category · Efficacy",
    tagline: "Bridging clinical rigor with lifestyle aesthetics that founders, regulators, and buyers trust from first order to monthly subscription.",
    description: "The Indian preventive wellness and nutraceuticals market is undergoing rapid premiumization. Success requires overcoming high consumer skepticism through clinical transparency, third-party lab verification, and educational content that converts intent into sustained routine.",
    marketDynamics: [
      "Surge in demand for specialized nutritional formats: gummies, effervescent tablets, powders, and targeted botanical blends.",
      "Growing consumer aversion to proprietary blends with hidden ingredient dosages.",
      "High willingness to pay premium pricing for certified heavy-metal-free products.",
    ],
    keyChallenges: [
      "High customer acquisition costs driven by intense paid ad competition.",
      "Strict regulatory compliance under FSSAI Nutraceutical Regulations 2022.",
      "Consumer drop-off after 30 days if immediate tangible outcomes are not felt.",
    ],
    growthPlaybooks: [
      "Ingredient Transparency Teardowns: Detail exact dosages, standardized extract percentages, and clinical study citations on product detail pages.",
      "Monthly Subscription Incentives: Offer guaranteed delivery cadence and discounted auto-refills for continuous regimens.",
      "Trust Badges & COA Access: Provide downloadable third-party lab test reports via QR code on every bottle.",
    ],
    recommendedServiceSlugs: ["d2c-positioning", "d2c-retention", "d2c-cro"],
    faqs: [
      {
        question: "What compliance guidelines govern nutraceuticals in India?",
        answer: "Formulations must adhere strictly to FSSAI-approved ingredient schedules, permissible daily allowances (RDA), and avoid making medicinal or therapeutic disease-curing claims.",
      },
      {
        question: "How do you build customer retention for supplements?",
        answer: "Through proactive educational onboarding content explaining proper usage timing, lifestyle tips, and automated WhatsApp refill prompts delivered before their supply runs out.",
      },
    ],
    metaTitle: "Nutraceutical & Health Supplements D2C Strategy India | GetIntoD2C",
    metaDescription: "Launch trusted health supplement and wellness brands in India. Regulatory FSSAI compliance, clinical positioning, and subscription retention.",
  },
  {
    slug: "beverages",
    name: "Beverages & Functional Drinks",
    tag: "Category · Craft",
    tagline: "Botanicals, functional formats, ready-to-drink innovations, and category-creating brand worlds built for thirst and repeat habit.",
    description: "Beverages represent one of the most exciting consumer spaces in India, from craft sodas and cold-brew coffees to functional adaptogenic elixirs. We help beverage founders navigate liquid freight realities, glass breakage prevention, and localized cold-chain distribution.",
    marketDynamics: [
      "Rapid consumer adoption of reduced-sugar, sparkling, and botanical refreshment alternatives.",
      "Quick commerce serving as an instant chilled beverage discovery and trial channel.",
      "Rise of cafe culture and HoReCa (Hotel/Restaurant/Cafe) as premium brand placement anchors.",
    ],
    keyChallenges: [
      "High freight costs due to liquid weight and glass packaging fragility in courier networks.",
      "Strict temperature stability requirements during Indian summer logistics.",
      "High shelf slotting fees in traditional Modern Trade supermarkets.",
    ],
    growthPlaybooks: [
      "Aluminium Can Packaging: Switch from heavy glass bottles to lightweight, 100% recyclable sleek aluminium cans to cut shipping weight and eliminate transit breakage.",
      "Hyperlocal Quick-Commerce Distribution: Stage inventory in top metro dark stores where cold cans can be delivered chilled in 10 minutes.",
      "HoReCa & Co-Branded Partnerships: Place craft beverages in premium specialty cafes and gourmet grocery stores for organic brand discovery.",
    ],
    recommendedServiceSlugs: ["d2c-gtm-strategy", "d2c-positioning", "d2c-growth"],
    faqs: [
      {
        question: "How can early-stage beverage brands prevent shipping breakage?",
        answer: "We advise transitioning to sleek aluminium cans or using custom molded honeycomb paper and air-column protective sleeves for glass bottles.",
      },
      {
        question: "Can beverages succeed on pure D2C e-commerce alone?",
        answer: "Beverages thrive best on an omnichannel model: D2C website for curated variety crates and subscriptions, paired with quick commerce for immediate chilled single-can gratification.",
      },
    ],
    metaTitle: "Beverage D2C Strategy & Modern Distribution India | GetIntoD2C",
    metaDescription: "Scale functional beverage and craft drink brands in India. Liquid freight economics, aluminium can transition, and quick-commerce dark store growth.",
  },
  {
    slug: "fashion-accessories",
    name: "Fashion Accessories & Streetwear",
    tag: "Category · Drop",
    tagline: "Capsule drops, considered design cycles, high-GSM craftsmanship, and community-first launches that build cult brand equity.",
    description: "Indian fashion and lifestyle consumers are moving away from mass fast-fashion toward brands with cultural authenticity, high-density fabrics, and distinct aesthetic worlds. We help apparel and accessories founders architect high-margin drop models that eliminate deadstock.",
    marketDynamics: [
      "Explosion of homegrown Indian luxury streetwear and contemporary lifestyle accessories.",
      "Shift from massive static catalogs to high-velocity limited capsule drops that build urgency.",
      "Importance of offline flagship showroom touchpoints to let customers feel fabric weight and finish.",
    ],
    keyChallenges: [
      "High return and exchange rates driven by sizing confusion and fit expectations.",
      "Deadstock risk from over-ordering unpopular sizes and seasonal colorways.",
      "Price resistance if fabric quality and finish do not clearly justify a premium.",
    ],
    growthPlaybooks: [
      "The Zero-Restock Scarcity Model: Release strictly limited production runs that sell out at full price with zero end-of-season discounting.",
      "Detailed Sizing Architecture: Implement interactive size finders, model dimensions, and fabric GSM transparency to cut returns by half.",
      "Community Drop Previews: Give VIP WhatsApp community members first-look access 1 hour prior to public drop release.",
    ],
    recommendedServiceSlugs: ["d2c-positioning", "d2c-growth", "d2c-retention"],
    relatedCaseStudy: {
      title: "How BLUORNG Built a Cult Streetwear Icon Using Scarcity",
      slug: "bluorng-scarcity-streetwear",
      excerpt: "Why refusing to restock sold-out drops and commanding ₹4,000+ price points created massive full-margin velocity for an Indian streetwear label.",
    },
    faqs: [
      {
        question: "How do you reduce returns in online fashion and apparel?",
        answer: "By clearly stating fabric GSM, providing detailed model height and fit metrics, and offering instant automated exchange flows on WhatsApp rather than refunds.",
      },
      {
        question: "How does the drop model protect gross margins?",
        answer: "Limited-batch drops create immediate urgency, ensuring 90%+ sell-through at full retail price and completely eliminating margin-eroding clearance sales.",
      },
    ],
    metaTitle: "Fashion Accessories & Streetwear D2C Strategy India | GetIntoD2C",
    metaDescription: "Launch premium fashion, accessories, and streetwear brands in India. Scarcity drop mechanics, high-GSM fabric sourcing, and return rate reduction.",
  },
];

export function getCategory(slug: string): CategoryData | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
