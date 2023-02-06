import { createNodeGCanvas } from '../utils/createNodeGCanvas';
import { sleep } from '../utils/sleep';
import { kebabCase } from '../utils/kebabCase';
import { basicIntervalChartAutoFit as render } from './basic-interval-chart-auto-fit';
import '../utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/../snapshots-api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  let chart;
  let button;

  it('chart({ autoFit: true }) should fit parent container', async () => {
    const { finished, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    chart = rest.chart;
    button = rest.button;
    await finished;
    await sleep(20);
    await expect(canvas).toMatchCanvasSnapshot(dir, 'step0');
  });

  it('chart.forceFit() should fit parent container', async () => {
    button.dispatchEvent(new CustomEvent('click'));
    await new Promise((resolve) => chart.on('afterchangesize', resolve));
    await sleep(20);
    await expect(canvas).toMatchCanvasSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
