import { chartOptions as render } from '../plots/api/chart-options';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.options', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  let chart;

  it('chart.options should init', async () => {
    const { finished, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    chart = rest.chart;
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('chart.options({ width: 480 }) should update chart._options', async () => {
    chart.options({ width: 480 });
    await chart.render();
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
