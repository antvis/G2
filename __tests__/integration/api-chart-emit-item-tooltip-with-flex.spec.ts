import { chartEmitItemTooltipWithFlex as render } from '../plots/api/chart-emit-item-tooltip-with-flex';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.emit tooltip with flex', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 400);
  const { finished, button } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('chart.on("tooltip:show") should selected expected element.', async () => {
    await finished;
    button.dispatchEvent(new CustomEvent('click'));
    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
