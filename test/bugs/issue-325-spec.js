const expect = require('chai').expect;
const G2 = require('../../index');

describe('#360', () => {
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
    animate: false
  });

  chart.source(data);

  it('point active', () => {


    chart.point()
      .position('genre*sold')
      .color('red')
      .active(true, {
        style: {
          fill: 'blue'
        }
      });

    chart.render();

    const geom = chart.get('geoms')[0];
    const shapes = geom.getShapes();
    geom.setShapesActived([ shapes[0] ]);
    expect(shapes[0].attr('fill')).equal('blue');
    geom.setShapesActived([ shapes[1] ]);
    expect(shapes[0].attr('fill')).equal('#fff');

    chart.clear();
  });

  it('interval active', function(done) {
    chart.interval()
        .position('genre*sold')
        .color('genre')
        .active(true, {
          animate: true,
          style: { fill: 'red' }
        });
    chart.render();
    const geom = chart.get('geoms')[0];
    const shapes = geom.getShapes();
    geom.setShapesActived([ shapes[0] ]);
    setTimeout(function() {
      expect(shapes[0].attr('fill')).equal('rgb(255, 0, 0)');
      chart.clear();
      done();
    }, 600);

  });

  it('interval selected and active', function() {
    chart.coord('theta');
    chart.intervalStack().position('sold').color('genre');
    chart.render();
    const geom = chart.get('geoms')[0];
    geom.setSelected(data[0]);
    const shapes = geom.getShapes();
    expect(shapes[0].get('selected')).equal(true);
  });

  it('destroy', function() {
    chart.destroy();
  });

});
