import { G2Spec, register, type SymbolFactor } from '../../../src';

export function mockIntervalLegendMarker(): G2Spec {
  const triangle = Object.assign<SymbolFactor, Partial<SymbolFactor>>(
    (x, y, r) => {
      const diffY = r * Math.sin((1 / 3) * Math.PI);
      return [
        ['M', x - r, y + diffY],
        ['L', x, y - diffY],
        ['L', x + r, y + diffY],
        ['Z'],
      ];
    },
    { style: ['fill'] },
  );

  register('symbol.customTriangle', triangle);

  return {
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name',
    },
    transform: [{ type: 'stackY' }],
    legend: {
      color: {
        itemMarker: 'customTriangle',
      },
    },
  };
}
