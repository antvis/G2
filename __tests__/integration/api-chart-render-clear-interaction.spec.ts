import { CustomEvent as GCustomEvent } from '@antv/g';
import { chartRenderClearInteraction as render } from '../plots/api/chart-render-clear-interaction';
import { PLOT_CLASS_NAME } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('chart.render', () => {
  const dir = `${__dirname}/snapshots/api`;
  const canvas = createNodeGCanvas(640, 480);

  it('chart.interaction(name, false) should clear interaction.', async () => {
    const { finished } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    // Trigger tooltip
    const plot = canvas.document.getElementsByClassName(PLOT_CLASS_NAME)[0];
    plot.dispatchEvent(
      new GCustomEvent('pointermove', {
        offsetX: 200,
        offsetY: 300,
      }),
    );
    await expect(canvas).toMatchDOMSnapshot(dir, render.name, {
      fileFormat: 'html',
      selector: '.g2-tooltip',
    });
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
