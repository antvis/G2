const expect = require('chai').expect;
const G2 = require('../../src/index');
describe('tooltip locked test', function() {
  it('locked tooltip', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 }
    ];

    const chart = new G2.Chart({
      container: div,
      padding: 0,
      width: 400,
      height: 400
    });
    chart.source(data);
    chart.line().position('x*y');
    chart.render();
    chart.showTooltip({ x: 100, y: 100 });
    const tooltip = chart.get('tooltipController').tooltip;
    const preX = tooltip.get('x');
    const preY = tooltip.get('y');
    chart.lockTooltip();
    chart.get('canvas').emit('mousemove', {
      x: 125,
      y: 120,
      event: {}
    });
    expect(tooltip.get('x')).eqls(preX);
    expect(tooltip.get('y')).eqls(preY);

    chart.unlockTooltip();
    chart.get('canvas').emit('mousemove', {
      x: 245,
      y: 120,
      event: {}
    });

    expect(tooltip.get('x')).not.eqls(preX);
    expect(tooltip.get('y')).not.eqls(preY);
  });

});
