const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#999', () => {
  it('pie select bug', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 300,
      animate: false
    });
    chart.source(data);
    chart.coord('theta');
    const pie = chart.intervalStack().position('sold').color('genre');
    chart.render();
    pie.setSelected(data[0]);
    const shape = pie.getShapes()[0];
    expect(shape.get('selected')).eql(true);
    chart.emit('interval:click', {
      shape
    });
    expect(shape.get('selected')).eql(false);
  });
});
