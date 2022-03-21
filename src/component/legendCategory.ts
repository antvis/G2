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
  return (scale, bbox, value, coordinate, theme) => {
    const { x, y } = bbox;
    const { domain, field } = value;
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
              fill: 'black',
            },
          },
        },
        ...(field && {
          title: {
            content: field,
            spacing: 0,
            style: {
              fontSize: 12,
              fill: 'black',
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
