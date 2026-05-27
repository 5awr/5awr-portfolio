import React from "react";
import { ProjectCard } from "@/components/ds";
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siGooglegemini,
  siZod,
  siPnpm,
} from "simple-icons";

/* ============================================================
   Static sections
   Work では GenUI デモと同じ ProjectCard を使う
   = 静的UIとAI生成UIが同じデザインシステムから生えている証拠。
   ============================================================ */

export function Hero() {
  return (
    <header className="hero">
      <span className="hero__eyebrow">// design engineer · design systems × ai implementation</span>
      <h1 className="hero__title">
        デザインシステムは、<br />
        <em>AIによるUI生成</em>の基盤である。
      </h1>
      <p className="hero__lede">
        私はデザインシステムを設計・運用し、その「契約」をAIに渡すことで、
        フロントエンド実装までを自動化するフローを構築します。
        このサイト自体が、その実証です。
      </p>

      <div className="hero__chain">
        <div className="hero__node">
          <span className="hero__node-k">01</span>
          <span className="hero__node-t">デザインシステムを設計・運用する</span>
        </div>
        <div className="hero__arrow">↓ だから</div>
        <div className="hero__node">
          <span className="hero__node-k">02</span>
          <span className="hero__node-t">コンポーネント集合を「契約」としてAIに渡せる</span>
        </div>
        <div className="hero__arrow">↓ だから</div>
        <div className="hero__node hero__node--accent">
          <span className="hero__node-k">03</span>
          <span className="hero__node-t">LLMが破綻なく動的UIを組む ＝ 実装の自動化</span>
        </div>
      </div>
    </header>
  );
}

export function Thesis() {
  return (
    <section className="block" id="thesis">
      <span className="block__eyebrow">// the thesis</span>
      <h2 className="block__title">なぜ「デザインシステム」が起点なのか</h2>
      <div className="thesis__grid">
        <div className="thesis__col">
          <h3>制約こそが品質を生む</h3>
          <p>
            生成AIに自由にHTMLを書かせると、トーンも構造も毎回ぶれます。
            OpenUIのLibraryは「使ってよいコンポーネント」をZodスキーマで厳密に定義し、
            それ以外をLLMに生成させません。許可した部品しか出てこない。
          </p>
        </div>
        <div className="thesis__col">
          <h3>ドキュメントがそのままプロンプトになる</h3>
          <p>
            各コンポーネントの <code>description</code> は、人間向けの利用ガイドであり、
            同時に <code>library.prompt()</code> でAI向けのシステムプロンプトへ変換されます。
            デザインシステムの運用が、そのままAIの精度に直結します。
          </p>
        </div>
        <div className="thesis__col">
          <h3>静的UIと生成UIが地続きになる</h3>
          <p>
            このサイトのWork欄のカードと、AIが生成するカードは
            <strong>同一のコンポーネント</strong>です。
            手で置いても、AIが組んでも、出力は同じシステムから生まれる——
            それが「基盤」という言葉の意味です。
          </p>
        </div>
      </div>
    </section>
  );
}

const WORKFLOW = [
  { k: "STEP 01", t: "デザインシステムを構築", d: "トークン → プリミティブ → コンポーネント。Zodで型とpropsの契約を定義。" },
  { k: "STEP 02", t: "プロンプトを自動生成", d: "library.prompt() がコンポーネント署名・構文規則・例を含むシステムプロンプトを出力。" },
  { k: "STEP 03", t: "LLMがOpenUI Langを生成", d: "ユーザー入力に応じ、許可された部品だけで構造化UIをストリーム出力。" },
  { k: "STEP 04", t: "Rendererが段階描画", d: "1行ずつパースし、未定義参照はスケルトンで先行表示。実装がひとりでに完成していく。" },
];

export function Workflow() {
  return (
    <section className="block" id="workflow">
      <span className="block__eyebrow">// the automation flow</span>
      <h2 className="block__title">設計から実装までを、AIで自動化する</h2>
      <div className="flow">
        {WORKFLOW.map((s, i) => (
          <div className="flow__step" key={i}>
            <span className="flow__k">{s.k}</span>
            <h3 className="flow__t">{s.t}</h3>
            <p className="flow__d">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Atlas Design System",
    description: "トークンと60コンポーネントを4つのプロダクトチームへ供給。運用ドキュメントを整備。",
    tags: ["Design System", "Tokens", "TypeScript"],
  },
  {
    title: "GenUI Pipeline",
    description: "このサイト。LLMがOpenUI Langをストリームし、デザインシステムが描画する。",
    tags: ["OpenUI", "Streaming", "TypeScript"],
  },
  {
    title: "Spec-to-Code",
    description: "Figmaの仕様から型付きコンポーネントをコード生成し、ハンドオフ時間を約40%短縮。",
    tags: ["Codegen", "DX", "Automation"],
  },
];

export function Work() {
  return (
    <section className="block" id="work">
      <span className="block__eyebrow">// selected work</span>
      <h2 className="block__title">実績</h2>
      <p className="block__note">
        ↓ ここで使っているカードは、上のGenUIデモがAI経由で生成するものと同一のコンポーネントです。
      </p>
      <div className="work__grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} title={p.title} description={p.description} tags={p.tags} />
        ))}
      </div>
    </section>
  );
}

const TECH = [
  { icon: siNextdotjs, name: "Next.js",    note: "App Router · Edge Runtime" },
  { icon: siReact,     name: "React",      note: "v19 · Server Components" },
  { icon: siTypescript,name: "TypeScript", note: "型安全なフロントエンド" },
  { icon: siGooglegemini, name: "Gemini", note: "2.5 Flash · OpenAI互換API" },
  { icon: siZod,       name: "Zod",        note: "コンポーネントpropsの契約" },
  { icon: siPnpm,      name: "pnpm",       note: "パッケージ管理" },
];

function TechIcon({ icon, name }: { icon: { path: string; hex: string }; name: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={name}
      className="tech-icon"
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function TechStack() {
  return (
    <section className="block" id="tech">
      <span className="block__eyebrow">// built with</span>
      <h2 className="block__title">使用技術</h2>
      <ul className="tech__grid">
        {TECH.map(({ icon, name, note }) => (
          <li key={name} className="tech__item">
            <TechIcon icon={icon} name={name} />
            <span className="tech__name">{name}</span>
            <span className="tech__note">{note}</span>
          </li>
        ))}
        {/* OpenUI — simple-icons に未収録のためテキストロゴ */}
        <li className="tech__item">
          <span className="tech__text-logo" aria-label="OpenUI">UI</span>
          <span className="tech__name">OpenUI</span>
          <span className="tech__note">GenUI ストリーミングランタイム</span>
        </li>
      </ul>
    </section>
  );
}

export function About() {
  return (
    <section className="block" id="about">
      <span className="block__eyebrow">// about</span>
      <h2 className="block__title">プロフィール</h2>
      <div className="about__grid">
        <p>
          デザインとエンジニアリングの境界で働くデザインエンジニア。
          デザインシステムの構築・運用と、それを基盤にしたAIによる実装自動化を専門にしています。
          主言語はTypeScript。
        </p>
        <div className="about__contact">
          <a href="mailto:hello@example.com" className="about__link">hello@example.com</a>
          <a href="https://github.com/" className="about__link" target="_blank" rel="noreferrer">GitHub →</a>
          <a href="https://www.openui.com" className="about__link" target="_blank" rel="noreferrer">Built with OpenUI →</a>
        </div>
      </div>
    </section>
  );
}
