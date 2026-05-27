import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
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
      <head>
        {/* テーマフラッシュ防止：ハイドレーション前に data-theme を適用 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <div className="topbar">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
