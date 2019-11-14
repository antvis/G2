const data = [
  { type: '一线城市', value: 0.19 },
  { type: '二线城市', value: 0.21 },
  { type: '三线城市', value: 0.27 },
  { type: '四线及以下', value: 0.33 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data);
chart.legend(false);
chart.coord('theta', {
  radius: 0.75
});
const pie = chart.intervalStack().position('value').color('type', [ '#063d8a', '#1770d6', '#47abfc', '#38c060' ])
  .style({ opacity: 0.4 })
  .select(true, {
    style: {
      stroke: 'black',
      lineWidth: 2,
      opacity: 1
    }
  })
  .label('type', val => {
    const opacity = (val === '四线及以下') ? 1 : 0.5;
    return {
      offset: -30,
      textStyle: {
        opacity,
        fill: 'white',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
      formatter: (text, item) => {
        const d = item.point;
        return d.type + '\n' + d.value + '%';
      }
    };
  });
chart.render();
pie.setSelected(data[0]);
chart.on('afterpaint', () => {
  pie.setSelected(data[0]);
});
