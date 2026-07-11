import type { Metadata } from "next";
import { getApps, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press | ManifestLab",
  description:
    "Press resources for ManifestLab apps — Riff, Steadfast, and more by Cognitive Core Technologies LLC.",
};

export default function PressPage() {
  const site = getSite();
  const apps = getApps();

  return (
    <main className="gradient-bg min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-12 inline-block text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          &larr; manifestlab.dev
        </a>

        <h1 className="font-display mb-2 text-3xl font-bold tracking-tight md:text-4xl">
          Press
        </h1>
        <p className="mb-10 text-foreground-muted leading-relaxed">
          {site.press.blurb}
        </p>

        <div className="mb-16 space-y-6">
          {apps.map((app) => (
            <div key={app.slug}>
              <h2 className="font-display font-semibold text-foreground">
                <a
                  href={`/${app.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {app.name}
                </a>
              </h2>
              <p className="mt-1 text-foreground-muted">{app.tagline}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 text-sm text-foreground-muted">
          <p>
            Press inquiries, screenshots, and app icons:{" "}
            <a
              href={`mailto:${site.press.contact}`}
              className="text-accent transition-colors hover:text-accent-hover"
            >
              {site.press.contact}
            </a>
          </p>
        </div>

        <p className="mt-6 text-xs text-foreground-muted">{site.company}</p>
      </div>
    </main>
  );
}
