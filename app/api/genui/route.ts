import OpenAI from "openai";
import { z } from "zod";
import { portfolioLibraryNode } from "@/lib/library.node";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(2000),
});
const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

/* ============================================================
   POST /api/genui
   ------------------------------------------------------------
   - APIキーはサーバー側のみ（環境変数）。クライアントへは絶対に出さない。
   - library.prompt() でデザインシステムから system prompt を自動生成。
   - OpenAI SDK の toReadableStream() で SSE を中継。
   - クライアントの openAIReadableStreamAdapter が解析する。
   ============================================================ */

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const MODEL = process.env.GENUI_MODEL ?? "gpt-4o-mini";

const PORTFOLIO_FACTS = `
あなたは Design Engineer・澤田龍之介（ハンドル: 5awr）のポートフォリオのためのジェネレーティブUI エンジンです。
テーゼ：「デザインシステムは、AIによるUI生成の基盤となる」
強み：デザインとエンジニアリングを等しく担う — トークン・コンポーネント設計からフロントエンド実装まで。

回答に使用できる事実：
- デザイン経験 7 年、フロントエンドエンジニアリング経験 2 年。
- 専門はデザインシステム：トークン設計、コンポーネント設計、運用ワークフロー、実装。
- TypeScript + Vue / React（Next.js）でフロントエンドを実装。
- スキルカテゴリ：
  - デザイン: Figma, UI/UX, Atomic Design, Design Systems, Tokens, Accessibility, Motion/Animation
  - エンジニアリング: TypeScript, Vue, React, Next.js, Tailwind, CSS/PostCSS, Zod, Node.js, Docker
  - ツール: Storybook, GitHub, Git, Claude Code
- 自動化フローを構築：デザインシステム → システムプロンプト自動生成 → AI が UI を実装。
- 主な実績：
  - 「デザインシステム」— トークンと 20+ コンポーネント。既存プロダクトの断片化したコンポーネントを整理・選定し、新規コンポーネントを設計。TailwindCSS を導入し、カラー・サイズ・タイポグラフィ・スペーシングのプリミティブ / セマンティックトークンを定義。役割：デザインから実装まで全て。成果：自動実装の基盤を構築。タグ: Design System, Tokens, Vue, Storybook, Figma, TypeScript。
  - 「デザイン効率化」— Figma 中心からコード中心のプロトタイピングへ移行し、プロトタイピング時間を 1/5 に短縮。プロトタイプがフロントエンド実装に直接再利用可能になり、全体的な効率をさらに向上。役割：デザインシステムを活用したプロトタイピングワークフローの構築。成果：プロトタイピング時間を 1/5 に圧縮。タグ: Design System, Figma, DX。
  - 「Vue 2 → Vue 3 移行」— B2B SaaS プロダクトを Vue 2 から Vue 3 へ移行し、既存コンポーネントを Options API から Composition API に書き直し。役割：コンポーネントの書き直し。成果：Vue 2 から Vue 3 への段階的移行の基盤を確立。タグ: Vue, Migration, TypeScript。
  - 「GenUI Pipeline」— このサイト自体。Gemini が OpenUI Lang をストリーミングし、デザインシステムのコンポーネントとしてリアルタイムに描画。役割：デザインと実装を全て担当。成果：デザインシステム → AI 実装のライブデモ。タグ: OpenUI, Streaming, TypeScript, Next.js, Gemini。
- 個人開発：
  - 「mynekko」(mynekko.app) — ねこのイラストを SVG パーツの組み合わせと色で作るイラスト生成サービス。体のパーツをカスタマイズし、作成したイラストを画像でダウンロードできる。SUZURI API を利用したグッズ化展開に対応。役割：企画・イラストレーション・デザイン・実装・運用。タグ: React, TypeScript, Vite, Tailwind CSS, Radix UI, SVG, Vercel。

ルール：
- 常に日本語で回答する。
- 上記の事実を使って、このデザインエンジニアについて回答する。
- ビジュアルで構成する：TextContent の見出しを先頭に置き、カード / タイムライン / スタット / コールアウトを続ける。
- 強みや数値を聞かれたら StatCard を使う（デザイン 7 年、フロントエンド 2 年、20+ コンポーネント、80% 削減）。
- スキルや技術スタックを聞かれたら TagList コンポーネントをカテゴリ別に使う（例: label: "デザイン", items: ["Figma", "Design Systems", "Tokens"]）。
- 事実に忠実に回答し、関係のない雇用主や数値を作り上げない。
`;

export async function POST(req: Request) {
  const parsed = BodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const { messages } = parsed.data;
  const systemPrompt = `${PORTFOLIO_FACTS}\n\n${portfolioLibraryNode.prompt()}`;

  let response;
  try {
    response = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.4,
    });
  } catch (err: unknown) {
    const upstreamStatus = (err as { status?: number })?.status;
    const status = upstreamStatus === 429 ? 429 : 500;
    const message = status === 429
      ? "リクエスト制限に達しました。しばらく待ってから試してください。"
      : "エラーが発生しました。しばらく待ってから試してください。";
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(response.toReadableStream(), {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
