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
        <span className="dot" aria-hidden="true"></span>
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
      </nav>
      <div className="nav__lang" role="group" aria-label={I18N[lang].aria.langtoggle}>
        <button aria-pressed={lang === "ja"} onClick={() => setLang("ja")}>JA</button>
        <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      </div>
    </header>
  );
}

// ── HeroSection ─────────────────────────────────────────────────────────────
function HeroSection({ lang, mode }) {
  const h = I18N[lang].hero;
  const Hero = window.Hero;
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
          <a className="btn btn--primary" href="#research">{h.cta1} <Icon name="arrow" /></a>
          <a className="btn" href="#contact">{h.cta2} <Icon name="arrow" /></a>
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
  React.useEffect(() => { document.documentElement.lang = lang; document.body.setAttribute("data-lang", lang); }, [lang]);

  // Apply palette + grain + cursor settings from tweaks
  React.useEffect(() => { applyPalette(tw.palette); }, [tw.palette]);
  React.useEffect(() => {
    document.body.style.setProperty("--grain-on", tw.grain ? "1" : "0");
    const bg = document.querySelector(".stage-bg");
    if (bg) bg.style.setProperty("--grain-display", tw.grain ? "block" : "none");
  }, [tw.grain]);

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
      <div className="stage-bg" aria-hidden="true"></div>
      <div className="cursor" id="cursor-glow" aria-hidden="true"></div>
      <Nav lang={lang} setLang={setLang} />
      <HeroSection lang={lang} mode={tw.heroMode} />
      <About lang={lang} />
      <ResearchThemes lang={lang} />
      <MapSection lang={lang} />
      <Gallery lang={lang} />
      <Publications lang={lang} />
      <Access lang={lang} />
      <News lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
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
    </>
  );
}

window.App = App;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
