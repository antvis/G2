import { path as d3path } from 'd3-path';
import { Path, CustomEvent } from '@antv/g';
import { appendPolygon } from '../../../shape/utils';
import { ActionComponent as AC } from '../../types';
import { MaskAction } from '../../../spec';

export type MaskOptions = Omit<MaskAction, 'type'>;

/**
 * @todo add mask resize handler
 * @todo add mask movable
 */
export const Mask: AC<MaskOptions> = (options) => {
  const { maskType, fill = '#C5D4EB', fillOpacity = 0.3 } = options;
  return (context) => {
    const { shared, transientLayer } = context;
    const { regions = [], points = [] } = shared;

    const P =
      maskType === 'polygon'
        ? points
        : regions.map((region) => {
            const { x1, y1, x2, y2 } = region;
            return [
              [x1, y1],
              [x2, y1],
              [x2, y2],
              [x1, y2],
            ];
          });
    const data = P.map((points) => {
      return {
        d: appendPolygon(d3path(), points).toString(),
        fill,
        fillOpacity,
        points,
      };
    });

    transientLayer
      .selectAll('.mask')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter.append((style) => new Path({ className: 'mask', style })),
        (update) =>
          update.each(function (datum) {
            this.attr(datum);
            this.dispatchEvent(new CustomEvent('maskChange'));
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

Mask.props = {};
