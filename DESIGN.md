# デザインエンジニア・ポートフォリオ 設計書

## 0. このポートフォリオが証明すること（コアメッセージ）

> **「デザインシステムは、AIによるUI生成の基盤である」**
> ——だから私はデザインシステムを設計し、その上にAI実装の自動化フローを構築できる。

3つの強みが「飾り」ではなく **因果のチェーン** として並ぶことが最重要。

```
デザインシステムを設計・運用できる
        ↓ （だから）
コンポーネント集合をAIに「契約」として渡せる
        ↓ （だから）
LLMが安全に・破綻なく動的UIを組める ＝ 実装の自動化
```

OpenUI（thesys版）の核心は **Library が「アプリとAIの契約」になる** こと。
許可したコンポーネントの範囲内でしかLLMはUIを生成できない。
→ デザインシステムが整っているほど生成UIの品質と安全性が上がる。
→ これは「私の主張」そのものの実証になる。サイト自体がその証拠物件。

---

## 1. サイト体験の主役：Generative UI セクション

訪問者がプロンプト（例:「あなたのデザインシステムの強みを教えて」）を入力すると、
サイトが **このポートフォリオ専用に定義したデザインシステムのコンポーネントだけ** を使って
回答UIをストリーミングで動的に組み立てる。

- テキストの壁ではなく、StatCard / ProjectCard / Timeline / TextContent などの
  「自分のデザインシステムのコンポーネント」で回答が構築される
- これにより「デザインシステム → AI実装」のチェーンを、来訪者がその場で体験できる
- 静的なコピーで「できます」と言う代わりに、動いて見せる

### パイプライン（OpenUI 4ブロック）

```
[自作デザインシステム Library]
  defineComponent × N + createLibrary
        │
        ▼  library.prompt()
[System Prompt]  ← コンポーネント契約をLLMへ
        │
        ▼  /api/genui (Next.js Route Handler, サーバー側でAPIキー保持)
[LLM]  → OpenUI Lang をストリーム出力
        │
        ▼  <Renderer library response isStreaming />
[Live UI]  ← 自作コンポーネントで段階的レンダリング
```

---

## 2. 情報設計（IA）

| セクション | 役割 | 主役コンポーネント |
| --- | --- | --- |
| Hero | コアメッセージの提示。因果チェーンを1画面で | 静的（自作DS） |
| **Generative UI Demo** | 強みの実証。プロンプト→動的UI生成 | OpenUI Renderer + 自作Library |
| The Thesis | なぜDSがAI生成の基盤なのかを言語化 | 静的（図解） |
| Workflow | DS構築→プロンプト生成→実装自動化のフロー図 | 静的（ステップ） |
| Work / Projects | 実績。GenUIデモ内でも同じカードを再利用 | ProjectCard（DS共用） |
| About / Contact | プロフィール、連絡先 | 静的 |

ポイント: **Work で使う ProjectCard と、GenUI デモが生成する ProjectCard は同一コンポーネント。**
「静的に並べたものと、AIが動的に組んだものが、同じデザインシステムから出ている」
ことが見た目で分かる ＝ チェーンの可視化。

---

## 3. デザイン方向性（Aesthetic）

- **トーン**: editorial × technical。設計図／仕様書の美意識。デザインエンジニアらしく
  「システムとして作られている」ことが伝わる精緻さ。
- **テーマ**: ダーク基調 + 単色アクセント。コードと図面が主役なので低彩度ベース。
- **タイポ**: 表示用に存在感のある等幅寄り or グロテスク、本文に可読性の高いもの。
  （Inter / Roboto / Space Grotesk などのAIっぽい既定は避ける）
- **モーション**: ストリーミングで段階的に組み上がる様子そのものが主役のモーション。
  スケルトン→実体への遷移を丁寧に見せる（OpenUIの forward reference を体験に活かす）。
- **記憶に残る一点**: 「プロンプトを打つと、設計図が組み上がるように自分のUIが生成される」体験。

---

## 4. デザインシステム（自作Library）の構成

「契約」として最小十分なコンポーネント集合を定義する。
各コンポーネントは Zod スキーマ（props）+ React レンダラ + description を持つ。

| Component | props（Zodで定義） | 用途 |
| --- | --- | --- |
| Stack | children[] | 縦積みレイアウト（root候補） |
| Grid | children[], columns? | グリッドレイアウト |
| TextContent | text, variant | 見出し・本文 |
| StatCard | label, value, trend? | 数値の実績（年数・件数など） |
| ProjectCard | title, description, tags[], link? | 実績カード（Workと共用） |
| Timeline | items[] | 経歴・プロセスの時系列 |
| SkillBar | label, level | スキルの度合い |
| Callout | text, tone | 強調・補足 |

description には「いつこのコンポーネントを使うべきか」をLLM向けに明記する
（= プロンプトジェネレータが拾う指示）。これがデザインシステムのドキュメント運用に相当。

---

## 5. 技術スタックと構成

- **Next.js (App Router) + TypeScript**: APIキーをサーバー側に隠すため Route Handler が必要
- `@openuidev/react-lang`: defineComponent / createLibrary / Renderer / parser（必須）
- `@openuidev/react-headless`（任意）: チャット状態管理が欲しくなったら
- `zod`: props スキーマ
- LLMプロバイダ: OpenAI互換（OpenAI / OpenRouter / Anthropic via proxy のいずれか）

```
app/
  layout.tsx
  page.tsx                 # 静的セクション + GenUI Demo を配置
  api/genui/route.ts       # サーバー側でLLMを叩きOpenUI Langをストリーム
lib/
  library.tsx              # 自作デザインシステム（defineComponent群 + createLibrary）
  library.node.ts          # renderer=null版（プロンプト生成専用・サーバー用）
components/
  ds/                      # 各コンポーネントのReact実装（StatCard等）
  GenUIDemo.tsx            # プロンプト入力 + <Renderer/>
  sections/                # Hero, Thesis, Workflow, Work, About
styles/
  tokens.css               # デザイントークン（色・余白・タイポ）
```

### セキュリティ/運用上の重要点
- APIキーは **必ず** サーバー側（Route Handler / 環境変数）。クライアントに出さない。
- 静的ホスティング単体ではLLM呼び出し不可。Vercel等のサーバー関数が前提。
- LLM出力（OpenUI Lang）は Library の JSON Schema で検証され、未知コンポーネントは
  描画されない。これがデザインシステムを「ガードレール」として効かせる仕組み。

---

## 6. 実装フェーズ

1. デザイントークン定義（tokens.css）
2. DSコンポーネント実装（components/ds/）
3. Library定義（lib/library.tsx + library.node.ts）
4. Route Handler（app/api/genui/route.ts）
5. GenUIDemo（プロンプト入力 + Renderer + ストリーミング受信）
6. 静的セクション（Hero / Thesis / Workflow / Work / About）
7. ページ統合（page.tsx）
