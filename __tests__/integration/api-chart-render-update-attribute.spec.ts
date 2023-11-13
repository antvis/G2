import { chartRenderUpdateAttributes as render } from '../plots/api/chart-render-update-attributes';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('chart.render', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);

  it('chart.render() should update attribute without animation', async () => {
    const { finished, chart, refreshed, refreshed1, button, ...rest } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    // To lineDash
    button.dispatchEvent(new CustomEvent('click'));
    await refreshed;
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0');

    // Reset
    button.dispatchEvent(new CustomEvent('click'));
    await refreshed1;
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
