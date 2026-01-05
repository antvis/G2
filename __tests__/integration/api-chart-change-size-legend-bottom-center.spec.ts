import { chartChangeSizeLegendBottomCenter as render } from '../plots/api/chart-change-size-legend-bottom-center';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.changeSize with legend bottom center', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('chart.changeSize(width, height) should correctly position centered bottom legend', async () => {
    const { finished, button, resized } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    button.dispatchEvent(new CustomEvent('click'));
    await resized;
    const dir = `${__dirname}/snapshots/api`;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
