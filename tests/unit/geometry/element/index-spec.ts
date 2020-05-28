import { getEngine } from '../../../../src/';
import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element';
import * as Shape from '../../../../src/geometry/shape/base';
import '../../../../src/geometry/shape/interval';
import { getTheme } from '../../../../src/theme/';

const Rect = getCoordinate('rect');
const G = getEngine('canvas');
const Theme = getTheme('default');

describe('Element', () => {
  let container;
  let offscreenContainer;
  let element;

  beforeAll(() => {
    container = new G.Group({});
    offscreenContainer = new G.Group({});

    Shape.registerShapeFactory('shapes', {
      defaultShapeType: 'circle',
    });

    Shape.registerShape('shapes', 'circle', {
      draw(cfg, group) {
        return group.addShape('circle', {
          attrs: {
            x: 20,
            y: 20,
            r: 20,
            ...cfg.defaultStyle,
            ...cfg.style,
          },
        });
      },
    });
  });

  describe('Default', () => {
    it('Instantiation', () => {
      const shapeFactory = Shape.getShapeFactory('shapes');
      shapeFactory.theme = {
        circle: {
            default: {
            style: {
              fill: '#333',
                lineWidth: 0,
              },
          },
          active: {
            style: {
              shapes: {
                stroke: '#000',
                  lineWidth: 1,
                },
            },
          },
          selected: {
            style: {
              shapes: {
                fill: 'red',
                }
            },
          },
        },
      },
      element = new Element({
        shapeFactory,
        container,
        offscreenGroup: offscreenContainer,
        visible: false,
      });
      element.geometry = {
        animateOption: false,
      };
      expect(element.getStates().length).toBe(0);
    });

    it('draw()', () => {
      element.draw({
        x: 1,
        y: 1,
        data: { a: 1, b: 10 },
        shape: ['circle', 'dadada'],
        defaultStyle: {
          fill: '#333',
          lineWidth: 0,
        },
      });

      expect(element.shape.get('name')).toEqual(["element", "shapes"]);
      expect(container.get('children').length).toBe(1);
      expect(container.get('children')[0]).toEqual(element.shape);
      expect(element.shape.get('visible')).toBe(false);
      // @ts-ignore
      expect(element.shapeType).toBe('circle');
    });

    it('getModel', () => {
      const model = element.getModel();
      expect(model).toEqual({
        x: 1,
        y: 1,
        data: { a: 1, b: 10 },
        shape: ['circle', 'dadada'],
        defaultStyle: {
          fill: '#333',
          lineWidth: 0,
        },
      });
    });

    it('getData()', () => {
      const data = element.getData();
      expect(data).toEqual({ a: 1, b: 10 });
    });

    it('getStateStyle()', () => {
      const activeStyle = element.getStateStyle('active', 'shapes');
      expect(activeStyle).toEqual({
        stroke: '#000',
        lineWidth: 1,
      });

      const defaultStyle = element.getStateStyle('default');
      expect(defaultStyle).toEqual({
        fill: '#333',
        lineWidth: 0,
      });
    });

    it('getAnimateCfg(), model.animate is true but no default animate config.', () => {
      const animateCfg = element.getAnimateCfg('enter');
      expect(animateCfg).toEqual(null);
    });

    it('show()', () => {
      element.show();
      expect(element.visible).toBe(true);
      expect(element.shape.get('visible')).toBe(true);
    });

    it('changeVisible()', () => {
      element.changeVisible(false);
      expect(element.visible).toBe(false);
      expect(element.shape.get('visible')).toBe(false);
    });

    it('setState()', () => {
      element.setState('selected', true);

      const shape = element.shape;
      expect(shape.attr('fill')).toBe('red');
      expect(element.getStates()).toEqual(['selected']);

      // 恢复至原始状态
      element.setState('selected', false);
      expect(element.getStates()).toEqual([]);
      expect(shape.attr('fill')).toBe('#333');

      element.setState('selected', true);
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
      expect(shape.attr('stroke')).toBe(undefined);
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
      expect(element.shape.attr('stroke')).toBe(undefined);
      expect(element.shape.attr('lineWidth')).toBe(0);
    });

    it('update()', () => {
      element.update({
        style: {
          lineWidth: 20,
          fill: '#454545',
        },
        mappingData: {
          _origin: { x: 12 },
        },
        data: { x: 12 },
        defaultStyle: {
          fill: '#333',
          lineWidth: 0,
        },
      });

      const shape = element.shape;
      expect(shape.attr('lineWidth')).toBe(20);
      expect(shape.attr('fill')).toBe('#454545');

      expect(element.getModel()).toEqual({
        style: {
          lineWidth: 20,
          fill: '#454545',
        },
        mappingData: {
          _origin: { x: 12 },
        },
        data: { x: 12 },
        defaultStyle: {
          fill: '#333',
          lineWidth: 0,
        },
      });
      expect(element.getData()).toEqual({ x: 12 });
    });

    it('getBBox()', () => {
      expect(element.getBBox()).toEqual(element.shape.getCanvasBBox());

      const labelGroup = new G.Group({});
      labelGroup.addShape({
        type: 'text',
        attrs: {
          x: 10,
          y: 10,
          text: '123',
          fill: '#333',
        },
      });
      // @ts-ignore
      element.labelShape = [labelGroup];
      expect(element.getBBox()).toEqual({
        height: 42,
        maxX: 40,
        maxY: 40,
        minX: 0,
        minY: -2,
        width: 40,
        x: 0,
        y: -2,
      });
    });

    it('destroy()', () => {
      element.destroy();

      expect(element.shape).toBeUndefined();
      expect(container.get('children').length).toBe(0);
      expect(element.getStates().length).toBe(0);
    });
  });

  describe('get animation configuration and event.', () => {
    const coordinate = new Rect({
      start: { x: 0, y: 0 },
      end: { x: 200, y: 200 },
    });
    const shapeFactory = Shape.getShapeFactory('interval');
    shapeFactory.coordinate = coordinate;
    shapeFactory.theme = Theme;

    it('model.animate is false', () => {
      element = new Element({
        shapeFactory,
        container,
      });
      element.animate = false;
      // @ts-ignore
      expect(element.getAnimateCfg('update')).toBe(null);
      expect(element.getAnimateCfg('appear')).toBe(null);
    });

    it('model.animate is not empty', () => {
      element.animate = {
        update: {
          delay: 1000,
        },
        leave: false,
        appear: null,
      };

      // @ts-ignore
      expect(element.getAnimateCfg('update')).toEqual({
        delay: 1000,
      });
      // @ts-ignore
      expect(element.getAnimateCfg('leave')).toBe(false);
      // @ts-ignore
      expect(element.getAnimateCfg('appear')).toBe(null);
    });
  });
});
