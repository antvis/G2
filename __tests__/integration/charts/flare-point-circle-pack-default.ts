import { json } from 'd3-fetch';
import { G2Spec } from '../../../src';

export async function flarePointCirclePackDefault(): Promise<G2Spec> {
  const data = await json('data/flare.json');
  return {
    padding: 20,
    type: 'pack',
    data: {
      value: data,
    },
  };
}
