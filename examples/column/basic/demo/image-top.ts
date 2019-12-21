import { Chart } from '@antv/g2';

const data = [
  { name: 'John', vote: 35654 },
  { name: 'Damon', vote: 65456 },
  { name: 'Patrick', vote: 45724 },
  { name: 'Mark', vote: 13654 },
];
const imageMap = {
  John: 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
  Damon: 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
  Patrick: 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
  Mark: 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png',
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);

chart.scale('vote', {
  min: 0,
});

chart.legend(false);

chart.axis('vote', {
  label: null,
  title: null,
  line: null,
  tickLine: null,
});

chart
  .interval()
  .position('name*vote')
  .color('name', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']);

chart
  .point()
  .position('name*vote')
  .size(32)
  .shape('name', (name) => {
    return ['image', imageMap[name]];
  });

chart.render();
