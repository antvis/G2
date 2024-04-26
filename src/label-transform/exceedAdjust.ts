import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { ExceedAdjustLabel } from '../spec';
import { Bounds } from '../utils/bounds';
import { show } from '../utils/style';

export type ExceedAdjustOptions = Omit<ExceedAdjustLabel, 'type'>;

/**
 * Hide the label when overlap.
 */
export const ExceedAdjust: LLC<ExceedAdjustOptions> = () => {
  const adjustCoorValue = (target: Bounds, edge: Bounds) => {
    const [[minEdgeX, minEdgeY], [maxEdgeX, maxEdgeY]] = edge;
    const [[minX, minY], [maxX, maxY]] = target;

    let changeX = 0,
      changeY = 0;

    // x-axis
    if (minX < minEdgeX) {
      changeX = minEdgeX - minX;
    } else if (maxX > maxEdgeX) {
      changeX = maxEdgeX - maxX;
    }

    // y-axis
    if (minY < minEdgeY) {
      changeY = minEdgeY - minY;
    } else if (maxY > maxEdgeY) {
      changeY = maxEdgeY - maxY;
    }

    return [changeX, changeY];
  };
  return (labels: DisplayObject[], coordinate) => {
    const { width, height } = coordinate.getOptions();

    labels.forEach((l) => {
      show(l);
      const { max, min } = l.getLocalBounds();
      const [xMax, yMax] = max,
        [xMin, yMin] = min;
      const changeValue = adjustCoorValue(
        [
          [xMin, yMin],
          [xMax, yMax],
        ],
        [
          [0, 0],
          [width, height],
        ],
      );
      l.style.x += changeValue[0];
      l.style.y += changeValue[1];
    });

    return labels;
  };
};
