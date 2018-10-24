const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#974', () => {
  it('customized axis title', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      {
        startTime: '2018-12-12 19:28:41',
        duration: 3,
        period: '2018-12-8 19:28:41'
      },
      {
        startTime: '2018-12-12 19:33:11',
        duration: 3,
        period: '2018-12-9 19:33:11'
      },
      {
        startTime: '2018-12-12 19:37:17',
        duration: 4,
        period: '2018-12-10 19:37:17'
      },
      {
        startTime: '2018-12-12 19:28:30',
        duration: 3,
        period: '2018-12-11 19:28:30'
      },
      {
        startTime: '2018-12-12 19:33:01',
        duration: 4,
        period: '2018-12-12 19:33:01'
      },
      {
        startTime: '2018-12-12 19:37:17',
        duration: 4,
        period: '2018-12-12 19:37:17'
      }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });
    chart.source(data, {
      startTime: {
        mask: 'HH:mm:ss'
      }
    });
    chart.axis('period', {
      title: {
        text: 'test'
      }
    });

    // create point plot
    chart.line().position('period*startTime').color('#1ac44d');
    // Step 4: 渲染图表
    chart.render();
    expect(chart.get('axisController').axes[0].get('title').text).to.equal('test');
  });
});
