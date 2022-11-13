import { G2Spec } from '../../../src';

export function cars3LineParallelHorizontal(): G2Spec {
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
    width: 800,
    data: {
      type: 'fetch',
      value: 'data/cars3.csv',
    },
    coordinate: [{ type: 'parallel' }],
    encode: {
      position,
      color: 'weight (lb)',
    },
    style: {
      strokeWidth: 1.5,
      strokeOpacity: 0.4,
    },
    scale: {
      color: { palette: 'brBG', offset: (t) => 1 - t },
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
          lineStroke: 'black',
          tickStroke: 'black',
          lineStrokeWidth: 1,
        },
      ]),
    ),
  };
}
