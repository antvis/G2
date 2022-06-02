import { Continuous } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendContinuousOptions = {
  position?: GuideComponentPosition;
};

/**
 * Guide Component for continuous color scale.
 * @todo Custom style.
 */
export const LegendContinuous: GCC<LegendContinuousOptions> = (options) => {
  return (scales, value, coordinate, theme) => {
    const scale = scales[0];
    const { field, domain } = scale.getOptions();
    const { x, y } = value.bbox;
    const ticks = scale.getTicks?.() || [];
    const [min, max] = domain;
    return new Continuous({
      style: {
        x,
        y,
        rail: {
          // length: 120,
          // size: 12,
          ticks,
        },
        min,
        max,
        indicator: null,
        handle: null,
        ...(field && {
          title: {
            content: Array.isArray(field) ? field[0] : field,
            style: {
              fontSize: 12,
            },
          },
        }),
        color: domain.map((d) => scale.map(d)),
      },
    });
  };
};

LegendContinuous.props = {
  defaultPosition: 'top',
  defaultOrder: 1,
  defaultSize: 40,
};
