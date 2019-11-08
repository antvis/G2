const data = [
  { term: 'Zombieland', count: 9 },
  { term: 'Wieners', count: 8 },
  { term: 'Toy Story', count: 8 },
  { term: 'trashkannon', count: 7 },
  { term: 'the GROWLERS', count: 6 },
  { term: 'mudweiser', count: 6 },
  { term: 'ThunderCats', count: 4 },
  { term: 'The Taqwacores - Motion Picture', count: 4 },
  { term: 'The Shawshank Redemption', count: 2 },
  { term: 'The Olivia Experiment', count: 1 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 80 ]
});
chart.source(data, {
  count: {
    max: 12
  }
});
chart.coord('theta', {
  innerRadius: 0.2,
  endAngle: Math.PI
});
chart.interval()
  .position('term*count')
  .color('#8543e0')
  .shape('line')
  .select(false)
  .style({
    lineAppendWidth: 10
  }); // 线状柱状图
chart.point()
  .position('term*count')
  .color('#8543e0')
  .shape('circle');
for (let i = 0, l = data.length; i < l; i++) {
  const obj = data[i];
  chart.guide().text({
    position: [ obj.term, 0 ],
    content: obj.term + ' ',
    style: {
      textAlign: 'right'
    }
  });
}
chart.guide().text({
  position: [ '50%', '50%' ],
  content: 'Music',
  style: {
    textAlign: 'center',
    fontSize: 24,
    fill: '#8543e0'
  }
});
chart.render();
