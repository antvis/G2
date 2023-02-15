import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from './penguins-point-brush';

export function penguinsPointBrushMatrix(): G2Spec {
  const position = [
    'culmen_length_mm',
    'culmen_depth_mm',
    // 'flipper_length_mm',
    // 'body_mass_g',
  ];
  return {
    type: 'repeatMatrix',
    width: position.length * 250,
    height: position.length * 250,
    paddingLeft: 60,
    paddingBottom: 60,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      position,
    },
    children: [
      {
        type: 'point',
        encode: {
          color: 'species',
          key: (d) => position.map((key) => `${d[key]}`).join('-'),
        },
        style: {
          shape: 'point',
          fillOpacity: 0.7,
          transform: 'scale(1, 1)',
          transformOrigin: 'center center',
        },
        state: {
          inactive: {
            fill: 'black',
            fillOpacity: 0.5,
            transform: 'scale(0.5, 0.5)',
          },
        },
        interaction: {
          brushHighlight: {
            brushKey: 'point',
          },
        },
      },
    ],
  };
}

penguinsPointBrushMatrix.steps = ({ canvas }) => {
  const { document } = canvas;
  const [, plot1, , plot2] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    {
      changeState: () => {
        brush(plot1, 100, 100, 200, 200);
      },
    },
    {
      changeState: () => {
        brush(plot2, 350, 100, 450, 200);
      },
    },
  ];
};
