const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('Default tooltip marker', () => {
  let div;
  let chart;
  before(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  it('Default tooltip marker', () => {
    const data = [
      { date: '2018/8/1', type: 'download', value: 4623 },
      { date: '2018/8/1', type: 'register', value: 2208 },
      { date: '2018/8/1', type: 'bill', value: 182 },
      { date: '2018/8/2', type: 'download', value: 6145 },
      { date: '2018/8/2', type: 'register', value: 2016 },
      { date: '2018/8/2', type: 'bill', value: 257 },
      { date: '2018/8/3', type: 'download', value: 508 },
      { date: '2018/8/3', type: 'register', value: 2916 },
      { date: '2018/8/3', type: 'bill', value: 289 },
      { date: '2018/8/4', type: 'download', value: 6268 },
      { date: '2018/8/4', type: 'register', value: 4512 },
      { date: '2018/8/4', type: 'bill', value: 428 },
      { date: '2018/8/5', type: 'download', value: 6411 },
      { date: '2018/8/5', type: 'register', value: 8281 },
      { date: '2018/8/5', type: 'bill', value: 619 },
      { date: '2018/8/6', type: 'download', value: 1890 },
      { date: '2018/8/6', type: 'register', value: 2008 },
      { date: '2018/8/6', type: 'bill', value: 87 },
      { date: '2018/8/7', type: 'download', value: 4251 },
      { date: '2018/8/7', type: 'register', value: 1963 },
      { date: '2018/8/7', type: 'bill', value: 706 },
      { date: '2018/8/8', type: 'download', value: 2978 },
      { date: '2018/8/8', type: 'register', value: 2367 },
      { date: '2018/8/8', type: 'bill', value: 387 },
      { date: '2018/8/9', type: 'download', value: 3880 },
      { date: '2018/8/9', type: 'register', value: 2956 },
      { date: '2018/8/9', type: 'bill', value: 488 },
      { date: '2018/8/10', type: 'download', value: 3606 },
      { date: '2018/8/10', type: 'register', value: 678 },
      { date: '2018/8/10', type: 'bill', value: 507 }
    ];

    chart = new G2.Chart({
      container: div,
      width: 400,
      height: 300,
      padding: [ 100, 20, 80, 50 ] // 上右下左
    });
    chart.source(data);
    chart.tooltip({
      follow: false,
      crosshairs: 'y',
      htmlContent: function htmlContent(title, items) {
        const alias = {
          download: '当日累计下载量',
          register: '当日累计注册量',
          bill: '当日累计成交量'
        };
        let html = '<div class="custom-tooltip">';
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const color = item.color;
          const name = alias[item.name];
          const value = item.value;
          const domHead = '<div class="custom-tooltip-item" style="border-left-color:' + color + '">';
          const domName = '<div class="custom-tooltip-item-name">' + name + '</div>';
          const domValue = '<div class="custom-tooltip-item-value">' + value + '</div>';
          const domTail = '</div>';
          html += domHead + domName + domValue + domTail;
        }
        return html + '</div>';
      }
    });
    chart.line().position('date*value').color('type');
    chart.render();

    const position = chart.getXY({ date: '2018/8/1', type: 'bill', value: 182 });
    chart.showTooltip(position);

    const tooltipDom = document.getElementsByClassName('custom-tooltip')[0];
    expect(tooltipDom.style.display).to.equal('block');
    expect(tooltipDom.style.visibility).to.equal('visible');
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(div);
  });
});
