import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
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
    url: "#services",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Our Designers",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Get In Touch",
    url: "#login",
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
    id: "0",
    title: "Logo Design",
    description: "Tell us your idea, our designers will bring it to life by creating the perfect image for your brand",
    price: "150",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Web Design",
    description: "Complete Website Design and Deployment, publishing your company to a digital space",
    price: "500",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "2",
    title: "App Development",
    description: "Includes UI/UX design, App functionality development, and deployment on both App Store + Play Store",
    price: "5000",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
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
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
