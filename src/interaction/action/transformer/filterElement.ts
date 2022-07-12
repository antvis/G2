import { ActionComponent as AC } from '../../types';
import { FilterElementAction } from '../../../spec';

export type FilterElementOptions = Omit<FilterElementAction, 'type'>;

function applyStyle(element, datum, data) {
  if (!data.includes(datum)) {
    element.style.visibility = 'hidden';
  } else {
    element.style.visibility = element.style.originVisibility;
  }
}

export const FilterElement: AC<FilterElementOptions> = () => {
  return (context) => {
    const { shared, selection, selectionLayer } = context;
    const { selectedElements = [] } = shared;

    const selectedData = selectedElements.map((d) => d.__data__);
    const elements = selection
      .selectAll('.element')
      .each(function () {
        if (!this.style.originVisibility) {
          this.style.originVisibility = this.style.visibility || 'visible';
        }
        this.style.visibility = selectedData.length
          ? 'hidden'
          : this.style.originVisibility;
      })
      .nodes();
    const data = selectedData.length ? elements.map((d) => d.__data__) : [];
    selectionLayer
      .selectAll('.highlight-element')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter
            .append((_, i) => elements[i].cloneNode(true))
            .attr('className', 'highlight-element')
            .each(function (datum) {
              applyStyle(this, datum, selectedData);
            }),
        (update) =>
          update.each(function (datum) {
            applyStyle(this, datum, selectedData);
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

FilterElement.props = {};
