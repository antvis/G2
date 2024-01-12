import { chartOnLabelClick as render } from '../plots/api/chart-on-label-click';
import { ChartEvent } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { dispatchFirstShapeEvent, createPromise } from './utils/event';
import './utils/useSnapshotMatchers';

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("label:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`label:${ChartEvent.CLICK}`, (event) => {
      expect(event.data).toEqual({ data: { text: 'A', value: 12000, c: 's' } });
      resolve();
    });
    dispatchFirstShapeEvent(canvas, 'label', 'click', { detail: 1 });
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
