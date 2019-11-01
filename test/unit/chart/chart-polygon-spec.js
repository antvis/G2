const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
document.body.appendChild(div);

describe('test polygon chart', () => {

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    padding: 50,
    animate: false
  });

  it('cat to cat', () => {
    const data = [[ 0, 0, 10 ], [ 0, 1, 19 ], [ 0, 2, 8 ], [ 0, 3, 24 ], [ 0, 4, 67 ], [ 1, 0, 92 ], [ 1, 1, 58 ], [ 1, 2, 78 ], [ 1, 3, 117 ], [ 1, 4, 48 ], [ 2, 0, 35 ], [ 2, 1, 15 ], [ 2, 2, 123 ], [ 2, 3, 64 ], [ 2, 4, 52 ], [ 3, 0, 72 ], [ 3, 1, 132 ], [ 3, 2, 114 ], [ 3, 3, 19 ], [ 3, 4, 16 ], [ 4, 0, 38 ], [ 4, 1, 5 ], [ 4, 2, 8 ], [ 4, 3, 117 ], [ 4, 4, 115 ], [ 5, 0, 88 ], [ 5, 1, 32 ], [ 5, 2, 12 ], [ 5, 3, 6 ], [ 5, 4, 120 ], [ 6, 0, 13 ], [ 6, 1, 44 ], [ 6, 2, 88 ], [ 6, 3, 98 ], [ 6, 4, 96 ], [ 7, 0, 31 ], [ 7, 1, 1 ], [ 7, 2, 82 ], [ 7, 3, 32 ], [ 7, 4, 30 ], [ 8, 0, 85 ], [ 8, 1, 97 ], [ 8, 2, 123 ], [ 8, 3, 64 ], [ 8, 4, 84 ], [ 9, 0, 47 ], [ 9, 1, 114 ], [ 9, 2, 31 ], [ 9, 3, 48 ], [ 9, 4, 91 ]];
    const source = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const obj = {};
      obj.name = item[0];
      obj.day = item[1];
      obj.sales = item[2];
      source.push(obj);
    }

    chart.source(source);
    chart.scale({
      name: {
        type: 'cat',
        alias: '名称',
        values: [ 'Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura' ]
      },
      day: {
        type: 'cat',
        alias: '日期',
        values: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]
      }
    });
    chart.polygon()
      .position('name*day')
      .color('sales', '#f6f6f6-#36B3C3')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });

    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(source.length);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(6);
  });

  it('ploar', () => {
    chart.coord('polar');
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(chart.get('data').length);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(6);
  });
  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});
