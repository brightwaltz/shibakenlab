---
name: site-design-ja
description: このリポジトリ（柴田研究室のサイト）の見た目を直す・監査するときに使う。elayadesign の redesign-existing-projects と landing-page-design を、日本語の研究室サイト向けに読み替えた版。研究室サイトの見た目の決まり（触らないもの、文字の大きさの下限、書体、スマホのメニュー）と、直すときの手順を定める。
---

# サイトのデザイン（研究室サイト版）

元にしたのは次の 2 つです（どちらも MIT ライセンス）。本文は `references/` にそのまま置いてあります。

- `references/redesign-audit.md`：[elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill) の `redesign-existing-projects`。既存サイトの監査項目と、直す順番
- `references/visual-system.md`：[elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) の `landing-page-design` の Part B（見た目の規則）

## 手順（必ずこの順で）

1. `references/redesign-audit.md` の項目で点検し、**直す前に診断の一覧を先生に見せる**。先生が不要な項目を外す。
2. 直す範囲が決まったら、**最初の画面だけの見本**（1440×900 と 390×844）を見せて了承を得る。
3. 元の構成と文言を残したまま、的を絞って直す。作り直さない。モチーフや演出を新しく足さない。
4. ブラウザで実際に表示させて確かめる（README の「変更するときの注意」）。`#root` に描画され、コンソールにエラーがないこと。

## 触らないもの

元のスキルの規則と食い違っても、次は変えない。研究室サイトの個性そのものだからです。

- ヒーローの図解「Personal Field」（`assets/js/hero-field.jsx`）とその配置
- 配色：暗い地（`--c-bg` 系）、玉川ネイビー、アクセント 3 色（a1→a2→a3）。図解の粒の色分けにも使われている。元の規則の「アクセントは 1 色」「背景にグラデーションを使わない」「紫〜青のグラデーションを避ける」は、このサイトには当てはめない
- 文言の置き場（`assets/js/data.js`）と、`llms.txt` を自動で作る仕組み
- 「AI に聞く」

## このサイトの値

- **書体**：欧文は Geist、和文は Noto Sans JP（2026-10 に Inter から替えた）。`font-family: "Geist", "Noto Sans JP", …` の順に書く
- **文字の大きさの下限は 12px**。`--type-micro` は 12px。これより小さい文字を作らない
- **動きの曲線**：`--ease-out`（`cubic-bezier(.2, .7, .2, 1)`）と `--ease-in-out` にそろっている。新しい曲線を足さない
- **スマホ（880px 以下）のメニュー**：右上のボタンから全画面のパネルを開く。横スクロールの帯にしない
- **Tweaks**：URL に `?tweaks` を付けたときだけ右下に出る。訪問者には見せない
- **原則 01〜03**：880px 以下では縦に並べる（横に送る演出はデスクトップだけ）

## 研究室サイトでしないこと（2026-10 のポートフォリオで却下された点）

- 名前の語呂（brightwaltz）や音楽のモチーフを、見せ方の発想に使わない
- 研究との関係が説明できない飾りを足さない
- Awwwards 型の採点を、先生の判断の代わりにしない

## クレジット

`references/` の 2 ファイルは Elaya（elayadesign）の作品で、MIT ライセンスです。ライセンスの全文は `references/LICENSE-*` にあります。taste-skill（Leon Lin、MIT）から翻案した部分も含みます。
