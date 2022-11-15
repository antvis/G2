import { DisplayObject } from '@antv/g';
import { SurroundLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isCircular } from '../utils/coordinate';
import { dist, angleWithQuadrant } from '../utils/vector';

export type SurroundOptions = Omit<SurroundLabelTransform, 'type'>;

/**
 * Surround label transform is used to make labels surround circular.
 */
export const Surround: LLC<SurroundOptions> = (options) => {
  return (labels: DisplayObject[], coordinate) => {
    if (!isCircular(coordinate)) return labels;

    const center = coordinate.getCenter();
    const radius = labels.reduce((r, label) => {
      const { x0, y0, offset = 0 } = label.style;
      return Math.max(r, dist(center, [x0, y0])) + offset;
    }, 0);

    labels.forEach((label) => {
      const { x0, y0, connector, connectorLength2 = 0 } = label.style;
      const labelAngle = angleWithQuadrant([x0 - center[0], y0 - center[1]]);
      const length2 = connector
        ? connectorLength2 * (Math.sin(labelAngle) < 0 ? -1 : 1)
        : 0;

      const newX = center[0] + Math.sin(labelAngle) * radius;
      const newY = center[1] - Math.cos(labelAngle) * radius;
      label.style.x = newX + length2;
      label.style.y = newY;
      label.style.connectorPoints = [[-length2, 0]];
    });

    return labels;
  };
};
