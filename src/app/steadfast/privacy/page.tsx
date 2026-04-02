import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steadfast Privacy Policy | ManifestLab",
  description:
    "Privacy policy for Steadfast — the intermittent fasting and wellness tracker by Cognitive Core Technologies LLC.",
};

export default function SteadfastPrivacyPage() {
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
          Steadfast Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          Last updated: April 2, 2026
        </p>

        <div className="space-y-6 text-foreground-muted leading-relaxed">
          <p>
            Steadfast does not collect, store, or share any personal data.
          </p>

          <p>
            All fasting records, weight entries, water tracking, and settings are
            stored locally on your device using Apple&apos;s SwiftData framework.
            If you enable iCloud sync (a premium feature), your data is stored in
            your personal iCloud account and is not accessible to Cognitive Core
            Technologies LLC or any third party.
          </p>

          <p>
            Steadfast does not use analytics, advertising, or tracking SDKs.
            Steadfast does not require an account or email address.
          </p>

          <p>
            If you enable HealthKit integration, Steadfast reads and writes
            weight data to Apple Health with your explicit permission. This data
            stays on your device and in your iCloud Health data — it is never
            sent to our servers.
          </p>

          <div className="mt-10 rounded-lg border border-border bg-background-secondary p-6">
            <p className="text-foreground">
              <span className="font-display font-semibold">Contact</span>
              <br />
              <a
                href="mailto:omar@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                omar@manifestlab.dev
              </a>
            </p>
            <p className="mt-2 text-sm">Cognitive Core Technologies LLC</p>
          </div>
        </div>
      </div>
    </main>
  );
}
