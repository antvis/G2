import { least } from 'd3-array';
import { ActionComponent as AC } from '../../types';
import { SurfacePointSelectionAction } from '../../../spec';

export type SurfacePointSelectionOptions = Omit<
  SurfacePointSelectionAction,
  'type'
>;

export const SurfacePointSelection: AC<SurfacePointSelectionOptions> = (
  options,
) => {
  const { trigger } = options;
  return (context) => {
    const { coordinate, event, shared, selection, scale } = context;
    const { target, offsetX, offsetY } = event;
    const { x: scaleX } = scale;
    const { className } = target || {};

    shared.mouseX = offsetX;
    shared.mouseY = offsetY;

    if (trigger === 'axis') {
      const elements = selection
        .selectAll('.element')
        .nodes()
        .map((element) => {
          const { __data__: datum } = element;
          const {
            seriesX = [],
            seriesY = [],
            seriesTooltip = [],
            seriesTitle = [],
          } = datum;

          if (seriesX.length) {
            return seriesX.map((_, i) => {
              return {
                ...element,
                __data__: {
                  ...datum,
                  x: seriesX[i],
                  y: seriesY[i],
                  title: seriesTitle[i],
                  tooltip: seriesTooltip[i],
                },
              };
            });
          }
          return element;
        })
        .flat();

      // Find closestPoint by x (normalized).
      const plot = selection.select('.plot').node();
      const [x0, y0] = plot.getBounds().min;
      const invertX = coordinate.invert([offsetX - x0, offsetY - y0])[0];
      const closestPoint = least(
        elements,
        ({ __data__: { x } }) =>
          (x + (scaleX.getBandWidth?.(scaleX.invert(x)) || 0) / 2 - invertX) **
          2,
      );
      if (closestPoint) {
        shared.selectedElements = elements.filter(
          ({ __data__: { x } }) => x === closestPoint.__data__.x,
        );
      }
    } else if (className && className.includes('element')) {
      // @todo Replace with elementsFromPoint.
      shared.selectedElements = [target];
    } else {
      shared.selectedElements = [];
    }
    return context;
  };
};

SurfacePointSelection.props = {};
