const expect = require('chai').expect;
const Chart = require('../../../src/index').Chart;
const div = document.createElement('div');
document.body.appendChild(div);

describe('test chart options', () => {
  let chart;
  const data = [
    { genre: 'Sports', sold: 275, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' },

    { genre: 'Sports', sold: 205, type: '2' },
    { genre: 'Strategy', sold: 125, type: '2' },
    { genre: 'Action', sold: 150, type: '2' },
    { genre: 'Shooter', sold: 300, type: '2' },
    { genre: 'Other', sold: 100, type: '2' }
  ];
  it('init', () => {
    chart = new Chart({
      width: 500,
      height: 500,
      container: div,
      data,
      options: {
        geoms: [{
          type: 'interval',
          position: 'genre*sold',
          color: { field: 'type' },
          adjust: 'stack',
          label: { field: 'sold' },
          animate: {
            appear: {
              animation: 'fadeIn', // 动画名称
              easing: 'easeQuadIn', // 动画缓动效果
              delay: 100, // 动画延迟执行时间
              duration: 2000 // 动画执行时间
            }
          }
        }]
      }
    });

    chart.render();

    expect(chart.get('geoms').length).eql(1);
    expect(chart.get('geoms')[0].get('attrOptions').position.field).eql('genre*sold');
    expect(chart.get('geoms')[0].get('attrOptions').color.field).eql('type');
  });

  xit('change', () => {
    chart.clear();
    const options = {
      geoms: [{
        type: 'area',
        position: 'genre*sold',
        color: { field: 'type' },
        adjust: 'stack',
        label: { field: 'sold' }
      }]
    };
    chart.changeOptions(options);
    chart.render();
  });

});
