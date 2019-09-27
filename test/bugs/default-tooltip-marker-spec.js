const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('Default tooltip marker', () => {
  let div;
  let chart;
  before(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  it('Default tooltip marker', () => {
    const data = [
      { genre: 'Sports', sold: 213 },
      { genre: 'Strategy', sold: 34 },
      { genre: 'Action', sold: 67 },
      { genre: 'Shooter', sold: 10 },
      { genre: 'Other', sold: 4 }
    ];

    chart = new G2.Chart({
      container: div,
      animate: false
    });
    chart.source(data, {
      sold: {
        type: 'linear'
      }
    });

    chart.line().position('genre*sold');
    chart.render();

    const position = chart.getXY({ genre: 'Shooter', sold: 10 });
    chart.showTooltip(position);

    const tooltip = chart.get('tooltipController').tooltip;
    const items = tooltip.get('items');
    expect(items[0].marker).to.eql({ fill: '#1890FF', symbol: 'circle', activeSymbol: 'circle' });
    const markerGroup = tooltip.get('markerGroup');
    expect(markerGroup.get('children')[0].attr('symbol')).to.equal('circle');
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(div);
  });
});
