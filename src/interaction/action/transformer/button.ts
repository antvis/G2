import { createComponent, maybeAppend } from '../../../component/utils';
import { applyStyle } from '../../../shape/utils';
import { ButtonAction } from '../../../spec';
import { ActionComponent as AC } from '../../types';

export type ButtonOptions = Omit<ButtonAction, 'type'>;

const ButtonComponent = createComponent<ButtonOptions>({
  render(attributes, context) {
    const { text, textStyle = {}, fill, stroke, padding = [] } = attributes;
    const textShape = maybeAppend(context, '.button-text', 'text')
      .attr('className', 'button-text')
      .style('fontSize', 12)
      .style('textBaseline', 'middle')
      .style('fill', '#333')
      .style('text', text)
      .style('z-index', 1)
      .call(applyStyle, textStyle)
      .node();

    const { halfExtents } = textShape.getLocalBounds();
    maybeAppend(context, '.button-rect', 'rect')
      .attr('className', 'button-rect')
      .style('x', -padding[3])
      .style('y', -padding[0] - halfExtents[1])
      .style('width', halfExtents[0] * 2 + padding[1] + padding[3])
      .style('height', halfExtents[1] * 2 + padding[0] + padding[2])
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
    textStyle,
  } = options;

  return (context) => {
    const { transientLayer, coordinate } = context;
    const { x, y, width } = coordinate.getOptions();

    const buttonCfg = {
      text: 'Reset',
      fontSize: 24,
      width: 40,
      height: 20,
      x: x + width - 40,
      y: y,
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
