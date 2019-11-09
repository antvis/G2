
const { Shape, Util, Chart } = G2;
Shape.registerShape('line', 'lineWidthArrow', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = Util.mix({}, {
      stroke: cfg.color,
      lineWidth: cfg.size
    }, cfg.style);
    const pathGroup = container.addGroup();
    for (let i = 0; i < points.length; i++) {
      const path = [];
      path.push(
        [ 'M', points[i].x, points[i].y ]
      );
      if (i !== points.length - 1) {
        path.push(
          [ 'L', points[i + 1].x, points[i + 1].y ]
        );
      }

      pathGroup.addShape('path', {
        attrs: Util.mix({
          path,
          endArrow: true,
          arrowLength: 10,
          arrowAngle: 45
        }, attrs)
      });
    }

    return pathGroup;
  }
});
const data = [
  { consumption: 0.65, price: 1, year: 1965 },
  { consumption: 0.66, price: 1.05, year: 1966 },
  { consumption: 0.64, price: 1.1, year: 1967 },
  { consumption: 0.63, price: 1.12, year: 1968 },
  { consumption: 0.55, price: 1.15, year: 1969 },
  { consumption: 0.57, price: 1.19, year: 1970 },
  { consumption: 0.58, price: 1.14, year: 1971 },
  { consumption: 0.59, price: 1, year: 1972 },
  { consumption: 0.57, price: 0.96, year: 1973 },
  { consumption: 0.55, price: 0.92, year: 1974 },
  { consumption: 0.54, price: 0.88, year: 1975 },
  { consumption: 0.55, price: 0.87, year: 1976 },
  { consumption: 0.42, price: 0.89, year: 1977 },
  { consumption: 0.28, price: 1, year: 1978 },
  { consumption: 0.15, price: 1.1, year: 1979 }
];
const chart = new Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(data);
chart.tooltip({
  showTitle: false,
  itemTpl: '<li data-index={index}>'
    + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
    + '<span>{year}</span></br>'
    + '<span style="padding-left: 16px">consumption: {consumption}</span></br>'
    + '<span style="padding-left: 16px">price: {price}</span></br>'
});
chart.path()
  .position('price*consumption')
  .shape('lineWidthArrow')
  .color('#1890ff')
  .label('year', {
    offset: 16,
    textStyle: {
      fill: '#8c8c8c'
    }
  }, val => {
    return val + '年';
  })
  .size(2)
  .tooltip(false);
chart.point()
  .position('price*consumption')
  .shape('circle')
  .size(10)
  .active(false)
  .tooltip('year*consumption*price', (year, consumption, price) => {
    return {
      year,
      consumption,
      price
    };
  })
  .style({
    fill: '#fff',
    fillOpacity: 0
  });
chart.render();
