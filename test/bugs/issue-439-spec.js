const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#439', () => {
  it('tooltip and size', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    const data = [
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

    const data1 = [
      { genre: 'Sports', sold: 475, type: '1' },
      { genre: 'Strategy', sold: 105, type: '1' },
      { genre: 'Action', sold: 100, type: '1' },
      { genre: 'Shooter', sold: 250, type: '1' },
      { genre: 'Other', sold: 50, type: '1' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 1000,
      height: 540,
      animate: false,
      pixelRatio: 2
    });

    chart.source(data);
    chart.line().position('genre*sold').color('type');

    chart.render();
    let callback = false;
    chart.on('line:click', () => {
      chart.changeData(data1);
      callback = true;
    });

    const canvas = chart.get('canvas');
    canvas.emit('click', {
      type: 'click',
      x: 542 * 2,
      y: 201 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(callback).equal(true);
    expect(() => {
      canvas.emit('mousemove', {
        type: 'mousemove',
        x: 748 * 2,
        y: 79 * 2,
        event: {
          toElement: canvas.get('el')
        }
      });
    }).not.to.throw();
  });
});
