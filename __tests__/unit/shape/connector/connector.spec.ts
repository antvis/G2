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
      shape: Connector({ offset: 12 }),
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
    expect(style(shape, ['connectorPath'])).toEqual({
      connectorPath: 'M60,200L60,188L240,188L240,200',
    });
    // @ts-ignore
    expect(shape.endMarker.style.symbol(0, 0, 8)).toEqual([
      ['M', 0, 0],
      ['L', -8, -16],
      ['L', 8, -16],
      ['Z'],
    ]);
  });
});
