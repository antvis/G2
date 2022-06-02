import {
  CustomElement,
  DisplayObjectConfig,
  TextStyleProps,
  Group,
} from '@antv/g';
import { deepMix } from '@antv/util';
import { select, Selection, G2Element } from '../utils/selection';
import { applyStyle } from '../shape/utils';
import { GuideComponentComponent as GCC, G2TitleOptions } from '../runtime';

export type TitleComponentOptions = G2TitleOptions;

function maybeAppend<T>(
  parent: Group,
  selector: string,
  node: string | ((data: T, i: number) => G2Element),
): Selection<T> {
  if (!parent.querySelector(selector)) {
    return select(parent).append(node);
  }
  return select(parent).select(selector);
}

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

class Title extends CustomElement<TitleStyleProps> {
  constructor(config: DisplayObjectConfig<TitleStyleProps>) {
    super(config);
  }

  connectedCallback(): void {
    this.render();
  }

  public update(cfg: Partial<any> = {}) {
    this.attr(deepMix({}, this.attributes, cfg));
    this.render();
  }

  private render() {
    const { text, style, subtitle, subtitleStyle } = this.style;
    const title = maybeAppend(this, '.title', 'text')
      .attr('className', 'title')
      .style('fontSize', 14)
      .style('textBaseline', 'top')
      .style('text', text)
      .call(applyStyle, style || {})
      .node();

    const bounds = title.getLocalBounds();
    maybeAppend(this, '.sub-title', 'text')
      .attr('className', 'sub-title')
      .style('y', bounds.max[1] + (subtitleStyle?.spacing || 0))
      .style('fontSize', 12)
      .style('textBaseline', 'top')
      .call((selection) => {
        if (!subtitle) return selection.node().remove();
        selection.node().attr({ text: subtitle, ...subtitleStyle });
      });
  }
}

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
          style: theme.title,
          subtitleStyle: theme.subtitle,
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
  defaultSize: 20,
};
