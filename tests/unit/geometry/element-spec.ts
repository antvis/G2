import { Group } from '@antv/g';
import { expect } from 'chai';
import Element from '../../../src/geometry/element';
import * as Shape from '../../../src/geometry/shape';

describe('Element', () => {
  let container;
  let element;

  before(() => {
    container = new Group();

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

    expect(container.get('children').length).to.equal(1);
    expect(container.get('children')[0]).to.eql(element.shape);
    expect(element.getOriginStyle().fill).to.eql('#333');
    expect(element.getStates().length).to.equal(0);
  });

  it('getModel', () => {
    const model = element.getModel();
    expect(model).to.eql({ x: 1, y: 1 });
  });

  it('getData()', () => {
    const data = element.getData();
    expect(data).to.eql({ x: 10, y: 10 });
  });

  it('getStateStyle()', () => {
    const activeStyle = element.getStateStyle('active');
    expect(activeStyle).to.eql({
      stroke: '#000',
      lineWidth: 1,
    });
  });

  it('getAnimateCfg()', () => {
    const animateCfg = element.getAnimateCfg('appear');
    expect(animateCfg).to.eql({
      animation: 'fadeIn',
    });
  });

  it('setState()', () => {
    element.setState('selected', true);

    const shape = element.shape;
    expect(shape.attr('fill')).to.equal('red');
    expect(element.getStates()).to.eql(['selected']);

    element.setState('active', true);
    expect(shape.attr('fill')).to.equal('red');
    expect(shape.attr('stroke')).to.equal('#000');
    expect(shape.attr('lineWidth')).to.equal(1);
    expect(element.getStates()).to.eql(['selected', 'active']);

    element.setState('active', true);
    expect(element.getStates()).to.eql(['selected', 'active']);

    element.setState('active', false);
    expect(element.getStates()).to.eql(['selected']);
    expect(shape.attr('fill')).to.equal('red');
    expect(shape.attr('stroke')).to.equal(null);
    expect(shape.attr('lineWidth')).to.equal(0);
  });

  it('hasState()', () => {
    expect(element.hasState('selected')).to.equal(true);
    expect(element.hasState('active')).to.equal(false);
  });

  it('clearStates()', () => {
    element.clearStates();

    expect(element.getStates().length).to.equal(0);
    expect(element.shape.attr('fill')).to.equal('#333');
    expect(element.shape.attr('stroke')).to.equal(null);
    expect(element.shape.attr('lineWidth')).to.equal(0);
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
    expect(shape.attr('lineWidth')).to.equal(20);
    expect(shape.attr('fill')).to.equal('#454545');

    expect(element.getOriginStyle().lineWidth).to.equal(20);
    expect(element.getOriginStyle().fill).to.equal('#454545');
    expect(element.getModel()).to.eql({
      style: {
        lineWidth: 20,
        fill: '#454545',
      },
      origin: {
        _origin: { x: 12 },
      },
    });
    expect(element.getData()).to.eql({ x: 12 });
  });

  it('destroy()', () => {
    element.destroy();

    expect(element.shape.destroyed).to.equal(true);
    expect(container.get('children').length).to.equal(0);
    expect(element.getStates().length).to.equal(0);
    expect(element.getOriginStyle()).to.eql({});
  });
});
