const expect = require('chai').expect;
const DataSet = require('@antv/data-set');
const G2 = require('../../src/index');

describe('#1146', () => {
  it('venn label', () => {
    const data = [
      { sets: [ '人传人领取红包活动' ], size: 27086351, origin: '人传人领取红包活动', label: '人传人领取红包活动' },
      { sets: [ '奖励金活动' ], size: 11053797, origin: '奖励金活动', label: '奖励金活动' },
      { sets: [ '12月线下瓜分15亿发奖活动' ], size: 735435, origin: '12月线下瓜分15亿发奖活动', label: '12月线下瓜分15亿发奖活动' },
      { sets: [ '积分兑换-线下付款1元红包' ], size: 379444, origin: '积分兑换-线下付款1元红包', label: '积分兑换-线下付款1元红包' },
      { sets: [ '人传人领取红包活动', '奖励金活动' ], size: 6301992, origin: '人传人领取红包活动,奖励金活动', label: '人传人领取红包活动&奖励金活动' },
      { sets: [ '人传人领取红包活动', '奖励金活动', '积分兑换-线下付款1元红包' ], size: 194872, origin: '人传人领取红包活动,奖励金活动,积分兑换-线下付款1元红包', label: '人传人领取红包活动&奖励金活动&积分兑换-线下付款1元红包' },
      { sets: [ '人传人领取红包活动', '积分兑换-线下付款1元红包' ], size: 177098, origin: '人传人领取红包活动,积分兑换-线下付款1元红包', label: '人传人领取红包活动&积分兑换-线下付款1元红包' },
      { sets: [ '奖励金活动', '积分兑换-线下付款1元红包' ], size: 142761, origin: '奖励金活动,积分兑换-线下付款1元红包', label: '奖励金活动&积分兑换-线下付款1元红包' },
      { sets: [ '12月线下瓜分15亿发奖活动', '人传人领取红包活动' ], size: 140408, origin: '12月线下瓜分15亿发奖活动,人传人领取红包活动', label: '12月线下瓜分15亿发奖活动&人传人领取红包活动' },
      { sets: [ '12月线下瓜分15亿发奖活动', '奖励金活动' ], size: 33998, origin: '12月线下瓜分15亿发奖活动,奖励金活动', label: '12月线下瓜分15亿发奖活动&奖励金活动' },
      { sets: [ '12月线下瓜分15亿发奖活动', '人传人领取红包活动', '奖励金活动' ], size: 21741, origin: '12月线下瓜分15亿发奖活动,人传人领取红包活动,奖励金活动', label: '12月线下瓜分15亿发奖活动&人传人领取红包活动&奖励金活动' },
      { sets: [ '12月线下瓜分15亿发奖活动', '积分兑换-线下付款1元红包' ], size: 854, origin: '12月线下瓜分15亿发奖活动,积分兑换-线下付款1元红包', label: '12月线下瓜分15亿发奖活动&积分兑换-线下付款1元红包' },
      { sets: [ '12月线下瓜分15亿发奖活动', '人传人领取红包活动', '积分兑换-线下付款1元红包' ], size: 300, origin: '12月线下瓜分15亿发奖活动,人传人领取红包活动,积分兑换-线下付款1元红包', label: '12月线下瓜分15亿发奖活动&人传人领取红包活动&积分兑换-线下付款1元红包' },
      { sets: [ '12月线下瓜分15亿发奖活动', '人传人领取红包活动', '奖励金活动', '积分兑换-线下付款1元红包' ], size: 279, origin: '12月线下瓜分15亿发奖活动,人传人领取红包活动,奖励金活动,积分兑换-线下付款1元红包', label: '12月线下瓜分15亿发奖活动&人传人领取红包活动&奖励金活动&积分兑换-线下付款1元红包' },
      { sets: [ '12月线下瓜分15亿发奖活动', '奖励金活动', '积分兑换-线下付款1元红包' ], size: 225, origin: '12月线下瓜分15亿发奖活动,奖励金活动,积分兑换-线下付款1元红包', label: '12月线下瓜分15亿发奖活动&奖励金活动&积分兑换-线下付款1元红包' }
    ];
    const div = document.createElement('div');
    document.body.appendChild(div);

    const dv = new DataSet.DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'size',           // 统计销量
      dimension: 'label',       // 每年的占比
      // groupBy: [ 'size' ], // 以不同产品类别为分组，每个分组内部各自统计占比
      as: 'percent'            // 结果存储在 percent 字段
    });

    const chart = new G2.Chart({
      container: div,
      height: 640,
      // width: 500,
      forceFit: true,
      padding: [ 50, 'auto', 'auto', 'auto' ],
      // limitInPlot: true,
      renderer: 'svg'
    });
    chart.source(dv);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart.venn()
      .position('x*y')
      .sets('sets')
      .label('_sets', {
        type: 'scatter',
        offset: 0,
        textStyle(text, item) {
          return {
            textAlign: 'center',
            fill: item.color
          };
        }
      })
      .size('size') // 这个字段用来获取集合 size
      .color('id')
      .shape('hollow')
      .active(false)
      .style({
        lineWidth: 2,
        padding: 10,
        textStyle: {
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'bold' // 文本粗细
        }
      });

    // chart.point()
    //   .position('x*y')
    //   .shape('circle')
    //   .color('black');

    chart.render();

    expect(chart.getAllGeoms()[0].get('labelContainer').get('labelItemCfgs')[0].type).to.equal('scatter');
  });
});
