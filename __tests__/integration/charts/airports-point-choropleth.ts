import { csv } from 'd3-fetch';
import { feature, mesh } from 'topojson';
import { autoType } from 'd3-dsv';
import type { G2Spec } from '@/spec';

export async function airportsPointChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const airports = await csv('data/airports.csv', autoType);
  const states = feature(us, us.objects.states);
  const statesmesh = mesh(us, us.objects.states);
  return {
    type: 'geoView',
    projection: {
      type: 'albersUsa',
    },
    children: [
      {
        type: 'choropleth',
        data: {
          value: {
            feature: states,
            border: statesmesh,
          },
        },
        style: {
          featureFill: 'lightgray',
          borderStroke: 'white',
        },
      },
      {
        type: 'point',
        data: airports,
        encode: {
          y: 'latitude',
          x: 'longitude',
          color: 'steelblue',
          shape: 'point',
        },
        style: {
          r: 2,
        },
      },
    ],
  };
}
