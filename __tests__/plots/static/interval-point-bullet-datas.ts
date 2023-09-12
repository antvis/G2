import { G2Spec } from '../../../src';

export function intervalPointBulletDatas(): G2Spec {
  const colors = {
    ranges: ['#bfeec8', '#FFe0b0', '#FFbcb8'],
    measures: ['#61DDAA', '#5B8FF9'],
    target: '#39a3f4',
  };

  return {
    type: 'view',
    data: [
      { title: '满意度', ranges: 100, measures: 60, target: 90 },
      { title: '满意度', ranges: 80, measures: 10 },
      { title: '满意度', ranges: 30 },
    ],
    coordinate: { transform: [{ type: 'transpose' }] },
    legend: false,
    children: [
      {
        type: 'interval',
        encode: { y: 'ranges', x: 'title', color: 'ranges' },
        style: { maxWidth: 30, fill: (d, i) => colors['ranges'][i] },
        axis: { y: { grid: true, gridLineWidth: 2 }, x: { title: false } },
      },
      {
        type: 'interval',
        encode: { y: 'measures', color: '#5B8FF9', x: 'title' },
        style: { maxWidth: 20, fill: (d, i) => colors['measures'][i] },
        labels: [
          { text: 'measures', position: 'right', textAlign: 'left', dx: 5 },
        ],
      },
      {
        type: 'point',
        encode: {
          size: 8,
          y: 'target',
          x: 'title',
          shape: 'line',
          color: '#39a3f4',
        },
        style: { lineWidth: 1 },
        tooltip: { title: false, items: [{ channel: 'y' }] },
      },
    ],
  };
}
