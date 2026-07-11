import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppPage from "@/components/AppPage";
import { getApp, getApps, getSite } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getApps().map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  const site = getSite();
  return {
    title: app.metaTitle,
    description: app.metaDescription,
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      url: `${site.baseUrl}/${app.slug}`,
      siteName: site.siteName,
      type: "website",
    },
  };
}

export default async function AppSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const site = getSite();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    operatingSystem: "iOS",
    applicationCategory: app.category,
    description: app.metaDescription,
    url: `${site.baseUrl}/${app.slug}`,
    author: {
      "@type": "Organization",
      name: site.siteName,
      legalName: site.company,
    },
    ...(app.store.state === "live" && app.store.appStoreUrl
      ? { installUrl: app.store.appStoreUrl }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppPage app={app} site={site} />
    </>
  );
}
