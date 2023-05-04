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
) {
  return (event) => {
    expect(event.data).toEqual(data);
    resolve();
  };
}

export function dispatchEvent(canvas, event, params?) {
  const [element] = canvas.document.getElementsByClassName('element');
  element.dispatchEvent(new CustomEvent(event, params));
}
