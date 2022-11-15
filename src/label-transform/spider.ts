import { DisplayObject } from '@antv/g';
import { SpiderLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isCircular } from '../utils/coordinate';
import { maybePercentage } from '../utils/helper';

export type SpiderOptions = Omit<SpiderLabelTransform, 'type'>;

/**
 * Spider label transform only suitable for the labels in polar coordinate, labels should distinguish coordinate type.
 */
export const Spider: LLC<SpiderOptions> = (options) => {
  const { edgeDistance = 0 } = options;
  return (labels: DisplayObject[], coordinate) => {
    if (!isCircular(coordinate)) return labels;

    const { x, width } = coordinate.getOptions();
    const [cx, cy] = coordinate.getCenter();
    const margin = maybePercentage(edgeDistance, width);

    const edgeX = x + margin;
    const x1 = x + width - margin;
    labels.forEach((label) => {
      const { x, x0, y0 } = label.style;
      const dx = x <= cx ? edgeX - x : x1 - x;
      label.style.x += dx;

      const p1y = label.style.y;
      const p1x = (x0 - cx) / ((y0 - cy) / (p1y - y0)) + x0;
      label.style.connectorPoints = [[p1x - label.style.x, 0]];
    });
    return labels;
  };
};
