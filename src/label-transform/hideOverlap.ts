import { DisplayObject } from '@antv/g';
import { isPolygonsIntersect } from '@antv/path-util';
import { ascending } from 'd3-array';
import { LabelTransformComponent as LLC } from '../runtime';
import { HideOverlapLabelTransform } from '../spec';

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

export type HideOverlapOptions = Omit<HideOverlapLabelTransform, 'type'>;

function priority(shape: DisplayObject) {
  return shape.style.priority || 0;
}

function show(shape: DisplayObject) {
  shape.style.visibility = 'visible';
}

function hide(shape: DisplayObject) {
  shape.style.visibility = 'hidden';
}

// @todo Support label shape with priority attribute.
export const HideOverlap: LLC<HideOverlapOptions> = () => {
  return (labels: DisplayObject[], coordinate) => {
    const displayLabels = [];

    // Label with lower priority will be hidden when overlapped.
    labels.sort((a, b) => ascending(priority(a), priority(b)));

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      show(label);

      let overlapping = false;
      for (let j = 0; j < displayLabels.length; j++) {
        const existedLabel = displayLabels[j];
        if (isPolygonsIntersect(getPoints(label), getPoints(existedLabel))) {
          hide(label);
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
