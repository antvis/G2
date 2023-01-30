import { Continuous } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition as GCP,
} from '../runtime';
import { titleContent } from './utils';

export type LegendContinuousOptions = {
  position?: GCP;
  title?: string | string[];
  [key: string]: any;
};

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
  const { title, ...rest } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y } = bbox;
    const [min, max] = domain;

    const { continuousLegend: legendTheme = {} } = theme;

    return new Continuous({
      style: Object.assign(
        {},
        legendTheme,
        {
          x,
          y,
          data: [{ value: min }, { value: max }],
          titleText: titleContent(title),
          titleFontSize: 12,
          ribbonColor: domain.map((d) => scale.map(d)),
          showHandle: false,
          showIndicator: false,
          labelAlign: 'value',
          ...inferContinuousLayout(options),
        },
        rest,
      ),
    });
  };
};

LegendContinuous.props = {
  defaultPosition: { anchor: 'top' },
  defaultOrder: 1,
  defaultSize: 50,
};
