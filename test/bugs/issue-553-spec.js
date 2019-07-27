const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#553', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('guide line click', () => {

    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付订单', pv: 15000 },
      { action: '完成交易', pv: 8000 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      padding: [ 20, 120, 95 ],
      pixelRatio: 2
    });
    chart.source(data);
    chart.interval()
      .position('action*pv')
      .color('action')
      .label('pv');
    chart.guide().line({
      appendInfo: { a: 1, b: 2 },
      top: true,
      start: [ '0%', '50%' ],
      end: [ '100%', '50%' ],
      lineStyle: {
        lineWidth: 5,
        lineDash: null
      }
    });
    chart.tooltip(false);
    chart.legend(false);

    chart.guide().text({
      top: true,
      position: [ '50%', '60%' ],
      content: '这是文本'
    });
    let lineClickCalled = false;
    let textClickCalled = false;
    let labelClick = false;
    chart.on('guide-line:click', () => {
      lineClickCalled = true;
      // console.log(ev);
    });
    chart.on('guide-text:click', () => {
      textClickCalled = true;
      // console.log(ev);
    });
    chart.on('label:click', () => {
      labelClick = true;
      // console.log(ev);
    });
    chart.render();

    const canvas = chart.get('canvas');
    canvas.emit('click', {
      type: 'click',
      x: 350 * 2,
      y: 212 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(lineClickCalled).equal(true);

    canvas.emit('click', {
      type: 'click',
      x: 267 * 2,
      y: 247 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(textClickCalled).equal(true);

    canvas.emit('click', {
      type: 'click',
      x: 249 * 2,
      y: 193 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(labelClick).equal(true);
  });
});
