import { isPolygonsIntersect } from '@antv/path-util';
import { G2Element, select } from '../../../utils/selection';
import { ActionComponent as AC } from '../../types';
import { ElementSelectionAction } from '../../../spec';

export type ElementSelectionOptions = Omit<ElementSelectionAction, 'type'>;

function getElementsByTriggerInfo(
  elements: G2Element[],
  scales: any,
  triggerInfo: any,
) {
  return elements.filter((element) => {
    const { __data__: data } = element;
    for (const item of triggerInfo) {
      const scale = scales[item.scaleType];
      if (scale && scale.invert(data[item.scaleType]) === item.id) return true;
    }
  });
}

function intersect(
  elements: G2Element[],
  oldSelectedElements: G2Element[] = [],
) {
  return oldSelectedElements
    .filter((e) =>
      elements.find(({ __data__: { key } }) => key === e.__data__.key),
    )
    .map((e) => e.__data__.key);
}

function intersects(bounds: any, bounds2: any) {
  return !(
    bounds2.min[0] > bounds.max[0] ||
    bounds2.max[0] < bounds.min[0] ||
    bounds2.min[1] > bounds.max[1] ||
    bounds2.max[1] < bounds.min[1]
  );
}

export const ElementSelection: AC<ElementSelectionOptions> = (options) => {
  const { from, filterBy: field, multiple, toggle } = options;

  return (context) => {
    const { event, shared, selection, scale: scales, transientLayer } = context;
    const elements = selection.selectAll('.element').nodes();
    const { selectedElements: oldSelectedElements = [] } = shared;
    shared.selectedElements = [];

    let selectedElements = [];
    if (from === 'triggerInfo') {
      const { triggerInfo = [] } = shared;
      selectedElements = getElementsByTriggerInfo(
        elements,
        scales,
        triggerInfo,
      );
    } else if (from === 'rect-mask') {
      const masks = transientLayer.selectAll('.mask').nodes();
      selectedElements = elements.filter((element) => {
        return masks.some((mask) =>
          intersects(element.getRenderBounds(), mask.getRenderBounds()),
        );
      });
    } else if (from === 'polygon-mask') {
      const masks = transientLayer.selectAll('.mask').nodes();
      selectedElements = elements.filter((element) => {
        return masks.some(({ __data__: { points } }) => {
          const { min, max } = element.getLocalBounds();
          const polygon = [min, [min[0], max[1]], max, [max[0], min[1]]];
          return isPolygonsIntersect(points, polygon);
        });
      });
    } else {
      const { target } = event;
      const { className } = target || {};
      if (className && className.includes('element')) {
        const getElementsBy = (field: string, value: any) => {
          const elements = selection.selectAll('.element').nodes();
          return elements.filter(({ __data__: data }) => data[field] === value);
        };

        const { __data__: data } = select(target).node();
        selectedElements = field ? getElementsBy(field, data[field]) : [target];
      }
    }

    const keys = intersect(selectedElements, oldSelectedElements);
    shared.selectedElements = selectedElements;
    if (multiple) {
      oldSelectedElements.forEach((e) => {
        if (!keys.includes(e.__data__.key)) shared.selectedElements.push(e);
      });
    }
    if (toggle) {
      shared.selectedElements = shared.selectedElements.filter(
        (element) => !keys.includes(element.__data__.key),
      );
    }

    return context;
  };
};

ElementSelection.props = {};
