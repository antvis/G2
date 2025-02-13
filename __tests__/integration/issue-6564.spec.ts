import { issue6564 as render } from '../plots/bugfix/issue-6564';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue6564', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6564.render() should render chart with custom slice shape', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });

    await chart.render();
    await sleep(20);

    const slices = canvas.document.getElementsByTagName('path');
    expect(slices.length).toBeGreaterThan(0);

    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
