import { chartEmitLegendDefaultSelect as render } from '../plots/api/chart-emit-legend-default-select';
import { LEGEND_ITEMS_CLASS_NAME } from '../../src/interaction/legendFilter';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise, dispatchFirstShapeEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.legend.defaultSelect should filter legend items by default.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // Check initial state with defaultSelect applied.
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('legend:reset', options) should reset.
    chart.emit('legend:reset', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // Test manual filter after defaultSelect.
    const [filter, resolveFilter] = createPromise();
    chart.on('legend:filter', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data).toEqual({
        channel: 'color',
        values: ['Strategy', 'Action', 'Shooter', 'Other'],
      });
      resolveFilter();
    });

    // Click on the first legend item (Sports) to deselect it.
    dispatchFirstShapeEvent(canvas, LEGEND_ITEMS_CLASS_NAME, 'click', {
      nativeEvent: true,
    });
    await sleep(20);
    await filter;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
