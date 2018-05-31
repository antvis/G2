const expect = require('chai').expect;
const Chart = require('../../../../src/chart/chart');
require('../../../../src/geom/line');
const LegendController = require('../../../../src/chart/controller/legend');

const div = document.createElement('div');
div.id = 'legendTest';
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

const chartWidth = 400;
const chartHeight = 300;

describe('LegendController', function() {
  const chart = new Chart({
    container: div,
    width: chartWidth,
    height: chartHeight,
    padding: 'auto',
    animate: false
  });


  it('initialization', function() {
    const legendController = new LegendController({ chart });
    expect(legendController).to.be.an.instanceof(LegendController);
    expect(legendController.legends).to.be.empty;
  });

  it('legendPosition right-bottom', function() {
    chart.source(data);
    chart.legend({ position: 'right-center' });
    chart.line().position('year*value').color('country');
    chart.render();
    const legend = chart.get('legendController').legends.right_center[0];
    const x = legend.get('x');
    const y = legend.get('y');
    const height = legend.getHeight();
    expect(x).to.equal(324.48046875);
    expect(y).to.equal((chartHeight - height) / 2);
  });

  it('legendPosition top-left', function() {
    chart.legend({ position: 'top-left' });
    chart.repaint();
    const legend = chart.get('legendController').legends.top_left[0];
    const x = legend.get('x');
    const y = legend.get('y');
    expect(x).to.equal(6.5);
    expect(y).to.equal(13);
  });

});
