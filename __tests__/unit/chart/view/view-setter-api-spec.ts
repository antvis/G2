import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { View } from '../../../../src';

// @ts-ignore
const canvasRenderer = new Renderer();

// create a canvas
// @ts-ignore
const canvas = new Canvas({
  container: createDiv(),
  width: 400,
  height: 300,
  renderer: canvasRenderer,
});

canvas.width = 400;
canvas.height = 300;

describe('view setter api', () => {
  const v = new View({
    parent: undefined,
    canvas,
    foregroundGroup: null,
    middleGroup: null,
    backgroundGroup: null,
  });

  it('id', () => {
    expect(v.id).toBeTruthy();
  });

  it('data', () => {
    v.data([{ a: 1, b: 2 }]);

    expect(v.getOriginalData()).toEqual([{ a: 1, b: 2 }]);
  });

  it('scale', () => {
    v.scale('x', {
      type: 'cat',
    });

    v.scale({
      y: {
        type: 'linear',
        min: 0,
        max: 100,
      },
    });

    expect(v.getOptions().scales).toEqual({
      x: {
        type: 'cat',
      },
      y: {
        type: 'linear',
        min: 0,
        max: 100,
      },
    });
  });

  it('coordinate', () => {
    v.coordinate({
      type: 'polor',
      cfg: {
        radius: 0.5,
      },
      actions: [['transpose']],
    });

    expect(v.getOptions().coordinate).toEqual({
      type: 'polor',
      cfg: {
        radius: 0.5,
      },
      actions: [['transpose']],
    });
  });

  it('axis', () => {
    v.axis('x', { position: 'top' });
    v.axis('y', { position: 'left' });

    expect(v.getOptions().axes).toEqual({
      x: {
        position: 'top',
      },
      y: {
        position: 'left',
      },
    });

    v.axis(false);
    expect(v.getOptions().axes).toBe(false);
  });

  it('legend', () => {
    v.legend('x', { position: 'top' });

    expect(v.getOptions().legends).toEqual({
      x: {
        position: 'top',
      },
    });

    v.legend(false);
    expect(v.getOptions().legends).toBe(false);
  });

  it('tooltip', () => {
    v.tooltip({
      shared: true,
    });

    expect(v.getOptions().tooltip).toEqual({
      shared: true,
    });

    v.tooltip(false);
    expect(v.getOptions().tooltip).toBe(false);
  });

  it('animate', () => {
    v.animate(true);

    expect(v.getOptions().animate).toBe(true);
  });

  it('interaction', () => {
    v.interaction('highlight', { a: 1 });

    const instance = v.interactions.highlight;
    expect(instance).toBeDefined();

    v.interaction('highlight', { a: 2 });
    expect(v.interactions.highlight).not.toBe(instance);
  });

  it('facet', () => {
    v.facet('rect', { row: 'a' });

    const instance = v.facetInstance;
    expect(instance).toBeDefined();

    v.facet('rect', { row: 'b' });
    expect(v.facetInstance).not.toBe(instance);

    expect(() => {
      v.facet('invalid', {});
    }).toThrow("facet 'invalid' is not exist!");
  });

  it('theme', () => {});

  it('filter', () => {
    const condition = jest.fn();
    v.filter('a', condition);
    expect(v.getOptions().filters).toEqual({ a: condition });

    v.filter('a');
    expect(v.getOptions().filters).toEqual({});

    v.filter('a', condition);
    v.filter('b', condition);
    expect(v.getOptions().filters).toEqual({
      a: condition,
      b: condition,
    });
  });

  afterAll(() => {
    v.destroy();
    canvas.destroy();
  });
});
