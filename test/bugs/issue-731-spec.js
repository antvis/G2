const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#731 全是负值时图形超出画布 ', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.id = 'issue731';

  let chart;
  it('柱状图，未进行列定义设置，默认从 0 开始生长', () => {
    const data = [
      { value: -139255.5, season: '第四季' },
      { value: -51926.5, season: '第三季' },
      { value: -49959.4, season: '第二季' },
      { value: -37099.9, season: '第一季' }
    ];
    chart = new G2.Chart({
      id: 'issue731',
      width: 500,
      height: 500,
      animate: false
    });
    chart.source(data);
    const geom = chart.interval().position('season*value');
    chart.render();

    const yScale = chart.getYScales()[0];
    expect(yScale.max).to.equal(0);

    // 测试柱状图并未超出画布
    const shapes = geom.getShapes();
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const origin = shape.get('origin');
      expect(origin.points[0].y).to.equal(1);
      expect(origin.points[3].y).to.equal(1);
    }
  });

  it('柱状图，进行列定义设置', () => {
    chart.scale('value', {
      max: 100000
    });
    chart.repaint();
    const yScale = chart.getYScales()[0];
    expect(yScale.max).to.equal(100000);

    const zeroPosition = chart.getXY({
      season: '第一季',
      value: 0
    });
    const geom = chart.get('geoms')[0];
    const shapes = geom.getShapes();
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const path = shape.attr('path');
      expect(path[0][2]).to.equal(zeroPosition.y);
    }
  });

  it('负区间区域图', () => {
    chart.clear();
    chart.scale('value', {});
    chart.area().position('season*value');
    chart.render();

    const geom = chart.get('geoms')[0];
    const dataArray = geom.get('dataArray')[0];
    // 区域图不超过坐标系区域
    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      expect(item.points[0].y).to.equal(1);
    }

    chart.destroy();
    document.body.removeChild(div);
  });
});
