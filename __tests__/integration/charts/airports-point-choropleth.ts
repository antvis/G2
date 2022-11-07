import { csv } from 'd3-fetch';
import { feature, mesh } from 'topojson';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function airportsPointChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const airports = await csv('data/airports.csv', autoType);
  const flights = await csv('data/flights-airport.csv', autoType);
  const states = feature(us, us.objects.states).features;
  return {
    type: 'geoView',
    projection: {
      type: 'albersUsa',
    },
    children: [
      {
        type: 'geoPath',
        data: states,
        style: {
          fill: 'lightgray',
          stroke: 'white',
        },
      },
      {
        type: 'point',
        data: airports,
        encode: {
          y: 'latitude',
          x: 'longitude',
          shape: 'point',
        },
        style: {
          r: 1,
          fill: 'gray',
        },
      },
      {
        type: 'link',
        data: {
          value: flights,
          transform: [
            {
              type: 'filterBy',
              fields: [['origin', (d) => d === 'SEA']],
            },
            {
              type: 'lookup',
              key: 'origin',
              fromKey: 'iata',
              from: airports,
              latitude: 'origin_latitude',
              longitude: 'origin_longitude',
            },
            {
              type: 'lookup',
              key: 'destination',
              fromKey: 'iata',
              from: airports,
              latitude: 'dest_latitude',
              longitude: 'dest_longitude',
            },
          ],
        },
        encode: {
          x: ['origin_longitude', 'dest_longitude'],
          y: ['origin_latitude', 'dest_latitude'],
        },
        style: {
          stroke: 'black',
        },
      },
    ],
  };
}
