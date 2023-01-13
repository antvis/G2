import { Continuous } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition as GCP,
} from '../runtime';
import { titleContent } from './utils';

export type LegendContinuousOptions = {
  position?: GCP;
  title?: string | string[];
};

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
          width: 400,
          height: 300,
          data: [{ value: min }, { value: max }],
          titleText: titleContent(title),
          titleFontSize: 12,
          ribbonLen: 120,
          ribbonSize: 12,
          ribbonColor: domain.map((d) => scale.map(d)),
          showHandle: false,
          showIndicator: false,
          labelAlign: 'value',
        },
        rest,
      ),
    });
  };
};

LegendContinuous.props = {
  defaultPosition: { anchor: 'top' },
  defaultOrder: 1,
  defaultSize: 40,
};
