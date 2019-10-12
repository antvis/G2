import { Group } from '../../src/dependents';
import Element from '../../src/element';
import * as Shape from '../../src/shape/base';

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

  it('Instantiation', () => {
    const shapeFactory = Shape.getShapeFactory('shapes');
    element = new Element({
      data: { x: 10, y: 10 },
      model: { x: 1, y: 1 },
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
          animate: {
            appear: {
              animation: 'fadeIn',
            },
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
    expect(model).toEqual({ x: 1, y: 1 });
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

  it('getAnimateCfg()', () => {
    const animateCfg = element.getAnimateCfg('appear');
    expect(animateCfg).toEqual({
      animation: 'fadeIn',
    });
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
