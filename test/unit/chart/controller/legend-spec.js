const expect = require('chai').expect;
const Chart = require('../../../../src/chart/chart');
const LegendController = require('../../../../src/chart/controller/legend');
const Global = require('../../../../src/global');
const Line = require('../../../../src/geom/line');
require('../../../../src/geom/point');

const div = document.createElement('div');
div.id = 'legendTest';
document.body.appendChild(div);

const data = [
  { country: 'Asia', year: '1750', value: 502, type: 'a' },
  { country: 'Asia', year: '1800', value: 635, type: 'a' },
  { country: 'Asia', year: '1850', value: 809, type: 'b' },
  { country: 'Asia', year: '1900', value: 947, type: 'a' },
  { country: 'Asia', year: '1950', value: 1402, type: 'a' },
  { country: 'Asia', year: '1999', value: 3634, type: 'b' },
  { country: 'Asia', year: '2050', value: 5268, type: 'a' },
  { country: 'Africa', year: '1750', value: 106, type: 'a' },
  { country: 'Africa', year: '1800', value: 107, type: 'a' },
  { country: 'Africa', year: '1850', value: 111, type: 'c' },
  { country: 'Africa', year: '1900', value: 133, type: 'a' },
  { country: 'Africa', year: '1950', value: 221, type: 'b' },
  { country: 'Africa', year: '1999', value: 767, type: 'a' },
  { country: 'Africa', year: '2050', value: 1766, type: 'a' },
  { country: 'Europe', year: '1750', value: 163, type: 'a' },
  { country: 'Europe', year: '1800', value: 203, type: 'a' },
  { country: 'Europe', year: '1850', value: 276, type: 'c' },
  { country: 'Europe', year: '1900', value: 408, type: 'a' },
  { country: 'Europe', year: '1950', value: 547, type: 'a' },
  { country: 'Europe', year: '1999', value: 729, type: 'b' },
  { country: 'Europe', year: '2050', value: 628, type: 'b' },
  { country: 'Oceania', year: '1750', value: 200, type: 'a' },
  { country: 'Oceania', year: '1800', value: 200, type: 'a' },
  { country: 'Oceania', year: '1850', value: 200, type: 'a' },
  { country: 'Oceania', year: '1900', value: 300, type: 'a' },
  { country: 'Oceania', year: '1950', value: 230, type: 'c' },
  { country: 'Oceania', year: '1999', value: 300, type: 'a' },
  { country: 'Oceania', year: '2050', value: 460, type: 'a' }
];

const chartWidth = 400;
const chartHeight = 500;

let canvas;

