import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';

export async function energySankeyDefaults(): Promise<G2Spec> {
  const links = await csv('data/energy.csv', autoType);

  return {
    type: 'sankey',
    data: { value: { links } },
  };
}
