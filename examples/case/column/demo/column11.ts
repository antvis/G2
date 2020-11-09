import { Chart } from '@antv/g2';

const data = [
  { time: '16 Q1', type: '移动游戏', value: 0 },
  { time: '16 Q1', type: '移动购物', value: 17.8 },
  { time: '16 Q1', type: '移动营销', value: 69.4 },
  { time: '16 Q1', type: '共享单车', value: 12.8 },
  { time: '16 Q2', type: '移动游戏', value: 0 },
  { time: '16 Q2', type: '移动购物', value: 18.1 },
  { time: '16 Q2', type: '移动营销', value: 70.7 },
  { time: '16 Q2', type: '共享单车', value: 11.2 },
  { time: '16 Q3', type: '移动游戏', value: 0 },
  { time: '16 Q3', type: '移动购物', value: 20.8 },
  { time: '16 Q3', type: '移动营销', value: 67.4 },
  { time: '16 Q3', type: '共享单车', value: 11.8 },
  { time: '16 Q4', type: '移动游戏', value: 0.1 },
  { time: '16 Q4', type: '移动购物', value: 20.3 },
  { time: '16 Q4', type: '移动营销', value: 69.2 },
  { time: '16 Q4', type: '共享单车', value: 10.4 },
  { time: '17 Q1', type: '移动游戏', value: 0.4 },
  { time: '17 Q1', type: '移动购物', value: 17.3 },
  { time: '17 Q1', type: '移动营销', value: 68.3 },
  { time: '17 Q1', type: '共享单车', value: 14 },
  { time: '17 Q2', type: '移动游戏', value: 1.2 },
  { time: '17 Q2', type: '移动购物', value: 18.3 },
  { time: '17 Q2', type: '移动营销', value: 68.6 },
  { time: '17 Q2', type: '共享单车', value: 11.9 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.axis('value', false);
chart.legend({
  position: 'right',
});
chart.tooltip({
  shared: true,
  showMarkers: false,
});
chart.interaction('active-region');
chart
  .interval()
  .adjust('stack')
  .position('time*value')
  .color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3'])
  .label('value', (val) => {
    if (val < 10) {
      return null;
    }
    return {
      position: 'middle',
      offset: 0,
      content: (originData) => {
        return originData.value + '%';
      },
      style: {
        stroke: '#fff'
      }
    };
  });
chart.render();
