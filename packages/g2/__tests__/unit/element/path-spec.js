import { expect } from 'chai';
import Path from '../../../src/element/path';
import { getCoord } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import * as Util from '@antv/util';
import View from '../../utils/view';

const Rect = getCoord('rect');

describe('Path Element', () => {
  const div = document.createElement('div');
  div.id = 'path';
  document.body.appendChild(div);

  const LinearScale = getScale('linear');
  const yearScale = new LinearScale({
    field: 'year',
    min: 1991,
    max: 1999,
    nice: false,
  });
  const valueScale = new LinearScale({
    field: 'value',
    min: 0,
    max: 7,
    nice: true,
  });
  const data = [
    { year: 1997, value: 7 },
    { year: 1995, value: 4.9 },
    { year: 1991, value: 3 },
    { year: 1993, value: 3.5 },
    { year: 1992, value: 4 },
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
    containerId: 'path',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });
  const container = canvas.addGroup();

  let pathElement;

  it('Constructor', () => {
    pathElement = new Path({
      data,
      coord,
      container,
      scales: {
        year: yearScale,
        value: valueScale,
      },
      view: new View(),
      id: 'view-path',
    });

    expect(pathElement.get('type')).to.equal('path');
    expect(pathElement.get('shapeType')).to.equal('line');
    expect(pathElement.get('connectNulls')).to.equal(false);
    expect(pathElement.get('showSinglePoint')).to.equal(false);
    expect(pathElement.get('generatePoints')).to.equal(false);
    expect(pathElement.get('sortable')).to.equal(false);
  });

  it('draw path', () => {
    pathElement.position({
      fields: [ 'year', 'value' ],
    }).style({
      callback() {
        return {
          endArrow: true,
        };
      },
    });

    pathElement.init();
    pathElement.paint();
    canvas.draw();

    const dataArray = pathElement.get('dataArray');
    // 虽然 path 无序，但是为了后续 tooltip 查找数据方便，最后会对 dataArray 进行排序
    const years = Util.flatten(dataArray).map((obj) => {
      return obj._origin.year;
    });
    expect(years).to.eql([ 1991, 1992, 1993, 1995, 1997 ]);

    const shapes = pathElement.getShapes();
    expect(shapes.length).to.equal(1);
    expect(shapes[0].attr('endArrow')).to.be.true;
    expect(shapes[0].attr('stroke')).to.equal('#1890FF');
    expect(shapes[0].id).to.equal('view-path-path');
    expect(shapes[0].get('origin').length).to.equal(5);
    expect(shapes[0].get('coord')).to.eql(coord);
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
