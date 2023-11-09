import DataSet from '@antv/data-set';
import { G2Spec } from '../../../src';

export function DiamondHeatmapDensity(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/diamond.csv',
    },
    scale: {
      x: { nice: true, domainMin: -0.5 },
      y: { nice: true, domainMin: -2000 },
      color: { nice: true },
    },
    children: [
      {
        type: 'heatmap',
        data: {
          transform: [
            {
              type: 'custom',
              callback: (data) => {
                const dv = new DataSet.View().source(data);
                // @ts-ignore
                dv.transform({
                  type: 'kernel-smooth.density',
                  fields: ['carat', 'price'],
                  as: ['carat', 'price', 'density'],
                });
                return dv.rows;
              },
            },
          ],
        },
        encode: {
          x: 'carat',
          y: 'price',
          color: 'density',
        },
        style: {
          opacity: 0.3,
          gradient: [
            [0, 'white'],
            [0.2, 'blue'],
            [0.4, 'cyan'],
            [0.6, 'lime'],
            [0.8, 'yellow'],
            [0.9, 'red'],
          ],
        },
      },
      {
        type: 'point',
        encode: {
          x: 'carat',
          y: 'price',
        },
      },
    ],
  };
}

DiamondHeatmapDensity.skip = true;
