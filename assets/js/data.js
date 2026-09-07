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
      title_a: "あなたを理解し、",
      title_b: "暮らしに溶け込むAIを、研究する。",
      sub: "パーソナルデータと小さな AI が、\n本人の手で扱える社会へ。",
      cta1: "研究テーマを見る",
      cta2: "コンタクト",
      scroll: "Scroll",
      // ヒーロー図解 (hero-field.jsx) のラベル。説明文ではなく、図の部品名。
      field: {
        you: "あなた",
        ai: "小さな AI",
        ring: "あなたが決める境界",
        consent: "同意して渡す",
        summary: "要約だけが出る",
        learned: "理解した断片",
        forget: "忘れる",
        peek: "保存されている内容",
        peekClose: "閉じる",
        storeEmpty: "まだ何も保存していません。",
        storeAll: "これが、このブラウザに保存されている全てです。",
        visits: "訪問回数",
        local: "サーバには何も送っていません。学習はこのブラウザの中だけです。",
        // 保存パネルの説明。「何が・なぜ・何に使うか」「保存しないもの」
        storeWhy:
          "小さな AI が、あなたのカーソルの近くにあった断片の種類を数えたものです。" +
          "数字は、その種類の近くにいた時間の目安（秒）。" +
          "次に来たとき、どの種類の断片から理解を始めるかがこれで決まります。",
        storeNot: "保存しないもの：カーソルの位置、見たページ、日時、あなたを特定する情報。",
        legend: "粒の色 = 暮らしのデータの種類",
        about: "この図について",
        tabHow: "仕組み",
        tabStore: "保存されているもの",
        tabResearch: "研究との関係",
        guideClose: "閉じる",
        next: "次へ",
        prev: "前へ",
        // 図の各部分が、研究室のどのテーマに対応するか
        research: [
          { k: "Personal Data & Personal AI",
            t: "中心の「あなた」と、そばを離れない小さな AI。分散パーソナルデータストア（PDS）に本人のデータを置き、小規模言語モデル（SLM）を本人専属の AI として動かす設計を研究しています。" },
          { k: "同意とガバナンス",
            t: "境界に開く同意ゲート。誰に・何を・どこまで渡すかを本人が決められる仕組みを、実際の現場で設計し検証しています。" },
          { k: "Graph-Document",
            t: "理解した断片の間に残る線。考えを構造化して再利用できる形にし、学習支援や RAG の入出力品質につなげる研究です。" },
          { k: "現場での実証",
            t: "教育・介護・地域は、研究室が実際に関わっている領域です。大学教育と学び直し、認知症ケアと在宅環境の計測、地域コミュニティのサービス設計。" },
        ],
        researchNote: "この図は、研究の主張を最小の形で動かしてみたものです。",
        researchCta: "研究プロジェクトを見る",
        // 同意フローの途中で粒に添える語
        flowConsent: "同意",
        flowSummary: "要約だけ",
        flowSupport: "支援",
        // 「仕組み」の案内。図の部品を順に指す
        steps: [
          { at: "core",   t: "中心はあなた。周りに漂う粒は、暮らしの中で生まれるデータの断片です。" },
          { at: "legend", t: "粒の色は断片の種類。学び・暮らし・からだ・会話・予定の 5 つ。凡例に触れると、その種類だけが浮かびます。" },
          { at: "ai",     t: "小さな AI はカーソルを追い、近くの断片に触れて、それが何かを理解していきます。" },
          { at: "edge",   t: "理解した断片どうしは線でつながり、以後いっしょに動きます。これが消えずに残る知識です。" },
          { at: "ring",   t: "この線があなたの決める境界。内側のデータは、あなたの許可なしには出ていきません。" },
          { at: "svc",    t: "教育・介護・地域は外の支援サービス。押すと境界に同意のゲートが開き、要約だけを渡して支援が返ります。" },
          { at: "store",  t: "学習の結果はこのブラウザにだけ保存。「保存されている内容」で中身を確認でき、「忘れる」で消せます。" },
        ],
        aria: "パーソナルデータと小さな AI の関係を示すインタラクティブ図解",
        sr:
          "中心にあなた本人、その周囲を囲む「あなたが決める境界」の内側に暮らしのデータ断片が漂います。" +
          "小さな AI がポインタを追って断片に触れ、触れた断片の間にグラフ構造が残ります。" +
          "教育・介護・地域のサービスを選ぶと境界に同意のゲートが開き、要約が一粒だけ外へ出て支援が返ります。" +
          "学習内容はサーバへは送られず、このブラウザの中にだけ保存されます。" +
          "「保存されている内容」で実際に保存されているものを表示でき、「忘れる」で消去できます。" +
          "矢印キーで小さな AI を動かせます。",
      },
    },
    sections: {
      about: { kicker: "01 — About", title: "主宰について" },
      manifesto: {
        kicker: "PRINCIPLES",
        items: [
          {
            no: "01",
            title: "本人主権の、データへ。",
            body: "誰のものでもなかったパーソナルデータを、本人の手に戻す。分散 PDS と同意設計を、研究の前提条件にする。",
          },
          {
            no: "02",
            title: "個人最適化を、現場で。",
            body: "実験室の中ではなく、教育・介護・地域コミュニティ。実際に人が暮らす場所で、Personal AI を機能させる。",
          },
          {
            no: "03",
            title: "見える思考、再利用できる知。",
            body: "Graph-Document による思考の構造化と協働編集。学んだことが消えずに残り、次の学びの足場になる環境を。",
          },
        ],
      },
      research: { kicker: "02 — Research", title: "研究プロジェクト" },
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
      title_a: "We research AI that understands you",
      title_b: "and blends into everyday life.",
      sub: "Personal data and small AI, returned to the hands of the person.",
      cta1: "See research",
      cta2: "Get in touch",
      scroll: "Scroll",
      field: {
        you: "You",
        ai: "Small AI",
        ring: "the boundary you set",
        consent: "share with consent",
        summary: "summary only",
        learned: "understood",
        forget: "Forget",
        peek: "What is stored",
        peekClose: "Close",
        storeEmpty: "Nothing is stored yet.",
        storeAll: "That is everything stored in this browser.",
        visits: "Visits",
        local: "Nothing is sent to a server. This learning lives in your browser.",
        storeWhy:
          "The small AI counted which kinds of fragments were near your pointer. " +
          "Each number is roughly how long you stayed near that kind (seconds). " +
          "On your next visit it decides which kind the AI starts understanding first.",
        storeNot: "Not stored: pointer positions, pages viewed, dates, or anything that identifies you.",
        legend: "dot colour = kind of everyday data",
        about: "About this diagram",
        tabHow: "How it works",
        tabStore: "What is stored",
        tabResearch: "The research",
        guideClose: "Close",
        next: "Next",
        prev: "Back",
        research: [
          { k: "Personal Data & Personal AI",
            t: "You at the centre, with a small AI that never leaves your side. We study distributed Personal Data Stores holding your own data, with small language models running as an AI that belongs to you." },
          { k: "Consent and governance",
            t: "The gate that opens in the boundary. We design and test, in real settings, arrangements where the person decides who receives what, and how much." },
          { k: "Graph-Document",
            t: "The lines that stay between understood fragments. Structuring thought so it can be reused — for learning support, and for the input and output quality of RAG." },
          { k: "Fieldwork",
            t: "Education, care and community are the settings the lab actually works in: higher and recurrent education, dementia care and in-home sensing, and service design for local communities." },
        ],
        researchNote: "This diagram is the smallest working form of what the lab argues.",
        researchCta: "See the research",
        flowConsent: "consent",
        flowSummary: "summary only",
        flowSupport: "support",
        steps: [
          { at: "core",   t: "You are at the centre. The drifting dots are fragments of data from everyday life." },
          { at: "legend", t: "Colour is the kind of fragment: learning, daily life, body, conversation, plans. Hover the legend to lift one kind." },
          { at: "ai",     t: "The small AI follows your pointer, touches nearby fragments, and works out what they are." },
          { at: "edge",   t: "Fragments it understands link up and move together from then on — knowledge that stays." },
          { at: "ring",   t: "This line is the boundary you set. Nothing inside leaves without your permission." },
          { at: "svc",    t: "Education, care and community are outside services. Press one: a consent gate opens, only a summary goes out, and support comes back." },
          { at: "store",  t: "What it learned is kept in this browser only. ‘What is stored’ shows it; Forget erases it." },
        ],
        aria: "Interactive diagram of personal data and a small AI",
        sr:
          "You sit at the centre; fragments of everyday data drift inside the boundary you set. " +
          "A small AI follows the pointer, touches fragments, and the structure it finds stays as a graph. " +
          "Choosing education, care or community opens a consent gate in the boundary: a single summary leaves, " +
          "and support returns. Nothing is sent to a server — what it learns is stored in this browser alone. " +
          "\u2018What is stored\u2019 shows exactly what is held, and Forget erases it. " +
          "Arrow keys move the small AI.",
      },
    },
    sections: {
      about: { kicker: "01 — About", title: "About the PI" },
      manifesto: {
        kicker: "PRINCIPLES",
        items: [
          {
            no: "01",
            title: "Data, returned to the person.",
            body: "Personal data shouldn't belong to anyone but the person it's about. We make distributed PDS and consent design the precondition of every research thread.",
          },
          {
            no: "02",
            title: "Personalization, in the field.",
            body: "Not in the lab, but in classrooms, eldercare homes, and local communities. We make Personal AI work in the places where people actually live.",
          },
          {
            no: "03",
            title: "Thinking made visible, knowledge made reusable.",
            body: "Graph-Documents as a substrate for visible reasoning and shared learning. What was thought once should remain — to scaffold what comes next.",
          },
        ],
      },
      research: { kicker: "02 — Research", title: "Research projects" },
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
    { label: "大学公式 / Faculty page", href: "https://www.tamagawa.ac.jp/college_of_engineering/teachers/detail/209shibata.html" },
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
      body: "音・映像・行動データなど多視点観察から状態理解と評価を行う。LiDAR や XR デバイスによる在宅環境の 3 次元化と空間センシング、エンゲージメント評価、認知症ケアでの多職種連携支援。"
    },
    en: {
      title: "Multimodal Sensing",
      sub: "Light-weight observation that fits the field.",
      body: "Multi-perspective observation across audio, video and behavior. LiDAR- and XR-based 3-D in-home modeling and spatial sensing, engagement evaluation, and multidisciplinary support for dementia care."
    },
    kw: ["LiDAR", "XR", "Engagement", "Aging Society", "Dementia"],
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

