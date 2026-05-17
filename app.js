const duration = 2;
const sampleRate = 240;
const twoPi = Math.PI * 2;
const screenWidthInches = 24;

const modules = [
  {
    id: "signals-as-sine-waves",
    order: 1,
    title: "Signals as Sine Waves",
    shortTitle: "Sine Waves",
    summary: "Build intuition for frequency, amplitude, and phase before combining EEG rhythms.",
    explanation:
      "A sine wave is the simplest repeating signal. Frequency controls how many cycles fit into a second, amplitude controls height, and phase shifts the wave left or right.",
    keyTerms: ["sine wave", "Frequency", "cycles", "amplitude", "phase"],
    clinicalNote:
      "When reading EEG, a faster rhythm creates more cycles per second, while higher voltage creates taller deflections.",
    demoKey: "sine",
    color: "#1f6f8b",
    quiz: [
      {
        prompt: "If frequency increases while amplitude stays the same, what changes most on the time trace?",
        answers: ["The wave gets taller", "More cycles appear per second", "The baseline moves upward"],
        correctIndex: 1,
        explanations: [
          "Amplitude controls height, not how tightly cycles are packed.",
          "Correct. Frequency is cycles per second.",
          "A baseline shift is an offset; changing frequency does not add one.",
        ],
      },
      {
        prompt: "What does amplitude represent in this simplified EEG model?",
        answers: ["The height of the voltage deflection", "The number of samples per second", "The wave's color"],
        correctIndex: 0,
        explanations: [
          "Correct. Larger amplitude produces taller positive and negative deflections.",
          "Samples per second describes measurement rate, not signal height.",
          "Color is only a display choice in the diagram.",
        ],
      },
      {
        prompt: "Two sine waves with the same frequency and amplitude can still look shifted because of:",
        answers: ["Phase", "Sampling rate only", "Filter type only"],
        correctIndex: 0,
        explanations: [
          "Correct. Phase changes where in the cycle the wave begins.",
          "Sampling can change how a wave is measured, but it is not the reason two ideal waves start at different cycle positions.",
          "Filtering changes frequency content; phase is the direct shift in cycle position.",
        ],
      },
    ],
  },
  {
    id: "adding-frequencies",
    order: 2,
    title: "Adding Frequencies",
    shortTitle: "Adding Waves",
    summary: "Show how a complex EEG trace can be built from simpler components.",
    explanation:
      "Fourier analysis is based on the ideas that complex waveforms can be treated as a sum of simpler sine waves. Adding each component changes the shape of the combined signal, even when the components are individually regular.",
    keyTerms: ["Fourier analysis", "complex waveforms", "sum", "sine waves", "component", "combined signal"],
    clinicalNote:
      "A real EEG channel rarely contains a pure rhythm. Slowing, alpha, beta, and artifact can all contribute to the visible trace.",
    demoKey: "adding",
    color: "#9a5b16",
    quiz: [
      {
        prompt: "Why can the summed waveform look irregular even when each component is a smooth sine wave?",
        answers: ["The components add and cancel at different times", "The monitor is broken", "Only one component is visible"],
        correctIndex: 0,
        explanations: [
          "Correct. Peaks can reinforce or oppose each other as their cycles line up differently.",
          "The irregularity is expected from addition, not a display failure.",
          "The sum reflects all active components, not just one.",
        ],
      },
      {
        prompt: "Adding a new high-frequency component usually makes the sum look:",
        answers: ["Flatter everywhere", "More finely rippled", "Identical to the original"],
        correctIndex: 1,
        explanations: [
          "A high-frequency component can sometimes cancel locally, but it does not simply flatten the whole trace.",
          "Correct. Faster components add tighter oscillations on top of slower structure.",
          "If the component has nonzero amplitude, the sum changes.",
        ],
      },
      {
        prompt: "Fourier-style thinking is useful because it lets us describe a complex signal by:",
        answers: ["Its frequency components", "Its file name", "A single screen pixel"],
        correctIndex: 0,
        explanations: [
          "Correct. The trace can be described by the frequencies, amplitudes, and phases that compose it.",
          "A file name says nothing about the signal structure.",
          "A single pixel loses nearly all of the time-domain information.",
        ],
      },
    ],
  },
  {
    id: "eeg-bands-and-power",
    order: 3,
    title: "EEG Bands and Power",
    shortTitle: "Bands & Power",
    summary: "Adjust delta, theta, alpha, and beta power to see how band mixtures shape a trace.",
    explanation:
      "EEG bands are frequency ranges clinicians use as shorthand. In this simplified model, each band is represented by one center frequency with adjustable power.",
    keyTerms: ["EEG bands", "frequency ranges", "center frequency", "power"],
    clinicalNote:
      "Band labels help summarize rhythms, but the visible EEG is still a time-domain mixture of multiple components.",
    demoKey: "bands",
    color: "#3f7f38",
    quiz: [
      {
        prompt: "Increasing delta power in the demo most strongly adds:",
        answers: ["Slow large waves", "Only very fast ripples", "A flat baseline"],
        correctIndex: 0,
        explanations: [
          "Correct. Delta is low frequency, so its cycles are slow.",
          "Fast ripples would come from higher-frequency components such as beta or above.",
          "Power adds signal energy; it does not make the trace flat.",
        ],
      },
      {
        prompt: "A strong alpha setting in this model means the 10 Hz component:",
        answers: ["Has larger amplitude", "Has disappeared", "Is sampled once per minute"],
        correctIndex: 0,
        explanations: [
          "Correct. The slider increases the amplitude of the representative alpha component.",
          "A strong setting means more visible contribution, not absence.",
          "Sampling rate is separate from alpha power.",
        ],
      },
      {
        prompt: "Why is the band model a simplification?",
        answers: ["Each band contains a range, not just one exact frequency", "EEG has no frequencies", "Power cannot affect a waveform"],
        correctIndex: 0,
        explanations: [
          "Correct. Real bands span ranges, while the demo uses a representative center frequency.",
          "EEG signals have frequency content even though we inspect them in time.",
          "Changing component power clearly changes the summed waveform.",
        ],
      },
    ],
  },
  {
    id: "filters",
    order: 4,
    title: "Filters",
    shortTitle: "Filters",
    summary: "Compare low-pass, high-pass, band-pass, and notch filtering on the same mixed signal.",
    explanation:
      "Filters change a signal by preserving some frequencies and attenuating others. A low-pass filter keeps frequencies below a cutoff and reduces higher frequencies. A high-pass filter keeps frequencies above a cutoff and reduces lower frequencies. A band-pass filter keeps only frequencies between a low and high cutoff. A notch filter reduces a narrow frequency band, often to suppress line noise or another specific artifact.",
    keyTerms: ["Filters", "preserving", "attenuating", "low-pass filter", "high-pass filter", "band-pass filter", "notch filter", "cutoff", "line noise", "artifact"],
    clinicalNote:
      "Filter settings can clarify rhythms or suppress artifact, but they can also hide clinically relevant activity if used carelessly.",
    demoKey: "filters",
    color: "#7b4aa0",
    quiz: [
      {
        prompt: "A low-pass filter primarily keeps:",
        answers: ["Lower frequencies", "Only the highest frequencies", "Only the signal name"],
        correctIndex: 0,
        explanations: [
          "Correct. Low-pass means low frequencies pass through relatively preserved.",
          "That describes high-pass behavior.",
          "Filtering acts on signal content, not labels.",
        ],
      },
      {
        prompt: "A notch filter is most useful when you want to reduce:",
        answers: ["A narrow frequency such as line noise", "Every frequency equally", "Only the time axis labels"],
        correctIndex: 0,
        explanations: [
          "Correct. Notch filters target a narrow band around one frequency.",
          "Reducing every frequency equally would be gain reduction, not a notch.",
          "Axis labels are not part of the measured signal.",
        ],
      },
      {
        prompt: "Why can filter settings matter clinically?",
        answers: ["They can change what activity is visible", "They only change the page background", "They remove the need to inspect EEG"],
        correctIndex: 0,
        explanations: [
          "Correct. Filters can reveal, attenuate, or obscure signal components.",
          "The display style is separate from signal filtering.",
          "Filters support interpretation; they do not replace it.",
        ],
      },
    ],
  },
  {
    id: "sampling-and-aliasing",
    order: 5,
    title: "Sampling and Aliasing",
    shortTitle: "Sampling",
    summary: "See how undersampling can make one frequency masquerade as another.",
    explanation:
      "Sampling records a continuous signal at discrete times. Aliasing means a signal is sampled too slowly and falsely appears to have a different frequency, often a slower one. The sampling rate must be at least 2x the highest frequency of interest, also called the Nyquist frequency.",
    keyTerms: ["Sampling", "continuous signal", "discrete times", "Aliasing", "sampling rate", "2x", "highest frequency of interest", "Nyquist frequency"],
    clinicalNote:
      "Digital EEG depends on adequate sampling. Apparent rhythms can be misleading when the measurement rate is insufficient.",
    demoKey: "sampling",
    color: "#b33f3f",
    quiz: [
      {
        prompt: "Aliasing occurs when:",
        answers: ["Sampling is too slow for the signal", "Amplitude is exactly zero", "The quiz is hidden"],
        correctIndex: 0,
        explanations: [
          "Correct. Undersampling can make a fast signal appear as a different lower frequency.",
          "A zero-amplitude signal has no visible oscillation to alias.",
          "Quiz visibility is unrelated to signal sampling.",
        ],
      },
      {
        prompt: "In the classic sampling rule, the sampling rate should be at least:",
        answers: ["Twice the highest frequency of interest", "Half the lowest frequency", "One sample for the whole page"],
        correctIndex: 0,
        explanations: [
          "Correct. This is the Nyquist idea.",
          "Half the lowest frequency would miss faster activity.",
          "One sample cannot define an oscillation.",
        ],
      },
      {
        prompt: "Why do the red sampled points sometimes trace a slower-looking wave?",
        answers: ["They miss many cycles of the true signal", "The true signal stopped oscillating", "Amplitude became negative forever"],
        correctIndex: 0,
        explanations: [
          "Correct. Sparse samples can land at positions that mimic a slower rhythm.",
          "The continuous signal is still oscillating between sample times.",
          "A sine wave continues alternating unless the model changes.",
        ],
      },
    ],
  },
  {
    id: "screen-resolution-aliasing",
    order: 6,
    title: "Screen Resolution Aliasing",
    shortTitle: "Screen Aliasing",
    summary: "Demonstrate how display resolution can distort high-frequency signals even after recording.",
    explanation:
      "Aliasing means a signal is represented in a way that makes it appear to have a different frequency than it really does. Even if a signal exists in the data, the screen has finite pixels. Compressing high-frequency activity into too few pixels can create visual distortion.",
    keyTerms: ["Aliasing"],
    clinicalNote:
      "Zoom level and page duration matter. A rhythm may look different when the same data is squeezed into fewer horizontal pixels.",
    demoKey: "screen",
    color: "#0f766e",
    quiz: [
      {
        prompt: "Screen-resolution aliasing is mainly a problem of:",
        answers: ["How the data is displayed", "The patient's age", "The color of the trace"],
        correctIndex: 0,
        explanations: [
          "Correct. The distortion comes from mapping data onto limited screen pixels.",
          "Patient age does not determine pixel resolution.",
          "Trace color does not determine how many points fit on screen.",
        ],
      },
      {
        prompt: "What usually improves visual representation of fast activity?",
        answers: ["More horizontal pixels or a shorter time window", "Hiding the waveform", "Using only one plotted point"],
        correctIndex: 0,
        explanations: [
          "Correct. More samples/pixels per second of display preserves fast changes better.",
          "Hiding the waveform removes information.",
          "One point cannot represent a fast rhythm.",
        ],
      },
      {
        prompt: "Why can zooming in help EEG review?",
        answers: ["It spreads the same time segment across more pixels", "It changes the patient's signal", "It deletes high frequencies"],
        correctIndex: 0,
        explanations: [
          "Correct. More screen space per second can make rapid oscillations easier to inspect.",
          "Zoom changes visualization, not the underlying recorded physiology.",
          "Zooming does not delete frequencies by itself.",
        ],
      },
    ],
  },
];

