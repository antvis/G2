import { G2Spec } from '../../../src';
import { AXIS_HOT_AREA_CLASS_NAME } from '../../../src/interaction/brushAxisHighlight';
import { brush } from './penguins-point-brush';

export function penguinsPointBrushAxis(): G2Spec {
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
    state: { inactive: { stroke: 'gray', opacity: 0.5 } },
    interaction: {
      brushAxisHighlight: true,
    },
  };
}

penguinsPointBrushAxis.steps = ({ canvas }) => {
  const { document } = canvas;
  const axes = document.getElementsByClassName(AXIS_HOT_AREA_CLASS_NAME);
  const [axis1, axis2] = axes;
  return [
    {
      changeState: () => {
        brush(axis2, 10, 50, 10, 300);
      },
    },
    {
      changeState: () => {
        brush(axis1, 200, 10, 250, 10);
      },
    },
  ];
};

penguinsPointBrushAxis.skip = true;
