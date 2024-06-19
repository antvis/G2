import { CustomEvent } from '@antv/g';

export function createPromise() {
  let r;
  const promise = new Promise((resolve) => (r = resolve));
  return [promise, r];
}

export function receiveExpectData(
  resolve,
  data: any = {
    data: {
      genre: 'Sports',
      sold: 275,
    },
  },
  nativeEvent = true,
  asset = (event, data) => {
    if (data === null) {
      expect(event.data).toBeUndefined();
    } else {
      expect(event.data).toEqual(data);
    }
  },
) {
  return (event) => {
    asset(event, data);
    expect(event.nativeEvent).toBe(nativeEvent);
    resolve();
  };
}

export function dispatchFirstElementEvent(canvas, event, params?) {
  const [element] = canvas.document.getElementsByClassName('element');
  element.dispatchEvent(new CustomEvent(event, params));
}

export function dispatchFirstElementPointerMoveEvent(canvas) {
  const [element] = canvas.document.getElementsByClassName('element');
  const bounds = element.getRenderBounds() ?? element.getBounds();
  const {
    min: [x0, y0],
    max: [x1, y1],
  } = bounds;
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  element.dispatchEvent(
    new CustomEvent('pointermove', { offsetX: mx, offsetY: my }),
  );
}

export function dispatchPlotEvent(canvas, event, params?) {
  const [plot] = canvas.document.getElementsByClassName('plot');
  plot.dispatchEvent(new CustomEvent(event, params));
}

export function dispatchFirstShapeEvent(canvas, className, event, params?) {
  const [shape] = canvas.document.getElementsByClassName(className);
  shape.dispatchEvent(new CustomEvent(event, params));
}

export function getElementByClassName(canvas, className) {
  return canvas.document.getElementsByClassName(className)[0];
}
