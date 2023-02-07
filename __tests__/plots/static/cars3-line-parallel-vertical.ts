import { G2Spec } from '../../../src';

export function cars3LineParallelVertical(): G2Spec {
  const position = [
    'economy (mpg)',
    'cylinders',
    'displacement (cc)',
    'power (hp)',
    'weight (lb)',
    '0-60 mph (s)',
    'year',
  ];
  return {
    type: 'line',
    height: 800,
    data: {
      type: 'fetch',
      value: 'data/cars3.csv',
    },
    coordinates: [{ type: 'parallel' }, { type: 'transpose' }],
    encode: {
      position,
      color: 'cylinders',
    },
    style: {
      strokeWidth: 1.5,
      strokeOpacity: 0.4,
    },
    layout: { padding: 5 },
    scale: {
      color: {
        palette: 'brBG',
        offset: (t) => 1 - t,
      },
    },
    legend: {
      color: {
        position: 'top',
        size: 50,
        length: 300,
        labelSpacing: 0,
      },
    },
    axis: Object.fromEntries(
      Array.from({ length: position.length }, (_, i) => [
        `position${i === 0 ? '' : i}`,
        {
          zIndex: 1,
          labelStroke: '#fff',
          labelStrokeWidth: 5,
          labelFontSize: 10,
          labelStrokeLineJoin: 'round',
          titleStroke: '#fff',
          titleFontSize: 10,
          titleStrokeWidth: 5,
          titleStrokeLineJoin: 'round',
          line: true,
          lineStroke: 'black',
          lineStrokeOpacity: 1,
          lineStrokeWidth: 1,
          tickStroke: 'black',
        },
      ]),
    ),
  };
}
