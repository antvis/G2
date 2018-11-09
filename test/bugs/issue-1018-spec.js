const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#1018', () => {
  it('shape config in viewTheme is not working', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 133 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1766 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
      { country: 'Oceania', year: '1750', value: 200 },
      { country: 'Oceania', year: '1800', value: 200 },
      { country: 'Oceania', year: '1850', value: 200 },
      { country: 'Oceania', year: '1900', value: 300 },
      { country: 'Oceania', year: '1950', value: 230 },
      { country: 'Oceania', year: '1999', value: 300 },
      { country: 'Oceania', year: '2050', value: 460 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true,
      theme: {
        shape: {
          hollowPoint: {
            // fill: 'red',
            lineWidth: 3,
            stroke: 'red'
            // radius: 3
          }
        }
      }
    });
    chart.source(data);

    // create point plot
    chart.point()
      .position('year*value')
      // .shape('hollowCircle')
      .size('value')
      .color('country');
    // Step 4: 渲染图表
    chart.render();

    const point = chart.getAllGeoms()[0].get('shapeContainer')._cfg.children[0];
    expect(point._attrs.lineWidth === 3);
    expect(point._attrs.stroke === 'red');
  });
});
