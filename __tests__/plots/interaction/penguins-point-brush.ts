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
  const mask = plot.getElementById('selection');
  drag(mask, x, y, x1, y1);
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

export function drag(shape, x, y, x1, y1) {
  shape.dispatchEvent(
    new CustomEvent('dragstart', {
      // @ts-ignore
      offsetX: x,
      offsetY: y,
    }),
  );
  shape.dispatchEvent(
    new CustomEvent('dragend', {
      // @ts-ignore
      offsetX: x1,
      offsetY: y1,
    }),
  );
}

export function brushSteps({ canvas }) {
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
    ...resize(plot),
  ];
}

// Origin mask: [490, 330, 640, 480]
export function resize(plot) {
  const handles = [
    ['handle-n', 500, 330, 500, 200], // [490, 200, 640, 480]
    ['handle-e', 640, 300, 600, 300], // [490, 200, 600, 480]
    ['handle-s', 500, 480, 500, 300], // [490, 200, 600, 300]
    ['handle-w', 490, 200, 400, 200], // [400, 200, 500, 300]
    ['handle-nw', 400, 200, 300, 300], // [300, 300, 500, 300]
    ['handle-ne', 500, 300, 600, 200], // [300, 200, 600, 300]
    ['handle-se', 600, 300, 500, 200], // [300, 200, 500, 200]
    ['handle-sw', 300, 200, 400, 300], // [400, 200, 500, 300]
  ] as const;
  return handles.map(([id, x, y, x1, y1]) => ({
    changeState: () => {
      const handle = plot.getElementById(id);
      drag(handle, x, y, x1, y1);
    },
  }));
}

penguinsPointBrush.steps = brushSteps;
