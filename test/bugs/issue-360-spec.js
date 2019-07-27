const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#360', () => {
  it('point selected error', () => {
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
      height: 540
    });

    chart.source(data);

    chart.point()
      .position('genre*sold')
      .color('red')
      .select(true, {
        style: { fill: 'blue' }
      });

    chart.render();
    const geom = chart.get('geoms')[0];
    const shapes = geom.getShapes();
    expect(() => {
      geom.setShapeSelected(shapes[0]);
    }).not.to.throw();

    chart.destroy();
  });
});
