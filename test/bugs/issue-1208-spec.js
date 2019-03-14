const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1208', () => {
  it('Scale alias should be effective in axis title when data length is 0', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      // { genre: 'Sports', sold: 275 },
      // { genre: 'Strategy', sold: 115 },
      // { genre: 'Action', sold: 120 },
      // { genre: 'Shooter', sold: 350 },
      // { genre: 'Other', sold: 150 }
    ];
    const chart = new G2.Chart({
      container: div,
      padding: 80
    });
    chart.source(data, {
      genre: {
        alias: '游戏种类'
      },
      sold: {
        alias: '销售量'
      }
    });
    chart.axis('genre', {
      title: true
    });
    chart.axis('sold', {
      title: true
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    const axisController = chart.get('axisController');
    const xTitle = axisController.axes[0].get('title').text;
    const yTitle = axisController.axes[1].get('title').text;
    expect(xTitle).to.equal('游戏种类');
    expect(yTitle).to.equal('销售量');
  });
});
