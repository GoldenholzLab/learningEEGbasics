import type { ComponentType } from "react";

export type QuizQuestion = {
  prompt: string;
  answers: string[];
  correctIndex: number;
  explanations: string[];
};

export type LessonModule = {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  summary: string;
  explanation: string;
  keyTerms: string[];
  clinicalNote: string;
  demoKey:
    | "sine"
    | "adding"
    | "bands"
    | "filters"
    | "sampling"
    | "screen";
  color: string;
  quiz: QuizQuestion[];
};

export const modules: LessonModule[] = [
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

export type DemoComponentMap = Record<LessonModule["demoKey"], ComponentType>;
