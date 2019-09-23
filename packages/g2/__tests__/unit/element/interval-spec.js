import { expect } from 'chai';
import { isNumberEqual } from '@antv/util';
import { getCoordinate } from '@antv/coord';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import Interval from '../../../src/element/interval';
import Global from '../../../src/global';
import View from '../../utils/view';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

const LinearScale = getScale('linear');
const CatScale = getScale('cat');
const IdentityScale = getScale('identity');

describe('Interval Element', () => {
  const div = document.createElement('div');
  div.id = 'interval';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'interval',
    renderer: 'canvas',
    width: 200,
    height: 200,
    pixelRatio: 2,
  });
  // const container = canvas.addGroup();
  const rectCoord = new Rect({
    start: {
      x: 0,
      y: 180,
    },
    end: {
      x: 180,
      y: 0,
    },
  });
  const polarCoord = new Polar({
    start: {
      x: 0,
      y: 180,
    },
    end: {
      x: 180,
      y: 0,
    },
  });

  let interval;

  describe('Default', () => {
    const data = [{ a: 'A', b: 10 }, { a: 'B', b: 12 }, { a: 'C', b: 8 }];
    const aScale = new CatScale({
      field: 'a',
      values: ['A', 'B', 'C'],
      range: [0.2, 0.8],
    });
    const bScale = new LinearScale({
      field: 'b',
      min: 0,
      max: 15,
      nice: false,
    });
    let dataArray;
    it('constructor', () => {
      interval = new Interval();
      expect(interval.get('type')).to.equal('interval');
      expect(interval.get('shapeType')).to.equal('interval');
      expect(interval.get('generatePoints')).to.be.true;
      expect(interval.get('visible')).to.be.true;
      expect(interval.get('sizeController')).not.to.be.undefined;
    });

    it('init', () => {
      interval = new Interval({
        data,
        scales: {
          a: aScale,
          b: bScale,
        },
        coord: rectCoord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-interval',
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .color({
          fields: ['a'],
        })
        .animate({
          update: false,
        });
      interval.init();

      const attrs = interval.get('attrs');
      dataArray = interval.get('dataArray');
      expect(attrs).to.have.keys(['position', 'color']);
      expect(dataArray.length).to.equal(3);
      expect(dataArray[0][0].a).to.equal(0);
      expect(dataArray[1][0].a).to.equal(1);
      expect(dataArray[2][0].a).to.equal(2);
    });

    it('beforeMapping', () => {
      interval._beforeMapping(dataArray);

      expect(dataArray[0][0].points).not.to.be.undefined;
      expect(dataArray[0][0].nextPoints).not.to.be.undefined;
      expect(dataArray[2][0].points).not.to.be.undefined;
      expect(dataArray[2][0].nextPoints).be.undefined;
    });

    it('getSize()', () => {
      const size = interval.getSize(dataArray[0][0]);
      expect(size).to.equal(30);
    });

    it('getNormalizedSize()', () => {
      const size = interval.getNormalizedSize(dataArray[0][0]);
      expect(size).to.equal(30 / 180);
    });

    it('paint()', () => {
      interval.paint();
      canvas.draw();

      const shapes = interval.getShapes();
      expect(shapes.length).to.equal(3);

      expect(shapes[0].id).to.equal('view-interval-A-A');
      expect(shapes[0].get('animateOptions')).to.eql({ update: false });
    });

    it('isShareTooltip()', () => {
      expect(interval.isShareTooltip()).to.be.true;
    });

    it('clear()', () => {
      interval.clear();
      expect(interval.get('sizeController')._defaultSize).to.be.null;
    });

    it('desctroy()', () => {
      interval.destroy();
      expect(canvas.get('children')).to.be.empty;
      expect(interval.destroyed).to.be.true;
    });

    it('interval with size defined', () => {
      interval = new Interval({
        data,
        scales: {
          a: aScale,
          b: bScale,
        },
        coord: rectCoord,
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-interval',
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .size({
          values: ['20'],
        });
      interval.init();
      interval.paint();

      const shapes = interval.getShapes();
      shapes.forEach((shape) => {
        const path = shape.attr('path');
        expect(isNumberEqual(path[2][1] - path[1][1], 20)).to.be.true;
      });

      interval.destroy();
    });
  });

  describe('Interval with dodge adjust', () => {
    const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },
      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' },
    ];
    const aScale = new CatScale({
      field: 'a',
      values: ['1', '2', '3'],
      range: [0.2, 0.8],
    });

    const bScale = new LinearScale({
      field: 'b',
      min: 0,
      max: 5,
      nice: false,
    });

    const cScale = new CatScale({
      field: 'c',
      values: ['1', '2'],
    });

    it('interval size with dodge', () => {
      interval = new Interval({
        coord: rectCoord,
        data,
        scales: {
          a: aScale,
          b: bScale,
          c: cScale,
        },
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-dodge-interval',
      });

      interval
        .position({
          fields: ['a', 'b'],
        })
        .color({
          fields: ['c'],
        })
        .adjust({
          type: 'dodge',
        });

      interval.init();
      interval.paint();
      canvas.draw();

      const shapes = interval.getShapes();
      expect(shapes.length).to.equal(6);

      shapes.forEach((shape) => {
        expect(shape.attr('path').length).to.equal(6);
        expect(isNumberEqual(shape.attr('path')[2][1] - shape.attr('path')[1][1], (180 / 3) * (1 / 4))).to.be.true;
      });
    });

    it('interval size with dodge, dodgeBy', () => {
      interval.clearInner();
      interval
        .position({
          fields: ['a', 'b'],
        })
        .color({
          fields: ['c'],
        })
        .adjust({
          type: 'dodge',
          dodgeBy: 'a',
        });

      interval.init();
      interval.paint();
      canvas.draw();

      const shapes = interval.getShapes();
      expect(shapes.length).to.equal(6);

      shapes.forEach((shape) => {
        expect(shape.attr('path').length).to.equal(6);
        expect(isNumberEqual(shape.attr('path')[2][1] - shape.attr('path')[1][1], 180 / 3 / 6)).to.be.true;
      });
    });

    it('destroy', () => {
      interval.destroy();
      expect(canvas.get('children')).to.be.empty;
      expect(interval.destroyed).to.be.true;
    });
  });

  describe('Interval in polar coordinate', () => {
    const data = [{ a: '1', b: 2, c: '1' }, { a: '2', b: 5, c: '1' }, { a: '3', b: 4, c: '1' }];
    const aScale = new CatScale({
      field: 'a',
      values: ['1', '2', '3'],
      range: [1 / 6, 1 - 1 / 6],
    });

    const bScale = new LinearScale({
      field: 'b',
      min: 0,
      max: 5,
      nice: false,
    });

    it('polar interval', () => {
      const interval = new Interval({
        data,
        coord: polarCoord,
        scales: {
          a: aScale,
          b: bScale,
        },
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-polar-interval',
      });
      interval.position({
        fields: ['a', 'b'],
      });

      interval.init();
      interval.paint();
      canvas.draw();

      const shapes = interval.getShapes();
      shapes.forEach((shape) => {
        const points = shape.get('origin').points;
        expect(shape.attr('path').length).to.equal(5);
        expect(Math.abs(points[2].x - points[0].x - 1 / 3) < 0.001).equal(true);
      });

      interval.destroy();
    });

    it('pie chart', () => {
      // 构造 theta 坐标系
      const thetaCoord = new Polar({
        start: {
          x: 0,
          y: 180,
        },
        end: {
          x: 180,
          y: 0,
        },
      });
      thetaCoord.transpose();
      thetaCoord.type = 'theta';

      const identityScale = new IdentityScale({
        field: '1',
        values: [1],
        range: [0.5, 1],
      });
      const interval = new Interval({
        data,
        coord: thetaCoord,
        container: canvas.addGroup(),
        scales: {
          1: identityScale,
          a: new CatScale({
            field: 'a',
            range: [0, 1],
            values: ['1', '2', '3'],
          }),
          percent: new LinearScale({
            field: 'percent',
            min: 0,
            max: 1,
            nice: false,
            values: [0.18181818181818182, 0.45454545454545453, 0.36363636363636365],
          }),
        },
        view: new View(),
        id: 'view-polar-interval',
      });
      interval
        .position({
          fields: ['percent'],
        })
        .color({
          fields: ['a'],
        })
        .adjust({
          type: 'stack',
        });

      interval.init();
      interval.paint();
      canvas.draw();

      expect(interval.isShareTooltip()).to.be.false;

      const shapes = interval.getShapes();
      shapes.forEach((shape) => {
        const origin = shape.get('origin');
        const path = shape.attr('path');
        expect(path.length).to.equal(5);
        const size = interval.getNormalizedSize(origin);
        expect(size).to.equal(Global.widthRatio.rose);
      });
      interval.destroy();
    });

    it('polar dodge interval', () => {
      const data = [
        { a: '1', b: 2, c: '1' },
        { a: '2', b: 5, c: '1' },
        { a: '3', b: 4, c: '1' },
        { a: '1', b: 3, c: '2' },
        { a: '2', b: 1, c: '2' },
        { a: '3', b: 2, c: '2' },
      ];
      const aScale = new CatScale({
        field: 'a',
        values: ['1', '2', '3'],
        range: [0, 1 - 1 / 3],
      });
      const bScale = new LinearScale({
        field: 'b',
        min: 0,
        max: 5,
        nice: false,
      });
      const cScale = new CatScale({
        field: 'c',
        values: ['1', '2'],
      });

      interval = new Interval({
        data,
        coord: polarCoord,
        scales: {
          a: aScale,
          b: bScale,
          c: cScale,
        },
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-polar-dodge-interval',
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .adjust({
          type: 'dodge',
        })
        .color({
          fields: ['c'],
        });

      interval.init();
      interval.paint();
      canvas.draw();

      const shapes = interval.getShapes();
      shapes.forEach((shape) => {
        const originData = shape.get('origin');
        expect(interval.getNormalizedSize(originData)).to.equal((1 / 6) * Global.widthRatio.rose);
      });

      interval.destroy();
    });

    it('dodge interval, polar coordinate with transposed', () => {
      const data = [
        { a: '1', b: 2, c: '1' },
        { a: '2', b: 5, c: '1' },
        { a: '3', b: 4, c: '1' },
        { a: '1', b: 3, c: '2' },
        { a: '2', b: 1, c: '2' },
        { a: '3', b: 2, c: '2' },
      ];
      const aScale = new CatScale({
        field: 'a',
        values: ['1', '2', '3'],
        range: [(1 / 6) * Global.widthRatio.multiplePie, 1 - (1 / 6) * Global.widthRatio.multiplePie],
      });
      const bScale = new LinearScale({
        field: 'b',
        min: 0,
        max: 5,
        nice: false,
      });
      const cScale = new CatScale({
        field: 'c',
        values: ['1', '2'],
      });
      polarCoord.isTransposed = true;

      interval = new Interval({
        data,
        coord: polarCoord,
        scales: {
          a: aScale,
          b: bScale,
          c: cScale,
        },
        container: canvas.addGroup(),
        view: new View(),
        id: 'view-polar-dodge-interval',
      });
      interval
        .position({
          fields: ['a', 'b'],
        })
        .adjust({
          type: 'dodge',
        })
        .color({
          fields: ['c'],
        });

      interval.init();
      interval.paint();
      canvas.draw();

      expect(interval.isShareTooltip()).to.be.false;

      const shapes = interval.getShapes();
      shapes.forEach((shape) => {
        const originData = shape.get('origin');
        expect(interval.getNormalizedSize(originData)).to.equal((1 / 6) * Global.widthRatio.multiplePie);
      });

      interval.destroy();
    });
  });

  describe('size calculation', () => {
    it('xScale is linear with min and max defined', () => {
      const data1 = [{ a: 3, b: 23 }, { a: 4, b: 15 }, { a: 6, b: 9 }];
      interval = new Interval({
        data: data1,
        coord: rectCoord,
        container: canvas.addGroup(),
        scales: {
          a: new LinearScale({
            field: 'a',
            min: 0,
            max: 10,
            nice: false,
            values: [3, 4, 6],
          }),
          b: new LinearScale({
            field: 'b',
            min: 8,
            max: 24,
            nice: true,
            values: [23, 15, 9],
          }),
        },
        view: new View(),
        id: 'view-interval',
      });
      interval.position({
        fields: ['a', 'b'],
      });
      interval.init();
      interval.paint();

      canvas.draw();

      const shapes = interval.getShapes();
      expect(shapes.length).to.equal(3);
      shapes.forEach((shape) => {
        const origin = shape.get('origin');
        const path = shape.attr('path');
        expect(isNumberEqual(interval.getSize(origin), path[2][1] - path[1][1])).to.be.true;
      });

      interval.destroy();
      const data2 = [{ a: 2, b: 15 }, { a: 6, b: 9 }];
      interval = new Interval({
        data: data2,
        coord: rectCoord,
        container: canvas.addGroup(),
        scales: {
          a: new LinearScale({
            field: 'a',
            min: 2,
            max: 7,
            nice: false,
            values: [2, 6],
          }),
          b: new LinearScale({
            field: 'b',
            min: 0,
            max: 16,
            values: [9, 15],
          }),
        },
        view: new View(),
        id: 'view-interval',
      });
      interval.position({
        fields: ['a', 'b'],
      });
      interval.init();
      interval.paint();
      canvas.draw();

      interval.getShapes().forEach((shape) => {
        const origin = shape.get('origin');
        const path = shape.attr('path');
        expect(isNumberEqual(interval.getSize(origin), path[2][1] - path[1][1])).to.be.true;
      });

      interval.destroy();
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
