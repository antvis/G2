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
    const { width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.style.d = path(width, height);
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
        maskHandleNRender: createPathRender(
          (width, height) =>
            `M0,${height / 2}L${width / 2},${-height / 2}L${width},${
              height / 2
            },Z`,
        ),
        maskHandleERender: createPathRender(
          (width, height) =>
            `M${width / 2},0L${(width * 3) / 2},${height / 2}L${
              width / 2
            },${height},Z`,
        ),
        maskHandleSRender: createPathRender(
          (width, height) =>
            `M0,${height / 2}L${width / 2},${(height / 2) * 3}L${width},${
              height / 2
            },Z`,
        ),
        maskHandleWRender: createPathRender(
          (width, height) =>
            `M${width / 2},0L${-width},${height / 2}L${width / 2},${height},Z`,
        ),
        maskHandleNWRender: createPathRender(
          (width, height) =>
            `M0,0L${width},${height / 2}L${width / 2},${height},Z`,
        ),
        maskHandleNERender: createPathRender(
          (width, height) =>
            `M0,${height / 2}L${width},0L${width / 2},${height},Z`,
        ),
        maskHandleSERender: createPathRender(
          (width, height) =>
            `M${width / 2},0L${width},${height}L0,${height / 2},Z`,
        ),
        maskHandleSWRender: createPathRender(
          (width, height) =>
            `M${width / 2},0L${width},${height / 2}L0,${height},Z`,
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
