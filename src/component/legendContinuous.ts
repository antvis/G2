import { DisplayObject, parseColor } from '@antv/g';
import { Continuous } from '@antv/component';
import { Constant, Quantile, Quantize, Threshold } from '@antv/scale';
import { format } from 'd3-format';
import type {
  FlexLayout,
  G2Theme,
  GuideComponentComponent as GCC,
  GuideComponentOrientation as GCO,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import { lastOf } from '../utils/array';
import {
  G2Layout,
  adaptor,
  inferComponentLayout,
  inferComponentShape,
  isHorizontal,
  scaleOf,
  titleContent,
} from './utils';

export type LegendContinuousOptions = {
  layout?: FlexLayout;
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

type Shape = {
  orientation: string;
  width: number;
  height: number;
  length: number;
  size: number;
};

type Config = {
  orientation: string;
  width: number;
  height: number;
  color: string[];
  data: any[];
  labelFilter?: (datum: any, index: number) => boolean;
  domain?: [number, number];
};

function updateShapeDimensions(
  shape: Shape,
  finalSize: number,
  orientation: Exclude<GCO, number>,
): Shape {
  shape.size = finalSize;
  if (isHorizontal(orientation)) {
    shape.height = finalSize;
  } else {
    shape.width = finalSize;
  }
  return shape;
}

function inferContinuousShape(
  value: Record<string, any>,
  options: LegendContinuousOptions,
  component: GCC,
): Shape {
  const { size } = options;
  const shape = inferComponentShape(value, options, component);
  return updateShapeDimensions(shape, size, shape.orientation);
}

function getFormatter(max: number) {
  return (value: number) => ({
    value: value / max,
    label: String(value),
  });
}

function getQuantizeOrQuantileConfig(
  shape: Shape,
  colorScale: Threshold,
  min: number,
  max: number,
  range: string[],
): Config {
  const thresholds = (colorScale as any).thresholds as number[];
  const formatter = getFormatter(max);
  return {
    ...shape,
    color: range,
    data: [min, ...thresholds, max].map(formatter),
  };
}

function getThresholdConfig(
  shape: Shape,
  colorScale: Threshold,
  range: string[],
): Config {
  const thresholds = (colorScale as any).thresholds as number[];
  const data = [-Infinity, ...thresholds, Infinity].map((value, index) => ({
    value: index,
    label: value,
  }));
  return {
    ...shape,
    data,
    color: range,
    labelFilter: (datum, index) => {
      return index > 0 && index < data.length - 1;
    },
  };
}

function rangeOf(scale: Scale) {
  const { domain } = scale.getOptions();
  const [min, max] = [domain[0], lastOf(domain)];
  return [min, max];
}

/**
 * if color scale is not defined, create a constant color scale based on default color
 * @param scale
 * @param theme
 */
function createColorScale(scale: Scale, defaultColor: string): Scale {
  const options = scale.getOptions();
  const newScale = scale.clone();
  newScale.update({ ...options, range: [parseColor(defaultColor).toString()] });
  return newScale;
}

function getLinearConfig(
  shape: Shape,
  colorScale: Scale,
  sizeScale: Scale,
  opacityScale: Scale,
  scales: Record<string, any>,
  theme: G2Theme,
): Config {
  const { length } = shape;
  const definedScale = sizeScale || opacityScale;

  // Only use defaultColor when there is no color scale
  // in this view.
  const defaultColor = scales.color
    ? theme.legendContinuous.ribbonFill || 'black'
    : theme.color;

  const scale = colorScale || createColorScale(definedScale, defaultColor);
  const [min, max] = rangeOf(scale);
  const [domainMin, domainMax] = rangeOf(
    [colorScale, sizeScale, opacityScale]
      .filter((d) => d !== undefined)
      .find((d) => !(d instanceof Constant)),
  );
  return {
    ...shape,
    domain: [domainMin, domainMax],
    data: scale.getTicks().map((value) => ({ value })),
    color: new Array(Math.floor(length)).fill(0).map((d, i) => {
      const value = ((max - min) / (length - 1)) * i + min;
      const color = scale.map(value) || defaultColor;
      const opacity = opacityScale ? opacityScale.map(value) : 1;
      return color.replace(
        /rgb[a]*\(([\d]{1,3}) *, *([\d]{1,3}) *, *([\d]{1,3})[\S\s]*\)/,
        (match, p1, p2, p3) => `rgba(${p1}, ${p2}, ${p3}, ${opacity})`,
      );
    }),
  };
}

function inferContinuousConfig(
  scales: Scale[],
  scale: Record<string, Scale>,
  value: Record<string, any>,
  options: LegendContinuousOptions,
  component: GCC,
  theme: G2Theme,
): Config {
  const colorScale = scaleOf(scales, 'color');
  const shape = inferContinuousShape(value, options, component);

  if (colorScale instanceof Threshold) {
    const { range } = colorScale.getOptions();
    const [min, max] = rangeOf(colorScale);
    // for quantize, quantile scale
    if (colorScale instanceof Quantize || colorScale instanceof Quantile) {
      return getQuantizeOrQuantileConfig(shape, colorScale, min, max, range);
    }
    // for threshold
    return getThresholdConfig(shape, colorScale, range);
  }

  // for linear, pow, sqrt, log, time, utc scale
  const sizeScale = scaleOf(scales, 'size');
  const opacityScale = scaleOf(scales, 'opacity');
  return getLinearConfig(
    shape,
    colorScale,
    sizeScale,
    opacityScale,
    scale,
    theme,
  );
}

/**
 * Guide Component for continuous color scale.
 * @todo Custom style.
 */
export const LegendContinuous: GCC<LegendContinuousOptions> = (options) => {
  const {
    labelFormatter,
    layout,
    order,
    orientation,
    position,
    size,
    title,
    style,
    crossPadding,
    padding,
    ...rest
  } = options;

  return ({ scales, value, theme, scale }) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;
    const finalLayout = inferComponentLayout(position, layout);

    const { legendContinuous: legendTheme = {} } = theme;

    const finalStyle = adaptor(
      Object.assign(
        {},
        legendTheme,
        {
          titleText: titleContent(title),
          labelAlign: 'value',
          labelFormatter:
            typeof labelFormatter === 'string'
              ? (d) => format(labelFormatter)(d.label)
              : labelFormatter,
          ...inferContinuousConfig(
            scales,
            scale,
            value,
            options,
            LegendContinuous,
            theme,
          ),
          ...style,
        },
        rest,
      ),
    );

    const layoutWrapper = new G2Layout({
      style: {
        x,
        y,
        width,
        height,
        ...finalLayout,
        // @ts-ignore
        subOptions: finalStyle,
      },
    });

    layoutWrapper.appendChild(
      new Continuous({
        className: 'legend-continuous',
        style: finalStyle,
      }),
    );

    return layoutWrapper as unknown as DisplayObject;
  };
};

LegendContinuous.props = {
  defaultPosition: 'top',
  defaultOrientation: 'vertical',
  defaultOrder: 1,
  defaultSize: 60,
  defaultLength: 200,
  defaultLegendSize: 60,
  defaultPadding: [20, 10], // [horizontal, vertical]
  defaultCrossPadding: [12, 12], // [horizontal, vertical]
};
