import { issue6714 as render } from '../plots/bugfix/issue-6714';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('issue6714', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6714.render() should correctly render', async () => {
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
