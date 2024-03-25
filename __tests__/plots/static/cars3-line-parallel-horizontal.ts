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
    paddingLeft: 30,
    paddingRight: 30,
    data: {
      type: 'fetch',
      value: 'data/cars3.csv',
    },
    interaction: { tooltip: { series: false } },
    coordinate: { type: 'parallel' },
    encode: {
      position,
      color: 'weight (lb)',
    },
    style: {
      lineWidth: 1.5,
      strokeOpacity: 0.4,
    },
    scale: {
      color: {
        palette: 'brBG',
        offset: (t) => 1 - t,
      },
    },
    legend: {
      color: {
        length: 300,
        position: 'top',
        layout: {
          justifyContent: 'center',
        },
      },
    },
    axis: Object.fromEntries(
      Array.from({ length: position.length }, (_, i) => [
        `position${i === 0 ? '' : i}`,
        {
          zIndex: 1,
          line: true,
          tick: true,
          labelFontSize: 10,
          labelStroke: '#fff',
          labelStrokeLineJoin: 'round',
          labelLineWidth: 5,
          lineStroke: 'black',
          lineLineWidth: 1,
          tickStroke: 'black',
          titleFontSize: 10,
          titlePosition: 'right',
          titleSpacing: 15,
          titleStroke: '#fff',
          titleStrokeLineJoin: 'round',
          titleLineWidth: 5,
          titleTransform: 'translate(-10, 0) rotate(-90)',
        },
      ]),
    ),
  };
}
