/* ─────────────────────────────────────────────────────────────────────────
   Lab data: i18n strings, research themes, publications, news, infographics.
   Pure data — no React. Attached to window so all scripts can read.
   Edit publications.json / news front matter and re-paste into this file,
   or migrate to JSON fetch later. See README for workflow.
   ───────────────────────────────────────────────────────────────────────── */

// ── i18n ────────────────────────────────────────────────────────────────────
window.LAB_I18N = {
  ja: {
    nav: {
      home: "Home",
      about: "About",
      research: "Research",
      map: "Map",
      gallery: "Gallery",
      publications: "Publications",
      access: "Access",
      news: "News",
      contact: "Contact",
    },
    hero: {
      eyebrow: "サービス情報学研究室 / Service Informatics Lab",
      title_a: "個人最適化が、",
      title_b: "明日のあたりまえになる。",
      sub:
        "パーソナルデータと小さな AI が、本人の手で扱える社会へ。\n玉川大学 工学部 ソフトウェアサイエンス学科・柴田研究室は、\n分散 PDS と Personal AI、Graph-Document、学習支援の研究を進めています。",
      cta1: "研究テーマを見る",
      cta2: "コンタクト",
      scroll: "Scroll",
    },
    sections: {
      about: { kicker: "01 — About", title: "主宰について" },
      research: { kicker: "02 — Research", title: "5つの研究テーマ" },
      map: {
        kicker: "03 — Research Map",
        title: "研究のつながりを、グラフで見る",
        hint: "ノードをドラッグ・クリックして探索",
      },
      gallery: {
        kicker: "04 — Gallery",
        title: "卒業研究インフォグラフィック",
        sub: "学生の卒業研究を NotebookLM で再構成した可視化アーカイブ",
      },
      pubs: {
        kicker: "05 — Publications",
        title: "業績",
        all: "すべて",
        year: "年で絞る",
        search: "検索（タイトル・著者）",
        empty: "該当する業績が見つかりませんでした。",
        types: { paper: "論文", proc: "国際会議", misc: "解説/予稿", award: "受賞" },
        peer: "査読有",
        first: "筆頭",
      },
      access: {
        kicker: "06 — Access",
        title: "ラボへのアクセス",
        addr: "〒194-8610 東京都町田市玉川学園 6-1-1",
        building: "玉川大学 STREAM Hall2019",
        nearest: "小田急線「玉川学園前」駅 徒歩約 15 分",
        visit: "訪問の前にコンタクトからご一報ください。",
      },
      news: { kicker: "07 — News", title: "更新情報" },
      contact: {
        kicker: "08 — Contact",
        title: "共同研究・取材・進学相談",
        body:
          "研究・教育・社会実装に関するご相談、共同研究やメディア取材からのご連絡を歓迎します。",
        cta: "お問い合わせ",
      },
    },
    foot: {
      src: "Source on GitHub",
      tama: "玉川大学 工学部 ソフトウェアサイエンス学科",
      crafted: "Crafted with care, 2026.",
    },
    aria: {
      langtoggle: "言語切替",
      lightbox: "拡大画像",
      prev: "前へ",
      next: "次へ",
      close: "閉じる",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      research: "Research",
      map: "Map",
      gallery: "Gallery",
      publications: "Publications",
      access: "Access",
      news: "News",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Service Informatics Lab / Tamagawa University",
      title_a: "Personalization,",
      title_b: "made human-scale.",
      sub:
        "Decentralized personal data and small, on-device AI returned to the person.\nShibata Lab at Tamagawa University researches PDS & Personal AI,\nGraph-Document for learning, and observational sensing in real-world contexts.",
      cta1: "See research",
      cta2: "Get in touch",
      scroll: "Scroll",
    },
    sections: {
      about: { kicker: "01 — About", title: "About the PI" },
      research: { kicker: "02 — Research", title: "Five research themes" },
      map: {
        kicker: "03 — Research Map",
        title: "An interactive map of what we study",
        hint: "Drag nodes · click to focus",
      },
      gallery: {
        kicker: "04 — Gallery",
        title: "Student research infographics",
        sub: "Visual recaps of undergraduate theses, re-structured with NotebookLM",
      },
      pubs: {
        kicker: "05 — Publications",
        title: "Publications",
        all: "All",
        year: "Year",
        search: "Search (title / author)",
        empty: "No publications match your filters.",
        types: { paper: "Journal", proc: "Conference", misc: "Article / preprint", award: "Award" },
        peer: "Peer-reviewed",
        first: "First author",
      },
      access: {
        kicker: "06 — Access",
        title: "Visiting the lab",
        addr: "6-1-1 Tamagawagakuen, Machida, Tokyo 194-8610, Japan",
        building: "School of Engineering, Dept. of Software Science, Tamagawa Univ.",
        nearest: "≈15 min walk from Tamagawagakuen-mae Sta. (Odakyu Line)",
        visit: "Please contact ahead before visiting.",
      },
      news: { kicker: "07 — News", title: "News" },
      contact: {
        kicker: "08 — Contact",
        title: "Collaborate, interview, or apply",
        body:
          "We welcome inquiries about joint research, interviews, and prospective students who want to join the lab.",
        cta: "Contact",
      },
    },
    foot: {
      src: "Source on GitHub",
      tama: "School of Engineering, Tamagawa University",
      crafted: "Crafted with care, 2026.",
    },
    aria: {
      langtoggle: "Toggle language",
      lightbox: "Enlarged image",
      prev: "Previous",
      next: "Next",
      close: "Close",
    },
  },
};

