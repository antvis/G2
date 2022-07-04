import { DisplayObject, Text } from '@antv/g';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';

export type LabelOptions = Record<string, any>;

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options) => {
  const { label: style = {} } = options;
  return (points, value, coordinate, theme) => {
    const element: DisplayObject = value.element;
    const { min, max } = element.getRenderBounds();
    const [x0] = min;
    const [x1] = max;
    const w = x1 - x0;
    const { label } = value;
    return select(new Text())
      .style('x', w / 2)
      .style('y', 0)
      .style('text', `${label}`)
      .style('fontSize', 12)
      .style('dy', '-2px')
      .style('textAlign', 'center')
      .call(applyStyle, style)
      .node();
  };
};

Label.props = {};
