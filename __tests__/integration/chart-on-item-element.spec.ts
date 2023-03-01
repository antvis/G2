import { chartOnItemElement as render } from '../plots/api/chart-on-item-element';
import { createDOMGCanvas } from './utils/createDOMGCanvas';
import { dispatchEvent, createPromise, receiveExpectData } from './utils/event';
import './utils/useSnapshotMatchers';

describe('chart.on', () => {
  const canvas = createDOMGCanvas(640, 480);
  const { finished, chart } = render({ canvas });

  chart.off();

  it('chart.on("element:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('element:click', receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("interval:click", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:click', receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 1 });
    await fired;
  });

  it('chart.on("interval:dblclick", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:dblclick', receiveExpectData(resolve));
    dispatchEvent(canvas, 'click', { detail: 2 });
    await fired;
  });

  it('chart.on("interval:pointerdown", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:pointerdown', receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerdown');
    await fired;
  });

  it('chart.on("interval:pointerup", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:pointerup', receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerup');
    await fired;
  });

  it('chart.on("interval:pointerover", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:pointerover', receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerover');
    await fired;
  });

  it('chart.on("interval:pointerout", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:pointerout', receiveExpectData(resolve));
    dispatchEvent(canvas, 'pointerout');
    await fired;
  });

  it('chart.on("interval:rightdown", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:rightdown', receiveExpectData(resolve));
    dispatchEvent(canvas, 'rightdown');
    await fired;
  });

  it('chart.on("interval:rightup", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:rightup', receiveExpectData(resolve));
    dispatchEvent(canvas, 'rightup');
    await fired;
  });

  it('chart.on("interval:dragstart", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:dragstart', receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragstart');
    await fired;
  });

  it('chart.on("interval:dragend", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:dragend', receiveExpectData(resolve));
    dispatchEvent(canvas, 'dragend');
    await fired;
  });

  it('chart.on("interval:drag", callback) should provide datum for item element', async () => {
    await finished;
    const [fired, resolve] = createPromise();
    chart.on('interval:drag', receiveExpectData(resolve));
    dispatchEvent(canvas, 'drag');
    await fired;
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
