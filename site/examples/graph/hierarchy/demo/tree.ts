import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 1500,
  width: 800,
  insetRight: 80,
  insetLeft: 15,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .tree()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    sortBy: (a, b) => a.value - b.value,
  })
  .style('nodeFill', (d) => (d.height === 0 ? '#999' : '#000'))
  .style('linkStroke', '#999')
  .style('labelText', (d) => d.data.name || '-')
  .style('labelFontSize', (d) => (d.height === 0 ? 7 : 12))
  .style('labelTextAlign', (d) => (d.height === 0 ? 'start' : 'end'))
  .style('labelPosition', (d) => (d.height !== 0 ? 'left' : 'right'))
  .style('labelDx', (d) => (d.height === 0 ? 5 : -5))
  .style('labelBackground', true)
  .style('labelBackgroundFill', '#fff');

chart.render();
