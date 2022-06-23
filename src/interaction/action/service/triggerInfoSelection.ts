import { DisplayObject } from '@antv/g';
import { ActionComponent as AC } from '../../types';
import { TriggerInfoSelectionAction } from '../../../spec';

export type TriggerInfoSelectionOptions = Omit<
  TriggerInfoSelectionAction,
  'type'
>;

export const TriggerInfoSelection: AC<TriggerInfoSelectionOptions> = (
  options,
) => {
  const { multiple } = options;

  return (context) => {
    const { event, shared } = context;
    const pathObjects = event.composedPath() as DisplayObject[];
    // todo. Extend more trigger items, includes: axis-label, continuous-legend, scrollbar, slider and so on.
    const activeItem = pathObjects.find((d) => d.className === 'legend-item');

    let { triggerInfo = [] } = shared;
    if (!multiple) triggerInfo = [];
    if (activeItem) {
      // todo. Consider axis encode (x or others), and legend encode could be shape, size or others.
      triggerInfo.push({ id: activeItem.id, scaleType: 'color' });
    }

    shared.triggerInfo = triggerInfo;

    return context;
  };
};

TriggerInfoSelection.props = {};
