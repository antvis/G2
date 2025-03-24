import { issue6693 as render } from '../plots/bugfix/issue-6693';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('issue6693', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6693.render() should correctly render a line chart with sorted data', async () => {
    const { chart, finished } = await render({
      canvas,
      container: document.createElement('div'),
    });

    await finished;
    await sleep(20);

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
