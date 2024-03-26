import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush, brushSteps } from './penguins-point-brush';

function createPathRender(path) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { width, height, x, y, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.style.d = path(x, y, width, height);
    handle.attr(rest);
    return handle;
  };
}

export function penguinsPointBrushHandleCustom(): G2Spec {
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
      brushHighlight: {
        maskHandleSize: 30,
        maskHandleNRender: createPathRender((x, y, width, height) => {
          return `M${x},${y + height / 2}L${x + width / 2},${y - height / 2}L${
            x + width
          },${y + height / 2},Z`;
        }),
        maskHandleERender: createPathRender(
          (x, y, width, height) =>
            `M${x + width / 2},${y}L${x + (width * 3) / 2},${y + height / 2}L${
              x + width / 2
            },${y + height},Z`,
        ),
        maskHandleSRender: createPathRender(
          (x, y, width, height) =>
            `M${x},${y + height / 2}L${x + width / 2},${y + (height / 2) * 3}L${
              x + width
            },${y + height / 2},Z`,
        ),
        maskHandleWRender: createPathRender(
          (x, y, width, height) =>
            `M${x + width / 2},${y}L${x - width},${y + height / 2}L${
              x + width / 2
            },${y + height},Z`,
        ),
        maskHandleNWRender: createPathRender(
          (x, y, width, height) =>
            `M${x},${y}L${x + width},${y + height / 2}L${x + width / 2},${
              y + height
            },Z`,
        ),
        maskHandleNERender: createPathRender(
          (x, y, width, height) =>
            `M${x},${y + height / 2}L${x + width},${y}L${x + width / 2},${
              y + height
            },Z`,
        ),
        maskHandleSERender: createPathRender(
          (x, y, width, height) =>
            `M${x + width / 2},${y}L${x + width},${y + height}L${x},${
              y + height / 2
            },Z`,
        ),
        maskHandleSWRender: createPathRender(
          (x, y, width, height) =>
            `M${x + width / 2},${y}L${x + width},${y + height / 2}L${x},${
              y + height
            },Z`,
        ),
        maskHandleNFill: 'blue',
        maskHandleEFill: 'red',
        maskHandleSFill: 'green',
        maskHandleWFill: 'yellow',
        maskHandleNWFill: 'black',
        maskHandleNEFill: 'steelblue',
        maskHandleSEFill: 'pink',
        maskHandleSWFill: 'orange',
      },
    },
  };
}

penguinsPointBrushHandleCustom.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];

  return [
    {
      changeState: () => {
        brush(plot, 100, 100, 200, 200);
      },
    },
  ];
};

penguinsPointBrushHandleCustom.steps = brushSteps;
