const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#649', () => {
  it('time as y axis, can not show', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { type: '1', date: [ '2010-01-01', '2010-01-02' ], name: 'a' },
      { type: '2', date: [ '2010-01-02', '2010-01-03' ], name: 'b' },
      { type: '1', date: [ '2010-01-04', '2010-01-05' ], name: 'c' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: false,
      pixelRatio: 2
    });
    chart.source(data);
    chart.interval().position('name*date').color('type');

    chart.axis('date', {
      grid: {
        lineStyle: { stroke: 'red' }
      }
    });
    chart.guide().text({
      position: [ 'a', '2010-01-02' ],
      content: '休息休息',
      offetY: 10
    });
    // Step 4: 渲染图表
    chart.render();
    let enabled = false;
    chart.on('guide-text:click', () => {
      enabled = true;
    });
    const canvas = chart.get('canvas');
    canvas.emit('click', {
      type: 'click',
      x: 162 * 2,
      y: 338 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(enabled).eql(true);
  });
});
