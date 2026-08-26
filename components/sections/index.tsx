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
  { k: "01", t: "デザインシステムを構築", d: "このサイトで使うコンポーネントをZodで型定義し、使ってよい部品の「契約」を作る。" },
  { k: "02", t: "コンポーネント仕様をプロンプトに変換", d: "コンポーネントの定義から、AIへのシステムプロンプトを自動生成。デザインシステムの運用がAIの精度に直結する。" },
  { k: "03", t: "LLMがUIをストリーム出力", d: "あなたの質問に応じ、許可された部品だけを使って構造化UIをリアルタイムに生成する。" },
  { k: "04", t: "このページでリアルタイムに描画", d: "生成されたUIを上のデモエリアでそのまま表示。このページ自体がその動く実例。" },
];

export function Workflow() {
  return (
    <section className="block" id="workflow">
      <span className="block__eyebrow">// how this site works</span>
      <h2 className="block__title">このサイトの仕組み</h2>
      <div className="flow">
        {WORKFLOW.map((s, i) => (
          <div className="flow__step" key={i}>
            <span className="flow__k">{s.k}</span>
            <div className="flow__body">
              <h3 className="flow__t">{s.t}</h3>
              <p className="flow__d">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Design System",
    description: "B2B SaaSプロダクトのデザインシステム(token/components)設計、運用フロー構築、実装。",
    tags: ["Design System", "Tokens", "TypeScript", "Vue", "Storybook", "Figma", "Claude Code"],
    detail: {
      description: "既存プロダクトで使用されているバラバラな仕様のコンポーネントをグルーピング。必要なコンポーネントを取捨選択し、新しいコンポーネントをデザイン。TailwindCSSを導入し、色、サイズ、タイポグラフィー、スペーシングなどのプリミティブトークンおよびセマンティックトークンを定義。",
      role: "デザインシステムに関わる全て（設計から実装まで）",
      achievement: "実装の自動化基盤の構築",
    },
  },
  {
    title: "Design Efficiency",
    description: "デザインシステム導入によりデザイン工程の工数を1/5に削減。",
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
      <h2 className="block__title">ワーク</h2>
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

export function PersonalProjects() {
  return (
    <section className="block" id="personal">
      <span className="block__eyebrow">// personal work</span>
      <h2 className="block__title">個人開発</h2>
      <div className="solo-card">
        <div className="solo-card__header">
          <div className="flex items-center gap-3">
            <span className="solo-card__badge">個人開発</span>
            <span className="font-mono text-[0.76rem] text-ink-faint">2026.06 – present</span>
          </div>
          <a
            href="https://mynekko.app"
            className="solo-card__link"
            target="_blank"
            rel="noreferrer"
          >
            mynekko.app →
          </a>
        </div>
        <div className="solo-card__body">
          <div className="solo-card__left">
            <a
              href="https://mynekko.app"
              className="solo-card__ogp-link"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/mynekko-ogp.png" alt="mynekko" />
              <div className="solo-card__ogp-link__body">
                <span className="solo-card__ogp-link__name">mynekko</span>
                <span className="solo-card__ogp-link__url">mynekko.app →</span>
              </div>
            </a>
            <p className="solo-card__desc">
              ねこのイラストを SVG パーツの組み合わせと色で作るイラスト生成サービス。
              体のパーツをカスタマイズし、作成したイラストを画像でダウンロードできる。
            </p>
            <div className="solo-card__tags">
              {["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "SVG", "Vercel"].map((t) => (
                <span className="ds-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="solo-card__right">
            <dl className="solo-card__dl">
              <div>
                <dt className="solo-card__dt">役割</dt>
                <dd className="solo-card__dd">企画 · イラストレーション · デザイン · 実装 · 運用</dd>
              </div>
              <div>
                <dt className="solo-card__dt">主な機能</dt>
                <dd className="solo-card__dd">
                  <div className="solo-card__features">
                    <span className="solo-card__feature">SVG 体パーツ合成によるリアルタイムプレビュー</span>
                    <span className="solo-card__feature">カラーパレットによるカスタムカラー設定</span>
                    <span className="solo-card__feature">作成したイラストを画像でダウンロード</span>
                    <span className="solo-card__feature">SUZURI API を利用したグッズ化展開</span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="solo-card mt-4">
        <div className="solo-card__header">
          <div className="flex items-center gap-3">
            <span className="solo-card__badge">個人開発</span>
            <span className="font-mono text-[0.76rem] text-ink-faint">2026.08</span>
          </div>
          <a
            href="https://design-books-map.vercel.app"
            className="solo-card__link"
            target="_blank"
            rel="noreferrer"
          >
            design-books-map.vercel.app →
          </a>
        </div>
        <div className="solo-card__body">
          <div className="solo-card__left">
            <a
              href="https://design-books-map.vercel.app"
              className="solo-card__ogp-link"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/design-books-ogp.png" alt="レイヤーで学ぶデザイン" />
              <div className="solo-card__ogp-link__body">
                <span className="solo-card__ogp-link__name">レイヤーで学ぶデザイン</span>
                <span className="solo-card__ogp-link__url">design-books-map.vercel.app →</span>
              </div>
            </a>
            <p className="solo-card__desc">
              UX の 5 段階モデルに基づいてデザイン関連書籍を分類・紹介するサイト。
              戦略・要件・構造・骨格・表層の各レイヤーごとに書籍を整理し、学習パスを可視化。
            </p>
            <div className="solo-card__tags">
              {["Next.js", "TypeScript", "Tailwind CSS", "Vercel"].map((t) => (
                <span className="ds-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="solo-card__right">
            <dl className="solo-card__dl">
              <div>
                <dt className="solo-card__dt">役割</dt>
                <dd className="solo-card__dd">企画 · デザイン · 実装</dd>
              </div>
              <div>
                <dt className="solo-card__dt">主な機能</dt>
                <dd className="solo-card__dd">
                  <div className="solo-card__features">
                    <span className="solo-card__feature">UX 5 段階モデルによる書籍分類</span>
                    <span className="solo-card__feature">レイヤーごとの学習パス可視化</span>
                    <span className="solo-card__feature">デザイン関連書籍の紹介・案内</span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechStack() {
  return (
    <section className="block" id="tech">
      <span className="block__eyebrow">// built with</span>
      <h2 className="block__title">このサイトの使用技術</h2>
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
      <div className="about__header">
        <img src="/icon.png" alt="5awr" className="about__icon" />
        <h2 className="block__title">5awr / SAWADA Ryunosuke</h2>
      </div>
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
