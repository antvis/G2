import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { Interaction, registerInteraction, View } from '../../../../src';

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

const foregroundGroup = new Group({});
const middleGroup = new Group({});
const backgroundGroup = new Group({});

canvas.appendChild(backgroundGroup);
canvas.appendChild(middleGroup);
canvas.appendChild(foregroundGroup);

describe('view setter api', () => {
  const v = new View({
    parent: undefined,
    canvas,
    foregroundGroup,
    middleGroup,
    backgroundGroup,
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

  it('geometry', () => {
    v.interval({ columnWidthRatio: 0.6 });

    expect(v.geometries.length).toBe(1);
    // @ts-ignore
    expect(v.geometries[0].options.columnWidthRatio).toBe(0.6);
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
    expect(v.interactions.highlight).toBeUndefined();
    registerInteraction('highlight', class extends Interaction {
      public init() {}
    });

    v.interaction('highlight', { a: 1 });
    const instance = v.interactions.highlight;
    expect(v.interactions.highlight).toBeDefined();

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
