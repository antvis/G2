import { issue6863 as render } from '../plots/bugfix/issue-6863';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('issue6863', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6863.render() should render expected line chart with log scale', async () => {
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
