import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riff Support | ManifestLab",
  description:
    "Get help with Riff — the on-device voice-to-text app by Cognitive Core Technologies LLC.",
};

export default function RiffSupportPage() {
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
          Riff Support
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          Need help with Riff? You&apos;re in the right place.
        </p>

        <div className="space-y-10 text-foreground-muted leading-relaxed">
          <section>
            <h2 className="font-display mb-6 text-xl font-semibold text-foreground">
              Quick help
            </h2>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-foreground">Recording:</strong> Tap the
                aperture on the Riff screen, or press the Action Button (set it up
                in Settings &gt; Action Button), to start and stop a recording.
              </li>
              <li>
                <strong className="text-foreground">
                  Recaps &amp; action items (riff+):
                </strong>{" "}
                After a recording, open it and tap Recap or Actions to generate a
                clean, formed version of what you said — all on your device.
              </li>
              <li>
                <strong className="text-foreground">Editing a title:</strong> Open
                a recording and tap the title to rename it.
              </li>
              <li>
                <strong className="text-foreground">Auto-delete:</strong> Settings
                &gt; Data lets you choose how long Riff keeps recordings (default
                30 days, or never).
              </li>
              <li>
                <strong className="text-foreground">Restore a purchase:</strong>{" "}
                Settings &gt; Restore Purchases re-applies your riff+ purchase on a
                new device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display mb-3 text-xl font-semibold text-foreground">
              Privacy
            </h2>
            <p>
              Everything Riff does happens on your device — your voice and text
              never leave your iPhone. See our{" "}
              <a
                href="/riff/privacy"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <h2 className="font-display mb-3 text-lg font-semibold text-foreground">
              Contact
            </h2>
            <p>
              Still stuck or have feedback? Email us at{" "}
              <a
                href="mailto:omar@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                omar@manifestlab.dev
              </a>{" "}
              and we&apos;ll help.
            </p>
            <p className="mt-4 text-sm">Last updated: June 13, 2026</p>
            <p className="mt-1 text-sm">Cognitive Core Technologies LLC</p>
          </div>
        </div>
      </div>
    </main>
  );
}
