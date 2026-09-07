/* ───────────────────────────────────────────────────────────────────────────
   HeroField — "Personal Field"
   研究の主張を、文章ではなく機構として見せるヒーロー図解。

     中心の白い核        = あなた（本人）
     境界のリング        = あなたが決める境界。許さない限り何も越えない
     内側を漂う粒        = 暮らしのデータ断片（学び / 暮らし / からだ / 会話 / 予定）
     あなたに従う光点    = 小さな AI（SLM）。カーソル＝あなたの関心を追う
     粒の間に張られる辺  = Graph-Document。触れた断片の間に構造が残り、消えない
     周縁の 3 ノード     = 支援サービス（教育 / 介護 / 地域）
     クリック時のゲート  = 同意。開いた隙間から「要約 1 粒」だけが出て、支援が返る
     脈動                = 3 拍子（ワルツ）。1 拍目が強い — brightwaltz の署名

   学習結果は訪問者のブラウザ (localStorage) にのみ残り、サーバへは何も送らない。
   残るのは絵ではなく“学んだプロファイル”で、次回はそこから構造が生え直す。
   「保存されている内容」は localStorage の実物を読んで表示する（in-memory の値
   ではなく、本当に保存されているものを見せる）。「忘れる」で消去できる。

   Public API:
     <HeroField lang="ja" />
     window.__heroFieldRefreshPalette()   // パレット切替時に app.jsx が呼ぶ
   ─────────────────────────────────────────────────────────────────────────── */

const HF_KEY  = "lab-field-profile";
const HF_BEAT = 0.8;            // 1 拍 (秒)。3 拍で 1 小節 = 2.4s
const HF_TAU  = Math.PI * 2;

