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
        <a
          href="#contact"
          className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          Where AI meets{" "}
          <span className="gradient-text">execution</span>.
        </h1>
        <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-100">
          ManifestLab is a consulting studio that helps businesses harness the
          power of AI, machine learning, and data science — from strategy to
          implementation.
        </p>
        <a
          href="#contact"
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
      title: "AI & Machine Learning Consulting",
      description:
        "From proof-of-concept to production. We help you identify high-impact AI opportunities, build custom models, and deploy solutions that actually work in the real world.",
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
      title: "Data Science & Analytics",
      description:
        "Turn your data into decisions. We design analytics pipelines, build dashboards, and create the infrastructure your team needs to operate with clarity.",
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
      title: "Technical Training & Workshops",
      description:
        "Level up your team. We deliver hands-on training in AI/ML, data science, and modern development practices — tailored to your organization's needs and goals.",
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
    <section id="services" className="py-24 sm:py-32 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-animate">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            We bring AI capabilities to teams that need them.
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
    <section id="why" className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="section-animate">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
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
            Our team brings decades of consulting experience across industries,
            advanced degrees from institutions like UC Berkeley, and a track
            record of delivering complex technical projects on time and on
            budget.
          </p>
          <p>
            We&apos;re not here to sell you a roadmap and disappear. We work
            alongside your team, transfer knowledge as we go, and build
            solutions designed to last.
          </p>
        </div>

        <div className="section-animate mt-12 grid sm:grid-cols-3 gap-8 pt-12 border-t border-border">
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              10+
            </div>
            <div className="text-foreground-muted">Years of Experience</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              50+
            </div>
            <div className="text-foreground-muted">Projects Delivered</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-accent mb-2">
              100%
            </div>
            <div className="text-foreground-muted">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="section-animate">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let&apos;s talk about what you&apos;re building.
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-10">
            Whether you&apos;re exploring AI for the first time or scaling an
            existing data practice, we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:contact@cognitivecoretechnologies.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Book a Consultation
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
        <div className="text-sm text-foreground-muted">
          © {new Date().getFullYear()} ManifestLab. All rights reserved.
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
      <Contact />
      <Footer />
    </main>
  );
}
