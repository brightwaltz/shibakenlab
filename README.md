# 柴田研究室サイト（玉川大学 工学部 ソフトウェアサイエンス学科）

このリポジトリは、**サービス情報学研究室（柴田健一）** の公式サイトのソースです。
本番は GitHub Pages 上で `https://brightwaltz.github.io/shibakenlab/` として配信されます。
`main` ブランチへの push をトリガーに GitHub Actions が自動デプロイします。

---

## サイトの位置づけ

- フレームワークは使わず **HTML + 素の CSS + JSX（ブラウザ Babel）** で構成。
- 主宰本人が Claude と GitHub だけで継続的に更新できるよう、編集ポイントは **`assets/js/data.js` と `assets/css/style.css`** に集約。文言はコードではなく `data.js` にあります。
- ビルド不要。`python -m http.server` で即プレビュー可能。
- トップのヒーローは、研究の主張を動く機構として見せる **Personal Field**（Canvas 2D）。後述の「[ヒーロー図解](#ヒーロー図解-personal-field)」を参照。

---

## ファイル構成

```
shibakenlab/                       # ← このリポジトリ。リポジトリ直下が公開ルート
├─ index.html                      # 1 ページ完結のホームページ（全セクション）
├─ README.md                       # この運用マニュアル
├─ llms.txt                        # AI 向けのサイト要約（自動生成。手で編集しない）
├─ robots.txt / sitemap.xml        # SEO 用
├─ scripts/
│  └─ build-llms.mjs               # data.js から llms.txt を生成（デプロイ時にも実行）
├─ .github/workflows/deploy.yml    # GitHub Pages への自動デプロイ
├─ assets/
│  ├─ css/
│  │  └─ style.css                 # 全スタイル（CSS Custom Properties でテーマ切替）
│  ├─ js/
│  │  ├─ data.js                   # i18n, 業績, 研究テーマ, ニュース, インフォグラフィック, 図解の語彙
│  │  ├─ tweaks-panel.jsx          # 右下「Tweaks」パネルの共通シェル
│  │  ├─ hero.jsx                  # Three.js Hero（粒子/幾何/流体 の 3 モード）
│  │  ├─ hero-field.jsx            # Hero「Personal Field」図解（Canvas 2D・既定モード）
│  │  ├─ ask-ai.jsx                # 「AI に聞く」— 外部 AI へのリンク集
│  │  ├─ research-map.jsx          # D3 フォースグラフ
│  │  ├─ sections.jsx              # About / Research / Gallery / Pubs / Member / Access / News / Contact
│  │  └─ app.jsx                   # トップレベル：Nav・言語切替・Tweaks・スクロール演出
│  └─ images/
│     └─ infographics/
│        └─ 01-llm-learning-planner.png   # 卒研インフォグラフィック（NotebookLM 出力）
└─ news/                           # （将来）Markdown ベースのニュース個別ページ用フォルダ
```

> 現バージョンでは News はトップページ内に直接埋め込んでいます。記事数が増えたら `news/` 配下の Markdown を index.json 経由でロードする構成に拡張可能です（下記の運用フローに該当）。

---

## ローカルでの確認

リポジトリ直下で：

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開くと、`index.html` が読み込まれます。
本番（`https://brightwaltz.github.io/shibakenlab/`）でも同じファイル一式がそのまま動きます — すべて相対パスで書かれているため。

---

## デプロイ（GitHub Actions による自動公開）

このリポジトリには `.github/workflows/deploy.yml` が含まれており、**`main` ブランチへ push されるたびに GitHub Pages へ自動デプロイ** されます。

1. ローカルで編集 → `git commit` → `git push origin main`
2. https://github.com/brightwaltz/shibakenlab/actions でワークフローの進行を確認
3. デプロイ成功後、`https://brightwaltz.github.io/shibakenlab/` に反映されます（通常 30 秒〜2 分）

初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source** を `GitHub Actions` に設定する必要があります（ワークフロー側で `enablement: true` を指定しているため、自動で有効化されることもあります）。

### デプロイから除外されるもの

ワークフローの「Stage site」ステップで、本番に出さないディレクトリ／ファイルを除外しています。**ローカルには残るがサイトには出ない**ものは以下：

- `research_infographic/` — NotebookLM 出力の原寸 PNG（合計 60MB 強）。実際に表示するのは `assets/images/infographics/` 配下に置いた最適化版。
- `screenshots/` — 開発時の動作確認画像。
- `uploads/` — 一時アップロード置き場。
- `README.md` / `.github/` / `.claude/` / `scripts/` — 運用ドキュメントと開発ツール設定、ビルドスクリプト。

加えて、ワークフローは次の 2 つを自動で行ってからアップロードします。

- `scripts/build-llms.mjs` を実行して `llms.txt` を生成（コミットし忘れても本番の内容がずれない）
- `sitemap.xml` の `<lastmod>` をデプロイ時の日付に書き換え

---

## ヒーロー図解 (Personal Field)

トップの第一画面は `assets/js/hero-field.jsx`（Canvas 2D、ライブラリ非依存）。
研究の主張を文章ではなく**動く機構**として置いています。

| 図の部品 | 意味 |
| --- | --- |
| 中心の白い核「あなた」 | 本人 |
| 境界のリング「あなたが決める境界」 | 許可なしには何も越えない。分散 PDS の範囲 |
| 内側を漂う粒 | 暮らしのデータ断片。色は 5 種別（学び / 暮らし / からだ / 会話 / 予定） |
| 追従する光点「小さな AI」 | SLM。カーソル＝関心を追い、触れた断片を理解する |
| 断片の間に残る線 | Graph-Document。理解した断片は繋がり、以後いっしょに動く |
| 周縁の 3 ノード | 支援サービス（教育 / 介護 / 地域）。押すと同意ゲートが開き、**要約 1 粒だけ**が外へ出て支援が返る |
| 脈動 | 3 拍子（ワルツ）。1 拍目が強い |

### 訪問者のデータの扱い

- 学習するのは **カテゴリ別の関心の重みだけ**。カーソル座標・閲覧ページ・日時・個人を特定する情報は保存しません。
- 保存先は訪問者のブラウザの `localStorage`、キーは **`lab-field-profile`**。**サーバへは何も送りません**。
- 保存するのは絵ではなくプロファイル。再訪時はそこから構造が生え直します（何度来ても埋め尽くさないよう上限つき）。
- 「この図について → 保存されているもの」で実際に保存されている中身を表示でき、「忘れる」で消去できます。

### 文言・語彙の編集

コードではなく `assets/js/data.js` を編集します。

- `window.LAB_FIELD.categories` — 粒の 5 種別。`hue` は アクセント色ランプ（a1 → a2 → a3）上の位置 0..1。
- `window.LAB_FIELD.services` — 周縁の 3 サービス。`angDesk` は方位（度）、`cats` は要約に含む種別、`does` は hover 時の一文。
- `window.LAB_I18N.{ja,en}.hero.field` — 図中のラベル、「この図について」パネルのタブ名、7 段階の案内 `steps`、保存の説明、`research`（研究との関係）。

### 表示の切り替え

右下 **Tweaks** の Hero モードで `field`（既定）/ `particles` / `geometry` / `fluid` を切り替えられます。
`field` 以外は従来の Three.js シーン（`assets/js/hero.jsx`）で、削除していません。
既定値は `assets/js/app.jsx` の `TWEAK_DEFAULTS.heroMode`。

### 変更するときの注意

- **必ずブラウザで実際にマウントさせて確認してください。** ブラウザ側の Babel は `const` を `var` に落とすため、宣言順の誤りが TDZ エラーにならず `undefined` として走り、React 18 はルートごと巻き戻して**ページ全体が真っ白**になります。構文チェックだけでは捕まりません。
- 「この図について」パネルは画面下端に `position: fixed` で置いています。ヒーローの下端に絶対配置すると、ヒーローが画面より高いときにボタンが画面外に出て押せなくなります。

---

## コンテンツの更新方法

### 1) ニュース記事を追加する

`assets/js/data.js` の `window.LAB_NEWS` 配列の **先頭に** エントリを追加します。

```js
window.LAB_NEWS = [
  {
    slug: "2026-06-15-new-collab",          // 日付-スラッグ
    date: "2026-06-15",
    tags: ["collab", "research"],
    titleJa: "新しい共同研究を開始しました",
    titleEn: "Starting a new joint study with …",
    bodyJa: "本文（日本語）…",
    bodyEn: "Body (English)…",
  },
  // … 既存のエントリはそのまま下に残す
];
```

将来、Markdown ファイルを `news/` フォルダに置く方式に切り替える場合は、
`news/2026-06-15-new-collab.md` を front-matter 付きで作成 → CI で `news/index.json` を生成 → 同じ JS から fetch する流れになります。

### 2) Publications（業績）について

業績一覧は **researchmap が一次ソース** のため、サイト内では再掲しません。代わりに、Publications セクションでは researchmap への大きな CTA カードを表示しています（`assets/js/sections.jsx` の `Publications()` で実装）。新しい論文を追加した際は researchmap 側を更新するだけで十分です。

> 参考: サイト内に旧版の「種別フィルタ＋検索＋年フィルタ付き業績リスト」を復活させたい場合は、`window.LAB_PUBLICATIONS` のデータが残っているので、`Publications()` を従来版に差し戻すだけで動きます。

### 3) インフォグラフィックを追加する（年度ごとにグループ表示）

1. `assets/images/infographics/` に PNG / JPG を追加（**WebP 推奨**）。
2. `window.LAB_INFOGRAPHICS` の末尾にエントリを追加。**`year` フィールド** で 年度（FY）が決まり、表示時は同じ年度の作品が 1 つのグループにまとまります（年度は降順）。
   ```js
   {
     src: "assets/images/infographics/02-xxx.png",
     titleJa: "（日本語タイトル）",
     titleEn: "(English title)",
     sumJa: "（日本語の一言要約）",
     sumEn: "(One-line summary in English)",
     year: 2024,            // ← 年度。2024 と書けば「2024年度」グループに表示
   },
   ```
3. 1500px 程度の長辺サイズに圧縮しておくと体験が滑らかです。

### 4) 研究テーマの更新

`window.LAB_THEMES` の各エントリを編集します。研究マップ（フォースグラフ）と整合させたい場合は、`window.LAB_GRAPH` も合わせて更新します。

### 5) 連絡先・プロフィール

`window.LAB_BIO` を編集。所属・経歴・外部リンクなどはここに集約しています。

### 6) 言語切替の文言

`window.LAB_I18N` の `ja` / `en` キーを編集します。

---

## 「AI に聞く」と llms.txt

訪問者が普段使っている AI（ChatGPT / Claude / Gemini / Perplexity）に、この研究室の
公開情報を読ませて質問してもらう仕組みです。**サーバも API キーも使いません。**
GitHub Pages のような静的ホスティングでそのまま動き、費用もかかりません。

やっていることは 2 つだけです。

1. サイトが **`/llms.txt`**（研究室の要約を機械可読にした 1 ファイル）を公開する
2. 「AI に聞く」のボタンは、プロンプトを URL に埋めた **ただのリンク**

```
ChatGPT     https://chatgpt.com/?q={prompt}&hints=search
Claude      https://claude.ai/new?q={prompt}
Gemini      https://www.google.com/search?udm=50&q={prompt}   ← Google AI モード
Perplexity  https://www.perplexity.ai/search?q={prompt}
```

プロンプトは「まず `llms.txt` を読んでから答えてください」で始まります。AI 側が
自分で取りに行けるので、こちらは本文を送りつける必要がありません。

### llms.txt は自動生成

`llms.txt` は **手で編集しないでください。** `assets/js/data.js` から生成しています。

```bash
node scripts/build-llms.mjs      # llms.txt を書き出す
```

内容（研究テーマ・進行中のプロジェクト・卒研インフォグラフィック・更新情報・アクセス・
外部リンク）はすべて `data.js` が出どころなので、サイト本体を更新すれば要約も追随します。
デプロイ時にも同じスクリプトが走るため、生成物のコミットを忘れても本番はずれません。

### 文言・送り先の編集

- `window.LAB_I18N.{ja,en}.sections.askai` — ボタン名、3 つの入口（`intents`）、注意書き
- `window.LAB_ASKAI.sources` — プロンプトに添える外部ソース（researchmap / 大学公式教員ページ /
  GitHub / Portfolio）
- `window.LAB_ASKAI.providers` — 送り先。`tpl` の `{q}` が URL エンコード済みプロンプトに置換されます

### 設計上の注意

- 訪問者の入力はどこにも保存しません。開いた先の AI サービスに渡るだけです。
- URL 長は日本語 1 文字あたり約 9 バイトに膨らみます。現状は約 2,500 文字で、
  4 サービスとも問題なく開きます（Google は 1 万文字超まで受け付けることを実測で確認）。
  `intents` の文面を大幅に長くするときは、この点だけ気にしてください。
- ボタンは右下に浮かび、Tweaks トリガの真上に積みます。スクロール 40px で現れます。

---

## デザイントークン（色・余白）

CSS Custom Properties で全てコントロールしています（`assets/css/style.css` 冒頭）：

| 変数 | 役割 | 既定値 |
| --- | --- | --- |
| `--c-primary` | 玉川ネイビー | `#0B2C5C` |
| `--c-deep` | 深い背景色 | `#061838` |
| `--c-a1` | アクセント1（シアン） | `#22D3EE` |
| `--c-a2` | アクセント2（ブルー） | `#3B82F6` |
| `--c-a3` | アクセント3（パープル） | `#8B5CF6` |
| `--c-bg / --c-bg-2` | ステージ背景の上下 | `#050818 / #08102b` |

ユーザーは右下の **Tweaks** パネルから 4 つのパレット（Tamagawa Night / Linear Cool / Vercel Mono / Ember Glow）を切り替え、Hero モード（`field` / 粒子 / 幾何 / 流体）も即時に試せます。気に入った組み合わせは Tweaks の値が `assets/js/app.jsx` の `TWEAK_DEFAULTS` ブロックに自動保存されます。

図解の粒の色は、このアクセント 3 色のランプ上から取っています（`LAB_FIELD.categories` の `hue`）。パレットを変えれば図解の配色も追従します。

---

## Claude へのお願いプロンプト集

このサイトに対して、Claude に依頼する際のサンプル文です。日本語でそのままコピペできます。

### A. ニュース記事を1本追加してほしいとき

> `assets/js/data.js` の `window.LAB_NEWS` の先頭に次の内容で記事を追加してください。slug は `YYYY-MM-DD-{半角英数字のスラッグ}` 形式でお願いします。
> ```
> 日付: 2026-06-15
> タグ: research, collab
> タイトル(日): 新しい共同研究プロジェクト「○○○」を開始しました
> タイトル(英): Launching a new collaboration project "○○○"
> 本文(日): （ここに 2〜3 文。共同研究先と狙い、開始時期）
> 本文(英): （同じ内容を英訳）
> ```

### B. 業績を 1 件追加してほしいとき

> 次の論文を `window.LAB_PUBLICATIONS` の先頭に追加してください。researchmap の URL も link に入れてください。tags は `pai/graphdoc/learn/sense/service` から関連するものを 1〜2 個。
> ```
> 年: 2026
> 種別: paper （論文）/ proc （国際会議）/ misc / award のいずれか
> 査読: あり/なし
> 筆頭: はい/いいえ
> タイトル: …
> 著者: …（researchmap の表記をそのままコピー）
> 掲載: 雑誌名 巻(号) ページ
> researchmap URL: https://researchmap.jp/brightwaltz/published_papers/…
> ```

### C. 卒業研究インフォグラフィックを 1 枚追加したいとき

> 添付の画像を `assets/images/infographics/` にコミットし、`window.LAB_INFOGRAPHICS` の末尾にエントリを追加してください。タイトルと一言要約は次のとおりです：
> ```
> 日: …
> 英: …
> 要約(日): …
> 要約(英): …
> 年: 2025
> ```

### D. 研究テーマを 1 つ追加したいとき

> `window.LAB_THEMES` に次のテーマを追加してください。アイコンは `brain-circuit / graph / compass / waveform / compass-rose` から選択。研究マップ（`window.LAB_GRAPH`）にも対応するノードと、既存テーマとの関連リンクを追加してください。
> ```
> id: …
> 日題: …
> 日サブ: …
> 日本文: …
> 英題: …
> 英サブ: …
> 英本文: …
> キーワード: ["…", "…"]
> ```

### E. 配色 / アクセントカラーを変更したい / 試したい

> `Tweaks` パネルの「Palette」を `Linear Cool` に切り替えた状態の見栄えをスクリーンショットで確認したいです。気に入ったら、`assets/js/app.jsx` の `TWEAK_DEFAULTS.palette` を `linear-cool` に固定してください。Hero モードもあわせて比較したいので、`field`（既定）・`geometry`・`fluid` の見比べ用の静止画を 3 枚お願いします。

### G. 「AI に聞く」の入口や文言を直したいとき

> `assets/js/data.js` の `window.LAB_I18N.ja.sections.askai`（英語は `en` 側）を編集してください。
> `llms.txt` は自動生成なので直接触らず、必要なら `scripts/build-llms.mjs` を直してから
> `node scripts/build-llms.mjs` を実行してください。
> ```
> 直したい入口: 例）「配属を考えている学生として」→ …
> 送り先の追加/削除: 例）Copilot を足す（URL テンプレートも）
> ```

### F. ヒーロー図解の文言を直したいとき

> `assets/js/data.js` の `window.LAB_I18N.ja.hero.field` を編集してください。英語（`en` 側）も同じ意味になるよう揃えてください。変更後は、ローカルサーバを立ててブラウザで実際に描画されること（`#root` にマウントされ、コンソールエラーが無いこと）まで確認してからコミットしてください。
> ```
> 直したいラベル: 例）「あなたが決める境界」→ …
> 直したい案内文: 例）steps の 3 番目 → …
> ```

---

## 確認が必要な項目（TODO）

サイト内に `<!-- TODO -->` コメントで残してあります：

- 公開連絡先メールアドレス（researchmap 以外に直接の問い合わせ先を載せる場合、本人確認が必要）。
- Contact フォーム実装（Formspree 等を導入する場合）。
- 学生メンバーの掲載枠（現状は主宰のみ。新年度に随時更新予定）。
- ニュース個別ページのレンダラ（記事数が増えてから検討）。

---

## ライセンス / クレジット

- コンテンツ著作権: 柴田研究室 / 玉川大学
- フレームワーク: React 18, Three.js, D3.js（CDN ロード）。ヒーロー図解は素の Canvas 2D で、外部ライブラリを使っていません。
- フォント: Inter, Noto Sans JP（Google Fonts）

不明点や追加要望は、リポジトリの Issue または主宰までご連絡ください。
