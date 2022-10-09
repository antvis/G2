import { Category } from '@antv/gui';
import { deepMix } from '@antv/util';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  tickFormatter?: (d: any) => string;
  dx?: number;
  dy?: number;
  title?: string | string[];
  [key: string]: any;
};

/**
 * Guide Component for ordinal color scale.
 * @todo Custom style.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  const {
    position,
    tickFormatter = (d) => `${d}`,
    dx = 0,
    dy = 0,
    title,
    cols = undefined,
    autoWrap = false,
    ...rest
  } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y, width, height } = bbox;
    const items = domain.map((d) => ({
      id: d,
      name: tickFormatter(d),
      color: scale.map(d),
    }));
    const maxItemWidth = autoWrap && cols ? width / cols : undefined;
    const legendStyle = deepMix(
      {},
      {
        items,
        x: x + dx,
        y: y + dy,
        orient: ['right', 'left', 'arcCenter'].includes(position)
          ? 'vertical'
          : 'horizontal',
        maxWidth: width,
        maxHeight: height,
        autoWrap,
        maxItemWidth,
        itemWidth: maxItemWidth,
        spacing: [8, 0],
        itemName: {
          style: {
            fontSize: 12,
            fillOpacity: 1,
            fill: '#000',
            fontWeight: 'lighter',
            active: {
              fillOpacity: 0.8,
            },
            inactive: {
              fill: '#d8d8d8',
            },
            unchecked: {
              fill: '#d8d8d8',
            },
          },
        },
        ...(title && {
          title: {
            content: Array.isArray(title) ? title[0] : title,
            style: {
              fontSize: 12,
              fontWeight: 'bold',
              fillOpacity: 1,
            },
          },
        }),
        itemMarker: {
          size: 8,
          symbol: 'circle',
          style: {
            fillOpacity: 1,
            inactive: {
              fillOpacity: 0.2,
            },
            unchecked: {
              fill: '#d8d8d8',
              stroke: '#d8d8d8',
            },
          },
        },
        itemBackgroundStyle: {
          fill: 'transparent',
        },
      },
      { ...rest },
    );
    return new Category({ className: 'category-legend', style: legendStyle });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
