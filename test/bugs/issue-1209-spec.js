const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1209', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  it('mixed legend items', () => {
    const data = [
      { type: 'Sports', count1: 275, count2: 100 },
      { type: 'Strategy', count1: 115, count2: 87 },
      { type: 'Action', count1: 120, count2: 126 },
      { type: 'Shooter', count1: 350, count2: 35 },
      { type: 'Other', count1: 150, count2: 95 }
    ];

    const chart = new G2.Chart({
      container: div,
      height: 300,
      forceFit: true,
      padding: 'auto'
    });

    chart.source(data, {
      count1: {
        alias: '销售额'
      },
      count2: {
        alias: '销售量'
      }
    });


    chart.interval().position('type*count1');
    chart.interval().position('type*count2');
    chart.render();

    const legendController = chart.get('legendController');
    const legend = legendController.legends['bottom-center'][0];

    expect(legend.get('items')[0].value).to.equal('销售额');
    expect(legend.get('items')[0].field).to.equal('count1');
    expect(legend.get('items')[1].value).to.equal('销售量');
    expect(legend.get('items')[1].field).to.equal('count2');
  });
});
