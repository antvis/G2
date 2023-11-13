import { chartOnBrushHighlightTooltip as render } from '../plots/api/chart-on-brush-highlight-tooltip';
import { brush, dragMask } from '../plots/interaction/penguins-point-brush';
import './utils/useSnapshotMatchers';
import { PLOT_CLASS_NAME } from '../../src';
import { createPromise } from './utils/event';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('chart.on should on brush events.', async () => {
    const { finished, chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    const { document: gDocument } = canvas;
    const plot = gDocument.getElementsByClassName(PLOT_CLASS_NAME)[0];

    const [start, resolveStart] = createPromise();
    chart.on('brush:start', resolveStart);
    brush(plot, 100, 100, 300, 300);
    await start;
    await sleep(20);

    const [update, resolveUpdate] = createPromise();
    chart.on('brush:end', resolveUpdate);
    dragMask(plot, 30, 30, 60, 60);
    await update;
    await sleep(20);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
