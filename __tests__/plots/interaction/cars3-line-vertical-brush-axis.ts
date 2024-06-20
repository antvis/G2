import { G2Spec } from '../../../src';
import { AXIS_HOT_AREA_CLASS_NAME } from '../../../src/interaction/brushAxisHighlight';
import { brush } from './penguins-point-brush';

export function cars3LineVerticalBrushAxis(): G2Spec {
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
    coordinate: { type: 'parallel' },
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
        state: {
          inactive: { stroke: 'grey', opacity: 0.5 },
        },
        legend: false,
        axis: Object.fromEntries(
          Array.from({ length: position.length }, (_, i) => [
            `position${i === 0 ? '' : i}`,
            {
              zIndex: 1,
              line: true,
              tick: true,
              titlePosition: 'r',
              labelStroke: '#fff',
              labelLineWidth: 5,
              labelFontSize: 10,
              labelStrokeLineJoin: 'round',
              titleStroke: '#fff',
              titleFontSize: 10,
              titleLineWidth: 5,
              titleStrokeLineJoin: 'round',
              titleTransform: 'translate(-50%, 0)  rotate(-90)',
              lineStroke: 'black',
              tickStroke: 'black',
              lineLineWidth: 1,
            },
          ]),
        ),
      },
    ],
    interaction: {
      brushAxisHighlight: {
        maskFill: 'red',
        maskOpacity: 0.8,
      },
      tooltip: { series: false },
    },
  };
}

cars3LineVerticalBrushAxis.steps = ({ canvas }) => {
  const { document } = canvas;
  const axes = document.getElementsByClassName(AXIS_HOT_AREA_CLASS_NAME);
  const [, axis1, axis2] = axes;
  return [
    {
      changeState: () => {
        brush(axis1, 10, 80, 10, 400);
      },
    },
    {
      changeState: () => {
        brush(axis2, 10, 200, 10, 300);
      },
    },
  ];
};
