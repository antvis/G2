import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { ExceedAdjustLabel } from '../spec';
import { Bounds } from '../utils/bounds';
import { show } from '../utils/style';

const adjustPosition = (target: Bounds, edge: Bounds) => {
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

export type ExceedAdjustOptions = Omit<ExceedAdjustLabel, 'type'>;

/**
 * adjust the label when exceed the plot
 */
export const ExceedAdjust: LLC<ExceedAdjustOptions> = () => {
  return (labels: DisplayObject[], { canvas }) => {
    const { width, height } = canvas.getConfig();

    labels.forEach((l) => {
      show(l);
      const { max, min } = l.getRenderBounds();
      const [xMax, yMax] = max,
        [xMin, yMin] = min;
      const changeValue = adjustPosition(
        [
          [xMin, yMin],
          [xMax, yMax],
        ],
        [
          [0, 0],
          [width, height],
        ],
      );
      // For label with connectorPoints
      if (l.style.connector && l.style.connectorPoints) {
        l.style.connectorPoints[0][0] -= changeValue[0];
        l.style.connectorPoints[0][1] -= changeValue[1];
      }
      l.style.x += changeValue[0];
      l.style.y += changeValue[1];
    });

    return labels;
  };
};
