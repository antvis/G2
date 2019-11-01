const expect = require('chai').expect;
const G2 = require('../../src/index');

const div = document.createElement('div');
document.body.appendChild(div);

describe('#1264', function() {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' }
  ];
  const chart = new G2.Chart({
    height: 500,
    forceFit: true,
    container: div,
    animate: false
  });

  chart.source(data);

  chart.interval().position('genre*sold').color('type');

  chart.filter('genre', function(genre, idx) {
    return idx === 1;
  });

  chart.render();

  it('getFilteredValues', function() {
    const rst = chart.getFilteredValues('genre');
    expect(rst.length).equal(1);
  });

  it('getFilteredOutValues', function() {
    const rst = chart.getFilteredOutValues('genre');
    expect(rst.length).equal(4);
  });

  it('destroy', function() {
    chart.destroy();
  });
});
