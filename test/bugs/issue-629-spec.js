const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#629', () => {
  it('crashed when call geom.hide() before chart.render()', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [{ year: '1991', value: 3 }, { year: '1992', value: 4 }, { year: '1993', value: 3.5 }, { year: '1994', value: 5 }, { year: '1995', value: 4.9 }, { year: '1996', value: 6 }, { year: '1997', value: 7 }, { year: '1998', value: 9 }, { year: '1999', value: 13 }];
    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });

    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [ 0, 1 ]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    const line = chart.line().position('year*value');
    chart.point()
      .position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });

    expect(() => {
      line.hide();
      chart.render();
    }).to.not.throw();
  });
});
