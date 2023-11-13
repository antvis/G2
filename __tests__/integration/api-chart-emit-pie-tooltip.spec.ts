import { chartEmitPieTooltip as render } from '../plots/api/chart-emit-pie-tooltip';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.emit and chart.on should control item tooltip display.', async () => {
    const { finished, chart, clear } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;
    clear();

    // chart.emit("tooltip:show", options) should show tooltip.
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
