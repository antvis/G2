import { Chart, registerInteraction } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sp500.json')
.then(res => res.json())
.then(data => {

  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 500,
    defaultInteractions:[]
  });
  chart.tooltip({
    showCrosshairs: true
  });
  chart.removeInteraction('tooltip');
  chart.scale('date', {
    sync: true,
    tickCount: 5,
    range: [0, 1]
  });
  chart.scale('price', {
    sync: true
  });
  const view1 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 1,
        y: 0.4
      }
    },
    padding: [10, 10, 40, 60]
  });
  view1.animate(false);
  view1.data(data);
  view1.interaction('tooltip');
  view1.interaction('sibling-tooltip');
  view1.area().position('date*price');

  const view2 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0.4
      },
      end: {
        x: 1,
        y: 0.8
      }
    },
    padding: [0, 10, 40, 60]
  });
  view2.data(data);
  view2.interaction('tooltip');
  view2.interaction('sibling-tooltip');
  view2.interval().position('date*price');

  const view3 = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0.8
      },
      end: {
        x: 1,
        y: 1
      }
    },
    padding: [0, 10, 40, 60]
  });
  view3.interaction('tooltip');
  view3.interaction('sibling-tooltip');
  view3.data(data);
  view3.line().position('date*price');

  chart.render();
});