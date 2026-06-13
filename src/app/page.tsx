"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./studio.css";

/**
 * ManifestLab home — the product-world switcher.
 * Ported from the Claude Design "studio.html" prototype: GSAP choreographs
 * the load and every world-switch; a canvas particle field gives each world
 * its own atmosphere. All motion is set up imperatively against `rootRef`
 * and torn down on unmount. Honors prefers-reduced-motion.
 */

type Conf = {
  kind: "stars" | "motes" | "dust";
  count: number;
  base: [string, string];
  gold: number;
  vy: number;
  vx: number;
  shooting: boolean;
};
type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  tw: number;
  sway: number;
  col: string;
};

const WV_DELAYS = [
  0, 0.12, 0.28, 0.06, 0.34, 0.18, 0.4, 0.1, 0.3, 0.22, 0.36, 0.14, 0.26,
];
const TLINES = [
  { mw: "88%", d: ".2s" },
  { mw: "72%", d: ".8s" },
  { mw: "94%", d: "1.4s" },
  { mw: "64%", d: "2s" },
];
export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("studio-active");

    const order = ["riff", "steadfast", "more"] as const;
    type Id = (typeof order)[number];
    const labels: Record<Id, string> = {
      riff: "riff",
      steadfast: "Steadfast",
      more: "More coming",
    };
    const accents: Record<Id, string> = {
      riff: "#ecb84e",
      steadfast: "#a8b070",
      more: "#c9b896",
    };
    const bgs: Record<Id, string> = {
      riff: "/studio/riff-world.png",
      steadfast: "/studio/steadfast-world.png",
      more: "/studio/hero-dusk.png",
    };
    const fxConf: Record<Id, Conf> = {
      riff: { kind: "stars", count: 150, base: ["rgba(255,250,235,", "rgba(236,184,78,"], gold: 0.22, vy: -0.04, vx: -0.05, shooting: true },
      steadfast: { kind: "motes", count: 60, base: ["rgba(206,205,150,", "rgba(232,212,160,"], gold: 0.2, vy: -0.16, vx: 0, shooting: false },
      more: { kind: "dust", count: 48, base: ["rgba(216,195,154,", "rgba(201,184,150,"], gold: 0.1, vy: -0.05, vx: 0.03, shooting: false },
    };

    const worlds = {} as Record<Id, HTMLElement>;
    root.querySelectorAll<HTMLElement>(".world").forEach((w) => {
      worlds[w.dataset.id as Id] = w;
    });
    const bgEls = [
      root.querySelector<HTMLElement>("#bg0")!,
      root.querySelector<HTMLElement>("#bg1")!,
    ];
    const itemsEl = root.querySelector<HTMLElement>("#items")!;
    const here = root.querySelector<HTMLElement>("#here")!;
    const veil = root.querySelector<HTMLElement>("#veil")!;
    const canvas = root.querySelector<HTMLCanvasElement>("#fx")!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let idx = 0;
    let activeBg = 0;
    let idleTween: gsap.core.Tween | null = null;
    let rafId = 0;
    let booted = false;

    /* ---------- split marks into chars ---------- */
    function splitMark(w: HTMLElement) {
      const el = w.querySelector<HTMLElement & { _split?: boolean }>(".mark");
      if (!el || el._split) return;
      const txt = el.getAttribute("data-text") || el.textContent || "";
      el.textContent = "";
      [...txt].forEach((c) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = c === " " ? " " : c;
        el.appendChild(s);
      });
      el._split = true;
    }
    order.forEach((id) => splitMark(worlds[id]));

    /* ---------- build switcher ---------- */
    const itemBtns: HTMLButtonElement[] = [];
    function applyActive(b: HTMLButtonElement, on: boolean) {
      b.setAttribute("aria-current", on ? "true" : "false");
      b.classList.toggle("active", on);
      (b.querySelector(".pip") as HTMLElement).style.width = on ? "22px" : "0px";
      b.style.color = on ? "var(--ink)" : "";
    }
    order.forEach((id, i) => {
      const b = document.createElement("button");
      b.className = "item";
      b.setAttribute("data-id", id);
      b.innerHTML = `<span class="lbl">${labels[id]}</span><span class="pip"></span>`;
      b.addEventListener("click", () => go(i));
      itemsEl.appendChild(b);
      itemBtns.push(b);
      applyActive(b, i === 0);
    });

    /* ---------- reveal animation ---------- */
    function killIdle() {
      if (idleTween) {
        idleTween.kill();
        idleTween = null;
      }
    }

    function reveal(id: Id) {
      const w = worlds[id];
      const status = w.querySelector(".status");
      const chars = w.querySelectorAll(".mark .ch");
      const line = w.querySelector(".line");
      const moresub = w.querySelector(".moresub");
      const ctas = w.querySelectorAll(".ctas > *");
      const device = w.querySelector(".device");
      const markEl = w.querySelector(".mark");

      gsap.set(w, { opacity: 1 });
      if (reduce) {
        gsap.set([status, line, moresub, device], { opacity: 1, clearProps: "transform" });
        gsap.set(chars, { opacity: 1, clearProps: "transform" });
        gsap.set(ctas, { opacity: 1, clearProps: "transform" });
        return;
      }
      if (markEl) gsap.set(markEl, { perspective: 620 });
      const tl = gsap.timeline();
      if (status) tl.from(status, { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" }, 0);
      tl.from(chars, { opacity: 0, yPercent: 115, rotateX: -55, transformOrigin: "50% 100%", duration: 0.72, stagger: 0.04, ease: "power3.out" }, status ? 0.06 : 0);
      if (line) tl.from(line, { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.34");
      if (moresub) tl.from(moresub, { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, "-=0.28");
      if (ctas.length) tl.from(ctas, { opacity: 0, y: 12, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.30");
      if (device) {
        tl.from(device, { opacity: 0, y: 28, scale: 0.94, duration: 0.85, ease: "power3.out" }, 0.12);
        tl.add(() => {
          killIdle();
          idleTween = gsap.to(device, { y: "-=12", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
      }
    }

    /* ---------- switch worlds ---------- */
    function setBg(id: Id) {
      const next = 1 - activeBg;
      bgEls[next].style.backgroundImage = `url(${bgs[id]})`;
      bgEls[next].classList.add("show");
      bgEls[activeBg].classList.remove("show");
      activeBg = next;
    }

    function go(i: number) {
      i = (i + order.length) % order.length;
      if (i === idx) return;
      idx = i;
      const id = order[i];

      root!.style.setProperty("--accent", accents[id]);
      itemBtns.forEach((b, j) => applyActive(b, j === i));
      here.textContent = labels[id];
      setBg(id);
      rebuildParticles(id, true);
      killIdle();

      if (!reduce) {
        gsap.fromTo(veil, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out", onComplete: () => gsap.to(veil, { opacity: 0, duration: 0.5, ease: "power2.in" }) });
      }

      order.forEach((oid) => {
        const w = worlds[oid];
        if (oid === id) {
          w.classList.add("on");
          gsap.set(w, { y: 0 });
        } else {
          w.classList.remove("on");
          if (reduce) gsap.set(w, { opacity: 0 });
          else gsap.to(w, { opacity: 0, y: -10, duration: 0.28, ease: "power2.in", onComplete: () => gsap.set(w, { y: 0 }) });
        }
      });
      if (reduce) {
        reveal(id);
        return;
      }
      gsap.delayedCall(0.16, () => reveal(id));
    }

    const onNext = () => go(idx + 1);
    const onPrev = () => go(idx - 1);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(idx + 1);
      else if (e.key === "ArrowLeft") go(idx - 1);
    };
    root.querySelector("#next")!.addEventListener("click", onNext);
    root.querySelector("#prev")!.addEventListener("click", onPrev);
    window.addEventListener("keydown", onKey);

    /* ---------- canvas particle atmosphere ---------- */
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);

    let parts: Particle[] = [];
    let conf: Conf = fxConf.riff;
    let shooter: { x: number; y: number; len: number; life: number; vx: number; vy: number } | null = null;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function rebuildParticles(id: Id, fade: boolean) {
      conf = fxConf[id];
      parts = [];
      for (let i = 0; i < conf.count; i++) {
        const gold = Math.random() < conf.gold;
        parts.push({
          x: Math.random() * Math.max(W, 1),
          y: Math.random() * Math.max(H, 1),
          z: rnd(0.3, 1),
          r: conf.kind === "stars" ? rnd(0.4, 1.7) : rnd(1.2, 3.2),
          a: rnd(0.25, 0.85),
          tw: Math.random() * Math.PI * 2,
          sway: rnd(0.2, 1),
          col: gold ? conf.base[1] : conf.base[0],
        });
      }
      if (fade && !reduce) gsap.fromTo(canvas, { opacity: 0.25 }, { opacity: 1, duration: 0.7, ease: "power2.out" });
      shooter = null;
    }

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(now - last, 50);
      last = now;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      ctx!.clearRect(0, 0, W, H);
      const t = now * 0.001;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += conf.vx * p.z * (dt * 0.06);
        p.y += conf.vy * p.z * (dt * 0.06);
        if (conf.kind === "motes" || conf.kind === "dust") {
          p.x += Math.sin(t * 0.5 + p.tw) * 0.12 * p.sway;
        }
        if (p.y < -6) p.y = H + 6;
        if (p.y > H + 6) p.y = -6;
        if (p.x < -6) p.x = W + 6;
        if (p.x > W + 6) p.x = -6;

        const twinkle = conf.kind === "stars" ? 0.55 + 0.45 * Math.sin(t * 1.6 + p.tw) : 1;
        const ox = px * p.z * 16;
        const oy = py * p.z * 16;
        const alpha = p.a * twinkle;
        ctx!.beginPath();
        ctx!.fillStyle = p.col + alpha + ")";
        ctx!.arc(p.x + ox, p.y + oy, p.r * p.z + (conf.kind === "stars" ? 0 : 0.4), 0, 6.283);
        ctx!.fill();
        if (conf.kind === "stars" && p.r > 1.2) {
          ctx!.beginPath();
          ctx!.fillStyle = p.col + alpha * 0.18 + ")";
          ctx!.arc(p.x + ox, p.y + oy, p.r * p.z * 3.4, 0, 6.283);
          ctx!.fill();
        }
      }

      if (conf.shooting && !reduce) {
        if (!shooter && Math.random() < 0.0016) {
          shooter = { x: rnd(W * 0.3, W * 0.9), y: rnd(0, H * 0.4), len: rnd(90, 170), life: 1, vx: -rnd(3, 5), vy: rnd(1.4, 2.4) };
        }
        if (shooter) {
          shooter.x += shooter.vx;
          shooter.y += shooter.vy;
          shooter.life -= 0.012;
          const g = ctx!.createLinearGradient(shooter.x, shooter.y, shooter.x - shooter.vx * shooter.len * 0.18, shooter.y - shooter.vy * shooter.len * 0.18);
          g.addColorStop(0, "rgba(255,245,220," + Math.max(0, shooter.life) * 0.9 + ")");
          g.addColorStop(1, "rgba(255,245,220,0)");
          ctx!.strokeStyle = g;
          ctx!.lineWidth = 1.6;
          ctx!.beginPath();
          ctx!.moveTo(shooter.x, shooter.y);
          ctx!.lineTo(shooter.x - shooter.vx * shooter.len * 0.18, shooter.y - shooter.vy * shooter.len * 0.18);
          ctx!.stroke();
          if (shooter.life <= 0) shooter = null;
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    /* ---------- boot ---------- */
    function boot() {
      if (booted) return;
      booted = true;
      resize();
      order.forEach((id) => {
        if (id !== "riff") gsap.set(worlds[id], { opacity: 0 });
      });
      root!.style.setProperty("--accent", accents.riff);
      bgEls[0].style.backgroundImage = `url(${bgs.riff})`;
      bgEls[0].classList.add("show");
      rebuildParticles("riff", false);

      if (reduce) {
        rafId = requestAnimationFrame((n) => {
          last = n;
          ctx!.clearRect(0, 0, W, H);
          parts.forEach((p) => {
            ctx!.beginPath();
            ctx!.fillStyle = p.col + p.a + ")";
            ctx!.arc(p.x, p.y, p.r * p.z, 0, 6.283);
            ctx!.fill();
          });
        });
        reveal("riff");
        return;
      }
      rafId = requestAnimationFrame(frame);
      gsap.set(worlds.riff, { opacity: 1 });
      reveal("riff");
    }

    let fallbackId = 0;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(boot);
      fallbackId = window.setTimeout(() => {
        if (!parts.length) boot();
      }, 800);
    } else {
      boot();
    }

    /* ---------- teardown ---------- */
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(fallbackId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onPointer);
      killIdle();
      gsap.killTweensOf([veil, canvas, ...Object.values(worlds)]);
      root.querySelectorAll(".device").forEach((d) => gsap.killTweensOf(d));
      itemsEl.innerHTML = "";
      document.body.classList.remove("studio-active");
    };
  }, []);

  return (
    <div className="studio" ref={rootRef}>
      <div className="stage" id="stage">
        <div className="bg" id="bg0" />
        <div className="bg" id="bg1" />
        <div className="bgscrim" />
        <canvas id="fx" />

        {/* RIFF */}
        <section className="world on" data-id="riff" style={{ "--w-accent": "#ecb84e" } as React.CSSProperties}>
          <div className="worldgrid">
            <div className="copy">
              <div className="status">
                <span className="d" />
                Coming soon
              </div>
              <div className="mark" data-text="riff">
                riff
              </div>
              <p className="line">
                Talk, and it&apos;s text. On-device AI dictation that turns your
                voice into clean notes, Recaps, and action items — and never
                leaves your iPhone.
              </p>
              <div className="ctas">
                <span className="soon">Coming soon</span>
                <a className="learn" href="/riff">
                  Learn more <span className="ar">&#8594;</span>
                </a>
              </div>
            </div>
            <div className="visual">
              <div className="device">
                <div className="notch" />
                {/* Placeholder b-roll. To drop in the real clip, replace this
                    .screen block with:
                    <video className="demo-video" src="/studio/riff-demo.mp4"
                      autoPlay muted loop playsInline /> */}
                <div className="screen scr-riff">
                  <div className="sbar">
                    <span>9:41</span>
                    <span className="rec">
                      <i />
                      rec 0:14
                    </span>
                  </div>
                  <div className="wv">
                    {WV_DELAYS.map((d, i) => (
                      <span key={i} style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                  <div className="tlines">
                    {TLINES.map((tl, i) => (
                      <span
                        key={i}
                        className="tl"
                        style={{ "--mw": tl.mw, "--d": tl.d } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <div className="recap">
                    <div className="rcap-h">Recap</div>
                    <div className="rcap-i">
                      <i />
                      <span style={{ "--w": "80%" } as React.CSSProperties} />
                    </div>
                    <div className="rcap-i">
                      <i />
                      <span style={{ "--w": "62%" } as React.CSSProperties} />
                    </div>
                  </div>
                </div>
                <div className="glowedge" />
                <div className="glare" />
              </div>
            </div>
          </div>
        </section>

        {/* STEADFAST */}
        <section className="world" data-id="steadfast" style={{ "--w-accent": "#a8b070" } as React.CSSProperties}>
          <div className="worldgrid">
            <div className="copy">
              <div className="status">
                <span className="d" />
                On the App Store
              </div>
              <div className="mark" data-text="Steadfast">
                Steadfast
              </div>
              <p className="line">
                A private fasting and water tracker. No ads, no account, no
                cloud.
              </p>
              <div className="ctas">
                <a
                  className="appstore"
                  href="https://apps.apple.com/us/app/steadfast-fasting-tracker/id6761577451"
                  target="_blank"
                  rel="noopener"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 1.6c.1 1-.3 2-.9 2.8-.7.8-1.7 1.4-2.7 1.3-.1-1 .4-2 1-2.7.6-.8 1.7-1.3 2.6-1.4zM19 17.3c-.5 1.1-.7 1.6-1.3 2.6-.9 1.4-2.1 3.1-3.6 3.1-1.4 0-1.7-.9-3.5-.9s-2.2.9-3.5.9c-1.5 0-2.7-1.6-3.5-2.9C1 18.4.8 14 2.4 11.7c1-1.5 2.6-2.4 4.1-2.4 1.6 0 2.5 1 3.8 1 1.2 0 2-1 3.8-1 1.3 0 2.7.7 3.7 2-3.3 1.8-2.7 6.4 1.2 6z" />
                  </svg>
                  <span className="t">
                    <small>Download on the</small>
                    <b>App Store</b>
                  </span>
                </a>
                <a className="learn" href="/steadfast">
                  Learn more <span className="ar">&#8594;</span>
                </a>
              </div>
            </div>
            <div className="visual">
              <div className="device">
                <div className="notch" />
                {/* Real b-roll. Swap src + poster when a new cut lands. */}
                <video
                  className="demo-video"
                  src="/studio/steadfast-demo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Steadfast app preview"
                />
                <div className="glowedge" />
                <div className="glare" />
              </div>
            </div>
          </div>
        </section>

        {/* MORE */}
        <section className="world" data-id="more" style={{ "--w-accent": "#c9b896" } as React.CSSProperties}>
          <div className="worldgrid">
            <div className="copy">
              <div className="mark" data-text="More coming.">
                More coming.
              </div>
              <div className="moresub">— from Cognitive Core Technologies</div>
            </div>
          </div>
        </section>
      </div>

      <div className="veil" id="veil" />

      <header className="chrome topbar">
        <div className="wordmark">
          <span className="sprig" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="22" x2="12" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <ellipse cx="15.6" cy="9.4" rx="4.3" ry="2.2" fill="currentColor" opacity=".82" transform="rotate(-34 15.6 9.4)" />
              <ellipse cx="8.4" cy="13" rx="4" ry="2" fill="currentColor" opacity=".55" transform="rotate(34 8.4 13)" />
              <circle cx="12" cy="6.4" r="1.7" fill="currentColor" opacity=".9" />
            </svg>
          </span>
          ManifestLab
        </div>
        <div className="here" id="here">
          riff
        </div>
      </header>

      <nav className="switch" aria-label="Products">
        <div className="switchinner">
          <button className="arrow" id="prev" aria-label="Previous product">
            &#8249;
          </button>
          <div className="items" id="items" />
          <button className="arrow" id="next" aria-label="Next product">
            &#8250;
          </button>
        </div>
      </nav>

      <footer className="chrome foot">
        <a className="contact" href="mailto:contact@manifestlab.dev">
          Contact
        </a>
        <div className="social" aria-label="Social — coming soon">
          <a aria-disabled="true" title="YouTube — coming soon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3 26 26 0 0 0 1 12c0 1.6.4 4.7.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.2V8.8l6 3.2-6 3.2z" />
            </svg>
          </a>
          <a aria-disabled="true" title="Instagram — coming soon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a aria-disabled="true" title="X — coming soon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.5-8.6L4.6 3H11l4.5 5.6L17.5 3zm-1.1 16h1.7L8.1 4.8H6.3L16.4 19z" />
            </svg>
          </a>
        </div>
        <div className="legal">© 2026 Cognitive Core Technologies LLC</div>
      </footer>
    </div>
  );
}