const state = {
  sine: { frequency: 6, amplitude: 8, phase: 0 },
  adding: { enabledFrequencies: [2, 4, 7, 10] },
  bands: { delta: 5, theta: 3, alpha: 8, beta: 2 },
  filters: { mode: "low-pass", lowCut: 5, highCut: 14, notch: 10 },
  sampling: { signalFrequency: 10, lowRate: 6, phase: 0.8 },
  screen: { signalFrequency: 60, pixelsPerInch: 90, seconds: 1, noise: 0.4 },
  quiz: {},
};

const app = document.getElementById("app");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, keyTerms) {
  if (!keyTerms.length) return escapeHtml(text);
  const pattern = new RegExp(`(${keyTerms.map(escapeRegExp).join("|")})`, "gi");
  return text
    .split(pattern)
    .map((part) => {
      const isKeyTerm = keyTerms.some((term) => term.toLowerCase() === part.toLowerCase());
      return isKeyTerm ? `<mark class="key-term">${escapeHtml(part)}</mark>` : escapeHtml(part);
    })
    .join("");
}

function icon(name, size = 20, color = "currentColor") {
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const paths = {
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    radio: '<path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"/><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47"/><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"/><path d="M9.5 18h5"/><path d="m8 22 4-11 4 11"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    x: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    shuffle: '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>',
  };
  return `<svg ${common}>${paths[name] ?? ""}</svg>`;
}

