import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steadfast Support | ManifestLab",
  description:
    "Get help with Steadfast — the intermittent fasting and wellness tracker by Cognitive Core Technologies LLC.",
};

export default function SteadfastSupportPage() {
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
          Steadfast Support
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          We&apos;re here to help.
        </p>

        <div className="space-y-10 text-foreground-muted leading-relaxed">
          {/* Contact */}
          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <h2 className="font-display mb-3 text-lg font-semibold text-foreground">
              Contact Us
            </h2>
            <p>
              For questions, feedback, or issues, email us at{" "}
              <a
                href="mailto:contact@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                contact@manifestlab.dev
              </a>
              . We typically respond within 24 hours.
            </p>
          </div>

          {/* FAQ */}
          <section>
            <h2 className="font-display mb-6 text-xl font-semibold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display mb-1 font-medium text-foreground">
                  Where is my data stored?
                </h3>
                <p>
                  All data is stored locally on your device. If you enable
                  iCloud sync, it is stored in your personal iCloud account. We
                  never have access to your data.
                </p>
              </div>

              <div>
                <h3 className="font-display mb-1 font-medium text-foreground">
                  How do I restore my data on a new device?
                </h3>
                <p>
                  If you have iCloud sync enabled, your data will automatically
                  appear when you sign in with the same Apple ID on your new
                  device.
                </p>
              </div>

              <div>
                <h3 className="font-display mb-1 font-medium text-foreground">
                  How do I cancel my subscription?
                </h3>
                <p>
                  Subscriptions are managed through Apple. Go to{" "}
                  <strong className="text-foreground">
                    Settings &gt; Apple ID &gt; Subscriptions
                  </strong>{" "}
                  on your device to manage or cancel.
                </p>
              </div>

              <div>
                <h3 className="font-display mb-1 font-medium text-foreground">
                  Does Steadfast work offline?
                </h3>
                <p>
                  Yes. Steadfast works entirely offline. An internet connection
                  is only needed if you use iCloud sync.
                </p>
              </div>

              <div>
                <h3 className="font-display mb-1 font-medium text-foreground">
                  How do I delete my data?
                </h3>
                <p>
                  You can delete individual entries within the app, or delete all
                  data by removing the app from your device. If iCloud sync is
                  enabled, also remove Steadfast data from{" "}
                  <strong className="text-foreground">
                    Settings &gt; Apple ID &gt; iCloud &gt; Manage Storage
                  </strong>
                  .
                </p>
              </div>
            </div>
          </section>

          <p className="text-sm">
            Cognitive Core Technologies LLC
          </p>
        </div>
      </div>
    </main>
  );
}
