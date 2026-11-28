import { Chart } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

const width = 1000;
const height = 700;
const values = [3, 4, 3.5, 5, 4.9, 6, 7, 9, 13];

async function renderChart({
  margin = 0,
  fontSize = 12,
  paddingTop = undefined,
  position = 'left',
  label = true,
  tickFilter = undefined,
  labelTransform = undefined,
  chartHeight = height,
  insetTop = 0,
  insetBottom = 0,
}: {
  margin?: number;
  fontSize?: number;
  paddingTop?: number;
  position?: 'left' | 'right';
  label?: boolean;
  tickFilter?: (value: number) => boolean;
  labelTransform?: string;
  chartHeight?: number;
  insetTop?: number;
  insetBottom?: number;
} = {}) {
  const canvas = createNodeGCanvas(width, chartHeight);
  const chart = new Chart({
    container: document.createElement('div'),
    canvas,
    width,
    height: chartHeight,
    margin,
    paddingTop,
    insetTop,
    insetBottom,
  });
  chart
    .data(values.map((value, i) => ({ year: `${1991 + i}`, value })))
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('x', { range: [0, 1] })
    .scale('y', { domainMin: 0, nice: true })
    .axis('y', {
      position,
      labelFontSize: fontSize,
      label,
      tickFilter,
      labelTransform,
    });
  chart.line();
  chart.point().style('fill', 'white').tooltip(false);
  await chart.render();
  const labels = Array.from(
    canvas.document.getElementsByClassName('axis-label-item'),
  );
  const line = canvas.document.getElementsByClassName('element')[0];
  return { chart, labels, line };
}

describe('automatic padding for vertical axis labels', () => {
  it.each([
    {
      margin: 0,
      fontSize: 12,
      paddingTop: undefined,
      position: 'left',
      contained: true,
    },
    {
      margin: 0,
      fontSize: 12,
      paddingTop: undefined,
      position: 'right',
      contained: true,
    },
    {
      margin: 16,
      fontSize: 12,
      paddingTop: undefined,
      position: 'left',
      contained: true,
    },
    {
      margin: 0,
      fontSize: 24,
      paddingTop: undefined,
      position: 'left',
      contained: true,
    },
    {
      margin: 0,
      fontSize: 12,
      paddingTop: 0,
      position: 'left',
      contained: false,
    },
  ] as const)(
    'handles margin $margin, font size $fontSize, top padding $paddingTop and $position axis',
    async ({ margin, fontSize, paddingTop, position, contained }) => {
      const { chart, labels } = await renderChart({
        margin,
        fontSize,
        paddingTop,
        position,
      });
      const endpoint = labels.find((label) => label.style.text === '14');
      expect(endpoint).toBeDefined();
      if (!contained) {
        expect(endpoint.getBounds().min[1]).toBeLessThan(0);
      } else {
        expect(endpoint.getBounds().min[1]).toBeGreaterThanOrEqual(0);
        for (const label of labels.filter(
          (label) => label.style.visibility !== 'hidden',
        )) {
          const bounds = label.getBounds();
          expect(bounds.min[0]).toBeGreaterThanOrEqual(0);
          expect(bounds.min[1]).toBeGreaterThanOrEqual(0);
          expect(bounds.max[0]).toBeLessThanOrEqual(width);
          expect(bounds.max[1]).toBeLessThanOrEqual(height);
        }
      }
      chart.destroy();
    },
  );

  it.each([
    { name: 'disabled labels', axis: { label: false } },
    { name: 'transformed labels', axis: { labelTransform: 'translateY(20)' } },
    {
      name: 'filtered upper tick',
      axis: { tickFilter: (value: number) => value !== 14 },
    },
  ])('does not add space for $name', async ({ name, axis }) => {
    const auto = await renderChart(axis);
    const fixed = await renderChart({ ...axis, paddingTop: 0 });
    expect(auto.labels.some((label) => label.style.text === '14')).toBe(
      name === 'transformed labels',
    );
    expect(auto.line).toBeDefined();
    expect(fixed.line).toBeDefined();
    expect(auto.line.getBounds().min[1]).toBeCloseTo(
      fixed.line.getBounds().min[1],
    );
    expect(auto.line.getBounds().max[1]).toBeCloseTo(
      fixed.line.getBounds().max[1],
    );
    auto.chart.destroy();
    fixed.chart.destroy();
  });

  it.each([
    { chartHeight: 70, insetTop: 0, insetBottom: 0 },
    { chartHeight: 120, insetTop: 0, insetBottom: 0 },
    { chartHeight: 70, insetTop: 4, insetBottom: 4 },
    { chartHeight: 120, insetTop: 4, insetBottom: 4 },
  ])(
    'keeps the plot usable at height $chartHeight and insets $insetTop/$insetBottom',
    async (options) => {
      const { chart, line } = await renderChart({ ...options, fontSize: 72 });
      const fixed = await renderChart({
        ...options,
        fontSize: 72,
        paddingTop: 0,
      });
      const layout = chart.getContext().views[0].layout;
      const fixedLayout = fixed.chart.getContext().views[0].layout;
      const plotHeight =
        layout.innerHeight - options.insetTop - options.insetBottom;
      const fixedPlotHeight =
        fixedLayout.innerHeight - options.insetTop - options.insetBottom;
      expect(plotHeight).toBeGreaterThanOrEqual(
        Math.min(fixedPlotHeight, options.chartHeight / 4) - 1e-6,
      );
      expect(layout.innerHeight).toBeGreaterThanOrEqual(
        options.chartHeight / 4,
      );
      expect(
        layout.innerHeight - options.insetTop - options.insetBottom,
      ).toBeGreaterThan(0);
      expect(line.getBounds().max[1] - line.getBounds().min[1]).toBeGreaterThan(
        0,
      );
      chart.destroy();
      fixed.chart.destroy();
    },
  );

  it('does not add padding for independent Y axes', async () => {
    const renderDual = async (paddingTop?: number) => {
      const canvas = createNodeGCanvas(width, height);
      const chart = new Chart({
        container: document.createElement('div'),
        canvas,
        width,
        height,
        margin: 0,
        paddingTop,
      });
      chart.options({
        type: 'view',
        data: values.map((value, i) => ({
          year: `${1991 + i}`,
          value,
          other: value * 10,
        })),
        children: [
          {
            type: 'line',
            encode: { x: 'year', y: 'value' },
            scale: { y: { domainMin: 0, nice: true } },
          },
          {
            type: 'line',
            encode: { x: 'year', y: 'other' },
            scale: {
              y: { key: 'y1', independent: true, domainMin: 0, nice: true },
            },
            axis: { y: { position: 'right' } },
          },
        ],
      });
      await chart.render();
      return { chart, canvas };
    };
    const auto = await renderDual();
    const fixed = await renderDual(0);
    const labels = Array.from(
      auto.canvas.document.getElementsByClassName('axis-label-item'),
    );
    expect(labels.some((label) => label.style.text === '14')).toBe(true);
    expect(labels.some((label) => label.style.text === '140')).toBe(true);
    const autoLine = auto.canvas.document.getElementsByClassName('element')[0];
    const fixedLine =
      fixed.canvas.document.getElementsByClassName('element')[0];
    expect(autoLine.getBounds().min[1]).toBeCloseTo(
      fixedLine.getBounds().min[1],
    );
    expect(autoLine.getBounds().max[1]).toBeCloseTo(
      fixedLine.getBounds().max[1],
    );
    auto.chart.destroy();
    fixed.chart.destroy();
  });
});
