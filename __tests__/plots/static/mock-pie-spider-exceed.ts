import { G2Spec } from '../../../src';

export function mockPieSpiderExceed(): G2Spec {
  return {
    type: 'interval',
    width: 340,
    height: 250,
    data: [
      { type: '微博A', value: 93.33 },
      { type: '其他A', value: 6.67 },
      { type: '论坛A', value: 4.77 },
      { type: '网站A', value: 1.44 },
      { type: '微信A', value: 1.12 },
      { type: '客户A', value: 1.05 },
      { type: '新闻A', value: 0.81 },
      { type: '视频A', value: 0.39 },
      { type: '博客A', value: 0.37 },
      { type: '报刊A', value: 0.17 },
    ],
    encode: {
      y: 'value',
      color: 'type',
    },
    labels: [
      {
        position: 'spider',
        transform: [{ type: 'exceedAdjust' }],
        text: (obj) => `${obj.type} (${obj.value})`,
      },
    ],
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
  };
}
