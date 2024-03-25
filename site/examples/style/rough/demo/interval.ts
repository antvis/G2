import { Chart } from '@antv/g2';
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Gaegu'],
  },
  active: () => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      paddingLeft: 60,
      plugins: [new Plugin()],
    });

    chart
      .interval()
      .data([
        { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
        { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
        { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
        { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
        { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
        { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
        { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
        { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
        { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
        { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
        { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
        { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
        { month: 'Total', start: 0, end: 3164946 },
      ])
      .encode('x', 'month')
      .encode('y', ['end', 'start'])
      .encode('color', (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
      )
      .style('lineWidth', 2)
      .style('fillStyle', 'zigzag')
      .axis('x', {
        titleFontSize: 15,
        titleFontFamily: 'Gaegu',
        labelFontFamily: 'Gaegu',
        tickStroke: '#cdcdcd',
      })
      .axis('y', {
        labelFormatter: '~s',
        titleFontSize: 15,
        titleFontFamily: 'Gaegu',
        labelFontFamily: 'Gaegu',
        tickStroke: '#cdcdcd',
        gridStroke: '#efefef',
      })
      .legend('color', { itemLabelFontFamily: 'Gaegu' });

    chart.render();
  },
});
