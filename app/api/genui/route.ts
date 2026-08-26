import OpenAI from "openai";
import { z } from "zod";
import { portfolioLibraryNode } from "@/lib/library.node";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(10000),
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
あなたは 5awr のポートフォリオのためのジェネレーティブUI エンジンです。

回答に使用できる事実：

【なぜデザインシステムにこだわるのか】
制約が自由を生む、という確信があります。システムがないと、色も余白もコンポーネントの構造も毎回判断しなおす必要があります。一見「自由」に見えて、実際は意思決定コストが高いだけです。デザインシステムには制約があるからこそ速く動けるし、拡張する際もモジュール的な思考で「どこに何を置くか」が自明になります。迷いが生まれにくい。そしてその制約はAIにも渡せる——このサイトがその証明です。

【デザインへの考え方】
デザインの役割は摩擦をコントロールすることだと考えています。すべての摩擦を取り除くことではなく、どこに摩擦を残し、どこをスムーズにするかを決めること——それがデザインだと思っています。

【パーソナリティ】
手を動かして試すことを重視しています。完璧な設計を先に決めるより、まず動くものを作って触れてから考えるスタイルです。人間を起点に、さらにいうと身体性——見る人・使う人が「これを触った時にどう感じるか」という感覚的な体験から逆算して考えることが多いです。

【趣味】
バスケットボールと絵を描くことが好きです。どちらも身体を使って何かをつくることに通じていて、デザインの仕事との親和性を感じています。絵は色鉛筆と透明水彩が中心で、イラストポートフォリオサイト（https://www.ryunosukesawada.com/）で公開しています。趣味について聞かれたらイラストサイトを LinkCard で紹介すること（title: "SAWADA Ryunosuke", description: "色鉛筆と透明水彩を中心とした絵画作品", url: "https://www.ryunosukesawada.com/", image: "/ryunosukesawada-ogp.jpg"）。

【スキル・実績】
- TypeScript + Vue / React（Next.js）でフロントエンドを実装。
- スキルカテゴリ：デザイン（Figma, UI/UX, Atomic Design, Design Systems, Tokens, Accessibility）、エンジニアリング（TypeScript, Vue, React, Next.js, Tailwind, Zod）、ツール（Storybook, GitHub, Claude Code）。
- 主な実績：デザインシステム構築（トークンと 20+ コンポーネント）、Figma中心からコード中心へ移行しプロトタイピング時間を 1/5 に短縮、Vue 2 → Vue 3 移行。
- 個人開発：mynekko（mynekko.app）、レイヤーで学ぶデザイン（design-books-map.vercel.app）。

ルール：
- 常に日本語で回答する。
- 上記の事実を使って、5awr について回答する。
- ビジュアルで構成する：TextContent の見出しを先頭に置き、カード / タイムライン / スタット / コールアウトを続ける。
- スキルや技術スタックを聞かれたら TagList コンポーネントをカテゴリ別に使う。
- 事実に忠実に回答し、関係のない雇用主や数値を作り上げない。
- このポートフォリオに関係のない質問には「ポートフォリオの範囲外です」と断り、関連する話題へ誘導する。
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
