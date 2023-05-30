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

export function dispatchPlotEvent(canvas, event, params?) {
  const [plot] = canvas.document.getElementsByClassName('plot');
  plot.dispatchEvent(new CustomEvent(event, params));
}

export function dispatchFirstShapeEvent(canvas, className, event, params?) {
  const [shape] = canvas.document.getElementsByClassName(className);
  shape.dispatchEvent(new CustomEvent(event, params));
}
