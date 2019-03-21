const expect = require('chai').expect;
const G2 = require('../../src/index');
const Util = G2.Util;

describe('#1231', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  it('keep default label textStyle when textStyle is a function and returns nothing', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
    ];
    const chart = new G2.Chart({
      container: div,
      forceFit: true
    });
    chart.source(data);
    chart.interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }])
      .label('name', {
        textStyle: name => {
          if (name === 'London') {
            return {
              fill: 'red'
            };
          }
          return null;
        }
      });
    chart.render();
    const geom = chart.getAllGeoms()[0];
    const labelItems = geom.get('labelContainer').get('labelItemCfgs');

    Util.each(labelItems, item => {
      expect(!!item.textStyle.fill).to.be.true;
    });
  });
});
