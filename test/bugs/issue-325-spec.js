const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#325', () => {
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

  it('interval active', done => {
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
    setTimeout(() => {
      expect(shapes[0].attr('fill')).equal('red');
      chart.clear();
      done();
    }, 600);

  });

  it('interval selected and active', () => {
    chart.coord('theta');
    chart.intervalStack().position('sold').color('genre');
    chart.render();
    const geom = chart.get('geoms')[0];
    geom.setSelected(data[0]);
    const shapes = geom.getShapes();
    expect(shapes[0].get('selected')).equal(true);
  });

  it('interval active highlight', done => {
    const newData = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },
      { genre: 'Sports', sold: 175, type: '2' },
      { genre: 'Strategy', sold: 215, type: '2' },
      { genre: 'Action', sold: 220, type: '2' },
      { genre: 'Shooter', sold: 250, type: '2' },
      { genre: 'Other', sold: 50, type: '2' }
    ];
    chart.clear();
    chart.coord();
    chart.source(newData);
    chart.tooltip({
      crosshairs: false,
      shared: false
    });
    const geom = chart.interval()
      .position('genre*sold')
      .color('type')
      .active(true, {
        animate: true,
        highlight: true,
        style: { fillOpacity: 0.9 }
      })
      .adjust('dodge');
    chart.render();

    const shapes = geom.getShapes();
    geom.setShapesActived([ shapes[0] ]);
    setTimeout(() => {
      expect(shapes[0].attr('fillOpacity')).equal(0.9);
      done();
    }, 600);
  });

  after(() => {
    chart.destroy();
  });

});
