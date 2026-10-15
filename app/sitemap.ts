import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    ...caseStudies.map((study) => ({ url: `${site.url}/projects/${study.slug}/` })),
  ];
}
