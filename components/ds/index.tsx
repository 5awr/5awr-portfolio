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

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="ds-stat">
      <div className="ds-stat__label">{label}</div>
      <div className="ds-stat__value">{value}</div>
    </div>
  );
}

export type ProjectDetail = { description: string; role: string; achievement: string };

export function ProjectCard({
  title,
  description,
  tags = [],
  link,
  detail,
}: {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  detail?: ProjectDetail;
}) {
  return (
    <div className="ds-project">
      <div className="ds-project__stack">
        <div className="ds-project__front">
          <h3 className="ds-project__title">{title}</h3>
          <p className="ds-project__desc">{description}</p>
          <div className="ds-project__tags">
            {tags.map((t) => (
              <span className="ds-tag" key={t}>{t}</span>
            ))}
          </div>
          {link && (
            <a className="ds-project__link" href={link} target="_blank" rel="noreferrer">
              View case study →
            </a>
          )}
        </div>
        {detail && (
          <div className="ds-project__detail">
            <p className="ds-project__detail-desc">{detail.description}</p>
            <dl className="ds-project__dl">
              <dt>担当</dt>
              <dd>{detail.role}</dd>
              <dt>主な成果</dt>
              <dd>{detail.achievement}</dd>
            </dl>
          </div>
        )}
      </div>
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
