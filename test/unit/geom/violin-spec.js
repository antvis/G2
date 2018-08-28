const DataSet = require('@antv/data-set');
const expect = require('chai').expect;
const Chart = require('../../../src').Chart;
const div = document.createElement('div');
div.id = 'geom-heatmap';
document.body.appendChild(div);

describe('chart.violin', function() {
  const data = require('../../../demos/data/iris-flower.json');
  const dv = new DataSet.View().source(data);
  const fields = [ 'PetalWidth', 'PetalLength', 'SepalWidth', 'SepalLength' ];
  dv.transform({
    type: 'kde',
    bandwidth: 'nrd',
    fields,
    minY: 0.0001 // 小于这个值的概率将被忽略
  });

  const chart = new Chart({
    container: div,
    height: 500,
    width: 500,
    padding: 'auto',
    plotBackground: {
      fill: '#666' // 图表背景色
    }
  });

  // chart.tooltip(false);
  chart.source(dv);
  chart.coord().transpose();
  chart.axis('key', {
    tickLine: {
      alignWithLabel: false
    }
  });
  chart.violin()
    .position('key*x')
    .color('key')
    .size('y')
    .style({
      lineWidth: 1,
      fillOpacity: 0.5,
      strokeOpacity: 0.5
    })
    .tooltip(false);

  chart.render();

  it('violin plot', () => {
    const violinGeom = chart.get('geoms')[0];
    expect(violinGeom.get('shapeContainer').getCount()).equal(dv.rows.length);
  });
});
