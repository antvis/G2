import { chartEmitSliderFilter as render } from '../plots/api/chart-emit-slider-filter';
import { SLIDER_CLASS_NAME } from '../../src/interaction/sliderFilter';
import { dispatchValueChange } from '../plots/tooltip/appl-line-slider-filter';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import { createPromise } from './utils/event';
import './utils/useSnapshotMatchers';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.on("slider:filter") should receive expected data.', async () => {
    const { chart, finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);

    const [SX, SY] = Array.from(
      canvas.document.getElementsByClassName(SLIDER_CLASS_NAME),
    );

    // chart.emit('sliderX:filter', options) should trigger slider.
    const X = ['2001-01', '2001-03'];
    chart.emit('sliderX:filter', {
      data: { selection: [X, undefined] },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // chart.emit('sliderY:filter', options) should trigger slider.
    const Y = [50, 550];
    chart.emit('sliderY:filter', {
      data: { selection: [undefined, Y] },
    });
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');

    chart.off();

    // chart.on("sliderX:filter") should receive expected data.
    const [filteredX, resolveX] = createPromise();
    chart.on('sliderX:filter', (event) => {
      if (!event.nativeEvent) return;
      expect(event.data.selection).toEqual([
        ['2001-05', '2002-03'],
        [50, 550],
      ]);
      resolveX();
    });
    dispatchValueChange(SX);
    await sleep(20);
    await filteredX;

    // chart.on("sliderY:filter") should receive expected data.
    const [filteredY, resolveY] = createPromise();
    chart.on('sliderY:filter', (event) => {
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