function formatPiMultiple(radians) {
  const multiple = radians / Math.PI;
  if (Math.abs(multiple) < 0.005) return "0π";
  if (Math.abs(multiple - 1) < 0.005) return "π";
  if (Math.abs(multiple + 1) < 0.005) return "-π";
  return `${Number(multiple.toFixed(2))}π`;
}

function formatTime(seconds) {
  return seconds < 1 ? `${Math.round(seconds * 1000)} ms` : `${Number(seconds.toFixed(1))} s`;
}

function generateWave(frequency, amplitude, waveDuration, rate, phase = 0) {
  const count = Math.max(2, Math.round(waveDuration * rate));
  return Array.from({ length: count }, (_, index) => {
    const t = (waveDuration * index) / (count - 1);
    return { t, y: amplitude * Math.sin(2 * Math.PI * frequency * t + phase) };
  });
}

function sumWaves(components, waveDuration, rate) {
  const count = Math.max(2, Math.round(waveDuration * rate));
  return Array.from({ length: count }, (_, index) => {
    const t = (waveDuration * index) / (count - 1);
    const y = components.reduce(
      (total, component) =>
        total + component.amplitude * Math.sin(2 * Math.PI * component.frequency * t + (component.phase ?? 0)),
      0,
    );
    return { t, y };
  });
}

function attenuateComponents(components, mode, lowCut, highCut, notchFrequency) {
  return components.map((component) => {
    let scale = 1;
    if (mode === "low-pass" && component.frequency > highCut) scale = 0.12;
    if (mode === "high-pass" && component.frequency < lowCut) scale = 0.12;
    if (mode === "band-pass" && (component.frequency < lowCut || component.frequency > highCut)) scale = 0.12;
    if (mode === "notch" && Math.abs(component.frequency - notchFrequency) <= 1) scale = 0.08;
    return { ...component, amplitude: component.amplitude * scale };
  });
}

function aliasFrequency(signalFrequency, rate) {
  if (rate <= 0) return signalFrequency;
  const remainder = ((signalFrequency % rate) + rate) % rate;
  const folded = Math.min(remainder, rate - remainder);
  return Number(folded.toFixed(2));
}

function displaySampleRate(horizontalPixels, waveDuration) {
  if (waveDuration <= 0) return 0;
  return Math.max(1, horizontalPixels - 1) / waveDuration;
}

