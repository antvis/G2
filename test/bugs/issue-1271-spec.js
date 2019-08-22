// const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1271', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  it('gradient makes marker of tooltip disappear', done => {
    const data = [{
      year: '1991',
      value: 3
    }, {
      year: '1992',
      value: 4
    }, {
      year: '1993',
      value: 3.5
    }, {
      year: '1994',
      value: 5
    }, {
      year: '1995',
      value: 4.9
    }, {
      year: '1996',
      value: 6
    }, {
      year: '1997',
      value: 7
    }, {
      year: '1998',
      value: 9
    }, {
      year: '1999',
      value: 13
    }];

    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      height: window.innerHeight
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
    chart.line().position('year*value')
    .color('l(0) 0:#0088E1 1:#00E4F2');
    chart.point().position('year*value').size(4)
    .shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1
    });
    // chart.tooltip({
    //   useHtml: false
    // });
    chart.render();

    chart.showTooltip({ x: 100, y: 100 });

    setTimeout(function() {
      // const el = div.getElementsByClassName('g2-tooltip-marker')[0];
      // expect(el.style.backgroundColor).equal('rgb(0, 136, 225)');
      done();
    }, 300);
  });

});
