const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#515', () => {
  it('pie init selected and clearSelected', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });
    chart.source(data);
    chart.coord('theta');
    const interval = chart.intervalStack()
      .position('sold')
      .color('genre');

    chart.render();

    interval.setSelected(data[0]);

    setTimeout(() => {
      interval.clearSelected();
      setTimeout(() => {
        const firstShape = interval.getShapes()[0];
        expect(firstShape.attr('clip')).equal(null);
        chart.destroy();
        done();
      }, 500);

    }, 500);

  });

  it('rose init selected and clearSelected', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });
    chart.source(data);
    chart.coord('polar');
    const interval = chart.interval()
      .position('genre*sold')
      .select({
        style: {
          fill: 'red'
        }
      });

    chart.render();

    interval.setSelected(data[0]);
    const firstShape = interval.getShapes()[0];
    setTimeout(() => {
      interval.clearSelected();
      setTimeout(() => {
        expect(firstShape.attr('fill')).not.equal('red');
        chart.destroy();
        done();
      }, 500);

    }, 500);

  });
});
