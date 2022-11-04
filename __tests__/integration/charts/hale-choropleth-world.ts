import { csv } from 'd3-fetch';
import { feature, mesh } from 'topojson';
import { autoType } from 'd3-dsv';
import type { G2Spec } from '@/spec';

export async function haleChoroplethWorld(): Promise<G2Spec> {
  const world = await fetch('data/countries-50m.json').then((res) =>
    res.json(),
  );
  const hale = await csv('data/hale.csv', autoType);
  const countries = feature(world, world.objects.countries);
  const coutriesmesh = mesh(world, world.objects.countries);
  return {
    type: 'choropleth',
    width: 1000,
    padding: 10,
    projection: {
      type: 'equalEarth',
    },
    data: {
      value: {
        lookup: hale,
        feature: countries,
        border: coutriesmesh,
        outline: { type: 'Sphere' },
      },
    },
    scale: {
      color: {
        type: 'sequential',
        palette: 'ylGnBu',
      },
    },
    encode: {
      value: 'hale',
      lookupKey: 'name',
      featureKey: (d) => d.properties.name,
    },
  };
}
