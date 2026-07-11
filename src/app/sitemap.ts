import type { MetadataRoute } from "next";
import { getApps, getSite } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: site.baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.baseUrl}/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  for (const app of getApps()) {
    entries.push({
      url: `${site.baseUrl}/${app.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const link of app.links) {
      entries.push({
        url: `${site.baseUrl}${link.href}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.3,
      });
    }
  }

  return entries;
}
