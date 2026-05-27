import GenUIDemo from "@/components/GenUIDemo";
import ThemeToggle from "@/components/ThemeToggle";
import { Work, TechStack, About } from "@/components/sections";

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
        <About />
        <footer className="footer">
          <span>© {new Date().getFullYear()} — Design Engineer Portfolio</span>
          <span className="footer__mono">design system · openui · typescript</span>
        </footer>
      </div>
    </main>
  );
}
