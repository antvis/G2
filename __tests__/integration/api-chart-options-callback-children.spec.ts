import { chartOptionsCallbackChildren as render } from '../plots/api/chart-options-callback-children';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.options', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(480, 480);
  let chart;

  it('chart.options should return node with callback children.', async () => {
    const { finished, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    chart = rest.chart;
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
