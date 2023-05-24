import { G2Spec } from '../../../src';

export function HeatmapHeatmapBasic(): G2Spec {
  return {
    type: 'view',
    padding: 0,
    children: [
      {
        type: 'image',
        data: [0],
        encode: {
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
        style: {
          x: '50%',
          y: '50%',
          width: '100%',
          height: '100%',
        },
      },
      {
        type: 'heatmap',
        data: {
          type: 'fetch',
          value: 'data/heatmap.json',
        },
        encode: {
          x: 'g',
          y: 'l',
          color: 'tmp',
        },
        axis: false,
      },
    ],
  };
}

HeatmapHeatmapBasic.maxError = 100;
