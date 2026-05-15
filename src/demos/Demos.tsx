import { RefreshCw, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { Slider, Segmented } from "../components/Controls";
import { WaveformPlot } from "../components/WaveformPlot";
import type { DemoComponentMap } from "../data/modules";
import {
  aliasFrequency,
  amplitudeRange,
  attenuateComponents,
  generateWave,
  sumWaves,
  type ComponentWave,
} from "../utils/waves";

const duration = 2;
const sampleRate = 240;
const twoPi = Math.PI * 2;
const screenWidthInches = 24;

function formatPiMultiple(radians: number) {
  const multiple = radians / Math.PI;
  if (Math.abs(multiple) < 0.005) return "0π";
  if (Math.abs(multiple - 1) < 0.005) return "π";
  if (Math.abs(multiple + 1) < 0.005) return "-π";
  return `${Number(multiple.toFixed(2))}π`;
}

function formatTime(seconds: number) {
  return seconds < 1 ? `${Math.round(seconds * 1000)} ms` : `${Number(seconds.toFixed(1))} s`;
}

function DemoFrame({
  children,
  note,
}: {
  children: React.ReactNode;
  note: string;
}) {
  return (
    <section className="demo-panel" aria-labelledby="demo-heading">
      <div className="section-heading">
        <p className="eyebrow">Interactive demo</p>
        <h2 id="demo-heading">Manipulate the signal</h2>
      </div>
      {children}
      <p className="demo-note">{note}</p>
    </section>
  );
}

function SineDemo() {
  const [frequency, setFrequency] = useState(6);
  const [amplitude, setAmplitude] = useState(8);
  const [phase, setPhase] = useState(0);
  const wave = useMemo(
    () => generateWave(frequency, amplitude, duration, sampleRate, phase),
    [frequency, amplitude, phase],
  );

  return (
    <DemoFrame note="Move frequency and amplitude separately to see why rhythm speed and voltage height are different observations.">
      <div className="controls-grid">
        <Slider label="Frequency" value={frequency} min={1} max={20} unit=" Hz" onChange={setFrequency} />
        <Slider label="Amplitude" value={amplitude} min={1} max={18} unit=" uV" onChange={setAmplitude} />
        <Slider
          label="Phase"
          value={Number(phase.toFixed(2))}
          min={-twoPi}
          max={twoPi}
          step={0.01}
          displayValue={formatPiMultiple(phase)}
          onChange={setPhase}
        />
      </div>
      <WaveformPlot
        title={`${frequency} Hz sine wave`}
        duration={duration}
        yRange={Math.max(12, amplitude * 1.25)}
        yAxisLabel="Amplitude (uV)"
        series={[{ label: "Sine wave", points: wave, color: "#1f6f8b" }]}
      />
    </DemoFrame>
  );
}

function AddingDemo() {
  const frequencies = [2, 4, 7, 10, 15, 21];
  const componentColors = ["#2563eb", "#dc2626", "#0891b2", "#16a34a", "#c26a00", "#7b4aa0"];
  const [enabledFrequencies, setEnabledFrequencies] = useState<number[]>([2, 4, 7, 10]);
  const components = frequencies
    .map((frequency, index) => ({
      frequency,
      amplitude: index < 2 ? 5 : 3,
      phase: index * 0.65,
      color: componentColors[index],
    }))
    .filter((component) => enabledFrequencies.includes(component.frequency));
  const sum = useMemo(() => sumWaves(components, duration, sampleRate), [components]);
  const componentSeries = useMemo(
    () =>
      components.map((component) => ({
        label: `${component.frequency} Hz component`,
        points: generateWave(component.frequency, component.amplitude, duration, sampleRate, component.phase),
        color: component.color,
        strokeWidth: 2,
        dashed: true,
      })),
    [components],
  );
  const series =
    components.length > 0
      ? [{ label: "Current sum", points: sum, color: "#1f2937", strokeWidth: 3.3 }, ...componentSeries]
      : [{ label: "Current sum", points: sum, color: "#1f2937", strokeWidth: 3.3 }];

  return (
    <DemoFrame note="The black trace is the current sum. The colored dashed traces show each sine wave component included in that sum.">
      <div className="checkbox-grid" aria-label="Sine wave components">
        {frequencies.map((frequency, index) => (
          <label className="checkbox-control" key={frequency}>
            <input
              checked={enabledFrequencies.includes(frequency)}
              type="checkbox"
              onChange={(event) => {
                setEnabledFrequencies((current) =>
                  event.target.checked
                    ? [...current, frequency].sort((a, b) => a - b)
                    : current.filter((item) => item !== frequency),
                );
              }}
            />
            <span style={{ "--check-color": componentColors[index] } as React.CSSProperties}>
              {frequency} Hz
            </span>
          </label>
        ))}
      </div>
      <WaveformPlot
        title={`Sum of ${components.length} selected frequency component${components.length === 1 ? "" : "s"}`}
        duration={duration}
        yRange={amplitudeRange([sum, ...componentSeries.map((series) => series.points)])}
        series={series}
      />
    </DemoFrame>
  );
}

function BandsDemo() {
  const [delta, setDelta] = useState(5);
  const [theta, setTheta] = useState(3);
  const [alpha, setAlpha] = useState(8);
  const [beta, setBeta] = useState(2);
  const bandColors = {
    delta: "#2563eb",
    theta: "#f97316",
    alpha: "#dc2626",
    beta: "#16a34a",
  };
  const components: ComponentWave[] = [
    { frequency: 2, amplitude: delta, phase: 0.2 },
    { frequency: 6, amplitude: theta, phase: 1.1 },
    { frequency: 10, amplitude: alpha, phase: 2.2 },
    { frequency: 18, amplitude: beta, phase: 0.7 },
  ];
  const sum = useMemo(() => sumWaves(components, duration, sampleRate), [components]);
  const bandSeries = useMemo(
    () => [
      {
        label: "Delta 2 Hz",
        points: generateWave(2, delta, duration, sampleRate, 0.2),
        color: bandColors.delta,
      },
      {
        label: "Theta 6 Hz",
        points: generateWave(6, theta, duration, sampleRate, 1.1),
        color: bandColors.theta,
      },
      {
        label: "Alpha 10 Hz",
        points: generateWave(10, alpha, duration, sampleRate, 2.2),
        color: bandColors.alpha,
      },
      {
        label: "Beta 18 Hz",
        points: generateWave(18, beta, duration, sampleRate, 0.7),
        color: bandColors.beta,
      },
    ],
    [delta, theta, alpha, beta],
  );

  return (
    <DemoFrame note="Each slider changes the amplitude of one representative band center frequency.">
      <div className="band-component-layout">
        <div className="band-slider-column" aria-label="Band amplitude controls">
          <Slider label="Delta 2 Hz" value={delta} min={0} max={16} unit=" uV" accentColor={bandColors.delta} onChange={setDelta} />
          <Slider label="Theta 6 Hz" value={theta} min={0} max={16} unit=" uV" accentColor={bandColors.theta} onChange={setTheta} />
          <Slider label="Alpha 10 Hz" value={alpha} min={0} max={16} unit=" uV" accentColor={bandColors.alpha} onChange={setAlpha} />
          <Slider label="Beta 18 Hz" value={beta} min={0} max={16} unit=" uV" accentColor={bandColors.beta} onChange={setBeta} />
        </div>
        <div className="band-plot-stack">
          <WaveformPlot
            title="Individual band sine waves"
            duration={duration}
            yRange={amplitudeRange(bandSeries.map((series) => series.points))}
            series={bandSeries}
          />
          <WaveformPlot
            title="Band mixture"
            duration={duration}
            yRange={amplitudeRange([sum])}
            series={[{ label: "Summed EEG-like trace", points: sum, color: "#1f2937" }]}
          />
        </div>
      </div>
    </DemoFrame>
  );
}

function FiltersDemo() {
  const [mode, setMode] = useState<"none" | "low-pass" | "high-pass" | "band-pass" | "notch">("low-pass");
  const [lowCut, setLowCut] = useState(5);
  const [highCut, setHighCut] = useState(14);
  const [notch, setNotch] = useState(10);
  const components: ComponentWave[] = [
    { frequency: 2, amplitude: 6, phase: 0.2 },
    { frequency: 6, amplitude: 5, phase: 1.1 },
    { frequency: 10, amplitude: 7, phase: 2.2 },
    { frequency: 16, amplitude: 3, phase: 0.6 },
    { frequency: 21, amplitude: 3, phase: 1.6 },
  ];
  const filtered = attenuateComponents(components, mode, lowCut, highCut, notch);
  const originalTrace = useMemo(() => sumWaves(components, duration, sampleRate), [components]);
  const filteredTrace = useMemo(() => sumWaves(filtered, duration, sampleRate), [filtered]);
  const setBandPassLowCut = (value: number) => {
    setLowCut(value);
    if (mode === "band-pass" && value > highCut) {
      setHighCut(value);
    }
  };
  const setBandPassHighCut = (value: number) => {
    setHighCut(value);
    if (mode === "band-pass" && value < lowCut) {
      setLowCut(value);
    }
  };

  return (
    <DemoFrame note="This teaching filter attenuates frequencies outside the chosen range so the effect is easy to see.">
      <div className="controls-grid">
        <Segmented
          label="Filter"
          value={mode}
          onChange={setMode}
          options={[
            { label: "None", value: "none" },
            { label: "Low-pass", value: "low-pass" },
            { label: "High-pass", value: "high-pass" },
            { label: "Band-pass", value: "band-pass" },
            { label: "Notch", value: "notch" },
          ]}
        />
        {mode === "high-pass" || mode === "band-pass" ? (
          <Slider label="Low cut" value={lowCut} min={1} max={12} unit=" Hz" onChange={setBandPassLowCut} />
        ) : null}
        {mode === "low-pass" || mode === "band-pass" ? (
          <Slider label="High cut" value={highCut} min={6} max={24} unit=" Hz" onChange={setBandPassHighCut} />
        ) : null}
        {mode === "notch" ? <Slider label="Notch" value={notch} min={2} max={22} unit=" Hz" onChange={setNotch} /> : null}
      </div>
      <WaveformPlot
        title="Original versus filtered trace"
        duration={duration}
        yRange={amplitudeRange([originalTrace, filteredTrace])}
        series={[
          { label: "Original", points: originalTrace, color: "#767676", dashed: true },
          { label: "Filtered", points: filteredTrace, color: "#7b4aa0", strokeWidth: 3.4 },
        ]}
      />
    </DemoFrame>
  );
}

function SamplingDemo() {
  const [signalFrequency, setSignalFrequency] = useState(10);
  const [lowRate, setLowRate] = useState(6);
  const [phase, setPhase] = useState(0.8);
  const high = useMemo(() => generateWave(signalFrequency, 9, duration, 220, phase), [signalFrequency, phase]);
  const sampled = useMemo(() => generateWave(signalFrequency, 9, duration, lowRate, phase), [signalFrequency, lowRate, phase]);
  const apparent = aliasFrequency(signalFrequency, lowRate);

  return (
    <DemoFrame note={`At ${lowRate} Hz sampling, the ${signalFrequency} Hz signal can appear near ${apparent} Hz.`}>
      <div className="controls-grid">
        <Slider label="True signal" value={signalFrequency} min={2} max={30} unit=" Hz" onChange={setSignalFrequency} />
        <Slider label="Sampling rate" value={lowRate} min={3} max={40} unit=" Hz" onChange={setLowRate} />
        <button className="icon-button" type="button" onClick={() => setPhase(Math.random() * Math.PI * 2)}>
          <Shuffle size={18} />
          Random phase
        </button>
      </div>
      <WaveformPlot
        title="Dense reference trace and sparse samples"
        duration={duration}
        yRange={12}
        series={[
          { label: "Reference signal", points: high, color: "#2563eb", strokeWidth: 2.4 },
          { label: `${lowRate} Hz samples`, points: sampled, color: "#dc2626", strokeWidth: 2.5, markers: true },
        ]}
      />
    </DemoFrame>
  );
}

function ScreenDemo() {
  const [signalFrequency, setSignalFrequency] = useState(60);
  const [pixelsPerInch, setPixelsPerInch] = useState(90);
  const [seconds, setSeconds] = useState(1);
  const [noise, setNoise] = useState(0.4);
  const logTime = Math.log10(seconds);
  const horizontalPixels = Math.round(screenWidthInches * pixelsPerInch);
  const screenSampleRate = horizontalPixels / seconds;
  const sampledFrequency = aliasFrequency(signalFrequency, screenSampleRate);
  const idealSampleRate = Math.min(1200, Math.max(240, signalFrequency * 28));
  const ideal = useMemo(() => generateWave(signalFrequency, 1.2, seconds, idealSampleRate, 0.5), [signalFrequency, seconds, idealSampleRate]);
  const displayed = useMemo(() => {
    const base = generateWave(signalFrequency, 1.2, seconds, screenSampleRate, 0.5);
    const slowNoise = generateWave(5, noise, seconds, screenSampleRate, 1.4);
    return base.map((point, index) => ({ ...point, y: point.y + slowNoise[index].y }));
  }, [signalFrequency, screenSampleRate, seconds, noise]);

  return (
    <DemoFrame note="The teal trace is what a 24-inch-wide screen can draw after the time window is compressed into the available horizontal pixels.">
      <div className="screen-context">
        <figure className="screen-diagram" aria-label="Computer screen width diagram">
          <div className="screen-frame">
            <div className="screen-inner">
              <span>{horizontalPixels.toLocaleString()} horizontal pixels</span>
            </div>
          </div>
          <div className="screen-measure">
            <span />
            <strong>24 inches</strong>
            <span />
          </div>
        </figure>
        <div className="screen-context-copy">
          <p className="eyebrow">Display model</p>
          <p>
            The simulated monitor is fixed at 24 inches wide. Pixels per inch determines how many horizontal positions are available to draw the selected time window.
          </p>
        </div>
      </div>
      <div className="controls-grid">
        <Slider label="Signal frequency" value={signalFrequency} min={10} max={90} unit=" Hz" onChange={setSignalFrequency} />
        <Slider label="Pixels per inch" value={pixelsPerInch} min={20} max={220} unit=" ppi" onChange={setPixelsPerInch} />
        <Slider
          label="Time shown"
          value={Number(logTime.toFixed(4))}
          min={-1}
          max={Math.log10(60)}
          step={0.01}
          displayValue={formatTime(seconds)}
          onChange={(value) => setSeconds(Number(10 ** value))}
        />
        <Slider label="Slow noise" value={noise} min={0} max={1.2} step={0.1} unit=" uV" onChange={setNoise} />
      </div>
      <WaveformPlot
        title="Ideal signal versus screen-limited display"
        duration={seconds}
        yRange={2.4}
        series={[
          { label: `Ideal signal (${signalFrequency} Hz)`, points: ideal, color: "#1f2937", strokeWidth: 1.7 },
          {
            label: `Screen sampled signal (${sampledFrequency} Hz apparent)`,
            points: displayed,
            color: "#0f766e",
            strokeWidth: 2.6,
            markers: horizontalPixels <= 160,
          },
        ]}
      />
    </DemoFrame>
  );
}

export const demos: DemoComponentMap = {
  sine: SineDemo,
  adding: AddingDemo,
  bands: BandsDemo,
  filters: FiltersDemo,
  sampling: SamplingDemo,
  screen: ScreenDemo,
};