function amplitudeRange(series) {
  const max = series.reduce((peak, points) => {
    if (!points.length) return peak;
    return Math.max(peak, ...points.map((point) => Math.abs(point.y)));
  }, 1);
  return Math.max(1, max * 1.18);
}

function slider({ id, label, value, min, max, step = 1, unit = "", displayValue, accentColor }) {
  const fillPercent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const style = [
    accentColor ? `--slider-color:${accentColor}` : "",
    `--slider-fill-percent:${fillPercent}%`,
  ]
    .filter(Boolean)
    .join(";");
  return `
    <label class="control" style="${style}">
      <span>${escapeHtml(label)}<strong>${escapeHtml(displayValue ?? `${value}${unit}`)}</strong></span>
      <input data-control="${id}" type="range" value="${value}" min="${min}" max="${max}" step="${step}" />
    </label>
  `;
}

function segmented({ label, value, options }) {
  return `
    <fieldset class="segmented">
      <legend>${escapeHtml(label)}</legend>
      <div>
        ${options
          .map(
            (option) => `
              <button data-filter-mode="${option.value}" class="${option.value === value ? "selected" : ""}" type="button">
                ${escapeHtml(option.label)}
              </button>
            `,
          )
          .join("")}
      </div>
    </fieldset>
  `;
}

