import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riff — On-Device Voice-to-Text",
  description:
    "Speak freely. Nothing leaves your iPhone. Riff is a private, on-device voice-to-text app with AI Recaps and action items.",
  openGraph: {
    title: "Riff — On-Device Voice-to-Text",
    description:
      "Speak freely. Nothing leaves your iPhone. Riff is a private, on-device voice-to-text app with AI Recaps and action items.",
    url: "https://manifestlab.dev/riff",
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
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
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

export default function RiffPage() {
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
            Riff
          </h1>
          <p className="mt-3 text-xl text-foreground-muted">
            Speak freely. Nothing leaves your iPhone.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16 space-y-6">
          <Feature
            title="On-Device Voice-to-Text"
            description="Record your voice and Riff transcribes it to text right on your iPhone, using Apple's on-device speech recognition. Your audio never leaves your device."
          />
          <Feature
            title="Recaps & Action Items"
            description="With riff+, turn rambling dictation into clean Recaps, action items, and smart titles — generated on your device by Apple's foundation models."
          />
          <Feature
            title="100% Private"
            description="Your voice and your words never leave your iPhone. No accounts, no servers, no analytics, no tracking SDKs."
          />
          <Feature
            title="One-Time Purchase"
            description="riff+ unlocks the AI features for a single $19.99 purchase. It's not a subscription — there's nothing to renew or cancel."
          />
        </div>

        {/* App Store — Riff is not live yet. Replace this block with the
            download badge (see /steadfast for the pattern) once it ships. */}
        <div className="mb-16">
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
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-6 border-t border-border pt-8 text-sm text-foreground-muted">
          <a
            href="/riff/privacy"
            className="transition-colors hover:text-accent"
          >
            Privacy Policy
          </a>
          <a
            href="/riff/terms"
            className="transition-colors hover:text-accent"
          >
            Terms of Use
          </a>
          <a
            href="/riff/support"
            className="transition-colors hover:text-accent"
          >
            Support
          </a>
          <a
            href="mailto:omar@manifestlab.dev"
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
