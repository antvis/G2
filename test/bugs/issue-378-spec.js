const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#378', () => {
  it('animate axis label', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
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
      width: 500,
      height: 300,
      padding: [ 30, 60, 60, 60 ],
      animate: false
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
    // barView.interval().position('name*value').color('type0').adjust(['dodge']);


    const lineView = chart.view();
    lineView.source(dataLine);
    lineView.line().position('name*value').color('type');

    // chart.interval().position('name*value0').color('type0').adjust(['dodge']);
    // chart.point().position('name*value0').color('type').size(3).shape('circle');

    // chart.line().position('name*value1').color('type');
    // chart.point().position('name*value1').color('type').size(3).shape('circle');

    chart.render();

    let i = 2004;
    setTimeout(() => {
      i += 1;
      dataBar.push({
        name: i + '',
        value: Math.random() * 500 + 2500,
        type0: '机房0'
      });
      dataLine.push({
        name: i + '',
        value: Math.random() * 500 + 2500,
        type: '机房2'
      });

      if (dataBar.length > 10) {
        dataBar.shift();
      }

      // barView.changeData(dataBar);
      lineView.changeData(dataLine);
      const scale = lineView.get('scales').name;
      const ticks = scale.getTicks();
      expect(ticks[0].tickValue).not.equal(undefined);
      // chart.changeData(data);
      // chart.destroy();
      done();
    }, 500);
  });

  it('animate dodge label override', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },

      { genre: 'Sports', sold: 175, type: '2' },
      { genre: 'Strategy', sold: 215, type: '2' },
      { genre: 'Action', sold: 220, type: '2' },
      { genre: 'Shooter', sold: 250, type: '2' },
      { genre: 'Other', sold: 50, type: '2' }
    ];
    const data1 = [

      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Sports', sold: 275, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },

      { genre: 'Strategy', sold: 115, type: '2' },
      { genre: 'Sports', sold: 275, type: '2' },
      { genre: 'Action', sold: 120, type: '2' },
      { genre: 'Shooter', sold: 350, type: '2' },
      { genre: 'Other', sold: 150, type: '2' }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540
    });

    chart.source(data);

    const interval = chart.intervalDodge()
      .position('genre*sold')
      .color('type')
      .label('sold');

    chart.render();
    setTimeout(() => {
      chart.changeData(data1);
      const labels = interval.get('labelContainer').get('labelsGroup').get('children');
      expect(labels[0].attr('x') - labels[5].attr('x')).equal(50);
      chart.destroy();
      done();
    }, 600);
  });
});
