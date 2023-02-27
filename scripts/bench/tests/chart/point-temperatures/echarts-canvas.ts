import * as echarts from 'echarts';
import type { Chart } from '../types';

export const echartsCanvas: Chart = (data, { start, end }) => {
  const data1 = data.map((d) => [d.date, d.value]);
  start();
  const node = document.createElement('div');
  const myChart = echarts.init(node, undefined, { width: 640, height: 480 });
  myChart.setOption({
    xAxis: {},
    yAxis: {},
    series: [
      {
        data: data1,
        type: 'scatter',
        itemStyle: {
          color: 'black',
        },
      },
    ],
    animation: false,
  });
  end(node);
};
