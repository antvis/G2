import { Chart } from '@antv/g2';

const data = [
  { location: '三亚', value: 44.9 },
  { location: '千岛湖', value: 19.7 },
  { location: '柬埔寨', value: 17.3 },
  { location: '呼伦贝尔', value: 14.4 },
  { location: '苏梅岛', value: 2.5 },
  { location: '塞班岛', value: 1.2 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.legend({
  position: 'right',
  offsetX: -100,
});
chart.coordinate('theta', {
  radius: 0.75,
});
chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('location', ['#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5'])
  .style({
    stroke: 'white',
    lineWidth: 1,
  })
  .label('value', (val) => {
    if (val < 3) {
      return null;
    }
    return {
      offset: -30,
      style: {
        fill: 'white',
        fontSize: 14,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
      content: (obj) => {
        return obj.value + '%';
      },
    };
  });
chart.render();
