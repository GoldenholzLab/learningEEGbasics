export type WavePoint = {
  t: number;
  y: number;
};

export type ComponentWave = {
  frequency: number;
  amplitude: number;
  phase?: number;
};

export function generateWave(
  frequency: number,
  amplitude: number,
  duration: number,
  sampleRate: number,
  phase = 0,
): WavePoint[] {
  const count = Math.max(2, Math.round(duration * sampleRate));
  return Array.from({ length: count }, (_, index) => {
    const t = (duration * index) / (count - 1);
    return {
      t,
      y: amplitude * Math.sin(2 * Math.PI * frequency * t + phase),
    };
  });
}

export function sumWaves(
  components: ComponentWave[],
  duration: number,
  sampleRate: number,
): WavePoint[] {
  const count = Math.max(2, Math.round(duration * sampleRate));
  return Array.from({ length: count }, (_, index) => {
    const t = (duration * index) / (count - 1);
    const y = components.reduce((total, component) => {
      return (
        total +
        component.amplitude *
          Math.sin(2 * Math.PI * component.frequency * t + (component.phase ?? 0))
      );
    }, 0);
    return { t, y };
  });
}

export function attenuateComponents(
  components: ComponentWave[],
  mode: "none" | "low-pass" | "high-pass" | "band-pass" | "notch",
  lowCut: number,
  highCut: number,
  notchFrequency: number,
): ComponentWave[] {
  return components.map((component) => {
    let scale = 1;
    if (mode === "low-pass" && component.frequency > highCut) scale = 0.12;
    if (mode === "high-pass" && component.frequency < lowCut) scale = 0.12;
    if (
      mode === "band-pass" &&
      (component.frequency < lowCut || component.frequency > highCut)
    ) {
      scale = 0.12;
    }
    if (mode === "notch" && Math.abs(component.frequency - notchFrequency) <= 1) {
      scale = 0.08;
    }
    return { ...component, amplitude: component.amplitude * scale };
  });
}

export function aliasFrequency(signalFrequency: number, sampleRate: number): number {
  if (sampleRate <= 0) return signalFrequency;
  const folded = Math.abs(signalFrequency - sampleRate * Math.round(signalFrequency / sampleRate));
  return Number(folded.toFixed(2));
}

export function amplitudeRange(series: WavePoint[][]): number {
  const max = series.reduce((peak, points) => {
    return Math.max(peak, ...points.map((point) => Math.abs(point.y)));
  }, 1);
  return Math.max(1, max * 1.18);
}
