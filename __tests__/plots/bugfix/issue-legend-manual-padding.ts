import { Chart } from '../../../src';

// Regression test: when `paddingTop` is manually set as a number, the legend
// height should still be computed dynamically from its content (e.g. ~60px for
// a multi-row legend) rather than falling back to the component's defaultSize
// (40px for LegendCategory).
export function issueLegendManualPadding(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
    width: 800,
    height: 400,
    paddingTop: 72,
  });

  chart
    .line()
    .data([
      { time: '2024-01', value: 10, type: 'A' },
      { time: '2024-02', value: 20, type: 'A' },
      { time: '2024-01', value: 15, type: 'B' },
      { time: '2024-02', value: 25, type: 'B' },
      { time: '2024-01', value: 5, type: 'C' },
      { time: '2024-02', value: 12, type: 'C' },
    ])
    .encode('x', 'time')
    .encode('y', 'value')
    .encode('color', 'type');

  const finished = chart.render();

  return { chart, finished };
}
