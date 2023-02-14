import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush, dblclick } from './penguins-point-brush';

export function penguinsPointBrushFilter(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    axis: { x: { animate: false }, y: { animate: false } },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    state: {
      inactive: { stroke: 'gray' },
    },
    interaction: {
      brushFilter: true,
    },
  };
}

penguinsPointBrushFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 100, 100, 300, 300);
      },
    },
    {
      changeState: () => {
        brush(plot, 100, 100, 300, 300);
      },
    },
    {
      changeState: () => {
        dblclick(plot);
      },
    },
  ];
};
