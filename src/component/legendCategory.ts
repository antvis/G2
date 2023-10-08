import type { DisplayObject } from '@antv/g';
import { Category } from '@antv/component';
import { last } from '@antv/util';
import { format } from 'd3-format';
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
  context: GuideComponentContext,
): ((datum: any, i: number, data: any) => () => DisplayObject) | undefined {
  const { scales, library, markState } = context;
  const [mark, shapes] = inferShape(scales, markState);
  const { itemMarker, itemMarkerSize: size } = options;

  const create = (name, d) => {
    const marker =
      (library[`mark.${mark}`]?.props?.shape[name]?.props
        .defaultMarker as string) || last(name.split('.'));
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
  return (d, i) => create(itemMarker || shapeOf(i), d);
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

function inferCategoryStyle(options, context: GuideComponentContext) {
  const { labelFormatter = (d) => `${d}` } = options;
  const { scales, theme } = context;
  const defaultSize = theme.legendCategory.itemMarkerSize;
  const itemMarkerSize = inferItemMarkerSize(scales, defaultSize);
  const baseStyle = {
    itemMarker: inferItemMarker({ ...options, itemMarkerSize }, context),
    itemMarkerSize: itemMarkerSize,
    itemMarkerOpacity: inferItemMarkerOpacity(scales),
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

    const { legendCategory: legendTheme = {} } = theme;

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
  defaultCrossPadding: [12, 12],
  defaultPadding: [12, 12],
};
