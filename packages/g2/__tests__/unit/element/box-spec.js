import { expect } from 'chai';
import Box from '../../../src/element/box';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoord } from '@antv/coord';
import View from '../../utils/view';

const CatScale = getScale('cat');
const LinearScale = getScale('linear');
const IdentityScale = getScale('identity');

const Rect = getCoord('rect');
describe('Box', () => {
  const boxPlotDiv = document.createElement('div');
  boxPlotDiv.id = 'boxPlot';
  document.body.appendChild(boxPlotDiv);

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
    containerId: 'boxPlot',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const xScale = new CatScale({
    field: 'x',
    values: [ 'x' ],
    range: [ 0.5, 0.75 ],
  });

  const yScale = new LinearScale({
    field: 'y',
    min: 0,
    max: 24,
    nice: false,
  });

  // const container = canvas.addGroup();

  describe('Default', () => {
    let boxPlotElement;
    let dataArray;
    const data = [
      {
        x: 'x',
        y: [ 1, 9, 16, 22, 24 ],
      },
    ];

    it('constructor', () => {
      boxPlotElement = new Box({
        data,
        scales: {
          x: xScale,
          y: yScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-boxPlot',
      });

      expect(boxPlotElement.get('type')).to.eql('box');
      expect(boxPlotElement.get('shapeType')).to.eql('box');
      expect(boxPlotElement.get('generatePoints')).to.be.true;
      expect(boxPlotElement.get('sizeController')).not.to.be.undefined;
    });

    it('element.init()', () => {
      boxPlotElement.position({ fields: [ 'x', 'y' ]});
      boxPlotElement.init();

      const attrs = boxPlotElement.get('attrs');
      dataArray = boxPlotElement.get('dataArray');
      expect(attrs).to.have.keys([ 'position' ]);
      expect(dataArray.length).to.eql(1);
    });

    it('getSize()', () => {
      const size = boxPlotElement.getSize(dataArray[0][0]);
      expect(size).to.equal(100);
    });

    it('getNormalizedSize()', () => {
      const size = boxPlotElement.getNormalizedSize(dataArray[0][0]);

      expect(size).to.equal(0.5);
    });

    it('element.paint()', () => {
      boxPlotElement.paint();
      canvas.draw();

      const shapes = boxPlotElement.getShapes();
      expect(shapes.length).to.eql(1);
      const path = shapes[0].attr('path');
      expect(path.length).to.equal(16);
    });

    it('clear()', () => {
      boxPlotElement.clear();
      expect(boxPlotElement.get('sizeController')._defaultSize).to.be.null;
    });

    it('destroy()', () => {
      boxPlotElement.destroy();
      // expect(container.destroyed).to.be.true;
      expect(boxPlotElement.destroyed).to.be.true;
    });
  });

  describe('size', () => {
    it('boxPlot has size cfg', () => {
      const data = [
        {
          x: 'x',
          y: [ 1, 9, 16, 22, 24 ],
        },
      ];
      const boxPlotElement = new Box({
        data,
        scales: {
          x: xScale,
          y: yScale,
        },
        coord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-boxPlot',
      });
      boxPlotElement.position({
        fields: [ 'x', 'y' ]
      }).size({
        values: [ 20 ],
      });
      boxPlotElement.init();
      const dataArray = boxPlotElement.get('dataArray');
      const size = boxPlotElement.getSize(dataArray[0][0]);
      expect(size).to.equal(20);

      boxPlotElement.paint();
      canvas.draw();

      const shapes = boxPlotElement.getShapes();
      expect(shapes[0].get('origin').size).to.equal(20);

      boxPlotElement.destroy();
    });
  });

  describe('One-dimensional box plot', () => {
    const data = [
      { range: [ 1, 9, 16, 22, 24 ]},
    ];
    const rangeScale = new LinearScale({
      field: 'range',
      min: 0,
      max: 35,
      nice: false,
      values: [ 1, 9, 16, 22, 24 ],
    });
    const identityScale = new IdentityScale({
      field: '1',
      values: [ '1' ],
      range: [ 0.5, 1 ],
    });
    it('should draw correctly', () => {
      const element = new Box({
        data,
        scales: {
          range: rangeScale,
          1: identityScale,
        },
        view: new View(),
        container: canvas.addGroup(),
        coord,
        id: 'view-box-plot-1',
      });

      element.position({
        fields: [ 'range', 1 ],
      });
      element.init();
      element.paint();
      canvas.draw();

      const shape = element.getShapes()[0];
      const origin = shape.get('origin');
      const path = shape.attr('path');
      expect(element.getNormalizedSize(origin._origin)).to.equal(0.1);
      expect(path.length).to.equal(16);
      expect(path[0][1]).to.equal(path[1][1]);
      expect(path[0][2]).to.gt(path[1][2]);

      element.destroy();
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(boxPlotDiv);
  });
});
