import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steadfast — Fasting Timer & Wellness Tracker",
  description:
    "No ads. No account. Just fast. Steadfast is a private, offline-first intermittent fasting timer for iOS.",
  openGraph: {
    title: "Steadfast — Fasting Timer & Wellness Tracker",
    description:
      "No ads. No account. Just fast. Steadfast is a private, offline-first intermittent fasting timer for iOS.",
    url: "https://manifestlab.dev/steadfast",
    siteName: "ManifestLab",
    type: "website",
  },
};

function AppIcon() {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-[22px] bg-gradient-to-br from-accent/20 to-purple-500/20 border border-border shadow-lg shadow-accent/5">
      <svg
        className="h-14 w-14 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
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

export default function SteadfastPage() {
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
          <AppIcon />
          <h1 className="font-display mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Steadfast
          </h1>
          <p className="mt-3 text-xl text-foreground-muted">
            No ads. No account. Just fast.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16 space-y-6">
          <Feature
            title="Intermittent Fasting Timer"
            description="Track your fasts with a clean, distraction-free timer. Supports all popular schedules — 16:8, 18:6, 20:4, OMAD, and custom plans."
          />
          <Feature
            title="Weight & Water Tracking"
            description="Log your weight and daily water intake. Integrates with Apple Health so your data stays in sync."
          />
          <Feature
            title="100% Private & Offline"
            description="All data lives on your device. No analytics, no tracking SDKs, no account required. Your health data is yours alone."
          />
          <Feature
            title="iCloud Sync"
            description="Optionally sync across your devices with iCloud. Your data stays in your personal Apple account — we never see it."
          />
        </div>

        {/* App Store Badge */}
        <div className="mb-16">
          <a
            href="https://apps.apple.com/us/app/steadfast-fasting-tracker/id6761577451"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-14"
            />
          </a>
        </div>

        {/* Footer links */}
        <div className="flex gap-6 border-t border-border pt-8 text-sm text-foreground-muted">
          <a
            href="/steadfast/privacy"
            className="transition-colors hover:text-accent"
          >
            Privacy Policy
          </a>
          <a
            href="/steadfast/support"
            className="transition-colors hover:text-accent"
          >
            Support
          </a>
          <a
            href="mailto:contact@manifestlab.dev"
            className="transition-colors hover:text-accent"
          >
            Contact
          </a>
        </div>

        <p className="mt-6 text-xs text-foreground-muted">
          Cognitive Core Technologies LLC
        </p>
      </div>
    </main>
  );
}
