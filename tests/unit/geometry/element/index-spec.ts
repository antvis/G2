import { getCoordinate, Group } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element';
import * as Shape from '../../../../src/geometry/shape/base';
import '../../../../src/geometry/shape/interval';
import Theme from '../../../../src/theme/antv';

const Rect = getCoordinate('rect');

describe('Element', () => {
  let container;
  let element;

  beforeAll(() => {
    container = new Group({});

    Shape.registerShapeFactory('shapes', {
      defaultShapeType: 'circle',
    });

    Shape.registerShape('shapes', 'circle', {
      draw(cfg, ele) {
        const shapeContainer = ele.container;

        return shapeContainer.addShape('circle', {
          attrs: {
            x: 20,
            y: 20,
            r: 20,
            ...cfg.style,
          },
        });
      },
      update(cfg, ele) {
        const shape = ele.shape;

        shape.attr(cfg.style);
      },
    });
  });

  describe('Default', () => {
    it('Instantiation', () => {
      const shapeFactory = Shape.getShapeFactory('shapes');
      element = new Element({
        data: { x: 10, y: 10 },
        model: { x: 1, y: 1, animate: true },
        shapeType: 'circle',
        shapeFactory,
        theme: {
          circle: {
            default: {
              fill: '#333',
              lineWidth: 0,
            },
            active: {
              stroke: '#000',
              lineWidth: 1,
            },
            selected: {
              fill: 'red',
            },
          },
        },
        container,
      });

      expect(container.get('children').length).toBe(1);
      expect(container.get('children')[0]).toEqual(element.shape);
      expect(element.getOriginStyle().fill).toEqual('#333');
      expect(element.getStates().length).toBe(0);
    });

    it('getModel', () => {
      const model = element.getModel();
      expect(model).toEqual({ x: 1, y: 1, animate: true });
    });

    it('getData()', () => {
      const data = element.getData();
      expect(data).toEqual({ x: 10, y: 10 });
    });

    it('getStateStyle()', () => {
      const activeStyle = element.getStateStyle('active');
      expect(activeStyle).toEqual({
        stroke: '#000',
        lineWidth: 1,
      });
    });

    it('getAnimateCfg(), model.animate is true but no default animate config.', () => {
      const animateCfg = element.getAnimateCfg('enter');
      expect(animateCfg).toEqual(null);
    });

    it('setState()', () => {
      element.setState('selected', true);

      const shape = element.shape;
      expect(shape.attr('fill')).toBe('red');
      expect(element.getStates()).toEqual(['selected']);

      element.setState('active', true);
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('stroke')).toBe('#000');
      expect(shape.attr('lineWidth')).toBe(1);
      expect(element.getStates()).toEqual(['selected', 'active']);

      element.setState('active', true);
      expect(element.getStates()).toEqual(['selected', 'active']);

      element.setState('active', false);
      expect(element.getStates()).toEqual(['selected']);
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('stroke')).toBe(null);
      expect(shape.attr('lineWidth')).toBe(0);

      element.setState('otherState', false);
      expect(element.getStates()).toEqual(['selected']);
    });

    it('hasState()', () => {
      expect(element.hasState('selected')).toBe(true);
      expect(element.hasState('active')).toBe(false);
    });

    it('clearStates()', () => {
      element.clearStates();

      expect(element.getStates().length).toBe(0);
      expect(element.shape.attr('fill')).toBe('#333');
      expect(element.shape.attr('stroke')).toBe(null);
      expect(element.shape.attr('lineWidth')).toBe(0);
    });

    it('update()', () => {
      element.update({
        style: {
          lineWidth: 20,
          fill: '#454545',
        },
        origin: {
          _origin: { x: 12 },
        },
        data: { x: 12 },
      });

      const shape = element.shape;
      expect(shape.attr('lineWidth')).toBe(20);
      expect(shape.attr('fill')).toBe('#454545');

      expect(element.getOriginStyle().lineWidth).toBe(20);
      expect(element.getOriginStyle().fill).toBe('#454545');
      expect(element.getModel()).toEqual({
        style: {
          lineWidth: 20,
          fill: '#454545',
        },
        origin: {
          _origin: { x: 12 },
        },
        data: { x: 12 },
      });
      expect(element.getData()).toEqual({ x: 12 });
    });

    it('destroy()', () => {
      element.destroy();

      expect(element.shape.destroyed).toBe(true);
      expect(container.get('children').length).toBe(0);
      expect(element.getStates().length).toBe(0);
      expect(element.getOriginStyle()).toEqual({});
    });
  });

  describe('getAnimateCfg()', () => {
    const coordinate = new Rect({
      start: { x: 0, y: 0 },
      end: { x: 200, y: 200 },
    });
    const shapeFactory = Shape.getShapeFactory('interval');
    shapeFactory.setCoordinate(coordinate);

    it('model.animate is false', () => {
      element = new Element({
        data: { x: 10, y: 10 },
        model: {
          x: 1,
          y: 1,
          points: [
            { x: 0.03571428571428571, y: 1 },
            { x: 0.03571428571428571, y: 0.622 },
            { x: 0.10714285714285714, y: 0.622 },
            { x: 0.10714285714285714, y: 1 },
          ],
          animate: false,
        },
        shapeType: 'rect',
        shapeFactory,
        theme: Theme,
        container,
      });

      // @ts-ignore
      expect(element.getAnimateCfg('update')).toBe(null);
    });

    it('model.animate is not empty', () => {
      element.model.animate = {
        update: {
          delay: 1000,
        },
        destroy: false,
      };
      // @ts-ignore
      expect(element.getAnimateCfg('update')).toEqual({
        duration: 450,
        easing: 'easeQuadInOut',
        delay: 1000,
      });
      // @ts-ignore
      expect(element.getAnimateCfg('destroy')).toBe(null);
    });
  });
});
