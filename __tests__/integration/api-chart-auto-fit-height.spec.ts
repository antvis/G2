import { chartAutoFitHeight as render } from '../plots/api';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart({ autoFit: true, height: 200 }) should fit parent container width and custom height', async () => {
    const { finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