// ── Bio / about content (bilingual) ─────────────────────────────────────────
window.LAB_BIO = {
  name: { ja: "柴田 健一", en: "Kenichi Shibata" },
  nameSub: { ja: "シバタ ケンイチ", en: "Shibata Kenichi, Ph.D." },
  title: {
    ja: "玉川大学 工学部 ソフトウェアサイエンス学科 講師",
    en: "Lecturer, Dept. of Software Science, Tamagawa University",
  },
  affil: [
    {
      ja: "玉川大学 学術研究所 K-16一貫教育研究センター（兼任）",
      en: "Tamagawa Academic Research Institute, K-16 Education Research Center (concurrent)",
    },
    {
      ja: "理化学研究所 革新知能統合研究センター (AIP) 客員研究員",
      en: "Visiting Researcher, RIKEN Center for AIP",
    },
  ],
  degree: {
    ja: "博士（情報学）静岡大学大学院 2017",
    en: "Ph.D. in Informatics, Shizuoka University Graduate School, 2017",
  },
  bio: {
    ja:
      "「本人主権のパーソナルデータ」と「個人最適化型支援サービス」をテーマに、教育・介護・地域コミュニティの現場で研究と実証を重ねてきました。近年は小規模言語モデル（SLM）とパーソナル AI、グラフ文書による思考の可視化と RAG 設計、LiDAR を用いた在宅環境センシングに取り組んでいます。",
    en:
      "I work on user-sovereign personal data and individually-optimized support services, with field trials across education, eldercare and community design. Recent threads: small language models as Personal AI, graph-document authoring for thinking & RAG, and LiDAR-based in-home sensing for clinical use.",
  },
  links: [
    { label: "researchmap", href: "https://researchmap.jp/brightwaltz" },
    { label: "Portfolio", href: "https://brightwaltz.github.io/portfolio/" },
    { label: "大学公式 / Faculty page", href: "https://www.tamagawa.ac.jp/college_of_engineering/teachers/software/shibata.html" },
    { label: "Strikingly", href: "https://brightwaltz.mystrikingly.com/" },
  ],
  // 第二の顔：音楽家 brightwaltz として活動 — ポートフォリオより
  altLife: {
    ja:
      "ピアニスト・作曲家「brightwaltz」としても活動。落合陽一氏の映像作品や大阪・関西万博テーマ事業、環境省・新潟県の公式映像、ゲーム作品などに楽曲提供。",
    en:
      "Active in parallel as pianist/composer “brightwaltz” — credits include works by Yoichi Ochiai, the Osaka-Kansai Expo theme project, official films by Japan's Ministry of the Environment and Niigata Prefecture, and several published games.",
  },
};

