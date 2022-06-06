import { DisplayObject } from '@antv/g';
import { select } from '../../utils/selection';
import { ActionComponent as AC } from '../../runtime';
import { LegendSelectionAction } from '../../spec';

export type LegendSelectionOptions = Omit<LegendSelectionAction, 'type'>;

export const LegendSelection: AC<LegendSelectionOptions> = () => {
  return (context) => {
    const { event, shared } = context;
    const pathObjects = event.composedPath() as DisplayObject[];
    const legendItem = pathObjects.find((d) => d.className === 'legend-item');
    const view = pathObjects.find((d) => d.className === 'view');

    if (legendItem) {
      shared.activeLegendItem = legendItem;
      const elements = select(view)
        .selectAll('.element')
        .nodes()
        .filter((d) => {
          const datum = d.__data__ || {};
          // [todo] 有误差
          return datum.key.includes(legendItem.id);
        });
      shared.selectedElements = elements;
    }
    return context;
  };
};

LegendSelection.props = {};
