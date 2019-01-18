const expect = require('chai').expect;
const DataSet = require('@antv/data-set');
const G2 = require('../../src/index');
const data = require('../../demos/data/iris-flower.json');

describe('#1144', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('Violin plot throws error when data is empty', () => {
    const fields = [ 'PetalWidth', 'PetalLength', 'SepalWidth', 'SepalLength' ];
    const dv = new DataSet.View().source(data)
      .transform({
        type: 'kde',
        bandwidth: 0.15, // 计算概率函数的 bandwidth
        step: 0.1, // 计算采样点的数据间隔。注意不能比采样数据范围大
        extent: [ 0, 8 ], // 采样范围
        fields,
        as: [ 'key', 'y', 'size' ], // 生成的统计字段：字段名、采样点、采样点对应的概率值
        groupBy: [ 'key', 'Species' ],
        minSize: 1 // NOTICE data not exists
      });

    const chart = new G2.Chart({
      container: div,
      height: 300,
      width: 500,
      padding: [ 50, 'auto', 'auto', 'auto' ],
      limitInPlot: true
    });
    chart.source(dv);

    expect(() => {
      chart.violin()
        .position('key*y')
        .color('Species')
        .size('size')
        .adjust({
          type: 'dodge',
          marginRatio: 1 / 32
        });
      chart.render();
    }).not.to.throw();
  });
});
