import { tsv } from 'd3-fetch';
import { feature } from 'topojson';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function unemploymentChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const unemployment = await tsv('data/unemployment.tsv', autoType);
  const counties = feature(us, us.objects.counties).features;
  return {
    type: 'geoPath',
    projection: {
      type: 'albersUsa',
    },
    data: {
      value: counties,
      transform: [
        {
          type: 'lookup',
          key: 'id',
          from: unemployment,
          fromKey: 'id',
          rate: 'rate',
        },
      ],
    },
    scale: {
      color: {
        type: 'sequential',
        palette: 'ylGnBu',
        unknown: '#fff',
      },
    },
    encode: {
      color: 'rate',
    },
  };
}
