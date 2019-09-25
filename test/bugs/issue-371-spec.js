const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#371', () => {
  it('point click with line error', done => {
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
      width: 540,
      height: 540,
      pixelRatio: 2,
      animate: false
    });

    chart.source(data);

    chart.line()
      .position('genre*sold')
      .color('red');
    chart.point()
      .position('genre*sold')
      .color('red')
      .select(true, {
        style: { fill: 'blue' }
      });

    chart.render();

    chart.showTooltip({
      x: 476,
      y: 360
    });
    const canvas = chart.get('canvas');
    setTimeout(() => {
      const shape = canvas.getShape(952, 720);
      expect(shape).not.equal(undefined);
      expect(shape.get('origin')).not.equal(undefined);
      done();
    }, 50);

  });
});
