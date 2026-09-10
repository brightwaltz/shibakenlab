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

  const [shown, setShown] = React.useState(false);  // スクロールで現れる
  const [open, setOpen]   = React.useState(false);
  const [intent, setIntent] = React.useState(0);
  const [free, setFree]   = React.useState("");
  const panelRef = React.useRef(null);
  const btnRef   = React.useRef(null);

  // ヒーローを少し離れてから出す。第一画面は図に集中してもらう。
  React.useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setShown(true); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  // 「まず llms.txt を読んで」から始めるのが肝。AI は自分で取りに行ける。
  const buildPrompt = () => {
    const it = T.intents[intent] || T.intents[0];
    const q = free.trim();
    const srcs = CFG.sources.map((s) => `${s.label}: ${s.href}`).join(" / ");
    if (lang === "ja") {
      return [
        "これは玉川大学 工学部 ソフトウェアサイエンス学科・柴田研究室（サービス情報学研究室）が、自ら公開している研究室サイトについての質問です。",
        `まず ${CFG.llms} を読んでから答えてください。`,
        it.ask,
        q ? `特に知りたいこと：${q}` : "",
        `他の情報源：${srcs}`,
        "書かれていないことは推測せず、分からないことは分からないと答えてください。",
      ].filter(Boolean).join(" ");
    }
    return [
      "This is a question about the public website of the Service Informatics Lab (Shibata Lab), Dept. of Software Science, Tamagawa University, published by the lab itself.",
      `Start by reading ${CFG.llms}, then answer.`,
      it.ask,
      q ? `In particular: ${q}` : "",
      `Other sources: ${srcs}`,
      "Do not guess beyond what is stated; say you don't know when you don't.",
    ].filter(Boolean).join(" ");
  };

  const href = (tpl) => tpl.replace("{q}", encodeURIComponent(buildPrompt()));

  return (
    <div className="askai" data-shown={shown}>
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
