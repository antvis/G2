const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#678', () => {
  it('rgba color is not correctly parsed', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div, // 指定图表容器 ID
      height: 300, // 指定图表高度
      forceFit: true
    });

    chart.source(data, {
      genre: {
        alias: '游戏种类' // 列定义，定义该属性显示的别名
      },
      sold: {
        alias: '销售量'
      }
    });

    // 开启图例则在图例获取颜色时报错，关闭图例则在绘制geom时报错，最终报错路径一致。
    // chart.legend(false);

    // 使用数据值映射颜色时，如果设置了rgba值，就会报错。
    // 使用 .color('rgba(235, 0, 0, 0.5)') 不会报错。
    expect(() => {
      chart.interval().position('genre*sold').color('genre', 'rgba(235, 0, 0, 0.5)');
      chart.render();
    }).to.not.throw();
  });
});