// ── Active research projects (smaller cards rendered after LAB_THEMES) ──────
//   Compact entries: partner / context tag, title, 1–3 sentence body, keywords.
//   Add/edit freely; cards auto-grid below the 5 themes in the Research section.
window.LAB_PROJECTS_LIST = [
  {
    id: "heroic",
    partnerJa: "株式会社 HEROIC 共同研究",
    partnerEn: "Joint research with HEROIC, Inc.",
    titleJa: "マルチモーダルセンシングによる人的資本エンゲージメント評価",
    titleEn: "Engagement assessment via multimodal sensing for human-capital visualization",
    bodyJa:
      "企業の競争力と持続成長の源泉となる「人的資本」のエンゲージメントを、生体・行動・環境センシング情報から定量評価する手法を開発。人材戦略や投資判断に活用できる新しいフレームワークの構築を目指す。",
    bodyEn:
      "Develops a method to quantitatively assess the engagement of human capital — a key driver of corporate competitiveness — by combining biometric, behavioral and environmental sensing into a single framework usable for HR strategy and investment decisions.",
    kw: ["Engagement", "Multimodal", "Human Capital"],
  },
  {
    id: "coral",
    partnerJa: "玉川学園サンゴ研究部 連携",
    partnerEn: "with Tamagawa Coral Research Club",
    titleJa: "サンゴ養殖支援サービスアプリの開発",
    titleEn: "Coral aquaculture support app",
    bodyJa:
      "新入部員や学生がサンゴの飼育・養殖を理解しやすくするための教育支援アプリ。飼育過程を学べるアニメーション生成 AI、長文から音声ポッドキャストを生成する仕組み、対話型 AI による Q&A サポートを組み合わせる。",
    bodyEn:
      "An educational app that helps new club members and students get into coral husbandry — combining generative animation, long-form-text-to-podcast synthesis, and a conversational AI Q&A assistant.",
    kw: ["Education", "Generative AI", "Podcast"],
  },
  {
    id: "sawaru",
    partnerJa: "東京藝術大学 × 萩 × 筑波技術大学 × 玉川大学（2026）",
    partnerEn: "Tokyo Univ. of the Arts × Hagi × Tsukuba Tech × Tamagawa (2026)",
    titleJa: "「さわるかたち みるかたち」展",
    titleEn: "“Forms to Touch, Forms to See” exhibition",
    bodyJa:
      "地域中核事業 J-PEAKS「視覚・聴覚障がい × AI × アート」の一環として、山口県・萩市の明倫学舎で開催された展覧会に協力者として参画。3D プリント・センシングを用いた触れる造形を通じ、萩焼の新たな可能性と多様な人々のつながりを探った（2026.3.29–4.29）。",
    bodyEn:
      "Joined as a collaborator in the J-PEAKS regional initiative “Accessibility × AI × Art” exhibition at Meirin Gakusha, Hagi. Through 3D-printed and sensor-driven tactile pieces, the project explored new dimensions of Hagi-yaki ceramics with a diverse audience (29 Mar – 29 Apr 2026).",
    kw: ["Accessibility", "Art × AI", "3D Print", "Hagi-yaki"],
  },
  {
    id: "arcade",
    partnerJa: "ゲームセンター企業 連携アプリ",
    partnerEn: "Arcade-operator collaboration",
    titleJa: "LINE × ChatGPT による現場トラブル即時解決",
    titleEn: "On-site troubleshooting via LINE × ChatGPT",
    bodyJa:
      "店舗内 QR コードから LINE 経由で AI にアクセスし、ChatGPT がトラブルシュートを対話的に支援する仕組み。現場スタッフの負担を軽減しつつ、利用者の満足度を高める設計。",
    bodyEn:
      "QR codes in arcades open a LINE bot that walks users through troubleshooting via ChatGPT — reducing on-floor staff load while raising customer satisfaction.",
    kw: ["LINE", "ChatGPT", "Field Ops", "QR"],
  },
  {
    id: "match",
    partnerJa: "企業マッチング対話システム",
    partnerEn: "Enterprise–user matching dialog",
    titleJa: "RAG × LINE による最適マッチング",
    titleEn: "LINE-fronted matching with RAG",
    bodyJa:
      "LINE をフロントに、ChatGPT / Claude による推論を Azure AI Search の RAG で補強。企業情報とユーザ希望を文脈検索し、適合度の高い提案を生成することで人材・サービス・製品のマッチング効率を高める。",
    bodyEn:
      "A LINE-fronted dialog system that combines ChatGPT/Claude reasoning with Azure AI Search–based retrieval-augmented generation, surfacing high-fit matches across talent, services and products.",
    kw: ["RAG", "Azure AI Search", "LINE", "Matching"],
  },
  {
    id: "manawakari",
    partnerJa: "LINE 公式アカウント「ものわかりの良い上司」",
    partnerEn: "LINE bot “The Understanding Boss”",
    titleJa: "気軽に相談できる共感型 AI ボット",
    titleEn: "Empathetic conversational bot for everyday worries",
    bodyJa:
      "学生や利用者の悩みを柔らかく受け止め、共感的に返答する AI エージェント。LINE を窓口に ChatGPT で自然な対話を実現。公開アカウントとして配信中。",
    bodyEn:
      "An always-on LINE bot that listens to small worries and responds empathetically. ChatGPT powers the conversation; deployed as a public LINE account.",
    kw: ["LINE", "Empathy", "ChatGPT", "Mental Wellness"],
  },
  {
    id: "pds-app",
    partnerJa: "パーソナルデータ分散管理アプリ",
    partnerEn: "Distributed personal-data management app",
    titleJa: "iOS / Android / macOS 対応の PDS クライアント",
    titleEn: "Cross-platform PDS client (Flutter)",
    bodyJa:
      "Flutter / Dart によるクロスプラットフォーム実装。ユーザ同意に基づくアクセス制御と利用履歴の可視化を備え、将来的なパーソナル AI（PAI）への接続を見据えた設計。",
    bodyEn:
      "A Flutter/Dart cross-platform client (iOS / Android / macOS) that lets individuals record and govern their own data — consent-based access control plus a visible usage log, designed to plug into future Personal AI agents.",
    kw: ["Flutter", "PDS", "Consent", "Personal AI"],
  },
  {
    id: "acupuncture",
    partnerJa: "鍼灸院 症例データベース（国内共同研究）",
    partnerEn: "Acupuncture case database (domestic collaboration)",
    titleJa: "電子システムで筋骨格痛症例を構造化",
    titleEn: "Structured case records for musculoskeletal-pain clinics",
    bodyJa:
      "鍼灸院における症例情報を体系的に蓄積し、臨床研究や教育に資する基盤を構築。将来の自然言語処理・症状分類 AI を見据えた構造化と、現場の入力効率を両立する設計。",
    bodyEn:
      "Designs and builds a case-record database for acupuncture clinics — balancing efficient on-site input with structuring that supports future NLP- and classification-driven analysis.",
    kw: ["Clinical", "NLP-ready", "Acupuncture", "Database"],
  },
];