// mulberry32 — 訪問者ごとに固定の場を作るための決定的乱数
function hfRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hfRgb(hex) {
  const h = (hex || "").trim().replace("#", "");
  const s = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(s || "888888", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const hfMix = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const hfLum = (c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
const hfCss = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

// 粒ひとつ分のグロー。色ごとに 1 枚だけ焼いて drawImage で使い回す。
function hfSprite(rgb, soft) {
  const px = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const g = cv.getContext("2d");
  const grd = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  grd.addColorStop(0.00, hfCss(rgb, 1));
  grd.addColorStop(0.18, hfCss(rgb, soft ? 0.55 : 0.75));
  grd.addColorStop(0.45, hfCss(rgb, soft ? 0.14 : 0.20));
  grd.addColorStop(1.00, hfCss(rgb, 0));
  g.fillStyle = grd;
  g.fillRect(0, 0, px, px);
  return cv;
}

function HeroField({ lang = "ja" }) {
  const hostRef  = React.useRef(null);
  const cvsRef   = React.useRef(null);
  const aiRef    = React.useRef(null);   // 「小さな AI」ラベル（毎フレーム追従）
  const aiMarkRef   = React.useRef(null);   // 案内マーカー（AI に追従）
  const edgeMarkRef = React.useRef(null);   // 案内マーカー（いちばん濃い辺の中点）
  const meterRef = React.useRef(null);
  const apiRef   = React.useRef({});

  const [lay, setLay]       = React.useState(null);
  const [hasMem, setHasMem] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);
  const [peek, setPeek]     = React.useState(false);
  const [snap, setSnap]     = React.useState(null);
  const [guide, setGuide]   = React.useState(-1);   // 「仕組み」の現在ステップ。-1 = 閉
  const STEPS = T.steps || [];

  const F = window.LAB_FIELD;
  const T = (window.LAB_I18N[lang] && window.LAB_I18N[lang].hero.field) || {};
  const txt = (o) => (o && (o[lang] || o.ja)) || "";

  React.useEffect(() => {
    const host = hostRef.current;
    const cvs  = cvsRef.current;
    if (!host || !cvs || !F) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    const cats = F.categories;
    const svcs = F.services;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── palette ─────────────────────────────────────────────────────────────
    let pal = null, sprites = [], whiteSprite = null, light = false;
    let spriteCache = new Map();
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const v = (n, fb) => cs.getPropertyValue(n).trim() || fb;
      const a1 = hfRgb(v("--c-a1", "#22D3EE"));
      const a2 = hfRgb(v("--c-a2", "#3B82F6"));
      const a3 = hfRgb(v("--c-a3", "#8B5CF6"));
      const bg = hfRgb(v("--c-bg", "#050818"));
      light = hfLum(bg) > 0.5;
      // カテゴリ色は a1→a2→a3 のランプ上に等間隔で置く
      const ramp = (h) => (h <= 0.5 ? hfMix(a1, a2, h * 2) : hfMix(a2, a3, (h - 0.5) * 2));
      pal = {
        a1, a2, a3, bg,
        cat: cats.map((c) => {
          const base = ramp(c.hue);
          return light ? hfMix(base, [12, 14, 24], 0.34) : base;
        }),
        ink:  light ? [16, 18, 28] : [236, 238, 246],
      };
      sprites = pal.cat.map((c) => hfSprite(c, light));
      whiteSprite = hfSprite(light ? [24, 26, 38] : [255, 255, 255], light);
      spriteCache.clear();
      // 凡例の点は DOM 側なので、同じ色を CSS 変数で渡す
      pal.cat.forEach((c, i) => host.style.setProperty(`--hf-cat-${i}`, hfCss(c, 1)));
    };
    readPalette();
    window.__heroFieldRefreshPalette = readPalette;

    // ── profile (端末内のみ) ────────────────────────────────────────────────
    const blank = () => ({ v: 1, seed: (Math.random() * 1e9) | 0, visits: 0, cats: {} });
    let profile = blank();
    try {
      const raw = localStorage.getItem(HF_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.v === 1 && p.cats) profile = p;
      }
    } catch (e) { /* private mode 等では単に記憶しない */ }
    profile.visits = (profile.visits || 0) + 1;
    const hadMemory = Object.keys(profile.cats).length > 0;

    let saveAcc = 0;
    const save = () => {
      try { localStorage.setItem(HF_KEY, JSON.stringify(profile)); } catch (e) {}
    };

    // ── layout ──────────────────────────────────────────────────────────────
    let W = 0, H = 0, DPR = 1;
    const L = { cx: 0, cy: 0, R: 1, stacked: false };
    const svcPos = svcs.map(() => ({ x: 0, y: 0 }));

    const measure = () => {
      const r = host.getBoundingClientRect();
      W = Math.max(320, Math.round(r.width));
      H = Math.max(360, Math.round(r.height));
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width  = Math.round(W * DPR);
      cvs.height = Math.round(H * DPR);
      cvs.style.width  = W + "px";
      cvs.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      L.stacked = W < 1080;
      if (L.stacked) {
        L.cx = W * 0.5;
        L.cy = H * 0.60;
        L.R  = Math.min(W * 0.32, H * 0.15);
        // 狭幅では周縁に 3 ノードを置く余白がないので、リングの下に一列で並べる。
        // ゲートの向きは各ノードの方位から求まるので、図の意味は変わらない。
        const y = Math.min(H - 96, L.cy + L.R + 52);
        [0.22, 0.5, 0.78].forEach((fx, i) => {
          svcPos[i].x = W * fx;
          svcPos[i].y = y;
        });
      } else {
        L.cx = W * 0.70;
        L.cy = H * 0.50;
        L.R  = Math.min(W * 0.19, H * 0.32);
        const dist = L.R * 1.26;
        svcs.forEach((s, i) => {
          const a = (s.angDesk * Math.PI) / 180;
          // ラベルはノードの 26px 下に出るので、その高さぶん端から離しておく
          svcPos[i].x = Math.min(W - 62, Math.max(62, L.cx + Math.cos(a) * dist));
          svcPos[i].y = Math.min(H - 96, Math.max(96, L.cy + Math.sin(a) * dist));
        });
      }
      const ra = ((L.stacked ? 118 : 140) * Math.PI) / 180;
      // 凡例はリングの真下。狭幅ではサービス行のさらに下。
      const legendY = L.stacked ? svcPos[0].y + 64 : L.cy + L.R + 30;
      setLay({
        core:   { x: L.cx, y: L.cy },
        ring:   { x: L.cx + Math.cos(ra) * L.R * 1.08, y: L.cy + Math.sin(ra) * L.R * 1.08 },
        ringPt: { x: L.cx + Math.cos(ra) * L.R,        y: L.cy + Math.sin(ra) * L.R },
        legend: { x: L.cx, y: legendY },
        svc:    svcPos.map((p) => ({ x: p.x, y: p.y })),
        R: L.R,
      });
    };

    // ── field ───────────────────────────────────────────────────────────────
    let frags = [], knownList = [], edges = new Map();
    let attention = Object.assign({}, profile.cats);

    const buildField = () => {
      const rng = hfRng(profile.seed);
      const n = L.stacked ? 150 : 300;
      frags = new Array(n);
      knownList = [];
      edges = new Map();
      for (let i = 0; i < n; i++) {
        frags[i] = {
          cat:  i % cats.length,
          aff:  (rng() * 5) | 0,
          rr:   0.20 + Math.pow(rng(), 0.72) * 0.74,
          th:   rng() * HF_TAU,
          sp:   (rng() < 0.18 ? -1 : 1) * (0.020 + rng() * 0.030),
          wobA: 0.006 + rng() * 0.020,
          wobF: 0.28 + rng() * 0.75,
          ph:   rng() * HF_TAU,
          sz:   1.5 + rng() * 2.3,
          w: 0, touch: 0, known: false, deg: 0, x: 0, y: 0, glow: 0,
        };
      }
      place(0);
      restore();
    };

    const place = (t) => {
      const R = L.R;
      for (let i = 0; i < frags.length; i++) {
        const f = frags[i];
        const rr = (f.rr + Math.sin(t * f.wobF + f.ph) * f.wobA - f.w * 0.11) * R;
        const th = f.th + t * f.sp;
        f.x = L.cx + Math.cos(th) * rr;
        f.y = L.cy + Math.sin(th) * rr * 0.94;
      }
    };

    const linkUp = (i) => {
      const a = frags[i];
      let added = 0;
      for (let k = knownList.length - 1; k >= 0 && added < 2; k--) {
        const j = knownList[k];
        if (j === i) continue;
        const b = frags[j];
        if (b.deg >= 3 || a.deg >= 3) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > (L.R * 0.30) * (L.R * 0.30)) continue;
        // 同じ種別か親和性が高ければ少し離れていても繋がる。
        // それ以外は、隣り合っているときだけ。
        const kin = b.cat === a.cat || (a.aff + b.aff) % 5 === 0;
        if (!kin && d2 > (L.R * 0.12) * (L.R * 0.12)) continue;
        const key = i < j ? i + ":" + j : j + ":" + i;
        if (edges.has(key)) continue;
        edges.set(key, { a: i, b: j, al: 0, tgt: 0.42 + Math.random() * 0.34 });
        a.sp = b.sp;                       // 同じ構造の断片は一緒に動く
        a.deg++; b.deg++; added++;
      }
    };

    const learn = (i, soft) => {
      const f = frags[i];
      if (f.known) return;
      f.known = true;
      knownList.push(i);
      linkUp(i);
      if (soft) f.w = 0.55;
    };

    // 保存されているのは絵ではなくプロファイル。構造はそこから生え直す。
    const restore = () => {
      // 初回訪問。まっさらでは図が「何もない」に見えるので、AI が既に持っている
      // ぶんだけ構造を置いておく。ここは訪問者について学んだものではないので
      // プロファイルには数えない。
      if (Object.keys(attention).length === 0) {
        const rs = hfRng((profile.seed ^ 0x9e3779b9) >>> 0);
        const near = new Array(frags.length);
        for (let a = 0; a < 6; a++) {
          const i = (rs() * frags.length) | 0;
          const base = frags[i];
          learn(i, true);
          for (let j = 0; j < frags.length; j++) {
            const dx = frags[j].x - base.x, dy = frags[j].y - base.y;
            near[j] = [dx * dx + dy * dy, j];
          }
          near.sort((u, v) => u[0] - v[0]);
          for (let k = 1; k <= 4; k++) learn(near[k][1], true);
        }
        edges.forEach((e) => { e.al = e.tgt * 0.55; });
        return;
      }
      const byCat = cats.map(() => []);
      frags.forEach((f, i) => byCat[f.cat].push(i));
      cats.forEach((c, ci) => {
        const att = attention[c.id] || 0;
        const ratio = att / (att + 9);
        const take = Math.min(byCat[ci].length, Math.round(byCat[ci].length * ratio));
        for (let k = 0; k < take; k++) learn(byCat[ci][k], true);
      });
      edges.forEach((e) => { e.al = e.tgt * 0.42; });
    };

    // ── agent（小さな AI） ──────────────────────────────────────────────────
    const ag = { x: 0, y: 0, tx: 0, ty: 0, idle: 99, auto: true, act: 0 };

    // ── 強調 ────────────────────────────────────────────────────────────────
    // 「仕組み」で指している部品と、凡例で触れている種類。描画だけが変わる。
    let focus = null;        // "core" | "ai" | "edge" | "ring" | "svc" | null
    let focusCat = -1;       // 0..4 or -1
    const setFocus = (at) => { focus = at || null; };
    const setFocusCat = (i) => { focusCat = typeof i === "number" ? i : -1; };

    // ── consent gate / share ────────────────────────────────────────────────
    let gate = null;   // { i, t, ang }
    const share = (id) => {
      if (gate) return;
      const i = svcs.findIndex((s) => s.id === id);
      if (i < 0) return;
      const p = svcPos[i];
      gate = { i, t: 0, ang: Math.atan2(p.y - L.cy, p.x - L.cx) };
      setOpenId(id);
    };

    const forget = () => {
      try { localStorage.removeItem(HF_KEY); } catch (e) {}
      profile.cats = {};
      profile.seed = (Math.random() * 1e9) | 0;
      attention = {};
      knownList = [];
      frags.forEach((f) => { f.known = false; f.w = 0; f.touch = 0; f.deg = 0; });
      edges.forEach((e) => { e.tgt = 0; });
      learned = false; memFlag = false;
      setHasMem(false);
    };

    // 「保存されている内容」用。in-memory の profile ではなく localStorage の
    // 実物を読む — 訪問者が DevTools で突き合わせても一致する。
    const snapshot = () => {
      let raw = null;
      try { raw = localStorage.getItem(HF_KEY); } catch (e) {}
      if (!raw) return { empty: true };
      try {
        const p = JSON.parse(raw);
        return {
          empty: false,
          visits: p.visits || 0,
          bytes: raw.length,
          rows: cats
            .map((c) => ({ c, v: (p.cats && p.cats[c.id]) || 0 }))
            .filter((r) => r.v >= 0.05),
        };
      } catch (e) { return { empty: true }; }
    };

    apiRef.current = { share, forget, snapshot, setFocus, setFocusCat };
    setHasMem(hadMemory);
    if (!hadMemory) setGuide(0);

    // ── pointer / keyboard ──────────────────────────────────────────────────
    const hero = host.closest(".hero") || host;
    const clampToRing = (x, y) => {
      const dx = x - L.cx, dy = y - L.cy;
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(L.R * 0.88, Math.max(L.R * 0.24, d));
      return [L.cx + (dx / d) * m, L.cy + (dy / d) * m];
    };
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const p = clampToRing(e.clientX - r.left, e.clientY - r.top);
      ag.tx = p[0]; ag.ty = p[1];
      ag.idle = 0; ag.auto = false;
    };
    const onKey = (e) => {
      const step = L.R * 0.16;
      let dx = 0, dy = 0;
      if (e.key === "ArrowLeft")  dx = -step;
      else if (e.key === "ArrowRight") dx = step;
      else if (e.key === "ArrowUp")    dy = -step;
      else if (e.key === "ArrowDown")  dy = step;
      else return;
      e.preventDefault();
      const p = clampToRing(ag.tx + dx, ag.ty + dy);
      ag.tx = p[0]; ag.ty = p[1];
      ag.idle = 0; ag.auto = false;
    };

    // ── draw ────────────────────────────────────────────────────────────────
    const brandEl = document.querySelector(".brand-mark");

    const draw = (t, dt) => {
      ctx.clearRect(0, 0, W, H);

      // スクロールで場は BrandMark（PDS → SLM コア）へ収束して消える
      const morph = window.__heroScrollMorph || 0;
      const k = Math.min(1, Math.max(0, morph / 1.4));
      if (k > 0.995) return;
      ctx.save();
      if (k > 0.001 && brandEl) {
        const br = brandEl.getBoundingClientRect();
        const hr = host.getBoundingClientRect();
        const bx = br.left + br.width / 2 - hr.left;
        const by = br.top + br.height / 2 - hr.top;
        const s = 1 - k * 0.94;
        ctx.translate(L.cx + (bx - L.cx) * k, L.cy + (by - L.cy) * k);
        ctx.scale(s, s);
        ctx.translate(-L.cx, -L.cy);
        ctx.globalAlpha = 1 - k;
      }

      const R = L.R;
      // ワルツ: 1 拍目が強く、2・3 拍目は弱い
      const bar  = t % (HF_BEAT * 3);
      const beat = Math.floor(bar / HF_BEAT);
      const inb  = (bar % HF_BEAT) / HF_BEAT;
      const pulse = Math.pow(1 - inb, 2.4) * (beat === 0 ? 1 : 0.38);

      // ── 境界リング（同意ゲートで開く） ──
      const gateOpen = gate ? Math.min(1, gate.t / 0.45) * Math.min(1, (2.9 - gate.t) / 0.45) : 0;
      const gap = Math.max(0, gateOpen) * 0.24;
      const fRing = focus === "ring";
      ctx.lineWidth = fRing ? 1.8 : 1;
      ctx.strokeStyle = light
        ? `rgba(10,10,10,${fRing ? 0.6 : 0.26})`
        : `rgba(255,255,255,${fRing ? 0.6 : 0.19})`;
      ctx.beginPath();
      if (gap > 0.002 && gate) {
        ctx.arc(L.cx, L.cy, R, gate.ang + gap, gate.ang - gap + HF_TAU);
      } else {
        ctx.arc(L.cx, L.cy, R, 0, HF_TAU);
      }
      ctx.stroke();

      // ゆっくり一周する明るい弧 — 境界が生きていることを示す
      const sweep = (t * 0.26) % HF_TAU;
      const grdS = ctx.createLinearGradient(L.cx - R, L.cy, L.cx + R, L.cy);
      grdS.addColorStop(0, hfCss(pal.a1, 0));
      grdS.addColorStop(0.5, hfCss(pal.a2, light ? 0.55 : 0.75));
      grdS.addColorStop(1, hfCss(pal.a3, 0));
      ctx.strokeStyle = grdS;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, R, sweep, sweep + 0.5);
      ctx.stroke();

      // ゲートの縁
      if (gap > 0.002 && gate) {
        ctx.strokeStyle = hfCss(pal.a1, 0.85 * gateOpen);
        ctx.lineWidth = 2;
        [gate.ang - gap, gate.ang + gap].forEach((a) => {
          ctx.beginPath();
          ctx.moveTo(L.cx + Math.cos(a) * (R - 7), L.cy + Math.sin(a) * (R - 7));
          ctx.lineTo(L.cx + Math.cos(a) * (R + 7), L.cy + Math.sin(a) * (R + 7));
          ctx.stroke();
        });
      }

      // ── 辺（Graph-Document） ──
      ctx.lineWidth = 1;
      edges.forEach((e, key) => {
        e.al += (e.tgt - e.al) * dt * 0.8;
        if (e.tgt === 0 && e.al < 0.012) { edges.delete(key); return; }
        const a = frags[e.a], b = frags[e.b];
        const c = hfMix(pal.cat[a.cat], pal.cat[b.cat], 0.5);
        const dimE = focusCat >= 0 && a.cat !== focusCat && b.cat !== focusCat ? 0.25 : 1;
        const boostE = focus === "edge" ? 2.0 : 1;
        ctx.lineWidth = focus === "edge" ? 1.5 : 1;
        ctx.strokeStyle = hfCss(c, Math.min(1, e.al * (light ? 0.62 : 0.46) * dimE * boostE));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // ── 断片 ──
      if (!light) ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < frags.length; i++) {
        const f = frags[i];
        f.glow = f.glow > 0.01 ? f.glow * (1 - dt * 0.9) : 0;
        const g = f.sz * (1 + f.w * 1.15 + f.glow * 0.9) * (1 + pulse * 0.16) * 7.5;
        const dimF = focusCat >= 0 && f.cat !== focusCat ? 0.16 : 1;
        ctx.globalAlpha = (k > 0.001 ? 1 - k : 1) * Math.min(1, (0.34 + f.w * 0.62 + f.glow * 0.5) * dimF);
        ctx.drawImage(sprites[f.cat], f.x - g / 2, f.y - g / 2, g, g);
      }
      ctx.globalAlpha = k > 0.001 ? 1 - k : 1;
      if (!light) ctx.globalCompositeOperation = "source-over";

      // ── 支援サービス（周縁） ──
      svcs.forEach((s, i) => {
        const p = svcPos[i];
        const on = gate && gate.i === i;
        // リング境界からノードへの導線
        const va = Math.atan2(p.y - L.cy, p.x - L.cx);
        const fS = focus === "svc";
        ctx.strokeStyle = light
          ? `rgba(10,10,10,${fS ? 0.4 : 0.12})`
          : `rgba(255,255,255,${fS ? 0.45 : 0.10})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(L.cx + Math.cos(va) * (R + 4), L.cy + Math.sin(va) * (R + 4));
        ctx.lineTo(p.x - Math.cos(va) * 17, p.y - Math.sin(va) * 17);
        ctx.stroke();
        ctx.strokeStyle = light
          ? `rgba(10,10,10,${on || fS ? 0.5 : 0.22})`
          : `rgba(255,255,255,${on || fS ? 0.55 : 0.22})`;
        ctx.lineWidth = fS ? 1.6 : 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, HF_TAU); ctx.stroke();
        ctx.fillStyle = light ? "rgba(10,10,10,0.05)" : "rgba(255,255,255,0.04)";
        ctx.fill();
        if (on) {
          const r2 = 15 + ((gate.t * 44) % 46);
          ctx.strokeStyle = hfCss(pal.a1, Math.max(0, 0.5 - (r2 - 15) / 92));
          ctx.beginPath(); ctx.arc(p.x, p.y, r2, 0, HF_TAU); ctx.stroke();
        }
      });

      // ── 同意フロー: 要約 1 粒だけが外へ、支援が返る ──
      if (gate) {
        const p = svcPos[gate.i];
        const gx = L.cx + Math.cos(gate.ang) * R;
        const gy = L.cy + Math.sin(gate.ang) * R;
        const seg = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
        const ease = (u) => u * u * (3 - 2 * u);
        let mote = null, col = pal.a1, cap = "";
        if (gate.t > 0.35 && gate.t <= 1.05) {
          mote = seg([L.cx, L.cy], [gx, gy], ease((gate.t - 0.35) / 0.70));
          cap = T.flowConsent;
        } else if (gate.t > 1.05 && gate.t <= 1.65) {
          mote = seg([gx, gy], [p.x, p.y], ease((gate.t - 1.05) / 0.60));
          cap = T.flowSummary;
        } else if (gate.t > 1.85 && gate.t <= 2.75) {
          col = pal.a3;
          mote = seg([p.x, p.y], [L.cx, L.cy], ease((gate.t - 1.85) / 0.90));
          cap = T.flowSupport;
        }
        if (mote) {
          if (!light) ctx.globalCompositeOperation = "lighter";
          const sp = hfSpriteCache(col);
          ctx.drawImage(sp, mote[0] - 13, mote[1] - 13, 26, 26);
          ctx.fillStyle = light ? hfCss(col, 0.95) : "#fff";
          ctx.beginPath(); ctx.arc(mote[0], mote[1], 2.4, 0, HF_TAU); ctx.fill();
          if (!light) ctx.globalCompositeOperation = "source-over";
          // 粒に何が起きているかを添える — 矢印にはラベルを
          if (cap) {
            ctx.font = "500 11px Inter, 'Noto Sans JP', sans-serif";
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillStyle = light ? "rgba(10,10,10,0.85)" : "rgba(236,238,246,0.92)";
            ctx.fillText(cap, mote[0] + 11, mote[1] - 11);
          }
        }
      }

      // ── あなた（核）と、理解の弧 ──
      const total = frags.length || 1;
      const ratio = knownList.length / total;
      if (ratio > 0.001) {
        ctx.lineWidth = 2;
        const gr = ctx.createLinearGradient(L.cx - R * 0.2, L.cy, L.cx + R * 0.2, L.cy);
        gr.addColorStop(0, hfCss(pal.a1, 0.85));
        gr.addColorStop(1, hfCss(pal.a3, 0.85));
        ctx.strokeStyle = gr;
        ctx.beginPath();
        ctx.arc(L.cx, L.cy, R * 0.155, -Math.PI / 2, -Math.PI / 2 + HF_TAU * ratio);
        ctx.stroke();
      }
      if (!light) ctx.globalCompositeOperation = "lighter";
      const halo = (focus === "core" ? 70 : 46) + pulse * 16;
      ctx.globalAlpha = (k > 0.001 ? 1 - k : 1) * (light ? 0.35 : 0.7);
      ctx.drawImage(whiteSprite, L.cx - halo / 2, L.cy - halo / 2, halo, halo);
      ctx.globalAlpha = k > 0.001 ? 1 - k : 1;
      if (!light) ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = light ? "#0A0A0A" : "#FFFFFF";
      ctx.beginPath(); ctx.arc(L.cx, L.cy, 3.4, 0, HF_TAU); ctx.fill();

      // ── 小さな AI ──
      const reach = R * 0.20;
      const fA = focus === "ai";
      ctx.strokeStyle = light
        ? `rgba(10,10,10,${fA ? 0.5 : 0.12})`
        : `rgba(255,255,255,${fA ? 0.5 : 0.09})`;
      ctx.lineWidth = fA ? 1.4 : 1;
      ctx.setLineDash([2, 5]);
      ctx.beginPath(); ctx.arc(ag.x, ag.y, reach, 0, HF_TAU); ctx.stroke();
      ctx.setLineDash([]);
      if (!light) ctx.globalCompositeOperation = "lighter";
      const ah = 30 + pulse * 8;
      ctx.globalAlpha = (k > 0.001 ? 1 - k : 1) * (light ? 0.4 : 0.85);
      ctx.drawImage(hfSpriteCache(pal.a1), ag.x - ah / 2, ag.y - ah / 2, ah, ah);
      ctx.globalAlpha = k > 0.001 ? 1 - k : 1;
      if (!light) ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = hfCss(pal.a1, 0.95);
      ctx.beginPath(); ctx.arc(ag.x, ag.y, 2.6, 0, HF_TAU); ctx.fill();
      // 本人 ↔ 小さな AI は常に繋がっている
      ctx.strokeStyle = hfCss(pal.a1, light ? 0.3 : 0.22);
      ctx.beginPath(); ctx.moveTo(L.cx, L.cy); ctx.lineTo(ag.x, ag.y); ctx.stroke();

      ctx.restore();

      // 案内マーカー（AI・辺）は動く相手に追従させる
      const am = aiMarkRef.current;
      if (am) am.style.transform = `translate(${Math.round(ag.x - 26)}px, ${Math.round(ag.y - 26)}px)`;
      const em = edgeMarkRef.current;
      if (em) {
        let best = null;
        edges.forEach((e) => { if (!best || e.al > best.al) best = e; });
        if (best) {
          const a = frags[best.a], b = frags[best.b];
          em.style.transform = `translate(${Math.round((a.x + b.x) / 2 - 9)}px, ${Math.round((a.y + b.y) / 2 - 9)}px)`;
        }
      }

      // AI ラベルを DOM 側で追従させる
      const al = aiRef.current;
      if (al) {
        al.style.transform = `translate(${Math.round(ag.x + 14)}px, ${Math.round(ag.y - 8)}px)`;
        al.style.opacity = String((1 - k) * 0.9);
      }
    };

    // 単色スプライトの小さなキャッシュ（要約粒・AI 用）
    function hfSpriteCache(rgb) {
      const key = rgb.join(",") + (light ? "L" : "D");
      let s = spriteCache.get(key);
      if (!s) { s = hfSprite(rgb, light); spriteCache.set(key, s); }
      return s;
    }

    // ── update ──────────────────────────────────────────────────────────────
    let lastKnown = -1, memFlag = hadMemory, learned = hadMemory;
    const update = (t, dt) => {
      // agent target: 操作がなければ自律的にゆっくり巡回する
      ag.idle += dt;
      if (ag.idle > 3) ag.auto = true;
      if (ag.auto) {
        // 核を周回する軌道。中心を横切らないので「あなた」の上には重ならない。
        const rr = L.R * (0.46 + 0.18 * Math.cos(t * 0.11));
        ag.tx = L.cx + Math.cos(t * 0.19) * rr;
        ag.ty = L.cy + Math.sin(t * 0.19 + 1.05) * rr * 0.82;
      }
      ag.x += (ag.tx - ag.x) * Math.min(1, dt * 3.4);
      ag.y += (ag.ty - ag.y) * Math.min(1, dt * 3.4);

      place(t);

      // 繋がった断片同士をゆるく引き寄せる。近づきすぎたら止める。
      const minSep = L.R * 0.10;
      edges.forEach((e) => {
        const a = frags[e.a], b = frags[e.b];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < minSep) return;
        const kk = Math.min(0.12, dt * 0.12 * e.al);
        const dr = b.rr - a.rr;
        a.rr += dr * kk; b.rr -= dr * kk;
        let dth = b.th - a.th;
        while (dth >  Math.PI) dth -= HF_TAU;
        while (dth < -Math.PI) dth += HF_TAU;
        a.th += dth * kk; b.th -= dth * kk;
      });

      const reach = L.R * 0.20;
      const r2 = reach * reach;
      for (let i = 0; i < frags.length; i++) {
        const f = frags[i];
        const dx = f.x - ag.x, dy = f.y - ag.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const near = 1 - Math.sqrt(d2) / reach;
          f.touch += dt * near * 2.2;
          if (!ag.auto) {
            const id = cats[f.cat].id;
            attention[id] = (attention[id] || 0) + dt * near;
            learned = true;
          }
          if (f.touch > 1 && !f.known) learn(i, false);
        }
        const target = f.known ? 1 : 0;
        f.w += (target - f.w) * Math.min(1, dt * 1.1);
      }

      if (knownList.length !== lastKnown) {
        lastKnown = knownList.length;
        if (meterRef.current) {
          meterRef.current.textContent = knownList.length + " / " + frags.length;
        }
      }
      profile.cats = attention;
      if (learned) {
        if (!memFlag) { memFlag = true; setHasMem(true); }
        saveAcc += dt;
        if (saveAcc > 2) { saveAcc = 0; save(); }
      }

      if (gate) {
        gate.t += dt;
        if (gate.t > 2.9) {
          // 支援が返る。そのサービスが扱う種類の断片が明るくなり、
          // まだ理解していないものは理解に近づく。
          const want = new Set((svcs[gate.i].cats || []).map((id) => cats.findIndex((c) => c.id === id)));
          for (let i = 0; i < frags.length; i++) {
            const f = frags[i];
            if (!want.has(f.cat)) continue;
            f.glow = 1;
            if (!f.known) f.touch += 0.45;
          }
          gate = null;
          setOpenId(null);
        }
      }
    };

    // ── loop ────────────────────────────────────────────────────────────────
    measure();
    buildField();
    ag.x = ag.tx = L.cx + L.R * 0.5;
    ag.y = ag.ty = L.cy;

    let raf = 0, t0 = 0, tPrev = 0, visible = true, running = false, teardown = null;
    const frame = (ts) => {
      if (!t0) { t0 = ts; tPrev = ts; }
      const t  = (ts - t0) / 1000;
      const dt = Math.min(0.05, (ts - tPrev) / 1000);
      tPrev = ts;
      update(t, dt);
      draw(t, dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced) return;
      running = true; tPrev = performance.now();
      if (!t0) t0 = tPrev;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    if (reduced) {
      // 動きを減らす設定：静止した 1 枚として成立するよう、少し育てた状態を描く
      for (let s = 0; s < 240; s++) update(s * 0.05, 0.05);
      ag.idle = 0;
      draw(6, 0.016);
    } else {
      hero.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("keydown", onKey);
      const io = new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        visible ? start() : stop();
      }, { threshold: 0.02 });
      io.observe(host);
      const onVis = () => (document.visibilityState === "visible" && visible ? start() : stop());
      document.addEventListener("visibilitychange", onVis);
      start();
      teardown = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        hero.removeEventListener("pointermove", onMove);
        host.removeEventListener("keydown", onKey);
      };
    }

    const ro = new ResizeObserver(() => {
      const before = frags.length;
      measure();
      if ((L.stacked ? 150 : 300) !== before) { buildField(); }
      if (reduced) draw(6, 0.016);
    });
    ro.observe(host);

    return () => {
      stop();
      ro.disconnect();
      if (typeof teardown === "function") teardown();
      if (window.__heroFieldRefreshPalette === readPalette) {
        delete window.__heroFieldRefreshPalette;
      }
    };
  }, []);

  React.useEffect(() => {
    if (!peek) return;
    const read = () => setSnap(apiRef.current.snapshot ? apiRef.current.snapshot() : null);
    read();
    const id = setInterval(read, 1000);
    return () => clearInterval(id);
  }, [peek]);

  // 案内のステップに応じて、図の該当部品を強調する
  React.useEffect(() => {
    const at = guide >= 0 && STEPS[guide] ? STEPS[guide].at : null;
    if (apiRef.current.setFocus) apiRef.current.setFocus(at);
    if (at === "store") setPeek(true);        // 最後の一歩は実物を見せて終わる
  }, [guide]);

  const px = (v) => Math.round(v) + "px";
  const step = guide >= 0 ? STEPS[guide] : null;
  const isAt = (at) => step && step.at === at;
  const mark = (at, style, ref) => (
    <span key={at} ref={ref}
          className={"hfield__mark" + (isAt(at) ? " is-on" : "")}
          style={style} aria-hidden="true"
          onClick={() => setGuide(STEPS.findIndex((x) => x.at === at))}>
      {STEPS.findIndex((x) => x.at === at) + 1}
    </span>
  );

  return (
    <div className="hfield" ref={hostRef} tabIndex={0} role="group"
         aria-label={T.aria || "研究の概念図"}>
      <canvas className="hfield__cvs" ref={cvsRef} aria-hidden="true" />

      <p className="hfield__sr">{T.sr}</p>

      <div className="hfield__ui">
        {lay && (
          <React.Fragment>
            <span className="hfield__tag hfield__tag--core"
                  style={{ left: px(lay.core.x), top: px(lay.core.y + 22) }}>
              {T.you}
            </span>
            <span className="hfield__tag hfield__tag--ring"
                  style={{ left: px(lay.ring.x), top: px(lay.ring.y) }}>
              {T.ring}
            </span>
            <span className="hfield__tag hfield__tag--ai" ref={aiRef}>{T.ai}</span>

            {F && F.services.map((s, i) => (
              <button key={s.id} type="button"
                      className="hfield__svc"
                      data-open={openId === s.id}
                      style={{ left: px(lay.svc[i].x), top: px(lay.svc[i].y + 26) }}
                      onClick={() => apiRef.current.share && apiRef.current.share(s.id)}>
                <span className="hfield__svc-name">{txt(s)}</span>
                <span className="hfield__svc-note">
                  {openId === s.id ? T.summary : (txt(s.does) || T.consent)}
                </span>
              </button>
            ))}

            {/* 凡例。触れるとその種類だけが浮かぶ */}
            <div className={"hfield__legend" + (isAt("legend") ? " is-on" : "")}
                 style={{ left: px(lay.legend.x), top: px(lay.legend.y) }}
                 onMouseLeave={() => apiRef.current.setFocusCat && apiRef.current.setFocusCat(-1)}>
              {guide >= 0 && mark("legend", null)}
              <span className="hfield__legend-k">{T.legend}</span>
              {F.categories.map((c, i) => (
                <button key={c.id} type="button" className="hfield__legend-i"
                        style={{ "--dot": `var(--hf-cat-${i})` }}
                        onMouseEnter={() => apiRef.current.setFocusCat && apiRef.current.setFocusCat(i)}
                        onFocus={() => apiRef.current.setFocusCat && apiRef.current.setFocusCat(i)}
                        onBlur={() => apiRef.current.setFocusCat && apiRef.current.setFocusCat(-1)}>
                  <i /> {txt(c)}
                </button>
              ))}
            </div>

            {/* 「仕組み」のマーカー。静止した部品は lay から、動く部品は毎フレーム */}
            {guide >= 0 && (
              <React.Fragment>
                {mark("core", { left: px(lay.core.x - 30), top: px(lay.core.y - 30) })}
                {mark("ring", { left: px(lay.ringPt.x - 9), top: px(lay.ringPt.y - 9) })}
                {mark("svc",  { left: px(lay.svc[1].x - 30), top: px(lay.svc[1].y - 30) })}
                {mark("ai",   { left: 0, top: 0 }, aiMarkRef)}
                {mark("edge", { left: 0, top: 0 }, edgeMarkRef)}
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        {/* 「仕組み」— 図の部品を順に指して一文ずつ */}
        {step && (
          <div className="hfield__guide" role="dialog" aria-label={T.guide}>
            <div className="hfield__guide-head">
              <span className="hfield__guide-n">{guide + 1} / {STEPS.length}</span>
              <span className="hfield__guide-k">{T.guide}</span>
            </div>
            <p className="hfield__guide-t">{step.t}</p>
            <div className="hfield__guide-row">
              <button type="button" className="hfield__pill" disabled={guide === 0}
                      onClick={() => setGuide(guide - 1)}>{T.prev}</button>
              {guide < STEPS.length - 1 ? (
                <button type="button" className="hfield__pill hfield__pill--go"
                        onClick={() => setGuide(guide + 1)}>{T.next}</button>
              ) : (
                <button type="button" className="hfield__pill hfield__pill--go"
                        onClick={() => setGuide(-1)}>{T.guideClose}</button>
              )}
              <button type="button" className="hfield__guide-x" aria-label={T.guideClose}
                      onClick={() => setGuide(-1)}>×</button>
            </div>
          </div>
        )}

        <div className={"hfield__mem" + (isAt("store") ? " is-on" : "")}>
          <div className="hfield__mem-row">
            {guide >= 0 && mark("store", null)}
            <button type="button" className="hfield__pill" aria-pressed={guide >= 0}
                    onClick={() => { const open = guide < 0; setGuide(open ? 0 : -1); if (open) setPeek(false); }}>
              {T.guide}
            </button>
            <span className="hfield__meter">
              <span className="hfield__meter-k">{T.learned}</span>
              <b ref={meterRef}>0 / 0</b>
            </span>
            <button type="button" className="hfield__pill" aria-expanded={peek}
                    onClick={() => { setPeek(!peek); if (!peek) setGuide(-1); }}>
              {peek ? T.peekClose : T.peek}
            </button>
            {hasMem && (
              <button type="button" className="hfield__pill hfield__pill--act"
                      onClick={() => apiRef.current.forget && apiRef.current.forget()}>
                {T.forget}
              </button>
            )}
          </div>

          <p className="hfield__local">{T.local}</p>

          {peek && snap && (
            <div className="hfield__store" role="status">
              <div className="hfield__store-key">{HF_KEY}</div>
              <p className="hfield__store-why">{T.storeWhy}</p>
              {snap.empty ? (
                <p className="hfield__store-note">{T.storeEmpty}</p>
              ) : (
                <React.Fragment>
                  <dl className="hfield__store-list">
                    {snap.rows.map((r) => (
                      <div key={r.c.id}>
                        <dt>{txt(r.c)}</dt>
                        <dd>{r.v.toFixed(1)}</dd>
                      </div>
                    ))}
                    <div>
                      <dt>{T.visits}</dt>
                      <dd>{snap.visits}</dd>
                    </div>
                  </dl>
                  <p className="hfield__store-note">{T.storeAll}</p>
                </React.Fragment>
              )}
              <p className="hfield__store-not">{T.storeNot}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.HeroField = HeroField;
