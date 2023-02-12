import { csv } from 'd3-fetch';
import { feature } from 'topojson';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function airportsPointChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const airports = await csv('data/airports.csv', autoType);
  const flights = await csv('data/flights-airport.csv', autoType);
  const states = feature(us, us.objects.states).features;
  return {
    type: 'geoView',
    coordinate: {
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
          size: 1,
        },
        style: {
          fill: 'gray',
        },
      },
      {
        type: 'link',
        data: {
          value: flights,
          transform: [
            {
              type: 'filter',
              callback: (d) => d.origin === 'SEA',
            },
            {
              type: 'join',
              join: airports,
              on: ['origin', 'iata'],
              select: ['latitude', 'longitude'],
              as: ['origin_latitude', 'origin_longitude'],
            },
            {
              type: 'join',
              join: airports,
              on: ['destination', 'iata'],
              select: ['latitude', 'longitude'],
              as: ['dest_latitude', 'dest_longitude'],
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
