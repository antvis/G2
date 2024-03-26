import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function cars3LineXd(): G2Spec {
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
    type: 'view',
    height: 800,
    coordinate: { type: 'parallel', transform: [{ type: 'transpose' }] },
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/cars3.csv',
        },
        encode: {
          position,
          color: 'cylinders',
        },
        style: {
          lineWidth: 1.5,
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
              labelLineWidth: 5,
              labelFontSize: 10,
              labelStrokeLineJoin: 'round',
              titleStroke: '#fff',
              titleFontSize: 10,
              titleLineWidth: 5,
              titleStrokeLineJoin: 'round',
              lineStroke: 'black',
              tickStroke: 'black',
              lineLineWidth: 1,
            },
          ]),
        ),
      },
    ],
    interaction: {
      tooltip: {
        series: false,
      },
    },
  };
}

cars3LineXd.steps = tooltipSteps(0);
