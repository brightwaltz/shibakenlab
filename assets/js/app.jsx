/* ───────────────────────────────────────────────────────────────────────────
   App composition — Nav, Hero, Section orchestration, Lang toggle, Tweaks,
   Lenis smooth scroll, reveal-on-scroll, cursor follower.
   ─────────────────────────────────────────────────────────────────────────── */

const I18N = window.LAB_I18N;
const palettes = window.LAB_PALETTES;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "tama-night",
  "heroMode": "particles",
  "cursor": true,
  "grain": true
}/*EDITMODE-END*/;

// Apply a palette to the document root (CSS custom properties).
function applyPalette(id) {
  const p = palettes.find((x) => x.id === id) || palettes[0];
  const [c1, c2, c3, c4, c5] = p.colors;
  const r = document.documentElement.style;
  r.setProperty("--c-primary", c1);
  r.setProperty("--c-deep",    c2);
  r.setProperty("--c-a1",      c3);
  r.setProperty("--c-a2",      c4);
  r.setProperty("--c-a3",      c5);
  // Tweak bg from primary
  const isLightMono = id === "vercel-mono";
  if (isLightMono) {
    r.setProperty("--c-bg",   "#070707");
    r.setProperty("--c-bg-2", "#000000");
  } else {
    r.setProperty("--c-bg",   "#050818");
    r.setProperty("--c-bg-2", "#08102b");
  }
  // Repaint Three.js scene with fresh colors.
  if (window.__refreshHeroPalette) window.__refreshHeroPalette();
}

// ── Nav ─────────────────────────────────────────────────────────────────────
// Brand mark — a tiny 3×3 mini-grid of dots that telegraphs "PDS → SLM core".
// The center dot pulses; surrounding dots use the accent gradient.
function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 20 20" aria-hidden="true">
      <defs>
        <linearGradient id="bm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="var(--c-a1)"/>
          <stop offset="50%" stopColor="var(--c-a2)"/>
          <stop offset="100%" stopColor="var(--c-a3)"/>
        </linearGradient>
      </defs>
      {[
        [3, 3, 1.2], [10, 3, 1.4], [17, 3, 1.2],
        [3, 10, 1.4], [10, 10, 2.4], [17, 10, 1.4],
        [3, 17, 1.2], [10, 17, 1.4], [17, 17, 1.2],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r}
                fill={i === 4 ? "url(#bm-grad)" : "rgba(255,255,255,0.55)"}
                className={i === 4 ? "brand-mark__core" : "brand-mark__dot"}
                style={i === 4 ? null : { animationDelay: `${i * 0.12}s` }}/>
      ))}
    </svg>
  );
}

