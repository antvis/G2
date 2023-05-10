import { chartEmitSeriesTooltip as render } from '../plots/api/chart-emit-series-tooltip';
import { kebabCase } from './utils/kebabCase';
import {
  dispatchPlotEvent,
  createPromise,
  receiveExpectData,
} from './utils/event';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createDOMGCanvas(800, 500);

  it('chart.emit and chart.on should control item tooltip display.', async () => {
    const { finished, chart, clear } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    clear();

    // chart.emit("tooltip:show", options) should show tooltip.
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      selector: '.tooltip',
    });

    // chart.emit("tooltip:hide") should hide tooltip.
    chart.emit('tooltip:hide');
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1', {
      selector: '.tooltip',
    });

    chart.off();
    // chart.on("tooltip:show", callback) should revive selected data.
    const [tooltipShowed, resolveShow] = createPromise();
    chart.on('tooltip:show', (event) => {
      const { x } = event.data.data;
      expect(x.toUTCString()).toBe('Tue, 23 Oct 2007 05:18:47 GMT');
      resolveShow();
    });
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });
    await tooltipShowed;

    // chart.on("tooltip:hide") should be called when hiding tooltip.
    const [tooltipHided, resolveHide] = createPromise();
    chart.on('tooltip:hide', receiveExpectData(resolveHide, null));
    dispatchPlotEvent(canvas, 'pointerleave');
    await tooltipHided;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
