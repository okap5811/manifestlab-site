import type { Metadata } from "next";

// Riff marketing page — implements _foundations/INBOX/2026-07-17-riff-web-page-brief.md.
// Server component only: no client JS, no analytics, no cookies — the page practices what the
// app preaches (server-side request counts are the only telemetry). Real app footage only
// (showcase-assets/riff/v1.0 → public/riff). Dark, calm, mobile-first. CTAs ride /go/ tokens.

const STORE_CTA = "/go/riff-web";
const STORE_CTA_FOOTER = "/go/riff-web-footer";
const APP_STORE_URL = "https://apps.apple.com/app/id6787581421";
const SUPPORT_EMAIL = "contact@manifestlab.dev";
const APP_STORE_BADGE =
  "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

export const metadata: Metadata = {
  title: "Riff — Private, on-device voice notes for iPhone",
  description:
    "Riff turns rambling voice notes into clean, useful recaps — entirely on your iPhone. No cloud, no account, nothing leaves your device. Free to download; riff+ is $19.99 once.",
  alternates: { canonical: "https://manifestlab.dev/riff" },
  openGraph: {
    title: "Riff — Speak your mind. Keep it to yourself.",
    description:
      "Private, on-device voice notes that turn rambling into clean recaps. No cloud, no account. Works in airplane mode.",
    url: "https://manifestlab.dev/riff",
    siteName: "ManifestLab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riff — Speak your mind. Keep it to yourself.",
    description:
      "Private, on-device voice notes. Rambling in, clean recap out. No cloud, no account, airplane-mode proof.",
  },
};

const STEPS = [
  { n: "Riff", body: "Tap record and talk — messy is fine. That's the point." },
  { n: "Recap", body: "Riff distills it into clear bullets and a to-do list, on-device." },
  {
    n: "Ask",
    body:
      "“Just the action items.” “What did I say about the budget?” Your riff answers back.",
  },
];

const PROOF = [
  { h: "No account", b: "We couldn't read your notes if we wanted to." },
  { h: "Works in airplane mode", b: "Try it — turn everything off and record anyway." },
  {
    h: "Your voice never leaves the phone",
    b: "Not for processing, not for “improvement,” not ever.",
  },
];

const COMPARE = [
  { label: "Voice uploaded to a server?", riff: "No", them: "Yes" },
  { label: "Account required?", riff: "No", them: "Usually" },
  { label: "Works offline?", riff: "Yes", them: "No" },
  { label: "Subscription?", riff: "No — $19.99 once", them: "Usually" },
];

const FAQ = [
  {
    q: "Does Riff really work offline?",
    a: "Yes — airplane mode is our favorite demo. Everything runs on-device via Apple Intelligence.",
  },
  {
    q: "Why iOS 26+?",
    a: "The on-device models Riff is built on ship with iOS 26. That requirement is the privacy guarantee, not a limitation we chose lightly.",
  },
  {
    q: "What happens to my recordings?",
    a: "They stay in the app, on your phone — Riff has no servers and never uploads them. Delete one and it's gone from the app immediately, along with its recaps and history. The only copy that can ever exist is inside your own iPhone backup, if you use one — and that's yours alone; Riff can't reach it.",
  },
  {
    q: "Is the transcription accurate?",
    a: "It's Apple's best on-device speech engine, and Riff's recaps are built to survive real, messy speech. When something's unclear, Riff hedges rather than invents.",
  },
  {
    q: "Subscription?",
    a: "No. Free app, one optional $19.99 unlock, done.",
  },
];

