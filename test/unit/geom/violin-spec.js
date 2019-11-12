const DataSet = require('@antv/data-set');
const expect = require('chai').expect;
const Chart = require('../../../src').Chart;

const div = document.createElement('div');
div.id = 'geom-violin';
document.body.appendChild(div);

describe('chart.violin', () => {
  const data = require('../../../demos/data/iris-flower.json');
  let dv;
  const fields = [ 'PetalWidth', 'PetalLength', 'SepalWidth', 'SepalLength' ];

  beforeEach(() => {
    dv = new DataSet.View().source(data);
    dv.transform({
      type: 'KDE',
      bandwidth: 'nrd',
      fields,
      minSize: 0.0001, // 小于这个值的概率将被忽略
      groupBy: [ 'Species' ]
    });
  });

  it('violin plot', () => {
    const chart = new Chart({
      container: div,
      height: 500,
      width: 500
    });

    expect(chart.violin).to.be.a('Function');

    // chart.tooltip(false);
    chart.source(dv);
    chart.axis('key', {
      tickLine: {
        alignWithLabel: false
      }
    });
    chart.violin()
      .position('key*y')
      .color('key')
      .size('size')
      .style({
        lineWidth: 1,
        fillOpacity: 0.5,
        strokeOpacity: 0.5
      })
      .tooltip(false);

    chart.render();

    const violinGeom = chart.get('geoms')[0];
    expect(violinGeom.get('shapeContainer').getCount()).equal(dv.rows.length);
  });

  it('violinDodge', () => {
    const chart = new Chart({
      container: div,
      height: 500,
      width: 500
    });

    expect(chart.violinDodge).to.be.a('Function');

    // chart.tooltip(false);
    chart.source(dv);
    chart.axis('key', {
      tickLine: {
        alignWithLabel: false
      }
    });
    chart.violinDodge()
      .position('key*y')
      .color('Species')
      .size('size')
      .style({
        lineWidth: 1,
        fillOpacity: 0.5,
        strokeOpacity: 0.5
      })
      .tooltip(false);

    chart.render();

    const violinGeom = chart.get('geoms')[0];
    expect(violinGeom.get('shapeContainer').getCount()).equal(dv.rows.length);
  });
});
