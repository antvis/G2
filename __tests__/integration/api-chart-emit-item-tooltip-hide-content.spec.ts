import { chartEmitItemTooltipHideContent as render } from '../plots/api/chart-emit-item-tooltip-hide-content';
import './utils/useSnapshotMatchers';
import { sleep } from './utils/sleep';
import { createDOMGCanvas } from './utils/createDOMGCanvas';

describe('chart.emit', () => {
  const canvas = createDOMGCanvas(800, 500);

  it('chart.emit and chart.on should control item tooltip display.', async () => {
    const { finished } = render({ canvas });
    const dir = `${__dirname}/snapshots/api`;
    await finished;
    await sleep(20);
    await expect(canvas).toMatchCanvasSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
