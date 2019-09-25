const expect = require('chai').expect;
const Chart = require('../../../../src/chart/chart');
const Tail = require('../../../../src/component/legend/tail');
require('../../../../src/geom/line');
require('../../../../src/geom/area');

const div = document.createElement('div');
div.id = 'tailLegendTest';
document.body.appendChild(div);

const data = [{ country: 'Europe', year: '1750', value: 163, type: 'a' },
{ country: 'Europe', year: '1800', value: 203, type: 'a' },
{ country: 'Europe', year: '1850', value: 276, type: 'c' },
{ country: 'Europe', year: '1900', value: 408, type: 'a' },
{ country: 'Europe', year: '1950', value: 547, type: 'a' },
{ country: 'Europe', year: '1999', value: 729, type: 'b' },
{ country: 'Europe', year: '2050', value: 628, type: 'b' }];

// const data2 = [{
//   country: 'Asia',
//   year: '1750',
//   value: 502
// }, {
//   country: 'Asia',
//   year: '1800',
//   value: 635
// }, {
//   country: 'Asia',
//   year: '1850',
//   value: 809
// }, {
//   country: 'Asia',
//   year: '1900',
//   value: 5268
// }, {
//   country: 'Asia',
//   year: '1950',
//   value: 4400
// }, {
//   country: 'Asia',
//   year: '1999',
//   value: 3634
// }, {
//   country: 'Asia',
//   year: '2050',
//   value: 947
// }];


let chart;
describe('tail legend', () => {
  it('line chart', () => {
    chart = new Chart({
      container: div,
      width: 600,
      height: 800,
      padding: 'auto',
      animate: false
    });
    chart.source(data);
    chart.legend({ attachLast: true });
    chart.line().position('year*value').color('country');
    chart.render();
    // 默认位置检测（right-top）
    const controller = chart.get('legendController');
    const legends = controller.legends;
    expect(legends).property('right-top');
    // legend类型检测
    const legend = legends['right-top'][0];
    expect(legend).to.be.an.instanceof(Tail);
    // // legend y轴坐标检测
    const group = legend.get('itemsGroup').get('children')[0];
    const y = group.attr('matrix')[7];
    const groupHeight = group.getBBox().height;
    const geomData = legend.get('geom').get('dataArray')[0];
    const lastY = geomData[geomData.length - 1].y;
    expect(y).to.equal(lastY - groupHeight / 2);
  });

  // it('area-line-stack chart', function() {
  //   chart.clear();
  //   chart.source(data2, {
  //     year: {
  //       type: 'linear',
  //       tickInterval: 50
  //     }
  //   });
  //   chart.legend({ attachLast: true });
  //   chart.areaStack().position('year*value').color('country');
  //   chart.line().position('year*value').color('country')
  //   .adjust('stack');
  //   chart.repaint();
  //   // 默认位置检测（right-top）
  //   const controller = chart.get('legendController');
  //   const legends = controller.legends;
  //   expect(legends).property('right-top');
  //   // legend类型检测
  //   const legend = legends['right-top'][0];
  //   expect(legend).to.be.an.instanceof(Tail);
  //   // legend y轴坐标检测
  //   const group = legend.get('itemsGroup').get('children')[0];
  //   const y = group.attr('matrix')[7];
  //   const groupHeight = group.getBBox().height;
  //   const geomData = legend.get('geom').get('dataArray')[0];
  //   const lastY = geomData[geomData.length - 1].y[1];
  //   expect(y).to.equal(lastY - groupHeight / 2);
  // });
});
