import {
  chromecast,
  disc02,
  facebook,
  figma,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  photoshop,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  twitter,
} from "../assets";

import portashop from "../assets/portashop.png"
import liquidity from "../assets/liquidity.png"
import oneclick from "../assets/oneclickhandling.jpg"
import pixelpure from "../assets/pixelpureicon.png"
import react from "../assets/technologies/react.png"
import firebase from "../assets/technologies/firebase.png"
import javascript from "../assets/technologies/javascript.png"
import threejs from "../assets/technologies/threejs.png"
import typescript from "../assets/technologies/typescript.png"
import nodejs from "../assets/technologies/nodejs.png"

export const navigation = [
  {
    id: "0",
    title: "Services",
    url: "/#services",
  },
  {
    id: "story",
    title: "Story",
    url: "/story",
  },
  {
    id: "1",
    title: "Pricing",
    url: "/pricing",
  },
  {
    id: "2",
    title: "Our Designers",
    url: "/designers",
  },
  {
    id: "3",
    title: "Get In Touch",
    url: "/contact",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [portashop, liquidity, oneclick];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "All members within the Pixel Pure team carry over 5 years of curated experience in a wide variety of efficient and effective technologies.";

  export const collabText2 =
  "We understand that each business is unique. Our solutions are customized to meet your specific needs, ensuring your digital presence aligns perfectly with your brand and goals.";  

  export const collabText3 =
  "From the initial consultation to the final launch and beyond, we provide comprehensive support at every stage. Our dedicated team is always available to assist with any updates, maintenance, or new requirements.";  

  export const collabText4 =
  "We rely on well trusted, robust technologies to refine our production, consisting of well known and effective methods of website and app development";  

export const collabContent = [
  {
    id: "0",
    title: "Heavily Experienced Developers",
    text: collabText,
  },
  {
    id: "1",
    title: "Tailored Solutions",
    text: collabText2
  },
  {
    id: "2",
    title: "End-to-End Support",
    text: collabText3
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 26,
  },
  {
    id: "1",
    title: "React",
    icon: react,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Firebase",
    icon: firebase,
    width: 34,
    height: 28,
  },
  {
    id: "3",
    title: "Threejs",
    icon: threejs,
    width: 32,
    height: 32,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "JavaScript",
    icon: javascript,
    width: 28,
    height: 28,
  },
  {
    id: "6",
    title: "NodeJs",
    icon: nodejs,
    width: 34,
    height: 34,
  },
  {
    id: "7",
    title: "TypeScript",
    icon: typescript,
    width: 28,
    height: 28,
  },
];

export const pricing = [
  {
    id: "identity",
    title: "Brand Identity & Systems",
    description:
      "Two-week sprint to craft a flexible identity system, launch-ready assets, and a UI kit you can actually use.",
    price: "1.5K",
    features: [
      "Naming, logo suite, and typography pairing",
      "Modular color + component tokens for web/app",
      "Social + pitch deck launch asset bundle",
    ],
    timeline: "2–3 weeks",
    bestFor: "Founders pre-launch or brands refreshing their look fast",
    deliverables:
      "Full logo suite, usage guide, and Figma component library ready for handoff.",
    support: "Asynchronous Loom reviews + one live critique session",
    badge: "Identity",
    ctaLabel: "Start an identity sprint",
  },
  {
    id: "web",
    title: "Conversion Websites",
    description:
      "High-performing marketing sites built in modern stacks (Next.js / Vite) with animation, CMS, and analytics baked in.",
    price: "3.5K",
    features: [
      "Up to 10 bespoke pages with responsive states",
      "Integrated CMS + forms, analytics, and automation",
      "Performance + SEO pass before launch",
    ],
    timeline: "4–6 weeks",
    bestFor: "Teams needing a site that can scale with campaigns and content",
    deliverables:
      "Source files, component library, and deployment pipeline/hosting handoff.",
    support: "30-day post-launch support & bug fixes included",
    badge: "Web",
    ctaLabel: "Ship my website",
  },
  {
    id: "product",
    title: "Product & App Builds",
    description:
      "End-to-end design, engineering, and QA for web/mobile products, admin portals, and bespoke tooling.",
    price: "8K",
    features: [
      "Product strategy + technical architecture",
      "Full-stack build (React/Next, Node, Flutter, etc.)",
      "Integrations: Stripe, Supabase, Firebase, custom APIs",
    ],
    timeline: "6–12 weeks",
    bestFor: "Startups and teams shipping the first version of a product",
    deliverables:
      "Deployed app, documentation, and CI/CD workflows with knowledge transfer.",
    support: "Optional retainer for roadmap iterations & growth",
    badge: "Product",
    ctaLabel: "Build my product",
  },
  {
    id: "ai",
    title: "AI Automation & Ops",
    description:
      "Custom AI agents, data pipelines, and workflow automation tailored to your stack and processes.",
    price: "Custom",
    showCurrency: false,
    showPlus: false,
    features: [
      "Process mapping + opportunity workshop",
      "LLM + vector store architecture and prompt design",
      "Agentic workflows that plug into your CRM, ops, or support stack",
    ],
    timeline: "3–6 weeks",
    bestFor: "Ops, CX, and product teams wanting measurable efficiency gains",
    deliverables:
      "Automation blueprints, secured deployments, and in-team enablement.",
    support: "Training + monitoring dashboard with 60-day optimisation cycle",
    badge: "AI",
    ctaLabel: "Scope my automation",
    highlight: true,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Web Design",
    text: "A Pixel Pure-designed website strengthens your online presence, boosts user engagement, and maximizes conversions. We offer customised features, like 3D models and animations, catering to your requirements and bringing your vision to life.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: pixelpure,
    imageUrl: pixelpure,
  },
  {
    id: "1",
    title: "App Development",
    text: "Our app development service creates mobile applications ranging from simple, purpose-specific apps to complex solutions with multiple features and integrations.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: pixelpure,
    imageUrl: pixelpure,
    light: true,
  },
  {
    id: "2",
    title: "Digital Consultancy",
    text: "Our digital consultancy transforms simple ideas into structured business plans, helping clients achieve their targets through strategic guidance and seamless web/app development.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: pixelpure,
    imageUrl: pixelpure,
  },
  {
    id: "3",
    title: "Logo and Branding",
    text: "Our Pixel Pure team features highly qualified graphic designers ready to brand your company. Visit our website to explore our designers' portfolios, view their work, and choose the perfect fit for your branding needs.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: pixelpure,
    imageUrl: pixelpure,
    light: true,
  },
  {
    id: "4",
    title: "Hire our Developers",
    text: "Optimize your website with Pixel Pure’s skilled frontend and backend developers. Existing clients can hire our developers to add new features and meet evolving requirements without the need for a complete redesign.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: pixelpure,
    imageUrl: pixelpure,
  },
  
];

export const socials = [
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "https://www.instagram.com/pixelpureltd/",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "https://www.instagram.com/pixelpureltd/",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "https://www.instagram.com/pixelpureltd/",
    },
  ];
  
