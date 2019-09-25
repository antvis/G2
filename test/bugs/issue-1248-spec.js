const G2 = require('../../src/index');

describe('#1248', () => {
  it('null data draw point', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const data = [{
      name: 'London',
      month: 'Jan.',
      rain: 18.9
    }, {
      name: 'London',
      month: 'Feb.',
      rain: 28.8
    }, {
      name: 'London',
      month: 'Mar.',
      rain: 39.3
    }, {
      name: 'London',
      month: 'Apr.',
      rain: 81.4
    }, {
      name: 'London',
      month: 'May',
      rain: 47
    }, {
      name: 'London',
      month: 'Jun.',
      rain: 20.3
    }, {
      name: 'London',
      month: 'Jul.',
      rain: 24
    }, {
      name: 'London',
      month: 'Aug.',
      rain: 35.6
    }, {
      name: 'Berlin',
      month: 'Jan.',
      rain: 12.4
    }, {
      name: 'Berlin',
      month: 'Feb.',
      rain: 23.2
    }, {
      name: 'Berlin',
      month: 'Mar.',
      rain: 34.5
    }, {
      name: 'Berlin',
      month: 'Apr.',
      rain: 99.7
    }, {
      name: 'Berlin',
      month: 'May',
      rain: 52.6
    }, {
      name: 'Berlin',
      month: 'Jun.',
      rain: 35.5
    }, {
      name: 'Berlin',
      month: 'Jul.',
      rain: 37.4
    }, {
      name: 'Berlin',
      month: 'Aug.',
      rain: 42.4
    }];

    const chart = new G2.Chart({
      container: div,
      forceFit: true
    });

    chart.source(data);
    chart.interval().position('month*rain')
      .color('month') // change 'month' to 'name' works fine
      .adjust([{
        type: 'dodge',
        dodgeBy: 'name',
        marginRatio: 1 / 32
      }]);

    chart.render();
  });
});
