const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#775 html customized legend hover event', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.id = 'issue775';

  it('hover event does not throws', () => {
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
      forceFit: true
    });

    chart.source(data, {
      genre: {
        alias: '游戏种类'
      },
      sold: {
        alias: '销售量'
      }
    });
    const titleId = 'test-customized-legend-title';
    const containerTpl = '<div class="g2-pagination-legend">' +
      `<div id="${titleId}">hahhaha </div>` +
      '<h4 class="g2-legend-title">xxxxx</h4>' +
      '<ul class="g2-legend-list"></ul>' +
      '</div>';
    const itemTpl = '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">'
      + '<i class="g2-legend-marker" style="background-color: {color};"></i>'
      + '<span class="g2-legend-text">{value}</span>'
      + '</li>';

    chart.legend('genre', {
      useHtml: true,
      containerTpl,
      itemTpl
    });

    chart.interval().position('genre*sold').color('genre');

    chart.render();

    const legendItem = div.getElementsByClassName('g2-legend-list-item')[1];
    expect(legendItem.className).to.equal('g2-legend-list-item item-1 checked');

    // simulating click event
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    expect(() => {
      legendItem.dispatchEvent(clickEvent);
    }).does.not.throw();
    expect(legendItem.className).to.equal('g2-legend-list-item item-1 unChecked');

    // simulating mouseover event
    const legendTitleDom = document.getElementById(titleId);
    const mouseoverEvent = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    expect(() => {
      legendTitleDom.dispatchEvent(mouseoverEvent);
    }).does.not.throw();
  });
});
