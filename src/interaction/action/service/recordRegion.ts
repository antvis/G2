import { Vector2 } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { head, last } from '@antv/util';
import { ActionComponent as AC } from '../../types';
import { RecordRegionAction } from '../../../spec';

export type RecordRegionOptions = Omit<RecordRegionAction, 'type'>;

function getRegion(points: Vector2[], plot: DisplayObject, dim?: 'x' | 'y') {
  const start = head(points);
  const end = last(points);
  const halfExtents = plot.getBounds().halfExtents;

  let x = Math.min(start[0], end[0]);
  let y = Math.min(start[1], end[1]);
  let width = Math.abs(end[0] - start[0]);
  let height = Math.abs(end[1] - start[1]);

  if (dim === 'x') {
    y = 0;
    height = halfExtents[1] * 2;
  } else if (dim === 'y') {
    x = 0;
    width = halfExtents[0] * 2;
  }

  return { x, y, width, height };
}

export const RecordRegion: AC<RecordRegionOptions> = (options) => {
  const { dim } = options;
  return (context) => {
    const { shared, selection } = context;
    const { points = [] } = shared;

    const plot = selection.select('.plot').node();
    shared.regions = points.map((P) => getRegion(P, plot, dim));

    return context;
  };
};

RecordRegion.props = {};
