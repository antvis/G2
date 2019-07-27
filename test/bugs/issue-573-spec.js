const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#573', () => {
  it('innerRadius failed display in area shape when coordinates system setted as ploar.', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { value: 43000, categories: 'Sales', name: 'Allocated Budget' },
      { value: 19000, categories: 'Marketing', name: 'Allocated Budget' },
      { value: 60000, categories: 'Development', name: 'Allocated Budget' },
      { value: 35000, categories: 'Customer Support', name: 'Allocated Budget' },
      { value: 17000, categories: 'Information Technology', name: 'Allocated Budget' },
      { value: 10000, categories: 'Administration', name: 'Allocated Budget' },
      { value: 50000, categories: 'Sales', name: 'Actual Spending' },
      { value: 39000, categories: 'Marketing', name: 'Actual Spending' },
      { value: 42000, categories: 'Development', name: 'Actual Spending' },
      { value: 31000, categories: 'Customer Support', name: 'Actual Spending' },
      { value: 26000, categories: 'Information Technology', name: 'Actual Spending' },
      { value: 14000, categories: 'Administration', name: 'Actual Spending' }
    ];
    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });

    chart.source(data, {
      value: {
        min: 0,
        max: 65000,
        nice: false,
        tickInterval: 15000
      }
    });
    chart.coord('polar', { radius: 0.8, innerRadius: 0.5 });
    chart.legend('name', {
      position: 'bottom'
    });
    chart.axis('categories', { // 设置坐标系栅格样式
      line: null
    });
    chart.axis('value', {
      line: {
        lineWidth: 2
      },
      grid: {
        line: {
          lineDash: [ 0, 0 ],
          lineWidth: 1
        },
        alternateColor: 'rgba(204, 204, 204, 0.4)'
      }
    });
    const area = chart.area().position('categories*value').color('name');
    chart.render();
    const shapes = area.getShapes();
    const path = shapes[0].attr('path');
    expect(path[6][0]).to.equal('L');
    expect(path[6][1]).to.equal(280);
    expect(path[6][2]).to.equal(99.5769230769231);
    expect(path[7][0]).to.equal('L');
    expect(path[7][1]).to.equal(210.71796769724492);
    expect(path[7][2]).to.equal(192.5);
    expect(path[13][0]).to.equal('L');
    expect(path[13][1]).to.equal(210.71796769724492);
    expect(path[13][2]).to.equal(192.5);
    expect(path[14].length).to.equal(1);
  });
});
