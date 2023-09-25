import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function penguinsPointRepeatMatrixLegendFilter(): G2Spec {
  return {
    type: 'repeatMatrix',
    width: 480,
    height: 480,
    paddingLeft: 50,
    paddingBottom: 50,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      position: ['culmen_length_mm', 'culmen_depth_mm'],
    },
    children: [
      {
        type: 'point',
        encode: {
          color: 'species',
        },
      },
    ],
  };
}

penguinsPointRepeatMatrixLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  return [step(e0, 'click')];
};
