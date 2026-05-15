import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { LessonHeader } from "../components/Layout";
import { Quiz } from "../components/Quiz";
import { modules } from "../data/modules";
import { demos } from "../demos/Demos";

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, keyTerms: string[]) {
  if (keyTerms.length === 0) return text;

  const pattern = new RegExp(`(${keyTerms.map(escapeRegExp).join("|")})`, "gi");
  return text.split(pattern).map((part, index) => {
    const isKeyTerm = keyTerms.some((term) => term.toLowerCase() === part.toLowerCase());
    return isKeyTerm ? (
      <mark className="key-term" key={`${part}-${index}`}>
        {part}
      </mark>
    ) : (
      part
    );
  });
}

export function LessonPage() {
  const { lessonId } = useParams();
  const lesson = modules.find((module) => module.id === lessonId);

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  const Demo = demos[lesson.demoKey];

  return (
    <>
      <LessonHeader lesson={lesson} />
      <section className="concept-copy">
        <div>
          <p className="eyebrow">Core idea</p>
          <h2>{renderHighlightedText(lesson.explanation, lesson.keyTerms)}</h2>
        </div>
        <p>{lesson.clinicalNote}</p>
      </section>
      <Demo />
      <Quiz questions={lesson.quiz} />
      <nav className="lesson-bottom-nav" aria-label="Lesson navigation">
        <Link className="return-main-button" to="/">
          <ArrowLeft size={18} />
          RETURN TO MAIN PAGE
        </Link>
      </nav>
    </>
  );
}
