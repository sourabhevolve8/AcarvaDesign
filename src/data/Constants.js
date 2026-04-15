export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#work"     },
  { label: "About",    href: "#about"    },
  { label: "Team",     href: "#team"     },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Blog",     href: "#blog"     },
  { label: "Contact",  href: "#contact"  },
];

export const SERVICES = [
  { icon: "◈", title: "Brand Strategy",      desc: "We craft unforgettable brand identities — from naming and positioning to full visual systems — that dominate markets and command attention.", tag: "Branding"  },
  { icon: "◉", title: "Digital Marketing",   desc: "ROI-obsessed campaigns across SEO, Google Ads, Meta, and email that grow your audience and fill your pipeline with qualified leads.",        tag: "Growth"    },
  { icon: "◎", title: "Web Design & Dev",    desc: "Blazing-fast, conversion-optimized websites and web apps. We blend stunning UI/UX with clean code to turn visitors into customers.",       tag: "Digital"   },
  { icon: "◆", title: "Content Creation",    desc: "From brand films to social reels and editorial photography — we tell your story with cinematic quality that stops thumbs and drives action.", tag: "Content" },
  { icon: "◑", title: "Business Consulting", desc: "Strategic roadmaps, competitive analysis, and growth planning from seasoned operators who've scaled businesses across multiple industries.", tag: "Strategy"  },
  { icon: "◐", title: "Social Media Mgmt",   desc: "End-to-end social presence management: strategy, content calendar, community building, and monthly analytics reporting.",                   tag: "Social"    },
];

export const STATS = [
  { value: "250", suffix: "+",  label: "Brands Built"        },
  { value: "12",  suffix: "M+", label: "Revenue Generated"   },
  { value: "98",  suffix: "%",  label: "Client Retention"    },
  { value: "8",   suffix: "+",  label: "Years of Excellence" },
];

export const WORK = [
  { tag: "Brand Identity",  title: "LuxeNoir Fashion",   desc: "Complete rebrand that tripled store footfall",      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", accent: "#F5C518" },
  { tag: "Web Platform",    title: "Vertice SaaS",       desc: "B2B dashboard with 340% sign-up growth",            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", accent: "#ffffff" },
  { tag: "Digital Campaign",title: "Apex Fitness Launch",desc: "1.2M reach across Instagram & TikTok",              img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", accent: "#F5C518" },
  { tag: "Brand + Strategy",title: "Harlow Capital",     desc: "Premium finance brand that raised $40M",            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", accent: "#ffffff" },
  { tag: "Content + Social",title: "Orion Hospitality",  desc: "Luxury hotel social strategy — 4× engagement",     img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", accent: "#F5C518" },
  { tag: "E-commerce",      title: "Terroir Wine Co.",   desc: "Shopify store with $2.8M year-1 revenue",           img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", accent: "#ffffff" },
];

export const TESTIMONIALS = [
  { name: "Priya Mehta",  role: "CEO, Vertice",          quote: "Acarva didn't just build our brand — they built our future. Revenue tripled within 18 months of launch. Genuinely the best investment we've ever made.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
  { name: "James Okafor", role: "Founder, Apex Fitness", quote: "The most strategic and creative team I've ever hired. They understood our vision immediately and delivered beyond every expectation. Results speak for themselves.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
  { name: "Sofia Larsen", role: "CMO, LuxeNoir",         quote: "Flawless execution, stunning design, and a team that genuinely obsesses over your success. Acarva elevated our brand from local boutique to global icon.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
  { name: "Marcus Webb",  role: "MD, Harlow Capital",    quote: "Our $40M raise wouldn't have happened without the credibility Acarva's branding gave us. Investors commented on our brand before anything else.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80" },
];

export const TEAM = [
  { name: "Rayan Acarva",  role: "Founder & CEO",      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
  { name: "Isabelle Chen", role: "Creative Director",  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
  { name: "Darius Osei",   role: "Head of Strategy",   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { name: "Nadia Vasquez", role: "Lead Web Developer", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
];

export const PROCESS = [
  { num: "01", title: "Discovery", desc: "Deep-dive audit of your brand, market position, competitors, and growth opportunities." },
  { num: "02", title: "Strategy",  desc: "Custom growth roadmap built around your goals — with clear KPIs and milestones." },
  { num: "03", title: "Execution", desc: "World-class creative and marketing delivery with obsessive attention to every detail." },
  { num: "04", title: "Scale",     desc: "Continuous optimization loops and monthly reporting to compound your results." },
];

export const PRICING = [
  {
    name: "Starter", price: "2,499", period: "/month",
    desc: "Perfect for emerging brands ready to grow",
    features: ["Brand Strategy Session","Social Media Management (2 platforms)","Monthly Content Creation (12 posts)","SEO Audit & Setup","Monthly Analytics Report"],
    cta: "Get Started", popular: false,
  },
  {
    name: "Growth", price: "5,999", period: "/month",
    desc: "For scaling businesses demanding results",
    features: ["Full Brand Identity System","Social Media (4 platforms)","30 Content Pieces / month","Paid Ad Campaign Management","Website Design & Dev","Bi-weekly Strategy Calls","Dedicated Account Manager"],
    cta: "Most Popular", popular: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "Full-service agency partnership",
    features: ["Everything in Growth","Executive Brand Consulting","PR & Media Outreach","Video Production","Custom Web Applications","24/7 Priority Support","Quarterly Business Reviews"],
    cta: "Book a Call", popular: false,
  },
];

export const CLIENTS = [
  "LuxeNoir","Vertice","Apex","Harlow Capital","Orion","Terroir","NordPath","Lumis Co",
  "LuxeNoir","Vertice","Apex","Harlow Capital","Orion","Terroir","NordPath","Lumis Co",
];

export const BLOG_POSTS = [
  {
    tag: "Brand Strategy",
    date: "Apr 10, 2025",
    readTime: "6 min read",
    title: "Why Your Brand Identity Is Costing You Clients",
    excerpt: "Most businesses lose deals before the first call. Here's the brutal truth about what your visual brand communicates — and how to fix it fast.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    author: { name: "Rayan Acarva", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80" },
  },
  {
    tag: "Digital Marketing",
    date: "Mar 28, 2025",
    readTime: "8 min read",
    title: "The 3-Channel Strategy That Drove $2M in 90 Days",
    excerpt: "A breakdown of the exact paid + organic + email system we used to scale Terroir Wine Co. from launch to $2M in their first year.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    author: { name: "Darius Osei", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  },
  {
    tag: "Web Design",
    date: "Mar 14, 2025",
    readTime: "5 min read",
    title: "10 UX Mistakes Killing Your Conversion Rate",
    excerpt: "We audited 50 client websites before and after redesign. These 10 patterns appeared in every underperforming site — and none of them are obvious.",
    img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80",
    author: { name: "Nadia Vasquez", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80" },
  },
];