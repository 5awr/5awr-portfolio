# Design Engineer Portfolio — Design Systems × AI Implementation

デザインシステムを基盤に、フロントエンド実装までをAIで自動化するフローを実証する
デザインエンジニアのポートフォリオ。[OpenUI](https://www.openui.com)（thesys版）による
動的生成UIを実装している。

## コアの主張

> **デザインシステムは、AIによるUI生成の基盤である。**

訪問者がプロンプトを入力すると、サイトが「このポートフォリオ専用に定義した
デザインシステムのコンポーネントだけ」を使って回答UIをストリーミングで組み立てる。
静的なWork欄のカードと、AIが生成するカードは**同一のコンポーネント**——
手で置いてもAIが組んでも、出力は同じシステムから生まれる。

## アーキテクチャ（OpenUI 4ブロック）

```
[自作デザインシステム Library]  lib/library.tsx (+ library.node.ts)
  defineComponent × N + createLibrary
        │  library.prompt()
        ▼
[System Prompt]
        │  POST /api/genui  (app/api/genui/route.ts — APIキーはサーバー側)
        ▼
[LLM]  → OpenUI Lang をストリーム出力
        │
        ▼  <Renderer library response isStreaming />  (components/GenUIDemo.tsx)
[Live UI]  ← 自作コンポーネントで段階的レンダリング
```

## セットアップ

```bash
pnpm install
cp .env.example .env       # OPENAI_API_KEY を設定（OpenAI互換でOK）
pnpm dev                   # http://localhost:3000
```

> APIキーは必ずサーバー側のみ。`NEXT_PUBLIC_` を付けないこと。
> 静的ホスティング単体ではLLM呼び出しはできない（Vercel等のサーバー関数が前提）。

## 主要ファイル

| パス | 役割 |
| --- | --- |
| `lib/library.tsx` | デザインシステム ＝ AIへの契約（レンダラ付き・クライアント用） |
| `lib/library.node.ts` | 同上のレンダラなし版（サーバーのプロンプト生成用） |
| `components/ds/index.tsx` | DSコンポーネントのReact実装（静的/生成の両方で共用） |
| `app/api/genui/route.ts` | サーバー側でLLMを叩きOpenUI Langをストリーム返却 |
| `components/GenUIDemo.tsx` | プロンプト入力 + `<Renderer/>` |
| `components/sections/` | 静的セクション（Work は同じ ProjectCard を再利用） |
| `styles/tokens.css` | デザイントークン（単一の真実） |

## 運用 Tips

```bash
pnpm genprompt             # DSから生成されるシステムプロンプトを確認
```

コンポーネントを追加・変更すると、`description` と Zod スキーマを通じて
AIへの指示（システムプロンプト）が自動更新される。
**デザインシステムの運用が、そのままAIの精度管理になる。**

## バージョン注記

OpenUI（`@openuidev/*`）は活発に更新されているため、`pnpm install` 時に
`@openuidev/react-lang` の最新の `Renderer` / `defineComponent` シグネチャを
[公式ドキュメント](https://www.openui.com/docs/openui-lang) で確認すること。
本実装は npm 公開版（`react-lang@0.2.6` / `lang-core@0.2.5` / `react-headless@0.8.2`）で
型チェック・本番ビルドの通過を確認済み。API は `createLibrary({ root, components })` /
`library.prompt()` / `<Renderer library response isStreaming />` を使用し、
レイアウトコンポーネントの子要素は `renderNode()` で描画している。
zod は `zod/v4` サブパスからインポートする点に注意。
