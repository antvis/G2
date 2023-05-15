import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from './penguins-point-brush';

export function penguinsPointBrushHandleStyle(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    state: {
      inactive: { stroke: 'gray', opacity: 0.5 },
    },
    interaction: {
      brushHighlight: {
        maskHandleNFill: 'blue',
        maskHandleEFill: 'red',
        maskHandleSFill: 'green',
        maskHandleWFill: 'yellow',
        maskHandleNWFill: 'black',
        maskHandleNEFill: 'steelblue',
        maskHandleSEFill: 'pink',
        maskHandleSWFill: 'orange',
      },
    },
  };
}

penguinsPointBrushHandleStyle.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 100, 100, 200, 200);
      },
    },
  ];
};
