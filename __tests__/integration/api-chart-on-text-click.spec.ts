import { chartOnTextClick as render } from '../plots/api/chart-on-text-click';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { dispatchFirstElementEvent, createPromise } from './utils/event';
import './utils/useSnapshotMatchers';
import { ChartEvent } from '../../src';

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("text:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`text:${ChartEvent.CLICK}`, resolve);
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("element:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`element:${ChartEvent.CLICK}`, resolve);
    dispatchFirstElementEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
