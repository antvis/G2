const G2 = require('../../src/index');
const expect = require('chai').expect;
const { DataView } = require('@antv/data-set');

describe('#1031', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('label will not be captured when set capture', () => {
    const data = {
      name: 'root',
      children: [{
        name: '分类 1',
        value: 560
      }, {
        name: '分类 2',
        value: 500
      }, {
        name: '分类 3',
        value: 150
      }, {
        name: '分类 4',
        value: 140
      }, {
        name: '分类 5',
        value: 115
      }, {
        name: '分类 6',
        value: 95
      }, {
        name: '分类 7',
        value: 90
      }, {
        name: '分类 8',
        value: 75
      }, {
        name: '分类 9',
        value: 98
      }, {
        name: '分类 10',
        value: 60
      }, {
        name: '分类 11',
        value: 45
      }, {
        name: '分类 12',
        value: 40
      }, {
        name: '分类 13',
        value: 40
      }, {
        name: '分类 14',
        value: 35
      }, {
        name: '分类 15',
        value: 40
      }, {
        name: '分类 16',
        value: 40
      }, {
        name: '分类 17',
        value: 40
      }, {
        name: '分类 18',
        value: 30
      }, {
        name: '分类 19',
        value: 28
      }, {
        name: '分类 20',
        value: 16
      }]
    };
    const dv = new DataView();
    dv.source(data, {
      type: 'hierarchy'
    }).transform({
      field: 'value',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: [ 'x', 'y' ]
    });
    const nodes = dv.getAllNodes();
    nodes.map(node => {
      node.name = node.data.name;
      node.value = node.data.value;
      return node;
    });
    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      height: window.innerHeight,
      padding: 0,
      animate: false
    });
    chart.source(nodes);
    chart.scale({
      value: {
        nice: false
      }
    });
    chart.axis(false);
    chart.legend(false);
    chart.polygon()
      .position('x*y')
      .color('name')
      .tooltip('name*value', (name, count) => ({
        name,
        count
      }))
      .style({
        lineWidth: 1,
        stroke: '#fff'
      })
      .label('name', {
        offset: 0,
        capture: false,
        textStyle: {
          textBaseline: 'middle'
        },
        formatter: function formatter(val) {
          if (val !== 'root') {
            return val;
          }
        }
      });
    chart.render();
    const labels = chart.get('geoms')[0].get('labelContainer').get('children')[0].get('children');
    expect(labels[0].get('capture')).to.be.false;
    chart.destroy();
  });
});
