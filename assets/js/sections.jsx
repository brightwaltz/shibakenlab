/* ───────────────────────────────────────────────────────────────────────────
   Section components — About, Research, Gallery (+ Lightbox), Publications,
   Member/Projects, Access, News, Contact, Footer.

   All read from window.LAB_*; language comes from a `lang` prop ("ja" | "en").
   ─────────────────────────────────────────────────────────────────────────── */

const t = (lang) => window.LAB_I18N[lang];

// ── tiny inline icons (Lucide-ish, kept simple to avoid bloat) ──────────────
function Icon({ name }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
                   stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "brain-circuit": return (
      <svg {...common}><path d="M12 5a3 3 0 0 0-3 3v.5"/><path d="M9 8.5a3 3 0 1 0 0 6v.5"/>
        <path d="M9 15a3 3 0 0 0 3 3v.5"/><path d="M12 5a3 3 0 0 1 3 3v.5"/>
        <path d="M15 8.5a3 3 0 1 1 0 6v.5"/><path d="M15 15a3 3 0 0 1-3 3"/><circle cx="6" cy="11.5" r="1"/><circle cx="18" cy="11.5" r="1"/></svg>
    );
    case "graph": return (
      <svg {...common}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
        <path d="M7.5 7.2 11 16.8"/><path d="M16.5 7.2 13 16.8"/><path d="M8 6h8"/></svg>
    );
    case "compass": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m14.5 9.5-2 5-5 2 2-5 5-2z"/></svg>
    );
    case "waveform": return (
      <svg {...common}><path d="M3 12h2l1 -6 2 12 2-9 2 6 2-4 2 8 2-6 2 3 2-2"/></svg>
    );
    case "compass-rose": return (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>
    );
    case "arrow": return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    );
    case "search": return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    );
    case "external": return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6M10 14 20 4M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>
    );
    default: return null;
  }
}
window.Icon = Icon;

