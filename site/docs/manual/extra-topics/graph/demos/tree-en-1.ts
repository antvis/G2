import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  width: 800,
  height: 1500,
  layout: { sortBy: (a, b) => a.value - b.value },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
