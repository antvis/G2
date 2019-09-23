const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { DataRegion } = require('../../../src/annotation');

const Rect = getCoordinate('Rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation DataRegion', () => {
  const xScale = new Cat({
    field: 'x',
    values: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  });
  const yScale = new Linear({
    field: 'y',
    min: 0,
    max: 1200,
  });
  const coord = new Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
  });
  const data = [
    { x: '一月', y: 200 },
    { x: '二月', y: 300 },
    { x: '三月', y: 100 },
    { x: '四月', y: 500 },
    { x: '五月', y: 450 },
    { x: '六月', y: 650 },
    { x: '七月', y: 710 },
    { x: '八月', y: 800 },
    { x: '九月', y: 660 },
    { x: '十月', y: 1000 },
    { x: '十一月', y: 890 },
    { x: '十二月', y: 110 },
  ];
  let canvas, group, div, dataRegion;

  before(() => {
    div = document.createElement('div');
    div.id = 'c1';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'c1',
      width: 500,
      height: 500,
      pixelRatio: 2,
    });
    group = canvas.addGroup();
  });

  afterEach(() => {
    dataRegion.clear();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('region only', () => {
    dataRegion = new DataRegion({
      xScales: {
        x: xScale,
      },
      yScales: {
        y: yScale,
      },
      start: {
        x: '四月',
        y: 500,
      },
      end: {
        x: '十月',
        y: 1000,
      },
      region: {
        lineLength: 30,
        style: {
          fill: '#1890ff',
          opacity: 0.05,
        },
      },
      appendInfo: 'data-region',
    });

    dataRegion.render(coord, group, data);
    canvas.draw();

    const el = dataRegion.get('el');
    expect(el.get('children').length).to.equal(1);

    const pathShape = el.get('children')[0];
    expect(pathShape.get('appendInfo')).to.equal('data-region');
    expect(pathShape.name).to.equal('annotation-data-region');
    expect(pathShape.attr('path')).to.eql([
      ['M', 169.09090909090907, 96.66666666666663],
      ['L', 169.09090909090907, 293.3333333333333],
      ['L', 205.45454545454547, 310],
      ['L', 241.8181818181818, 243.33333333333334],
      ['L', 278.18181818181813, 223.33333333333334],
      ['L', 314.5454545454545, 193.33333333333337],
      ['L', 350.90909090909093, 239.99999999999997],
      ['L', 387.2727272727273, 126.66666666666663],
      ['L', 387.2727272727273, 96.66666666666663],
    ]);
  });

  it('empty', () => {
    dataRegion = new DataRegion({
      xScales: {
        x: xScale,
      },
      yScales: {
        y: yScale,
      },
      start: [-1, 300],
      end: [2, 400],
      region: {
        lineLength: 30,
        style: {
          fill: '#1890ff',
          opacity: 0.05,
        },
      },
    });

    dataRegion.render(coord, group, data);
    canvas.draw();

    const el = dataRegion.get('el');
    expect(el).to.be.null;
  });

  it('region + text', () => {
    dataRegion = new DataRegion({
      xScales: {
        x: xScale,
      },
      yScales: {
        y: yScale,
      },
      start: ['五月', 500],
      end: ['六月', 650],
      region: {
        lineLength: 30,
        style: {
          fill: '#1890ff',
          opacity: 0.05,
        },
      },
      text: {
        content: 'A blogging platform for professionals',
        style: {
          fontSize: 20,
          fill: '#1890ff',
        },
      },
      appendInfo: 'data-region',
    });

    dataRegion.render(coord, group, data);
    canvas.draw();

    const el = dataRegion.get('el');
    expect(el.get('children').length).to.equal(2);

    const pathShape = el.get('children')[0];
    const textShape = el.get('children')[1];
    expect(pathShape.get('appendInfo')).to.equal('data-region');
    expect(textShape.get('appendInfo')).to.equal('data-region');
    expect(pathShape.name).to.equal('annotation-data-region');
    expect(textShape.name).to.equal('annotation-data-region');

    expect(pathShape.attr('path')).to.eql([
      ['M', 205.45454545454547, 213.33333333333334],
      ['L', 205.45454545454547, 310],
      ['L', 241.8181818181818, 243.33333333333334],
      ['L', 241.8181818181818, 213.33333333333334],
    ]);
    expect(textShape.attr('x')).to.equal(223.63636363636363);
    expect(textShape.attr('y')).to.equal(213.33333333333334);
  });
});
