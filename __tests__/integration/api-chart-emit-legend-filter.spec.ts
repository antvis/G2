import { chartEmitLegendFilter as render } from '../plots/api/chart-emit-legend-filter';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  let chart;

  it('chart.emit("legend:filter", options) should filter channel', async () => {
    const values = render({
      canvas,
      container: document.createElement('div'),
    });
    chart = values.chart;
    await values.finished;
    await sleep(20);

    // Click legend item.
    const [item] = values.items;
    item.dispatchEvent(new CustomEvent('click'));
    await sleep(20);
    await expect(canvas).toMatchCanvasSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
