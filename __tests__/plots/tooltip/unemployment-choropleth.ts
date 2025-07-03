import { tsv } from '@antv/vendor/d3-fetch';
import { feature } from 'topojson';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export async function unemploymentChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const unemployment = await tsv('data/unemployment.tsv', autoType);
  const counties = feature(us, us.objects.counties).features;
  return {
    type: 'geoPath',
    coordinate: {
      type: 'albersUsa',
    },
    data: {
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    },
    scale: {
      color: {
        unknown: '#fff',
      },
    },
    encode: {
      color: 'rate',
    },
    tooltip: {
      title: (record) => {
        return record.id;
      },
      items: [
        (record) => {
          return {
            name: 'rate',
            value: record.rate,
          };
        },
      ],
    },
  };
}

unemploymentChoropleth.steps = tooltipSteps(0);
