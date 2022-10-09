import { Continuous } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendContinuousOptions = {
  position?: GuideComponentPosition;
  title?: string | string[];
};

/**
 * Guide Component for continuous color scale.
 * @todo Custom style.
 */
export const LegendContinuous: GCC<LegendContinuousOptions> = (options) => {
  const { title } = options;
  return (scale, value, coordinate, theme) => {
    const { domain, bbox } = value;
    const { x, y } = bbox;
    const ticks = scale.getTicks?.() || [];
    const [min, max] = domain;
    return new Continuous({
      style: {
        x,
        y,
        rail: {
          // @ts-ignore
          length: 120,
          // @ts-ignore
          size: 12,
          ticks,
        },
        min,
        max,
        indicator: null,
        handle: null,
        ...(title && {
          title: {
            content: Array.isArray(title) ? title[0] : title,
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
