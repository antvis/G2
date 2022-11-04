import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { G2Spec } from '../../../src';

export async function flareTreemapCustom(): Promise<G2Spec> {
  const data = await csv('data/flare.csv', autoType);

  return {
    type: 'view',
    height: 900,
    width: 1100,
    axis: false,
    legend: false,
    children: [
      {
        type: 'treemap',
        data: {
          value: data,
          path: (d) => d.name.replace(/\./g, '/'),
        },
        layout: {
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
          dx: 3,
          dy: 3,
          // shape style
          fillOpacity: 0.5,
        },
      },
    ],
  };
}
