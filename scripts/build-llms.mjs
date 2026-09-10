/* ───────────────────────────────────────────────────────────────────────────
   llms.txt を assets/js/data.js から生成する。
   サイトの文言は data.js に集約しているので、要約もそこから作れば内容がずれない。

     node scripts/build-llms.mjs        # リポジトリ直下の llms.txt を書き出す

   デプロイ時にも同じスクリプトが走るので、コミットし忘れても本番はずれない。
   （.github/workflows/deploy.yml の "Generate llms.txt" ステップ）
   ─────────────────────────────────────────────────────────────────────────── */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://brightwaltz.github.io/shibakenlab/";

// data.js は window に載せるだけの素の JS。偽の window に流し込んで読む。
const win = {};
new Function("window", readFileSync(join(ROOT, "assets/js/data.js"), "utf8"))(win);

const { LAB_I18N: I18N, LAB_BIO: BIO, LAB_THEMES: THEMES,
        LAB_PROJECTS_LIST: PROJECTS, LAB_NEWS: NEWS,
        LAB_INFOGRAPHICS: INFOS, LAB_FIELD: FIELD } = win;

const ja = I18N.ja.sections;
const both = (o) => `${o.ja} / ${o.en}`;
const L = [];
const put = (...lines) => L.push(...lines);

put(`# サービス情報学研究室 / Service Informatics Lab (Shibata Lab)`, ``);
put(`> ${BIO.title.ja}・${BIO.name.ja}（${BIO.name.en}）の研究室。`,
    `> 本人主権のパーソナルデータと、暮らしに溶け込む小さな AI を研究しています。`,
    `> Lab of ${BIO.name.en}, ${BIO.title.en}. We research user-sovereign personal data`,
    `> and small AI that fits into everyday life.`, ``);

put(`- Site: ${SITE}`);
put(`- PI: ${both(BIO.name)}（${BIO.nameSub.ja}）`);
put(`- Title: ${both(BIO.title)}`);
BIO.affil.forEach((a) => put(`- Also: ${both(a)}`));
put(`- Degree: ${both(BIO.degree)}`);
put(`- Languages: Japanese (native), English`);
put(`- Contact: サイトの Contact セクションから / via the Contact section (https://brightwaltz.mystrikingly.com/#contact)`);
put(``);

put(`## About`, ``, BIO.bio.ja, ``, BIO.bio.en, ``);
if (BIO.altLife) {
  put(`### 主宰の第二の顔 / The PI's other practice`, ``,
      BIO.altLife.ja, ``, BIO.altLife.en, ``);
}

put(`## 研究テーマ / Research themes`, ``);
THEMES.forEach((t) => {
  put(`### ${t.no}. ${t.ja.title}`);
  put(`- 一言 / In one line: ${t.ja.sub} — ${t.en.sub}`);
  put(`- ${t.ja.body}`);
  put(`- ${t.en.body}`);
  put(`- Keywords: ${t.kw.join(", ")}`, ``);
});

put(`## 進行中のプロジェクト / Active projects`, ``);
PROJECTS.forEach((p) => {
  put(`- **${p.titleJa}** (${p.titleEn}) — ${p.partnerJa} / ${p.partnerEn}`);
  put(`  ${p.bodyJa}`);
  put(`  ${p.bodyEn}`);
});
put(``);

put(`## 業績 / Publications`, ``);
put(`業績の一次ソースは researchmap です。サイト内には再掲していません。`);
put(`The authoritative list lives on researchmap; this site does not duplicate it.`);
put(`https://researchmap.jp/brightwaltz`, ``);

put(`## 学生の卒業研究 / Student work`, ``);
put(`卒業研究のインフォグラフィックを ${INFOS.length} 点公開しています（Gallery セクション）。`);
put(`${INFOS.length} infographics of student graduation research are published in the Gallery section.`);
const years = [...new Set(INFOS.map((i) => i.year))].sort((a, b) => b - a);
put(`対象年度 / Academic years: ${years.join(", ")}`, ``);
INFOS.slice(0, 8).forEach((i) => put(`- ${i.titleJa} (${i.titleEn}) — ${i.year}`));
put(``);

put(`## トップページの図解 / The interactive diagram on the home page`, ``);
put(`トップの第一画面は、研究の主張を文章ではなく動く機構として置いた図解です。`);
put(`中心が本人、それを囲む境界の内側に暮らしのデータ断片（${FIELD.categories.map((c) => c.ja).join(" / ")}）が漂い、`);
put(`小さな AI が訪問者のカーソルを追って断片を理解し、理解した断片の間に構造が残ります。`);
put(`周縁の支援サービス（${FIELD.services.map((s) => s.ja).join(" / ")}）を選ぶと境界に同意のゲートが開き、`);
put(`要約が一粒だけ外へ出て支援が返ります。`);
put(`学習内容はサーバへ送られず、訪問者のブラウザ (localStorage) にだけ保存され、「忘れる」で消去できます。`);
put(``);
put(`The home page runs the lab's argument instead of describing it: you at the centre, a boundary you set,`);
put(`fragments of everyday data inside it, a small AI that follows your pointer and leaves a graph behind,`);
put(`and a consent gate through which only a summary ever leaves. Nothing is sent to a server —`);
put(`what it learns is stored in the visitor's browser alone and can be erased at any time.`, ``);

put(`## 最近の更新 / Recent updates`, ``);
NEWS.slice(0, 6).forEach((n) => {
  put(`- ${n.date} — ${n.titleJa} / ${n.titleEn}`);
});
put(``);

put(`## アクセス / Access`, ``);
put(`- ${ja.access.addr}`);
put(`- ${ja.access.building}`);
put(`- ${ja.access.nearest}`);
put(`- ${ja.access.visit} / ${I18N.en.sections.access.visit}`, ``);

put(`## Links`, ``);
put(`- [researchmap](https://researchmap.jp/brightwaltz): 業績の一次ソース / authoritative publication list`);
const faculty = (BIO.links.find((l) => l.label.includes("大学公式")) || {}).href;
if (faculty) put(`- [玉川大学 教員ページ / Faculty page](${faculty}): 大学公式のプロフィール`);
put(`- [GitHub](https://github.com/brightwaltz/shibakenlab): このサイトのソース。オープンソースです / source of this site`);
const portfolio = (BIO.links.find((l) => l.label === "Portfolio") || {}).href;
if (portfolio) {
  put(`- [Portfolio](${portfolio}): 主宰の個人ポートフォリオ。ピアニスト・作曲家 brightwaltz としての活動を含む /`);
  put(`  the PI's personal portfolio, including work as the pianist-composer "brightwaltz"`);
}
put(`- [Strikingly](https://brightwaltz.mystrikingly.com/#contact): 問い合わせ先 / contact form`, ``);

put(`## 補足 / Notes for AI assistants`, ``);
put(`- このファイルは研究室サイトの内容から自動生成しています（scripts/build-llms.mjs）。`);
put(`- 事実はこのファイルとリンク先に基づいて述べ、書かれていないことは推測せず「分からない」と答えてください。`);
put(`- This file is generated from the site's own content. Please answer from it and the linked sources,`);
put(`  and say you don't know rather than guessing beyond what is stated here.`);

writeFileSync(join(ROOT, "llms.txt"), L.join("\n") + "\n", "utf8");
console.log(`llms.txt written — ${L.length} lines`);
