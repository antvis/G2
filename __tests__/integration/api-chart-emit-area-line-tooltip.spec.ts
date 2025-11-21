import { chartEmitAreaLineTooltip as render } from '../plots/api/chart-emit-area-line-tooltip';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit tooltip with area+line', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 400);
  const container = document.createElement('div');
  const { finished } = render({ canvas, container });

  it('tooltip DOM snapshot should match after show.', async () => {
    await finished;
    await sleep(20);
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
