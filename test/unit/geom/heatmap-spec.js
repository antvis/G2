const expect = require('chai').expect;
const Chart = require('../../../src/index').Chart;
const div = document.createElement('div');
div.id = 'geom-heatmap';
document.body.appendChild(div);

describe('chart.heatmap', () => {
  const data = require('../../../demos/data/heatmap.json');
  const chart = new Chart({
    container: div,
    height: 500,
    width: 500,
    padding: 'auto',
    plotBackground: {
      fill: '#666' // 图表背景色
    }
  });

  chart.coord().reflect('y');
  chart.source(data);
  chart.tooltip({
    showTitle: false
  });
  chart.axis(false);
  chart.legend({
    position: 'right',
    layout: 'vertical'
  });
  chart.heatmap()
    .position('g*l')
    .color('tmp', 'blue-cyan-lime-yellow-red');
  chart.render();

  it('heatmap size', () => {
    const viewContainer = chart.get('viewContainer');
    const heatmap = viewContainer.get('children')[1];
    const bbox = heatmap.getBBox();
    const coord = chart.get('coord');
    expect({ start: bbox.minX, end: bbox.maxX }).to.eql(coord.x);
    expect({ start: bbox.minY, end: bbox.maxY }).to.eql(coord.y);
  });
});