// ── Research themes ─────────────────────────────────────────────────────────
window.LAB_THEMES = [
  {
    id: "pai",
    no: "T1",
    icon: "brain-circuit",
    ja: {
      title: "Personal Data & Personal AI",
      sub: "分散 PDS と SLM が、本人に専属する。",
      body: "分散型パーソナルデータストア（PDS）に基づく個人最適化型支援サービス。本人同意とガバナンス、小規模言語モデルを核としたパーソナル AI（PAI）の社会実装設計。"
    },
    en: {
      title: "Personal Data & Personal AI",
      sub: "Decentralized PDS + small LMs, owned by the user.",
      body: "Individually-optimized services on top of distributed Personal Data Stores. Consent, governance and small language models combined into Personal AI agents fielded in real contexts."
    },
    kw: ["PDS", "PAI", "Consent", "Privacy-by-Design", "SLM"],
  },
  {
    id: "graphdoc",
    no: "T2",
    icon: "graph",
    ja: {
      title: "Graph-Document",
      sub: "考えを構造化し、再利用可能にする。",
      body: "グラフ文書の協働編集による思考の可視化と再利用。学習・研修・社内ナレッジでの構造化、RAG 入出力の品質設計を扱う。"
    },
    en: {
      title: "Graph-Document",
      sub: "Structured thinking that survives copy-paste.",
      body: "Collaborative graph-document authoring as a substrate for visible reasoning and reuse — applied to education, training, and the I/O quality of retrieval-augmented generation."
    },
    kw: ["Graph", "Collaboration", "Critical Thinking", "RAG"],
  },
  {
    id: "learn",
    no: "T3",
    icon: "compass",
    ja: {
      title: "Learning Support",
      sub: "「いつ・何を」を、本人と設計する。",
      body: "大学教育・社会人学び直しのための学習支援。生成 AI を組み込んだ授業デザイン、LLM × 個人特性 × カレンダーの統合による学習計画支援。"
    },
    en: {
      title: "Learning Support",
      sub: "Designing the “when” and “what” with the learner.",
      body: "Learning support for higher and recurrent education. Class design with generative AI in the loop; LLM × personal traits × external calendar for individualized planning."
    },
    kw: ["Higher Ed", "Recurrent", "LLM-in-the-loop", "Evaluation"],
  },
  {
    id: "sense",
    no: "T4",
    icon: "waveform",
    ja: {
      title: "Multimodal Sensing",
      sub: "現場に馴染む、軽い計測。",
      body: "音・映像・行動データなど多視点観察から状態理解と評価を行う。LiDAR による在宅環境の 3 次元化、エンゲージメント評価、認知症ケアでの多職種連携支援。"
    },
    en: {
      title: "Multimodal Sensing",
      sub: "Light-weight observation that fits the field.",
      body: "Multi-perspective observation across audio, video and behavior. LiDAR-based 3-D in-home modeling, engagement evaluation, and multidisciplinary support for dementia care."
    },
    kw: ["LiDAR", "Engagement", "Aging Society", "Dementia"],
  },
  {
    id: "service",
    no: "T5",
    icon: "compass-rose",
    ja: {
      title: "Service Informatics & HCI",
      sub: "技術と現場をつなぐ、サービス設計。",
      body: "Web & サービス情報学、ヒューマンインタフェース。鍼灸院での症例 DB、ゲームセンター向け対話 AI、企業マッチング RAG など、現場ドメインへの実装。"
    },
    en: {
      title: "Service Informatics & HCI",
      sub: "Service design that connects tech to the field.",
      body: "Web & service informatics with HCI. Field implementations include a case-record DB for acupuncture clinics, conversational AI for arcades, and RAG-based matching for enterprises."
    },
    kw: ["Service", "HCI", "RAG", "Field Implementation"],
  },
];

