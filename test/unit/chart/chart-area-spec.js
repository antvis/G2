const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
div.id = 'ccharta';
document.body.appendChild(div);

describe('test area chart', function() {
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
      alias: '游戏种类'
    },
    sold: {
      alias: '销售量'
    }
  });
  it('basic area', function() {
    chart.area().position('genre*sold').color('#f80')
      .style({
        lineDash: [ 2, 2 ]
      });
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 1);
  });

  it('area range', function() {
    const newData = [
      { genre: 'Sports', sold: [ 10, 275 ] },
      { genre: 'Strategy', sold: [ 50, 115 ] },
      { genre: 'Action', sold: [ 40, 200 ] },
      { genre: 'Shooter', sold: [ 200, 350 ] },
      { genre: 'Other', sold: [ 100, 150 ] }
    ];
    chart.changeData(newData);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 1);
  });

  it('area with null', function() {
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

  it('area in polar', function() {
    chart.coord('polar');
    chart.changeData(data);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);

    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 3);
  });

  it('destroy', function() {
    chart.destroy();
    document.body.removeChild(div);
  });
});
