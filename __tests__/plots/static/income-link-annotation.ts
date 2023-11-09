import { G2Spec } from '../../../src';
import { income } from '../../data/income';

const incdomain = (() => {
  const elements = ([] as any[])
    .concat(
      income.map((v) => v.m),
      income.map((v) => v.f),
    )
    .filter((v) => typeof v === 'number');

  return [Math.min(...elements), Math.max(...elements)];
})();

export function incomeLinkAnnotation(): G2Spec {
  return {
    type: 'view',
    insetRight: 20,
    children: [
      {
        type: 'link',
        data: [1],
        encode: {
          x: [() => incdomain[0], () => incdomain[1]],
          y: [() => incdomain[0], () => incdomain[1]],
        },
        labels: [
          {
            position: 'top-right',
            text: (v) => `${v * 100}%`,
            dx: 4,
            textAlign: 'start',
            textBaseline: 'middle',
          },
        ],
        style: {
          stroke: '#000',
        },
      },
      {
        type: 'link',
        data: [0.6, 0.7, 0.8, 0.9],
        encode: {
          x: [() => incdomain[0], () => incdomain[1]],
          y: [(v) => v * incdomain[0], (v) => v * incdomain[1]],
        },
        labels: [
          {
            position: 'top-right',
            text: (v) => `${v * 100}%`,
            dx: 4,
            textAlign: 'start',
            textBaseline: 'middle',
          },
        ],
        style: {
          stroke: '#000',
          opacity: 0.2,
        },
      },
      {
        type: 'point',
        data: income,
        encode: {
          x: 'm',
          y: 'f',
          size: 4,
          shape: 'hollow',
        },
        style: {
          stroke: '#000',
        },
      },
    ],
  };
}
