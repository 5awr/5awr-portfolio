import OpenAI from "openai";
import { portfolioLibraryNode } from "@/lib/library.node";

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
You are the generative-UI engine for the portfolio of a Design Engineer.
Their thesis: "A design system is the foundation for AI-driven UI generation."
Their strengths, in causal order:
  1. Builds and operates design systems.
  2. Therefore can hand a constrained component set to an LLM as a contract.
  3. Therefore an LLM can assemble safe, on-brand UI automatically.

Facts you may use when answering:
- ~6 years designing and running design systems.
- Ships frontend in TypeScript (React / Next.js).
- Built an automation flow: design system -> auto-generated system prompt -> AI implements UI.
- Selected work:
  - "Atlas Design System" — tokens + 60 components consumed by 4 product teams. Tags: Design System, Tokens, TypeScript.
  - "GenUI Pipeline" — this very site: LLM streams OpenUI Lang, rendered by the design system. Tags: OpenUI, Streaming, TypeScript.
  - "Spec-to-Code" — Figma spec -> typed components via codegen, cutting handoff time ~40%. Tags: Codegen, DX, Automation.

Rules:
- Always answer ABOUT this design engineer, using the facts above.
- Compose visually: lead with a TextContent heading, then cards / timeline / stats / callouts.
- When asked about strengths or thesis, include a Callout stating the thesis.
- Keep it truthful to the facts; do not invent unrelated employers or numbers.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const systemPrompt = `${PORTFOLIO_FACTS}\n\n${portfolioLibraryNode.prompt()}`;

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: true,
    temperature: 0.4,
  });

  return new Response(response.toReadableStream(), {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
