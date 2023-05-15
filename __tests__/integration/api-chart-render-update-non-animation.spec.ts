import { chartRenderUpdateNonAnimation as render } from '../plots/api/chart-render-update-non-animation';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('chart.options.autoFit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart({ autoFit: true }) should fit parent container', async () => {
    const { finished, chart, refreshed, button, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    button.dispatchEvent(new CustomEvent('click'));
    await refreshed;
    await expect(canvas).toMatchCanvasSnapshot(dir, 'step0');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
