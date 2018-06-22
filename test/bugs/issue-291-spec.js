const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#291', () => {
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

  it('default view visible', () => {
    const view1 = chart.view({
      visible: false
    });
    view1.source(data);

    view1.line()
      .position('genre*sold')
      .color('red');

    chart.render();
    expect(view1.get('visible')).equal(false);
    const geom = view1.get('geoms')[0];
    expect(geom.get('shapeContainer').get('visible')).equal(false);

    view1.show();
    expect(geom.get('shapeContainer').get('visible')).equal(true);
    view1.hide();
    expect(geom.get('shapeContainer').get('visible')).equal(false);
  });

  it('default geom visible', () => {
    chart.clear();
    chart.source(data);
    const geom = chart.line({
      visible: false
    }).position('genre*sold');
    chart.render();
    expect(geom.get('shapeContainer').get('visible')).equal(false);
    geom.show();
    expect(geom.get('shapeContainer').get('visible')).equal(true);
    geom.hide();
  });
  it('destroy', () => {
    chart.destroy();
  });
});
