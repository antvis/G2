const data = [
  { title: 'Revenue', subtitle: 'US$, in thousands', ranges: [ 150, 225, 300 ], actual: 270, target: 250 },
  { title: 'Profit', subtitle: '%', ranges: [ 20, 25, 30 ], actual: 23, target: 26 },
  { title: 'Order Size', subtitle: 'US$, average', ranges: [ 350, 500, 600 ], actual: 100, target: 550 },
  { title: 'New Customers', subtitle: 'count', ranges: [ 1400, 2000, 2500 ], actual: 1650, target: 2100 },
  { title: 'Satisfaction', subtitle: 'out of 5', ranges: [ 3.5, 4.25, 5 ], actual: 3.2, target: 4.4 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 100, 150 ]
});
chart.legend(false); // 不展示图例
let y = 0;
const yGap = 0.1;
for (let i = 0, l = data.length; i < l; i++) {
  const ranges = data[i].ranges;
  const view = chart.view({
    start: {
      x: 0,
      y
    },
    end: {
      x: 1,
      y: y + yGap
    }
  });
  view.source([ data[i] ], {
    actual: {
      min: 0,
      max: ranges[2],
      nice: false
    },
    target: {
      min: 0,
      max: ranges[2],
      nice: false
    }
  });
  view.coord().transpose();
  view.axis('target', false);
  view.axis('actual', {
    position: 'right'
  });
  view.point()
    .position('title*target')
    .color('#square')
    .shape('line')
    .size(12)
    .style({
      lineWidth: 2
    });
  view.interval()
    .position('title*actual')
    .color('#223273')
    .size(15);
  // 差
  view.guide().region({
    start: [ -1, 0 ],
    end: [ 1, ranges[0] ],
    style: {
      fill: '#FFA39E',
      fillOpacity: 0.85
    }
  });
  // 良
  view.guide().region({
    start: [ -1, ranges[0] ],
    end: [ 1, ranges[1] ],
    style: {
      fill: '#FFD591',
      fillOpacity: 0.85
    }
  });
  // 优
  view.guide().region({
    start: [ -1, ranges[1] ],
    end: [ 1, ranges[2] ],
    style: {
      fill: '#A7E8B4',
      fillOpacity: 0.85
    }
  });
  y += yGap + 0.125;
}
chart.legend({
  custom: 'true',
  clickable: false,
  items: [
    {
      value: '差',
      marker: { symbol: 'square', fill: '#FFA39E', radius: 5 }
    },
    {
      value: '良',
      marker: { symbol: 'square', fill: '#FFD591', radius: 5 }
    },
    {
      value: '优',
      marker: { symbol: 'square', fill: '#A7E8B4', radius: 5 }
    },
    {
      value: '实际值',
      marker: { symbol: 'square', fill: '#223273', radius: 5 }
    },
    {
      value: '目标值',
      marker: {
        symbol: 'line',
        stroke: '#262626',
        radius: 5
      }
    }
  ]
});
chart.render();
