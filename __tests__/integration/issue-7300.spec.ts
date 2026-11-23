import { issue7300 as render } from '../plots/bugfix/issue-7300';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue7300', () => {
  const canvas = createNodeGCanvas(400, 500);

  it('issue7300.render() should correctly render gauge chart with inner axis position', async () => {
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
