import { group } from 'd3-array';
import { Mark, MarkComponent as MC, SingleMark, Vector3 } from '../runtime';
import { LineMark } from '../spec';
import { Line3DShape } from '../shape';
import { MaybeSeries } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip3d,
} from './utils';

const shape = {
  line: Line3DShape,
};

export type LineOptions = Omit<LineMark, 'type'>;

const line: Mark = (index, scale, value, coordinate) => {
  const { series: S, x: X, y: Y, z: Z } = value;
  const { x, y, z } = scale;

  // Because x and y channel is not strictly required in Line.props,
  // it should throw error with empty x, y or z channels.
  if (X === undefined || Y === undefined || Z === undefined) {
    throw new Error('Missing encode for x, y or z channel.');
  }

  // Group data into series.
  // There is only one series without specified series encode.
  const series = S ? Array.from(group(index, (i) => S[i]).values()) : [index];
  const I = series.map((group) => group[0]).filter((i) => i !== undefined);

  // A group of data corresponds to one line.
  const xoffset = (x?.getBandWidth?.() || 0) / 2;
  const yoffset = (y?.getBandWidth?.() || 0) / 2;
  const zoffset = (z?.getBandWidth?.() || 0) / 2;
  const P = Array.from(series, (I) => {
    return I.map((i) =>
      coordinate.map([
        (+X[i] || 0) + xoffset,
        (+Y[i] || 0) + yoffset,
        (+Z[i] || 0) + zoffset,
      ]),
    ) as Vector3[];
  });
  return [I, P, series];
};

/**
 * Convert value for each channel to line shapes.
 */
export const Line3D: MC<LineOptions> = () => {
  return (index, scale, value, coordinate) => {
    const mark = line;
    return (mark as SingleMark)(index, scale, value, coordinate);
  };
};

Line3D.props = {
  defaultShape: 'line',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x' },
    { name: 'y' },
    { name: 'z' },
    { name: 'position', independent: true },
    { name: 'size' },
    { name: 'series', scale: 'identity' },
  ],
  preInference: [...basePreInference(), { type: MaybeSeries }],
  postInference: [...basePostInference(), ...tooltip3d()],
  interaction: {
    shareTooltip: false,
    seriesTooltip: false,
    crosshairs: false,
  },
};
