import fs from "node:fs";
import path from "node:path";

export type AppFeature = { title: string; description: string };

export type AppContent = {
  schema: "app-page/v1";
  slug: string;
  published: boolean;
  name: string;
  tagline: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  icon: { viewBox: string; path: string };
  features: AppFeature[];
  store: {
    state: "coming-soon" | "live";
    appStoreUrl: string;
    appleId: string;
    providerToken: string;
  };
  links: { label: string; href: string }[];
  newsletterTag: string;
  newsletterPrompt: string;
};

export type SiteContent = {
  schema: "site/v1";
  siteName: string;
  baseUrl: string;
  company: string;
  supportEmail: string;
  esp: { provider: string; username: string; enabled: boolean };
  press: { contact: string; blurb: string };
};

const contentDir = path.join(process.cwd(), "content");

export function getSite(): SiteContent {
  return JSON.parse(
    fs.readFileSync(path.join(contentDir, "site.json"), "utf8"),
  ) as SiteContent;
}

export function getApps(): AppContent[] {
  const dir = path.join(contentDir, "apps");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map(
      (f) =>
        JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as AppContent,
    )
    .filter((app) => app.published);
}

export function getApp(slug: string): AppContent | undefined {
  return getApps().find((app) => app.slug === slug);
}
