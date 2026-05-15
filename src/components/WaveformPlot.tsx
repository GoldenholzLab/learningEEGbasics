import type { WavePoint } from "../utils/waves";

type Series = {
  label: string;
  points: WavePoint[];
  color: string;
  strokeWidth?: number;
  dashed?: boolean;
  markers?: boolean;
};

type WaveformPlotProps = {
  title?: string;
  series: Series[];
  yRange: number;
  duration: number;
  height?: number;
  yAxisLabel?: string;
};

export function WaveformPlot({
  title,
  series,
  yRange,
  duration,
  height = 280,
  yAxisLabel = "Amplitude",
}: WaveformPlotProps) {
  const width = 900;
  const padding = { top: 28, right: 24, bottom: 42, left: 56 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const xFor = (t: number) => padding.left + (t / duration) * plotWidth;
  const yFor = (y: number) => padding.top + ((yRange - y) / (2 * yRange)) * plotHeight;

  const toPolyline = (points: WavePoint[]) =>
    points.map((point) => `${xFor(point.t).toFixed(2)},${yFor(point.y).toFixed(2)}`).join(" ");

  const xTicks = Array.from({ length: 5 }, (_, index) => (duration * index) / 4);
  const yTicks = [-yRange, -yRange / 2, 0, yRange / 2, yRange];

  return (
    <figure className="waveform">
      {title ? <figcaption>{title}</figcaption> : null}
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title ?? "Waveform plot"}>
        <rect className="plot-bg" x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} />
        <line className="axis baseline" x1={padding.left} x2={width - padding.right} y1={yFor(0)} y2={yFor(0)} />
        <line className="axis" x1={padding.left} x2={padding.left} y1={padding.top} y2={height - padding.bottom} />
        <line className="axis" x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} />
        {xTicks.map((tick) => (
          <g key={tick}>
            <line className="grid" x1={xFor(tick)} x2={xFor(tick)} y1={padding.top} y2={height - padding.bottom} />
            <text className="tick-label" x={xFor(tick)} y={height - 16} textAnchor="middle">
              {tick.toFixed(1)}s
            </text>
          </g>
        ))}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line className="grid horizontal-grid" x1={padding.left} x2={width - padding.right} y1={yFor(tick)} y2={yFor(tick)} />
            <line className="axis-tick" x1={padding.left - 6} x2={padding.left} y1={yFor(tick)} y2={yFor(tick)} />
            <text className="tick-label y-tick-label" x={padding.left - 10} y={yFor(tick) + 4} textAnchor="end">
              {Number.isInteger(tick) ? tick.toFixed(0) : tick.toFixed(1)}
            </text>
          </g>
        ))}
        <text className="axis-label" x={18} y={height / 2} transform={`rotate(-90 18 ${height / 2})`}>
          {yAxisLabel}
        </text>
        <text className="axis-label" x={width / 2} y={height - 2} textAnchor="middle">
          Time
        </text>
        {series.map((item) => (
          <g key={item.label}>
            <polyline
              points={toPolyline(item.points)}
              fill="none"
              stroke={item.color}
              strokeWidth={item.strokeWidth ?? 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={item.dashed ? "8 8" : undefined}
            />
            {item.markers
              ? item.points.map((point, index) => (
                  <circle key={`${item.label}-${index}`} cx={xFor(point.t)} cy={yFor(point.y)} r={4.2} fill={item.color} />
                ))
              : null}
          </g>
        ))}
      </svg>
      <div className="legend" aria-label="Plot legend">
        {series.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </figure>
  );
}
