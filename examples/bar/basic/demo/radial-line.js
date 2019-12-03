import { Chart } from '@antv/g2';

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

const chart = new Chart({
  container: 'container',
  height: 500,
});

chart.data(data);
chart.scale('count', {
  max: 12,
});

chart.coordinate('theta', {
  innerRadius: 0.2,
  endAngle: Math.PI
});

chart.axis(false);

chart.interval()
  .position('term*count')
  .color('#8543e0')
  .shape('line')
  // .select(false)
  .style({
    lineAppendWidth: 10
  }); // 线状柱状图

chart.point()
  .position('term*count')
  .color('#8543e0')
  .shape('circle');

for (let i = 0, l = data.length; i < l; i++) {
  const obj = data[i];
  chart.annotation().text({
    position: [ obj.term, 0 ],
    content: obj.term + ' ',
    style: {
      textAlign: 'right'
    }
  });
}

chart.annotation().text({
  position: [ '50%', '50%' ],
  content: 'Music',
  style: {
    textAlign: 'center',
    fontSize: 24,
    fill: '#8543e0'
  }
});

chart.render();
