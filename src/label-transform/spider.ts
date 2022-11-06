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
    const center = coordinate.getCenter();
    const distance = maybePercentage(edgeDistance, width);

    const x0 = x + distance;
    const x1 = x + width - distance;
    labels.forEach((label) => {
      const { x } = label.style;
      const dx = x <= center[0] ? x0 - x : x1 - x;
      // Change `dx` instead of `x` position, because the path of connector is relative to the `x` position.
      label.style.dx = dx;
    });
    return labels;
  };
};
