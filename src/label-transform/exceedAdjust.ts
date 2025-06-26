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

export type ExceedAdjustOptions = Omit<ExceedAdjustLabel, 'type'> & {
  /** Offset value that applies to both offsetX and offsetY */
  offset?: number;
  /** X-axis offset, takes higher priority than offset */
  offsetX?: number;
  /** Y-axis offset, takes higher priority than offset */
  offsetY?: number;
};

/**
 * adjust the label when exceed the specific area
 */
export const ExceedAdjust: LLC<ExceedAdjustOptions> = (options = {}) => {
  return (labels: DisplayObject[], { canvas, layout }) => {
    const { bounds = 'view', offset = 0, offsetX, offsetY } = options;

    // Handle offset priority: offsetX/offsetY have higher priority than offset
    const finalOffsetX = offsetX !== undefined ? offsetX : offset;
    const finalOffsetY = offsetY !== undefined ? offsetY : offset;

    // Calculate boundary area based on bounds option
    const getBoundaryArea = () => {
      if (bounds === 'main') {
        // Main area: exclude margins and paddings from view area
        const {
          x = 0,
          y = 0,
          width = 0,
          height = 0,
          marginLeft = 0,
          marginRight = 0,
          marginTop = 0,
          marginBottom = 0,
          paddingLeft = 0,
          paddingRight = 0,
          paddingTop = 0,
          paddingBottom = 0,
        } = layout;

        return [
          [
            x + marginLeft + paddingLeft + finalOffsetX,
            y + marginTop + paddingTop + finalOffsetY,
          ],
          [
            x + width - marginRight - paddingRight - finalOffsetX,
            y + height - marginBottom - paddingBottom - finalOffsetY,
          ],
        ] as Bounds;
      } else {
        // View area (default): entire layout area
        const { x = 0, y = 0, width = 0, height = 0 } = layout;
        return [
          [x + finalOffsetX, y + finalOffsetY],
          [x + width - finalOffsetX, y + height - finalOffsetY],
        ] as Bounds;
      }
    };

    const boundaryArea = getBoundaryArea();

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
        // Use the calculated boundary area based on bounds configuration
        boundaryArea,
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
