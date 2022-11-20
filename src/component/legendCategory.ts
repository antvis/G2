import { Category } from '@antv/gui';
import { deepMix } from '@antv/util';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';
import { titleContent } from './utils';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  tickFormatter?: (d: any) => string;
  dx?: number;
  dy?: number;
  title?: string | string[];
  [key: string]: any;
};

const circle = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['A', r, r, 0, 1, 0, x + r, y],
    ['A', r, r, 0, 1, 0, x - r, y],
    ['Z'],
  ];
};

/**
 * Guide Component for ordinal color scale.
 * @todo Custom style.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  const {
    order,
    size,
    position,
    tickFormatter = (d) => `${d}`,
    dx = 0,
    dy = 0,
    title,
    gridCol = undefined,
    gridRow = undefined,
    autoWrap = false,
    ...rest
  } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y, width, height } = bbox;
    const items = domain.map((d) => ({
      id: d,
      label: tickFormatter(d),
      value: '',
      color: scale.map(d),
    }));

    const legendStyle = deepMix(
      {},
      {
        data: items,
        x: x + dx,
        y: y + dy,
        orient: ['right', 'left', 'arcCenter'].includes(position)
          ? 'vertical'
          : 'horizontal',
        // Flex layout.
        maxWidth: width,
        maxHeight: height,
        // Grid layout.
        gridCol,
        gridRow,
        rowPadding: 0,
        colPadding: 8,
        itemSpacing: 5, // spacing between marker and label
        titleText: titleContent(title),
        titleFontSize: 12,
        titleFontWeight: 'bold',
        titleFillOpacity: 1,
        itemMarkerFill: (d) => (d ? d.color : '#fff'),
        itemMarkerFillOpacity: 1,
        // @todo GUI should support itemMarkerSize.
        itemMarkerSize: 4,
        itemMarkerD: circle(4, 4, 4),
      },
      { ...rest },
    );
    return new Category({ style: legendStyle });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