// ── Research-map graph (node-link, for D3 force) ────────────────────────────
window.LAB_GRAPH = {
  nodes: [
    // theme nodes
    { id: "pai", group: "theme", label: "Personal AI" },
    { id: "graphdoc", group: "theme", label: "Graph-Document" },
    { id: "learn", group: "theme", label: "Learning Support" },
    { id: "sense", group: "theme", label: "Multimodal Sensing" },
    { id: "service", group: "theme", label: "Service Informatics" },
    // keyword nodes
    { id: "kw-pds", group: "keyword", label: "PDS" },
    { id: "kw-slm", group: "keyword", label: "SLM" },
    { id: "kw-consent", group: "keyword", label: "Consent" },
    { id: "kw-rag", group: "keyword", label: "RAG" },
    { id: "kw-llm", group: "keyword", label: "LLM" },
    { id: "kw-lidar", group: "keyword", label: "LiDAR" },
    { id: "kw-dementia", group: "keyword", label: "Dementia" },
    { id: "kw-eng", group: "keyword", label: "Engagement" },
    { id: "kw-recur", group: "keyword", label: "Recurrent Edu." },
    { id: "kw-collab", group: "keyword", label: "Collaboration" },
    // project / paper nodes
    { id: "p-slmpai", group: "paper", label: "SLM × PAI '25" },
    { id: "p-graph24", group: "paper", label: "Graph-Doc '24" },
    { id: "p-class24", group: "paper", label: "Gen-AI Class '24" },
    { id: "p-elder", group: "paper", label: "Elder SNS '25" },
    { id: "p-care", group: "paper", label: "Dementia obs. '17" },
    { id: "p-heroic", group: "project", label: "HEROIC Engagement" },
    { id: "p-coral", group: "project", label: "Coral × AI" },
    { id: "p-hari", group: "project", label: "Acupuncture DB" },
    { id: "p-lidar", group: "project", label: "KAKEN: LiDAR Home" },
    { id: "p-recur", group: "project", label: "KAKEN: Graph-Doc" },
  ],
  links: [
    // PAI
    ["pai", "kw-pds"], ["pai", "kw-slm"], ["pai", "kw-consent"],
    ["pai", "p-slmpai"], ["pai", "p-elder"],
    // Graph-Document
    ["graphdoc", "kw-rag"], ["graphdoc", "kw-collab"],
    ["graphdoc", "p-graph24"], ["graphdoc", "p-recur"],
    // Learning Support
    ["learn", "kw-llm"], ["learn", "kw-recur"],
    ["learn", "p-class24"], ["learn", "p-recur"],
    // Multimodal Sensing
    ["sense", "kw-lidar"], ["sense", "kw-dementia"], ["sense", "kw-eng"],
    ["sense", "p-care"], ["sense", "p-heroic"], ["sense", "p-lidar"],
    // Service
    ["service", "p-coral"], ["service", "p-hari"], ["service", "p-heroic"],
    ["service", "kw-rag"],
    // Cross links
    ["pai", "graphdoc"], ["graphdoc", "learn"], ["learn", "sense"],
    ["sense", "service"], ["service", "pai"],
  ].map(([s, t]) => ({ source: s, target: t })),
};

