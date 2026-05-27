import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import "@/styles/tokens.css";
import "@/styles/ds.css";
import "@/styles/app.css";

export const metadata: Metadata = {
  title: "5awr — Design Engineer",
  description: "Design Engineer / 5awr のポートフォリオ。",
  metadataBase: new URL("https://5awr.dev"),
  openGraph: {
    title: "5awr — Design Engineer",
    description: "Design Engineer / 5awr のポートフォリオ。",
    url: "https://5awr.dev",
    siteName: "5awr",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "5awr — Design Engineer",
    description: "Design Engineer / 5awr のポートフォリオ。",
  },
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
