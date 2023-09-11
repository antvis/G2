import { G2Spec } from '../../../src';

export function intervalPointBullet(): G2Spec {
  return {
    type: 'view',
    data: [{ title: '满意度', ranges: 100, measures: 80, target: 85 }],
    coordinate: { transform: [{ type: 'transpose' }] },
    children: [
      {
        type: 'interval',
        encode: { x: 'title', y: 'ranges', color: '#f0efff' },
        style: { maxWidth: 30 },
        axis: { y: { grid: true, gridLineWidth: 2 }, x: { title: false } },
      },
      {
        type: 'interval',
        encode: { x: 'title', y: 'measures', color: '#5B8FF9' },
        style: { maxWidth: 20 },
        labels: [
          { text: 'measures', position: 'right', textAlign: 'left', dx: 5 },
        ],
      },
      {
        type: 'point',
        encode: {
          size: 8,
          x: 'title',
          y: 'target',
          shape: 'line',
          color: '#3D76DD',
        },
        tooltip: { title: false, items: [{ channel: 'y' }] },
      },
    ],
  };
}
