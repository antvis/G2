import { min as d3Min, max as d3Max, quantile, group } from 'd3-array';
import { CompositeMarkComponent as CC } from '../runtime';
import { BoxPlotMark } from '../spec';
import { subObject } from '../utils/helper';
import { maybeAnimation, subTooltip } from '../utils/mark';

export type BoxPlotOptions = Omit<BoxPlotMark, 'type'>;

function min(I: number[], V: number[]): number {
  return d3Min(I, (i) => V[i]);
}

function max(I: number[], V: number[]): number {
  return d3Max(I, (i) => V[i]);
}

function lower(I: number[], V: number[]): number {
  const lo = q1(I, V) * 2.5 - q3(I, V) * 1.5;
  return d3Min(I, (i) => (V[i] >= lo ? V[i] : NaN));
}

function q1(I: number[], V: number[]): number {
  return quantile(I, 0.25, (i) => V[i]);
}

function q2(I: number[], V: number[]): number {
  return quantile(I, 0.5, (i) => V[i]);
}

function q3(I: number[], V: number[]): number {
  return quantile(I, 0.75, (i) => V[i]);
}

function upper(I: number[], V: number[]): number {
  const hi = q3(I, V) * 2.5 - q1(I, V) * 1.5;
  return d3Max(I, (i) => (V[i] <= hi ? V[i] : NaN));
}

/**
 * Group marks by x and reserve outlier indexes.
 */
function OutlierY() {
  return (I: number[], mark) => {
    const { encode } = mark;
    const { y, x } = encode;
    const { value: V } = y;
    const { value: X } = x;
    const GI = Array.from(group(I, (i) => X[+i]).values());
    const FI = GI.flatMap((I) => {
      const lo = lower(I, V);
      const hi = upper(I, V);
      return I.filter((i) => V[i] < lo || V[i] > hi);
    });
    return [FI, mark];
  };
}

export const Boxplot: CC<BoxPlotOptions> = (options) => {
  const {
    data,
    encode,
    style = {},
    tooltip = {},
    transform,
    animate,
    ...rest
  } = options;
  const { point = true, ...restStyle } = style;
  const { y } = encode;
  const encodeY = { y, y1: y, y2: y, y3: y, y4: y };
  const qy = { y1: q1, y2: q2, y3: q3 };

  // Tooltips.
  const boxTooltip = subTooltip(
    tooltip,
    'box',
    {
      items: [
        { channel: 'y', name: 'min' },
        { channel: 'y1', name: 'q1' },
        { channel: 'y2', name: 'q2' },
        { channel: 'y3', name: 'q3' },
        { channel: 'y4', name: 'max' },
      ],
    },
    true,
  );
  const pointTooltip = subTooltip(tooltip, 'point', {
    title: { channel: 'x' },
    items: [{ name: 'outlier', channel: 'y' }],
  });

  // Only show min and max instead of lower and upper.
  // Only draw a box.
  if (!point) {
    return {
      type: 'box',
      data: data,
      transform: [
        {
          type: 'groupX',
          y: min,
          ...qy,
          y4: max,
        },
      ],
      encode: { ...encode, ...encodeY },
      style: restStyle,
      tooltip: boxTooltip,
      ...rest,
    };
  }

  const boxStyle = subObject(restStyle, 'box');
  const pointStyle = subObject(restStyle, 'point');
  return [
    // Draw five-number box.
    {
      type: 'box',
      data: data,
      transform: [
        {
          type: 'groupX',
          y: lower,
          ...qy,
          y4: upper,
        },
      ],
      encode: { ...encode, ...encodeY },
      style: boxStyle,
      tooltip: boxTooltip,
      animate: maybeAnimation(animate, 'box'),
      ...rest,
    },
    // Draw outliers.
    {
      type: 'point',
      data: data,
      transform: [{ type: OutlierY }],
      encode,
      style: { ...pointStyle },
      tooltip: pointTooltip,
      animate: maybeAnimation(animate, 'point'),
    },
  ];
};

Boxplot.props = {};
