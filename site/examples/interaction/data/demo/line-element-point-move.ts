import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .line()
  .data([
    { year: '1991', value: 3, type: 'type1' },
    { year: '1992', value: 4, type: 'type1' },
    { year: '1993', value: 3.5, type: 'type1' },
    { year: '1994', value: 5, type: 'type1' },
    { year: '1995', value: 4.9, type: 'type1' },
    { year: '1996', value: 2, type: 'type1' },
    { year: '1997', value: 7, type: 'type1' },
    { year: '1998', value: 11, type: 'type1' },
    { year: '1999', value: 13, type: 'type1' },
    { year: '1991', value: 6, type: 'type2' },
    { year: '1992', value: 1, type: 'type2' },
    { year: '1993', value: 4, type: 'type2' },
    { year: '1994', value: 9, type: 'type2' },
    { year: '1995', value: 1.9, type: 'type2' },
    { year: '1996', value: 5, type: 'type2' },
    { year: '1997', value: 4, type: 'type2' },
    { year: '1998', value: 6, type: 'type2' },
    { year: '1999', value: 15, type: 'type2' },
  ])
  .interaction({
    legendFilter: false,
    elementPointMove: {
      pointR: 8,
      pointStrokeWidth: 2,
      pointActiveStroke: '#fff',
      pathLineDash: [2, 4],
      pathStroke: 'red',
      labelFontSize: 14,
      labelY: 24,
    },
  })
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('key', 'type')
  .encode('color', 'type');

chart.render().then(() => {
  chart.on('element-point:select', (v) => {
    const {
      data: { selection },
    } = v;
    console.log(selection, 'selection');
  });

  chart.on('element-point:moved', (v) => {
    const {
      data: { changeData, data },
    } = v;
    console.log(changeData, 'changeData');
    console.log(data, 'data');
  });
});

chart.on('afterrender', () => {
  chart.emit('element-point:select', {
    data: {
      selection: [1, 2],
    },
  });
  // Clear select.
  // chart.emit('element-point:unselect');
});
