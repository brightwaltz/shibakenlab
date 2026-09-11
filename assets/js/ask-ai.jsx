/* ───────────────────────────────────────────────────────────────────────────
   AskAI — 「AI に聞く」

   訪問者が使っている AI に、この研究室の公開情報を読ませて質問してもらう。
   サーバも API 鍵も使わない。やっていることは 2 つだけ：

     1. サイトが llms.txt（研究室の要約）を公開している
     2. ボタンは、プロンプトを URL に埋めた *ただのリンク*

   GitHub Pages のような静的ホスティングでそのまま動き、費用もかからない。
   訪問者の入力はどこにも保存せず、開いた先の AI サービスに渡るだけ。

   文言は data.js（LAB_I18N.*.sections.askai）、送信先とソースは LAB_ASKAI。
   ─────────────────────────────────────────────────────────────────────────── */

function AskAI({ lang = "ja" }) {
  const CFG = window.LAB_ASKAI;
  const T = (window.LAB_I18N[lang] && window.LAB_I18N[lang].sections.askai) || null;

  const [open, setOpen]   = React.useState(false);
  const [intent, setIntent] = React.useState(0);
  const [free, setFree]   = React.useState("");
  const panelRef = React.useRef(null);
  const btnRef   = React.useRef(null);

  // 開いている間だけ: Esc と外側クリックで閉じる
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      if (btnRef.current) btnRef.current.focus();
    };
    const onDown = (e) => {
      const p = panelRef.current, b = btnRef.current;
      if (p && !p.contains(e.target) && b && !b.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  React.useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  if (!CFG || !T) return null;

  // ── プロンプト ────────────────────────────────────────────────────────────
  // llms.txt を読んでもらうのが本筋だが、公開直後の URL は検索インデックスに
  // 無く、Perplexity や Google AI モードは「取得できません」で止まる。
  // そこで要点（誰が・何を・いま何を）をプロンプト自体に載せ、llms.txt は
  // 「読める場合の詳細」に格下げする。要点は data.js から都度組み立てる。
  const digest = () => {
    const B = window.LAB_BIO, TH = window.LAB_THEMES || [], PR = window.LAB_PROJECTS_LIST || [];
    const j = lang === "ja";
    const kw = [...new Set(TH.flatMap((t) => t.kw || []))].slice(0, 12).join(", ");
    const themes = TH.map((t) => (j ? t.ja.title : t.en.title)).join(j ? "／" : " / ");
    const projects = PR.slice(0, 4).map((p) => (j ? p.titleJa : p.titleEn)).join(j ? "／" : " / ");
    return j
      ? `${B.name.ja}（${B.title.ja}、${B.degree.ja}）。研究テーマ：${themes}。キーワード：${kw}。進行中：${projects}。`
      : `${B.name.en} (${B.title.en}; ${B.degree.en}). Themes: ${themes}. Keywords: ${kw}. Current projects: ${projects}.`;
  };

  const buildPrompt = () => {
    const it = T.intents[intent] || T.intents[0];
    const q = free.trim();
    const srcs = CFG.sources.map((s) => `${s.label}: ${s.href}`).join(" / ");
    if (lang === "ja") {
      return [
        "玉川大学 工学部 ソフトウェアサイエンス学科・柴田研究室（サービス情報学研究室）が自ら公開している研究室サイトについての質問です。",
        it.ask,
        q ? `特に知りたいこと：${q}` : "",
        `サイトの要約：${digest()}`,
        `詳細は ${CFG.llms} にあります。取得できる場合は読んでから答えてください。取得できない場合は、この要約と次の情報源から答えてください：${srcs}`,
        "書かれていないことは推測せず、分からないことは分からないと答えてください。",
      ].filter(Boolean).join(" ");
    }
    return [
      "This is a question about the public website of the Service Informatics Lab (Shibata Lab), Dept. of Software Science, Tamagawa University, published by the lab itself.",
      it.ask,
      q ? `In particular: ${q}` : "",
      `Site summary: ${digest()}`,
      `Details are at ${CFG.llms} — read it first if you can fetch it. If you cannot, answer from this summary and these sources: ${srcs}`,
      "Do not guess beyond what is stated; say you don't know when you don't.",
    ].filter(Boolean).join(" ");
  };

  const href = (tpl) => tpl.replace("{q}", encodeURIComponent(buildPrompt()));

  return (
    <div className="askai">
      {open && (
        <div className="askai__panel" role="dialog" aria-label={T.title}
             ref={panelRef} tabIndex={-1}>
          <div className="askai__head">
            <h2 className="askai__title">{T.title}</h2>
            <button type="button" className="askai__x" aria-label={T.close}
                    onClick={() => setOpen(false)}>×</button>
          </div>
          <p className="askai__lead">{T.lead}</p>

          <fieldset className="askai__intents">
            <legend>{T.intentLabel}</legend>
            {T.intents.map((it, i) => (
              <button key={it.id} type="button" className="askai__intent"
                      aria-pressed={i === intent} onClick={() => setIntent(i)}>
                {it.label}
              </button>
            ))}
          </fieldset>

          <label className="askai__free">
            <span>{T.freeLabel}</span>
            <input type="text" value={free} placeholder={T.freePlaceholder}
                   maxLength={200} onChange={(e) => setFree(e.target.value)} />
          </label>

          <div className="askai__send">
            <span className="askai__send-k">{T.send}</span>
            <div className="askai__providers">
              {CFG.providers.map((p) => (
                <a key={p.id} className="askai__provider"
                   href={href(p.tpl)} target="_blank" rel="noopener noreferrer"
                   title={p.note || p.label}>
                  {p.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                       strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <p className="askai__note">{T.note}</p>
        </div>
      )}

      <button type="button" className="askai__btn" ref={btnRef}
              aria-expanded={open} aria-haspopup="dialog"
              onClick={() => setOpen(!open)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
             strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 0 1-13 8l-5 1 1-4.6A9 9 0 1 1 21 12z" />
          <path d="M9.2 9.4a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.4-2.8 2.4" />
          <path d="M12 16.6h.01" />
        </svg>
        <span>{T.btn}</span>
      </button>
    </div>
  );
}

window.AskAI = AskAI;
