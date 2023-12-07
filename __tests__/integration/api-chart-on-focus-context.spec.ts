import { chartOnFocusContext as render } from '../plots/api/chart-on-focus-context';
import {
  dblclick,
  brush,
  dragMask,
} from '../plots/interaction/penguins-point-brush';
import { PLOT_CLASS_NAME } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';
import { createPromise } from './utils/event';

function plotOf(canvas) {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return plot;
}

describe('chart.on', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas1 = createNodeGCanvas(640, 360);
  const canvas2 = createNodeGCanvas(640, 80);
  const assetSnapshots = async (step) => {
    await sleep(500);
    await expect(canvas1).toMatchDOMSnapshot(dir, step + '-focus', {
      keepSVGElementId: false,
    });
    await expect(canvas2).toMatchDOMSnapshot(dir, step + '-context', {
      keepSVGElementId: false,
    });
  };

  it('chart.on({...}) should enables different charts to communicate.', async () => {
    const { focused, contexted, focusView } = render({
      canvas1,
      canvas2,
      container: document.createElement('div'),
    });
    await focused;
    await contexted;

    const focusPlot = plotOf(canvas1);
    const contextPlot = plotOf(canvas2);

    // Brush context view.
    const [p1, r1] = createPromise();
    brush(focusPlot, 100, 100, 300, 300);
    await assetSnapshots('step0');

    // Brush context view again.
    const [p2, r2] = createPromise();
    brush(focusPlot, 200, 200, 400, 400);
    await assetSnapshots('step1');

    // Drag focus view.
    dragMask(contextPlot, 50, 50, 100, 100);
    await assetSnapshots('step2');

    // Reset focus view.
    dblclick(contextPlot);
    await assetSnapshots('step3');

    // Brush focus view.
    brush(focusPlot, 30, 30, 180, 180);
    await assetSnapshots('step4');

    // Drag focus view.
    dragMask(contextPlot, 50, 50, 100, 100);
    await assetSnapshots('step5');

    // Reset focus view.
    dblclick(contextPlot);
    await assetSnapshots('step6');
  });

  afterAll(() => {
    canvas1?.destroy();
    canvas2?.destroy();
  });
});
