import { DisplayObject } from '@antv/g';
import { SurroundLabelTransform } from '../spec';
import { LabelTransformComponent as LLC, Vector2 } from '../runtime';
import { isCircular } from '../utils/coordinate';
import { dist } from '../utils/vector';

export type SurroundOptions = Omit<SurroundLabelTransform, 'type'>;

/**
 * Surround label transform is used to make labels surround circular.
 */
export const Surround: LLC<SurroundOptions> = (options) => {
  return (labels: DisplayObject[], coordinate) => {
    if (!isCircular(coordinate)) return labels;

    const center = coordinate.getCenter();
    const radius = labels.reduce((r, label) => {
      const { x, y } = label.style;
      return Math.max(r, dist(center, [x, y]));
    }, 0);

    const angle = ([x, y]: Vector2, [x0, y0]: Vector2) => {
      if (x === x0) return Math.PI;
      const append = x > x0 ? Math.PI / 2 : -Math.PI / 2;
      return Math.atan((y - y0) / (x - x0)) + append;
    };

    labels.forEach((label) => {
      const { x, x0, y, y0 } = label.style;

      const labelAngle = angle([x, y], [x0, y0]);
      const newX = center[0] + Math.sin(labelAngle) * radius;
      const newY = center[1] - Math.cos(labelAngle) * radius;
      label.style.x = newX;
      label.style.y = newY;
    });

    return labels;
  };
};
