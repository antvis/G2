import { Chart, registerShape } from '@antv/g2';
import { isArray } from 'lodash';

function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }

  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}

function getFillAttrs(cfg) {
  const defaultAttrs = {
    lineWidth: 0,
    fill: '#1890FF',
    fillOpacity: 0.85,
  };

  return {
    ...defaultAttrs,
    ...cfg.style,
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  };
}

// 自定义 Shape
registerShape('interval', 'waterfall', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let rectPath = getRectPath(cfg.points);
    rectPath = this.parsePath(rectPath);

    const group = container.addGroup();
    group.addShape('path', {
      attrs: {
        ...attrs,
        path: rectPath,
      },
    });

    if (cfg.nextPoints) {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[2].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
      ];

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
      }
      linkPath = this.parsePath(linkPath);
      group.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: '#8c8c8c',
          lineDash: [4, 2],
        },
      });
    }

    return group;
  },
});

const data = [
  { type: '日用品', money: 300 },
  { type: '伙食费', money: 900 },
  { type: '交通费', money: 200 },
  { type: '水电费', money: 300 },
  { type: '房租', money: 1200 },
  { type: '商场消费', money: 1000 },
  { type: '应酬交际', money: 2000 },
  { type: '总费用', money: 5900 },
];

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (i > 0 && i < data.length - 1) {
    if (isArray(data[i - 1].money)) {
      item.money = [data[i - 1].money[1], item.money + data[i - 1].money[1]];
    } else {
      item.money = [data[i - 1].money, item.money + data[i - 1].money];
    }
  }
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);
chart.scale('money', { nice: true });

// 自定义 legend
chart.legend({
  items: [
    { name: '各项花销', value: '各项花销', marker: { symbol: 'square', style: { fill: '#1890FF', r: 5 } } },
    { name: '总费用', value: '总费用', marker: { symbol: 'square', style: { fill: '#8c8c8c', r: 5 } } },
  ],
});

chart.tooltip({
  showMarkers: false,
});

chart
  .interval()
  .position('type*money')
  .color('type', (type) => {
    if (type === '总费用') {
      return '#8c8c8c';
    }
    return '#1890FF';
  })
  .tooltip('type*money', (type, money) => {
    if (isArray(money)) {
      return {
        name: '生活费',
        value: money[1] - money[0],
      };
    }

    return {
      name: '生活费',
      value: money,
    };
  })
  .shape('waterfall');

chart.removeInteraction('legend-filter'); // 移除图例过滤交互

chart.render();