// ── Publications (selected; sourced from researchmap) ───────────────────────
// NOTE: 現バージョンでは researchmap への CTA カードに統一しているため、
// このリストはサイト内ではレンダリングしていません。将来一覧表示に戻すなら、
// sections.jsx の Publications() を旧版に差し戻してください。
window.LAB_PUBLICATIONS = [
  {
    year: 2025, type: "proc", peer: true, first: true,
    title: "Health Literacy, Privacy Concerns, and Digital-Recommendation Engagement in Forming Local Hobby Circles among Japanese Older Adults",
    authors: "Kenichi Shibata, Ikuko Tsumura, Koiti Hasida",
    venue: "BSA Medical Sociology Conference 2025",
    tags: ["pai", "sense"],
    link: "https://researchmap.jp/brightwaltz/published_papers/51799937",
  },
  {
    year: 2025, type: "proc", peer: true,
    title: "An Attempt at Self-Analysis and Structuring Leading to Remission in Bipolar II Disorder",
    authors: "Mana Yonekura, Kenichi Shibata, Yuto Matsuura",
    venue: "27th Annual Conference of the International Society for Bipolar Disorders",
    tags: ["graphdoc"],
    link: "https://researchmap.jp/brightwaltz/published_papers/51799941",
  },
  {
    year: 2025, type: "proc", peer: true,
    title: "Charting the future: An experimental investigation of a chart tool's potential to support science fiction prototyping workshops",
    authors: "Tomoya Minegishi, Miwa Nishinaka, Kenichi Shibata, Kenji Nakamura, Dohjin Miyamoto, Atsuya Fujimoto, Hirotaka Osawa",
    venue: "Social Sciences & Humanities Open, 12, 102258",
    tags: ["graphdoc", "service"],
    link: "https://researchmap.jp/brightwaltz/published_papers/51799949",
  },
  {
    year: 2025, type: "paper", first: true,
    title: "小規模言語モデルによるパーソナル AI の展望",
    authors: "柴田 健一, 松原 勇介, 橋田 浩一",
    venue: "人工知能 40(3) 337–344",
    tags: ["pai"],
    link: "https://researchmap.jp/brightwaltz/published_papers/50111753",
  },
  {
    year: 2024, type: "paper", peer: true,
    title: "作業療法的思考に基づく認知症支援者教育プログラムの構築に向けた学習者のつまづき評価システムの検証",
    authors: "川﨑 一平, 丸山 大智, 石川 翔吾, 柴田 健一, 寺村 晃, 桐山 伸也",
    venue: "ヒューマンインタフェース学会論文誌 26(4) 379–390",
    tags: ["learn", "sense"],
    link: "https://researchmap.jp/brightwaltz/published_papers/48651669",
  },
  {
    year: 2024, type: "proc", peer: true,
    title: "Collaborative Graph-Document Composition is Efficient and Enhances Critical-Thinking Skills Without Extra Cost",
    authors: "Kôiti Hasida, Zilian Zhang, Zifan Yao, V. V. Karilas, Shitao Fang, Kuanghuan Tan, Kenichi Shibata, Yusuke Matsubara",
    venue: "Lecture Notes in Computer Science 462–466",
    tags: ["graphdoc", "learn"],
    link: "https://researchmap.jp/brightwaltz/published_papers/48651684",
  },
  {
    year: 2024, type: "proc", peer: true,
    title: "A Study on Empowering Elderly Communities with Social Networking Services for Secure Aging in Place",
    authors: "Ikuko Tsumura, Kenichi Shibata, Atsushi Takahashi, Koiti Hasida",
    venue: "BERA Conference & WERA Focal Meeting 2024",
    tags: ["pai", "service"],
    link: "https://researchmap.jp/brightwaltz/published_papers/48651701",
  },
  {
    year: 2024, type: "proc", peer: true, first: true,
    title: "A Study on Online Local Community Design to Improve Health Literacy of the Elderly — Minami Alps City",
    authors: "Kenichi Shibata, Ikuko Tsumura, Koiti Hasida",
    venue: "BSA Annual Conference 2024",
    tags: ["pai", "sense"],
    link: "https://researchmap.jp/brightwaltz/published_papers/48651695",
  },
  {
    year: 2024, type: "paper", peer: true, first: true,
    title: "文章生成 AI を活用した授業デザインの提案と実践",
    authors: "柴田 健一",
    venue: "玉川大学工学部紀要 (59) 19–25",
    tags: ["learn"],
    link: "https://researchmap.jp/brightwaltz/published_papers/46953479",
  },
  {
    year: 2023, type: "proc", peer: true, first: true,
    title: "Information Sharing Environment with Self-Management of Personal Data by Decentralized PDS for Supporting the Elderly",
    authors: "Kenichi Shibata, Ikuko Tsumura, Koiti Hasida",
    venue: "BSA Annual Conference 2023",
    tags: ["pai", "service"],
    link: "https://researchmap.jp/brightwaltz/published_papers/46851065",
  },
  {
    year: 2023, type: "proc", peer: true, first: true,
    title: "Collaborative Learning Support Environment Utilizing Graph Documents",
    authors: "Kenichi Shibata, Shuichi Aono",
    venue: "RISP International Workshop on Nonlinear Circuits, Communications and Signal Processing (NCSP)",
    tags: ["graphdoc", "learn"],
    link: "https://researchmap.jp/brightwaltz/published_papers/46851055",
  },
  {
    year: 2017, type: "paper", peer: true,
    title: "介護関係者の多視点観察情報に基づく認知症評価システム",
    authors: "柴田 健一, 石川 翔吾, 玉井 顯, 竹林 洋一",
    venue: "ヒューマンインタフェース学会論文誌 19(1) 41–50",
    tags: ["sense"],
    link: "https://researchmap.jp/brightwaltz/published_papers/18860911",
  },
  {
    year: 2016, type: "proc", peer: true,
    title: "Interprofessional Collaborative System to Raise Awareness and Understanding of Dementia using an Action Observation Method",
    authors: "Kenichi Shibata, Naoki Kamiya, Shogo Ishikawa, Hideki Ueno, Akira Tamai, Yoichi Takebayashi",
    venue: "AAAI Spring Symposia 2016",
    tags: ["sense"],
    link: "https://researchmap.jp/brightwaltz/published_papers/46850954",
  },
  {
    year: 2015, type: "award",
    title: "学生奨励賞:「認知症ケアにおける AOS を活用した介護スタッフと家族のための情報共有」",
    authors: "柴田 健一",
    venue: "人工知能学会",
    tags: ["sense"],
    link: "https://researchmap.jp/brightwaltz/awards/1784266",
  },
  {
    year: 2013, type: "award",
    title: "創造科学技術大学院長賞",
    authors: "柴田 健一",
    venue: "静岡大学創造科学技術大学院",
    tags: [],
    link: "https://researchmap.jp/brightwaltz/awards/1718550",
  },
];

