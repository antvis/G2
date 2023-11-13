import { chartEmitScrollbarFilter as render } from '../plots/api/chart-emit-scrollbar-filter';
import { SCROLLBAR_CLASS_NAME } from '../../src/interaction/scrollbarFilter';
import { dispatchValueChange } from '../plots/tooltip/appl-line-slider-filter';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise } from './utils/event';
import './utils/useSnapshotMatchers';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("scrollbar:filter") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    const [SX, SY] = Array.from(
      canvas.document.getElementsByClassName(SCROLLBAR_CLASS_NAME),
    );

    // chart.emit('scrollbarX:filter', options) should trigger scrollbar.
    const X = ['2001-03'];
    chart.emit('scrollbarX:filter', {
      data: { selection: [X, undefined] },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('scrollbarY:filter', options) should trigger scrollbar.
    const Y = [50, 550];
    chart.emit('scrollbarY:filter', {
      data: { selection: [undefined, Y] },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("scrollbarX:filter") should receive expected data.
    const [filteredX, resolveX] = createPromise();
    chart.on('scrollbarX:filter', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.selection).toEqual([
        ['2001-05', '2002-03'],
        [50, 500],
      ]);
      resolveX();
    });
    dispatchValueChange(SX);
    await sleep(20);
    await filteredX;

    // chart.on("scrollbarY:filter") should receive expected data.
    const [filteredY, resolveY] = createPromise();
    chart.on('scrollbarY:filter', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.selection).toEqual([
        ['2001-05', '2002-03'],
        [150, 450],
      ]);
      resolveY();
    });
    dispatchValueChange(SY);
    await sleep(20);
    await filteredY;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
