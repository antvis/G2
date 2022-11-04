import { tsv } from 'd3-fetch';
import { feature } from 'topojson';
import { autoType } from 'd3-dsv';
import type { G2Spec } from '@/spec';

export async function unemploymentChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const unemployment = await tsv('data/unemployment.tsv', autoType);
  const counties = feature(us, us.objects.counties);
  return {
    type: 'choropleth',
    projection: {
      type: 'albersUsa',
    },
    data: {
      value: {
        lookup: unemployment,
        feature: counties,
      },
    },
    scale: {
      color: {
        type: 'sequential',
        palette: 'ylGnBu',
        unknown: '#fff',
      },
    },
    encode: {
      value: 'rate',
      lookupKey: 'id',
      featureKey: 'id',
    },
  };
}
