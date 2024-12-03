import { issue6020 as render } from '../plots/bugfix/issue-6020';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('issue6020', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6020.render() should render expected line chart with log scale', async () => {
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
