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

export const ElementSelection: AC<ElementSelectionOptions> = (options) => {
  const { from, filterBy } = options;

  return (context) => {
    const { event, shared, selection, scale: scales } = context;

    shared.selectedElements = [];

    if (from === 'triggerInfo') {
      const { triggerInfo = [] } = shared;
      const elements = selection.selectAll('.element').nodes();
      shared.selectedElements = getElementsByTriggerInfo(
        elements,
        scales,
        triggerInfo,
      );
    } else {
      const { target } = event;
      const { className } = target || {};
      if (className && className.includes('element')) {
        if (filterBy) {
          const { __data__: data } = select(target).node();
          selection.selectAll('.element').each(function (datum) {
            if (datum[filterBy] === data[filterBy]) {
              shared.selectedElements.push(this);
            }
          });
        } else {
          shared.selectedElements = [target];
        }
      }
    }
    return context;
  };
};

ElementSelection.props = {};
