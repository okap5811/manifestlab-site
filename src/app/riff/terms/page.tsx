import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riff Terms of Use | ManifestLab",
  description:
    "Terms of Use for Riff — the on-device voice-to-text app by Cognitive Core Technologies LLC.",
};

export default function RiffTermsPage() {
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
          Riff Terms of Use
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          Last updated: June 13, 2026
        </p>

        <div className="space-y-6 text-foreground-muted leading-relaxed">
          <p>
            These Terms govern your use of the Riff app. By using Riff, you agree
            to them. Riff is also subject to Apple&apos;s standard{" "}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-accent-hover"
            >
              Licensed Application End User License Agreement (EULA)
            </a>
            ; where these Terms and Apple&apos;s standard EULA overlap, the
            standard EULA applies to your license to use the app.
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              The app
            </h2>
            <p>
              Riff is an on-device voice-to-text utility. It records your voice,
              transcribes it to text on your device, and can generate formatted
              text (Recaps, action items, and titles) from your transcripts using
              on-device AI. All processing happens on your device; see our{" "}
              <a
                href="/riff/privacy"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              riff+ (one-time purchase)
            </h2>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                riff+ is a{" "}
                <strong className="text-foreground">
                  one-time, non-consumable purchase
                </strong>{" "}
                of $19.99 (or the equivalent in your local currency) that unlocks
                Riff&apos;s AI features (Recap, action items, and smart titles).{" "}
                <strong className="text-foreground">
                  It is not a subscription
                </strong>{" "}
                — there is no recurring charge and nothing to renew or cancel.
              </li>
              <li>
                Your purchase is tied to your Apple ID and can be restored on your
                devices via &ldquo;Restore Purchases.&rdquo;
              </li>
              <li>
                Purchases are processed by Apple through the App Store and are
                subject to Apple&apos;s terms and refund policies.
              </li>
              <li>
                The free version of Riff provides voice transcription and
                copy-to-clipboard at no charge.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Acceptable use
            </h2>
            <p>
              Use Riff for your own lawful purposes. You are responsible for the
              content you record and create with Riff.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              AI-generated content
            </h2>
            <p>
              Riff&apos;s Recaps, action items, and titles are generated
              automatically from your own dictation by an on-device AI model. AI
              output may contain errors or omissions; review it before relying on
              it. You own the content you create with Riff.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Disclaimer &amp; limitation of liability
            </h2>
            <p>
              Riff is provided &ldquo;as is,&rdquo; without warranties of any kind
              to the extent permitted by law. To the maximum extent permitted by
              law, Cognitive Core Technologies LLC (&ldquo;ManifestLab&rdquo;) is
              not liable for any indirect or consequential damages arising from
              your use of Riff.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Changes
            </h2>
            <p>
              We may update these Terms; we will update this page and the
              &ldquo;Last updated&rdquo; date above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Contact
            </h2>
            <p>
              <a
                href="mailto:contact@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                contact@manifestlab.dev
              </a>{" "}
              &middot;{" "}
              <a
                href="/riff/support"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                manifestlab.dev/riff/support
              </a>
            </p>
          </section>

          <div className="mt-10 rounded-lg border border-border bg-background-secondary p-6">
            <p className="text-foreground">
              <span className="font-display font-semibold">Contact</span>
              <br />
              <a
                href="mailto:contact@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                contact@manifestlab.dev
              </a>
            </p>
            <p className="mt-2 text-sm">Last updated: June 13, 2026</p>
            <p className="mt-1 text-sm">Cognitive Core Technologies LLC</p>
          </div>
        </div>
      </div>
    </main>
  );
}
