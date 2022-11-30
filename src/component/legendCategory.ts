import { Category } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';
import { titleContent } from './utils';

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

function inferLayout(
  position: GuideComponentPosition,
  gridRow?: number,
  gridCol?: number,
): [number, number] {
  const [gridRowLimit, gridColLimit] = [gridRow || 100, gridCol || 100];
  const config = {
    top: [1, gridColLimit],
    bottom: [1, gridColLimit],
    left: [gridRowLimit, 1],
    right: [gridRowLimit, 1],
    arcCenter: [gridRowLimit, 1],
  }[position];

  return config || [gridRow, gridCol];
}

/**
 * Guide Component for ordinal color scale.
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
    showTitle,
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

    // Calc layout config
    const [finalGridRow, finalGridCol] = inferLayout(
      position,
      gridRow,
      gridCol,
    );

    const legendStyle = {
      data: items,
      x: x + dx,
      y: y + dy,
      orient: ['right', 'left', 'arcCenter'].includes(position)
        ? 'vertical'
        : 'horizontal',
      width,
      height,
      gridCol: finalGridCol,
      gridRow: finalGridRow,
      rowPadding: 0,
      colPadding: 8,
      titleText: showTitle ? titleContent(title) : '',
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
