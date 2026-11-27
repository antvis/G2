import { Chart, type G2Spec } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

async function getMarkers(reverse = false, legend?: Record<string, unknown>) {
  const canvas = createNodeGCanvas(480, 320);
  const chart = new Chart({ canvas, container: document.createElement('div') });
  try {
    const data = [
      { x: 'A', bars: 2, trend: 5 },
      { x: 'B', bars: 4, trend: 3 },
    ];
    const children: G2Spec[] = [
      { type: 'interval', encode: { x: 'x', y: 'bars', color: () => 'bars' } },
      {
        type: 'line',
        encode: { x: 'x', y: 'trend', color: () => 'trend' },
        scale: { y: { independent: true } },
        axis: { y: { position: 'right' } },
      },
    ];
    chart.options({
      type: 'view',
      data,
      animate: false,
      children: reverse ? children.reverse() : children,
      legend: legend && { color: legend },
    });
    await chart.render();
    const markers = canvas.document.getElementsByClassName('g2-legend-marker');
    const labels = canvas.document.getElementsByClassName('g2-legend-label');
    expect(markers).toHaveLength(2);
    expect(labels).toHaveLength(2);
    return Object.fromEntries(
      labels.map((label, i) => [
        label.textContent || label.firstChild?.textContent,
        [
          markers[i].getAttribute('d')?.length,
          markers[i].getAttribute('lineWidth'),
        ],
      ]),
    );
  } finally {
    chart.destroy();
  }
}

it.each([false, true])(
  'keeps marker shape and stroke width for each mark (reversed: %s)',
  async (reverse) => {
    expect(await getMarkers(reverse)).toEqual({ bars: [5, 0], trend: [2, 4] });
  },
);

it('preserves an explicit legend marker and stroke width', async () => {
  expect(
    await getMarkers(false, { itemMarker: 'line', itemMarkerLineWidth: 6 }),
  ).toEqual({ bars: [2, 6], trend: [2, 6] });
});
