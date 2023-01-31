import { Threshold, Quantize, Quantile } from '@antv/scale';
import { head, last } from '@antv/util';
import { Continuous, Layout } from '@antv/gui';
import type {
  GuideComponentComponent as GCC,
  GuideComponentPosition as GCP,
  FlexLayout,
  Scale,
} from '../runtime';
import { titleContent, inferComponentLayout } from './utils';

export type LegendContinuousOptions = {
  layout?: FlexLayout;
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

function inferContinuousConfig(scale: Scale) {
  const { domain, range } = scale.getOptions();

  if (scale instanceof Threshold) {
    const [min, max] = [head(domain), last(domain)];
    const thresholds = (scale as any).thresholds as number[];
    // for quantize, quantile scale
    if (scale instanceof Quantize || scale instanceof Quantile) {
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
  return {
    data: scale.getTicks().map((value) => ({ value })),
    color: range,
  };
}

function inferContinuousLayout(options: LegendContinuousOptions) {
  const { position = 'top', size, length = 200 } = options;
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
  const { title, dx = 0, dy = 0, position, layout, ...rest } = options;
  return (scale, value, coordinate, theme) => {
    const { bbox } = value;
    const { x, y, width, height } = bbox;

    const finalLayout = inferComponentLayout(
      position,
      value.scale?.guide?.layout,
    );
    const layoutWrapper = new Layout({
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
            ...inferContinuousLayout(options),
            ...inferContinuousConfig(scale),
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
};
