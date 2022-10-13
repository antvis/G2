/* eslint-disable */
import { render } from '@antv/g2v5';

export function g2V5CanvasSpec(data, { start, end }) {
  let node;
  start();
  node = render(
    {
      type: 'point',
      data,
      encode: {
        x: 'date',
        y: 'value',
      },
      style: {
        stroke: 'black',
      },
      animate: {
        enter: { type: null },
      },
    },
    undefined,
    () => end(node),
  );
}
