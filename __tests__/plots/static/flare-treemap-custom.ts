import { schemeTableau10 } from '@antv/vendor/d3-scale-chromatic';
import { G2Spec } from '../../../src';

export async function flareTreemapCustom(): Promise<G2Spec> {
  return {
    type: 'view',
    height: 900,
    width: 1100,
    children: [
      {
        type: 'treemap',
        data: {
          type: 'fetch',
          value: 'data/flare.csv',
        },
        layout: {
          path: (d) => d.name.replace(/\./g, '/'),
          tile: 'treemapBinary',
        },
        scale: {
          color: { range: schemeTableau10 },
        },
        encode: {
          value: 'size',
          color: (d) => d.parent.data.name.split('.')[1],
        },
        style: {
          // label style
          labelText: (d) => {
            const name = d.data.name
              .split('.')
              .pop()
              .split(/(?=[A-Z][a-z])/g)[0];
            return name;
          },
          labelFill: '#000',
          labelPosition: 'top-left',
          labelDx: 3,
          labelDy: 3,
          // shape style
          fillOpacity: 0.5,
        },
      },
    ],
  };
}
