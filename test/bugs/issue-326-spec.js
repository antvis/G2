const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#326', () => {
  it('view event emit', () => {
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
      height: 500,
      pixelRatio: 2,
      animate: false,
      padding: 'auto'
    });
    chart.tooltip({
      crosshairs: null
    });

    const view = chart.view();
    view.source(data);

    view.interval()
      .position('genre*sold')
      .color('genre')
      .active(true);

    chart.render();

    let num = 0;

    view.on('interval:mouseenter', () => {
      num = 1;
    });

    chart.on('interval:mouseenter', ev => {
      num = 2;
      const shape = ev.shape;
      shape.set('originColor', shape.attr('fill')); // 记录颜色
      shape.attr('fill', 'red');
    });

    chart.on('interval:mouseleave', ev => {
      const shape = ev.shape;
      shape.attr('fill', shape.get('originColor'));
      shape.set('originColor', null);
    });
    const canvas = chart.get('canvas');
    canvas.emit('mousemove', {
      x: 902,
      y: 572,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(num).equal(2);
  });
});
