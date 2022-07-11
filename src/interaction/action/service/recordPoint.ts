import { ActionComponent as AC } from '../../types';
import { RecordPointAction } from '../../../spec';

export type RecordPointOptions = Omit<RecordPointAction, 'type'>;

export const RecordPoint: AC<RecordPointOptions> = (options) => {
  const { clear, start } = options;
  return (context) => {
    const { shared, selection, event } = context;

    const plot = selection.select('.plot').node();
    const [x0, y0] = plot.getBounds().min;
    const { offsetX, offsetY } = event;

    if (clear) {
      shared.points = [];
    } else {
      const { points = [] } = shared;
      const newPoints = [...points];
      const currentPoint = [offsetX - x0, offsetY - y0];

      if (start) {
        shared.points = [...newPoints, [currentPoint]];
      } else {
        const lastPoints = newPoints.splice(-1, 1)[0] || [];
        lastPoints.push(currentPoint);
        shared.points = [...newPoints, lastPoints];
      }
    }

    return context;
  };
};

RecordPoint.props = {};
