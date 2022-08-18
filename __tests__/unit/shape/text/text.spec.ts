import { Text } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Text', () => {
  it('Text has expected defaults', () => {
    expect(Text.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Text() returns a function draw text', () => {
    const shape = Text({})([[0, 0]], {}, [], { defaultColor: 'red' });
    expect(shape.style.fill).toBe('red');
  });

  it('Text() returns a function draw text using color as fill and stroke', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: Text({}),
      container,
      value: {
        text: 'hello',
        color: 'steelblue',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('text');
    expect(style(shape, ['x', 'y'])).toEqual({ x: 75, y: 25 });
    expect(shape.style.fontSize).toEqual(14);
    expect(style(shape, ['fill', 'stroke', 'lineWidth'])).toEqual({
      fill: 'steelblue',
      stroke: 'steelblue',
      lineWidth: 0,
    });
  });

  it('Text({...}) returns a function draw text with custom style', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: Text({
        fill: 'red',
        fontSize: 18,
        textAlign: 'right',
        textTransform: 'uppercase',
        lineWidth: 1,
      }),
      container,
      value: {
        text: 'hello',
        color: 'steelblue',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('text');
    expect(
      style(shape, [
        'fill',
        'stroke',
        'steelblue',
        'textAlign',
        'textTransform',
        'lineWidth',
      ]),
    ).toMatchObject({
      fill: 'red',
      stroke: 'steelblue',
      textAlign: 'right',
      textTransform: 'uppercase',
      lineWidth: 1,
    });

    // expect(shape.style.text).toEqual('HELLO');
  });

  it('Text({...}) returns a function draw text which enable custom wordWrap', async () => {
    const container = document.createElement('div');
    let shape = await draw({
      width: 150,
      height: 50,
      shape: Text({
        wordWrap: false,
        wordWrapWidth: 8,
        textAlign: 'left',
      }),
      container,
      value: {
        text: 'Good afternoon, everybody',
        color: 'steelblue',
      },
      vectors: [[0.5, 0.5]],
    });
    expect(shape.getBoundingClientRect().width).toBeGreaterThan(80);
    shape = await draw({
      width: 150,
      height: 250,
      shape: Text({
        wordWrap: true,
        wordWrapWidth: 80,
        textAlign: 'left',
      }),
      container,
      value: {
        text: 'Good afternoon, everybody',
        color: 'steelblue',
      },
      vectors: [[0.5, 0.5]],
    });
    expect(shape.getBoundingClientRect().width).not.toBeGreaterThan(80);
    // @ts-ignore
    expect(shape.getLineBoundingRects().length).toBeGreaterThan(1);
    mount(createDiv(), container);
  });

  it('Text() returns a function draw rotate text', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      width: 150,
      height: 50,
      shape: Text({}),
      container,
      value: {
        text: 'hello',
        color: 'steelblue',
        rotate: '90',
      },
      vectors: [[0.5, 0.5]],
    });
    mount(createDiv(), container);

    const { right } = shape.getBoundingClientRect();
    expect(Math.abs(right - 96)).toBeLessThanOrEqual(1);
  });
});
