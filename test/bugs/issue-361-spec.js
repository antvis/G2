// const expect = require('chai').expect;
const G2 = require('../../index');
const diamonds = require('../../demos/data/diamond.json');

describe('#361', () => {
  it('facet title error', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540
    });

    chart.source(diamonds, {
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      cut: {
        sync: true
      }
    });
    chart.facet('list', {
      fields: [ 'cut' ],
      cols: 3, // 超过3个换行
      padding: 30,
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .opacity(0.3)
          .size(3);
      }
    });
    chart.render();

  });
});
