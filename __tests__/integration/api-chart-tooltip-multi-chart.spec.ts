import { chartTooltipMultiChart as render } from '../plots/api/chart-tooltip-multi-chart';
import { dispatchFirstElementEvent } from './utils/event';
import './utils/useSnapshotMatchers';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('chart.interaction.tooltip', () => {
  const canvas1 = createNodeGCanvas(640, 480);
  const canvas2 = createNodeGCanvas(640, 480);

  it('tooltip should not be shared if mount to body.', async () => {
    const { finished0, finished1 } = render({
      canvas1,
      canvas2,
      container: document.createElement('div'),
    });
    await Promise.all([finished0, finished1]);

    dispatchFirstElementEvent(canvas1, 'pointermove');
    dispatchFirstElementEvent(canvas2, 'pointermove');
    expect(
      Array.from(document.body.getElementsByClassName('g2-tooltip')).length,
    ).toBe(2);
  });

  afterAll(() => {
    canvas1?.destroy();
    canvas2?.destroy();
  });
});
