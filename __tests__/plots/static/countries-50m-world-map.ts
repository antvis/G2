import { feature } from 'topojson';
import { G2Spec } from '../../../src';

export async function countries50mWorldMap(): Promise<G2Spec> {
  const world = await fetch('data/countries-50m.json').then((res) =>
    res.json(),
  );
  const land = feature(world, world.objects.land).features;
  return {
    type: 'geoView',
    coordinate: { type: 'orthographic' },
    children: [
      {
        type: 'geoPath',
        data: { type: 'graticule10' },
        style: {
          fill: 'none',
          stroke: '#ccc',
        },
      },
      { type: 'geoPath', data: land, style: { fill: 'black' } },
      {
        type: 'geoPath',
        data: { type: 'sphere' },
        style: { fill: 'none', stroke: 'black' },
      },
    ],
  };
}
