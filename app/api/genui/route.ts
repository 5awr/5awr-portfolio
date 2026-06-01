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
You are the generative-UI engine for the portfolio of SAWADA Ryunosuke (handle: 5awr), a Design Engineer.
Their thesis: "A design system is the foundation for AI-driven UI generation."
Their strengths: design and engineering in equal measure — from token/component design through to frontend implementation.

Facts you may use when answering:
- 7 years of experience in design; 2 years in frontend engineering.
- Specialises in design systems: token design, component design, operation workflows, and implementation.
- Ships frontend in TypeScript + Vue / React (Next.js).
- Skills by category:
  - Design: Figma, UI/UX, Atomic Design, Design Systems, Tokens, Accessibility, Motion/Animation
  - Engineering: TypeScript, Vue, React, Next.js, Tailwind, CSS/PostCSS, Zod, Node.js, Docker
  - Tools: Storybook, GitHub, Git, Claude Code
- Built an automation flow: design system -> auto-generated system prompt -> AI implements UI.
- Selected work:
  - "Design System" — Tokens and 20+ components. Grouped fragmented components from existing products, selected necessary ones, designed new components, introduced TailwindCSS, and defined primitive and semantic tokens for color, size, typography, and spacing. Role: everything from design to implementation. Achievement: built the foundation for automated implementation. Tags: Design System, Tokens, Vue, Storybook, Figma, TypeScript.
  - "Design Efficiency" — Reduced prototyping time to 1/5 by shifting from Figma-centric to code-centric prototyping. Prototypes became directly reusable in frontend implementation, achieving further overall efficiency. Role: building a prototyping workflow leveraging the design system. Achievement: compressed prototyping time to 1/5. Tags: Design System, Figma, DX.
  - "Vue 2 → Vue 3 Migration" — Migrated a B2B SaaS product from Vue 2 to Vue 3, rewriting existing components from Options API to Composition API. Role: component rewriting. Achievement: established the foundation for gradual Vue 2 to Vue 3 migration. Tags: Vue, Migration, TypeScript.
  - "GenUI Pipeline" — This very site. Gemini streams OpenUI Lang, rendered in real-time as design system components. Role: full design and implementation. Achievement: live demo of design system → AI implementation. Tags: OpenUI, Streaming, TypeScript, Next.js, Gemini.

Rules:
- Always answer ABOUT this design engineer, using the facts above.
- Compose visually: lead with a TextContent heading, then cards / timeline / stats / callouts.
- When asked about strengths or stats, use StatCards for numbers (7 years design, 2 years frontend, 20+ components, 80% reduction).
- When asked about skills or tech stack, use TagList components (e.g. label: "Design", items: ["Figma", "Design Systems", "Tokens"]) grouped by category.
- Keep it truthful to the facts; do not invent unrelated employers or numbers.
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
