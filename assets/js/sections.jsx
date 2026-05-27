/* ───────────────────────────────────────────────────────────────────────────
   Section components — About, Research, Gallery (+ Lightbox), Publications,
   Access, News, Contact, Footer.

   All read from window.LAB_*; language comes from a `lang` prop ("ja" | "en").
   ─────────────────────────────────────────────────────────────────────────── */

const t = (lang) => window.LAB_I18N[lang];

// ── tiny inline icons (Lucide-ish, kept simple to avoid bloat) ──────────────
function Icon({ name }) {
  const common = {
    width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "brain-circuit": return (
      <svg {...common}><path d="M12 5a3 3 0 0 0-3 3v.5" /><path d="M9 8.5a3 3 0 1 0 0 6v.5" />
        <path d="M9 15a3 3 0 0 0 3 3v.5" /><path d="M12 5a3 3 0 0 1 3 3v.5" />
        <path d="M15 8.5a3 3 0 1 1 0 6v.5" /><path d="M15 15a3 3 0 0 1-3 3" /><circle cx="6" cy="11.5" r="1" /><circle cx="18" cy="11.5" r="1" /></svg>
    );
    case "graph": return (
      <svg {...common}><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" />
        <path d="M7.5 7.2 11 16.8" /><path d="M16.5 7.2 13 16.8" /><path d="M8 6h8" /></svg>
    );
    case "compass": return (
      <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m14.5 9.5-2 5-5 2 2-5 5-2z" /></svg>
    );
    case "waveform": return (
      <svg {...common}><path d="M3 12h2l1 -6 2 12 2-9 2 6 2-4 2 8 2-6 2 3 2-2" /></svg>
    );
    case "compass-rose": return (
      <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></svg>
    );
    case "arrow": return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    );
    case "search": return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
    );
    case "external": return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6M10 14 20 4M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>
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
          <div
            style={{
              width: "clamp(140px, 22vw, 200px)",
              height: "clamp(140px, 22vw, 200px)",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 22px",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 20px 60px -20px color-mix(in oklab, var(--c-a2) 60%, transparent)",
            }}
          >
            <img
              src="assets/images/kenichishibata.jpg"
              alt={lang === "ja" ? "柴田 健一 プロフィール写真" : "Portrait of Kenichi Shibata"}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
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
            <b>{lang === "ja" ? "Music" : "And, in parallel"}</b>
            {bio.altLife[lang]}
            <div style={{ marginTop: 10, fontSize: "var(--type-micro)" }}>
              <a
                href="https://www.youtube.com/user/brightwaltz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--c-ink-3)",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: "3px",
                }}
              >
                {lang === "ja"
                  ? "▶ YouTube で聴く"
                  : "▶ Listen on YouTube"}
              </a>
            </div>
          </div>

          <div className="about-links">
            {bio.links.map((l) => (
              <a key={l.href} className="chip" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <Icon name="external" />
              </a>
            ))}
          </div>

          <p
            style={{
              marginTop: 24,
              color: "var(--c-ink-2)",
              fontSize: "var(--type-small)",
              lineHeight: 1.7,
            }}
          >
            {lang === "ja"
              ? "卒業研究や共同研究に興味のある学生・社会人の方は、Contact からご相談ください。"
              : "Students and external collaborators interested in joint work: please reach out via the Contact section below."}
          </p>
        </div>
      </div>
    </section>
  );
}
window.About = About;

