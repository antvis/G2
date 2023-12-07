import { chartEmitClickTooltip as render } from '../plots/api/chart-emit-click-tooltip';
import { kebabCase } from './utils/kebabCase';
import { dispatchFirstElementEvent, dispatchPlotEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('chart.emit', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(640, 480);

  it('chart.tooltip should disable native events.', async () => {
    const { finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    // Disable native events.
    dispatchFirstElementEvent(canvas, 'pointerover');

    await expect(canvas).toMatchDOMSnapshot(dir, 'step0', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    // Click item to show tooltip.
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await expect(canvas).toMatchDOMSnapshot(dir, 'step1', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });

    // Click plot to hide tooltip.
    dispatchPlotEvent(canvas, 'click', { detail: 1 });
    await expect(canvas).toMatchDOMSnapshot(dir, 'step2', {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
