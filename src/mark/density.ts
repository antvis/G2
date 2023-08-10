import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { DensityMark } from '../spec';
import { DensityShape } from '../shape';
import { MaybeZeroY1, MaybeZeroX } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

const shape = {
  density: DensityShape,
};

export type DensityOptions = Omit<DensityMark, 'type'>;

export const Density: MC<DensityOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, series: S } = value;

    const Yn = Object.entries(value)
      .filter(([key]) => key.startsWith('y'))
      .map(([, value]) => value);

    const SZn = Object.entries(value)
      .filter(([key]) => key.startsWith('size'))
      .map(([, value]) => value);

    // Because x and y channel is not strictly required in Line.props,
    // it should throw error with empty x or y channels.
    if (X === undefined || Yn === undefined || SZn === undefined) {
      throw new Error('Missing encode for x or y or size channel.');
    }

    // Calc width for each box.
    // The scales for x and series channels must be band scale.
    const xScale = scale.x as Band;
    const series = scale.series as Band;

    const P = Array.from(index, (i) => {
      const groupWidth = xScale.getBandWidth(xScale.invert(+X[i]));
      const ratio = series ? series.getBandWidth(series.invert(+S?.[i])) : 1;
      const width = groupWidth * ratio;
      const offset = (+S?.[i] || 0) * groupWidth;

      const x = +X[i] + offset + width / 2;

      const PN = [
        ...Yn.map((_, idx) => [x + +SZn[idx][i] / index.length, +Yn[idx][i]]), // right
        ...Yn.map((_, idx) => [
          x - +SZn[idx][i] / index.length,
          +Yn[idx][i],
        ]).reverse(), // left
      ];

      return PN.map((p) => coordinate.map(p)) as Vector2[];
    });
    return [index, P];
  };
};

Density.props = {
  defaultShape: 'density',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'size', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size', required: true, scale: 'identity' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroY1 },
    { type: MaybeZeroX },
  ],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: { shareTooltip: true },
};
