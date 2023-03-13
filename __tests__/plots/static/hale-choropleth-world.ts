import { csv } from 'd3-fetch';
import { feature, mesh } from 'topojson';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function haleChoroplethWorld(): Promise<G2Spec> {
  const world = await fetch('data/countries-50m.json').then((res) =>
    res.json(),
  );
  const hale = (await csv('data/hale.csv', autoType)).map((d) => ({
    ...d,
    hale: Number.isNaN(d.hale) ? d.hale : d.hale,
  }));
  const countries = feature(world, world.objects.countries).features;
  const coutriesmesh = mesh(world, world.objects.countries);

  return {
    type: 'geoView',
    children: [
      {
        type: 'geoPath',
        data: {
          value: countries,
          transform: [
            {
              type: 'join',
              join: hale,
              on: [(d) => d.properties.name, 'name'],
              select: ['hale'],
            },
          ],
        },
        scale: {
          color: {
            unknown: '#ccc',
          },
        },
        encode: {
          color: 'hale',
        },
        legend: { color: { layout: { justifyContent: 'center' } } },
      },
      {
        type: 'geoPath',
        data: [coutriesmesh],
        style: { fill: 'none', stroke: '#fff' },
      },
      {
        type: 'geoPath',
        data: { type: 'sphere' },
        style: { fill: 'none', stroke: '#000' },
      },
    ],
  };
}
