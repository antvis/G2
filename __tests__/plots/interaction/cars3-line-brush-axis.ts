import { G2Spec } from '../../../src';
import { AXIS_HOT_AREA_CLASS_NAME } from '../../../src/interaction/native/brushAxisHighlight';
import { brush } from './penguins-point-brush';

export function cars3LineBrushAxis(): G2Spec {
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
    coordinates: [{ type: 'parallel' }, { type: 'transpose' }],
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
          strokeWidth: 1.5,
          strokeOpacity: 0.4,
        },
        scale: {
          color: { palette: 'brBG', offset: (t) => 1 - t },
        },
        legend: false,
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
      },
    ],
    interaction: {
      brushAxisHighlight: {
        unhighlightedStroke: 'grey',
      },
    },
  };
}

cars3LineBrushAxis.steps = ({ canvas }) => {
  const { document } = canvas;
  const axes = document.getElementsByClassName(AXIS_HOT_AREA_CLASS_NAME);
  const [, axis1, axis2] = axes;
  return [
    {
      changeState: () => {
        brush(axis1, 50, 60, 400, 60);
      },
    },
    {
      changeState: () => {
        brush(axis2, 200, 60, 300, 60);
      },
    },
  ];
};
