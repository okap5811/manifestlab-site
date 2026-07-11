import type { AppContent, SiteContent } from "@/lib/content";

function AppIcon({ icon }: { icon: AppContent["icon"] }) {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-[22px] bg-gradient-to-br from-accent/20 to-purple-500/20 border border-border shadow-lg shadow-accent/5">
      <svg
        className="h-14 w-14 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox={icon.viewBox}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={icon.path}
        />
      </svg>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
      <div>
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-foreground-muted">{description}</p>
      </div>
    </div>
  );
}

function StoreBlock({ store }: { store: AppContent["store"] }) {
  if (store.state === "live" && store.appStoreUrl) {
    return (
      <a href={store.appStoreUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          className="h-14"
        />
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground-muted">
      <svg
        className="h-4 w-4 text-accent"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.43-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.886 4.45z" />
      </svg>
      Coming soon to the App Store
    </span>
  );
}

function NewsletterForm({
  app,
  site,
}: {
  app: AppContent;
  site: SiteContent;
}) {
  if (!site.esp.enabled) return null;
  return (
    <div className="mb-16 rounded-lg border border-border bg-background-secondary p-6">
      <p className="mb-4 text-sm text-foreground-muted">
        {app.newsletterPrompt}
      </p>
      <form
        action={`https://buttondown.com/api/emails/embed-subscribe/${site.esp.username}`}
        method="post"
        className="flex flex-wrap gap-3"
      >
        <input type="hidden" name="tag" value={app.newsletterTag} />
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs text-foreground-muted">
        Double opt-in. No tracking. Unsubscribe any time.
      </p>
    </div>
  );
}

export default function AppPage({
  app,
  site,
}: {
  app: AppContent;
  site: SiteContent;
}) {
  return (
    <main className="gradient-bg min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-16 inline-block text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          &larr; manifestlab.dev
        </a>

        {/* Hero */}
        <div className="mb-16">
          <AppIcon icon={app.icon} />
          <h1 className="font-display mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            {app.name}
          </h1>
          <p className="mt-3 text-xl text-foreground-muted">{app.tagline}</p>
        </div>

        {/* Features */}
        <div className="mb-16 space-y-6">
          {app.features.map((f) => (
            <Feature key={f.title} title={f.title} description={f.description} />
          ))}
        </div>

        {/* App Store */}
        <div className="mb-16">
          <StoreBlock store={app.store} />
        </div>

        <NewsletterForm app={app} site={site} />

        {/* Footer links */}
        <div className="flex flex-wrap gap-6 border-t border-border pt-8 text-sm text-foreground-muted">
          {app.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${site.supportEmail}`}
            className="transition-colors hover:text-accent"
          >
            Contact
          </a>
        </div>

        <p className="mt-6 text-xs text-foreground-muted">{site.company}</p>
      </div>
    </main>
  );
}
