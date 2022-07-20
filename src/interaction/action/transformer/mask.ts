import { path as d3path } from 'd3-path';
import { CustomEvent, Path, Rect } from '@antv/g';
import { appendPolygon } from '../../../shape/utils';
import { ActionComponent as AC } from '../../types';
import { MaskAction } from '../../../spec';

export type MaskOptions = Omit<MaskAction, 'type'>;

function getPointsBy(regions) {
  return regions.map((region) => {
    const { x1, y1, x2, y2 } = region;
    return [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2],
    ];
  });
}

const cursors = {
  n: 'ns-resize',
  e: 'ew-resize',
  s: 'ns-resize',
  w: 'ew-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
};

function getHandleDirections(maskType: string) {
  if (maskType === 'polygon') return [];
  if (maskType === 'rectX') return ['w', 'e'];
  if (maskType === 'rectY') return ['n', 's'];
  return ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'];
}

/**
 * @todo add mask resize handler
 */
export const Mask: AC<MaskOptions> = (options) => {
  const { maskType, fill = '#C5D4EB', fillOpacity = 0.3 } = options;
  return (context) => {
    const { shared, transientLayer } = context;
    const { regions = [], points = [] } = shared;

    const P = maskType === 'polygon' ? points : getPointsBy(regions);
    const data = P.map((points, index) => ({
      draggable: true,
      d: appendPolygon(d3path(), points).toString(),
      fill,
      fillOpacity,
      stroke: fill,
      lineWidth: 0.5,
      points,
      cursor: 'move',
      index,
    }));

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

    const handleSize = 6;
    const directions = getHandleDirections(maskType);
    const handles = regions
      .map((region, index) => {
        const { x1, y1, x2, y2 } = region;
        return directions.map((d) => {
          return {
            draggable: true,
            x: d.includes('e') ? x2 - handleSize / 2 : x1 - handleSize / 2,
            y: d.includes('s') ? y2 - handleSize / 2 : y1 - handleSize / 2,
            width: d === 'n' || d === 's' ? x2 - x1 + handleSize : handleSize,
            height: d === 'e' || d === 'w' ? y2 - y1 + handleSize : handleSize,
            className: `handle handle-${d}`,
            fill: 'transparent',
            type: d,
            cursor: cursors[d],
            index,
          };
        });
      })
      .flat();
    transientLayer
      .selectAll('.handle')
      .data(handles, (_, i) => i)
      .join(
        (enter) =>
          enter.append(
            ({ className, ...style }) => new Rect({ className, style }),
          ),
        (update) =>
          update.each(function (datum) {
            this.attr(datum);
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

Mask.props = {};
