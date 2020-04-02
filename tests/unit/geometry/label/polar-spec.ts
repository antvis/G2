import { getCoordinate } from '@antv/coord';
import { isNumberEqual } from '@antv/util';
import PolarLabel from '../../../../src/geometry/label/polar';
import Point from '../../../../src/geometry/point';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv } from '../../../util/dom';
import { createScale } from '../../../util/scale';

const Theme = getTheme('default');
const PolarCoord = getCoordinate('polar');

describe('polar labels', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 500,
    height: 500,
  });
  const coord = new PolarCoord({
    start: { x: 0, y: 100 },
    end: { x: 100, y: 0 },
  });

  const data = [
    { x: 50, y: 10, z: '1' },
    { x: 100, y: 50, z: '2' },
    { x: 10, y: 50, z: '3' },
  ];
  const points = [
    { x: 50, y: 10, z: 0, _origin: { x: 50, y: 10, z: '1' } },
    { x: 100, y: 50, z: 1, _origin: { x: 100, y: 50, z: '2' } },
    { x: 10, y: 50, z: 2, _origin: { x: 10, y: 50, z: '3' } },
  ];

  const point = coord.convert({
    x: 0.125,
    y: 0.8,
  });
  // @ts-ignore
  point.z = 3;
  // @ts-ignore
  point._origin = { x: point.z, y: point.y, z: '4' };
  // @ts-ignore
  points.push(point);

  const points1 = [
    {
      x: 50,
      y: [10, 20],
      z: ['1', '2'],
      _origin: { x: 50, y: [10, 20], z: ['1', '2'] },
    },
    {
      x: [60, 80],
      y: [50, 50],
      z: ['3', '4'],
      _origin: { x: [60, 80], y: [50, 50], z: ['3', '4'] },
    },
  ];
  const data1 = [
    { x: 50, y: [10, 20], z: ['1', '2'] },
    { x: [60, 80], y: [50, 50], z: ['3', '4'] },
  ];

  describe('one point one label', () => {
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
      z: createScale('z', data),
    };
    const pointGeom = new Point({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    pointGeom.position('x*y').label('z', { offset: 10 });
    pointGeom.init({
      theme: Theme,
    });

    const gLabels = new PolarLabel(pointGeom);
    let items;
    it('get items', () => {
      items = gLabels.getLabelItems(points);
      expect(items.length).toBe(points.length);
    });

    it('first point rotate 0', () => {
      const first = items[0];
      expect(first.x).toBe(points[0].x);
      expect(first.y).toBe(points[0].y - 10);
      expect(first.rotate).toBe(0);
    });

    it('second point rotate 90', () => {
      const second = items[1];
      expect(second.x).toBe(points[1].x + 10);
      expect(second.y).toBe(points[1].y);
      expect(second.rotate).toBe(Math.PI / 2);
    });

    it('third rotate 90', () => {
      // tslint:disable-next-line: no-shadowed-variable
      const point = items[2];
      expect(point.x).toBe(points[2].x - 10);
      expect(isNumberEqual(point.y, points[2].y)).toBe(true);
      expect(point.rotate).toBe(Math.PI / 2);
    });

    it('point rotate 45', () => {
      // tslint:disable-next-line: no-shadowed-variable
      const point = items[3];
      const tmp = coord.convert({
        x: 0.125,
        y: 1,
      });

      expect(point.x).toBe(tmp.x);
      expect(point.y).toBe(tmp.y);
      expect(point.rotate).toBe((45 / 180) * Math.PI);
    });
  });

  describe('one point one label,inner text', () => {
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
      z: createScale('z', data),
    };
    const pointGeom = new Point({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    pointGeom.position('x*y').label('z', { offset: -10 });
    pointGeom.init({
      theme: Theme,
    });

    const gLabels = new PolarLabel(pointGeom);

    let items;
    it('get items', () => {
      items = gLabels.getLabelItems(points);
      expect(items.length).toBe(points.length);
    });

    it('first point rotate 0', () => {
      const first = items[0];
      expect(first.x).toBe(points[0].x);
      expect(first.y).toBe(points[0].y + 10);
      expect(first.rotate).toBe(0);
    });

    it('second point rotate 90', () => {
      const second = items[1];
      expect(second.x).toBe(points[1].x - 10);
      expect(second.y).toBe(points[1].y);
      expect(second.rotate).toBe((90 / 180) * Math.PI);
    });

    it('third rotate 90', () => {
      // tslint:disable-next-line: no-shadowed-variable
      const point = items[2];
      expect(point.x).toBe(points[2].x + 10);
      expect(isNumberEqual(point.y, points[2].y)).toBe(true);
      expect(point.rotate).toBe(Math.PI / 2);
    });

    it('point rotate 45', () => {
      // tslint:disable-next-line: no-shadowed-variable
      const point = items[3];
      const tmp = coord.convert({
        x: 0.125,
        y: 0.6,
      });

      expect(point.x).toBe(tmp.x);
      expect(point.y).toBe(tmp.y);
      expect(point.rotate).toBe((45 / 180) * Math.PI);
    });
  });

  describe('one point two labels,outer text', () => {
    const scales = {
      x: createScale('x', data1),
      y: createScale('y', data1),
      z: createScale('z', data1),
    };
    const pointGeom = new Point({
      data: data1,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    pointGeom.position('x*y').label('z', { offset: 10 });
    pointGeom.init({
      theme: Theme,
    });

    const gLabels = new PolarLabel(pointGeom);

    let items;
    it('get items', () => {
      items = gLabels.getLabelItems(points1);
      expect(items.length).toBe(points1.length * 2);
    });

    it('point rotate 0', () => {
      const first = items[0];
      expect(first.x).toBe(points1[0].x);
      expect(first.y).toBe(points1[0].y[0] + 10);
      expect(first.rotate).toBe(0);

      const second = items[1];
      expect(second.x).toBe(points1[0].x);
      expect(second.y).toBe(points1[0].y[1] - 10);
      expect(second.rotate).toBe(0);
    });

    it('point rotate 90', () => {
      // tslint:disable-next-line: no-shadowed-variable
      let point = items[2];

      expect(point.x).toBe(points1[1].x[0] - 10);
      expect(point.y).toBe(points1[1].y[0]);

      point = items[3];

      expect(point.x).toBe(points1[1].x[1] + 10);
      expect(point.y).toBe(points1[1].y[1]);
    });
  });

  describe('one point two label,inner text', () => {
    const scales = {
      x: createScale('x', data1),
      y: createScale('y', data1),
      z: createScale('z', data1),
    };
    const pointGeom = new Point({
      data: data1,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      coordinate: coord,
    });
    pointGeom.position('x*y').label('z', { offset: -10 });
    pointGeom.init({
      theme: Theme,
    });

    const gLabels = new PolarLabel(pointGeom);

    let items;
    it('get items', () => {
      items = gLabels.getLabelItems(points1);
      expect(items.length).toBe(points1.length * 2);
    });

    it('point rotate 0', () => {
      const first = items[0];
      expect(first.x).toBe(points1[0].x);
      expect(first.y).toBe(points1[0].y[0] - 10);
      expect(first.rotate).toBe(0);

      const second = items[1];
      expect(second.x).toBe(points1[0].x);
      expect(second.y).toBe(points1[0].y[1] + 10);
      expect(second.rotate).toBe(0);
    });

    it('point rotate 90', () => {
      // tslint:disable-next-line: no-shadowed-variable
      let point = items[2];

      expect(point.x).toBe(points1[1].x[0] + 10);
      expect(point.y).toBe(points1[1].y[0]);

      point = items[3];

      expect(point.x).toBe(points1[1].x[1] - 10);
      expect(point.y).toBe(points1[1].y[1]);
    });
  });

  describe('transpose labels', () => {
    const polarCoord = new PolarCoord({
      start: {
        x: 0,
        y: 100,
      },
      end: {
        x: 100,
        y: 0,
      },
    });
    polarCoord.transpose();

    describe('offset < 0', () => {
      const scales = {
        x: createScale('x', data),
        y: createScale('y', data),
        z: createScale('z', data),
      };
      const pointGeom = new Point({
        data,
        scales,
        container: canvas.addGroup(),
        labelsContainer: canvas.addGroup(),
        coordinate: polarCoord,
      });
      pointGeom.position('x*y').label('z', { offset: -10 });
      pointGeom.init({
        theme: Theme,
      });

      const gLabels = new PolarLabel(pointGeom);

      let items;
      it('get items', () => {
        items = gLabels.getLabelItems(points);
        expect(items.length).toBe(points.length);
      });

      it('first point rotate 0', () => {
        const first = items[0];
        expect(first.x).toBe(40.078432583507784);
        expect(first.y).toBe(11.25);
        expect(first.rotate).toBe(0);
      });

      it('second point rotate 90', () => {
        const second = items[1];

        expect(second.x).toBe(99);
        expect(second.y).toBe(40.0501256289338);
        expect(second.rotate).toBe(Math.PI / 2);
      });

      it('third rotate 90', () => {
        // tslint:disable-next-line: no-shadowed-variable
        const point = items[2];
        expect(+point.x.toFixed(2)).toBe(11.25);
        expect(point.y).toBe(59.92156741649222);
        expect(point.rotate).toBe(Math.PI / 2);
      });
    });

    describe('offset > 0', () => {
      const scales = {
        x: createScale('x', data),
        y: createScale('y', data),
        z: createScale('z', data),
      };
      const pointGeom = new Point({
        data,
        scales,
        container: canvas.addGroup(),
        labelsContainer: canvas.addGroup(),
        coordinate: polarCoord,
      });
      pointGeom.position('x*y').label('z', { offset: 10 });
      pointGeom.init({
        theme: Theme,
      });

      const gLabels = new PolarLabel(pointGeom);
      let items;
      it('get items', () => {
        items = gLabels.getLabelItems(points);
        expect(items.length).toBe(points.length);
      });

      it('first point rotate 0', () => {
        const first = items[0];
        expect(first.x).toBe(59.92156741649222);
        expect(first.y).toBe(11.25);
        expect(first.rotate).toBe(0);
      });

      it('second point rotate 90', () => {
        const second = items[1];

        expect(second.x).toBe(99);
        expect(second.y).toBe(59.9498743710662);
        expect(second.rotate).toBe(Math.PI / 2);
      });

      it('third rotate 90', () => {
        // tslint:disable-next-line: no-shadowed-variable
        const point = items[2];

        expect(point.x).toBe(11.25);
        expect(point.y).toBe(40.078432583507784);
        expect(point.rotate).toBe(Math.PI / 2);
      });
    });
  });
});
