import { issue7045 as render } from '../plots/bugfix/issue-7045';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('issue7045', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue7045.render() should handle exceedAdjust correctly when slider is enabled', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await chart.render();
    await sleep(20);
    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
