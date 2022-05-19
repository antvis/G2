import { AnnotationConnector } from '../../../../src/shape';
import { mount, createDiv } from '../../../utils/dom';
import { draw, style } from '../helper';

describe('AnnotationConnector shape', () => {
  it('AnnotationConnector has expected defaults', () => {
    expect(AnnotationConnector.props).toEqual({
      defaultEnterAnimation: 'fadeIn',
    });
  });

  it('AnnotationConnector() should return a function draw connector with arrow', () => {
    const container = document.createElement('div');
    const shape = draw({
      shape: AnnotationConnector({ offset: 12 }),
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
