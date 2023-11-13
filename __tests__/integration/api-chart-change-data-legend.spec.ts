import { chartChangeDataLegend as render } from '../plots/api/chart-change-data-legend';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.changeData', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('mark.changeSize(width, height) should rerender expected chart', async () => {
    const { finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    const dir = `${__dirname}/snapshots/api`;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
