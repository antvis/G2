import { expect } from 'chai';
import Line from '../../../src/element/line';
import { getCoord } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import Theme from '../../../src/theme/default';
import View from '../../utils/view';

const Rect = getCoord('rect');
const Polar = getCoord('polar');

const LinearScale = getScale('linear');
const CatScale = getScale('cat');

describe('Line Element', () => {
  const div1 = document.createElement('div');
  div1.id = 'line';
  document.body.appendChild(div1);

  let lineElement;
  const yearScale = new LinearScale({
    field: 'year',
    min: 1750,
    max: 2050,
    tickInterval: 25,
    nice: true,
  });
  const valueScale = new LinearScale({
    field: 'value',
    min: 0,
    max: 6000,
    nice: true,
  });
  const countryScale = new CatScale({
    field: 'country',
    values: [ 'Asia', 'Africa', 'Europe', 'Oceania' ],
    range: [ 0, 1 ],
  });
  const data = [
    { country: 'Asia', year: '1750', value: 502 },
    { country: 'Asia', year: '1800', value: 635 },
    { country: 'Asia', year: '1850', value: 809 },
    { country: 'Asia', year: '1900' },
    { country: 'Asia', year: '1950' },
    { country: 'Asia', year: '1999', value: 3634 },
    { country: 'Asia', year: '2050', value: 5268 },
    { country: 'Africa', year: '1750', value: 106 },
    { country: 'Africa', year: '1800', value: 107 },
    { country: 'Africa', year: '1850', value: 111 },
    { country: 'Africa', year: '1900', value: 133 },
    { country: 'Africa', year: '1950', value: 221 },
    { country: 'Africa', year: '1999', value: 767 },
    { country: 'Africa', year: '2050', value: 1766 },
    { country: 'Europe', year: '1750', value: 163 },
    { country: 'Europe', year: '1800', value: 203 },
    { country: 'Europe', year: '1850', value: 276 },
    { country: 'Europe', year: '1900', value: 408 },
    { country: 'Europe', year: '1950', value: 547 },
    { country: 'Europe', year: '1999', value: 729 },
    { country: 'Europe', year: '2050', value: 628 },
    { country: 'Oceania', year: '1750', value: 200 },
    { country: 'Oceania', year: '1800', value: 200 },
    { country: 'Oceania', year: '1850', value: 200 },
    { country: 'Oceania', year: '1900', value: 300 },
    { country: 'Oceania', year: '1950', value: 230 },
    { country: 'Oceania', year: '1999', value: 300 },
    { country: 'Oceania', year: '2050', value: 460 },
  ];

  const coord = new Rect({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
  });

  const canvas = new Canvas({
    containerId: 'line',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });
  const container = canvas.addGroup();

  it('constructor', () => {
    lineElement = new Line({
      data,
      scales: {
        country: countryScale,
        year: yearScale,
        value: valueScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-line',
    });

    expect(lineElement.get('sortable')).to.be.true;
    expect(lineElement.get('type')).to.equal('line');
    expect(lineElement.get('shapeType')).to.equal('line');
  });

  it('element.init()', () => {
    lineElement
      .position({
        fields: [ 'year', 'value' ],
      })
      .color({
        fields: [ 'country' ],
      })
      .adjust([
        { type: 'stack' },
      ]);

    lineElement.init();

    const attrs = lineElement.get('attrs');
    const dataArray = lineElement.get('dataArray');

    expect(attrs).to.have.keys([ 'position', 'color' ]);
    expect(attrs.color.values).to.eql(Theme.colors);

    expect(lineElement.hasAdjust('stack')).to.be.true;
    expect(dataArray.length).to.equal(4);
    expect(dataArray[0][0].value).to.eql([ 469, 971 ]);
  });

  it('element.paint()', () => {
    lineElement.paint();
    canvas.draw();

    const shapes = lineElement.getShapes();
    const dataArray = lineElement.get('dataArray');
    expect(shapes.length).to.equal(5);
    expect(dataArray.length).to.equal(4);
    // TODO 当前测试用例不可用
    // expect(dataArray[0][0].color).to.equal('#55A6F3');
    // expect(dataArray[1][0].color).to.equal('#2FC25B');
    // expect(dataArray[2][0].color).to.equal('#FACC14');
    // expect(dataArray[3][0].color).to.equal('#223273');

    expect(shapes[0].id).to.equal('view-line-line-Asia');
    expect(shapes[1].id).to.equal('view-line-line-Asia1');

    dataArray[2].forEach((obj) => {
      expect(obj.y).to.be.an.instanceOf(Array);
      expect(obj.y.length).to.equal(2);
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div1);
  });
});

describe('Line Element in Polar coordinate', () => {
  const div2 = document.createElement('div');
  div2.id = 'polarLine';
  document.body.appendChild(div2);

  let lineElement;
  const data = [
    { year: 1997, value: 7 },
    { year: 1995, value: 4.9 },
    { year: 1991, value: 3 },
    { year: 1993, value: 3.5 },
    { year: 1992, value: 4 },
    { year: 1994, value: 5 },
    { year: 1998, value: 9 },
    { year: 1996, value: 6 },
    { year: 1999, value: 13 },
  ];
  const yearScale = new LinearScale({
    field: 'year',
    min: 1991,
    max: 1999,
    nice: false,
  });
  const valueScale = new LinearScale({
    field: 'value',
    min: 0,
    max: 14,
    nice: false,
  });
  const coord = new Polar({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 200,
      y: 0,
    },
  });
  const canvas = new Canvas({
    containerId: 'polarLine',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });
  const container = canvas.addGroup();
  it('constructor', () => {
    lineElement = new Line({
      data,
      scales: {
        year: yearScale,
        value: valueScale,
      },
      coord,
      container,
      view: new View(),
      id: 'view-line',
    });

    expect(lineElement.get('sortable')).to.be.true;
    expect(lineElement.get('type')).to.equal('line');
    expect(lineElement.get('shapeType')).to.equal('line');
    expect(lineElement.isInCircle()).to.be.true;
  });

  it('element.paint()', () => {
    lineElement
      .position({
        fields: [ 'year', 'value' ],
      });

    lineElement.init();
    lineElement.paint();
    canvas.draw();

    const shapes = lineElement.getShapes();
    const dataArray = lineElement.get('dataArray');
    expect(shapes.length).to.equal(1);
    expect(dataArray.length).to.equal(1);
    expect(shapes[0].attr('path')).to.eql([
      [ 'M', 100, 78.57142857142857 ],
      [ 'L', 120.20305089104421, 79.79694910895579 ],
      [ 'L', 125, 100 ],
      [ 'L', 125.25381361380528, 125.25381361380526 ],
      [ 'L', 100, 135 ],
      [ 'L', 69.69542366343369, 130.30457633656633 ],
      [ 'L', 50, 100 ],
      [ 'L', 54.5431354951505, 54.543135495150516 ],
      [ 'L', 99.99999999999999, 7.142857142857139 ],
      [ 'Z' ],
    ]);
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div2);
  });
});
