// 自定义 shape, 支持图片形式的气泡
G2.Shape.registerShape('interval', 'borderRadius', {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push([ 'M', points[0].x, points[0].y ]);
    path.push([ 'L', points[1].x, points[1].y ]);
    path.push([ 'L', points[2].x, points[2].y ]);
    path.push([ 'L', points[3].x, points[3].y ]);
    path.push('Z');
    path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
    return container.addShape('rect', {
      attrs: {
        x: path[1][1], // 矩形起始点为左上角
        y: path[1][2],
        width: path[2][1] - path[1][1],
        height: path[0][2] - path[1][2],
        fill: cfg.color,
        radius: (path[2][1] - path[1][1]) / 2
      }
    });
  }
});
const activeData = [
  { date: '2017年3月2日', actual: 175, expected: 900 },
  { date: '2017年3月3日', actual: 137, expected: 900 },
  { date: '2017年3月4日', actual: 240, expected: 900 },
  { date: '2017年3月5日', actual: 726, expected: 900 },
  { date: '2017年3月6日', actual: 968, expected: 900 },
  { date: '2017年3月7日', actual: 702, expected: 900 },
  { date: '2017年3月8日', actual: 655, expected: 900 },
  { date: '2017年3月9日', actual: 463, expected: 900 },
  { date: '2017年3月10日', actual: 464, expected: 900 },
  { date: '2017年3月12日', actual: 0, expected: 900 },
  { date: '2017年3月13日', actual: 638, expected: 900 },
  { date: '2017年3月14日', actual: 0, expected: 900 },
  { date: '2017年3月15日', actual: 0, expected: 900 },
  { date: '2017年3月16日', actual: 509, expected: 900 },
  { date: '2017年3月17日', actual: 269, expected: 900 },
  { date: '2017年3月18日', actual: 321, expected: 900 },
  { date: '2017年3月19日', actual: 0, expected: 900 },
  { date: '2017年3月20日', actual: 399, expected: 900 },
  { date: '2017年3月21日', actual: 662, expected: 900 },
  { date: '2017年3月22日', actual: 689, expected: 900 },
  { date: '2017年3月23日', actual: 347, expected: 900 },
  { date: '2017年3月24日', actual: 0, expected: 900 },
  { date: '2017年3月26日', actual: 428, expected: 900 },
  { date: '2017年3月27日', actual: 749, expected: 900 },
  { date: '2017年3月28日', actual: 0, expected: 900 },
  { date: '2017年3月29日', actual: 0, expected: 900 },
  { date: '2017年3月30日', actual: 69.1, expected: 900 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 150, 80 ]
});
chart.source(activeData, {
  expected: {
    ticks: [ 0, 900, 1200 ]
  }
});
chart.axis('date', false);
chart.axis('actual', false);
chart.axis('expected', {
  line: null,
  tickLine: null,
  position: 'right',
  label: {
    formatter: val => {
      if (val === '1200') {
        return '';
      }
      return val;
    }
  }
});
chart.legend(false);
chart.interval()
  .position('date*expected')
  .color('#752136')
  .shape('borderRadius')
  .tooltip('expected')
  .opacity(0.6);
chart.interval()
  .position('date*actual')
  .color('#db0d2d')
  .tooltip('actual')
  .shape('date*actual', (date, val) => {
    if (val === 0) {
      return;
    }
    return 'borderRadius';
  });
chart.guide().text({
  position: [ 'min', 'max' ],
  content: '活动',
  style: {
    fill: '#ff2c55',
    fontSize: 20,
    fontWeight: 'bold',
    textBaseline: 'top'
  }
});
chart.guide().text({
  position: [ 'max', 'max' ],
  content: '67 / 900 千卡',
  style: {
    fill: '#cbcbcb',
    fontSize: 20,
    textAlign: 'end',
    textBaseline: 'top'
  }
});
chart.render();
