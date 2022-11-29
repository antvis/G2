import { Category } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';
// import { titleContent } from './utils';

export type LegendCategoryOptions = {
  position?: GuideComponentPosition;
  labelFormatter?: (d: any) => string;
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
    labelFormatter = (d) => `${d}`,
    dx = 0,
    dy = 0,
    title,
    gridCol,
    gridRow,
    autoWrap = false,
    ...rest
  } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y, width, height } = bbox;
    const items = domain.map((d) => ({
      id: d,
      label: labelFormatter(d),
      value: '',
      color: scale.map(d),
    }));

    let [_gridRow, _gridCol] = [gridRow, gridCol];
    if (!(gridCol || gridRow)) {
      const limit = 100;
      [_gridRow, _gridCol] = {
        arcCenter: [limit, 1],
        top: [1, limit],
        bottom: [1, limit],
        left: [limit, 1],
        right: [limit, 1],
      }[position];
    }

    const legendStyle = {
      data: items,
      x: x + dx,
      y: y + dy,
      orient: ['right', 'left', 'arcCenter'].includes(position)
        ? 'vertical'
        : 'horizontal',
      width,
      height,
      // Grid layout.
      gridCol: _gridCol,
      gridRow: _gridRow,
      rowPadding: 0,
      colPadding: 8,
      // titleText: titleContent(title),
      itemMarkerFill: (d) => (d ? d.color : '#fff'),
      itemMarkerFillOpacity: 1,
      // @todo GUI should support itemMarkerSize.
      itemMarkerSize: 4,
      itemMarkerD: circle(4, 4, 4),
      // @todo Spacing between marker and label, should rename to markerSpacing
      itemSpacing: 5,
    };

    const { legend: legendTheme = {} } = theme;

    return new Category({
      style: Object.assign({}, legendTheme, legendStyle, rest),
    });
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
