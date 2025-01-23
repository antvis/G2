import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { schemeTableau10 } from '@antv/vendor/d3-scale-chromatic';
import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export async function energySankeyCustom(): Promise<G2Spec> {
  const links = await csv<any>('data/energy.csv', autoType);

  const mockData = () => {
    const LS = links.map((d) => d.source);
    const LT = links.map((d) => d.target);
    const LV = links.map((d) => d.value);
    return {
      links: links.map((_, i) => ({ t: LT[i], s: LS[i], v: LV[i] })),
      nodes: Array.from(new Set([...LS, ...LT]), (id) => ({ id })),
    };
  };
  const key = (d) => d.id.split(/\W/)[0];
  return {
    type: 'view',
    width: 900,
    height: 600,
    padding: 10,
    children: [
      {
        type: 'sankey',
        data: { value: mockData() },
        layout: {
          nodeAlign: 'center',
          nodePadding: 0.03,
        },
        scale: {
          color: { range: schemeTableau10 },
        },
        encode: {
          source: 's',
          target: 't',
          value: 'v',
          nodeKey: 'id',
          nodeColor: key,
          linkColor: (d) => key(d.source),
        },
        style: {
          labelSpacing: 3,
          labelFontWeight: 'bold',
          nodeLineWidth: 1.2,
          linkFillOpacity: 0.4,
        },
      },
      {
        type: 'text',
        data: [1, 1],
        style: {
          text: 'Sankey',
          fontSize: 80,
          textAlign: 'end',
          fontWeight: 'bold',
          textBaseline: 'bottom',
        },
      },
    ],
  };
}

energySankeyCustom.steps = tooltipSteps(0, 100);
