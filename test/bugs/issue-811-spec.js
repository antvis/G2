const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#811 tooltip enterable', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('cant move on tooltip', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    // Step 1: 创建 Chart 对象
    const chart = new G2.Chart({
      container: div, // 指定图表容器 ID
      height: 300, // 指定图表高度
      width: 600
    });

    // Step 2: 载入数据源
    chart.source(data, {
      genre: {
        alias: '游戏种类' // 列定义，定义该属性显示的别名
      },
      sold: {
        alias: '销售量'
      }
    });
    chart.tooltip({
      enterable: true
    });
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre');

    // Step 4: 渲染图表
    chart.render();

    // 初始化
    chart.showTooltip({
      x: 438, y: 147
    });
    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const container = tooltip.get('container');
    expect(tooltip.get('prePosition').x).equal(438);
    expect(container.style.left).equal(438 - 1 - container.clientWidth + 'px');

    // 右移
    chart.showTooltip({
      x: 500, y: 147
    });
    expect(tooltip.get('prePosition').x).equal(500);
    expect(container.style.left).equal(500 - 1 - container.clientWidth + 'px');

    // 左移
    chart.showTooltip({
      x: 200, y: 147
    });
    expect(tooltip.get('prePosition').x).equal(200);
    expect(container.style.left).equal(200 + 1 + 'px');
  });
});
