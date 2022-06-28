import { Category } from '@antv/gui';
import { deepMix } from '@antv/util';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  formatter?: (d: any) => string;
};

/**
 * Guide Component for ordinal color scale.
 * @todo Custom style.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  const { position, formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const { x, y, width, height } = bbox;
    const items = domain.map((d) => ({
      id: d,
      name: formatter(d),
      color: scale.map(d),
    }));
    const { cols, autoWrap, ...guideCfg } = scale.getOptions().guide || {};
    const maxItemWidth = autoWrap && cols ? width / cols : undefined;
    const legendStyle = deepMix(
      {},
      {
        items,
        x,
        y,
        orient: ['right', 'left'].includes(position)
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
        ...(field && {
          title: {
            content: Array.isArray(field) ? field[0] : field,
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
      guideCfg,
    );
    return new Category({ className: 'category-legend', style: legendStyle });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