// ── KAKENHI / funded projects ───────────────────────────────────────────────
// window.LAB_PROJECTS = [
//   {
//     ja: { title: "リカレント教育のためのグラフ文書を用いたデータ駆動型の学習環境構築",
//           role: "代表" },
//     en: { title: "Data-driven recurrent-education environment with graph documents",
//           role: "PI" },
//     fund: "JSPS KAKENHI · 若手研究 / Grant-in-Aid for Early-Career Scientists",
//     term: "2023.04 — 2026.03",
//   },
//   {
//     ja: { title: "LiDAR によって 3 次元化した在宅環境情報の臨床利用に関する研究",
//           role: "共同研究者" },
//     en: { title: "Clinical use of 3-D in-home environment data captured by LiDAR",
//           role: "Co-I" },
//     fund: "JSPS KAKENHI · 基盤研究 (C) / Grant-in-Aid (C)",
//     term: "2024.04 — 2027.03",
//   },
// ];

// ── Infographics gallery ────────────────────────────────────────────────────
// Each item belongs to a 年度 (FY).  Items are grouped by year in the UI;
// add a new image by dropping a file into assets/images/infographics/ and
// appending a row here with the matching year.
window.LAB_INFOGRAPHICS = [
  {
    src: "assets/images/infographics/01-llm-learning-planner.png",
    titleJa: "LLM で「いつ、何を」を自動解決",
    titleEn: "LLM-driven adaptive study planner",
    sumJa: "個人特性 × Google カレンダーを ChatGPT Atlas と統合し、学習計画達成率を有意に向上 (p<0.05)。",
    sumEn: "Integrates personal traits × Google Calendar with ChatGPT Atlas; significantly raises plan-completion rate (p<0.05).",
    year: 2025,
  },
  {
    src: "assets/images/infographics/02-study-planner-overview.png",
    titleJa: "個別最適化学習計画支援システムの全体像",
    titleEn: "Adaptive study planner — system overview",
    sumJa: "学習者の個別特性に応じて計画を立案・伴走する AI 支援システムの構成と狙い。",
    sumEn: "End-to-end overview of an AI study-planner that adapts to each learner's traits and habits.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/03-vr-ai-housing-eval.png",
    titleJa: "VR × AI による住環境評価",
    titleEn: "VR × AI housing-environment assessment",
    sumJa: "VR 空間内のセンシングと AI 解析で、住環境の快適性・安全性を定量評価する取り組み。",
    sumEn: "Quantitative comfort and safety assessment of living spaces via VR sensing and AI analysis.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/04-vr-ai-housing-eval-detail.png",
    titleJa: "VR × AI 住環境評価 — 処理フロー詳細",
    titleEn: "VR × AI housing assessment — detailed pipeline",
    sumJa: "ユーザー入力から評価結果出力までの処理パイプラインを段階別に整理。",
    sumEn: "Step-by-step processing pipeline from user input to evaluation output.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/05-vr-ai-housing-proposal.png",
    titleJa: "VR × AI 住環境 — 改善提案までの拡張",
    titleEn: "VR × AI housing — from evaluation to suggestions",
    sumJa: "評価で終わらず、AI による住環境改善案の自動提案までを射程に入れた拡張版。",
    sumEn: "Extends beyond evaluation: AI auto-suggests concrete improvements to the living space.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/06-chatbot-tone-experiment.png",
    titleJa: "チャットボットの口調比較 — 検証実験",
    titleEn: "Chatbot tone — comparative experiment",
    sumJa: "口調の違いがユーザー体験・印象に与える影響を実験的に検証。",
    sumEn: "Experimentally tests how different chatbot tones shape user experience and perception.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/07-chatbot-tone-analysis.png",
    titleJa: "チャットボット口調 — 比較分析",
    titleEn: "Chatbot tone — analytical study",
    sumJa: "実験結果から、目的・相手別に最適な口調パターンを統計的に分析。",
    sumEn: "Statistical analysis surfacing tone patterns optimal for each purpose and user.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/08-parenting-ai-architecture.png",
    titleJa: "次世代 AI 子育て支援システム — 仕組み",
    titleEn: "Next-gen AI parenting support — architecture",
    sumJa: "家庭内データと専門知見を統合した子育てパートナー AI のアーキテクチャ。",
    sumEn: "Architecture of a parenting-partner AI that integrates household data with expert knowledge.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/09-parenting-ai-system.png",
    titleJa: "次世代 AI 育児支援システム",
    titleEn: "Next-gen AI childcare support",
    sumJa: "発達段階に応じたアドバイス・記録・気づきの可視化を一元化。",
    sumEn: "Unifies developmental-stage advice, daily logs, and insight visualization.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/10-personal-data-parenting-ai.png",
    titleJa: "パーソナルデータを活用した子育て AI",
    titleEn: "Parenting AI powered by personal data",
    sumJa: "本人主権のパーソナルデータをもとに、家庭ごとに最適化された助言を生成。",
    sumEn: "Generates family-specific guidance grounded in user-sovereign personal data.",
    year: 2025,
  },
  // <!-- TODO: タイトル・要約は仮置きです。各卒業研究の正式タイトルと
  //     主要な貢献に合わせて主宰側でレビュー・修正してください。 -->
];

