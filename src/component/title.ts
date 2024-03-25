import { deepMix } from '@antv/util';
import { applyStyle } from '../shape/utils';
import { subObject } from '../utils/helper';
import { GuideComponentComponent as GCC, G2TitleOptions } from '../runtime';
import { createComponent, maybeAppend } from './utils';

export type TitleComponentOptions = G2TitleOptions;

type TitleStyleProps = G2TitleOptions & {
  x: number;
  y: number;
  width: number;
  height: number;
};

function inferStyleByAlign(
  x: number,
  y: number,
  width: number,
  align: TitleStyleProps['align'],
) {
  switch (align) {
    case 'center':
      return {
        x: x + width / 2,
        y,
        textAlign: 'middle',
      };
    case 'right':
      return {
        x: x + width,
        y,
        textAlign: 'right',
      };
    default:
      return {
        x,
        y,
        textAlign: 'left',
      };
  }
}

const Title = createComponent<TitleStyleProps>({
  render(attributes, container) {
    const {
      width,
      title,
      subtitle,
      spacing = 2,
      align = 'left',
      x,
      y,
      ...style
    } = attributes;

    container.style.transform = `translate(${x}, ${y})`;

    const titleStyle = subObject(style, 'title');
    const subtitleStyle = subObject(style, 'subtitle');

    const mainTitle = maybeAppend(container, '.title', 'text')
      .attr('className', 'title')
      .call(applyStyle, {
        ...inferStyleByAlign(0, 0, width, align),
        fontSize: 14,
        textBaseline: 'top',
        text: title,
        ...titleStyle,
      })
      .node();

    const bounds = mainTitle.getLocalBounds();
    maybeAppend(container, '.sub-title', 'text')
      .attr('className', 'sub-title')
      .call((selection) => {
        if (!subtitle) return selection.node().remove();
        selection.node().attr({
          ...inferStyleByAlign(0, bounds.max[1] + spacing, width, align),
          fontSize: 12,
          textBaseline: 'top',
          text: subtitle,
          ...subtitleStyle,
        });
      });
  },
});

/**
 * Title Component.
 */
export const TitleComponent: GCC<TitleComponentOptions> = (options) => {
  return ({ value, theme }) => {
    const { x, y, width, height } = value.bbox;
    return new Title({
      style: deepMix({}, theme.title, {
        x,
        y,
        width,
        height,
        ...options,
      }),
    });
  };
};

TitleComponent.props = {
  defaultPosition: 'top',
  defaultOrder: 2,
  defaultSize: 36,
  defaultCrossPadding: [20, 20],
  defaultPadding: [12, 12],
};
