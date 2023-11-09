import { chartRenderEvent as render } from '../plots/api/chart-render-event';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import {
  dispatchFirstElementEvent,
  createPromise,
  receiveExpectData,
} from './utils/event';
import './utils/useSnapshotMatchers';
import { ChartEvent } from '../../src';

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("element:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`element:${ChartEvent.CLICK}`, receiveExpectData(resolve));
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
