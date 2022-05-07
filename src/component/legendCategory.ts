import { Category } from '@antv/gui';
import { deepMix, get, upperFirst } from '@antv/util';
import {
  G2Theme,
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  formatter?: (d: any) => string;
};

function getTheme(theme: G2Theme, position: string) {
  const legendTheme = deepMix(
    {},
    get(theme, 'legend'),
    get(theme, `legend${upperFirst(position)}`),
  );
  return {
    title: {
      style: get(legendTheme, 'title'),
    },
    itemName: {
      style: {
        selected: get(legendTheme, 'itemName'),
        active: get(legendTheme, 'active.itemName'),
        inactive: get(legendTheme, 'inactive.itemName'),
      },
    },
    itemMarker: get(legendTheme, 'itemName'),
  };
}

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
      state: 'selected',
      color: scale.map(d),
    }));

    const themeOptions = getTheme(theme, position);
    return new Category({
      style: deepMix({}, themeOptions, {
        items,
        x,
        y,
        maxWidth: width,
        maxHeight: height,
        title: field
          ? {
              content: Array.isArray(field) ? field[0] : field,
              spacing: 0,
            }
          : null,
        itemMarker: ({ color }) => {
          return {
            size: themeOptions.itemMarker.size,
            marker: themeOptions.itemMarker.symbol,
            style: {
              selected: {
                fill: color,
              },
            },
          };
        },
      }),
    });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
