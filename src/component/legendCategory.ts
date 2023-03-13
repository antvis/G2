import type { Coordinate } from '@antv/coord';
import type { DisplayObject } from '@antv/g';
import { Category } from '@antv/gui';
import { format } from 'd3-format';
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
import type { G2ShapeOptions } from '../runtime/types/options';
import {
  domainOf,
  G2Layout,
  inferComponentLayout,
  inferComponentShape,
  scaleOf,
  titleContent,
} from './utils';

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

function createShape(
  shape: string,
  library: G2Library,
  coordinate: Coordinate,
  theme: G2Theme,
  style: Record<string, any> = {},
) {
  const [useShape] = useLibrary<G2ShapeOptions, ShapeComponent, Shape>(
    'shape',
    library,
  );
  const shapeOptions = [
    [
      [0, 0],
      [0, 0],
    ],
    { size: 6, ...style },
    coordinate,
    theme,
  ];
  return () => {
    try {
      // @ts-ignore
      return useShape({ type: `point.${shape}` })(...shapeOptions);
    } catch (e) {
      // @ts-ignore
      return useShape({ type: 'point.point' })(...shapeOptions);
    }
  };
}

function inferItemMarker(
  scales: Scale[],
  options: LegendCategoryOptions,
  library: G2Library,
  coordinate: Coordinate,
  theme: G2Theme,
): ((datum: any, i: number, data: any) => () => DisplayObject) | undefined {
  const shapeScale = scaleOf(scales, 'shape');

  const { itemMarker } = options;
  if (shapeScale && !itemMarker) {
    const { domain } = shapeScale.getOptions();

    return (d, i) =>
      createShape(shapeScale.map(domain[i]), library, coordinate, theme, {
        color: d.color,
      });
  }
  if (typeof itemMarker === 'function') {
    return itemMarker;
  }
  return (d, i) =>
    createShape(itemMarker || 'point', library, coordinate, theme, {
      color: d.color,
    });
}

function inferItemMarkerOpacity(scales: Scale[]) {
  const scale = scaleOf(scales, 'opacity');
  if (scale) {
    const { range } = scale.getOptions();
    return (d, i) => range[i];
  }
  return undefined;
}

function inferItemMarkerSize(scales: Scale[]) {
  const scale = scaleOf(scales, 'size');
  // only support constant size scale.
  // size in category legend means the marker radius.
  if (scale) return scale.map(NaN) * 2;
  return 8;
}

function inferCategoryStyle(
  scales: Scale[],
  options: LegendCategoryOptions,
  library: G2Library,
  coordinate: Coordinate,
  theme: G2Theme,
) {
  const { labelFormatter = (d) => `${d}` } = options;

  const baseStyle = {
    itemMarker: inferItemMarker(scales, options, library, coordinate, theme),
    itemMarkerSize: inferItemMarkerSize(scales),
    itemMarkerOpacity: inferItemMarkerOpacity(scales),
  };

  const finalLabelFormatter =
    typeof labelFormatter === 'string'
      ? format(labelFormatter)
      : labelFormatter;

  // here must exists a color scale
  const colorScale = scaleOf(scales, 'color');
  const domain = domainOf(scales);

  return {
    ...baseStyle,
    data: domain.map((d) => ({
      id: d,
      label: finalLabelFormatter(d),
      color: colorScale.map(d),
    })),
  };
}

function inferLegendShape(
  value: Record<string, any>,
  options: LegendCategoryOptions,
  component: GCC,
) {
  const { position } = options;
  if (position === 'center') {
    const { bbox } = value;
    // to be comfirm: if position is center, we should use the width and height of user definition.
    const { width, height } = bbox;
    return { width, height };
  }
  const { width, height } = inferComponentShape(value, options, component);
  return { width, height };
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
    itemMarker,
    labelFormatter,
    dx = 0,
    dy = 0,
    title,
    gridCol,
    gridRow,
    layout,
    ...rest
  } = options;

  return (scales, value, coordinate, theme) => {
    const { library, bbox } = value;
    const { x, y } = bbox;
    const { width, height } = inferLegendShape(value, options, LegendCategory);

    const finalLayout = inferComponentLayout(
      position,
      value.scales?.[0]?.guide?.layout,
    );

    const [finalGridRow, finalGridCol] = inferLayout(
      position,
      gridRow,
      gridCol,
    );

    const legendStyle = {
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
      ...inferCategoryStyle(scales, options, library, coordinate, theme),
    };

    const { legend: legendTheme = {} } = theme;
    const layoutWrapper = new G2Layout({
      style: {
        x: x + dx,
        y: y + dy,
        width: bbox.width,
        height: bbox.height,
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
