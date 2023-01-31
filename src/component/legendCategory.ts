import { Coordinate } from '@antv/coord';
import { Category } from '@antv/gui';
import type {
  FlexLayout,
  G2Library,
  G2Theme,
  GuideComponentComponent as GCC,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import { useLibrary } from '../runtime/library';
import { Shape, ShapeComponent } from '../runtime/types/component';
import { G2ShapeOptions } from '../runtime/types/options';
import { G2Layout, inferComponentLayout, titleContent } from './utils';

export type LegendCategoryOptions = {
  dx?: number;
  dy?: number;
  labelFormatter?: (d: any) => string;
  layout?: FlexLayout;
  orientation?: GCO;
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

function inferLayout(
  position: GCP,
  gridRow?: number,
  gridCol?: number,
): [number, number] {
  const [gridRowLimit, gridColLimit] = [gridRow || 100, gridCol || 100];

  switch (position) {
    case 'top':
    case 'bottom':
    case 'top-left':
    case 'top-right':
    case 'bottom-left':
    case 'bottom-right':
      return [1, gridColLimit];
    case 'left':
    case 'right':
      return [gridRowLimit, 1];
    default:
      return [gridRow, gridCol];
  }
}

function inferCategoryConfig(
  scale: Scale,
  options: LegendCategoryOptions,
  library: G2Library,
  coordinate: Coordinate,
  theme: G2Theme,
) {
  const { labelFormatter = (d) => `${d}` } = options;
  const { name, domain, range } = scale.getOptions();

  if (name === 'color') {
    return {
      data: domain.map((d) => ({
        id: d,
        label: labelFormatter(d),
        color: scale.map(d),
      })),
    };
  }

  if (name === 'shape') {
    const defaultColor = '#eee';
    const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
      'shape',
      library,
    );

    return {
      data: domain.map((d, i) => ({
        id: d,
        label: labelFormatter(d),
        color: defaultColor,
        shape: () =>
          useShape({ type: `point.${range[i]}` })(
            [
              [0, 0],
              [0, 0],
            ],
            { size: 6, color: defaultColor },
            coordinate,
            theme,
          ),
      })),
      itemMarker: (d) => d.shape,
    };
  }

  return {};
}

/**
 * Guide Component for ordinal color scale.
 */
export const LegendCategory: GCC<LegendCategoryOptions> = (options) => {
  const {
    order,
    size,
    position,
    orientation,
    labelFormatter,
    dx = 0,
    dy = 0,
    title,
    gridCol,
    gridRow,
    layout,
    ...rest
  } = options;

  return (scale, value, coordinate, theme) => {
    const { library, bbox } = value;
    const { x, y, width, height } = bbox;

    const finalLayout = inferComponentLayout(
      position,
      value.scale?.guide?.layout,
    );

    const [finalGridRow, finalGridCol] = inferLayout(
      position,
      gridRow,
      gridCol,
    );

    const legendStyle = {
      // data: items,
      orient: ['right', 'left', 'center'].includes(position)
        ? 'vertical'
        : 'horizontal',
      width,
      height,
      gridCol: gridCol ?? finalGridCol,
      gridRow: gridRow ?? finalGridRow,
      rowPadding: 0,
      colPadding: 8,
      titleText: titleContent(title),
      itemMarkerFill: (d) => (d ? d.color : '#fff'),
      ...inferCategoryConfig(scale, options, library, coordinate, theme),
    };

    const { legend: legendTheme = {} } = theme;

    const layoutWrapper = new G2Layout({
      style: {
        x: x + dx,
        y: y + dy,
        width,
        height,
        ...finalLayout,
      },
    });
    layoutWrapper.appendChild(
      new Category({
        className: 'legend-category',
        style: Object.assign({}, legendTheme, legendStyle, rest),
      }),
    );

    return layoutWrapper;
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
