import { G2Spec } from '../../../src';
import Data from '../../data/bee.json';

export function alphabetBeeswarm(): G2Spec {
  const data: any[] = [];
  Data.map((item: Record<string, number>, i) => {
    Object.keys(item).map((key) => {
      data.push({
        x: key,
        y: item[key],
      });
    });
  });

  return {
    type: 'beeswarm',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 'x',
    },
    legend: {
      size: false,
      shape: false,
      color: {
        position: 'top',
        layout: {
          justifyContent: 'center',
        },
      },
    },
    axis: {
      x: { title: false },
      y: { title: false },
    },
  };
}
