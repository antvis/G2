import { DisplayObject } from '@antv/g';
import { SpiderLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isCircular } from '../utils/coordinate';
import { maybePercentage } from '../utils/helper';
import { sub } from '../utils/vector';

export type SpiderOptions = Omit<SpiderLabelTransform, 'type'>;

/**
 * Spider label transform only suitable for the labels in polar coordinate, labels should distinguish coordinate type.
 */
export const Spider: LLC<SpiderOptions> = (options) => {
  const { edgeDistance = 0 } = options;
  return (labels: DisplayObject[], coordinate) => {
    if (!isCircular(coordinate)) return labels;

    const { x: coordX, width } = coordinate.getOptions();
    const center = coordinate.getCenter();
    const margin = maybePercentage(edgeDistance, width);

    const edgeX = coordX + margin;
    const edgeX1 = coordX + width - margin;
    labels.forEach((label) => {
      const { x: originX, x0, y0 } = label.style;
      const dx = originX <= center[0] ? edgeX - originX : edgeX1 - originX;
      label.style.x += dx;

      const { x, y } = label.style;
      const p0 = sub([x0, y0], center);
      const p1 = sub([0, y], center);
      const p1x = p0[1] ? (p0[0] * p1[1]) / p0[1] + center[0] : x;
      label.style.connectorPoints = [[p1x - x, 0]];
    });
    return labels;
  };
};
