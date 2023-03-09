import { schemeTableau10 } from 'd3-scale-chromatic';
import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export async function flareTreemapDefault(): Promise<G2Spec> {
  return {
    type: 'treemap',
    height: 600,
    width: 800,
    data: {
      type: 'fetch',
      value: 'data/flare.csv',
    },
    layout: {
      path: (d) => d.name.replace(/\./g, '/'),
      tile: 'treemapBinary',
    },
    scale: { color: { range: schemeTableau10 } },
    encode: {
      value: 'size',
      color: (d) => d.parent.data.name.split('.')[1],
    },
    style: {
      labelText: (d) => {
        const name = d.data.name
          .split('.')
          .pop()
          .split(/(?=[A-Z][a-z])/g)[0];
        return name;
      },
      labelFill: '#000',
      labelPosition: 'top-left',
      dx: 3,
      dy: 3,
      fillOpacity: 0.5,
    },
  };
}

flareTreemapDefault.steps = tooltipSteps(0);
