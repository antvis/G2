import { Connector } from '../../../src/mark/connector';
import { Band } from '../../../src/scale';
import { plot } from './helper';

describe('Connector', () => {
  it('Connector has expected props', () => {
    expect(Connector.props).toEqual({
      defaultShape: 'connector',
      defaultLabelShape: 'label',
      channels: [
        { name: 'color' },
        { name: 'opacity' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay', scaleName: 'enter' },
        { name: 'enterDuration', scaleName: 'enter' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'groupKey', scale: 'identity' },
        { name: 'label', scale: 'identity' },
        { name: 'x', required: true },
        { name: 'y', required: true },
      ],
      preInference: [],
      postInference: [{ type: 'maybeKey' }],
      shapes: ['connector'],
    });
  });

  it('Connector() returns a function draw basic annotation', () => {
    const [I, P] = plot({
      mark: Connector({}),
      index: [0, 1],
      channel: {
        x: [0.1, 0.2],
        x1: [0.9, 0.8],
        y: [0.1, 0.2],
        y1: [0.9, 0.8],
      },
    });

    expect(I).toEqual([0, 1]);
    expect(P).toEqual([
      [
        [60, 40],
        [540, 360],
      ],
      [
        [120, 80],
        [480, 320],
      ],
    ]);
  });

  it('Connector() returns a function draw connector annotation with bandScale', () => {
    const [I, P] = plot({
      mark: Connector({}),
      index: [0],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [0],
        x1: [1 / 3],
        y: [0.1],
        y1: [0.9],
      },
    });

    expect(I).toEqual([0]);
    expect(P).toEqual([
      [
        [100, 40],
        [300, 360],
      ],
    ]);
  });
});
