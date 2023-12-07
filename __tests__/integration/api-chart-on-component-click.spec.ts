import { chartOnComponentClick as render } from '../plots/api/chart-on-component-click';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { dispatchFirstShapeEvent, createPromise } from './utils/event';
import './utils/useSnapshotMatchers';
import { ChartEvent } from '../../src';

describe('chart.on', () => {
  const canvas = createNodeGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("component:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`component:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'component', 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("legend-category:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`legend-category:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'legend-category', 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("legend-category-item-marker:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`legend-category-item-marker:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'legend-category-item-marker', 'click', {
      detail: 1,
    });
    await fired;
  });

  it('chart.on("legend-category-item-label:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`legend-category-item-label:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'legend-category-item-label', 'click', {
      detail: 1,
    });
    await fired;
  });

  it('chart.on("grid-line:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`grid-line:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'grid-line', 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("axis-tick-item:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`axis-tick-item:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'axis-tick-item', 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("axis-label-item:click", callback) should emit events', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`axis-label-item:${ChartEvent.CLICK}`, resolve);
    dispatchFirstShapeEvent(canvas, 'axis-label-item', 'click', { detail: 1 });
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
