const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#368', () => {
  it('tooltip change', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540
    });

    chart.source(data);

    chart.line()
      .position('genre*sold')
      .color('red');

    chart.render();
    let num = 0;
    chart.on('tooltip:change', () => {
      num++;
    });

    chart.showTooltip({
      x: 200,
      y: 200
    });

    chart.showTooltip({
      x: 200,
      y: 201
    });

    expect(num).equal(1);

    chart.destroy();
  });
  it('tooltip:change and change title', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 540,
      height: 540,
      animate: false
    });

    chart.source(data);

    chart.line()
      .position('genre*sold')
      .color('red');

    chart.render();
    chart.on('tooltip:change', ev => {
      const items = ev.items;
      items[0].title = 'xxx';
    });

    chart.showTooltip({
      x: 200,
      y: 201
    });

    const controller = chart.get('tooltipController');
    const tooltip = controller.tooltip;
    expect(tooltip.get('titleContent')).equal('xxx');
    chart.destroy();
  });
});
