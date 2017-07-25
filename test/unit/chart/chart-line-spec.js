const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
div.id = 'cchartl';
document.body.appendChild(div);

describe('test line chart', function() {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    animate: false
  });

  chart.source(data);
  chart.scale({
    genre: {
      alias: '游戏种类',
      range: [ 0, 1 ]
    },
    sold: {
      alias: '销售量'
    }
  });
  chart.line().position('genre*sold').color('#f80')
    .style({
      lineDash: [ 2, 2 ]
    });
  chart.render();
  let tmpPath;

  it('line points', function() {
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    tmpPath = path;
    expect(path.length).equal(5);
    expect(group.__m).eqls([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);

  });

  it('line with null values', function() {
    const newData = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: null },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    chart.changeData(newData);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(2);
  });

  it('change coord', function() {
    chart.coord().scale(1, -0.5);
    chart.changeData(data);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path[0]).eqls(tmpPath[0]);
    expect(group.__m).not.eqls([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });

  it('in polar', function() {
    chart.coord('polar');
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
  });

  it('destroy', function() {
    chart.destroy();
    document.body.removeChild(div);
  });

});
