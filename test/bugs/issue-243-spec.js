const DataSet = require('@antv/data-set');
// const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#243', () => {
  it('Axis grid `alternateColor` has gaps when field is `category`', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { country: '中国', population: 131744 },
      { country: '印度', population: 104970 },
      { country: '美国', population: 29034 },
      { country: '印尼', population: 23489 },
      { country: '巴西', population: 18203 }
    ];
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'sort',
      callback(a, b) { // 排序依据，和原生js的排序callback一致
        return a.population - b.population;
      }
    });
    const chart = new G2.Chart({
      container: div,
      padding: 80
    });
    chart.source(dv);
    // chart.coord('polar').reflect();
    // chart.coord('polar');
    // chart.coord().transpose();
    chart.axis('country', {
      label: {
        offset: 12
      },
      grid: {
        align: 'center',
        alternateColor: [ '#eee', '#ddd' ],
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    chart.interval().position('country*population');
    chart.render();
  });

  it('When it is linear axes', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { type: 0, value: 1 },
      { type: 1, value: 2 },
      { type: 2, value: 3 }
    ];
    const chart = new G2.Chart({
      container: div,
      padding: 80
    });
    chart.source(data);
    chart.scale('type', {
      // tickCount: 2
      // type: 'cat',
      // nice: false,
    });
    // chart.coord('polar').reflect();
    // chart.coord('polar');
    // chart.coord().transpose();
    chart.axis('type', {
      label: {
        offset: 12
      },
      grid: {
        align: 'center',
        alternateColor: [ '#eee', '#ddd' ],
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    chart.line().position('type*value');
    chart.render();
  });
});
