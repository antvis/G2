import { Connector } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('Connector shape', () => {
  it('Connector has expected defaults', () => {
    expect(Connector.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('Connector() should return a function draw connector with arrow', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Connector({ connectLength1: 12 }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.1, 0.5],
        [0.4, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.nodeName).toBe('g');
    expect(shape.querySelector('.marker')).not.toBeNull();
    expect(style(shape, ['points'])).toEqual({
      points: [
        [60, 200],
        [60, 188],
        [240, 188],
        [240, 200],
      ],
    });
  });

  it('Connector() should return a function draw connector without arrow', async () => {
    const container = document.createElement('div');
    const shape = await draw({
      shape: Connector({ endMarker: false }),
      container,
      value: {
        color: 'steelblue',
      },
      vectors: [
        [0.1, 0.5],
        [0.4, 0.5],
      ],
    });
    mount(createDiv(), container);

    expect(shape.querySelector('.marker')).toBeNull();
  });
});
