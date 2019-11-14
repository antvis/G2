const data = [
  { direction: 'N', level: '< 0.5 m/s', value: 1.81 },
  { direction: 'N', level: '0.5-2 m/s', value: 1.78 },
  { direction: 'N', level: '2-4 m/s', value: 0.16 },
  { direction: 'N', level: '4-6 m/s', value: 0.00 },
  { direction: 'N', level: '6-8 m/s', value: 0.00 },
  { direction: 'N', level: '8-10 m/s', value: 0.00 },
  { direction: 'N', level: '> 10 m/s', value: 0.00 },
  { direction: 'NNE', level: '< 0.5 m/s', value: 0.62 },
  { direction: 'NNE', level: '0.5-2 m/s', value: 1.09 },
  { direction: 'NNE', level: '2-4 m/s', value: 0.00 },
  { direction: 'NNE', level: '4-6 m/s', value: 0.00 },
  { direction: 'NNE', level: '6-8 m/s', value: 0.00 },
  { direction: 'NNE', level: '8-10 m/s', value: 0.00 },
  { direction: 'NNE', level: '> 10 m/s', value: 0.00 },
  { direction: 'NE', level: '< 0.5 m/s', value: 0.82 },
  { direction: 'NE', level: '0.5-2 m/s', value: 0.82 },
  { direction: 'NE', level: '2-4 m/s', value: 0.07 },
  { direction: 'NE', level: '4-6 m/s', value: 0.00 },
  { direction: 'NE', level: '6-8 m/s', value: 0.00 },
  { direction: 'NE', level: '8-10 m/s', value: 0.00 },
  { direction: 'NE', level: '> 10 m/s', value: 0.00 },
  { direction: 'ENE', level: '< 0.5 m/s', value: 0.59 },
  { direction: 'ENE', level: '0.5-2 m/s', value: 1.22 },
  { direction: 'ENE', level: '2-4 m/s', value: 0.07 },
  { direction: 'ENE', level: '4-6 m/s', value: 0.00 },
  { direction: 'ENE', level: '6-8 m/s', value: 0.00 },
  { direction: 'ENE', level: '8-10 m/s', value: 0.00 },
  { direction: 'ENE', level: '> 10 m/s', value: 0.00 },
  { direction: 'E', level: '< 0.5 m/s', value: 0.62 },
  { direction: 'E', level: '0.5-2 m/s', value: 2.20 },
  { direction: 'E', level: '2-4 m/s', value: 0.49 },
  { direction: 'E', level: '4-6 m/s', value: 0.00 },
  { direction: 'E', level: '6-8 m/s', value: 0.00 },
  { direction: 'E', level: '8-10 m/s', value: 0.00 },
  { direction: 'E', level: '> 10 m/s', value: 0.00 },
  { direction: 'ESE', level: '< 0.5 m/s', value: 1.22 },
  { direction: 'ESE', level: '0.5-2 m/s', value: 2.01 },
  { direction: 'ESE', level: '2-4 m/s', value: 1.55 },
  { direction: 'ESE', level: '4-6 m/s', value: 0.30 },
  { direction: 'ESE', level: '6-8 m/s', value: 0.13 },
  { direction: 'ESE', level: '8-10 m/s', value: 0.00 },
  { direction: 'ESE', level: '> 10 m/s', value: 0.00 },
  { direction: 'SE', level: '< 0.5 m/s', value: 1.61 },
  { direction: 'SE', level: '0.5-2 m/s', value: 3.06 },
  { direction: 'SE', level: '2-4 m/s', value: 2.37 },
  { direction: 'SE', level: '4-6 m/s', value: 2.14 },
  { direction: 'SE', level: '6-8 m/s', value: 1.74 },
  { direction: 'SE', level: '8-10 m/s', value: 0.39 },
  { direction: 'SE', level: '> 10 m/s', value: 0.13 },
  { direction: 'SSE', level: '< 0.5 m/s', value: 2.04 },
  { direction: 'SSE', level: '0.5-2 m/s', value: 3.42 },
  { direction: 'SSE', level: '2-4 m/s', value: 1.97 },
  { direction: 'SSE', level: '4-6 m/s', value: 0.86 },
  { direction: 'SSE', level: '6-8 m/s', value: 0.53 },
  { direction: 'SSE', level: '8-10 m/s', value: 0.49 },
  { direction: 'SSE', level: '> 10 m/s', value: 0.00 },
  { direction: 'S', level: '< 0.5 m/s', value: 2.66 },
  { direction: 'S', level: '0.5-2 m/s', value: 4.74 },
  { direction: 'S', level: '2-4 m/s', value: 0.64 },
  { direction: 'S', level: '4-6 m/s', value: 0.00 },
  { direction: 'S', level: '6-8 m/s', value: 0.00 },
  { direction: 'S', level: '8-10 m/s', value: 0.49 },
  { direction: 'S', level: '> 10 m/s', value: 0.00 },
  { direction: 'SSW', level: '< 0.5 m/s', value: 2.96 },
  { direction: 'SSW', level: '0.5-2 m/s', value: 4.23 },
  { direction: 'SSW', level: '2-4 m/s', value: 0.34 },
  { direction: 'SSW', level: '4-6 m/s', value: 1.03 },
  { direction: 'SSW', level: '6-8 m/s', value: 0.30 },
  { direction: 'SSW', level: '8-10 m/s', value: 0.00 },
  { direction: 'SSW', level: '> 10 m/s', value: 0.00 },
  { direction: 'SW', level: '< 0.5 m/s', value: 2.53 },
  { direction: 'SW', level: '0.5-2 m/s', value: 4.01 },
  { direction: 'SW', level: '2-4 m/s', value: 1.22 },
  { direction: 'SW', level: '4-6 m/s', value: 0.49 },
  { direction: 'SW', level: '6-8 m/s', value: 0.13 },
  { direction: 'SW', level: '8-10 m/s', value: 0.00 },
  { direction: 'SW', level: '> 10 m/s', value: 0.00 },
  { direction: 'WSW', level: '< 0.5 m/s', value: 1.97 },
  { direction: 'WSW', level: '0.5-2 m/s', value: 2.66 },
  { direction: 'WSW', level: '2-4 m/s', value: 1.97 },
  { direction: 'WSW', level: '4-6 m/s', value: 0.79 },
  { direction: 'WSW', level: '6-8 m/s', value: 0.30 },
  { direction: 'WSW', level: '8-10 m/s', value: 0.00 },
  { direction: 'WSW', level: '> 10 m/s', value: 0.00 },
  { direction: 'W', level: '< 0.5 m/s', value: 1.64 },
  { direction: 'W', level: '0.5-2 m/s', value: 1.71 },
  { direction: 'W', level: '2-4 m/s', value: 0.92 },
  { direction: 'W', level: '4-6 m/s', value: 1.45 },
  { direction: 'W', level: '6-8 m/s', value: 0.26 },
  { direction: 'W', level: '8-10 m/s', value: 0.10 },
  { direction: 'W', level: '> 10 m/s', value: 0.00 },
  { direction: 'WNW', level: '< 0.5 m/s', value: 1.32 },
  { direction: 'WNW', level: '0.5-2 m/s', value: 2.40 },
  { direction: 'WNW', level: '2-4 m/s', value: 0.99 },
  { direction: 'WNW', level: '4-6 m/s', value: 1.61 },
  { direction: 'WNW', level: '6-8 m/s', value: 0.33 },
  { direction: 'WNW', level: '8-10 m/s', value: 0.00 },
  { direction: 'WNW', level: '> 10 m/s', value: 0.00 },
  { direction: 'NW', level: '< 0.5 m/s', value: 1.58 },
  { direction: 'NW', level: '0.5-2 m/s', value: 4.28 },
  { direction: 'NW', level: '2-4 m/s', value: 1.28 },
  { direction: 'NW', level: '4-6 m/s', value: 0.76 },
  { direction: 'NW', level: '6-8 m/s', value: 0.66 },
  { direction: 'NW', level: '8-10 m/s', value: 0.69 },
  { direction: 'NW', level: '> 10 m/s', value: 0.03 },
  { direction: 'NNW', level: '< 0.5 m/s', value: 1.51 },
  { direction: 'NNW', level: '0.5-2 m/s', value: 5.00 },
  { direction: 'NNW', level: '2-4 m/s', value: 1.32 },
  { direction: 'NNW', level: '4-6 m/s', value: 0.13 },
  { direction: 'NNW', level: '6-8 m/s', value: 0.23 },
  { direction: 'NNW', level: '8-10 m/s', value: 0.13 },
  { direction: 'NNW', level: '> 10 m/s', value: 0.07 }
];
const colors = [ /* '#FFF1B8', */'#E3F4BF', '#BEF7C8', '#86E6C8', '#36CFC9', '#209BDD', '#1581E6', '#0860BF' ];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 40, 100, 80 ]
});
chart.source(data);
chart.coord('polar', {
  radius: 0.85
});
chart.legend({
  position: 'bottom',
  useHtml: true,
  offset: 30,
  itemTpl: '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">' +
    '<div class="g2-legend-marker" style="background-color:{color};"></div>' +
    '<div class="g2-legend-text">{value}</div>'
    + '</li>',
  'g2-legend-list-item': {
    width: '60px',
    textAlign: 'center',
    marginRight: 0
  },
  'g2-legend-marker': {
    width: '100%',
    height: '8px',
    borderRadius: 0,
    border: '1px solid #fff'
  }
});
chart.axis('value', {
  label: {
    offset: 0,
    textStyle: {
      textAlign: 'center'
    }
  },
  tickLine: null,
  line: {
    stroke: '#E9E9E9',
    lineDash: [ 3, 3 ]
  },
  grid: {
    line: {
      lineDash: [ 0, 0 ]
    }
  }// 设置坐标系栅格样式
});
chart.intervalStack()
  .position('direction*value')
  .color('level', colors)
  .size(35);
chart.render();
