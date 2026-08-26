"use client";

import React, { useState, useCallback } from "react";
import { Renderer } from "@openuidev/react-lang";
import {
  ChatProvider,
  useThread,
  openAIReadableStreamAdapter,
  openAIMessageFormat,
} from "@openuidev/react-headless";
import { portfolioLibrary } from "@/lib/library";

/* ============================================================
   GenUI Demo — このポートフォリオの主役
   ------------------------------------------------------------
   訪問者のプロンプト → /api/genui → Gemini SSE（OpenAI互換）
   → openAIAdapter が解析 → useThread でメッセージ管理
   → <Renderer/> が自作デザインシステムで段階的に描画。
   ============================================================ */

const SUGGESTIONS = [
  "どんなパーソナリティか？",
  "デザインへの考え方は？",
  "デザインシステムへのこだわりは？",
  "趣味は？",
];

function GenUIDemoInner() {
  const { messages, isRunning, processMessage, threadError } = useThread();
  const [prompt, setPrompt] = useState("");

  const lastMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const response = typeof lastMsg?.content === "string" ? lastMsg.content : "";

  const run = useCallback(
    (p: string) => {
      const text = p.trim();
      if (!text || isRunning) return;
      processMessage({ role: "user", content: text });
    },
    [isRunning, processMessage]
  );

  return (
    <section className="genui" id="genui">
      <div className="genui__head">
        <span className="genui__eyebrow">// live · generative ui</span>
        <h2 className="genui__title">Hello!</h2>
      </div>

      <form
        className="genui__bar"
        onSubmit={(e) => {
          e.preventDefault();
          run(prompt);
        }}
      >
        <span className="genui__prompt-mark">›</span>
        <input
          className="genui__input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例: あなたの強みを教えて"
          aria-label="Ask this portfolio"
          disabled={isRunning}
        />
        <button className="genui__send" type="submit" disabled={isRunning || !prompt.trim()}>
          {isRunning ? "生成中…" : "生成"}
        </button>
      </form>

      <div className="genui__chips">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            className="genui__chip"
            onClick={() => {
              setPrompt(s);
              run(s);
            }}
            disabled={isRunning}
          >
            {s}
          </button>
        ))}
      </div>

      {threadError && (
        <div className="genui__error">{threadError.message}</div>
      )}
      <div className="genui__stage" aria-live="polite">
        {isRunning && !response ? (
          <div className="genui__skeleton">
            <div className="ds-skeleton" style={{ height: 28, width: "55%", marginBottom: 16 }} />
            <div className="ds-skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
            <div className="ds-skeleton" style={{ height: 16, width: "65%", marginBottom: 24 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="ds-skeleton" style={{ height: 88 }} />
              <div className="ds-skeleton" style={{ height: 88 }} />
            </div>
          </div>
        ) : response ? (
          <Renderer library={portfolioLibrary} response={response} isStreaming={isRunning} />
        ) : null}
      </div>
    </section>
  );
}

export default function GenUIDemo() {
  return (
    <ChatProvider
      streamProtocol={openAIReadableStreamAdapter()}
      processMessage={async ({ messages, abortController }) => {
        const res = await fetch("/api/genui", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: openAIMessageFormat.toApi(messages.slice(-1)) }),
          signal: abortController.signal,
        });
        if (res.status === 403 || res.status === 429) {
          throw new Error("リクエストが多すぎます。しばらく待ってから試してください。");
        }
        return res;
      }}
    >
      <GenUIDemoInner />
    </ChatProvider>
  );
}
