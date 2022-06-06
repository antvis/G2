import { Category } from '@antv/gui';
import { deepMix, lowerCase } from '@antv/util';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  formatter?: (d: any) => string;
};

const getMarker = (v: string): string => {
  const prefix =
    v.startsWith('hollow') || v === 'cross' || v === 'hyphen' ? 'hollow' : '';
  const shape = lowerCase(v.replace('hollow', ''));
  if (shape === 'rect') return `${prefix}square`;
  return `${prefix}${shape}`;
};

/**
 * Guide Component for ordinal color scale.
 * @todo Custom style.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  const { formatter = (d) => `${d}` } = options;
  return (scales, value, coordinate, theme) => {
    const { x, y, width, height } = value.bbox;

    const items: Map<string, any> = new Map();
    const { field } = scales[0].getOptions();
    scales.forEach((scale) => {
      const scaleOptions = scale.getOptions();
      const { domain, name, field } = scaleOptions;
      domain.forEach((d) => {
        let item = items.get(d);
        if (!item)
          item = { id: d, name: formatter(d), _origin_: { field, value: d } };
        const key = name === 'shape' ? 'symbol' : name;
        item[key] = name === 'shape' ? getMarker(scale.map(d)) : scale.map(d);
        items.set(item.id, item);
      });
    });
    const { autoWrap, ...guideCfg } = scales[0].getOptions().guide || {};
    const legendStyle = deepMix(
      {},
      {
        items: Array.from(items.values()),
        x,
        y,
        maxWidth: width,
        maxHeight: height,
        autoWrap,
        spacing: [8, 0],
        itemName: {
          style: {
            fontSize: 12,
            unselected: {
              fill: '#d8d8d8',
            },
          },
        },
        itemBackgroundStyle: {
          fill: 'transparent',
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
        itemMarker: (datum: any) => {
          const { symbol = 'circle', color } = datum;
          const hollow = symbol.startsWith('hollow');
          return {
            size: 8,
            symbol: hollow ? symbol.replace('hollow', '') : symbol,
            style: {
              lineWidth: hollow ? 1 : 0,
              fill: hollow ? 'transparent' : color || theme.defaultColor,
              stroke: hollow ? theme.defaultColor : 'transparent',
              unselected: {
                fill: hollow ? 'transparent' : '#d8d8d8',
                stroke: hollow ? '#d8d8d8' : 'transparent',
              },
            },
          };
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
