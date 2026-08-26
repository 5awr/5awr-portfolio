import GenUIDemo from "@/components/GenUIDemo";
import { Work, PersonalProjects, TechStack, About, DesignSystemLink, Workflow } from "@/components/sections";

export default function Page() {
  return (
    <main className="page">
      <div className="page__inner">
        <GenUIDemo />
        <Workflow />
        <Work />
        <PersonalProjects />
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