// ─────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────
function About({ lang }) {
  const i = t(lang).sections.about;
  const bio = window.LAB_BIO;
  return (
    <section id="about" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "玉川大学の研究室主宰・柴田健一について。研究領域、所属、外部リンクをまとめています。"
            : "About the PI of Service Informatics Lab — research scope, affiliations, and external links."}
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card glass reveal">
          <div className="about-name">{bio.name[lang]}</div>
          <div className="about-namesub">{bio.nameSub[lang]}</div>
          <div className="about-title">{bio.title[lang]}</div>
          <ul className="about-affil">
            {bio.affil.map((a, idx) => <li key={idx}>{a[lang]}</li>)}
          </ul>
          <div className="about-degree">{bio.degree[lang]}</div>
        </div>

        <div className="reveal" data-d="1">
          <p className="about-bio">{bio.bio[lang]}</p>

          <div className="about-alt">
            <b>{lang === "ja" ? "もう一つの顔" : "And, in parallel"}</b>
            {bio.altLife[lang]}
          </div>

          <div className="about-links">
            {bio.links.map((l) => (
              <a key={l.href} className="chip" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <Icon name="external" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;

// ─────────────────────────────────────────────────────────────────────────
// Research themes
// ─────────────────────────────────────────────────────────────────────────
function ResearchThemes({ lang }) {
  const i = t(lang).sections.research;
  const themes = window.LAB_THEMES;
  return (
    <section id="research" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "「本人主権のパーソナルデータ × 個人最適化」を軸に、5つのテーマで研究を進めています。"
            : "Five threads, all rooted in user-sovereign personal data and individual optimization."}
        </p>
      </div>

      <div className="themes">
        {themes.map((th, idx) => (
          <article key={th.id} data-theme-id={th.id} className="theme glass reveal" data-d={idx % 5}>
            <div className="theme__no">{th.no}</div>
            <div className="theme__icon"><Icon name={th.icon} /></div>
            <h3 className="theme__title">{th[lang].title}</h3>
            <p className="theme__sub">{th[lang].sub}</p>
            <p className="theme__body">{th[lang].body}</p>
            <div className="theme__kw">
              {th.kw.map((k) => <span key={k}>{k}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ResearchThemes = ResearchThemes;

// ─────────────────────────────────────────────────────────────────────────
// Research map section wrapper
// ─────────────────────────────────────────────────────────────────────────
function MapSectionWrap({ lang }) {
  const i = t(lang).sections.map;
  const RM = window.ResearchMap;
  return (
    <section id="map" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">{i.hint}</p>
      </div>
      <div className="reveal"><RM /></div>
    </section>
  );
}
window.MapSection = MapSectionWrap;

// ─────────────────────────────────────────────────────────────────────────
// Gallery (infographics) + Lightbox
// ─────────────────────────────────────────────────────────────────────────
function Gallery({ lang }) {
  const i = t(lang).sections.gallery;
  const items = window.LAB_INFOGRAPHICS;
  const [open, setOpen] = React.useState(null);

  // Group by year (descending). Flat indices preserved for lightbox nav.
  const groups = React.useMemo(() => {
    const map = new Map();
    items.forEach((it, idx) => {
      const arr = map.get(it.year) || [];
      arr.push({ ...it, _idx: idx });
      map.set(it.year, arr);
    });
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [items]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft")  setOpen((o) => (o + items.length - 1) % items.length);
      if (e.key === "ArrowRight") setOpen((o) => (o + 1) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  return (
    <section id="gallery" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">{i.sub}</p>
      </div>

      {groups.map(([year, list]) => (
        <div key={year} className="gallery-group">
          <div className="gallery-group__head reveal">
            <span className="gallery-group__year">{year}{lang === "ja" ? "年度" : ""}</span>
            <span className="gallery-group__count">
              {list.length} {lang === "ja" ? "作品" : (list.length === 1 ? "work" : "works")}
            </span>
            <span className="gallery-group__rule" aria-hidden="true"></span>
          </div>

          <div className="gallery">
            {list.map((g, k) => (
              <button
                key={g.src}
                className="gallery-item reveal"
                data-d={(k % 4) + 1}
                onClick={() => setOpen(g._idx)}
                aria-label={g[lang === "ja" ? "titleJa" : "titleEn"]}
                type="button"
              >
                <img src={g.src} loading="lazy" alt={g[lang === "ja" ? "titleJa" : "titleEn"]} />
                <div className="gallery-cap">
                  <b>{g[lang === "ja" ? "titleJa" : "titleEn"]}</b>
                  <span>{g[lang === "ja" ? "sumJa" : "sumEn"]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {open !== null && (
        <Lightbox
          item={items[open]}
          lang={lang}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((o) => (o + items.length - 1) % items.length)}
          onNext={() => setOpen((o) => (o + 1) % items.length)}
        />
      )}
    </section>
  );
}
function Lightbox({ item, lang, onClose, onPrev, onNext }) {
  const ar = t(lang).aria;
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label={ar.lightbox}>
      <div onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item[lang === "ja" ? "titleJa" : "titleEn"]} />
        <div className="lightbox-caption">
          <b>{item[lang === "ja" ? "titleJa" : "titleEn"]}</b> · {item.year}
          <br />
          <span style={{ color: "rgba(255,255,255,0.65)" }}>{item[lang === "ja" ? "sumJa" : "sumEn"]}</span>
        </div>
      </div>
      <button className="lightbox-btn lightbox-btn--close" onClick={onClose} aria-label={ar.close}>✕</button>
      {window.LAB_INFOGRAPHICS.length > 1 && (
        <>
          <button className="lightbox-btn lightbox-btn--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label={ar.prev}>‹</button>
          <button className="lightbox-btn lightbox-btn--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label={ar.next}>›</button>
        </>
      )}
    </div>
  );
}
window.Gallery = Gallery;

// ─────────────────────────────────────────────────────────────────────────
// Publications — concise card pointing to researchmap, plus KAKENHI strip.
//   ※ 業績一覧は researchmap が一次ソースなので、サイト内では掲載しない。
// ─────────────────────────────────────────────────────────────────────────
function Publications({ lang }) {
  const i = t(lang).sections.pubs;
  return (
    <section id="publications" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "論文・解説・受賞などの一次ソースは researchmap に集約しています。"
            : "Our primary publication record is maintained on researchmap."}
        </p>
      </div>

      <a
        href="https://researchmap.jp/brightwaltz"
        target="_blank"
        rel="noopener noreferrer"
        className="glass pub-card reveal"
      >
        <div className="pub-card__left">
          <div className="pub-card__kicker">researchmap</div>
          <h3 className="pub-card__title">
            {lang === "ja"
              ? <>研究業績の<em> 全件</em>を researchmap で。</>
              : <>The <em>full record</em> of publications, on researchmap.</>}
          </h3>
          <p className="pub-card__sub">
            {lang === "ja"
              ? "論文・国際会議・解説・受賞・MISC まで、最新の業績は外部の一次ソースに集約しています。"
              : "Papers, conferences, MISC, awards — all maintained at the canonical source."}
          </p>
          <div className="pub-card__cta">
            <span>{lang === "ja" ? "researchmap で見る" : "Open on researchmap"}</span>
            <Icon name="arrow" />
          </div>
        </div>
        <div className="pub-card__right" aria-hidden="true">
          <div className="pub-card__stat">
            <b>20+</b>
            <span>{lang === "ja" ? "論文" : "Papers"}</span>
          </div>
          <div className="pub-card__stat">
            <b>33+</b>
            <span>MISC</span>
          </div>
          <div className="pub-card__stat">
            <b>3</b>
            <span>{lang === "ja" ? "受賞" : "Awards"}</span>
          </div>
          <div className="pub-card__stat">
            <b>2</b>
            <span>{lang === "ja" ? "科研費" : "KAKENHI"}</span>
          </div>
        </div>
      </a>

      {/* KAKENHI / projects strip */}
      <div className="projects">
        {window.LAB_PROJECTS.map((pr, idx) => (
          <div key={idx} className="project glass reveal">
            <p className="project__fund">{pr.fund}</p>
            <p className="project__title">{pr[lang].title}</p>
            <div className="project__meta">
              <span>{pr.term}</span>
              <span>{pr[lang].role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Publications = Publications;

// ─────────────────────────────────────────────────────────────────────────
// Member (PI only)
// ─────────────────────────────────────────────────────────────────────────
function Member({ lang }) {
  const i = t(lang).sections.member;
  return (
    <section id="member" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "現時点では主宰のみ。学生メンバーは新年度に随時掲載予定です。"
            : "At the moment, the PI only. Student members will be listed each spring."}
        </p>
      </div>

      <div className="glass reveal" style={{ padding: "clamp(28px, 4vw, 56px)", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 96, height: 96, borderRadius: "50%",
          background: "var(--grad-accent)",
          fontSize: 38, fontWeight: 600, color: "#fff",
          boxShadow: "0 20px 60px -20px color-mix(in oklab, var(--c-a2) 60%, transparent)"
        }}>柴</div>
        <h3 style={{ fontSize: "var(--type-h2)", margin: "20px 0 4px", fontWeight: 600 }}>
          {window.LAB_BIO.name[lang]}
        </h3>
        <p style={{ color: "var(--c-ink-3)", margin: 0, fontSize: "var(--type-small)", letterSpacing: "0.08em" }}>
          {window.LAB_BIO.title[lang]}
        </p>
        <p style={{
          maxWidth: 560, margin: "24px auto 0", color: "var(--c-ink-2)",
          fontSize: "var(--type-small)", lineHeight: 1.7,
        }}>
          {lang === "ja"
            ? "卒業研究や共同研究に興味のある学生・社会人の方は、Contact からご相談ください。"
            : "Students and external collaborators interested in joint work: please reach out via the Contact section below."}
        </p>
      </div>
    </section>
  );
}
window.Member = Member;

// ─────────────────────────────────────────────────────────────────────────
// Access
// ─────────────────────────────────────────────────────────────────────────
function Access({ lang }) {
  const i = t(lang).sections.access;
  return (
    <section id="access" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">{i.visit}</p>
      </div>

      <div className="access-grid">
        <div className="access-card glass reveal">
          <h4>Address</h4>
          <p>{i.addr}</p>
          <h4>Building</h4>
          <p>{i.building}</p>
          <h4>Nearest station</h4>
          <p>{i.nearest}</p>
          <h4>{lang === "ja" ? "代表電話" : "Phone"}</h4>
          <p>042-739-8111</p>
        </div>
        <div className="map-iframe-wrap reveal" data-d="1">
          <iframe
            title="Tamagawa University Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=139.45%2C35.55%2C139.49%2C35.58&amp;layer=mapnik&amp;marker=35.566%2C139.469"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
window.Access = Access;

// ─────────────────────────────────────────────────────────────────────────
// News
// ─────────────────────────────────────────────────────────────────────────
function News({ lang }) {
  const i = t(lang).sections.news;
  const items = window.LAB_NEWS;
  return (
    <section id="news" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "サイト・研究室の更新情報。Markdown で執筆し、GitHub にコミットして公開しています。"
            : "Site and lab updates. Authored in Markdown, committed to GitHub."}
        </p>
      </div>

      <div className="news-list">
        {items.map((n) => (
          <article key={n.slug} className="news-item reveal">
            <div className="news-date">{n.date}</div>
            <div>
              <h3 className="news-title">{lang === "ja" ? n.titleJa : n.titleEn}</h3>
              <p className="news-body">{lang === "ja" ? n.bodyJa : n.bodyEn}</p>
              <div className="news-tags">
                {n.tags.map((tg) => <span key={tg}>#{tg}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.News = News;

// ─────────────────────────────────────────────────────────────────────────
// Contact + Footer
// ─────────────────────────────────────────────────────────────────────────
function Contact({ lang }) {
  const i = t(lang).sections.contact;
  // メール公開は要本人確認 → フォームは researchmap / Strikingly コンタクトに誘導
  return (
    <section id="contact" className="contact">
      <div className="reveal">
        <div className="eyebrow">{i.kicker}</div>
        <h2 className="contact__big">
          {lang === "ja"
            ? <><em>個人最適化</em>を、<br/>一緒に設計しませんか。</>
            : <>Let's design <em>personalization</em><br/> together.</>}
        </h2>
        <p className="contact__body">{i.body}</p>
        <div className="contact__links">
          <a className="btn btn--primary" href="https://researchmap.jp/brightwaltz" target="_blank" rel="noopener noreferrer">
            {i.cta} <Icon name="arrow" />
          </a>
          <a className="btn" href="https://brightwaltz.mystrikingly.com/#contact" target="_blank" rel="noopener noreferrer">
            Strikingly <Icon name="external" />
          </a>
          <a className="btn" href="https://researchmap.jp/brightwaltz" target="_blank" rel="noopener noreferrer">
            researchmap <Icon name="external" />
          </a>
        </div>
        {/* TODO: 主宰本人確認のうえ、公開メールアドレスをここに追加する。 */}
      </div>
    </section>
  );
}
window.Contact = Contact;

function Footer({ lang }) {
  const f = t(lang).foot;
  return (
    <footer className="footer">
      <div>© 2026 Service Informatics Lab · {f.tama}</div>
      <div style={{ display: "flex", gap: 18 }}>
        <a href="https://www.tamagawa.ac.jp/college_of_engineering/teachers/software/shibata.html" target="_blank" rel="noopener noreferrer">{f.tama}</a>
        <a href="https://github.com/brightwaltz/shibakenlab" target="_blank" rel="noopener noreferrer">{f.src}</a>
        <span>{f.crafted}</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
