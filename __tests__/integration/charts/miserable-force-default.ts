import { json } from 'd3-fetch';
import { G2Spec } from '../../../src';

export async function miserableForceDefault(): Promise<G2Spec> {
  const data = await json('data/miserable.json');
  console.log(data);

  return {
    type: 'force',
    data: {
      value: {
        data,
      },
    },
  };
}