// ─────────────────────────────────────────────────────────────────────────
// Manifesto — three principles that name the lab's stance
// ─────────────────────────────────────────────────────────────────────────
function Manifesto({ lang }) {
  const i = t(lang).sections.manifesto;
  return (
    <section id="manifesto" className="manifesto">
      <div className="manifesto__rule" aria-hidden="true"></div>
      <div className="manifesto__kicker reveal">{i.kicker}</div>
      <div className="manifesto__grid">
        {i.items.map((it, idx) => (
          <div key={it.no} className="manifesto__item reveal" data-d={idx + 1}>
            <div className="manifesto__no">{it.no}</div>
            <h3 className="manifesto__title">{it.title}</h3>
            <p className="manifesto__body">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Manifesto = Manifesto;

// ─────────────────────────────────────────────────────────────────────────
// Keyword ticker — "Now exploring" belt that scrolls under the hero
// ─────────────────────────────────────────────────────────────────────────
function KeywordTicker({ lang }) {
  const kws = [
    "Personal AI", "Distributed PDS", "Graph-Document", "Small LMs",
    "LiDAR Home Sensing", "Recurrent Education", "Consent-by-Design",
    "Engagement Evaluation", "RAG Quality", "Dementia Care",
    "Service Informatics", "Critical Thinking",
  ];
  // Duplicate the list so the marquee loops seamlessly.
  const line = [...kws, ...kws];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__label">
        {lang === "ja" ? "Now exploring" : "Now exploring"}
      </div>
      <div className="ticker__track">
        <div className="ticker__row">
          {line.map((k, idx) => (
            <span key={idx} className="ticker__chip">
              <span className="ticker__dot"></span>{k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
window.KeywordTicker = KeywordTicker;

// ─────────────────────────────────────────────────────────────────────────
// Research themes
// ─────────────────────────────────────────────────────────────────────────
function ResearchThemes({ lang }) {
  const i = t(lang).sections.research;
  const themes = window.LAB_THEMES;
  const projects = Array.isArray(window.LAB_PROJECTS_LIST) ? window.LAB_PROJECTS_LIST : [];
  // First theme renders as a wider feature card with an SVG diagram.
  const [feature, ...rest] = themes;
  return (
    <section id="research" className="section">
      <div className="section__head reveal">
        <div>
          <div className="section__kicker">{i.kicker}</div>
          <h2 className="section__title">{i.title}</h2>
        </div>
        <p className="section__sub">
          {lang === "ja"
            ? "「本人主権のパーソナルデータ × 個人最適化」を軸に、下記のテーマで研究を進めています。"
            : "All threads are rooted in user-sovereign personal data and individual optimization. Below: the active research."}
        </p>
      </div>

      <div className="themes">
        {/* Feature card — Personal AI gets a wider footprint + diagram */}
        <article data-theme-id={feature.id} className="theme theme--feature glass reveal">
          <div className="theme__feature-text">
            <div className="theme__no">{feature.no}</div>
            <div className="theme__icon"><Icon name={feature.icon} /></div>
            <h3 className="theme__title">{feature[lang].title}</h3>
            <p className="theme__sub">{feature[lang].sub}</p>
            <p className="theme__body">{feature[lang].body}</p>
            <div className="theme__kw">
              {feature.kw.map((k) => <span key={k}>{k}</span>)}
            </div>
          </div>
          <PaiDiagram lang={lang} />
        </article>

        {/* Remaining themes — regular grid */}
        {rest.map((th, idx) => (
          <article key={th.id} data-theme-id={th.id} className="theme glass reveal" data-d={(idx % 4) + 1}>
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

      {projects.length > 0 && (
        <>
          <div className="proj-list__head reveal">
            <h3 className="proj-list__title">
              {lang === "ja" ? "進行中の研究プロジェクト" : "Active projects"}
            </h3>
            <p className="proj-list__sub">
              {lang === "ja"
                ? "上記 5 テーマを軸に、企業・地域・学内連携で進めている取り組み。"
                : "Concrete projects we're pursuing with partners, communities and within the university — all aligned to the five threads above."}
            </p>
          </div>
          <div className="proj-list">
            {projects.map((p, idx) => (
              <article
                key={p.id}
                data-project-id={`p-${p.id}`}
                className="proj-item glass reveal"
                data-d={(idx % 4) + 1}
              >
                <div className="proj-item__partner">
                  {lang === "ja" ? p.partnerJa : p.partnerEn}
                </div>
                <h4 className="proj-item__title">
                  {lang === "ja" ? p.titleJa : p.titleEn}
                </h4>
                <p className="proj-item__body">
                  {lang === "ja" ? p.bodyJa : p.bodyEn}
                </p>
                {p.kw && p.kw.length > 0 && (
                  <div className="proj-item__kw">
                    {p.kw.map((k) => <span key={k}>{k}</span>)}
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
window.ResearchThemes = ResearchThemes;

// Tiny inline diagram for the Personal AI feature card.
//   user (person) ─ PDS (distributed dots) ─ SLM agent ─ services
// Pure SVG, no external deps. Animates a "data → agent" pulse.
function PaiDiagram({ lang }) {
  return (
    <svg className="theme__diagram" viewBox="0 0 520 180" aria-hidden="true">
      <defs>
        <linearGradient id="paiGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="var(--c-a1)"/>
          <stop offset="50%" stopColor="var(--c-a2)"/>
          <stop offset="100%" stopColor="var(--c-a3)"/>
        </linearGradient>
        <radialGradient id="paiCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(34,211,238,0.55)"/>
          <stop offset="100%" stopColor="rgba(34,211,238,0)"/>
        </radialGradient>
      </defs>

      {/* Backdrop grid */}
      <rect x="0" y="0" width="520" height="180" fill="rgba(255,255,255,0.012)"/>

      {/* Person (left) */}
      <g transform="translate(50, 90)">
        <circle r="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
        <circle cy="-6" r="6" fill="rgba(255,255,255,0.6)"/>
        <path d="M -10 10 Q 0 4 10 10 L 10 14 Q 0 8 -10 14 Z" fill="rgba(255,255,255,0.6)"/>
        <text x="0" y="44" fill="rgba(236,238,246,0.55)" fontSize="10"
              textAnchor="middle" letterSpacing="0.1em">{lang === "ja" ? "本人" : "Person"}</text>
      </g>

      {/* PDS — scattered data points */}
      <g transform="translate(180, 90)">
        <circle r="42" fill="rgba(59,130,246,0.04)" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3"/>
        {[
          [-22, -12], [-8, -22], [14, -16], [-18, 6], [4, 4],
          [22, 10], [-12, 18], [10, 22], [0, -4], [-26, 0],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5"
                  fill={i % 3 === 0 ? "var(--c-a1)" : i % 3 === 1 ? "var(--c-a2)" : "var(--c-a3)"}
                  opacity="0.85"/>
        ))}
        <text x="0" y="62" fill="rgba(236,238,246,0.55)" fontSize="10"
              textAnchor="middle" letterSpacing="0.1em">PDS</text>
      </g>

      {/* SLM agent — central node */}
      <g transform="translate(330, 90)">
        <circle r="36" fill="url(#paiCore)"/>
        <circle r="22" fill="rgba(5,8,24,0.85)" stroke="url(#paiGrad)" strokeWidth="1.6"/>
        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="600"
              textAnchor="middle" letterSpacing="0.06em">SLM</text>
        <text x="0" y="56" fill="rgba(236,238,246,0.55)" fontSize="10"
              textAnchor="middle" letterSpacing="0.1em">{lang === "ja" ? "パーソナル AI" : "Personal AI"}</text>
      </g>

      {/* Services — three small endpoints on the right */}
      <g transform="translate(460, 90)">
        {[[-40, -28], [-30, 0], [-44, 28]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <rect x="-18" y="-9" width="36" height="18" rx="4"
                  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)"/>
          </g>
        ))}
        <text x="-30" y="58" fill="rgba(236,238,246,0.55)" fontSize="10"
              textAnchor="middle" letterSpacing="0.1em">{lang === "ja" ? "支援サービス" : "Services"}</text>
      </g>

      {/* Connecting lines + animated pulse */}
      <g>
        <line x1="80" y1="90" x2="142" y2="90" stroke="rgba(255,255,255,0.22)"/>
        <line x1="220" y1="90" x2="298" y2="90" stroke="rgba(255,255,255,0.22)"/>
        <line x1="362" y1="90" x2="420" y2="90" stroke="rgba(255,255,255,0.22)"/>
        <line x1="430" y1="62" x2="430" y2="118" stroke="rgba(255,255,255,0.14)"/>
        {/* Pulses */}
        <circle r="3" fill="var(--c-a1)">
          <animate attributeName="cx" values="80;142" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="90;90" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle r="3" fill="var(--c-a2)">
          <animate attributeName="cx" values="220;298" dur="2.4s" begin="0.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin="0.4s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="90;90" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle r="3" fill="var(--c-a3)">
          <animate attributeName="cx" values="362;420" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin="0.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="90;90" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}

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
  // Per-year "expanded" state — default collapsed (show first PREVIEW only).
  const [expanded, setExpanded] = React.useState({});
  const PREVIEW = 2;

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
      if (e.key === "ArrowLeft") setOpen((o) => (o + items.length - 1) % items.length);
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

      {groups.map(([year, list]) => {
        const isOpen = !!expanded[year];
        const hasMore = list.length > PREVIEW;
        const visible = isOpen || !hasMore ? list : list.slice(0, PREVIEW);
        const hiddenCount = list.length - PREVIEW;
        return (
          <div key={year} className="gallery-group">
            <div className="gallery-group__head reveal">
              <span className="gallery-group__year">{year}{lang === "ja" ? "年度" : ""}</span>
              <span className="gallery-group__count">
                {list.length} {lang === "ja" ? "作品" : (list.length === 1 ? "work" : "works")}
              </span>
              <span className="gallery-group__rule" aria-hidden="true"></span>
            </div>

            <div className="gallery">
              {visible.map((g, k) => (
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

            {hasMore && (
              <div
                className="reveal"
                style={{ display: "flex", justifyContent: "center", marginTop: 22 }}
              >
                <button
                  type="button"
                  className="chip"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((s) => ({ ...s, [year]: !isOpen }))}
                  style={{ cursor: "pointer" }}
                >
                  {isOpen
                    ? (lang === "ja" ? "閉じる" : "Show less")
                    : (lang === "ja"
                        ? `他の研究を見る (+${hiddenCount})`
                        : `Show more works (+${hiddenCount})`)}
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ transition: "transform .25s var(--ease-out)",
                             transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
      })}

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
            <span>{lang === "ja" ? "Paper" : "Papers"}</span>
          </div>
          <div className="pub-card__stat">
            <b>33+</b>
            <span>MISC</span>
          </div>
          <div className="pub-card__stat">
            <b>3</b>
            <span>{lang === "ja" ? "Award" : "Awards"}</span>
          </div>
          <div className="pub-card__stat">
            <b>2</b>
            <span>{lang === "ja" ? "Grant" : "KAKENHI"}</span>
          </div>
        </div>
      </a>

      {/* KAKENHI / projects strip — rendered only when data is provided */}
      {Array.isArray(window.LAB_PROJECTS) && window.LAB_PROJECTS.length > 0 && (
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
      )}
    </section>
  );
}
window.Publications = Publications;

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
        </div>
        <a
          className="access-map-card glass reveal"
          data-d="1"
          href="https://www.google.com/maps/search/?api=1&query=玉川大学+工学部"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "ja" ? "地図アプリで開く" : "Open in maps"}
        >
          <svg className="access-map-svg" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <linearGradient id="mp-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(34,211,238,0.18)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0.18)" />
              </linearGradient>
              <pattern id="mp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#mp-bg)" />
            <rect width="400" height="400" fill="url(#mp-grid)" />
            {/* Stylized road traces */}
            <path d="M 0 240 Q 120 220 200 240 T 400 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" fill="none" />
            <path d="M 60 0 Q 80 140 220 200 T 400 320" stroke="rgba(255,255,255,0.14)" strokeWidth="2" fill="none" />
            <path d="M 0 100 Q 180 110 260 60 T 400 100" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
            {/* Tamagawa-gakuen-mae station marker */}
            <g transform="translate(140, 280)">
              <circle r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
              <text x="0" y="36" fill="rgba(236,238,246,0.7)" fontSize="11" textAnchor="middle" letterSpacing="0.05em">玉川学園前駅</text>
            </g>
            {/* Lab marker (gradient pulse) */}
            <g transform="translate(240, 180)">
              <circle r="34" fill="rgba(59,130,246,0.18)" />
              <circle r="22" fill="rgba(59,130,246,0.32)" />
              <circle r="12" fill="#3B82F6" />
              <circle r="4" fill="#fff" />
              <text x="0" y="-46" fill="#fff" fontSize="12" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">柴田研究室</text>
            </g>
          </svg>
          <div className="access-map-cta">
            <span>{lang === "ja" ? "地図アプリで開く" : "Open in maps"}</span>
            <Icon name="external" />
          </div>
        </a>
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
            ? <><em>個人最適化</em>を、<br />一緒に設計しませんか。</>
            : <>Let's design <em>personalization</em><br /> together.</>}
        </h2>
        <p className="contact__body">{i.body}</p>
        <div className="contact__links">
          <a className="btn btn--primary" href="https://brightwaltz.mystrikingly.com/#contact" target="_blank" rel="noopener noreferrer">
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
