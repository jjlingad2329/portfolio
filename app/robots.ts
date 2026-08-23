import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://jommel-lingad.sites.openai.com/sitemap.xml",
  };
}
