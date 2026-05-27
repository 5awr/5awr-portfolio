import Link from "next/link";
import {
  TextContent,
  StatCard,
  ProjectCard,
  TagList,
  Timeline,
  Callout,
  Stack,
  Grid,
} from "@/components/ds";

export const metadata = {
  title: "Design System — xenoMateria",
  description: "Component library and design tokens for this portfolio.",
};

/* ---- helpers ---- */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="ds-page__section" id={id}>
      <h2 className="ds-page__section-title">{title}</h2>
      {children}
    </section>
  );
}

function Token({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="ds-page__token">
      {preview && <div className="ds-page__token-preview">{preview}</div>}
      <code className="ds-page__token-name">{name}</code>
      <span className="ds-page__token-value">{value}</span>
    </div>
  );
}

function Swatch({ name, value, variable }: { name: string; value: string; variable: string }) {
  return (
    <div className="ds-page__swatch">
      <div className="ds-page__swatch-color" style={{ background: `var(${variable})` }} />
      <code className="ds-page__token-name">{variable}</code>
      <span className="ds-page__token-value">{value}</span>
      <span className="ds-page__token-label">{name}</span>
    </div>
  );
}

function ComponentPreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ds-page__preview">
      <div className="ds-page__preview-label">{label}</div>
      <div className="ds-page__preview-canvas">{children}</div>
    </div>
  );
}

