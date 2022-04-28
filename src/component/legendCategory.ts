import { Category } from '@antv/gui';
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
  const { formatter = (d) => `${d}` } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const { x, y, width, height } = bbox;
    const items = domain.map((d) => ({
      id: d,
      name: formatter(d),
      state: 'selected',
      color: scale.map(d),
    }));
    return new Category({
      style: {
        items,
        x,
        y,
        maxWidth: width,
        maxHeight: height,
        itemName: {
          style: {
            selected: {
              fontSize: 12,
            },
          },
        },
        ...(field && {
          title: {
            content: Array.isArray(field) ? field[0] : field,
            spacing: 0,
            style: {
              fontSize: 12,
            },
          },
        }),
        itemMarker: ({ color }) => {
          return {
            size: 10,
            marker: 'circle',
            style: {
              selected: {
                fill: color,
              },
            },
          };
        },
      },
    });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
