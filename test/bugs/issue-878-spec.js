const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#878 donut arc path closing', () => {
  it('all shapes rendererd correctly', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 3 },
      { genre: 'Strategy', sold: 8 },
      { genre: 'Action', sold: 21 },
      { genre: 'Shooter', sold: 10 }
    ];

    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      width: 400,
      height: 400
    });
    chart.source(data);
    chart.coord('theta', { innerRadius: 0.8 });
    chart.intervalStack().position('sold').color('genre');

    chart.render();
    const geom = chart.getAllGeoms()[0];
    geom.getShapes().forEach(shape => {
      const bbox = shape.calculateBox();
      const path = shape.get('segments');
      expect((bbox.maxX - bbox.minX) > 0).to.be.true;
      expect((bbox.maxY - bbox.minY) > 0).to.be.true;
      expect(path.length).to.equal(6);
    });
  });
});
