import { z } from "zod/v4";
import { defineComponent, createLibrary } from "@openuidev/lang-core";

/* ============================================================
   Node-compatible library (renderers = null)
   ------------------------------------------------------------
   サーバー側（Route Handler）は library.prompt() で
   システムプロンプトを生成するだけで、React描画はしない。
   そのため renderer を持たない軽量版を別途定義する。
   props スキーマと description は client 版と完全に一致させること
   （= 契約が一致する）。
   ============================================================ */

const TextContentDef = defineComponent({
  name: "TextContent",
  description:
    "Headings or body copy. variant 'display' for the single biggest title, 'heading' for section titles, 'body' for paragraphs, 'mono' for technical labels.",
  props: z.object({
    text: z.string().describe("The text to display"),
    variant: z.enum(["display", "heading", "body", "mono"]).describe("Visual role of the text"),
  }),
  component: null,
});

const StatCardDef = defineComponent({
  name: "StatCard",
  description:
    "A single headline metric (years of experience, projects shipped, % faster, etc). Use inside a Grid when showing multiple stats.",
  props: z.object({
    label: z.string().describe("Short uppercase-style label, e.g. 'YEARS DESIGNING SYSTEMS'"),
    value: z.string().describe("The metric value, e.g. '7 years' or '20+'"),
  }),
  component: null,
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
  component: null,
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
  component: null,
});

const TagListDef = defineComponent({
  name: "TagList",
  description: "A labelled list of technology or skill chips. Use to display a skill set or tech stack.",
  props: z.object({
    label: z.string().optional().describe("Section label, e.g. 'Design' or 'Engineering'"),
    items: z.array(z.string()).describe("Technology or skill names, e.g. ['TypeScript', 'Figma', 'Vue']"),
  }),
  component: null,
});

const CalloutDef = defineComponent({
  name: "Callout",
  description:
    "An emphasized note or key takeaway. tone 'info' (default, amber) or 'warn'. Good for stating the core thesis.",
  props: z.object({
    text: z.string(),
    tone: z.enum(["info", "warn"]).describe("Visual tone"),
  }),
  component: null,
});

const GridDef = defineComponent({
  name: "Grid",
  description: "Responsive grid. Put StatCards or ProjectCards inside. columns 2-3 recommended.",
  props: z.object({
    children: z.array(z.union([StatCardDef.ref, ProjectCardDef.ref, CalloutDef.ref])),
    columns: z.number().optional(),
  }),
  component: null,
});

const StackDef = defineComponent({
  name: "Stack",
  description:
    "Vertical container. This is the ROOT. Compose the whole answer top-down: a TextContent heading, then content (Grid of cards, Timeline, SkillBars, Callouts).",
  props: z.object({
    children: z.array(
      z.union([
        TextContentDef.ref,
        GridDef.ref,
        TimelineDef.ref,
        TagListDef.ref,
        CalloutDef.ref,
        ProjectCardDef.ref,
      ])
    ),
  }),
  component: null,
});

export const portfolioLibraryNode = createLibrary({
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
  ],
});
