const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#476 when text value is negtive', () => {
  let chart = null;
  it('general interval', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: -350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      padding: 'auto'
    });
    chart.source(data);
    const interval = chart.interval().position('genre*sold')
    .label('sold', {
      offset: 10
    });

    chart.render();
    const shapes = interval.getShapes();
    const labels = interval.get('labelContainer').get('children')[0].get('children');
    expect(shapes[2].get('origin').y - labels[2].attr('y')).eqls(10);
    expect(shapes[3].get('origin').y - labels[3].attr('y')).eqls(-10);
    // expect(labels[3].attr('y')).eqls()
    //

  });
  it('transpose', () => {
    chart.coord().transpose();
    chart.repaint();
    const interval = chart.get('geoms')[0];
    const shapes = interval.getShapes();
    const labels = interval.get('labelContainer').get('children')[0].get('children');
    expect(shapes[2].get('origin').x - labels[2].attr('x')).eqls(-10);
    expect(shapes[3].get('origin').x - labels[3].attr('x')).eqls(10);
  });
  it('range interval', () => {
    const data = [
      { genre: 'Sports', sold: [ 100, 275 ], type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: [ -350, -100 ], type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];
    chart.changeData(data);
    const interval = chart.get('geoms')[0];
    const shapes = interval.getShapes();
    const labels = interval.get('labelContainer').get('children')[0].get('children');
    expect(shapes[0].get('origin').x[0] - labels[0].attr('x')).eqls(10);
    expect(shapes[0].get('origin').x[1] - labels[1].attr('x')).eqls(-10);
  });

  it('destroy', () => {
    chart.destroy();
  });

});
