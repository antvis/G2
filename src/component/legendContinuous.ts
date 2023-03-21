import { Continuous } from '@antv/gui';
import { Quantile, Quantize, Threshold } from '@antv/scale';
import { format } from 'd3-format';
import type {
  FlexLayout,
  GuideComponentComponent as GCC,
  GuideComponentPosition as GCP,
  Scale,
} from '../runtime';
import {
  adaptor,
  G2Layout,
  inferComponentLayout,
  inferComponentShape,
  scaleOf,
  titleContent,
} from './utils';

export type LegendContinuousOptions = {
  layout?: FlexLayout;
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

function inferContinuousConfig(
  scales: Scale[],
  value: Record<string, any>,
  options: LegendContinuousOptions,
  component: GCC,
) {
  const colorScale = scaleOf(scales, 'color');
  const { domain, range } = colorScale.getOptions();
  const [min, max] = [domain[0], domain.slice(-1)[0]];
  const { orientation, width, height, length } = inferComponentShape(
    value,
    options,
    component,
  );

  const shape = { orientation, width, height };

  if (colorScale instanceof Threshold) {
    const thresholds = (colorScale as any).thresholds as number[];
    // for quantize, quantile scale
    if (colorScale instanceof Quantize || colorScale instanceof Quantile) {
      return {
        color: range,
        ...shape,
        data: [min, ...thresholds, max].map((value, index) => ({
          value: value / max,
          label: value,
        })),
      };
    }
    // for threshhold
    const data = [-Infinity, ...thresholds, Infinity].map((value, index) => ({
      value: index,
      label: value,
    }));
    return {
      data,
      ...shape,
      color: range,
      labelFilter: (datum, index) => {
        return index > 0 && index < data.length - 1;
      },
    };
  }

  // for linear, pow, sqrt, log, time, utc scale
  const opacityScale = scaleOf(scales, 'opacity');
  return {
    ...shape,
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
    ...rest
  } = options;
  return ({ scales, value, theme }) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;

    const finalLayout = inferComponentLayout(
      position,
      value.scales?.[0]?.guide?.layout,
    );
    const layoutWrapper = new G2Layout({
      style: {
        x,
        y,
        width,
        height,
        ...finalLayout,
      },
    });

    const { continuousLegend: legendTheme = {} } = theme;

    layoutWrapper.appendChild(
      new Continuous({
        style: adaptor(
          Object.assign(
            {},
            legendTheme,
            {
              titleText: titleContent(title),
              titleFontSize: 12,
              handle: false,
              indicator: false,
              labelAlign: 'value',
              labelFormatter:
                typeof labelFormatter === 'string'
                  ? (d) => format(labelFormatter)(d.label)
                  : labelFormatter,
              ...inferContinuousConfig(
                scales,
                value,
                options,
                LegendContinuous,
              ),
              ...style,
            },
            rest,
          ),
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
  defaultLength: 300,
};
