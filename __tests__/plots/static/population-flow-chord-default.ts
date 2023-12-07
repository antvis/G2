import { G2Spec } from '../../../src';

export async function populationFlowChordDefault(): Promise<G2Spec> {
  return {
    type: 'chord',
    data: {
      type: 'fetch',
      value: 'data/population-flow.json',
      transform: [
        {
          type: 'custom',
          callback: (d) => ({ links: d }),
        },
      ],
    },
  };
}
