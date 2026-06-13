"use client";

import { useEffect, useRef } from "react";

function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".section-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-semibold tracking-tight">
          ManifestLab
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="#services"
            className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
          >
            Services
          </a>
          <a
            href="#apps"
            className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
          >
            Apps
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="gradient-bg min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          Where data meets{" "}
          <span className="gradient-text">execution</span>.
        </h1>
        <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-100">
          ManifestLab is a technical consulting studio helping businesses turn
          data into results — from analytics and automation to AI, machine
          learning, and digital transformation.
        </p>
        <a
          href="mailto:omar@manifestlab.dev"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors animate-fade-in-up animation-delay-200"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Data Analytics & Engineering",
      description:
        "From ad-hoc analysis to production pipelines. We help you clean, structure, and analyze your data using Python, SQL, and modern tooling — so you can make decisions with confidence.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "AI & Machine Learning",
      description:
        "When you're ready for ML, we take it from proof-of-concept to production. Custom models, LLM-powered applications, and intelligent automation — built to deliver real business value.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Strategy & Digital Transformation",
      description:
        "Not sure where to start? We assess your technical landscape, define a roadmap, and help you modernize — whether that means adopting cloud infrastructure, automating workflows, or building an internal data practice.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 sm:py-32 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-animate">
          <h2 id="services-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Senior technical expertise, without the overhead.
          </h2>
          <div className="w-16 h-1 bg-accent mb-12"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`section-animate p-8 rounded-xl border border-border bg-background card-hover`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-accent mb-4">{service.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-heading" className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="section-animate">
          <h2 id="why-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built on experience. Driven by results.
          </h2>
          <div className="w-16 h-1 bg-accent mb-12"></div>
        </div>

        <div className="section-animate space-y-6 text-lg text-foreground-muted leading-relaxed">
          <p>
            ManifestLab was founded on a simple premise: businesses deserve
            access to senior technical expertise without the overhead of
            building it in-house.
          </p>
          <p>
            ManifestLab brings 20+ years of experience spanning engineering
            consulting and technology — from advising C-suite executives on
            business process optimization to hands-on AI integration, data
            architecture, and full-stack development. That blend of strategic
            thinking and deep technical execution is what sets us apart.
          </p>
          <p>
            This isn&apos;t about handing you a roadmap and disappearing. We
            embed with your team, work through real problems together, and
            transfer knowledge as we go — so the solutions we build actually
            stick.
          </p>
        </div>

        <div className="section-animate mt-12 grid sm:grid-cols-3 gap-8 pt-12 border-t border-border">
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              20+
            </div>
            <div className="text-foreground-muted">Years of Experience</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              5+
            </div>
            <div className="text-foreground-muted">Industries Served</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              0
            </div>
            <div className="text-foreground-muted">Missed Deadlines</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEADFAST_APP_STORE_URL =
  "https://apps.apple.com/us/app/steadfast-fasting-tracker/id6761577451";

function Apps() {
  const apps = [
    {
      name: "Steadfast",
      tagline:
        "A private, offline-first intermittent fasting timer for iOS. No ads, no account — just fast.",
      href: "/steadfast",
      appStoreUrl: STEADFAST_APP_STORE_URL,
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
      links: [
        { label: "Privacy", href: "/steadfast/privacy" },
        { label: "Support", href: "/steadfast/support" },
      ],
    },
    {
      name: "Riff",
      tagline:
        "On-device voice-to-text with AI Recaps and action items. Your voice and words never leave your iPhone.",
      href: "/riff",
      appStoreUrl: null,
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
      links: [
        { label: "Privacy", href: "/riff/privacy" },
        { label: "Terms", href: "/riff/terms" },
        { label: "Support", href: "/riff/support" },
      ],
    },
  ];

  return (
    <section id="apps" aria-labelledby="apps-heading" className="py-24 sm:py-32 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-animate">
          <h2 id="apps-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Apps we&apos;ve built.
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mb-6">
            We don&apos;t just consult — we ship. Here are a few of the apps we
            build and run ourselves, designed around privacy from the ground up.
          </p>
          <div className="w-16 h-1 bg-accent mb-12"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {apps.map((app, index) => (
            <div
              key={app.name}
              className="section-animate flex flex-col p-8 rounded-xl border border-border bg-background card-hover"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-accent mb-4">{app.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-3">
                <a href={app.href} className="hover:text-accent transition-colors">
                  {app.name}
                </a>
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-6">
                {app.tagline}
              </p>

              <div className="mt-auto">
                {app.appStoreUrl ? (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${app.name} on the App Store`}
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="h-11"
                    />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground-muted">
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
                )}

                <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <a
                    href={app.href}
                    className="font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    Learn more &rarr;
                  </a>
                  {app.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-foreground-muted hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 sm:py-32 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="section-animate">
          <h2 id="contact-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let&apos;s talk about what you&apos;re building.
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-10">
            Whether you need help making sense of your data, building something
            with AI, or modernizing your tech stack — let&apos;s talk.
          </p>
          <a
            href="mailto:omar@manifestlab.dev"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-semibold">ManifestLab</div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-foreground-muted">
          <a
            href="mailto:omar@manifestlab.dev"
            className="hover:text-accent transition-colors"
          >
            omar@manifestlab.dev
          </a>
          <span className="hidden sm:inline">·</span>
          <span>© {new Date().getFullYear()} ManifestLab. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useScrollAnimation();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Apps />
      <Contact />
      <Footer />
    </main>
  );
}
