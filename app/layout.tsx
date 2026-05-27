import type { Metadata } from "next";
import "@/styles/tokens.css";
import "@/styles/ds.css";
import "@/styles/app.css";

export const metadata: Metadata = {
  title: "Design Engineer · Design Systems × AI Implementation",
  description:
    "デザインシステムを基盤に、フロントエンド実装までをAIで自動化するデザインエンジニアのポートフォリオ。OpenUIによる動的生成UIを実装。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
