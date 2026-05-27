import React from "react";

/* ============================================================
   Design System — React presentation components
   ここは「見た目」だけ。OpenUI の defineComponent からも、
   静的セクションからも同じものを import して使う。
   ============================================================ */

export type TextVariant = "display" | "heading" | "body" | "mono";
export function TextContent({ text, variant = "body" }: { text: string; variant?: TextVariant }) {
  const Tag = variant === "display" ? "h1" : variant === "heading" ? "h2" : "p";
  return React.createElement(Tag, { className: `ds-text ds-text--${variant}` }, text);
}

export function Stack({ children }: { children?: React.ReactNode }) {
  return <div className="ds-stack">{children}</div>;
}

export function Grid({ children, columns = 2 }: { children?: React.ReactNode; columns?: number }) {
  return (
    <div className="ds-grid" style={{ ["--cols" as string]: columns }}>
      {children}
    </div>
  );
}

export type Trend = "up" | "down" | "flat";
export function StatCard({ label, value, trend = "flat" }: { label: string; value: string; trend?: Trend }) {
  const mark = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";
  return (
    <div className="ds-stat">
      <div className="ds-stat__value">{value}</div>
      <div className="ds-stat__label">{label}</div>
      <div className={`ds-stat__trend ds-stat__trend--${trend}`}>
        {mark} {trend}
      </div>
    </div>
  );
}

export function ProjectCard({
  title,
  description,
  tags = [],
  link,
}: {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
}) {
  return (
    <div className="ds-project">
      <h3 className="ds-project__title">{title}</h3>
      <p className="ds-project__desc">{description}</p>
      <div className="ds-project__tags">
        {tags.map((t) => (
          <span className="ds-tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      {link ? (
        <a className="ds-project__link" href={link} target="_blank" rel="noreferrer">
          View case study →
        </a>
      ) : null}
    </div>
  );
}

export type TimelineItem = { when: string; what: string };
export function Timeline({ items = [] }: { items?: TimelineItem[] }) {
  return (
    <div className="ds-timeline">
      {items.map((it, i) => (
        <div className="ds-timeline__item" key={i}>
          <div className="ds-timeline__when">{it.when}</div>
          <div className="ds-timeline__what" dangerouslySetInnerHTML={{ __html: it.what }} />
        </div>
      ))}
    </div>
  );
}

export function TagList({ label, items = [] }: { label?: string; items?: string[] }) {
  return (
    <div className="ds-taglist">
      {label && <div className="ds-taglist__label">{label}</div>}
      <div className="ds-taglist__chips">
        {items.map((item) => (
          <span className="ds-tag" key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export type CalloutTone = "info" | "warn";
export function Callout({ text, tone = "info" }: { text: string; tone?: CalloutTone }) {
  return <div className={`ds-callout ds-callout--${tone}`}>{text}</div>;
}
