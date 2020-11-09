import { Chart, registerShape } from '@antv/g2';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: 'Other', value: 5 },
];

let max = 0;
data.forEach(function(obj) {
  if (obj.value > max) {
    max = obj.value;
  }
});

// 自定义 other 的图形，增加两条线
registerShape('interval', 'slice-shape', {
  draw(cfg, container) {
    const points = cfg.points;
    const origin = cfg.data;
    const percent = origin.value / max;
    const xWidth = points[2].x - points[1].x;
    const width = xWidth * percent;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[0].x + width, points[2].y]);
    path.push(['L', points[0].x + width, points[3].y]);
    path.push('Z');
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path,
      },
    });
  },
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.8,
});

chart.data(data);

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('type')
  .shape('slice-shape')
  .label('type', {
    offset: '-70%',
    layout: {
      type: 'limit-in-shape',
    },
    background: {
      style: {
        fill: '#000',
        fillOpacity: '0.25',
        radius: 2,
      },
      padding: 2,
    },
  });

chart.interaction('element-active');

chart.render();
