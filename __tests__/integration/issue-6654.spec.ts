import { issue6654 as render } from '../plots/bugfix/issue-6654';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import { kebabCase } from './utils/kebabCase';

describe('issue6654', () => {
  const canvas = createNodeGCanvas(800, 500);
  const dir = `${__dirname}/snapshots/bugfix/${kebabCase(render.name)}`;

  it('issue6654.render() should initial rendering', async () => {
    const { chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await chart.render();
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('issue6654.render() should change color rendering', async () => {
    const { changeColor } = render({
      canvas,
      container: document.createElement('div'),
    });
    await changeColor();
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
