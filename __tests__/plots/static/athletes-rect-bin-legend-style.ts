import { G2Spec } from '../../../src';

export function athletesRectBinLegendStyle(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/athletes.csv',
    },
    transform: [
      { type: 'binX', y: 'count' },
      { type: 'stackY', orderBy: 'series' },
    ],
    encode: {
      x: 'weight',
      color: 'sex',
    },
    legend: {
      color: {
        itemMarkerFill: 'red',
        itemValueFill: 'black',
        itemLabelFontSize: 30,
      },
    },
    style: {
      inset: 0.5,
    },
  };
}
