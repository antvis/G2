import * as echarts from 'echarts';
import type { Chart } from '../types';

export const echartsCanvas: Chart = (data, { start, end }) => {
  start();
  const node = document.createElement('div');
  const myChart = echarts.init(node, undefined, { width: 640, height: 480 });
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: data.map((d) => d.letter),
    },
    yAxis: {},
    series: [
      {
        data: data.map((d) => d.frequency),
        type: 'bar',
        itemStyle: {
          color: 'steelblue',
        },
      },
    ],
    animation: false,
  });
  end(node);
};