function Nav({ lang, setLang }) {
  const i = I18N[lang].nav;
  const [atTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const link = (id, label) => (
    <a href={`#${id}`} key={id}>{label}</a>
  );
  return (
    <header className="nav" data-at-top={atTop}>
      <a href="#home" className="nav__brand">
        <BrandMark />
        <span>{lang === "ja" ? "サービス情報学研究室" : "Service Informatics Lab"}</span>
      </a>
      <nav className="nav__menu">
        {link("about",        i.about)}
        {link("research",     i.research)}
        {link("map",          i.map)}
        {link("gallery",      i.gallery)}
        {link("publications", i.publications)}
        {link("access",       i.access)}
        {link("news",         i.news)}
        {link("contact",      i.contact)}
      </nav>
      <div className="nav__lang" role="group" aria-label={I18N[lang].aria.langtoggle}>
        <button aria-pressed={lang === "ja"} onClick={() => setLang("ja")}
                title="Switch to Japanese (press L)">JA</button>
        <button aria-pressed={lang === "en"} onClick={() => setLang("en")}
                title="Switch to English (press L)">EN</button>
      </div>
    </header>
  );
}

// ── HeroSection ─────────────────────────────────────────────────────────────
function HeroSection({ lang, mode }) {
  const h = I18N[lang].hero;
  const Hero = window.Hero;
  const MagneticButton = window.MagneticButton;
  return (
    <section id="home" className="hero">
      <div className="hero__canvas">
        <Hero mode={mode} />
      </div>
      <div className="hero__veil" />
      <div className="hero__inner">
        <div className="eyebrow reveal" data-d="0">{h.eyebrow}</div>
        <h1 className="hero__title reveal" data-d="1">
          {h.title_a}<br/><em>{h.title_b}</em>
        </h1>
        <p className="hero__sub reveal" data-d="2">{h.sub}</p>
        <div className="hero__ctas reveal" data-d="3">
          <MagneticButton href="#research" className="btn btn--primary">
            {h.cta1} <Icon name="arrow" />
          </MagneticButton>
          <MagneticButton href="#contact" className="btn">
            {h.cta2} <Icon name="arrow" />
          </MagneticButton>
        </div>
      </div>
      <div className="hero__scroll">
        <span>{h.scroll}</span>
        <span className="bar" aria-hidden="true"></span>
      </div>
    </section>
  );
}

// ── Tweaks panel ────────────────────────────────────────────────────────────
function LabTweaks({ palette, setPalette, heroMode, setHeroMode, cursor, setCursor, grain, setGrain }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect } = window;
  const paletteOptions = palettes.map((p) => p.colors.slice(0, 5));
  const activePalette = palettes.find((p) => p.id === palette) || palettes[0];
  const onPaletteIdx = (cols) => {
    const idx = paletteOptions.findIndex((arr) => arr.join("|") === cols.join("|"));
    if (idx >= 0) setPalette(palettes[idx].id);
  };
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakColor
        label="Palette"
        value={activePalette.colors.slice(0, 5)}
        options={paletteOptions}
        onChange={onPaletteIdx}
      />
      <TweakSection label="Hero 3D" />
      <TweakRadio
        label="Mode"
        value={heroMode}
        options={["particles", "geometry", "fluid"]}
        onChange={setHeroMode}
      />
      <TweakSection label="Atmosphere" />
      <TweakToggle label="Cursor glow" value={cursor} onChange={setCursor} />
      <TweakToggle label="Film grain"  value={grain}  onChange={setGrain} />
    </TweaksPanel>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
function App() {
  const useTweaks = window.useTweaks;
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Section component aliases (loaded by earlier scripts)
  const About            = window.About;
  const ResearchThemes   = window.ResearchThemes;
  const MapSection       = window.MapSection;
  const Gallery          = window.Gallery;
  const Publications     = window.Publications;
  const Access           = window.Access;
  const News             = window.News;
  const Contact          = window.Contact;
  const Footer           = window.Footer;
  const [lang, setLangState] = React.useState(() =>
    localStorage.getItem("lab-lang") || (new URLSearchParams(location.search).get("lang") === "en" ? "en" : "ja")
  );
  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("lab-lang", l);
    document.documentElement.lang = l;
    document.body.setAttribute("data-lang", l);
  };
  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute("data-lang", lang);
    // Swap OG image to the locale-specific one so social shares match
    // ?lang=en pages.
    const ogPng = document.querySelector('meta[property="og:image"]');
    const twPng = document.querySelector('meta[name="twitter:image"]');
    const url   = lang === "en"
      ? "https://brightwaltz.github.io/shibakenlab/assets/images/og-image-en.png"
      : "https://brightwaltz.github.io/shibakenlab/assets/images/og-image.png";
    if (ogPng) ogPng.setAttribute("content", url);
    if (twPng) twPng.setAttribute("content", url);
  }, [lang]);

  // Apply palette + grain + cursor settings from tweaks
  React.useEffect(() => {
    applyPalette(tw.palette);
    // Tell CSS whether to honor prefers-color-scheme.  Only when the user
    // has the default ("tama-night") palette do we let the OS preference take
    // over via the @media block in style.css.
    document.documentElement.setAttribute(
      "data-os-theme",
      tw.palette === "tama-night" ? "auto" : "user"
    );
  }, [tw.palette]);
  React.useEffect(() => {
    document.body.style.setProperty("--grain-on", tw.grain ? "1" : "0");
    const bg = document.querySelector(".stage-bg");
    if (bg) bg.style.setProperty("--grain-display", tw.grain ? "block" : "none");
  }, [tw.grain]);

  // Keyboard shortcut: L toggles language.  Ignored when the user is typing
  // in a form field.
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key && e.key.toLowerCase() !== "l") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
      setLang(lang === "ja" ? "en" : "ja");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang]);

  // Reading progress bar (top edge).  Updated on scroll/resize.
  React.useEffect(() => {
    const el = document.getElementById("read-progress");
    if (!el) return;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const t = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      el.style.transform = `scaleX(${t})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll-driven scene morph for the Hero particles.
  //   morph = 0  → PDS scattered shell
  //   morph = 1  → graph rings
  //   morph = 2  → SLM core (collapsed)
  // Drives the shared `window.__heroScrollMorph` variable that hero.jsx reads.
  React.useEffect(() => {
    const hero = document.querySelector(".hero");
    const update = () => {
      const h = hero?.offsetHeight || window.innerHeight;
      const y = Math.max(0, window.scrollY);
      // 0 at the top of hero, 1 at the bottom; multiply by 2 for the two-stage morph.
      const t = Math.min(1, y / (h * 0.95)) * 2;
      window.__heroScrollMorph = t;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Cursor glow
  React.useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    if (!tw.cursor) { el.style.display = "none"; return; }
    el.style.display = "block";
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("pointermove", onMove);
    let raf;
    const loop = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, [tw.cursor]);

  // Reveal-on-scroll
  //   Uses IntersectionObserver where possible, plus a viewport-rect sweep
  //   triggered by Lenis's own scroll event (Lenis's instant scrolls don't
  //   always re-trigger IO callbacks in all engines).
  React.useEffect(() => {
    const sweep = () => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        const margin = window.innerHeight * 0.08;
        if (r.top < window.innerHeight - margin && r.bottom > 0) {
          el.classList.add("is-in");
        }
      });
    };
    window.__sweepReveals = sweep;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const t0 = setTimeout(sweep, 200);
    const t1 = setTimeout(sweep, 700);
    // Heartbeat sweep: catches throttled/backgrounded contexts where Lenis's
    // rAF loop never advances and IO callbacks don't trigger.
    const heartbeat = setInterval(sweep, 1500);
    const onVis = () => { if (document.visibilityState === "visible") sweep(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("scroll", sweep, { passive: true });
    return () => {
      io.disconnect();
      clearTimeout(t0); clearTimeout(t1);
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", sweep);
      delete window.__sweepReveals;
    };
  }, []);

  // Native smooth scroll for anchor links — Lenis was removed in favor of
  // native scrolling for snappier feel and broader compatibility.
  React.useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <a href="#home" className="skip-link">
        {lang === "ja" ? "本文へスキップ" : "Skip to content"}
      </a>
      <div className="read-progress" aria-hidden="true">
        <div className="read-progress__bar" id="read-progress"></div>
      </div>
      <div className="stage-bg" aria-hidden="true"></div>
      <div className="cursor" id="cursor-glow" aria-hidden="true"></div>
      <Nav lang={lang} setLang={setLang} />
      <HeroSection lang={lang} mode={tw.heroMode} />
      <window.KeywordTicker lang={lang} />
      <About lang={lang} />
      <window.Manifesto lang={lang} />
      <ResearchThemes lang={lang} />
      <MapSection lang={lang} />
      <Gallery lang={lang} />
      <Publications lang={lang} />
      <Access lang={lang} />
      <News lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <LangHint lang={lang} />
      <LabTweaks
        palette={tw.palette}
        setPalette={(v) => setTweak("palette", v)}
        heroMode={tw.heroMode}
        setHeroMode={(v) => setTweak("heroMode", v)}
        cursor={tw.cursor}
        setCursor={(v) => setTweak("cursor", v)}
        grain={tw.grain}
        setGrain={(v) => setTweak("grain", v)}
      />
      <TweaksTrigger />
    </>
  );
}

// Subtle keyboard-hint pill that auto-dismisses after a few seconds (or first
// scroll). Tells visitors that L toggles language.
function LangHint({ lang }) {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const dismiss = () => setVisible(false);
    const t = setTimeout(dismiss, 8000);
    window.addEventListener("scroll", dismiss, { passive: true, once: true });
    window.addEventListener("keydown", dismiss, { once: true });
    return () => { clearTimeout(t); };
  }, []);
  if (!visible) return null;
  return (
    <div className="lang-hint" role="note" aria-live="polite">
      <kbd>L</kbd>
      <span>
        {lang === "ja"
          ? "を押して English へ"
          : "to switch to 日本語"}
      </span>
    </div>
  );
}

// Floating button that opens the Tweaks panel on the deployed site.
// (The panel itself only opens via postMessage; in the editor host the
//  toolbar provides the toggle, but on production we surface it ourselves.)
function TweaksTrigger() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onMsg = (e) => {
      const ty = e?.data?.type;
      if (ty === "__edit_mode_dismissed") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    window.postMessage(
      { type: next ? "__activate_edit_mode" : "__deactivate_edit_mode" },
      "*"
    );
  };
  return (
    <button
      type="button"
      className="tweaks-trigger"
      onClick={toggle}
      aria-pressed={open}
      aria-label="デザイン調整パネルを開く"
      title="Tweaks — 色・3Dモードを切り替え"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2"/>
        <path d="M6 8v12M6 2v2"/>
        <circle cx="12" cy="14" r="2"/>
        <path d="M12 16v4M12 2v10"/>
        <circle cx="18" cy="9" r="2"/>
        <path d="M18 11v9M18 2v5"/>
      </svg>
      <span>Tweaks</span>
    </button>
  );
}

window.App = App;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
