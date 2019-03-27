const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1234', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  it('plot double click should excute twice', () => {

    const data = [{
      year: '1991',
      value: 3
    }, {
      year: '1992',
      value: 4
    }, {
      year: '1993',
      value: 3.5
    }, {
      year: '1994',
      value: 5
    }, {
      year: '1995',
      value: 4.9
    }, {
      year: '1996',
      value: 6
    }, {
      year: '1997',
      value: 7
    }, {
      year: '1998',
      value: 9
    }, {
      year: '1999',
      value: 13
    }];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      padding: [ 20, 120, 95 ],
      pixelRatio: 2
    });

    chart.source(data);
    chart.line().position('year*value');

    chart.render();

    let clickCount = 0,
      dblclickCount = 0;

    chart.on('plotclick', () => {
      clickCount++;
    });

    // simulating click event twice
    const canvas = chart.get('canvas');
    canvas.emit('click', {
      type: 'click',
      x: 350 * 2,
      y: 212 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(clickCount).to.equal(1);

    canvas.emit('click', {
      type: 'click',
      x: 350 * 2,
      y: 212 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(clickCount).to.equal(2);

    // simulating dblclick event
    chart.on('plotdblclick', () => {
      dblclickCount++;
    });
    canvas.emit('dblclick', {
      type: 'dblclick',
      x: 350 * 2,
      y: 212 * 2,
      event: {
        toElement: canvas.get('el')
      }
    });
    expect(dblclickCount).to.equal(1);
  });
});
