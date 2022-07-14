import { head, last } from '@antv/util';
import { ActionComponent as AC } from '../../types';
import { MoveAction } from '../../../spec';

export type MoveOptions = Omit<MoveAction, 'type'>;

const signsX = {
  selection: +1,
  n: 0,
  e: +1,
  s: 0,
  w: -1,
  nw: -1,
  ne: +1,
  se: +1,
  sw: -1,
};

const signsY = {
  selection: +1,
  n: -1,
  e: 0,
  s: +1,
  w: 0,
  nw: -1,
  ne: -1,
  se: +1,
  sw: +1,
};

/**
 * @todo support move view. Now is only support mask, which is related with shared.points.
 */
export const Move: AC<MoveOptions> = () => {
  return (context) => {
    const { shared, event } = context;
    const { target, offsetX, offsetY } = event;
    const [mouseX = offsetX, mouseY = offsetY] = shared.currentPoint || [];

    if (target) {
      const shiftX = offsetX - mouseX;
      const shiftY = offsetY - mouseY;

      const { index } = target.style;
      if (shared.points[index]?.length >= 2 && index >= 0) {
        const points = shared.points[index];

        if (target.className.includes('handle')) {
          const { type } = target.style;
          const signX = signsX[type];
          const signY = signsY[type];

          let [x1, y1] = head(points);
          let [x2, y2] = last(points);
          if (signX < 0) x2 = Math.max((x1 += shiftX), x2);
          if (signX > 0) x1 = Math.min(x1, (x2 += shiftX));
          if (signY < 0) y2 = Math.max((y1 += shiftY), y2);
          if (signY > 0) y1 = Math.min(y1, (y2 += shiftY));
          shared.points[index] = [
            [x1, y1],
            [x2, y2],
          ];
        } else {
          shared.points[index] = points.map(([x, y]) => [
            x + shiftX,
            y + shiftY,
          ]);
        }
      }
    }

    return context;
  };
};

Move.props = {};
