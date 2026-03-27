import { issue7224 as render } from '../plots/bugfix/issue-7224';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('issue7224', () => {
  const canvas = createNodeGCanvas(800, 300);

  it('issue7224.render() should display legend title when title is configured', async () => {
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
