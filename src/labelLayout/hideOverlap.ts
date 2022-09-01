import { DisplayObject } from '@antv/g';
import { isPolygonsIntersect } from '@antv/path-util';
import { LabelLayoutComponent as LLC } from '../runtime';

function getPoints(element: DisplayObject) {
  const { min, max } = element.getRenderBounds();
  const [x0, y0] = min;
  const [x1, y1] = max;
  return [
    [x0, y0],
    [x0, y1],
    [x1, y1],
    [x1, y0],
  ];
}

// @todo Support label shape with priority attribute.
export const HideOverlap: LLC = () => {
  return (labels: DisplayObject[]) => {
    const displayLabels = [];

    // Label with lower priority will be hidden when overlapped.
    labels.sort((a, b) => a.style.priority - b.style.priority);

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      label.style.visibility = 'visible';

      let overlapping = false;

      for (let j = 0; j < displayLabels.length; j++) {
        const existedLabel = displayLabels[j];
        if (isPolygonsIntersect(getPoints(label), getPoints(existedLabel))) {
          label.style.visibility = 'hidden';
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        displayLabels.push(label);
      }
    }

    return labels;
  };
};
