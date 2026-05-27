import React from "react";
import { ProjectCard } from "@/components/ds";
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siGooglegemini,
  siZod,
  siPnpm,
  siGithub,
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
    title: "xenoMateria",
    description: "B2B SaaS xenoBrainのデザインシステム(token/components)設計、運用フロー構築、実装。",
    tags: ["Design System", "Tokens", "TypeScript", "Vue", "Storybook", "Figma", "Claude Code"],
    detail: {
      description: "既存プロダクトで使用されているバラバラな仕様のコンポーネントをグルーピング。必要なコンポーネントを取捨選択し、新しいコンポーネントをデザイン。TailwindCSSを導入し、色、サイズ、タイポグラフィー、スペーシングなどのプリミティブトークンおよびセマンティックトークンを定義。",
      role: "デザインシステムに関わる全て（設計から実装まで）",
      achievement: "実装の自動化基盤の構築",
    },
  },
  {
    title: "Design Efficiency",
    description: "xenoMateria導入によりデザイン工程の工数を1/5に削減。",
    tags: ["Design System", "Figma", "DX"],
    detail: {
      description: "旧来のFigma中心のフローからコード中心のプロトタイピングに移行することにより、アイデアを形にする時間を1/5に圧縮。また、プロトタイプはほとんどそのままフロントエンド実装に流用できるようになり、全体としては更なる効率化が実現された。",
      role: "デザインシステムを活用したプロトタイピングフローの構築",
      achievement: "プロトタイピングの時間を1/5に圧縮",
    },
  },
  {
    title: "Vue 2 → Vue 3 Migration",
    description: "B2B SaaSプロダクトのVue 2→Vue 3移行。",
    tags: ["Vue", "Migration", "TypeScript"],
    detail: {
      description: "Vue2からVue3への移行にあたり、既存コンポーネントを旧来のOptions APIからComposition APIへの書き換え。",
      role: "コンポーネントの書き換え",
      achievement: "Vue2からVue3への段階的移行の足がかり",
    },
  },
  {
    title: "GenUI Pipeline",
    description: "このサイト。LLMがOpenUI Langをストリームし、デザインシステムが描画する。",
    tags: ["OpenUI", "Streaming", "TypeScript", "Next.js", "Gemini"],
    detail: {
      description: "このサイト自体。LLMがOpenUI Langをストリームし、デザインシステムのコンポーネントとしてリアルタイムに描画する。",
      role: "設計・実装すべて",
      achievement: "デザインシステム → AI実装のライブデモ",
    },
  },
];

export function Work() {
  return (
    <section className="block" id="work">
      <span className="block__eyebrow">// selected work</span>
      <h2 className="block__title">実績</h2>
<div className="work__grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} title={p.title} description={p.description} tags={p.tags} detail={p.detail} />
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

const COLORS = [
  "--color-bg", "--color-bg-elevated", "--color-bg-panel",
  "--color-accent", "--color-accent-dim",
  "--color-ink", "--color-ink-soft", "--color-ink-faint",
  "--color-up", "--color-down",
];

const COMPONENTS = ["Stack", "Grid", "TextContent", "StatCard", "ProjectCard", "TagList", "Timeline", "Callout"];

export function DesignSystemLink() {
  return (
    <section className="block" id="design-system-link">
      <span className="block__eyebrow">// design system</span>
      <a href="/design-system" className="ds-link-card">
        <div className="ds-link-card__left">
          <h2 className="ds-link-card__title">Design System</h2>
          <p className="ds-link-card__desc">トークン・コンポーネント一覧</p>
          <span className="ds-link-card__cta">View →</span>
        </div>
        <div className="ds-link-card__right">
          <div className="ds-link-card__swatches">
            {COLORS.map((v) => (
              <div key={v} className="ds-link-card__swatch" style={{ background: `var(${v})` }} />
            ))}
          </div>
          <div className="ds-link-card__chips">
            {COMPONENTS.map((c) => (
              <span key={c} className="ds-tag">{c}</span>
            ))}
          </div>
        </div>
      </a>
    </section>
  );
}

export function About() {
  return (
    <section className="block" id="about">
      <span className="block__eyebrow">// about</span>
      <h2 className="block__title">5awr / SAWADA Ryunosuke</h2>
      <div className="about__grid">
        <p>
          デザインとエンジニアリングの両輪でデザインシステムを設計・構築し、AIを活用したフロントエンド実装の自動化を推進しています。
        </p>
        <div className="about__contact">
          <a href="https://github.com/5awr" className="about__link" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }}>
              <path d={siGithub.path} />
            </svg>
            5awr
          </a>
          <a href="https://www.openui.com" className="about__link" target="_blank" rel="noreferrer">Built with OpenUI →</a>
        </div>
      </div>
    </section>
  );
}
