const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../app.js"), "utf8");

// Minimal DOM adapter exercises the app's route and answer event handlers.
function loadApp(hash = "#/", random = () => 0.25) {
  let quizHtml = "";
  let randomCalls = 0;
  const listeners = {};
  const clicks = new Map();
  const app = {
    set innerHTML(html) {
      quizHtml = html.match(/<section class="quiz-section"[\s\S]*?<\/section>/)?.[0] ?? "";
    },
  };
  const choices = () => Array.from(quizHtml.matchAll(
    /<button class="answer-button ([^"]*)" data-quiz-question="(\d+)" data-quiz-answer="(\d+)" type="button">([\s\S]*?)<\/button>/g,
  ), ([, className, question, answer, text]) => ({ className, question, answer, text }));
  const document = {
    getElementById: () => app,
    querySelectorAll(selector) {
      if (selector !== "[data-quiz-question]") return [];
      clicks.clear();
      return choices().map(({ question, answer }) => ({
        dataset: { quizQuestion: question, quizAnswer: answer },
        addEventListener: (_, callback) => clicks.set(`${question}:${answer}`, callback),
      }));
    },
    querySelector: () => quizHtml ? { replaceWith: (element) => { quizHtml = element.html; } } : null,
    createElement: () => ({
      innerHTML: "",
      get content() { return { firstElementChild: { html: this.innerHTML } }; },
    }),
  };
  const context = vm.createContext({
    document,
    location: { hash },
    window: { addEventListener: (event, callback) => { listeners[event] = callback; } },
    Math: Object.assign(Object.create(Math), { random: () => { randomCalls += 1; return random(); } }),
  });
  vm.runInContext(source, context);
  return {
    evaluate: (code) => vm.runInContext(code, context),
    snapshot: (code) => JSON.parse(vm.runInContext(`JSON.stringify(${code})`, context)),
    navigate(nextHash) { context.location.hash = nextHash; listeners.hashchange(); },
    answer(question, answer) {
      const click = clicks.get(`${question}:${answer}`);
      assert.ok(click, "The requested answer is rendered and bound");
      click();
    },
    choices,
    order: () => choices().map(({ question, answer }) => `${question}:${answer}`),
    html: () => quizHtml,
    randomCalls: () => randomCalls,
  };
}

test("three-choice shuffle permits all six permutations, including unchanged order", () => {
  const permutations = new Set();
  for (const first of [0.1, 0.5, 0.9]) {
    for (const second of [0.1, 0.9]) {
      const draws = [first, second];
      const app = loadApp("#/", () => draws.shift());
      const indices = app.snapshot('shuffledAnswerIndices(["a", "b", "c"])');
      assert.deepEqual([...indices].sort(), [0, 1, 2]);
      assert.equal(app.randomCalls(), 2);
      permutations.add(indices.join(""));
    }
  }
  assert.deepEqual([...permutations].sort(), ["012", "021", "102", "120", "201", "210"]);
});

test("shuffle preserves inputs and handles different answer counts", () => {
  const app = loadApp();
  for (const answers of [[], ["a"], ["a", "b"], ["a", "b", "c", "d"]]) {
    app.evaluate(`globalThis.inputAnswers = ${JSON.stringify(answers)}`);
    const indices = app.snapshot("shuffledAnswerIndices(inputAnswers)");
    assert.deepEqual([...indices].sort(), answers.map((_, index) => index));
    assert.deepEqual(app.snapshot("inputAnswers"), answers);
  }
});

test("all 18 questions preserve answer text, correctness, feedback, and completion after shuffling", () => {
  const app = loadApp();
  const lessons = app.snapshot("modules");
  for (const lesson of lessons) {
    app.navigate(`#/lesson/${lesson.id}`);
    const order = app.order();
    const draws = app.randomCalls();
    assert.equal(order.length, 9);
    for (const [questionIndex, question] of lesson.quiz.entries()) {
      for (const [answerIndex, answer] of question.answers.entries()) {
        const button = app.choices().find((choice) => choice.question === String(questionIndex) && choice.answer === String(answerIndex));
        assert.equal(button.text, app.evaluate(`escapeHtml(${JSON.stringify(answer)})`));
        app.answer(questionIndex, answerIndex);
        const correct = answerIndex === question.correctIndex;
        const selected = app.choices().find((choice) => choice.question === String(questionIndex) && choice.answer === String(answerIndex));
        assert.equal(selected.className, correct ? "answer-correct" : "answer-wrong");
        const feedback = app.evaluate(`escapeHtml(${JSON.stringify(question.explanations[answerIndex])})`);
        assert.ok(app.html().includes(`<p class="feedback ${correct ? "correct-feedback" : "wrong-feedback"}">${feedback}</p>`));
        assert.deepEqual(app.order(), order, "Answering must not reshuffle choices");
        assert.equal(app.randomCalls(), draws);
      }
      app.answer(questionIndex, question.correctIndex);
    }
    assert.equal((app.html().match(/aria-label="Correct"/g) ?? []).length, 3);
    assert.equal((app.html().match(/aria-label="Incorrect"/g) ?? []).length, 0);
  }
  assert.deepEqual(app.snapshot("modules"), lessons, "Lesson content must remain unchanged");
});

test("direct entry and every lesson reopening shuffle afresh while retaining selected answer identities", () => {
  let draw = 0;
  const app = loadApp("#/lesson/signals-as-sine-waves", () => draw);
  const firstOrder = app.order();
  assert.equal(app.randomCalls(), 6);
  app.answer(0, 1);
  app.answer(1, 1);
  app.navigate("#/");
  assert.equal(app.html(), "");
  assert.equal(app.randomCalls(), 6);
  draw = 0.99;
  app.navigate("#/lesson/signals-as-sine-waves");
  assert.notDeepEqual(app.order(), firstOrder);
  assert.equal(app.randomCalls(), 12);
  assert.equal(app.choices().find((choice) => choice.question === "0" && choice.answer === "1").className, "answer-correct");
  assert.equal(app.choices().find((choice) => choice.question === "1" && choice.answer === "1").className, "answer-wrong");
  app.navigate("#/lesson/filters");
  assert.equal(app.randomCalls(), 18);
  draw = 0;
  app.navigate("#/lesson/signals-as-sine-waves");
  assert.equal(app.randomCalls(), 24);
  assert.deepEqual(app.order(), firstOrder);
  app.navigate("#/lesson/unknown");
  assert.equal(app.html(), "");
  assert.equal(app.randomCalls(), 24);
});
