import { ActionComponent as AC } from '../../types';
import { ActiveElementAction } from '../../../spec';

export type HighlightSelectionOptions = Omit<ActiveElementAction, 'type'>;

export const HighlightSelection: AC<HighlightSelectionOptions> = (options) => {
  return (context) => {
    const { shared, selection, theme, selectionLayer } = context;
    const { selectedElements = [] } = shared;
    const { elementActiveStroke } = theme;
    const { color = elementActiveStroke } = options;
    const data = selectedElements.map((d) => d.__data__);

    selectionLayer.selectAll('.highlight-element').remove();

    selectionLayer
      .selectAll('.highlight-element')
      .data(data, (d) => d.key)
      .join((enter) =>
        enter
          .append((_, i) => selectedElements[i].cloneNode())
          .style('lineWidth', function () {
            return +this.style.lineWidth || 1;
          })
          .style('stroke', color)
          .attr('className', 'highlight-element'),
      );
    return context;
  };
};

HighlightSelection.props = {};
