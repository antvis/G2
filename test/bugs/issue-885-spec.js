const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#885 findPoint is not working properly for points', () => {
  it('find point correctly', () => {
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
    chart.point().position('x*y').size(10);
    chart.render();
    expect(chart.getSnapRecords({
      x: 190,
      y: 150
    })[0]._origin).to.eql({
      x: 3,
      y: 3
    });
  });
});
