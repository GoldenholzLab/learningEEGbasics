import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import type { QuizQuestion } from "../data/modules";

type QuizProps = {
  questions: QuizQuestion[];
};

export function Quiz({ questions }: QuizProps) {
  const [selected, setSelected] = useState<Record<number, number>>({});

  return (
    <section className="quiz-section" aria-labelledby="quiz-heading">
      <div className="section-heading">
        <p className="eyebrow">Check understanding</p>
        <h2 id="quiz-heading">Three quick questions</h2>
      </div>
      <div className="quiz-list">
        {questions.map((question, questionIndex) => {
          const selectedIndex = selected[questionIndex];
          const answered = selectedIndex !== undefined;
          const correct = selectedIndex === question.correctIndex;
          return (
            <article className="quiz-card" key={question.prompt}>
              <div className="quiz-prompt-row">
                <h3>{question.prompt}</h3>
                {answered && correct ? <CheckCircle2 className="answer-icon correct-icon" aria-label="Correct" /> : null}
                {answered && !correct ? <XCircle className="answer-icon wrong-icon" aria-label="Incorrect" /> : null}
              </div>
              <div className="answers">
                {question.answers.map((answer, answerIndex) => {
                  const isSelected = selectedIndex === answerIndex;
                  const isCorrect = answerIndex === question.correctIndex;
                  const stateClass =
                    answered && isSelected ? (isCorrect ? "answer-correct" : "answer-wrong") : "";
                  return (
                    <button
                      className={`answer-button ${stateClass}`}
                      key={answer}
                      type="button"
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [questionIndex]: answerIndex,
                        }))
                      }
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
              {answered ? (
                <p className={correct ? "feedback correct-feedback" : "feedback wrong-feedback"}>
                  {question.explanations[selectedIndex]}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