function StoreBadge({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={APP_STORE_BADGE} alt="Download Riff on the App Store" className="h-14" />
    </a>
  );
}

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "mx-auto w-full max-w-[248px] overflow-hidden rounded-[2.25rem] border-[6px] border-[#1c1c26] bg-background-secondary shadow-2xl shadow-black/40 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default function RiffPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Riff",
    operatingSystem: "iOS 26",
    applicationCategory: "ProductivityApplication",
    description:
      "Private, on-device voice notes for iPhone. Turns rambling into clean recaps — no cloud, no account, nothing leaves the device.",
    url: "https://manifestlab.dev/riff",
    installUrl: APP_STORE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Organization",
      name: "ManifestLab",
      legalName: "Cognitive Core Technologies LLC",
    },
  };

  return (
    <main className="gradient-bg min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* slim top bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="font-display text-lg font-semibold tracking-tight">Riff</span>
        <a
          href={STORE_CTA}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          Download &rarr;
        </a>
      </header>

      {/* 1 — HERO */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 pt-8 pb-20 md:grid-cols-2 md:gap-8 md:pt-16 md:pb-28">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Speak your mind.
            <br />
            <span className="gradient-text">Keep it to yourself.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground-muted">
            {`Riff turns rambling voice notes into clean, useful recaps — entirely on your iPhone. No cloud. No account. Nothing leaves your device.`}
          </p>
          <div className="mt-8">
            <StoreBadge href={STORE_CTA} />
          </div>
          <p className="mt-4 text-sm text-foreground-muted">
            Free to download · iOS 26+ · Works in airplane mode
          </p>
        </div>
        <PhoneFrame>
          <video
            className="block h-full w-full"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/riff/recap.png"
          >
            <source src="/riff/hero-record-to-recap.mp4" type="video/mp4" />
          </video>
        </PhoneFrame>
      </section>

      {/* 2 — HOW IT WORKS */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.n} className="rounded-2xl border border-border bg-background-secondary p-6">
              <div className="font-display text-sm text-accent">{`0${i + 1}`}</div>
              <h3 className="font-display mt-2 text-xl font-semibold">{s.n}</h3>
              <p className="mt-2 text-foreground-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — PRIVACY (the wedge) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          The most private notes app you can put a microphone in front of.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-foreground-muted">
          {`Every other voice-notes app sends your voice to a server. Riff never does. Transcription, recaps, and the assistant all run on Apple Intelligence, on your device. There's no Riff account, no cloud, no "we take privacy seriously" page written by lawyers — there's just nowhere for your words to go.`}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PROOF.map((t) => (
            <div key={t.h} className="rounded-2xl border border-border bg-background-secondary p-6">
              <div className="mb-3 h-2 w-2 rounded-full bg-accent" />
              <h3 className="font-display font-semibold">{t.h}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{t.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-muted">
                <th className="py-3 pr-4 font-normal"></th>
                <th className="py-3 px-4 font-display font-semibold text-foreground">Riff</th>
                <th className="py-3 px-4 font-normal">Typical cloud voice app</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.label} className="border-b border-border/60">
                  <td className="py-3 pr-4 text-foreground-muted">{r.label}</td>
                  <td className="py-3 px-4 font-medium text-accent">{r.riff}</td>
                  <td className="py-3 px-4 text-foreground-muted">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 — RECAP + ASSISTANT */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From brain-dump to done-list.
          </h2>
          <p className="mt-6 text-lg text-foreground-muted">
            {`Three minutes of thinking out loud becomes a recap you'd actually send someone: the decisions you made, the things you noticed, and a TO DO list pulled from your own words — never invented. Ask follow-ups, reshape it ("shorter," "just the errands"), and if something's not in your riff, Riff says so instead of making it up.`}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PhoneFrame className="max-w-[180px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/riff/transcript.png" alt="A raw Riff transcript" className="block w-full" />
          </PhoneFrame>
          <PhoneFrame className="mt-8 max-w-[180px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/riff/recap.png" alt="The clean recap Riff generates on-device" className="block w-full" />
          </PhoneFrame>
        </div>
      </section>

      {/* 5 — PRICING */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-background-secondary p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pay once. Or don't.
          </h2>
          <p className="mt-6 text-lg text-foreground-muted">
            {`Riff is free: record, transcribe, and try recaps and the assistant. riff+ unlocks unlimited recaps and unlimited use of the Riff assistant for $19.99, once. No subscription — we don't need recurring revenue to run servers, because there are no servers.`}
          </p>
          <div className="mt-8 flex justify-center">
            <StoreBadge href={STORE_CTA} />
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
          Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q} className="border-b border-border pb-8">
              <h3 className="font-display text-lg font-semibold">{f.q}</h3>
              <p className="mt-2 text-foreground-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — FOOTER */}
      <footer className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-lg font-semibold tracking-tight">ManifestLab</div>
            <p className="mt-2 text-sm text-foreground-muted">
              Made by a tiny team that thinks your thoughts are yours.
            </p>
            <p className="mt-4 text-xs text-foreground-muted">
              Cognitive Core Technologies LLC ·{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-accent">
                Support
              </a>{" "}
              ·{" "}
              <a href="/riff/privacy" className="transition-colors hover:text-accent">
                Privacy
              </a>{" "}
              ·{" "}
              <a href="/riff/terms" className="transition-colors hover:text-accent">
                Terms
              </a>
            </p>
            <p className="mt-4 text-xs text-foreground-muted">
              {`Privacy, short version: Riff collects nothing. No account, no analytics, no servers. Your recordings and recaps stay on your iPhone. That's the whole policy — the `}
              <a href="/riff/privacy" className="underline transition-colors hover:text-accent">
                full one
              </a>
              {` is barely longer.`}
            </p>
          </div>
          <StoreBadge href={STORE_CTA_FOOTER} />
        </div>
      </footer>
    </main>
  );
}
