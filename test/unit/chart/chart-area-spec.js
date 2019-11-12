const expect = require('chai').expect;
const Chart = require('../../../src/index').Chart;
const Global = require('../../../src/global');
const div = document.createElement('div');
div.id = 'ccharta';
document.body.appendChild(div);

describe('test area chart', () => {
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
      alias: '游戏种类'
    },
    sold: {
      alias: '销售量'
    }
  });
  chart.area().position('genre*sold').color('#f80')
    .style({
      lineDash: [ 2, 2 ]
    });
  chart.render();
  it('basic area', () => {

    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 1);
  });

  it('area range', () => {
    const newData = [
      { genre: 'Sports', sold: [ 10, 275 ] },
      { genre: 'Strategy', sold: [ 50, 115 ] },
      { genre: 'Action', sold: [ 40, 200 ] },
      { genre: 'Shooter', sold: [ 200, 350 ] },
      { genre: 'Other', sold: [ 100, 150 ] }
    ];
    chart.changeData(newData);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);
    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 1);
  });

  it('area with null', () => {
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

  it('area with null and connectNulls', () => {
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

  it('area in polar', () => {
    chart.coord('polar');
    chart.changeData(data);
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(1);

    const path = group.getFirst().attr('path');
    expect(path.length).equal(data.length * 2 + 3);
  });

  it('destroy', () => {
    chart.destroy();
    document.body.removeChild(div);
  });
});

describe('test area adjusted', () => {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' },

    { genre: 'Sports', sold: 145, type: '2' },
    { genre: 'Strategy', sold: 415, type: '2' },
    { genre: 'Action', sold: 180, type: '2' },
    { genre: 'Shooter', sold: 50, type: '2' },
    { genre: 'Other', sold: 120, type: '2' }
  ];

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500,
    animate: false
  });

  chart.source(data);

  it('stack', () => {
    chart.areaStack().position('genre*sold').color('type');
    chart.render();

    const firstPath = chart.get('viewContainer').getFirst()
                           .getFirst()
                           .attr('path');
    const lastPath = chart.get('viewContainer').getFirst()
                          .getLast()
                          .attr('path');
    // 层叠
    expect(firstPath[0][1]).equal(lastPath[lastPath.length - 2][1]);
    expect(firstPath[1][1]).equal(lastPath[lastPath.length - 3][1]);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });

});
