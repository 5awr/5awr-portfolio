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
  "あなたの強みを3つ教えて",
  "デザインシステムとAIの関係は？",
  "これまでの実績を見せて",
  "スキルセットを可視化して",
];

function GenUIDemoInner() {
  const { messages, isRunning, processMessage } = useThread();
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
        <h2 className="genui__title">Hallo!</h2>
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

      <div className="genui__stage" aria-live="polite">
        {response && (
          <Renderer library={portfolioLibrary} response={response} isStreaming={isRunning} />
        )}
      </div>
    </section>
  );
}

export default function GenUIDemo() {
  return (
    <ChatProvider
      streamProtocol={openAIReadableStreamAdapter()}
      processMessage={async ({ messages, abortController }) => {
        return fetch("/api/genui", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: openAIMessageFormat.toApi(messages) }),
          signal: abortController.signal,
        });
      }}
    >
      <GenUIDemoInner />
    </ChatProvider>
  );
}