function waveformPlot({ title, series, yRange, plotDuration, height = 280, yAxisLabel = "Amplitude" }) {
  const width = 900;
  const padding = { top: 28, right: 24, bottom: 42, left: 56 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const xFor = (t) => padding.left + (t / plotDuration) * plotWidth;
  const yFor = (y) => padding.top + ((yRange - y) / (2 * yRange)) * plotHeight;
  const toPolyline = (points) => points.map((point) => `${xFor(point.t).toFixed(2)},${yFor(point.y).toFixed(2)}`).join(" ");
  const xTicks = Array.from({ length: 5 }, (_, index) => (plotDuration * index) / 4);
  const yTicks = [-yRange, -yRange / 2, 0, yRange / 2, yRange];

  return `
    <figure class="waveform">
      ${title ? `<figcaption>${escapeHtml(title)}</figcaption>` : ""}
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title || "Waveform plot")}">
        <rect class="plot-bg" x="${padding.left}" y="${padding.top}" width="${plotWidth}" height="${plotHeight}"></rect>
        <line class="axis baseline" x1="${padding.left}" x2="${width - padding.right}" y1="${yFor(0)}" y2="${yFor(0)}"></line>
        <line class="axis" x1="${padding.left}" x2="${padding.left}" y1="${padding.top}" y2="${height - padding.bottom}"></line>
        <line class="axis" x1="${padding.left}" x2="${width - padding.right}" y1="${height - padding.bottom}" y2="${height - padding.bottom}"></line>
        ${xTicks
          .map(
            (tick) => `
              <g>
                <line class="grid" x1="${xFor(tick)}" x2="${xFor(tick)}" y1="${padding.top}" y2="${height - padding.bottom}"></line>
                <text class="tick-label" x="${xFor(tick)}" y="${height - 16}" text-anchor="middle">${tick.toFixed(1)}s</text>
              </g>
            `,
          )
          .join("")}
        ${yTicks
          .map(
            (tick) => `
              <g>
                <line class="grid horizontal-grid" x1="${padding.left}" x2="${width - padding.right}" y1="${yFor(tick)}" y2="${yFor(tick)}"></line>
                <line class="axis-tick" x1="${padding.left - 6}" x2="${padding.left}" y1="${yFor(tick)}" y2="${yFor(tick)}"></line>
                <text class="tick-label y-tick-label" x="${padding.left - 10}" y="${yFor(tick) + 4}" text-anchor="end">${Number.isInteger(tick) ? tick.toFixed(0) : tick.toFixed(1)}</text>
              </g>
            `,
          )
          .join("")}
        <text class="axis-label" x="18" y="${height / 2}" transform="rotate(-90 18 ${height / 2})">${escapeHtml(yAxisLabel)}</text>
        <text class="axis-label" x="${width / 2}" y="${height - 2}" text-anchor="middle">Time</text>
        ${series
          .map(
            (item) => `
              <g>
                <polyline points="${toPolyline(item.points)}" fill="none" stroke="${item.color}" stroke-width="${item.strokeWidth ?? 3}" stroke-linecap="round" stroke-linejoin="round" ${item.dashed ? 'stroke-dasharray="8 8"' : ""}></polyline>
                ${
                  item.markers
                    ? item.points
                        .map((point) => `<circle cx="${xFor(point.t)}" cy="${yFor(point.y)}" r="4.2" fill="${item.color}"></circle>`)
                        .join("")
                    : ""
                }
              </g>
            `,
          )
          .join("")}
      </svg>
      <div class="legend" aria-label="Plot legend">
        ${series.map((item) => `<span><i style="background-color:${item.color}"></i>${escapeHtml(item.label)}</span>`).join("")}
      </div>
    </figure>
  `;
}

function demoFrame(content, note) {
  return `
    <section class="demo-panel" aria-labelledby="demo-heading">
      <div class="section-heading">
        <p class="eyebrow">Interactive demo</p>
        <h2 id="demo-heading">Manipulate the signal</h2>
      </div>
      ${content}
      <p class="demo-note">${escapeHtml(note)}</p>
    </section>
  `;
}

function renderSineDemo() {
  const s = state.sine;
  const wave = generateWave(s.frequency, s.amplitude, duration, sampleRate, s.phase);
  return demoFrame(
    `
      <div class="controls-grid">
        ${slider({ id: "sine.frequency", label: "Frequency", value: s.frequency, min: 1, max: 20, unit: " Hz" })}
        ${slider({ id: "sine.amplitude", label: "Amplitude", value: s.amplitude, min: 1, max: 18, unit: " uV" })}
        ${slider({ id: "sine.phase", label: "Phase", value: Number(s.phase.toFixed(2)), min: -twoPi, max: twoPi, step: 0.01, displayValue: formatPiMultiple(s.phase) })}
      </div>
      ${waveformPlot({
        title: `${s.frequency} Hz sine wave`,
        plotDuration: duration,
        yRange: Math.max(12, s.amplitude * 1.25),
        yAxisLabel: "Amplitude (uV)",
        series: [{ label: "Sine wave", points: wave, color: "#1f6f8b" }],
      })}
    `,
    "Move frequency and amplitude separately to see why rhythm speed and voltage height are different observations.",
  );
}

function renderAddingDemo() {
  const frequencies = [2, 4, 7, 10, 15, 21];
  const componentColors = ["#2563eb", "#dc2626", "#0891b2", "#16a34a", "#c26a00", "#7b4aa0"];
  const components = frequencies
    .map((frequency, index) => ({
      frequency,
      amplitude: index < 2 ? 5 : 3,
      phase: index * 0.65,
      color: componentColors[index],
    }))
    .filter((component) => state.adding.enabledFrequencies.includes(component.frequency));
  const sum = sumWaves(components, duration, sampleRate);
  const componentSeries = components.map((component) => ({
    label: `${component.frequency} Hz component`,
    points: generateWave(component.frequency, component.amplitude, duration, sampleRate, component.phase),
    color: component.color,
    strokeWidth: 2,
    dashed: true,
  }));
  const series = [{ label: "Current sum", points: sum, color: "#1f2937", strokeWidth: 3.3 }, ...componentSeries];
  return demoFrame(
    `
      <div class="checkbox-grid" aria-label="Sine wave components">
        ${frequencies
          .map(
            (frequency, index) => `
              <label class="checkbox-control">
                <input data-frequency="${frequency}" type="checkbox" ${state.adding.enabledFrequencies.includes(frequency) ? "checked" : ""} />
                <span style="--check-color:${componentColors[index]}">${frequency} Hz</span>
              </label>
            `,
          )
          .join("")}
      </div>
      ${waveformPlot({
        title: `Sum of ${components.length} selected frequency component${components.length === 1 ? "" : "s"}`,
        plotDuration: duration,
        yRange: amplitudeRange([sum, ...componentSeries.map((item) => item.points)]),
        series,
      })}
    `,
    "The black trace is the current sum. The colored dashed traces show each sine wave component included in that sum.",
  );
}

function renderBandsDemo() {
  const s = state.bands;
  const colors = { delta: "#2563eb", theta: "#f97316", alpha: "#dc2626", beta: "#16a34a" };
  const components = [
    { frequency: 2, amplitude: s.delta, phase: 0.2 },
    { frequency: 6, amplitude: s.theta, phase: 1.1 },
    { frequency: 10, amplitude: s.alpha, phase: 2.2 },
    { frequency: 18, amplitude: s.beta, phase: 0.7 },
  ];
  const sum = sumWaves(components, duration, sampleRate);
  const bandSeries = [
    { label: "Delta 2 Hz", points: generateWave(2, s.delta, duration, sampleRate, 0.2), color: colors.delta },
    { label: "Theta 6 Hz", points: generateWave(6, s.theta, duration, sampleRate, 1.1), color: colors.theta },
    { label: "Alpha 10 Hz", points: generateWave(10, s.alpha, duration, sampleRate, 2.2), color: colors.alpha },
    { label: "Beta 18 Hz", points: generateWave(18, s.beta, duration, sampleRate, 0.7), color: colors.beta },
  ];
  return demoFrame(
    `
      <div class="band-component-layout">
        <div class="band-slider-column" aria-label="Band amplitude controls">
          ${slider({ id: "bands.delta", label: "Delta 2 Hz", value: s.delta, min: 0, max: 16, unit: " uV", accentColor: colors.delta })}
          ${slider({ id: "bands.theta", label: "Theta 6 Hz", value: s.theta, min: 0, max: 16, unit: " uV", accentColor: colors.theta })}
          ${slider({ id: "bands.alpha", label: "Alpha 10 Hz", value: s.alpha, min: 0, max: 16, unit: " uV", accentColor: colors.alpha })}
          ${slider({ id: "bands.beta", label: "Beta 18 Hz", value: s.beta, min: 0, max: 16, unit: " uV", accentColor: colors.beta })}
        </div>
        <div class="band-plot-stack">
          ${waveformPlot({ title: "Individual band sine waves", plotDuration: duration, yRange: amplitudeRange(bandSeries.map((item) => item.points)), series: bandSeries })}
          ${waveformPlot({ title: "Band mixture", plotDuration: duration, yRange: amplitudeRange([sum]), series: [{ label: "Summed EEG-like trace", points: sum, color: "#1f2937" }] })}
        </div>
      </div>
    `,
    "Each slider changes the amplitude of one representative band center frequency.",
  );
}

function renderFiltersDemo() {
  const s = state.filters;
  const components = [
    { frequency: 2, amplitude: 6, phase: 0.2 },
    { frequency: 6, amplitude: 5, phase: 1.1 },
    { frequency: 10, amplitude: 7, phase: 2.2 },
    { frequency: 16, amplitude: 3, phase: 0.6 },
    { frequency: 21, amplitude: 3, phase: 1.6 },
  ];
  const filtered = attenuateComponents(components, s.mode, s.lowCut, s.highCut, s.notch);
  const originalTrace = sumWaves(components, duration, sampleRate);
  const filteredTrace = sumWaves(filtered, duration, sampleRate);
  return demoFrame(
    `
      <div class="controls-grid">
        ${segmented({
          label: "Filter",
          value: s.mode,
          options: [
            { label: "None", value: "none" },
            { label: "Low-pass", value: "low-pass" },
            { label: "High-pass", value: "high-pass" },
            { label: "Band-pass", value: "band-pass" },
            { label: "Notch", value: "notch" },
          ],
        })}
        ${s.mode === "high-pass" || s.mode === "band-pass" ? slider({ id: "filters.lowCut", label: "Low cut", value: s.lowCut, min: 1, max: 12, unit: " Hz" }) : ""}
        ${s.mode === "low-pass" || s.mode === "band-pass" ? slider({ id: "filters.highCut", label: "High cut", value: s.highCut, min: 6, max: 24, unit: " Hz" }) : ""}
        ${s.mode === "notch" ? slider({ id: "filters.notch", label: "Notch", value: s.notch, min: 2, max: 22, unit: " Hz" }) : ""}
      </div>
      ${waveformPlot({
        title: "Original versus filtered trace",
        plotDuration: duration,
        yRange: amplitudeRange([originalTrace, filteredTrace]),
        series: [
          { label: "Original", points: originalTrace, color: "#767676", dashed: true },
          { label: "Filtered", points: filteredTrace, color: "#7b4aa0", strokeWidth: 3.4 },
        ],
      })}
    `,
    "This teaching filter attenuates frequencies outside the chosen range so the effect is easy to see.",
  );
}

function renderSamplingDemo() {
  const s = state.sampling;
  const high = generateWave(s.signalFrequency, 9, duration, 220, s.phase);
  const sampled = generateWave(s.signalFrequency, 9, duration, s.lowRate, s.phase);
  const apparent = aliasFrequency(s.signalFrequency, s.lowRate);
  return demoFrame(
    `
      <div class="controls-grid">
        ${slider({ id: "sampling.signalFrequency", label: "True signal", value: s.signalFrequency, min: 2, max: 30, unit: " Hz" })}
        ${slider({ id: "sampling.lowRate", label: "Sampling rate", value: s.lowRate, min: 3, max: 40, unit: " Hz" })}
        <button class="icon-button" data-action="random-phase" type="button">${icon("shuffle", 18)}Random phase</button>
      </div>
      ${waveformPlot({
        title: "Dense reference trace and sparse samples",
        plotDuration: duration,
        yRange: 12,
        series: [
          { label: "Reference signal", points: high, color: "#2563eb", strokeWidth: 2.4 },
          { label: `${s.lowRate} Hz samples`, points: sampled, color: "#dc2626", strokeWidth: 2.5, markers: true },
        ],
      })}
    `,
    `At ${s.lowRate} Hz sampling, the ${s.signalFrequency} Hz signal can appear near ${apparent} Hz.`,
  );
}

function renderScreenDemo() {
  const s = state.screen;
  const logTime = Math.log10(s.seconds);
  const horizontalPixels = Math.round(screenWidthInches * s.pixelsPerInch);
  const screenRate = displaySampleRate(horizontalPixels, s.seconds);
  const sampledFrequency = aliasFrequency(s.signalFrequency, screenRate);
  const idealRate = Math.min(1200, Math.max(240, s.signalFrequency * 28));
  const ideal = generateWave(s.signalFrequency, 1.2, s.seconds, idealRate, 0.5);
  const base = generateWave(s.signalFrequency, 1.2, s.seconds, screenRate, 0.5);
  const noise = generateWave(5, s.noise, s.seconds, screenRate, 1.4);
  const displayed = base.map((point, index) => ({ ...point, y: point.y + noise[index].y }));
  return demoFrame(
    `
      <div class="screen-context">
        <figure class="screen-diagram" aria-label="Computer screen width diagram">
          <div class="screen-frame">
            <div class="screen-inner"><span>${horizontalPixels.toLocaleString()} horizontal pixels, ${screenRate.toFixed(1)} samples/s</span></div>
          </div>
          <div class="screen-measure"><span></span><strong>24 inches</strong><span></span></div>
        </figure>
        <div class="screen-context-copy">
          <p class="eyebrow">Display model</p>
          <p>The simulated monitor is fixed at 24 inches wide. Pixels per inch determines how many horizontal positions are available to draw the selected time window.</p>
        </div>
      </div>
      <div class="controls-grid">
        ${slider({ id: "screen.signalFrequency", label: "Signal frequency", value: s.signalFrequency, min: 10, max: 90, unit: " Hz" })}
        ${slider({ id: "screen.pixelsPerInch", label: "Pixels per inch", value: s.pixelsPerInch, min: 20, max: 220, unit: " ppi" })}
        ${slider({ id: "screen.logTime", label: "Time shown", value: Number(logTime.toFixed(4)), min: -1, max: Math.log10(60), step: 0.01, displayValue: formatTime(s.seconds) })}
        ${slider({ id: "screen.noise", label: "Slow noise", value: s.noise, min: 0, max: 1.2, step: 0.1, unit: " uV" })}
      </div>
      ${waveformPlot({
        title: "Ideal signal versus screen-limited display",
        plotDuration: s.seconds,
        yRange: 2.4,
        series: [
          { label: `Ideal signal (${s.signalFrequency} Hz)`, points: ideal, color: "#1f2937", strokeWidth: 1.7 },
          { label: `Screen sampled signal (${sampledFrequency} Hz apparent)`, points: displayed, color: "#0f766e", strokeWidth: 2.6, markers: horizontalPixels <= 160 },
        ],
      })}
    `,
    "The teal trace is what a 24-inch-wide screen can draw after the time window is compressed into the available horizontal pixels.",
  );
}

const demoRenderers = {
  sine: renderSineDemo,
  adding: renderAddingDemo,
  bands: renderBandsDemo,
  filters: renderFiltersDemo,
  sampling: renderSamplingDemo,
  screen: renderScreenDemo,
};

let pendingDemoFrame = null;
let pendingSliderInput = null;

function renderHome() {
  const iconByDemo = {
    sine: "waves",
    adding: "activity",
    bands: "activity",
    filters: "filter",
    sampling: "radio",
    screen: "radio",
  };
  return `
    <header class="topbar"><a class="brand-link" href="#/" aria-label="Go to main page">${icon("home", 19)}EEG Frequency Basics</a></header>
    <main>
      <section class="home-hero">
        <div>
          <p class="eyebrow">Epilepsy fellows</p>
          <h1>Interactive EEG Frequency Basics</h1>
          <p class="lede">Explore frequency, power, filtering, and aliasing with live waveform demos inspired by the original MATLAB teaching session.</p>
          <p class="attribution">by Daniel M. Goldenholz at Beth Israel Deaconess Medical Center</p>
        </div>
      </section>
      <section class="module-index" aria-labelledby="module-index-heading">
        <div class="section-heading">
          <p class="eyebrow">Modules</p>
          <h2 id="module-index-heading">Recommended path</h2>
        </div>
        <div class="module-grid">
          ${modules
            .map(
              (module) => `
                <a class="module-card" href="#/lesson/${module.id}" style="border-top-color:${module.color}">
                  <span class="module-order">0${module.order}</span>
                  ${icon(iconByDemo[module.demoKey], 24, module.color)}
                  <h3>${escapeHtml(module.shortTitle)}</h3>
                  <p>${escapeHtml(module.summary)}</p>
                  <span class="card-link">Open module${icon("arrowRight", 17)}</span>
                </a>
              `,
            )
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function renderQuiz(lesson) {
  const selected = state.quiz[lesson.id] ?? {};
  return `
    <section class="quiz-section" aria-labelledby="quiz-heading">
      <div class="section-heading">
        <p class="eyebrow">Check understanding</p>
        <h2 id="quiz-heading">Three quick questions</h2>
      </div>
      <div class="quiz-list">
        ${lesson.quiz
          .map((question, questionIndex) => {
            const selectedIndex = selected[questionIndex];
            const answered = selectedIndex !== undefined;
            const correct = selectedIndex === question.correctIndex;
            return `
              <article class="quiz-card">
                <div class="quiz-prompt-row">
                  <h3>${escapeHtml(question.prompt)}</h3>
                  ${answered && correct ? `<span class="answer-icon correct-icon" aria-label="Correct">${icon("check", 24)}</span>` : ""}
                  ${answered && !correct ? `<span class="answer-icon wrong-icon" aria-label="Incorrect">${icon("x", 24)}</span>` : ""}
                </div>
                <div class="answers">
                  ${question.answers
                    .map((answer, answerIndex) => {
                      const stateClass = answered && selectedIndex === answerIndex ? (answerIndex === question.correctIndex ? "answer-correct" : "answer-wrong") : "";
                      return `<button class="answer-button ${stateClass}" data-quiz-question="${questionIndex}" data-quiz-answer="${answerIndex}" type="button">${escapeHtml(answer)}</button>`;
                    })
                    .join("")}
                </div>
                ${answered ? `<p class="feedback ${correct ? "correct-feedback" : "wrong-feedback"}">${escapeHtml(question.explanations[selectedIndex])}</p>` : ""}
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderLesson(lesson) {
  const demo = demoRenderers[lesson.demoKey]();
  return `
    <header class="topbar"><a class="brand-link" href="#/" aria-label="Go to main page">${icon("home", 19)}EEG Frequency Basics</a></header>
    <main>
      <section class="lesson-hero" style="border-top-color:${lesson.color}">
        <a class="back-link" href="#/">${icon("arrowLeft", 18)}Main page</a>
        <p class="eyebrow">Concept ${lesson.order}</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p class="lede">${escapeHtml(lesson.summary)}</p>
      </section>
      <section class="concept-copy">
        <div>
          <p class="eyebrow">Core idea</p>
          <h2>${highlightText(lesson.explanation, lesson.keyTerms)}</h2>
        </div>
        <p>${escapeHtml(lesson.clinicalNote)}</p>
      </section>
      ${demo}
      ${renderQuiz(lesson)}
      <nav class="lesson-bottom-nav" aria-label="Lesson navigation">
        <a class="return-main-button" href="#/">${icon("arrowLeft", 18)}RETURN TO MAIN PAGE</a>
      </nav>
    </main>
  `;
}

function currentLesson() {
  const match = location.hash.match(/^#\/lesson\/([^/]+)$/);
  return match ? modules.find((module) => module.id === match[1]) : null;
}

function render() {
  const lesson = currentLesson();
  app.innerHTML = lesson ? renderLesson(lesson) : renderHome();
  bindDemoEvents(lesson);
  bindQuizEvents(lesson);
}

function updateState(path, value) {
  if (path === "screen.logTime") {
    state.screen.seconds = Number(10 ** value);
    return;
  }
  const [section, key] = path.split(".");
  state[section][key] = value;
  if (section === "filters" && state.filters.mode === "band-pass") {
    if (key === "lowCut" && state.filters.lowCut > state.filters.highCut) state.filters.highCut = state.filters.lowCut;
    if (key === "highCut" && state.filters.highCut < state.filters.lowCut) state.filters.lowCut = state.filters.highCut;
  }
}

function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function syncControlsFromPanel(nextPanel, activeInput) {
  document.querySelectorAll("[data-control]").forEach((input) => {
    const nextInput = Array.from(nextPanel.querySelectorAll("[data-control]")).find(
      (candidate) => candidate.dataset.control === input.dataset.control,
    );
    if (!nextInput) return;
    const control = input.closest(".control");
    const nextControl = nextInput.closest(".control");
    if (control && nextControl) {
      control.style.cssText = nextControl.style.cssText;
      const currentStrong = control.querySelector("strong");
      const nextStrong = nextControl.querySelector("strong");
      if (currentStrong && nextStrong) currentStrong.textContent = nextStrong.textContent;
    }
    if (input !== activeInput) input.value = nextInput.value;
  });
}

function syncDemoVisuals(activeInput) {
  const lesson = currentLesson();
  if (!lesson) return;
  const panel = document.querySelector(".demo-panel");
  if (!panel) return;
  const nextPanel = htmlToElement(demoRenderers[lesson.demoKey]());

  syncControlsFromPanel(nextPanel, activeInput);

  const currentFigures = panel.querySelectorAll("figure.waveform");
  const nextFigures = nextPanel.querySelectorAll("figure.waveform");
  currentFigures.forEach((figure, index) => {
    if (nextFigures[index]) figure.replaceWith(nextFigures[index]);
  });

  const currentScreenContext = panel.querySelector(".screen-context");
  const nextScreenContext = nextPanel.querySelector(".screen-context");
  if (currentScreenContext && nextScreenContext) currentScreenContext.replaceWith(nextScreenContext);

  const note = panel.querySelector(".demo-note");
  const nextNote = nextPanel.querySelector(".demo-note");
  if (note && nextNote) note.textContent = nextNote.textContent;
}

function scheduleDemoVisualSync(input) {
  pendingSliderInput = input;
  if (pendingDemoFrame) return;
  pendingDemoFrame = requestAnimationFrame(() => {
    const activeInput = pendingSliderInput;
    pendingDemoFrame = null;
    pendingSliderInput = null;
    syncDemoVisuals(activeInput);
  });
}

function renderActiveDemo(lesson = currentLesson()) {
  if (!lesson) return;
  const panel = document.querySelector(".demo-panel");
  if (!panel) return;
  panel.replaceWith(htmlToElement(demoRenderers[lesson.demoKey]()));
  bindDemoEvents(lesson);
}

function renderActiveQuiz(lesson) {
  if (!lesson) return;
  const quiz = document.querySelector(".quiz-section");
  if (!quiz) return;
  quiz.replaceWith(htmlToElement(renderQuiz(lesson)));
  bindQuizEvents(lesson);
}

function bindDemoEvents(lesson) {
  document.querySelectorAll("[data-control]").forEach((input) => {
    input.addEventListener("input", (event) => {
      updateState(event.target.dataset.control, Number(event.target.value));
      scheduleDemoVisualSync(event.target);
    });
  });

  document.querySelectorAll("[data-frequency]").forEach((input) => {
    input.addEventListener("change", (event) => {
      const frequency = Number(event.target.dataset.frequency);
      state.adding.enabledFrequencies = event.target.checked
        ? [...state.adding.enabledFrequencies, frequency].sort((a, b) => a - b)
        : state.adding.enabledFrequencies.filter((item) => item !== frequency);
      renderActiveDemo(lesson);
    });
  });

  document.querySelectorAll("[data-filter-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.mode = button.dataset.filterMode;
      renderActiveDemo(lesson);
    });
  });

  document.querySelectorAll("[data-action='random-phase']").forEach((button) => {
    button.addEventListener("click", () => {
      state.sampling.phase = Math.random() * Math.PI * 2;
      renderActiveDemo(lesson);
    });
  });
}

function bindQuizEvents(lesson) {
  document.querySelectorAll("[data-quiz-question]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lesson) return;
      if (!state.quiz[lesson.id]) state.quiz[lesson.id] = {};
      state.quiz[lesson.id][button.dataset.quizQuestion] = Number(button.dataset.quizAnswer);
      renderActiveQuiz(lesson);
    });
  });
}

window.addEventListener("hashchange", render);
render();