// ── Research-map graph (node-link, for D3 force) ────────────────────────────
window.LAB_GRAPH = {
  nodes: [
    // theme nodes (5)
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
    { id: "kw-line", group: "keyword", label: "LINE" },
    { id: "kw-lidar", group: "keyword", label: "LiDAR" },
    { id: "kw-dementia", group: "keyword", label: "Dementia" },
    { id: "kw-eng", group: "keyword", label: "Engagement" },
    { id: "kw-recur", group: "keyword", label: "Recurrent Edu." },
    { id: "kw-collab", group: "keyword", label: "Collaboration" },
    { id: "kw-acc", group: "keyword", label: "Accessibility" },
    // paper nodes
    { id: "p-slmpai", group: "paper", label: "SLM × PAI '25" },
    { id: "p-graph24", group: "paper", label: "Graph-Doc '24" },
    { id: "p-class24", group: "paper", label: "Gen-AI Class '24" },
    { id: "p-elder", group: "paper", label: "Elder SNS '25" },
    { id: "p-care", group: "paper", label: "Dementia obs. '17" },
    // project nodes (active projects from LAB_PROJECTS_LIST + KAKEN grants)
    { id: "p-heroic", group: "project", label: "HEROIC Engagement" },
    { id: "p-coral", group: "project", label: "Coral × AI" },
    { id: "p-sawaru", group: "project", label: "Sawaru Art '26" },
    { id: "p-arcade", group: "project", label: "Arcade LINE" },
    { id: "p-match", group: "project", label: "Matching RAG" },
    { id: "p-manawakari", group: "project", label: "LINE Wellness" },
    { id: "p-pds-app", group: "project", label: "PDS App" },
    { id: "p-acupuncture", group: "project", label: "Acupuncture DB" },
    { id: "p-lidar", group: "project", label: "KAKEN: LiDAR Home" },
    { id: "p-recur", group: "project", label: "KAKEN: Graph-Doc" },
  ],
  links: [
    // Personal AI
    ["pai", "kw-pds"], ["pai", "kw-slm"], ["pai", "kw-consent"],
    ["pai", "p-slmpai"], ["pai", "p-elder"], ["pai", "p-pds-app"],
    // Graph-Document
    ["graphdoc", "kw-rag"], ["graphdoc", "kw-collab"],
    ["graphdoc", "p-graph24"], ["graphdoc", "p-recur"],
    ["graphdoc", "p-match"],
    // Learning Support
    ["learn", "kw-llm"], ["learn", "kw-recur"],
    ["learn", "p-class24"], ["learn", "p-recur"],
    ["learn", "p-coral"], ["learn", "p-manawakari"],
    // Multimodal Sensing
    ["sense", "kw-lidar"], ["sense", "kw-dementia"], ["sense", "kw-eng"],
    ["sense", "p-care"], ["sense", "p-heroic"], ["sense", "p-lidar"],
    ["sense", "p-sawaru"],
    // Service Informatics
    ["service", "p-coral"], ["service", "p-acupuncture"], ["service", "p-heroic"],
    ["service", "p-arcade"], ["service", "p-match"], ["service", "p-manawakari"],
    ["service", "p-sawaru"],
    ["service", "kw-rag"], ["service", "kw-line"], ["service", "kw-acc"],
    // Project ↔ keyword wiring (deeper connections so hovering reveals stack)
    ["p-heroic", "kw-eng"],
    ["p-arcade", "kw-line"], ["p-arcade", "kw-llm"],
    ["p-match", "kw-line"], ["p-match", "kw-rag"], ["p-match", "kw-llm"],
    ["p-manawakari", "kw-line"], ["p-manawakari", "kw-llm"],
    ["p-pds-app", "kw-pds"], ["p-pds-app", "kw-consent"],
    ["p-sawaru", "kw-acc"],
    // Cross-theme spine
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
  {
    src: "assets/images/infographics/11-coral-id-system.png",
    titleJa: "AI によるサンゴ同定学習システム",
    titleEn: "AI-driven coral identification learning system",
    sumJa: "画像認識 AI を用いてサンゴ種の同定を学習できる教育支援システム。観察体験のなかで自然に知識が育つ設計を狙う。",
    sumEn: "Uses image-recognition AI to help students learn coral-species identification through hands-on observation.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/12-coral-id-overview.png",
    titleJa: "サンゴ同定学習システム — 全体像",
    titleEn: "Coral identification — system overview",
    sumJa: "サンゴ同定学習システムの構成要素・データフロー・学習体験を俯瞰的に整理。",
    sumEn: "End-to-end overview of the components, data flow, and learning experience behind the coral identification system.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/13-listalk-shopping.png",
    titleJa: "「LisTalk」買い物支援アプリの開発",
    titleEn: "LisTalk — shopping-assistant app",
    sumJa: "音声入力と AI 対話を組み合わせ、必要なものを「話すだけ」で記録・整理できる買い物支援アプリ。",
    sumEn: "Combines voice input with conversational AI so users can record and organise what they need just by speaking.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/14-group-engagement.png",
    titleJa: "グループ対話のエンゲージメント可視化",
    titleEn: "Visualizing engagement in group conversations",
    sumJa: "発話量・相槌・視線などのマルチモーダル指標から、グループ対話の盛り上がりや関与度を時系列で可視化。",
    sumEn: "Visualizes the flow of engagement over time using multimodal indicators — speaking turns, back-channels, gaze.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/15-emotional-intensity.png",
    titleJa: "心の熱量を可視化する分析手法",
    titleEn: "Quantifying emotional intensity",
    sumJa: "テキスト・声・行動データを統合し、その人の「心の熱量」（情動の強さ）を解析する手法の検討。",
    sumEn: "Fuses textual, vocal and behavioural signals to quantify a person's emotional intensity.",
    year: 2025,
  },
  {
    src: "assets/images/infographics/16-vi-shopping-support.png",
    titleJa: "視覚障害者向け買い物支援アプリ",
    titleEn: "Shopping-support app for the visually impaired",
    sumJa: "商品認識・読み上げ・店内ナビゲーションを統合し、視覚障害のあるユーザーがひとりで買い物を完結できる体験を設計。",
    sumEn: "Combines product recognition, audio descriptions and in-store navigation so visually-impaired users can shop independently.",
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
      "サービス情報学研究室の公式サイトを公開しました。研究テーマ、最新の業績、卒業研究のインフォグラフィック、訪問アクセス情報を一望できるように再設計しています。サイトのソースは GitHub で公開しています。",
    bodyEn:
      "We launched the official site of the Service Informatics Lab. It centralizes our research themes, latest publications, student infographics, and access information. The site is open-source on GitHub.",
  },
];

// ── Hero field (hero-field.jsx) ─────────────────────────────────────────────
// 図解の語彙。カテゴリは暮らしのデータ種別、サービスは研究の実証フィールド。
// hue は アクセント色ランプ (a1 → a2 → a3) 上の位置 0..1。
// angDesk は場の中心から見たサービスの方位（度）。狭幅ではリング下に一列に並ぶ。
window.LAB_FIELD = {
  categories: [
    { id: "learn", ja: "学び",     en: "Learning",     hue: 0.00 },
    { id: "life",  ja: "暮らし",   en: "Daily life",   hue: 0.25 },
    { id: "body",  ja: "からだ",   en: "Body",         hue: 0.50 },
    { id: "talk",  ja: "会話",     en: "Conversation", hue: 0.75 },
    { id: "plan",  ja: "予定",     en: "Plans",        hue: 1.00 },
  ],
  // cats = 要約に含まれる種類。支援が返ると、この種類の断片が明るくなる。
  // does = 押したとき何が起きるか（hover で表示）。
  services: [
    { id: "edu", ja: "教育", en: "Education", angDesk: -58, cats: ["learn", "plan"],
      does: { ja: "学びと予定の要約から、次に学ぶことを提案する",
              en: "suggests what to learn next from a summary of learning and plans" } },
    { id: "care", ja: "介護", en: "Care", angDesk: 0, cats: ["body", "life"],
      does: { ja: "からだと暮らしの要約から、見守りを調整する",
              en: "adjusts care from a summary of body and daily life" } },
    { id: "community", ja: "地域", en: "Community", angDesk: 58, cats: ["talk", "life"],
      does: { ja: "会話と暮らしの要約から、地域の場を案内する",
              en: "points to local places from a summary of conversation and daily life" } },
  ],
};

// ── Palettes (used by Tweaks) ───────────────────────────────────────────────
// Each palette stores: [primary, deep, accent1, accent2, accent3]
window.LAB_PALETTES = [
  { id: "tama-night", label: "Tamagawa Night", colors: ["#0B2C5C", "#061838", "#22D3EE", "#3B82F6", "#8B5CF6"] },
  { id: "linear-cool", label: "Linear Cool", colors: ["#0E1230", "#06081C", "#5EEAD4", "#7C3AED", "#A78BFA"] },
  { id: "vercel-mono", label: "Vercel Mono", colors: ["#0A0A0A", "#000000", "#FAFAFA", "#888888", "#444444"] },
  { id: "ember", label: "Ember Glow", colors: ["#221026", "#0D0612", "#FB7185", "#F59E0B", "#A855F7"] },
];
