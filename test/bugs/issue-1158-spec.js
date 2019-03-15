const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1158', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let chart;

  it('some marker symbol not work', () => {
    const data = [
      { company: 'Apple', type: '整体', value: 30 },
      { company: 'Facebook', type: '整体', value: 35 },
      { company: 'Google', type: '整体', value: 28 },
      { company: 'Apple', type: '非技术岗', value: 40 },
      { company: 'Facebook', type: '非技术岗', value: 65 },
      { company: 'Google', type: '非技术岗', value: 47 },
      { company: 'Apple', type: '技术岗', value: 23 },
      { company: 'Facebook', type: '技术岗', value: 18 },
      { company: 'Google', type: '技术岗', value: 20 },
      { company: 'Apple', type: '技术岗', value: 35 },
      { company: 'Facebook', type: '技术岗', value: 30 },
      { company: 'Google', type: '技术岗', value: 25 }
    ];

    chart = new G2.Chart({
      container: div,
      width: 400,
      height: 300,
      padding: 'auto'
    });
    chart.source(data);
    chart.scale('value', {
      alias: '占比（%）',
      max: 75,
      min: 0,
      tickCount: 4
    });

    chart.legend({
      position: 'top-center',
      custom: true,
      items: [
        {
          value: 'hahaha',
          fill: 'red',
          marker: 'tick' // not working
        }
      ]
    });
    chart.interval().position('type*value').color('company')
      .opacity(1)
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
    chart.render();

    const legendControler = chart.get('legendController');
    const legend = legendControler.legends['top-center'][0];
    expect(legend.get('items')[0].marker).to.eql({
      radius: 4.5,
      stroke: 'red',
      symbol: 'tick'
    });
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(div);
  });
});
