import { expect } from 'chai';
import KLine from '../../../src/element/k-line';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoord } from '@antv/coord';
import View from '../../utils/view';

const Rect = getCoord('rect');
const CatScale = getScale('cat');
const LinearScale = getScale('linear');
const IdentityScale = getScale('identity');

describe.skip('KLine', () => {
  const kLineDiv = document.createElement('div');
  kLineDiv.id = 'kLine';
  document.body.appendChild(kLineDiv);

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
    containerId: 'kLine',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });

  const xScale = new CatScale({
    field: 'x',
    values: [ 'a' ],
    range: [ 0.5, 0.75 ],
  });

  const yScale = new LinearScale({
    field: 'y',
    min: 0,
    max: 10,
    nice: true,
  });
  const data = [
    {
      x: 'a',
      y: [ 8.18, 8.32, 8.33, 7.98 ],
    },
  ];

  const container = canvas.addGroup();

  describe('Default', () => {
    let kLineElement;
    let dataArray;

    it('constructor', () => {
      kLineElement = new KLine({
        data,
        scales: {
          x: xScale,
          y: yScale,
        },
        coord,
        container,
        view: new View(),
        id: 'view-kLine',
      });

      expect(kLineElement.get('type')).to.eql('kline');
      expect(kLineElement.get('shapeType')).to.eql('kline');
      expect(kLineElement.get('generatePoints')).to.be.true;
      expect(kLineElement.get('sizeController')).not.to.be.undefined;
    });

    it('element.init()', () => {
      kLineElement.position({ fields: [ 'x', 'y' ]});
      kLineElement.init();

      const attrs = kLineElement.get('attrs');
      dataArray = kLineElement.get('dataArray');
      expect(attrs).to.have.keys([ 'position' ]);
      expect(dataArray.length).to.eql(1);
    });

    it('getSize()', () => {
      const size = kLineElement.getSize(dataArray[0][0]);
      expect(size).to.equal(100);
    });

    it('getNormalizedSize()', () => {
      const size = kLineElement.getNormalizedSize(dataArray[0][0]);

      expect(size).to.equal(0.5);
    });

    it('element.paint()', () => {
      kLineElement.paint();
      canvas.draw();

      const shapes = kLineElement.getShapes();
      expect(shapes.length).to.eql(1);
      const path = shapes[0].attr('path');
      expect(path.length).to.equal(9);
    });

    it('clear()', () => {
      kLineElement.clear();
      expect(kLineElement.get('sizeController')._defaultSize).to.be.null;
    });

    it('destroy()', () => {
      kLineElement.destroy();
      expect(container.get('children')).to.be.empty;
      expect(kLineElement.destroyed).to.be.true;
    });
  });

  describe('size', () => {
    it('kLine has size cfg', () => {
      const data = [
        {
          x: 'a',
          y: [ 8.18, 8.32, 8.33, 7.98 ],
        },
      ];
      const boxPlotElement = new KLine({
        data,
        scales: {
          x: xScale,
          y: yScale,
        },
        coord,
        container,
        view: new View(),
        id: 'view-kLine1',
      });
      boxPlotElement
        .position({
          fields: [ 'x', 'y' ],
        })
        .size({
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
    });
  });

  describe('One-dimensional kLine plot', () => {
    const data = [ { y: [ 8.18, 8.32, 8.33, 7.98 ]} ];
    const yScale = new LinearScale({
      field: 'y',
      min: 0,
      max: 10,
      nice: true,
    });
    const identityScale = new IdentityScale({
      field: '1',
      values: [ '1' ],
      range: [ 0.5, 1 ],
    });
    it('has identity dimension', () => {
      const element = new KLine({
        data,
        scales: {
          1: identityScale,
          y: yScale,
        },
        view: new View(),
        container,
        coord,
        id: 'view-kLine-1',
      });

      element.position({
        fields: [ 1, 'y' ],
      });
      element.init();

      element.paint();
      canvas.draw();
      const shape = element.getShapes()[0];
      const origin = shape.get('origin');
      const path = shape.attr('path');
      expect(element.getNormalizedSize(origin._origin)).to.equal(0.5);
      expect(path.length).to.equal(9);
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(kLineDiv);
  });
});
