import { navigation } from "../constants";
import {
  BASE_URL,
  BRAND,
  BRAND_LOGO_ABSOLUTE,
  BRAND_LOGO_PATH,
} from "../constants/brand";

const canonical = (path) => {
  if (!path || path === "/") {
    return new URL("/", BASE_URL).href.replace(/\/$/, "");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${BASE_URL}/`).href.replace(/\/$/, "");
};

export const ROUTE_METADATA = {
  home: {
    path: "/",
    title: "Pixel Pure | Conversion websites, product builds & AI automations",
    description:
      "Pixel Pure is a UK & Canada-based studio shipping conversion-led websites, web apps, and AI automation with battle-tested engineering and design.",
    keywords:
      "Pixel Pure, web design studio, conversion websites, product engineering, AI automation, UK web agency",
    canonical: canonical("/"),
    section: "Home",
    breadcrumbs: [{ name: "Home", url: canonical("/") }],
    ogImage: `${BASE_URL}/assets/pixel_pure_logo.png`,
  },
  story: {
    path: "/story",
    title: "Our Story | How Pixel Pure was built",
    description:
      "Follow the Pixel Pure journey from late-night experiments to a full product studio delivering launch-ready websites, apps, and automation.",
    canonical: canonical("/story"),
    section: "Story",
    breadcrumbs: [
      { name: "Home", url: canonical("/") },
      { name: "Our Story", url: canonical("/story") },
    ],
  },
  pricing: {
    path: "/pricing",
    title: "Pricing | Transparent engagements with Pixel Pure",
    description:
      "Review Pixel Pure’s pricing for brand identity, conversion websites, product builds, and AI automation. Scope engagements with weekly delivery rituals.",
    canonical: canonical("/pricing"),
    section: "Pricing",
    breadcrumbs: [
      { name: "Home", url: canonical("/") },
      { name: "Pricing", url: canonical("/pricing") },
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact Pixel Pure | Book a call",
    description:
      "Tell us about your roadmap and timeline. Pixel Pure replies within two business days with a project plan and kickoff availability.",
    canonical: canonical("/contact"),
    section: "Contact",
    breadcrumbs: [
      { name: "Home", url: canonical("/") },
      { name: "Contact", url: canonical("/contact") },
    ],
  },
  designers: {
    path: "/designers",
    title: "Designer Showcase | Pixel Pure creative roster",
    description:
      "Preview the designer showcase and join the waitlist to meet the multidisciplinary team behind Pixel Pure’s launches.",
    canonical: canonical("/designers"),
    section: "Designers",
    breadcrumbs: [
      { name: "Home", url: canonical("/") },
      { name: "Designers", url: canonical("/designers") },
    ],
  },
};

const navItems = navigation.map((item, index) => {
  const itemUrl = item.url.startsWith("http")
    ? item.url
    : canonical(item.url.replace(/^\/\//, "/"));

  return {
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: item.title,
    url: itemUrl,
  };
});

const organizationSchema = {
  "@type": "Organization",
  "@id": `${BASE_URL}#organization`,
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: BRAND.url,
  logo: BRAND_LOGO_ABSOLUTE,
  image: BRAND_LOGO_ABSOLUTE,
  sameAs: BRAND.sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: BRAND.email,
      telephone: BRAND.telephone,
      areaServed: ["GB", "CA"],
      availableLanguage: ["English"],
    },
  ],
  address: BRAND.locations[0],
  areaServed: ["GB", "CA"],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${BASE_URL}#website`,
  url: BASE_URL,
  name: BRAND.name,
  publisher: {
    "@id": `${BASE_URL}#organization`,
  },
  inLanguage: "en-GB",
};

const navSchema = {
  "@type": "ItemList",
  "@id": `${BASE_URL}#site-navigation`,
  name: "Pixel Pure primary navigation",
  itemListElement: navItems,
};

export const buildStructuredData = (meta) => {
  const breadcrumbId = `${meta.canonical}#breadcrumb`;
  const breadcrumbSchema =
    meta.breadcrumbs && meta.breadcrumbs.length > 1
      ? {
          "@type": "BreadcrumbList",
          "@id": breadcrumbId,
          itemListElement: meta.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        }
      : null;

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${BASE_URL}#organization` },
    breadcrumb: breadcrumbSchema ? { "@id": breadcrumbId } : undefined,
  };

  const graph = [
    organizationSchema,
    websiteSchema,
    navSchema,
    webPageSchema,
  ];

  if (breadcrumbSchema) {
    graph.push(breadcrumbSchema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const SOCIAL_IMAGE = BRAND_LOGO_ABSOLUTE;
export const LOGO_PATH = BRAND_LOGO_PATH;

