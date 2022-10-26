import { TextStyleProps } from '@antv/g';
import { deepMix } from '@antv/util';
import { applyStyle } from '../shape/utils';
import { GuideComponentComponent as GCC, G2TitleOptions } from '../runtime';
import { subObject } from '../utils/helper';
import { createComponent, maybeAppend } from './utils';

export type TitleComponentOptions = G2TitleOptions;

type TitleStyleProps = {
  x?: number;
  y?: number;
  text?: string;
  style?: Omit<TextStyleProps, 'x' | 'y' | 'text'>;
  subtitle?: string | null;
  subtitleStyle?: Omit<TextStyleProps, 'x' | 'y' | 'text'> & {
    spacing?: number;
  };
};

const Title = createComponent<TitleStyleProps>({
  render(attributes, container) {
    const { text, style, subtitle, subtitleStyle } = attributes;
    const title = maybeAppend(container, '.title', 'text')
      .attr('className', 'title')
      .style('text', text)
      .call(applyStyle, style || {})
      .node();

    const bounds = title.getLocalBounds();
    maybeAppend(container, '.sub-title', 'text')
      .attr('className', 'sub-title')
      .style('y', bounds.max[1] + (subtitleStyle?.spacing || 0))
      .call((selection) => {
        if (!subtitle) return selection.node().remove();
        selection.node().attr({ text: subtitle, ...subtitleStyle });
      });
  },
});

/**
 * Title Component.
 */
export const TitleComponent: GCC<TitleComponentOptions> = (options) => {
  const { text, style, subtitle, subtitleStyle } = options;

  return (scale, value, coordinate, theme) => {
    const { x, y } = value.bbox;
    return new Title({
      style: deepMix(
        {},
        {
          style: subObject(theme, 'title'),
          subtitleStyle: subObject(theme, 'subtitleStyle'),
        },
        {
          x,
          y,
          style,
          text,
          subtitle,
          subtitleStyle,
        },
      ),
    });
  };
};

TitleComponent.props = {
  defaultPosition: 'top',
  defaultOrder: 2,
  defaultSize: 30,
};
