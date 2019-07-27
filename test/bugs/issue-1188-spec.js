const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1188', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('auto padding blocks axis title', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      height: 300,
      forceFit: true,
      renderer: 'svg',
      padding: 'auto'
    });

    chart.source(data, {
      genre: {
        alias: '游戏种类' // 列定义，定义该属性显示的别名
      },
      sold: {
        alias: '销售量'
      }
    });

    chart.axis('genre', {
      title: true
    });

    chart.interval().position('genre*sold');
    chart.render();

    const axisController = chart.get('axisController');
    const axisShapes = axisController.axes[0].get('group').get('children');
    let titleShape = null;
    G2.Util.each(axisShapes, shape => {
      if (shape.name === 'axis-title') {
        titleShape = shape;
      }
    });
    // visible
    expect(titleShape.attr('x') > 0 && titleShape.attr('x') < chart.get('width')).to.be.true;
    expect(titleShape.attr('y') > 0 && titleShape.attr('y') < chart.get('height')).to.be.true;
  });
});