describe('LegendController', () => {
  const chart = new Chart({
    container: div,
    width: chartWidth,
    height: chartHeight,
    padding: 'auto',
    animate: false
  });


  it('initialization', () => {
    const legendController = new LegendController({ chart });
    expect(legendController).to.be.an.instanceof(LegendController);
    expect(legendController.legends).to.be.empty;
  });

  it('legendPosition right-center', () => {
    chart.source(data);
    chart.legend({ position: 'right-center' });
    chart.line().position('year*value').color('country');
    chart.render();
    canvas = chart.get('canvas');
    const controller = chart.get('legendController');
    const legend = controller.legends['right-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const height = legend.getHeight();
    const backRange = controller.getBackRange();
    const chartHeight = canvas.get('height');
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal((chartHeight - height) / 2);
  });

  it('legendPosition right-bottom', () => {
    chart.legend({ position: 'right-bottom' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['right-bottom'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const height = legend.getHeight();
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    const plotRange = controller.plotRange;
    const plotHeight = plotRange.br.y;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal(plotHeight - height);
  });

  it('legendPosition right-top', () => {
    chart.legend({ position: 'right-top' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['right-top'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal(backRange.minY - borderMargin[0]);
  });

  it('legendPosition left-center', () => {
    chart.legend({ position: 'left-center' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['left-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const height = legend.getHeight();
    const chartHeight = canvas.get('height');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.minX - width - borderMargin[3] < 0 ? 0 : backRange.minX - width - borderMargin[3]);
    expect(y).to.equal((chartHeight - height) / 2);
  });

  it('legendPosition top-left', () => {
    chart.legend({ position: 'top-left' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-left'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const offsetY = legend.get('offset')[1];
    const height = legend.getHeight();
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.minX - borderMargin[3]);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition top-center', () => {
    chart.legend({ position: 'top-center' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const height = legend.getHeight();
    const offsetY = legend.get('offset')[1];
    const canvasWidth = canvas.get('width');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal((canvasWidth - width) / 2);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition top-right', () => {
    chart.legend({ position: 'top-right' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-right'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const height = legend.getHeight();
    const offsetY = legend.get('offset')[1];
    const plotRange = controller.plotRange;
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(plotRange.br.x - width);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition bottom-center', () => {
    chart.legend({ position: 'bottom-center' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['bottom-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const offsetY = legend.get('offset')[1];
    const canvasWidth = canvas.get('width');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal((canvasWidth - width) / 2);
    expect(y).to.equal(backRange.maxY + borderMargin[2] + offsetY);
  });

  it('legendPosition right-center multi-shapes', () => {
    chart.clear();
    chart.legend({ position: 'right-center' });
    chart.point().position('year*value').color('country').
    shape('type');
    chart.render();
    const controller = chart.get('legendController');
    const legend = controller.legends['right-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const totalHeight = controller._getRegion().totalHeight;
    const chartHeight = canvas.get('height');
    const offsetY = legend.get('offset')[1];
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal((chartHeight - totalHeight) / 2 + offsetY);
  });

  it('legendPosition right-top multi-shapes', () => {
    chart.legend({ position: 'right-top' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['right-top'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal(backRange.minY - borderMargin[0]);
  });

  it('legendPosition right-bottom multi-shapes', () => {
    chart.legend({ position: 'right-bottom' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['right-bottom'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const plotRange = controller.plotRange;
    const plotHeight = plotRange.br.y;
    const totalHeight = controller._getRegion().totalHeight;
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.maxX + borderMargin[1]);
    expect(y).to.equal(plotHeight - totalHeight);
  });

  it('legendPosition left-bottom multi-shapes', () => {
    chart.legend({ position: 'left-bottom' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['left-bottom'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const plotRange = controller.plotRange;
    const plotHeight = plotRange.br.y;
    const totalHeight = controller._getRegion().totalHeight;
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.minX - width - borderMargin[3] < 0 ? 0 : backRange.minX - width - borderMargin[3]);
    expect(y).to.equal(plotHeight - totalHeight);
  });

  it('legendPosition top-center multi-shapes', () => {
    chart.legend({ position: 'top-center' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const height = legend.getHeight();
    const totalWidth = controller._getRegion().totalWidth;
    const chartWidth = canvas.get('width');
    const offsetY = legend.get('offset')[1];
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal((chartWidth - totalWidth) / 2);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition top-left multi-shapes', () => {
    chart.legend({ position: 'top-left' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-left'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const height = legend.getHeight();
    const offsetY = legend.get('offset')[1];
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal(backRange.minX - borderMargin[3]);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition top-right multi-shapes', () => {
    chart.legend({ position: 'top-right' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['top-right'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const height = legend.getHeight();
    const offsetY = legend.get('offset')[1];
    const totalWidth = controller._getRegion().totalWidth;
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    const plotRange = controller.plotRange;
    expect(x).to.equal(plotRange.br.x - totalWidth);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
  });

  it('legendPosition top-center multi-shapes', () => {
    chart.legend({ position: 'bottom-center' });
    chart.repaint();
    const controller = chart.get('legendController');
    const legend = controller.legends['bottom-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const offsetY = legend.get('offset')[1];
    const totalWidth = controller._getRegion().totalWidth;
    const chartWidth = canvas.get('width');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal((chartWidth - totalWidth) / 2);
    expect(y).to.equal(backRange.maxY + borderMargin[2] + offsetY);
  });

  it('legendPosition previous version', () => {
    chart.legend({ position: 'left' });
    chart.repaint();
    let controller = chart.get('legendController');
    let legends = controller.legends;
    expect(legends).property('left-bottom');

    chart.legend({ position: 'right' });
    chart.repaint();
    controller = chart.get('legendController');
    legends = controller.legends;
    expect(legends).property('right-bottom');

    chart.legend({ position: 'top' });
    chart.repaint();
    controller = chart.get('legendController');
    legends = controller.legends;
    expect(legends).property('top-center');

    chart.legend({ position: 'bottom' });
    chart.repaint();
    controller = chart.get('legendController');
    legends = controller.legends;
    expect(legends).property('bottom-center');
  });

  it('multi-geom legend', () => {
    const data2 = [
      { year: '1', a: 0.5, b: 0.23 },
      { year: '2', a: 0.1, b: 0.5 },
      { year: '3', a: 0.3, b: 0.9 },
      { year: '4', a: 0.8, b: 0.2 }
    ];
    chart.clear();
    chart.source(data2);
    chart.line().position('year*a').color('red');
    chart.line().position('year*b').color('black');
    chart.render();

    const controller = chart.get('legendController');
    const legend = controller.legends['bottom-center'][0];
    const items = legend.get('items');
    expect(items[0].value).to.equal('a');
    expect(items[0].marker.stroke).to.equal('red');
    expect(items[0].geom).to.be.an.instanceof(Line);
    expect(items[1].value).to.equal('b');
    expect(items[1].marker.stroke).to.equal('black');
    expect(items[1].geom).to.be.an.instanceof(Line);
  });

  it('legendPosition top-center field-specified', () => {
    const chart2 = new Chart({
      container: div,
      width: chartWidth,
      height: chartHeight,
      padding: 'auto',
      animate: false
    });
    chart2.source(data);
    chart2.legend('country', { position: 'top-center' });
    chart2.line().position('year*value').color('country');
    chart2.render();
    const controller = chart2.get('legendController');
    const legend = controller.legends['top-center'][0];
    const x = legend.get('group').get('x');
    const y = legend.get('group').get('y');
    const width = legend.getWidth();
    const height = legend.getHeight();
    const offsetY = legend.get('offset')[1];
    const canvasWidth = canvas.get('width');
    const backRange = controller.getBackRange();
    const borderMargin = Global.legend.margin;
    expect(x).to.equal((canvasWidth - width) / 2);
    expect(y).to.equal(backRange.minY - height - borderMargin[0] + offsetY);
    chart.clear();
    chart2.clear();
  });
});
