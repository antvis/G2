import { ActionComponent as AC } from '../../types';
import { SetItemStateAction } from '../../../spec';

export type SetItemStateOptions = Omit<SetItemStateAction, 'type'>;

function highlightLegendItems(legend: any, items) {
  const itemStates = legend?.getItemsStates() || [];

  if (items.length) {
    itemStates.forEach(({ id }) => legend.setItemState(id, 'inactive', true));
    items.forEach((item) => item.setState('inactive', false));
  } else {
    itemStates.forEach(({ id }) => legend.setItemState(id, 'inactive', false));
  }
}

export const SetItemState: AC<SetItemStateOptions> = (options) => {
  const { items, state = 'active' } = options;
  return (context) => {
    const { shared, selection } = context;

    if (items.includes('legendItem')) {
      const { selectedLegendItems: selectedItems = [] } = shared;
      const legend = selection.select('.category-legend').node() as any;
      if (state === 'highlight') {
        highlightLegendItems(legend, selectedItems);
      } else {
        const itemStates = legend?.getItemsStates() || [];
        itemStates.forEach(({ id }) => legend.setItemState(id, state, false));
        selectedItems.forEach((item) => item.setState(state, true));
      }
    }

    return context;
  };
};

SetItemState.props = {};
