const G2 = require('../../src/index');
const plotRange2BBox = require('../../src/chart/util/plot-range2bbox');
const expect = require('chai').expect;

describe('#1079', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('result of auto padding is passable when title is too long', () => {
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
      width: 500,
      padding: [ 50, 'auto', 'auto', 'auto' ],
      limitInPlot: true
    });
    chart.source(data);
    chart.axis('sold', {
      title: {
        text: 'longlonglongtextlonglonglongtextlonglonglongtextlonglonglongtextlonglonglongtextlonglonglongtext'
      },
      position: 'left'
    });

    chart.axis('genre', {
      title: {
        text: 'anotherlonglonglongtextanotherlonglonglongtextanotherlonglonglongtextanotherlonglonglongtext'
      }
    });

    chart.interval().position('genre*sold').color('genre');

    chart.render();
    expect(() => {
      const bbox = plotRange2BBox(chart.get('plotRange'));
      expect((bbox.maxY - bbox.minY > 300 / 2)).to.be.true;
    }).not.to.throw();
  });
});
