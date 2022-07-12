import { Coordinate, Vector2 } from '@antv/coord';
import { head, last } from '@antv/util';
import { ActionComponent as AC } from '../../types';
import { RecordRegionAction } from '../../../spec';

export type RecordRegionOptions = Omit<RecordRegionAction, 'type'>;

function getRegion(points: Vector2[], coordinate: Coordinate, dim?: 'x' | 'y') {
  const options = coordinate.getOptions();
  const start = head(points);
  const end = last(points);

  let x1 = Math.min(start[0], end[0]);
  let y1 = Math.min(start[1], end[1]);
  let width = Math.abs(end[0] - start[0]);
  let height = Math.abs(end[1] - start[1]);

  if (dim === 'x') {
    y1 = options.y;
    height = options.height;
  } else if (dim === 'y') {
    x1 = options.x;
    width = options.width;
  }

  return { x1, y1, x2: x1 + width, y2: y1 + height };
}

export const RecordRegion: AC<RecordRegionOptions> = (options) => {
  const { dim } = options;
  return (context) => {
    const { shared, coordinate } = context;
    const { points = [] } = shared;

    shared.regions = points.map((P) => getRegion(P, coordinate, dim));

    return context;
  };
};

RecordRegion.props = {};
