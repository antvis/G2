import { chartEmitBrushHighlightAxisCross as render } from '../plots/api/chart-emit-brush-highlight-axis-cross';
import { dblclick, brush } from '../plots/interaction/penguins-point-brush';
import { AXIS_HOT_AREA_CLASS_NAME } from '../../src/interaction/brushAxisHighlight';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { createPromise, getElementByClassName } from './utils/event';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('chart.on', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(640, 480);

  it('chart.emit("brushAxis:highlight", callback) should emit events.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    // chart.emit('brushAxis:highlight', options) should trigger slider.
    chart.emit('brushAxis:highlight', {
      data: {
        selection: [
          [40, 50],
          [14, 18],
        ],
      },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('brushAxis:remove', options) should reset.
    chart.emit('brushAxis:remove', {});
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    const axis = getElementByClassName(canvas, AXIS_HOT_AREA_CLASS_NAME);

    // chart.on("brushAxis:highlight") should receive expected data.
    const [highlight, resolveHighlight] = createPromise();
    chart.on('brushAxis:highlight', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.selection).toEqual([
        [32.1, 59.6],
        [13.1, 21.5],
      ]);
      resolveHighlight();
    });
    brush(axis, -Infinity, 50, Infinity, 400);
    await sleep(20);
    await highlight;

    // chart.on("brushAxis:remove") should be called.
    const [remove, resolveRemove] = createPromise();
    chart.on('brushAxis:remove', (event) => {
      if (!event.nativeEvent) return;
      resolveRemove();
    });
    dblclick(axis);
    await sleep(20);
    await remove;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
