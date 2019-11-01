const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('sync bug', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('sync no effect', () => {
    const data = [
      {
        name: '2000',
        value: 3892,
        type0: '机房0'
      },
      {
        name: '2001',
        value: 7892,
        type0: '机房0'
      },
      {
        name: '2002',
        value: 4714,
        type0: '机房0'
      },
      {
        name: '2003',
        value: 5954,
        type0: '机房0'
      },
      {
        name: '2004',
        value: 2814,
        type0: '机房0'
      },

      {
        name: '2000',
        value: 2892,
        type0: '机房1'
      },
      {
        name: '2001',
        value: 6292,
        type0: '机房1'
      },
      {
        name: '2002',
        value: 5714,
        type0: '机房1'
      },
      {
        name: '2003',
        value: 5354,
        type0: '机房1'
      },
      {
        name: '2004',
        value: 2014,
        type0: '机房1'
      },

      {
        name: '2000',
        value: 11751,
        type: '机房2'
      },
      {
        name: '2001',
        value: 4078,
        type: '机房2'
      },
      {
        name: '2002',
        value: 2175,
        type: '机房2'
      },
      {
        name: '2003',
        value: 12048,
        type: '机房2'
      },
      {
        name: '2004',
        value: 1748,
        type: '机房2'
      }
    ];

    const dataLine = data.filter(d => {
      return !!d.type;
    });

    const dataBar = data.filter(d => {
      return !!d.type0;
    });

    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      // width: 100,
      height: 300,
      padding: [ 30, 60, 60, 60 ]
    });
    chart.scale({
      name: {
        type: 'timeCat'
      },
      value: {
        type: 'linear',
        sync: true
      }
    });
    // chart.legend(false);
    chart.tooltip({
      crosshairs: {}
    });

    const barView = chart.view();
    barView.source(dataBar);
    barView.interval()
      .position('name*value')
      .color('type0')
      .adjust([ 'dodge' ]);


    const lineView = chart.view();
    lineView.source(dataLine);
    lineView.line().position('name*value').color('type');

    // chart.interval().position('name*value0').color('type0').adjust(['dodge']);
    // chart.point().position('name*value0').color('type').size(3).shape('circle');

    // chart.line().position('name*value1').color('type');
    // chart.point().position('name*value1').color('type').size(3).shape('circle');

    chart.render();

    const aixs1 = barView.get('axisController').axes[1];
    const aixs2 = lineView.get('axisController').axes[1];
    expect(aixs1.get('labelRenderer').get('group').getCount()).equal(aixs2.get('labelRenderer').get('group').getCount());
  });
});
