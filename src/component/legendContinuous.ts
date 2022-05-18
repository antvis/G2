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
  return (scale, value, coordinate, theme) => {
    const { field, domain, bbox } = value;
    const { x, y } = bbox;
    const ticks = scale.getTicks?.() || [];
    const [min, max] = domain;
    return new Continuous({
      style: {
        // @ts-ignore
        x,
        // @ts-ignore
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
