import { Route, Routes } from "react-router-dom";
import { PageShell } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </PageShell>
  );
}
