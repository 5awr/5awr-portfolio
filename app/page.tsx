import GenUIDemo from "@/components/GenUIDemo";
import { Hero, Thesis, Workflow, Work, About } from "@/components/sections";

export default function Page() {
  return (
    <main className="page">
      <div className="page__inner">
        <Hero />
        <GenUIDemo />
        <Thesis />
        <Workflow />
        <Work />
        <About />
        <footer className="footer">
          <span>© {new Date().getFullYear()} — Design Engineer Portfolio</span>
          <span className="footer__mono">design system · openui · typescript</span>
        </footer>
      </div>
    </main>
  );
}
