const expect = require('chai').expect;
const DataSet = require('@antv/data-set');
const G2 = require('../../src/index');

describe('scaled coord label', () => {
  it('label offset', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const _DataSet = DataSet,
      DataView = _DataSet.DataView;

    let data = [{
      action: '浏览网站',
      pv: 50000
    }, {
      action: '放入购物车',
      pv: 35000
    }, {
      action: '生成订单',
      pv: 25000
    }, {
      action: '支付订单',
      pv: 15000
    }, {
      action: '完成交易',
      pv: 8000
    }];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'percent',
      field: 'pv',
      dimension: 'action',
      as: 'percent'
    });
    data = dv.rows;
    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      height: window.innerHeight,
      padding: [ 20, 120, 95 ]
    });
    chart.source(data, {
      percent: {
        nice: false
      }
    });
    chart.axis(false);
    chart.tooltip({
      showTitle: false
    });
    chart.coord('rect').transpose().scale(1, -1);
    chart.intervalSymmetric().position('action*percent')
      .shape('funnel')
      .color('action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
      .label('action*pv', (action, pv) => action + ' ' + pv, {
        offset: 35,
        labelLine: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.15)'
        }
      })
      .tooltip('action*pv*percent', (action, pv, percent) => ({
        name: action,
        percent: parseInt(percent * 100) + '%',
        pv
      }));
    data.forEach(obj => {
      // 中间标签文本
      chart.guide().text({
        top: true,
        position: {
          action: obj.action,
          percent: 'median'
        },
        content: parseInt(obj.percent * 100) + '%', // 显示的文本内容
        style: {
          fill: '#fff',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      });
    });
    chart.render();

    const container = chart.get('geoms')[0].get('labelContainer');
    const labels = container.get('labelsGroup');
    const labelLines = container.get('lineGroup');
    const attrs = labels.get('children')[0].get('attrs');
    const offset = container.get('labelItemCfgs')[0].offset;
    expect(offset).to.equal(35);
    expect(attrs.textAlign).to.equal('left');
    const path = labelLines.get('children')[0].attr('path');
    expect(path.join('').indexOf('NaN') < 0);
  });
});
