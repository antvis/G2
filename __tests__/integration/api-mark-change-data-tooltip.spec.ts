import { CustomEvent as GCustomEvent } from '@antv/g';
import { markChangeDataTooltip as render } from '../plots/api/mark-change-data-tooltip';
import { PLOT_CLASS_NAME } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('mark.changeData tooltip', () => {
  const canvas = createNodeGCanvas(640, 480);

  it('mark.changeData(width, height) should rerender expected chart', async () => {
    const { finished, button, chart } = render({
      canvas,
      container: document.createElement('div'),
    });
    await finished;

    // Update data
    button.dispatchEvent(new CustomEvent('click'));
    await new Promise<void>((resolve) => chart.on('afterrender', resolve));
    const dir = `${__dirname}/snapshots/api`;
    await sleep(20);

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
