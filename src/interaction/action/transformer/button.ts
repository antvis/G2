import { createComponent, maybeAppend } from '../../../component/utils';
import { applyStyle } from '../../../shape/utils';
import { ButtonAction } from '../../../spec';
import { ActionComponent as AC } from '../../types';

export type ButtonOptions = Omit<ButtonAction, 'type'>;

const ButtonComponent = createComponent<ButtonOptions>({
  render(attributes, context) {
    const { text, textStyle = {}, fill, stroke, padding = [] } = attributes;
    const [pt, pr, pb, pl] = padding;
    const textShape = maybeAppend(context, '.button-text', 'text')
      .attr('className', 'button-text')
      .style('x', pl)
      .style('y', pt + (textStyle.fontSize || 12) / 2)
      .style('fontSize', 12)
      .style('textAlign', 'end')
      .style('textBaseline', 'middle')
      .style('fill', '#3080d0')
      .style('text', text)
      .style('z-index', 1)
      .call(applyStyle, textStyle)
      .node();

    const { min, halfExtents } = textShape.getLocalBounds();
    const width = halfExtents[0] * 2;
    const height = halfExtents[1] * 2;
    maybeAppend(context, '.button-rect', 'rect')
      .attr('className', 'button-rect')
      .style('x', min[0] - pl)
      .style('y', min[1] - pt)
      .style('width', width + pl + pr)
      .style('height', height + pt + pb)
      .style('radius', 4)
      .style('fill', fill)
      .style('stroke', stroke)
      .style('z-index', 0);
  },
});

export const Button: AC<ButtonOptions> = (options) => {
  const {
    hide,
    fill = '#f7f7f7',
    stroke = '#ccc',
    padding = [4, 5, 4, 5],
    text = 'Reset',
    textStyle,
  } = options;

  return (context) => {
    const { transientLayer, coordinate } = context;
    const { x, y, width } = coordinate.getOptions();

    const buttonCfg = {
      text,
      x: x + width - 4,
      y: y + 4,
      fill,
      stroke,
      textStyle,
      padding,
    };

    transientLayer
      .selectAll('.button')
      .data(hide ? [] : [buttonCfg], (_, i) => i)
      .join(
        (enter) =>
          enter.append(
            (style) => new ButtonComponent({ className: 'button', style }),
          ),
        (update) =>
          update.each(function (datum) {
            this.update(datum);
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

Button.props = {};
