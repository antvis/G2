import { tsv } from 'd3-fetch';
import { feature } from 'topojson';
import { autoType } from 'd3-dsv';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export async function unemploymentChoropleth(): Promise<G2Spec> {
  const us = await fetch('data/us-10m.json').then((res) => res.json());
  const unemployment = await tsv('data/unemployment.tsv', autoType);
  const counties = feature(us, us.objects.counties).features;
  return {
    type: 'geoPath',
    coordinate: { type: 'albersUsa' },
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
    state: {
      active: { fill: 'red' },
    },
    encode: {
      color: 'rate',
    },
    legend: { color: { layout: { justifyContent: 'center' } } },
    interaction: { elementHighlight: true },
  };
}

unemploymentChoropleth.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const e = elements.find((d) => d.__data__.title === 6071);
  return [step(e, 'pointerover')];
};
