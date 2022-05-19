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
      color: scale.map(d),
    }));
    return new Category({
      style: {
        items,
        // @ts-ignore
        x,
        // @ts-ignore
        y,
        maxWidth: width,
        maxHeight: height,
        spacing: [8, 0],
        itemName: {
          style: {
            default: {
              fontSize: 12,
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
