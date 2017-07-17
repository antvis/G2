const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
div.id = 'cchartl';
document.body.appendChild(div);

describe('test chart', function() {
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
    forceFit: true
  });

  chart.source(data, {
    genre: {
      alias: '游戏种类'
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

  it('line points', function() {
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(5);
  });
});
