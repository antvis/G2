const data = [
  { location: '三亚', value: 44.9 },
  { location: '千岛湖', value: 19.7 },
  { location: '柬埔寨', value: 17.3 },
  { location: '呼伦贝尔', value: 14.4 },
  { location: '苏梅岛', value: 2.5 },
  { location: '塞班岛', value: 2.5 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data);
chart.legend({
  position: 'right-center',
  offsetX: -100
});
chart.coord('theta', {
  radius: 0.75
});
chart.intervalStack().position('value').color('location', [ '#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5' ])
  .style({
    stroke: 'white',
    lineWidth: 1
  })
  .label('value', val => {
    if (val < 3) {
      return null;
    }
    return {
      offset: -30,
      textStyle: {
        fill: 'white',
        fontSize: 14,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
      formatter: text => {
        return text + '%';
      }
    };
  });
chart.render();
