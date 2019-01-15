const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#502', () => {
  it('plot enter and plot leave event', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
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

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: false,
      padding: [ 0, 20, 95, 80 ],
      pixelRatio: 2 // 为了保证单元测试在双倍像素下正确
    });
    chart.source(data);

    chart.interval()
      .position('genre*sold')
      .color('type');

    let enterCalled = false;
    let outCalled = false;
    let leftNum = 0;
    const canvas = chart.get('canvas');
    chart.on('plotenter', () => {
      enterCalled = true;
    });
    chart.on('plotleave', () => {
      outCalled = true;
      leftNum += 1;
      // console.log(leftNum);
    });

    chart.render();

    // 在 plot range 内部移动
    canvas.emit('mousemove', {
      type: 'mousemove',
      x: 479 * 2,
      y: 150 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });

    expect(enterCalled).eqls(true);
    expect(outCalled).eqls(false);

    // 移出 plot range
    canvas.emit('mousemove', {
      type: 'mousemove',
      x: 117 * 2,
      y: 450 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(outCalled).eqls(true);

    // 再次进入
    canvas.emit('mousemove', {
      type: 'mousemove',
      x: 479 * 2,
      y: 150 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    // 直接移出画布，这是很多情况下 tooltip 无法消失的原因
    canvas.emit('mouseleave', {
      x: 254, y: -5,
      event: {
        toElement: document.body
      }
    });
    expect(leftNum).eqls(2);
  });
});
