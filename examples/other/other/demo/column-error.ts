import { Chart } from '@antv/g2';

const data = [
  { name: '类别一', value: 150, error: 6 },
  { name: '类别二', value: 120, error: 10 },
  { name: '类别三', value: 170, error: 5 },
  { name: '类别四', value: 170, error: 5 }
];

data.forEach((obj) => {
  obj.range = [obj.value - obj.error, obj.value + obj.error];
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500
});
chart.legend(false);
chart.data(data);
chart.scale({
  value: {
    min: 0,
    max: 200
  },
  range: {
    min: 0,
    max: 200
  }
});

chart.tooltip({
  showMarkers: false
});

chart.interval()
  .position('name*value')
  .color('name')
  .style({
    fillOpacity: 0.7
  });

chart.interval()
  .position('name*range')
  .color('name')
  .size(40)
  .shape('tick');

chart.interaction('active-region');
chart.render();
