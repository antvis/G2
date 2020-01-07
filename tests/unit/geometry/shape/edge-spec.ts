import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import EdgeShapeFactory from '../../../../src/geometry/shape/edge';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const RectCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');

describe('Edge Shapes', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 500,
    height: 500,
  });
  const container = canvas.addGroup();
  const coord = new RectCoordinate({
    start: { x: 0, y: 500 },
    end: { x: 500, y: 0 },
  });

  it('get default shape', () => {
    expect(EdgeShapeFactory.defaultShapeType).toBe('line');
  });

  describe('line shape', () => {
    it('get shape', () => {
      const shape = EdgeShapeFactory.getShape('line');
      expect(shape).toBeDefined();
    });

    it('get points', () => {
      const obj = {
        x: [0.1, 0.2],
        y: [0.3, 0.5],
      };
      const points = EdgeShapeFactory.getShapePoints('line', obj);
      expect(points.length).toBe(2);
      expect(points[0].x).toBe(0.1);
      expect(points[0].y).toBe(0.3);
    });

    it('draw shape', () => {
      EdgeShapeFactory.coordinate = coord;
      const obj = {
        x: [0.2, 0.4],
        y: [0.5, 0.5]
      };
      const points = EdgeShapeFactory.getShapePoints('line', obj);
      const shape = EdgeShapeFactory.drawShape('line', {
        points,
        color: 'red',
        x: 10,
        y: 10,
      }, container);

      expect(shape.attr('path')).toEqual([['M', 100, 250], ['L', 200, 250]]);
      expect(shape.attr('stroke')).toBe('red');
      expect(container.get('children').length).toBe(1);
    });

    it('draw shape vhv', () => {
      EdgeShapeFactory.coordinate = coord;
      const obj = {
        x: [0.1, 0.1],
        y: [0.1, 0.3]
      };
      const points = EdgeShapeFactory.getShapePoints('vhv', obj);
      const shape = EdgeShapeFactory.drawShape('vhv', {
        points,
        color: 'red',
        x: 10,
        y: 10,
      }, container);
      expect(shape.attr('path').length).toBe(4);

    });
    it('draw shape arc rect', () => {
      EdgeShapeFactory.coordinate = coord;
      const obj = {
        x: [0.2, 0.4],
        y: [0.5, 0.5]
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'red',
        x: 10,
        y: 10,
      }, container);
      expect(shape.attr('path')).toEqual([
        ['M', 100, 250],
        ['A', 50, 50, 0, 0, 1, 200, 250],
      ]);
    });

    it('draw shape arc rect hasWeight', () => {
      const obj = {
        x: [0.2, 0.4, 0.6, 0.7],
        y: [0.1, 0.1, 0.5, 0.5]
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'green',
        x: 10,
        y: 10,
      }, container);
      expect(shape.attr('path').length).toBe(7);
      expect(shape.attr('fill')).toBe('green');
    });

  });

  describe('edge shape test polar', () => {
    const polarCoord = new PolarCoordinate({
      start: { x: 0, y: 500 },
      end: { x: 500, y: 0 },
    });

    it('draw shape arc polar hasWeight', () => {
      EdgeShapeFactory.coordinate = polarCoord;
      const obj = {
        x: [0.2, 0.4, 0.6, 0.7],
        y: [0.5, 0.5, 0.5, 0.5]
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'green',
        isInCircle: true,
        x: 10,
        y: 10,
      }, container);
      expect(shape.attr('path').length).toBe(8);
      expect(shape.attr('path')).toEqual(
        [
          ['M', 368.8820645368942, 211.37287570313157],
          ['Q',
            250.00000000000003,
            0,
            131.11793546310582,
            288.62712429686843],
          ['A',
            124.99999999999999,
            124.99999999999999,
            0,
            1,
            1,
            131.11793546310582,
            288.62712429686843],
          ['A',
            125,
            125,
            0,
            0,
            0,
            176.52684346344085,
            351.12712429686843],
          ['Q',
            250.00000000000003,
            0,
            323.47315653655915,
            351.12712429686843],
          ['A',
            125,
            125,
            0,
            0,
            1,
            323.47315653655915,
            351.12712429686843],
          ['A',
            124.99999999999999,
            124.99999999999999,
            0,
            0,
            0,
            368.8820645368942,
            211.37287570313157],
          ['Z']
        ]
      );
    });
    it('draw shape arc polar', () => {
      EdgeShapeFactory.coordinate = polarCoord;
      const obj = {
        x: [0.2, 0.4],
        y: [0.5, 0.5]
      };
      const points = EdgeShapeFactory.getShapePoints('arc', obj);
      const shape = EdgeShapeFactory.drawShape('arc', {
        points,
        color: 'red',
        isInCircle: true,
        x: 230,
        y: 250
      }, container);
      expect(shape.attr('path').length).toBe(2);
      expect(shape.attr('path')).toEqual(
        [
          ['M', 368.8820645368942, 211.37287570313157],
          ['Q', 250.00000000000003, 0, 323.47315653655915, 351.12712429686843]
        ]
      );
    });
  });
});
