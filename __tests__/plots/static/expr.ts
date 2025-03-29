import { register } from '@antv/expr';

export function expr() {
  /**
   * 计算每个圆的半径
   * @param datum 当前数据
   * @param i 当前数据索引
   * @param data 所有数据
   * @param global 所有变量的集合
   * @returns 圆的半径
   */
  const getRadius = (datum, i, data, global) => {
    const total = data.reduce((a, b) => a + b.value, 0);
    return 1 - (datum.value / total) * 5;
  };

  const getTooltip = (datum, i, data, global) => {
    return {
      name: '*' + datum.name + ' population: ',
      value: datum.value,
    };
  };

  register('getRadius', getRadius);
  register('getTooltip', getTooltip);

  return {
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    scale: {
      color: { palette: 'spectral', offset: '{a * 0.8 + 0.1}' },
    },
    encode: { y: 'value', color: 'name' },
    style: { stroke: 'white' },
    tooltip: '{@getTooltip(a, b, c, global)}',
    labels: [
      {
        text: '{"*" + a.name}',
        radius: '{@getRadius(a, b, c, global)}',
        style: {
          fontSize: '{a.value>15000000 ? a.value>20000000 ? 20 : 15 : 9}',
          fontWeight: 'bold',
        },
      },
      {
        text: '{b < c.length - 3 ? a.value : ""}',
        radius: '{@getRadius(a, b, c, global)}',
        style: { fontSize: 9, dy: 12 },
      },
    ],
    animate: { enter: { type: 'waveIn', duration: 1000 } },
  };
}
