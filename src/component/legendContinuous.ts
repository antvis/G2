import { Continuous } from '@antv/gui';
import { Quantile, Quantize, Threshold } from '@antv/scale';
import { format } from 'd3-format';
import type {
  FlexLayout,
  GuideComponentComponent as GCC,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import { G2Layout, inferComponentLayout, titleContent, scaleOf } from './utils';

export type LegendContinuousOptions = {
  layout?: FlexLayout;
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

function inferContinuousConfig(
  scales: Scale[],
  options: LegendContinuousOptions,
) {
  const colorScale = scaleOf(scales, 'color');
  const { domain, range } = colorScale.getOptions();
  const { length = LegendContinuous.props.defaultLength } = options;
  const [min, max] = [domain[0], domain.slice(-1)[0]];

  if (colorScale instanceof Threshold) {
    const thresholds = (colorScale as any).thresholds as number[];
    // for quantize, quantile scale
    if (colorScale instanceof Quantize || colorScale instanceof Quantile) {
      return {
        data: [min, ...thresholds, max].map((value, index) => ({
          value: value / max,
          label: value,
        })),
        color: range,
      };
    }
    // for threshhold
    const data = [-Infinity, ...thresholds, Infinity].map((value, index) => ({
      value: index,
      label: value,
    }));
    return {
      data,
      color: range,
      labelFilter: (datum, index) => {
        return index > 0 && index < data.length - 1;
      },
    };
  }

  // for linear, pow, sqrt, log, time, utc scale
  const opacityScale = scaleOf(scales, 'opacity');
  return {
    data: colorScale.getTicks().map((value) => ({ value })),
    color: new Array(length).fill(0).map((d, i) => {
      const value = ((max - min) / (length - 1)) * i + min;
      const color = colorScale.map(value);
      const opacity = opacityScale ? opacityScale.map(value) : 1;
      return color.replace(
        /rgb[a]*\(([\d]{1,3}), ([\d]{1,3}), ([\d]{1,3})[\S\s]*\)/,
        (match, p1, p2, p3) => `rgba(${p1}, ${p2}, ${p3}, ${opacity})`,
      );
    }),
  };
}

function inferContinuousLayout(options: LegendContinuousOptions) {
  const {
    position = 'top',
    size,
    length = LegendContinuous.props.defaultLength,
  } = options;

  const layouts = {
    left: ['vertical', size, length],
    right: ['vertical', size, length],
    top: ['horizontal', length, size],
    bottom: ['horizontal', length, size],
  };
  const [orient, width, height] = layouts[position];
  return { orient, width, height };
}

/**
 * Guide Component for continuous color scale.
 * @todo Custom style.
 */
export const LegendContinuous: GCC<LegendContinuousOptions> = (options) => {
  const {
    title,
    dx = 0,
    dy = 0,
    position,
    layout,
    labelFormatter,
    ...rest
  } = options;
  return (scales, value, coordinate, theme) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;

    const finalLayout = inferComponentLayout(
      position,
      value.scales?.[0]?.guide?.layout,
    );
    const layoutWrapper = new G2Layout({
      style: {
        x: x + dx,
        y: y + dy,
        width,
        height,
        ...finalLayout,
      },
    });

    const { continuousLegend: legendTheme = {} } = theme;

    layoutWrapper.appendChild(
      new Continuous({
        style: Object.assign(
          {},
          legendTheme,
          {
            x,
            y,
            titleText: titleContent(title),
            titleFontSize: 12,
            showHandle: false,
            showIndicator: false,
            labelAlign: 'value',
            labelFormatter:
              typeof labelFormatter === 'string'
                ? (d) => format(labelFormatter)(d.label)
                : labelFormatter,
            ...inferContinuousLayout(options),
            ...inferContinuousConfig(scales, options),
          },
          rest,
        ),
      }),
    );

    return layoutWrapper;
  };
};

LegendContinuous.props = {
  defaultPosition: 'top',
  defaultOrientation: 'vertical',
  defaultOrder: 1,
  defaultSize: 60,
  defaultLength: 200,
};
