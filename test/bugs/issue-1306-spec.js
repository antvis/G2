const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1306', () => {
  it('legend can not filter labels', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 133 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1766 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
      { country: 'Oceania', year: '1750', value: 200 },
      { country: 'Oceania', year: '1800', value: 200 },
      { country: 'Oceania', year: '1850', value: 200 },
      { country: 'Oceania', year: '1900', value: 300 },
      { country: 'Oceania', year: '1950', value: 230 },
      { country: 'Oceania', year: '1999', value: 300 },
      { country: 'Oceania', year: '2050', value: 460 }
    ];

    const chart = new G2.Chart({
      container: div,
      forceFit: false
    });
    chart.source(data, {
      year: {
        type: 'linear',
        tickInterval: 25
      }
    });

    chart.point()
      .position('year*value')
      .color('country')
      .size('value')
      .label('value');

    chart.render();

    const legendController = chart.get('legendController');
    chart.filterShape(function(obj, shape, geom) {
      legendController._filterLabels(shape, geom, false);
      return false;
    });

    const geom = chart.getAllGeoms()[0];
    const labelContainer = geom.get('labelContainer');
    const labels = labelContainer.get('labelsGroup').get('children');
    G2.Util.each(labels, label => {
      expect(label.get('visible')).to.be.false;
    });
  });
});
