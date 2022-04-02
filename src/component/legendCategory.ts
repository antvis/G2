import { Category } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
};

/**
 * Guide Component for ordinal color scale.
 * @todo Custom style.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  return (scale, value, coordinate, theme) => {
    const { domain, field, bbox } = value;
    const { x, y } = bbox;
    const items = domain.map((d) => ({
      id: d,
      name: d,
      state: 'selected',
      color: scale.map(d),
    }));
    return new Category({
      style: {
        items,
        x,
        y,
        itemName: {
          style: {
            selected: {
              fontSize: 12,
            },
          },
        },
        ...(field && {
          title: {
            content: field,
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
  defaultSize: 64,
};
