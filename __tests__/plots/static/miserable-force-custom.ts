import { schemeTableau10 } from '@antv/vendor/d3-scale-chromatic';
import { G2Spec } from '../../../src';

export function miserableForceCustom(): G2Spec {
  const mockData = (data) => {
    const { nodes, links } = data;
    const LS = links.map((d) => d.source);
    const LT = links.map((d) => d.target);
    const LV = links.map((d) => d.value);
    return {
      links: links.map((_, i) => ({ t: LT[i], s: LS[i], v: LV[i] })),
      nodes,
    };
  };
  return {
    type: 'view',
    width: 800,
    height: 800,
    children: [
      {
        type: 'forceGraph',
        data: {
          type: 'fetch',
          value: 'data/miserableDisjoint.json',
          transform: [{ type: 'custom', callback: mockData }],
        },
        layout: {
          joint: false,
        },
        encode: {
          source: 's',
          target: 't',
          value: 'v',
          nodeKey: 'id',
          linkKey: 'id',
        },
        scale: {
          color: { range: schemeTableau10 },
        },
        style: {
          linkStroke: '#000',
          nodeLineWidth: 0,
        },
      },
    ],
  };
}
