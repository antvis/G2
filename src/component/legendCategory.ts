import type { Coordinate } from '@antv/coord';
import type { DisplayObject } from '@antv/g';
import { Category } from '@antv/gui';
import { last } from '@antv/util';
import { format } from 'd3-format';
import type {
  FlexLayout,
  G2Library,
  G2MarkState,
  G2Theme,
  GuideComponentComponent as GCC,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import { GuideComponentContext } from '../runtime/types/component';
import type { G2Mark } from '../runtime/types/options';
import { useMarker } from '../utils/marker';
import {
  adaptor,
  domainOf,
  LegendCategoryLayout,
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

function createShape(
  shape: string,
  library: G2Library,
  coordinate: Coordinate,
  theme: G2Theme,
  style: Record<string, any> = {},
) {
  const marker =
    (library[`shape.${shape}`]?.props?.defaultMarker as string) ||
    last(shape.split('.'));
  return () => useMarker(marker, style)(0, 0, 6);
}

function inferShape(scales: Scale[], markState: Map<G2Mark, G2MarkState>) {
  const shapeScale = scaleOf(scales, 'shape');
  const colorScale = scaleOf(scales, 'color');

  // NOTE!!!
  // scaleOrdinal.map will mute domain.
  const shapeScale1 = shapeScale ? shapeScale.clone() : null;

  // Infer the main shape if multiple marks are used.
  const shapes: [string, string[]][] = [];
  for (const [mark, state] of markState) {
    const namespace = mark.type;
    const domain =
      colorScale?.getOptions().domain.length > 0
        ? colorScale?.getOptions().domain
        : state.data;
    const shape: string[] = domain.map((d, i) => {
      if (shapeScale1) return shapeScale1.map(d || 'point');
      return mark?.style?.shape || state.defaultShape || 'point';
    });
    if (typeof namespace === 'string') shapes.push([namespace, shape]);
  }

  if (shapes.length === 0) return ['point', ['point']];
  if (shapes.length === 1) return shapes[0];
  if (!shapeScale) return shapes[0];
  // Evaluate the maximum likelihood of shape
  const { range } = shapeScale.getOptions();
  return shapes
    .map(([namespace, shape]) => {
      let sum = 0;
      for (let i = 0; i < shapes.length; i++) {
        const targetShape = range[i % range.length];
        if (shape[i] === targetShape) sum++;
      }
      return [sum / shape.length, [namespace, shape]] as const;
    })
    .sort((a, b) => b[0] - a[0])[0][1];
}

function inferItemMarker(
  options,
  { scales, library, coordinate, theme, markState }: GuideComponentContext,
): ((datum: any, i: number, data: any) => () => DisplayObject) | undefined {
  const [namespace, shapes] = inferShape(scales, markState);
  const create = (name, color) =>
    createShape(name, library, coordinate, theme, {
      color,
    });
  const shapeOf = (i) => `${namespace}.${shapes[i]}`;

  const { itemMarker } = options;
  const shapeScale = scaleOf(scales, 'shape');
  if (shapeScale && !itemMarker) return (d, i) => create(shapeOf(i), d.color);
  if (typeof itemMarker === 'function') {
    return (d, i) => {
      // @todo Fix this in GUI.
      // It should pass primitive value rather object.
      const node = itemMarker(d.id, i);
      if (typeof node === 'string') return create(node, d.color);
      return node;
    };
  }
  return (d, i) => create(itemMarker || shapeOf(i), d.color);
}

function inferItemMarkerOpacity(scales: Scale[]) {
  const scale = scaleOf(scales, 'opacity');
  if (scale) {
    const { range } = scale.getOptions();
    return (d, i) => range[i];
  }
  return undefined;
}

function inferItemMarkerSize(scales: Scale[], defaults: number) {
  const scale = scaleOf(scales, 'size');
  // only support constant size scale.
  // size in category legend means the marker radius.
  if (scale) return scale.map(NaN) * 2;
  return defaults;
}

function inferCategoryStyle(options, context: GuideComponentContext) {
  const { labelFormatter = (d) => `${d}` } = options;
  const { scales, theme } = context;
  const baseStyle = {
    itemMarker: inferItemMarker(options, context),
    itemMarkerSize: inferItemMarkerSize(
      scales,
      theme?.legendCategory?.style?.itemMarkerSize,
    ),
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
    // to be confirm: if position is center, we should use the width and height of user definition.
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
    labelFormatter,
    layout,
    order,
    orientation,
    position,
    size,
    title,
    cols,
    itemMarker,
    ...style
  } = options;

  const { gridRow } = style;

  return (context) => {
    const { value, theme } = context;
    const { bbox } = value;
    const { width, height } = inferLegendShape(value, options, LegendCategory);

    const finalLayout = inferComponentLayout(position, layout);

    const legendStyle = {
      orientation: ['right', 'left', 'center'].includes(position)
        ? 'vertical'
        : 'horizontal',
      width,
      height,
      layout: cols !== undefined ? 'grid' : 'flex',
      ...(cols !== undefined && { gridCol: cols }),
      ...(gridRow !== undefined && { gridRow }),
      titleText: titleContent(title),
      ...inferCategoryStyle(options, context),
    };

    const {
      legendCategory: { style: legendTheme = {} },
    } = theme;

    const categoryStyle = adaptor(
      Object.assign({}, legendTheme, legendStyle, style),
    );

    const layoutWrapper = new LegendCategoryLayout({
      style: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        ...finalLayout,
        // @ts-ignore
        subOptions: categoryStyle,
      },
    });

    layoutWrapper.appendChild(
      new Category({
        className: 'legend-category',
        style: categoryStyle,
      }),
    );

    return layoutWrapper as unknown as DisplayObject;
  };
};

LegendCategory.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
  defaultPadding: [20, 10], // [horizontal, vertical]
  defaultCrossPadding: [5, 10], // [horizontal, vertical]
};
