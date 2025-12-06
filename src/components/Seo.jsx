import { Helmet } from "react-helmet-async";
import {
  ROUTE_METADATA,
  SOCIAL_IMAGE,
  buildStructuredData,
} from "../seo/metadata";
import { BRAND } from "../constants/brand";

const Seo = ({ page = "home" }) => {
  const meta = ROUTE_METADATA[page] || ROUTE_METADATA.home;
  const ogImage = meta.ogImage || SOCIAL_IMAGE;
  const structuredData = buildStructuredData(meta);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={meta.canonical} />

      <meta property="og:type" content={meta.ogType || "website"} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:title" content={meta.ogTitle || meta.title} />
      <meta
        property="og:description"
        content={meta.ogDescription || meta.description}
      />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.twitterTitle || meta.title} />
      <meta
        name="twitter:description"
        content={meta.twitterDescription || meta.description}
      />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default Seo;

