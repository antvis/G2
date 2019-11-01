const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const Global = require('../../../src/global');
const div = document.createElement('div');
div.id = 'cchartl';
document.body.appendChild(div);

describe('test line chart', () => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    animate: false
  });

  chart.source(data);
  chart.scale({
    genre: {
      alias: '游戏种类',
      range: [ 0, 1 ]
    },
    sold: {
      alias: '销售量'
    }
  });
  chart.line().position('genre*sold').color('#f80')
    .style({
      lineDash: [ 2, 2 ]
    });
  chart.render();
  let tmpPath;

  it('line points', () => {
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    tmpPath = path;
    expect(path.length).equal(5);
    expect(group.attr('matrix')).eqls([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);

  });

  it('line with null values', () => {
    const newData = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: null },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    chart.changeData(newData);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(2);
  });

  it('line with null values and connectNulls', () => {
    const newData = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: null },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    chart.get('viewTheme').connectNulls = true;
    chart.changeData(newData);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    Global.connectNulls = false;
  });

  it('change coord', () => {
    chart.coord().scale(1, -0.5);
    chart.changeData(data);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path[0]).eqls(tmpPath[0]);
    expect(group.attr('matrix')).not.eqls([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });

  it('in polar', () => {
    chart.coord('polar');
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
  });

  it('stack', () => {
    const data = [
      { genre: 'Sports', sold: 145, type: '2' },
      { genre: 'Strategy', sold: 415, type: '2' },
      { genre: 'Action', sold: 180, type: '2' },
      { genre: 'Shooter', sold: 50, type: '2' },
      { genre: 'Other', sold: 120, type: '2' },
      { genre: 'Sports', sold: 475, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' }
    ];
    chart.clear();
    chart.source(data);
    chart.coord('rect');
    chart.lineStack().position('genre*sold')
      .color('type')
      .label('type*sold', (type, sold) => type + sold, {
        textStyle: {
          fill: 'red'
        }
      });
    chart.render();

    const firstPath = chart.get('viewContainer').getFirst()
      .getFirst()
      .attr('path');
    const lastPath = chart.get('viewContainer').getFirst()
      .getLast()
      .attr('path');
    // 层叠
    expect(firstPath.length).equal(data.length / 2);
    expect(lastPath.length).equal(data.length / 2);
  });

  it('destroy', () => {
    chart.destroy();
    document.body.removeChild(div);
  });
});
