import GenUIDemo from "@/components/GenUIDemo";
import ThemeToggle from "@/components/ThemeToggle";
import { Work, TechStack, About, DesignSystemLink } from "@/components/sections";

export default function Page() {
  return (
    <main className="page">
      <div className="topbar">
        <ThemeToggle />
      </div>
      <div className="page__inner">
        <GenUIDemo />
        <Work />
        <TechStack />
        <DesignSystemLink />
        <About />
        <footer className="footer">
          <span>© {new Date().getFullYear()} SAWADA Ryunosuke</span>
          <span className="footer__mono">design system × ai · built with openui</span>
        </footer>
      </div>
    </main>
  );
}
