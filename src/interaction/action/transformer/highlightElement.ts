import { ActionComponent as AC } from '../../types';
import { HighlightElementAction } from '../../../spec';

export type HighlightOption = Omit<HighlightElementAction, 'type'>;

function applyHighlightStyle(element, datum, data, color: string) {
  if (data.includes(datum)) {
    element.style.fillOpacity = 1;
    element.style.lineWidth = +element.style.lineWidth || 1;
    element.style.stroke = color;
  } else {
    element.style.fillOpacity = 0.45;
    element.style.stroke = 'transparent';
  }
}

export const HighlightElement: AC<HighlightOption> = (options) => {
  return (context) => {
    const { shared, selection, theme, selectionLayer } = context;
    const { selectedElements = [] } = shared;
    const { elementActiveStroke } = theme;
    const { color = elementActiveStroke } = options;

    const selectedData = selectedElements.map((d) => d.__data__);
    selection.selectAll('.element').each(function () {
      if (!this.style.originVisibility) {
        this.style.originVisibility = this.style.visibility || 'visible';
      }
      this.style.visibility = selectedData.length
        ? 'hidden'
        : this.style.originVisibility;
    });
    const elements = selection.selectAll('.element').nodes();
    const data = selectedData.length ? elements.map((d) => d.__data__) : [];
    selectionLayer
      .selectAll('.highlight-element')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter
            .append((_, i) => elements[i].cloneNode(true))
            .attr('className', 'highlight-element')
            .style('visibility', 'visible')
            .each(function (datum) {
              applyHighlightStyle(this, datum, selectedData, color);
            }),
        (update) =>
          update.each(function (datum) {
            applyHighlightStyle(this, datum, selectedData, color);
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

HighlightElement.props = {};