// ── News (front-matter normalized) ──────────────────────────────────────────
// Add a new entry by copying the shape; the most recent goes first.
window.LAB_NEWS = [
  {
    slug: "2026-05-27-launch",
    date: "2026-05-27",
    tags: ["site", "lab"],
    titleJa: "研究室公式サイトを公開しました",
    titleEn: "The lab website is now live.",
    bodyJa:
      "サービス情報学研究室の公式サイトを公開しました。研究テーマ、最新の業績、卒業研究のインフォグラフィック、訪問アクセス情報を一望できるように再設計しています。サイトのソースは GitHub で公開しており、今後 Claude と GitHub を経由して継続的に更新していきます。",
    bodyEn:
      "We launched the official site of the Service Informatics Lab. It centralizes our research themes, latest publications, student infographics, and access information. The site is open-source on GitHub and will be updated continuously via Claude + GitHub.",
  },
];

// ── Palettes (used by Tweaks) ───────────────────────────────────────────────
// Each palette stores: [primary, deep, accent1, accent2, accent3]
window.LAB_PALETTES = [
  { id: "tama-night", label: "Tamagawa Night", colors: ["#0B2C5C", "#061838", "#22D3EE", "#3B82F6", "#8B5CF6"] },
  { id: "linear-cool", label: "Linear Cool", colors: ["#0E1230", "#06081C", "#5EEAD4", "#7C3AED", "#A78BFA"] },
  { id: "vercel-mono", label: "Vercel Mono", colors: ["#0A0A0A", "#000000", "#FAFAFA", "#888888", "#444444"] },
  { id: "ember", label: "Ember Glow", colors: ["#221026", "#0D0612", "#FB7185", "#F59E0B", "#A855F7"] },
];
