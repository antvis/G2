import { chartAutoFit as render } from '../plots/api/chart-auto-fit';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  let chart;
  let button;
  let fitted;

  it('chart({ autoFit: true }) should fit parent container', async () => {
    const { finished, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    chart = rest.chart;
    button = rest.button;
    fitted = rest.fitted;
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('chart.forceFit() should fit parent container', async () => {
    button.dispatchEvent(new CustomEvent('click'));
    await fitted;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
