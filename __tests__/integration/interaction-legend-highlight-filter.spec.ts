import { CustomEvent } from '@antv/g';
import { Chart } from '../../src';
import {
  itemsOf,
  labelOf,
  legendsOf,
  markerOf,
} from '../../src/interaction/legendFilter';
import { selectG2Elements } from '../../src/interaction/utils';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('legendHighlight with legendFilter', () => {
  let chart: Chart;
  let canvas: ReturnType<typeof createNodeGCanvas>;
  const domain = ['A', 'B', 'C'];
  const colors = ['#ff0000', '#00ff00', '#0000ff'];

  beforeEach(async () => {
    canvas = createNodeGCanvas(600, 400);
    chart = new Chart({ canvas, container: document.createElement('div') });
    chart.options({
      type: 'interval',
      data: domain.flatMap((series) => [
        { series, x: 'one', y: 1 },
        { series, x: 'two', y: 2 },
      ]),
      encode: { x: 'x', y: 'y', color: 'series' },
      transform: [{ type: 'stackY' }],
      scale: { color: { domain, range: colors } },
      animate: false,
      axis: false,
      state: { inactive: { opacity: 0.2 } },
      legend: {
        color: {
          state: { inactive: { markerOpacity: 0.2, labelOpacity: 0.2 } },
        },
      },
      interaction: {
        legendFilter: true,
        legendHighlight: true,
        tooltip: false,
      },
    });
    await chart.render();
  });

  afterEach(() => chart.destroy());

  const legend = () => legendsOf(canvas.document.documentElement)[0];
  const item = (value: string) =>
    itemsOf(legend()).find((d) => labelOf(d).attr('text') === value);
  const elements = () => selectG2Elements(canvas.document.documentElement);
  const hover = (value: string) =>
    item(value).dispatchEvent(new CustomEvent('pointerover'));
  const leave = () => legend().dispatchEvent(new CustomEvent('pointerleave'));

  async function click(value: string, event: 'legend:filter' | 'legend:reset') {
    const finished = new Promise<void>((resolve) => {
      chart.once(event, () => resolve());
    });
    item(value).dispatchEvent(new CustomEvent('click'));
    await finished;
  }

  function expectHighlight(value: string) {
    const color = colors[domain.indexOf(value)];
    for (const element of elements()) {
      expect(Number(element.attr('opacity') ?? 1)).toBe(
        element.attr('fill') === color ? 1 : 0.2,
      );
    }
  }

  it('highlights the current elements after filtering and restoring a series', async () => {
    hover('A');
    expectHighlight('A');
    leave();

    await click('B', 'legend:filter');
    await vi.waitFor(() => expect(elements()).toHaveLength(4));
    hover('A');
    expectHighlight('A');
    leave();

    await click('B', 'legend:reset');
    await vi.waitFor(() => expect(elements()).toHaveLength(6));
    hover('A');
    expectHighlight('A');
    hover('B');
    expectHighlight('B');
    leave();
    for (const element of elements()) {
      expect(Number(element.attr('opacity') ?? 1)).toBe(1);
    }
  });

  it('preserves the unselected legend style while hovering and leaving', async () => {
    await click('B', 'legend:filter');
    const marker = markerOf(item('B'));
    const label = labelOf(item('B'));
    expect(marker.attr('fill')).toBe('#aaa');
    expect(label.attr('fill')).toBe('#aaa');

    hover('A');
    expect(marker.attr('fill')).toBe('#aaa');
    expect(label.attr('fill')).toBe('#aaa');
    expect(Number(label.attr('opacity'))).toBe(0.2);
    leave();
    expect(marker.attr('fill')).toBe('#aaa');
    expect(label.attr('fill')).toBe('#aaa');
    expect(Number(label.attr('opacity'))).toBe(1);

    hover('B');
    leave();
    expect(marker.attr('fill')).toBe('#aaa');
    expect(label.attr('fill')).toBe('#aaa');

    await click('B', 'legend:reset');
    expect(marker.attr('fill')).toBe(colors[1]);
  });

  it('emits one highlight and unhighlight event after repeated filtering', async () => {
    const onHighlight = vi.fn();
    const onUnhighlight = vi.fn();
    chart.on('legend:highlight', onHighlight);
    chart.on('legend:unhighlight', onUnhighlight);

    for (let i = 0; i < 3; i++) {
      await click('B', 'legend:filter');
      await vi.waitFor(() => expect(elements()).toHaveLength(4));
      await click('B', 'legend:reset');
      await vi.waitFor(() => expect(elements()).toHaveLength(6));
      hover('C');
      expectHighlight('C');
      leave();
      expect(onHighlight).toHaveBeenCalledTimes(i + 1);
      expect(onUnhighlight).toHaveBeenCalledTimes(i + 1);
    }
  });
});
