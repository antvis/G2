import { chartEmitLegendFocus as render } from '../plots/api/chart-emit-legend-focus';
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

  it('chart.on("legend:focus") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('legend:focus', options) should trigger slider.
    chart.emit('legend:focus', {
      data: { channel: 'color', value: 'Sports' },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('legend:reset', options) should reset.
    chart.emit('legend:reset', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("legend:reset") should be called.
    const [end, resolveEnd] = createPromise();
    chart.on('legend:reset', (event) => {
      if (!event.nativeEvent) return;
      resolveEnd();
    });
    dispatchFirstShapeEvent(canvas, LEGEND_ITEMS_CLASS_NAME, 'click', {
      nativeEvent: true,
    });
    dispatchFirstShapeEvent(canvas, LEGEND_ITEMS_CLASS_NAME, 'click', {
      nativeEvent: true,
    });
    await sleep(20);
    await end;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
