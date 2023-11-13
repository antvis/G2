import { chartEmitLegendHighlight as render } from '../plots/api/chart-emit-legend-highlight';
import {
  LEGEND_ITEMS_CLASS_NAME,
  CATEGORY_LEGEND_CLASS_NAME,
} from '../../src/interaction/legendFilter';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise, dispatchFirstShapeEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("legend:highlight") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('legend:highlight', options) should trigger slider.
    chart.emit('legend:highlight', {
      data: { channel: 'color', value: 'Increase' },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('legend:unhighlight', options) should reset.
    chart.emit('legend:unhighlight', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("legend:unhighlight") should be called.
    const [unhighlight, resolveUnhighlight] = createPromise();
    chart.on('legend:unhighlight', (event) => {
      if (!event.nativeEvent) return;
      resolveUnhighlight();
    });
    dispatchFirstShapeEvent(
      canvas,
      CATEGORY_LEGEND_CLASS_NAME,
      'pointerleave',
      { nativeEvent: true },
    );
    await sleep(20);
    await unhighlight;

    // chart.on("legend:highlight") should receive expected data.
    const [highlight, resolveHighlight] = createPromise();
    chart.on('legend:highlight', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data).toEqual({ channel: 'color', value: 'Increase' });
      resolveHighlight();
    });
    dispatchFirstShapeEvent(canvas, LEGEND_ITEMS_CLASS_NAME, 'pointerover', {
      nativeEvent: true,
    });
    await sleep(20);
    await highlight;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
