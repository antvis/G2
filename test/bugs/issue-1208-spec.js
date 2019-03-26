const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1208', () => {
  it('Scale alias should be effective in axis title when data length is 0', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      // { genre: 'Sports', sold: 275 },
      // { genre: 'Strategy', sold: 115 },
      // { genre: 'Action', sold: 120 },
      // { genre: 'Shooter', sold: 350 },
      // { genre: 'Other', sold: 150 }
    ];
    const chart = new G2.Chart({
      container: div,
      padding: 80
    });
    chart.source(data, {
      genre: {
        alias: '游戏种类'
      },
      sold: {
        alias: '销售量'
      },
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    chart.axis('genre', {
      title: true
    });
    chart.axis('sold', {
      title: true
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    const axisController = chart.get('axisController');
    const xTitle = axisController.axes[0].get('title').text;
    const yTitle = axisController.axes[1].get('title').text;
    expect(xTitle).to.equal('游戏种类');
    expect(yTitle).to.equal('销售量');

    expect(() => {
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      chart.guide().html({
        position: [ '50%', '50%' ],
        html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
        alignX: 'middle',
        alignY: 'middle'
      });
      chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
          formatter: function formatter(val, item) {
            return item.point.item + ': ' + val;
          }
        })
        .tooltip('item*percent', function(item, percent) {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
    }).to.not.throw();
  });
});
