import type { DisplayObject } from '@antv/g';
import { HTML } from '@antv/g';
import { Category } from '@antv/component';
import { last } from '@antv/util';
import { format } from '@antv/vendor/d3-format';
import { Identity } from '@antv/scale';
import type {
  FlexLayout,
  G2MarkState,
  GuideComponentComponent as GCC,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import { GuideComponentContext } from '../runtime/types/component';
import type { G2Mark } from '../runtime/types/options';
import { useMarker } from '../utils/marker';
import { CATEGORY_LEGEND_HTML_CLASS_NAME } from '../interaction/legendFilter';
import {
  adaptor,
  domainOf,
  LegendCategoryLayout,
  inferComponentLayout,
  inferComponentShape,
  scaleOf,
  titleContent,
} from './utils';
import { G2_CLASS_PREFIX } from './constant';

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

function inferShape(
  scales: Scale[],
  markState: Map<G2Mark, G2MarkState>,
): readonly [string, string[]] {
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
        : shapeScale?.getOptions().domain.length > 0
        ? shapeScale.getOptions().domain
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

function inferColorMarkers(
  scales: Scale[],
  markState: Map<G2Mark, G2MarkState>,
) {
  if (scaleOf(scales, 'shape') || markState.size < 2) return;

  const colorScale = scaleOf(scales, 'color');
  const uid = colorScale?.getOptions().uid;
  if (!uid) return;

  const markers = new Map<unknown, [string, string]>();
  const remaining = new Set(domainOf(scales));
  for (const [mark, state] of markState) {
    if (typeof mark.type !== 'string') continue;
    const channel = state.channels?.find(({ scale }) => scale?.uid === uid);
    if (!channel) continue;

    const shape = String(mark.style?.shape || state.defaultShape || 'point');
    for (const { value = [] } of channel.values || []) {
      for (const category of value) {
        if (remaining.delete(category))
          markers.set(category, [mark.type, shape]);
        if (remaining.size === 0) return markers;
      }
    }
  }
  return markers;
}

type ColorMarkers = ReturnType<typeof inferColorMarkers>;

function markerName(
  library: GuideComponentContext['library'],
  mark: string,
  shape: string,
) {
  return (
    (library[`mark.${mark}`]?.props?.shape[shape]?.props
      .defaultMarker as string) || last(shape.split('.'))
  );
}

function inferItemMarker(
  options,
  context: GuideComponentContext,
  colorMarkers: ColorMarkers,
): ((datum: any, i: number, data: any) => () => DisplayObject) | undefined {
  const { scales, library, markState } = context;
  const [mark, shapes] = inferShape(scales, markState);
  const { itemMarker, itemMarkerSize: size } = options;

  const create = (name, d, namespace = mark) => {
    const marker = markerName(library, namespace, name);
    const radius = typeof size === 'function' ? size(d) : size;
    return () => useMarker(marker, { color: d.color })(0, 0, radius);
  };

  const shapeOf = (i) => `${shapes[i]}`;

  const shapeScale = scaleOf(scales, 'shape');
  if (shapeScale && !itemMarker) return (d, i) => create(shapeOf(i), d);
  if (typeof itemMarker === 'function') {
    return (d, i) => {
      // @todo Fix this in GUI.
      // It should pass primitive value rather object.
      const node = itemMarker(d.id, i);
      if (typeof node === 'string') return create(node, d);
      return node;
    };
  }
  return (d, i) => {
    const inferred = colorMarkers?.get(d.id);
    if (inferred) return create(inferred[1], d, inferred[0]);
    return create(itemMarker || shapeOf(i), d);
  };
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
  if (scale instanceof Identity) return scale.map(NaN) * 2;
  return defaults;
}

function inferItemMarkerLineWidth(
  options,
  context: GuideComponentContext,
  colorMarkers: ColorMarkers,
) {
  const { scales, markState, library } = context;
  const [, shapes] = inferShape(scales, markState);
  const { itemMarker, itemMarkerLineWidth } = options;

  // If user explicitly set itemMarkerLineWidth, use it
  if (itemMarkerLineWidth !== undefined) {
    return itemMarkerLineWidth;
  }

  // Define line-based shapes that should have thicker line width
  const lineShapes = [
    'line',
    'hyphen',
    'dash',
    'smooth',
    'hv',
    'hvh',
    'vh',
    'vhv',
  ];

  // If itemMarker is explicitly set to a line shape
  if (typeof itemMarker === 'string' && lineShapes.includes(itemMarker)) {
    return 4;
  }

  // If itemMarker is a function, we need to return a function that checks each shape
  if (typeof itemMarker === 'function') {
    return (d, i) => {
      const markerShape = itemMarker(d.id, i);
      if (typeof markerShape === 'string' && lineShapes.includes(markerShape)) {
        return 4;
      }
      return undefined;
    };
  }

  // Check if any of the inferred shapes are line-based
  const shapesArray = Array.isArray(shapes) ? shapes : [shapes];
  const hasLineShape = shapesArray.some((shape) => lineShapes.includes(shape));
  const fallback = hasLineShape ? 4 : undefined;
  if (!colorMarkers?.size) return fallback;

  return (datum) => {
    const inferred = colorMarkers.get(datum.id);
    if (!inferred) return fallback;
    const [mark, shape] = inferred;
    return lineShapes.includes(markerName(library, mark, shape))
      ? 4
      : undefined;
  };
}

function inferCategoryStyle(options, context: GuideComponentContext) {
  const { labelFormatter = (d) => `${d}` } = options;
  const { scales, theme, markState } = context;
  const colorMarkers = options.itemMarker
    ? undefined
    : inferColorMarkers(scales, markState);
  const defaultSize = theme.legendCategory.itemMarkerSize;
  const itemMarkerSize = inferItemMarkerSize(scales, defaultSize);
  const baseStyle = {
    itemMarker: inferItemMarker(
      { ...options, itemMarkerSize },
      context,
      colorMarkers,
    ),
    itemMarkerSize: itemMarkerSize,
    itemMarkerOpacity: inferItemMarkerOpacity(scales),
    itemMarkerLineWidth: inferItemMarkerLineWidth(
      options,
      context,
      colorMarkers,
    ),
  };

  const finalLabelFormatter =
    typeof labelFormatter === 'string'
      ? format(labelFormatter)
      : labelFormatter;

  const colorScale = scaleOf(scales, 'color');
  const domain = domainOf(scales);
  const colorOf = colorScale
    ? (d) => colorScale.map(d)
    : () => context.theme.color;

  return {
    ...baseStyle,
    data: domain.map((d) => ({
      id: d,
      label: finalLabelFormatter(d),
      color: colorOf(d),
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

function filterEmptyIds(legendStyle) {
  return {
    ...legendStyle,
    data:
      legendStyle?.data.filter(
        (item) => item.id !== '' && item.id !== undefined,
      ) || [],
  };
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
    render,
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

    const { legendCategory: legendTheme = {} } = theme;

    // Filter out the data items with empty string IDs in the wordCloud's data before generating the legend.
    const categoryStyle = adaptor(
      Object.assign({}, legendTheme, filterEmptyIds(legendStyle), style, {
        classNamePrefix: G2_CLASS_PREFIX,
      }),
    );

    // If render is provided, use HTML to render.
    if (render) {
      return new Category({
        className: CATEGORY_LEGEND_HTML_CLASS_NAME,
        style: { ...categoryStyle, x: bbox.x, y: bbox.y, render },
      });
    }

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
  defaultCrossPadding: [12, 12],
  defaultPadding: [12, 12],
};
