import { Continuous } from '@antv/gui';
import {
  GuideComponentComponent as GCC,
  GuideComponentPosition,
} from '../runtime';

export type LegendContinuousOptions = {
  position?: GuideComponentPosition;
};

export const LegendContinuous: GCC<LegendContinuousOptions> = (options) => {
  return (scale, bbox, value, coordinate, theme) => {
    const { field, domain } = value;
    const { x, y } = bbox;
    const ticks = scale.getTicks?.() || [];
    const [min, max] = domain;
    return new Continuous({
      style: {
        x,
        y,
        rail: {
          width: 120,
          height: 12,
          ticks,
        },
        min,
        max,
        indicator: false,
        handle: false,
        ...(field && {
          title: {
            content: field,
            spacing: 0,
            style: {
              fontSize: 12,
              fill: 'black',
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
  defaultSize: 64,
};
