import { feature } from 'topojson-client';
import { G2Spec } from '../../../src';

export async function countries50mWorldMapPoint(): Promise<G2Spec> {
  return {
    type: 'geoView',
    coordinate: { type: 'albersUsa' },
    data: {
      type: 'fetch',
      value: 'data/us-10m.json',
      transform: [
        {
          type: 'custom',
          callback(data) {
            const features = feature(data, data.objects.states).features;
            console.log({ features });
            return features.map((feature, index) => {
              return {
                ...feature,
                x: feature.geometry.coordinates[0][0][0][0],
                y: feature.geometry.coordinates[0][0][0][1],
                size: index,
              };
            });
          },
        },
      ],
    },
    children: [
      { type: 'geoPath', style: { fill: 'lightgray' } },
      { type: 'point', encode: { x: 'x', y: 'y', size: 'size' } },
    ],
  };
}
