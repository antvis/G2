const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1149', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('guide.html() and legend', () => {
    const tmpData2 = [
      { type: '深圳A', number: 103, group: '1' },
      { type: '深圳B', number: 130, group: '1' },
      { type: '杭州A', number: 60, group: '1' },
      { type: '杭州B', number: 50, group: '1' },
      { type: '成都A', number: 40, group: '1' },
      { type: '成都B', number: 22, group: '1' }
    ];
    const chart = new G2.Chart({
      container: div,
      height: 260,
      padding: [ 100, 'auto', 'auto', 'auto' ]
    });
    chart.guide().html({
      position: [ '50%', '50%' ],
      html: '<div style="color:#8c8c8c;font-size: 16px;text-align: center;width: 10em;line-height:1.5;">123</div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    chart.legend({ position: 'top' });
    chart.source(tmpData2);
    chart.coord('theta', {
      innerRadius: 0.75
    });

    chart.tooltip({
      showTitle: false
    });
    chart.legend({ position: 'left' });
    chart.intervalStack().position('number').color('type');

    chart.render();

    const itemsBBox = chart.get('legendController').legends['left-bottom'][0].get('itemsGroup').getBBox();

    expect(itemsBBox.maxX > 0).to.be.true;
    expect(itemsBBox.maxY > 0).to.be.true;
  });
});
