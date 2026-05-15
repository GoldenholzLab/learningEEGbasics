import { Activity, ArrowRight, Filter, RadioTower, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { modules } from "../data/modules";

const iconByDemo = {
  sine: Waves,
  adding: Activity,
  bands: Activity,
  filters: Filter,
  sampling: RadioTower,
  screen: RadioTower,
};

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div>
          <p className="eyebrow">Epilepsy fellows</p>
          <h1>Interactive EEG Frequency Basics</h1>
          <p className="lede">
            Explore frequency, power, filtering, and aliasing with live waveform demos inspired by the original MATLAB teaching session.
          </p>
          <p className="attribution">by Daniel M. Goldenholz at Beth Israel Deaconess Medical Center</p>
        </div>
      </section>
      <section className="module-index" aria-labelledby="module-index-heading">
        <div className="section-heading">
          <p className="eyebrow">Modules</p>
          <h2 id="module-index-heading">Recommended path</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => {
            const Icon = iconByDemo[module.demoKey];
            return (
              <Link className="module-card" key={module.id} to={`/lesson/${module.id}`} style={{ borderTopColor: module.color }}>
                <span className="module-order">0{module.order}</span>
                <Icon size={24} color={module.color} aria-hidden="true" />
                <h3>{module.shortTitle}</h3>
                <p>{module.summary}</p>
                <span className="card-link">
                  Open module
                  <ArrowRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
