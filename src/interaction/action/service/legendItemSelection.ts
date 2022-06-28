import { Category } from '@antv/gui';
import { ActionComponent as AC } from '../../types';
import { LegendItemSelectionAction } from '../../../spec';

export type LegendItemSelectionOptions = Omit<
  LegendItemSelectionAction,
  'type'
>;

export const LegendItemSelection: AC<LegendItemSelectionOptions> = (
  options,
) => {
  const { from } = options;

  return (context) => {
    const { shared, selection, scale } = context;
    const legend = selection.select('.category-legend').node() as Category;

    if (from === 'triggerInfo') {
      shared.selectedLegendItems = shared.triggerInfo.map(({ id }) =>
        legend.getItem(id),
      );
    } else if (from === 'selectedElements') {
      const ids = shared.selectedElements.map(({ __data__: { color } }) =>
        scale.color.invert(color),
      );
      shared.selectedLegendItems = ids.map((id) => legend.getItem(id));
    }

    return context;
  };
};

LegendItemSelection.props = {};
