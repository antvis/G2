import { G2Spec } from '../../../src';

export function HeatmapHeatmapBasic(): G2Spec {
  return {
    type: 'view',
    padding: 0,
    children: [
      {
        type: 'image',
        style: {
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
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

HeatmapHeatmapBasic.skip = true;
