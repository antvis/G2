import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';

export function penguinsPointBrush(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    state: {
      inactive: { stroke: 'gray', opacity: 0.5 },
    },
    interaction: {
      brushHighlight: true,
    },
  };
}

export function brush(plot, x, y, x1, y1) {
  plot.dispatchEvent(
    new CustomEvent('dragstart', {
      // @ts-ignore
      offsetX: x,
      offsetY: y,
    }),
  );
  plot.dispatchEvent(
    new CustomEvent('dragend', {
      // @ts-ignore
      offsetX: x1,
      offsetY: y1,
    }),
  );
}

export function dragMask(plot, x, y, x1, y1) {
  const mask = plot.getElementsByClassName('mask')[0];
  mask.dispatchEvent(
    new CustomEvent('dragstart', {
      // @ts-ignore
      offsetX: x,
      offsetY: y,
    }),
  );
  mask.dispatchEvent(
    new CustomEvent('drag', {
      // @ts-ignore
      offsetX: x1,
      offsetY: y1,
    }),
  );
}

export function dblclick(plot, x = 200, y = 200) {
  plot.dispatchEvent(
    new CustomEvent('click', {
      // @ts-ignore
      offsetX: x,
      offsetY: y,
      timeStamp: Date.now(),
    }),
  );
  plot.dispatchEvent(
    new CustomEvent('click', {
      // @ts-ignore
      offsetX: x,
      offsetY: y,
      timeStamp: Date.now(),
    }),
  );
}

penguinsPointBrush.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];

  return [
    {
      changeState: () => {
        brush(plot, 100, 100, 200, 200);
      },
    },
    {
      changeState: () => {
        brush(plot, 250, 250, 400, 400);
      },
    },
    {
      changeState: () => {
        dragMask(plot, 300, 300, 0, 0);
      },
    },
    {
      changeState: () => {
        dragMask(plot, 100, 100, 640, 480);
      },
    },
  ];
};
