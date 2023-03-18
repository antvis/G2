import { chartOnItemElement as render } from '../plots/api/chart-on-item-element';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { dispatchEvent, createPromise, receiveExpectData } from './utils/event';
import './utils/useSnapshotMatchers';
import { ChartEvent } from '../../src';

describe('chart.on', () => {
  const canvas = createDOMGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("element:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`element:${ChartEvent.CLICK}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("interval:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.CLICK}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("interval:dblclick", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DBLCLICK}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 2 });
    await fired;
  });

  it('chart.on("interval:pointertap", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_TAP}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointertap');
    await fired;
  });

  it('chart.on("interval:pointerdown", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_DOWN}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerdown');
    await fired;
  });

  it('chart.on("interval:pointerup", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_UP}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerup');
    await fired;
  });

  it('chart.on("interval:pointerover", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_OVER}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerover');
    await fired;
  });

  it('chart.on("interval:pointerout", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_OUT}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerout');
    await fired;
  });

  it('chart.on("interval:pointermove", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.POINTER_MOVE}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointermove');
    await fired;
  });

  it('chart.on("interval:pointerenter", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(
      `interval:${ChartEvent.POINTER_ENTER}`,
      receiveExpectData(resolve),
    );
    dispatchEvent(canvas, 'pointerenter');
    await fired;
  });

  it('chart.on("interval:pointerleave", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(
      `interval:${ChartEvent.POINTER_LEAVE}`,
      receiveExpectData(resolve),
    );
    dispatchEvent(canvas, 'pointerleave');
    await fired;
  });

  it('chart.on("interval:pointerupoutside", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(
      `interval:${ChartEvent.POINTER_UPOUTSIDE}`,
      receiveExpectData(resolve),
    );
    dispatchEvent(canvas, 'pointerupoutside');
    await fired;
  });

  it('chart.on("interval:dragstart", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG_START}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragstart');
    await fired;
  });

  it('chart.on("interval:dragend", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG_END}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragend');
    await fired;
  });

  it('chart.on("interval:drag", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'drag');
    await fired;
  });

  it('chart.on("interval:dragenter", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG_ENTER}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragenter');
    await fired;
  });

  it('chart.on("interval:dragleave", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG_LEAVE}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragleave');
    await fired;
  });

  it('chart.on("interval:dragover", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DRAG_OVER}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragover');
    await fired;
  });

  it('chart.on("interval:drop", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on(`interval:${ChartEvent.DROP}`, receiveExpectData(resolve));
    dispatchEvent(canvas, 'drop');
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
