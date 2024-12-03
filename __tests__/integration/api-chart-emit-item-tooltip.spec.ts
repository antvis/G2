import { chartEmitItemTooltip as render } from '../plots/api/chart-emit-item-tooltip';
import { kebabCase } from './utils/kebabCase';
import {
  dispatchFirstElementEvent,
  createPromise,
  receiveExpectData,
  dispatchFirstElementPointerMoveEvent,
} from './utils/event';
import './utils/useSnapshotMatchers';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe.skip('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.emit and chart.on should control item tooltip display.', async () => {
    const { finished, chart, clear } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    clear();

    // chart.emit("tooltip:show", options) should show tooltip.
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    // chart.emit("tooltip:hide") should hide tooltip.
    chart.emit('tooltip:hide');
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    chart.off();
    // chart.on("tooltip:show", callback) should revive selected data.
    const [tooltipShowed, resolveShow] = createPromise();
    chart.on('tooltip:show', receiveExpectData(resolveShow));
    dispatchFirstElementPointerMoveEvent(canvas);
    await tooltipShowed;

    // chart.on("tooltip:hide") should be called when hiding tooltip.
    const [tooltipHided, resolveHide] = createPromise();
    chart.on('tooltip:hide', receiveExpectData(resolveHide, null));
    dispatchFirstElementEvent(canvas, 'pointerleave');
    await tooltipHided;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