/* ---- page ---- */
export default function DesignSystemPage() {
  return (
    <main className="ds-page">
      <header className="ds-page__header">
        <Link href="/" className="ds-page__back">← portfolio</Link>
        <div>
          <h1 className="ds-page__title">Design System</h1>
          <p className="ds-page__subtitle">
            このポートフォリオとGenUIパイプラインで使用しているトークン・コンポーネント・パターン集。
          </p>
        </div>
      </header>

      {/* ======== FOUNDATIONS ======== */}
      <Section id="colors" title="Colors">
        <div className="ds-page__swatch-group">
          <p className="ds-page__group-label">Surfaces</p>
          <div className="ds-page__swatches">
            <Swatch name="Background" value="#0c0d10" variable="--color-bg" />
            <Swatch name="Elevated" value="#14161b" variable="--color-bg-elevated" />
            <Swatch name="Panel" value="#1a1d24" variable="--color-bg-panel" />
            <Swatch name="Inset" value="#0a0b0e" variable="--color-bg-inset" />
          </div>
        </div>
        <div className="ds-page__swatch-group">
          <p className="ds-page__group-label">Ink</p>
          <div className="ds-page__swatches">
            <Swatch name="Default" value="#eceef2" variable="--color-ink" />
            <Swatch name="Soft" value="#ced2db" variable="--color-ink-soft" />
            <Swatch name="Faint" value="#9199a6" variable="--color-ink-faint" />
            <Swatch name="Ghost" value="#5c6270" variable="--color-ink-ghost" />
          </div>
        </div>
        <div className="ds-page__swatch-group">
          <p className="ds-page__group-label">Accent</p>
          <div className="ds-page__swatches">
            <Swatch name="Accent" value="#52a878" variable="--color-accent" />
            <Swatch name="Accent Dim" value="#2d6649" variable="--color-accent-dim" />
          </div>
        </div>
        <div className="ds-page__swatch-group">
          <p className="ds-page__group-label">Semantic</p>
          <div className="ds-page__swatches">
            <Swatch name="Up" value="#5fd08a" variable="--color-up" />
            <Swatch name="Down" value="#e5705a" variable="--color-down" />
          </div>
        </div>
      </Section>

      <Section id="typography" title="Typography">
        <div className="ds-page__type-samples">
          <div className="ds-page__type-row">
            <span className="ds-page__type-meta">--font-display · 900 · display</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}>
              Design System
            </span>
          </div>
          <div className="ds-page__type-row">
            <span className="ds-page__type-meta">--font-display · 600 · heading</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
              Component Library
            </span>
          </div>
          <div className="ds-page__type-row">
            <span className="ds-page__type-meta">--font-body · 400 · body</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-ink-soft)" }}>
              デザインシステムは、AIによるUI生成の基盤である。
            </span>
          </div>
          <div className="ds-page__type-row">
            <span className="ds-page__type-meta">--font-mono · 400 · mono</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-ink-faint)" }}>
              const library = createLibrary(&#123; root: "Stack", components: [...] &#125;)
            </span>
          </div>
        </div>
      </Section>

      <Section id="spacing" title="Spacing">
        <div className="ds-page__spacing-list">
          {[
            { name: "--s-1", px: "4px" },
            { name: "--s-2", px: "8px" },
            { name: "--s-3", px: "12px" },
            { name: "--s-4", px: "16px" },
            { name: "--s-5", px: "24px" },
            { name: "--s-6", px: "32px" },
            { name: "--s-7", px: "48px" },
            { name: "--s-8", px: "64px" },
            { name: "--s-9", px: "96px" },
          ].map(({ name, px }) => (
            <div key={name} className="ds-page__spacing-row">
              <code className="ds-page__token-name">{name}</code>
              <div className="ds-page__spacing-bar" style={{ width: px }} />
              <span className="ds-page__token-value">{px}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="radius" title="Border Radius">
        <div className="ds-page__radius-list">
          {[
            { name: "--radius-sm", value: "4px" },
            { name: "--radius-md", value: "8px" },
            { name: "--radius-lg", value: "14px" },
          ].map(({ name, value }) => (
            <div key={name} className="ds-page__radius-row">
              <code className="ds-page__token-name">{name}</code>
              <div
                className="ds-page__radius-box"
                style={{ borderRadius: `var(${name})` }}
              />
              <span className="ds-page__token-value">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ======== COMPONENTS ======== */}
      <Section id="textcontent" title="TextContent">
        <p className="ds-page__desc">見出しと本文テキスト。variant で役割を指定する。</p>
        <ComponentPreview label="display">
          <TextContent text="Design Engineer" variant="display" />
        </ComponentPreview>
        <ComponentPreview label="heading">
          <TextContent text="Design Systems × AI" variant="heading" />
        </ComponentPreview>
        <ComponentPreview label="body">
          <TextContent text="デザインとエンジニアリングの両輪でデザインシステムを設計・構築し、AIを活用したフロントエンド実装の自動化を推進しています。" variant="body" />
        </ComponentPreview>
        <ComponentPreview label="mono">
          <TextContent text="library.prompt() → system prompt" variant="mono" />
        </ComponentPreview>
      </Section>

      <Section id="statcard" title="StatCard">
        <p className="ds-page__desc">数値メトリクス。ラベルを上、数値を大きく表示する。</p>
        <ComponentPreview label="example">
          <Grid columns={3}>
            <StatCard label="DESIGN EXPERIENCE" value="7 yrs" />
            <StatCard label="FRONTEND EXPERIENCE" value="2 yrs" />
            <StatCard label="COMPONENTS BUILT" value="20+" />
          </Grid>
        </ComponentPreview>
      </Section>

      <Section id="projectcard" title="ProjectCard">
        <p className="ds-page__desc">ポートフォリオカード。ホバーで詳細がスライドアップする。</p>
        <ComponentPreview label="hover to reveal detail">
          <ProjectCard
            title="xenoMateria"
            description="B2B SaaS xenoBrainのデザインシステム設計・運用フロー構築・実装。"
            tags={["Design System", "Tokens", "Vue", "TypeScript"]}
            detail={{
              description: "既存プロダクトのバラバラなコンポーネントを整理し、トークンとコンポーネントを定義。",
              role: "設計から実装まですべて",
              achievement: "実装の自動化基盤の構築",
            }}
          />
        </ComponentPreview>
      </Section>

      <Section id="taglist" title="TagList">
        <p className="ds-page__desc">技術・スキルをチップで並べる。label は任意。</p>
        <ComponentPreview label="example">
          <Stack>
            <TagList label="Design" items={["Figma", "UI/UX", "Atomic Design", "Tokens"]} />
            <TagList label="Engineering" items={["TypeScript", "Vue", "React", "Next.js", "Tailwind"]} />
          </Stack>
        </ComponentPreview>
      </Section>

      <Section id="timeline" title="Timeline">
        <p className="ds-page__desc">時系列リスト。キャリア歴やワークフローの表示に使う。</p>
        <ComponentPreview label="example">
          <Timeline items={[
            { when: "2024", what: "xenoMateriaデザインシステムの構築・運用" },
            { when: "2023", what: "Vue 2 → Vue 3 移行プロジェクト" },
            { when: "2022", what: "UIデザイン・フロントエンド実装を開始" },
          ]} />
        </ComponentPreview>
      </Section>

      <Section id="callout" title="Callout">
        <p className="ds-page__desc">キーメッセージや注釈の強調表示。tone で info / warn を切り替える。</p>
        <ComponentPreview label="info">
          <Callout text="デザインシステムは、AIによるUI生成の基盤である。" tone="info" />
        </ComponentPreview>
        <ComponentPreview label="warn">
          <Callout text="このコンポーネント以外はLLMが生成できません。" tone="warn" />
        </ComponentPreview>
      </Section>

      <Section id="stack-grid" title="Stack / Grid">
        <p className="ds-page__desc">レイアウトプリミティブ。Stack は縦並び、Grid はグリッド配置。</p>
        <ComponentPreview label="Stack">
          <Stack>
            <Callout text="Stack の1番目" tone="info" />
            <Callout text="Stack の2番目" tone="info" />
            <Callout text="Stack の3番目" tone="info" />
          </Stack>
        </ComponentPreview>
        <ComponentPreview label="Grid (columns=2)">
          <Grid columns={2}>
            <StatCard label="LABEL A" value="12" />
            <StatCard label="LABEL B" value="34" />
          </Grid>
        </ComponentPreview>
      </Section>
    </main>
  );
}
