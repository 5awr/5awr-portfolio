"use client";

import React from "react";
import { z } from "zod/v4";
import { defineComponent, createLibrary } from "@openuidev/react-lang";
import {
  Stack,
  Grid,
  TextContent,
  StatCard,
  ProjectCard,
  Timeline,
  TagList,
  Callout,
  LinkCard,
} from "@/components/ds";

/* ============================================================
   OpenUI Library — 自作デザインシステムの「AIへの契約」
   ------------------------------------------------------------
   このファイルが本ポートフォリオの主張の核心。
   - props は Zod スキーマで定義 → LLM出力は必ずこのスキーマで検証される
   - description は LLM への「使用ガイドライン」= DSのドキュメント運用に相当
   - createLibrary に渡したコンポーネント以外、LLMは絶対に生成できない
   → デザインシステムが整っているほど、生成UIの品質と安全性が上がる。
   ============================================================ */

/* ---- Leaf / content components ---- */

const TextContentDef = defineComponent({
  name: "TextContent",
  description:
    "Headings or body copy. variant 'display' for the single biggest title, 'heading' for section titles, 'body' for paragraphs, 'mono' for technical labels.",
  props: z.object({
    text: z.string().describe("The text to display"),
    variant: z
      .enum(["display", "heading", "body", "mono"])
      .describe("Visual role of the text"),
  }),
  component: ({ props }) => <TextContent text={props.text} variant={props.variant} />,
});

const StatCardDef = defineComponent({
  name: "StatCard",
  description:
    "A single headline metric (years of experience, projects shipped, % faster, etc). Use inside a Grid when showing multiple stats.",
  props: z.object({
    label: z.string().describe("Short uppercase-style label, e.g. 'YEARS DESIGNING SYSTEMS'"),
    value: z.string().describe("The metric value, e.g. '7 years' or '20+'"),
  }),
  component: ({ props }) => (
    <StatCard label={props.label} value={props.value} />
  ),
});

const ProjectCardDef = defineComponent({
  name: "ProjectCard",
  description:
    "A portfolio project / case study card. Reuse the SAME card the static Work section uses, so AI-generated and hand-placed UI visibly share one design system.",
  props: z.object({
    title: z.string(),
    description: z.string().describe("One or two sentence summary of the project"),
    tags: z.array(z.string()).describe("Tech / role tags, e.g. ['Design System','OpenUI','TypeScript']"),
    link: z.string().url().optional().describe("Optional case-study URL (must be https)"),
  }),
  component: ({ props }) => (
    <ProjectCard
      title={props.title}
      description={props.description}
      tags={props.tags}
      link={props.link}
    />
  ),
});

const TimelineDef = defineComponent({
  name: "Timeline",
  description:
    "A chronological list (career history, or the steps of the AI-automated implementation workflow).",
  props: z.object({
    items: z
      .array(
        z.object({
          when: z.string().describe("Year or step label"),
          what: z.string().describe("What happened; may include <strong> for emphasis"),
        })
      )
      .describe("Ordered timeline entries"),
  }),
  component: ({ props }) => <Timeline items={props.items} />,
});

const TagListDef = defineComponent({
  name: "TagList",
  description: "A labelled list of technology or skill chips. Use to display a skill set or tech stack.",
  props: z.object({
    label: z.string().optional().describe("Section label, e.g. 'Design' or 'Engineering'"),
    items: z.array(z.string()).describe("Technology or skill names, e.g. ['TypeScript', 'Figma', 'Vue']"),
  }),
  component: ({ props }) => <TagList label={props.label} items={props.items} />,
});

const CalloutDef = defineComponent({
  name: "Callout",
  description:
    "An emphasized note or key takeaway. tone 'info' (default, amber) or 'warn'. Good for stating the core thesis.",
  props: z.object({
    text: z.string(),
    tone: z.enum(["info", "warn"]).describe("Visual tone"),
  }),
  component: ({ props }) => <Callout text={props.text} tone={props.tone} />,
});

const LinkCardDef = defineComponent({
  name: "LinkCard",
  description:
    "A link preview card with thumbnail image, title, description, and URL. Use when introducing an external site or personal work with a visual.",
  props: z.object({
    title: z.string().describe("Site or work title"),
    description: z.string().describe("One-line description"),
    url: z.string().url().describe("Full URL including https://"),
    image: z.string().describe("Image path, e.g. '/ryunosukesawada-ogp.jpg'"),
  }),
  component: ({ props }) => (
    <LinkCard title={props.title} description={props.description} url={props.url} image={props.image} />
  ),
});

/* ---- Layout components (reference children via .ref) ---- */

const GridDef = defineComponent({
  name: "Grid",
  description: "Responsive grid. Put StatCards or ProjectCards inside. columns 2-3 recommended.",
  props: z.object({
    children: z
      .array(z.union([StatCardDef.ref, ProjectCardDef.ref, CalloutDef.ref]))
      .describe("Cards to lay out in a grid"),
    columns: z.number().optional().describe("Number of columns (default 2)"),
  }),
  component: ({ props, renderNode }) => (
    <Grid columns={props.columns}>
      {props.children.map((child, i) => (
        <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
      ))}
    </Grid>
  ),
});

const StackDef = defineComponent({
  name: "Stack",
  description:
    "Vertical container. This is the ROOT. Compose the whole answer top-down: a TextContent heading, then content (Grid of cards, Timeline, SkillBars, Callouts).",
  props: z.object({
    children: z
      .array(
        z.union([
          TextContentDef.ref,
          GridDef.ref,
          TimelineDef.ref,
          TagListDef.ref,
          CalloutDef.ref,
          ProjectCardDef.ref,
          LinkCardDef.ref,
        ])
      )
      .describe("Stacked sections of the response"),
  }),
  component: ({ props, renderNode }) => (
    <Stack>
      {props.children.map((child, i) => (
        <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
      ))}
    </Stack>
  ),
});

/* ---- The library: the contract between this site and the LLM ---- */

export const portfolioLibrary = createLibrary({
  root: "Stack",
  components: [
    StackDef,
    GridDef,
    TextContentDef,
    StatCardDef,
    ProjectCardDef,
    TimelineDef,
    TagListDef,
    CalloutDef,
    LinkCardDef,
  ],
});
