const { Chart, Shape, Util } = G2;
function getFillAttrs(cfg) {
  const attrs = Util.mix(cfg.style, {
    fill: cfg.color,
    fillOpacity: cfg.opacity
  });
  return attrs;
}
function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([ action, point.x, point.y ]);
    }
  }
  const first = points[0];
  path.push([ 'L', first.x, first.y ]);
  path.push([ 'z' ]);
  return path;
}
// 顶边带圆角
Shape.registerShape('interval', 'top', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push([ 'M', path[0][1], path[0][2] ]);
    temp.push([ 'L', path[1][1], path[1][2] + radius ]);
    temp.push([ 'A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2] ]);
    temp.push([ 'L', path[2][1] - radius, path[2][2] ]);
    temp.push([ 'A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius ]);
    temp.push([ 'L', path[3][1], path[3][2] ]);
    temp.push([ 'Z' ]);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp
      })
    });
  }
});
// 底边带圆角
Shape.registerShape('interval', 'bottom', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push([ 'M', path[0][1] + radius, path[0][2] ]);
    temp.push([ 'A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius ]);
    temp.push([ 'L', path[1][1], path[1][2] ]);
    temp.push([ 'L', path[2][1], path[2][2] ]);
    temp.push([ 'L', path[3][1], path[3][2] - radius ]);
    temp.push([ 'A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2] ]);
    temp.push([ 'Z' ]);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp
      })
    });
  }
});
const data = [
  { year: '2014', type: 'Sales', sales: 1000 },
  { year: '2015', type: 'Sales', sales: 1170 },
  { year: '2016', type: 'Sales', sales: 660 },
  { year: '2017', type: 'Sales', sales: 1030 },
  { year: '2014', type: 'Expenses', sales: 400 },
  { year: '2015', type: 'Expenses', sales: 460 },
  { year: '2016', type: 'Expenses', sales: 1120 },
  { year: '2017', type: 'Expenses', sales: 540 },
  { year: '2014', type: 'Profit', sales: 300 },
  { year: '2015', type: 'Profit', sales: 300 },
  { year: '2016', type: 'Profit', sales: 300 },
  { year: '2017', type: 'Profit', sales: 350 }
];
const chart = new Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 80, 80, 80 ]
});
chart.source(data, {
  sales: {
    max: 2400,
    tickInterval: 600
  }
});
const axisCfg = {
  label: {
    textStyle: {
      fontFamily: 'Monospace',
      fontWeight: 700,
      fontSize: 14,
      fill: '#545454'
    }
  },
  grid: {
    lineStyle: {
      lineDash: [ 0, 0 ],
      stroke: '#545454'
    }
  }
};
chart.axis('year', axisCfg);
chart.axis('sales', Util.mix({}, axisCfg, {
  line: null
}));

chart.intervalStack()
  .position('year*sales')
  .color('type')
  .size(35)
  .shape('type', val => {
    if (val === 'Profit') { // 顶部圆角
      return 'bottom';
    } else if (val === 'Sales') { // 底部圆角
      return 'top';
    }
    return; // 其他默认
  })
  .style({
    stroke: '#545454',
    lineWidth: 2
  });
chart.render();
