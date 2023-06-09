import { G2Spec } from '../../../src';
import { SpectralPie } from './population2015-interval-hom-nested';

function CenterText(options) {
  const { style } = options;
  return {
    type: 'text',
    coordinate: { innerRadius: 0.8 },
    style: {
      x: '50%',
      y: '50%',
      fontSize: 40,
      textAlign: 'center',
      textBaseline: 'middle',
      fontWeight: 'bold',
      ...style,
    },
  };
}

export function population2015IntervalHOMMultiple(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: SpectralPie,
        data: {
          type: 'fetch',
          value: 'data/population2015.csv',
        },
        legend: false,
        coordinate: { innerRadius: 0.6 },
        // @ts-ignore
        encode: { value: 'value', color: 'name' },
        style: { stroke: 'white' },
      },
      {
        // @ts-ignore
        type: CenterText,
        style: {
          text: 'hello world',
          fontSize: 100,
        },
      },
    ],
  };
}
