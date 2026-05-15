import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { LessonModule } from "../data/modules";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand-link" to="/" aria-label="Go to main page">
          <Home size={19} />
          EEG Frequency Basics
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

type LessonHeaderProps = {
  lesson: LessonModule;
};

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <section className="lesson-hero" style={{ borderTopColor: lesson.color }}>
      <Link className="back-link" to="/">
        <ArrowLeft size={18} />
        Main page
      </Link>
      <p className="eyebrow">Concept {lesson.order}</p>
      <h1>{lesson.title}</h1>
      <p className="lede">{lesson.summary}</p>
    </section>
  );
}
