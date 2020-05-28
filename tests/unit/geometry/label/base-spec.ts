import { getCoordinate } from '@antv/coord';
import { deepMix } from '@antv/util';
import Interval from '../../../../src/geometry/interval';
import GeometryLabel from '../../../../src/geometry/label/base';
import Point from '../../../../src/geometry/point';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv } from '../../../util/dom';
import { createScale } from '../../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('GeometryLabel', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 300,
    height: 300,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 100 },
    end: { x: 100, y: 0 },
  });


  describe('Point Label', () => {
    const data = [
      { x: 100, y: 10, z: '1' },
      { x: 100, y: 20, z: '2' },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
      z: createScale('z', data),
    };

    const point = new Point({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      theme: {
        labels: {
          offset: 20,
        },
      },
      coordinate: rectCoord,
    });
    point.position('x*y').label('z', { offset: 10 });
    point.init({
      theme: Theme,
    });

    const geometryLabel = new GeometryLabel(point);
    const labelsContainer = point.labelsContainer;

    it('defaultLayout', () => {
      expect(geometryLabel.defaultLayout).toBeUndefined();
    });

    it('offset', () => {
      // @ts-ignore
      const labelItems = geometryLabel.getLabelItems([
        { x: 100, y: 10, _origin: { x: 100, y: 10, z: '1' } },
        { x: 100, y: 20, _origin: { x: 100, y: 20, z: '2' } },
      ]);
      expect(labelItems[0].y).toBe(0);
      expect(labelItems[1].y).toBe(10);
      expect(labelItems[0].content).toBe('1');
      expect(labelItems[1].content).toBe('2');
      expect(labelItems[1].style).toEqual(Theme.labels.style);
    });

    it('offsetX, offsetY', () => {
      point.label('z', {
        offsetX: 10,
        offsetY: 10,
      });
      geometryLabel.render([
        { x: 100, y: 10, _origin: { x: 100, y: 10, z: '1' } },
        { x: 100, y: 20, _origin: { x: 100, y: 20, z: '2' } },
      ], false);

      // @ts-ignore
      const labelShape1 = labelsContainer.getChildren()[0].find(ele => ele.get('type') === 'text');
      expect(labelShape1.attr('x')).toBe(110);
      expect(labelShape1.attr('y')).toBe(0);
    });

    it('one point two labels', () => {
      point.label(
        'z',
        (zVal) => {
          return {
            content: 'zzzz',
          };
        },
        {
          layout: {
            type: 'overlap',
          },
          offset: 0,
        }
      );

      // @ts-ignore
      const labelItems = geometryLabel.getLabelItems([
        { x: 100, y: [10, 20], _origin: { x: 100, y: [10, 20], z: ['1', '2'] } },
        { x: 100, y: [30, 40], _origin: { x: 100, y: [30, 40], z: ['3', '4'] } },
      ]);
      expect(labelItems.length).toBe(2);
      expect(labelItems[0].content).toBe('zzzz');
      expect(labelItems[0].y).toBe(20);
      expect(labelItems[0].x).toBe(100);
      expect(labelItems[1].content).toBe('zzzz');
      expect(labelItems[1].y).toBe(40);
      expect(labelItems[1].x).toBe(100);
    });
  });

  describe('Interval Label', () => {
    const data = [
      { x: 100, y: 10, z: '1' },
      { x: 100, y: 20, z: '2' },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
      z: createScale('z', data),
    };
    let interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      theme: {
        labels: {
          offset: 20,
        },
      },
      coordinate: rectCoord,
    });
    interval.position('x*y').label('z', { offset: -10 });
    interval.init({
      theme: Theme,
    });

    let geometryLabel = new GeometryLabel(interval);

    it('inner label', () => {
      const labelItems = geometryLabel.getLabelItems([
        { x: 100, y: 10, _origin: { x: 100, y: 10, z: '1' } },
        { x: 100, y: 20, _origin: { x: 100, y: 20, z: '2' } },
      ]);
      expect(labelItems.length).toBe(2);
      expect(labelItems[0].style.fill).toBe('#FFFFFF');
    });

    it('two two point inner label', () => {
      interval.label('z', {
        offset: -10,
        labelLine: true,
      });
      const labelItems = geometryLabel.getLabelItems([
        { x: 100, y: [10, 20], _origin: { x: 100, y: [10, 20], z: ['1', '2'] } },
        { x: 100, y: [30, 40], _origin: { x: 100, y: [30, 40], z: ['3', '4'] } },
      ]);
      expect(labelItems.length).toBe(4);
      expect(labelItems[0].style.fill).toBe('#FFFFFF');
    });

    it('stack points', () => {
      const data1 = [
        { x: 0, y: 10, text: 'a' },
        { x: 0, y: [10, 20], text: 'b' },
      ];
      const scales1 = {
        x: createScale('x', data1),
        y: createScale('y', data1),
        text: createScale('text', data1),
      };
      interval = new Interval({
        data: data1,
        scales: scales1,
        container: canvas.addGroup(),
        labelsContainer: canvas.addGroup(),
        theme: {
          labels: {
            offset: 20,
          },
        },
        coordinate: rectCoord,
      });
      interval.position('x*y').label('text', {
        offset: 10,
        labelLine: true,
      });
      interval.init({
        theme: Theme,
      });

      geometryLabel = new GeometryLabel(interval);
      const items = geometryLabel.getLabelItems([
        { x: 0, y: 10, _origin: { x: 0, y: 10, text: 'a' } },
        { x: 0, y: [10, 20], _origin: { x: 0, y: [10, 20], text: 'b' } },
      ]);
      expect(items.length).toBe(2);

      const first = items[0];
      const second = items[1];
      expect(first.x).toBe(0);
      expect(first.y).toBe(0);
      expect(second.x).toBe(0);
      expect(second.y).toBe(10);
    });
  });

  describe('transposed label', () => {
    const coord = new CartesianCoordinate({
      start: {
        x: 0,
        y: 100,
      },
      end: {
        x: 100,
        y: 0,
      },
    });
    coord.transpose();

    const points = [
      { x: 100, y: 10, _origin: { x: 100, y: 10, z: '1' } },
      { x: 100, y: 20, _origin: { x: 100, y: 20, z: '2' } },
    ];

    const data = [
      { x: 100, y: 10, z: '1' },
      { x: 100, y: 20, z: '2' },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
      z: createScale('z', data),
    };

    let interval = new Interval({
      data,
      scales,
      container: canvas.addGroup(),
      labelsContainer: canvas.addGroup(),
      theme: {
        labels: {
          offset: 20,
        },
      },
      coordinate: coord,
    });
    interval.position('x*y').label('z', { offset: 10 });
    interval.init({
      theme: Theme,
    });

    let gLabels = new GeometryLabel(interval);

    it('offset > 0', () => {
      const items = gLabels.getLabelItems(points);
      const first = items[0];
      expect(first.x).toBe(points[0].x + 10);
      expect(first.y).toBe(points[0].y);
    });

    it('offset = 0', () => {
      interval.label('z', {
        offset: 0,
      });

      const items = gLabels.getLabelItems(points);
      const first = items[0];
      expect(first.x).toBe(points[0].x);
      expect(first.y).toBe(points[0].y);
    });

    it('offset < 0', () => {
      interval.label('z', {
        offset: -10,
      });

      const items = gLabels.getLabelItems(points);
      const first = items[0];
      expect(first.x).toBe(points[0].x - 10);
      expect(first.y).toBe(points[0].y);
    });

    it('multiple labels', () => {
      const points1 = [
        {
          x: [90, 100],
          y: [20, 20],
          _origin: {
            x: [90, 100],
            y: [20, 20],
            z: ['1', '2'],
          },
        },
        {
          x: [30, 40],
          y: [40, 40],
          _origin: {
            x: [30, 40],
            y: [40, 40],
            z: ['3', '4'],
          },
        },
      ];
      const data1 = [
        { x: [90, 100], y: [20, 20], z: ['1', '2'] },
        { x: [30, 40], y: [40, 40], z: ['3', '4'] },
      ];
      const scales1 = {
        x: createScale('x', data1),
        y: createScale('y', data1),
        z: createScale('z', data1),
      };
      interval = new Interval({
        data: data1,
        scales: scales1,
        container: canvas.addGroup(),
        labelsContainer: canvas.addGroup(),
        theme: {
          labels: {
            offset: 20,
          },
        },
        coordinate: coord,
      });
      interval.position('x*y').label('z', { offset: 10 });
      interval.init({
        theme: Theme,
      });

      gLabels = new GeometryLabel(interval);

      const items = gLabels.getLabelItems(points1);
      const first = items[0];

      expect(first.x).toBe(80);
      expect(first.y).toBe(points1[0].y[0]);

      const second = items[1];

      expect(second.x).toBe(110);
      expect(second.y).toBe(points1[0].y[0]);
    });

    it('multiple labels inner', () => {
      const points3 = [
        {
          x: [90, 100],
          y: [20, 20],
          z: ['1', '2'],
          _origin: {
            x: [90, 100],
            y: [20, 20],
            z: ['1', '2'],
          },
        },
        {
          x: [30, 40],
          y: [40, 40],
          z: ['3', '4'],
          _origin: {
            x: [30, 40],
            y: [40, 40],
            z: ['3', '4'],
          },
        },
      ];
      const data1 = [
        { x: [90, 100], y: [20, 20], z: ['1', '2'] },
        { x: [30, 40], y: [40, 40], z: ['3', '4'] },
      ];
      const scales1 = {
        x: createScale('x', data1),
        y: createScale('y', data1),
        z: createScale('z', data1),
      };
      interval = new Interval({
        data: data1,
        scales: scales1,
        container: canvas.addGroup(),
        labelsContainer: canvas.addGroup(),
        theme: {
          labels: {
            offset: 20,
          },
        },
        coordinate: coord,
      });
      interval.position('x*y').label('z', { offset: -10 });
      interval.init({
        theme: Theme,
      });

      gLabels = new GeometryLabel(interval);

      const items = gLabels.getLabelItems(points3);
      const first = items[0];

      expect(first.x).toBe(100);
      expect(first.y).toBe(points3[0].y[0]);

      const second = items[1];
      expect(second.x).toBe(90);
      expect(second.y).toBe(points3[0].y[0]);
    });
  });
});
