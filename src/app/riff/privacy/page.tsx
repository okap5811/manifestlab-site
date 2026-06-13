import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riff Privacy Policy | ManifestLab",
  description:
    "Privacy policy for Riff — the on-device voice-to-text app by Cognitive Core Technologies LLC. Your voice and words never leave your device.",
};

export default function RiffPrivacyPage() {
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
          Riff Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          Last updated: June 13, 2026
        </p>

        <div className="space-y-6 text-foreground-muted leading-relaxed">
          <p>
            Riff is built on a simple promise:{" "}
            <strong className="text-foreground">
              your voice and your words never leave your device.
            </strong>
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              The short version
            </h2>
            <p>
              Riff does <strong className="text-foreground">not</strong> collect,
              transmit, sell, or share your personal data. There are no accounts,
              no servers, and no analytics. Everything Riff does happens on your
              iPhone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              What Riff processes, and where
            </h2>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-foreground">
                  Your voice recordings
                </strong>{" "}
                are captured on your device and transcribed to text{" "}
                <strong className="text-foreground">on your device</strong>, using
                Apple&apos;s on-device speech recognition. Your audio is never
                sent to Riff, to Apple&apos;s servers, or to anyone else.
              </li>
              <li>
                <strong className="text-foreground">
                  Your transcripts and the text Riff generates
                </strong>{" "}
                (Recaps, action items, and titles) are created{" "}
                <strong className="text-foreground">on your device</strong> using
                Apple&apos;s on-device foundation models. None of this content is
                uploaded anywhere.
              </li>
              <li>
                <strong className="text-foreground">
                  Your recordings, transcripts, and generated text are stored only
                  on your device.
                </strong>{" "}
                Riff has no servers and does not sync your content anywhere. If you
                use iCloud Backup for your iPhone, your Riff data may be included
                in your own encrypted device backup, which only you control and
                which Riff cannot access. You can delete any recording at any time,
                and Riff can be set to automatically delete recordings after a
                period you choose.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              What Riff does NOT do
            </h2>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                We do <strong className="text-foreground">not</strong> collect
                analytics or usage data.
              </li>
              <li>
                We do <strong className="text-foreground">not</strong> use
                third-party tracking or advertising SDKs.
              </li>
              <li>
                We do <strong className="text-foreground">not</strong> require an
                account, email, or login.
              </li>
              <li>
                We do <strong className="text-foreground">not</strong> transmit
                your audio, transcripts, or generated text off your device.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Permissions
            </h2>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-foreground">Microphone</strong> — used
                only to record your voice so it can be transcribed on your device.
              </li>
              <li>
                <strong className="text-foreground">Speech Recognition</strong> —
                used only to transcribe your speech to text on your device; no
                audio is sent to any server.
              </li>
            </ul>
            <p>
              You can revoke these permissions at any time in iOS Settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Purchases
            </h2>
            <p>
              riff+ is a one-time purchase processed by Apple through the App
              Store. Riff does not receive or store your payment information; Apple
              handles all payment processing under Apple&apos;s privacy policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Children
            </h2>
            <p>
              Riff is not directed at children and does not knowingly collect any
              information from anyone, including children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Changes
            </h2>
            <p>
              If this policy changes, we will update this page and the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Contact
            </h2>
            <p>
              Questions about privacy? Contact us at{" "}
              <a
                href="mailto:omar@manifestlab.dev"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                omar@manifestlab.dev
              </a>{" "}
              or via{" "}
              <a
                href="/riff/support"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                manifestlab.dev/riff/support
              </a>
              .
            </p>
          </section>

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
            <p className="mt-2 text-sm">Last updated: June 13, 2026</p>
            <p className="mt-1 text-sm">Cognitive Core Technologies LLC</p>
          </div>
        </div>
      </div>
    </main>
  );
}
