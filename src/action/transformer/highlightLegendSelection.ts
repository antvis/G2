import { Category } from '@antv/gui';
import { ActionComponent as AC } from '../../runtime';
import { HighlightLegendSelectionAction } from '../../spec';

export type HighlightLegendSelectionOptions = Omit<
  HighlightLegendSelectionAction,
  'type'
>;

export const HighlightLegendSelection: AC<HighlightLegendSelectionOptions> = (
  options,
) => {
  return (context) => {
    const { shared, selection } = context;
    const { activeLegendItem: legendItem } = shared;

    const legend = selection.select('.category-legend').node() as Category;

    // todo Get state style from options.
    const itemStates = legend?.getItemsStates() || [];
    itemStates.forEach(({ id }) => {
      if (!legendItem) legend.setItemState(id, 'selected');
      else if (legendItem.id !== id) legend.setItemState(id, 'unselected');
      else legend.setItemState(id, 'selected');
    });
    return context;
  };
};

HighlightLegendSelection.props = {};
