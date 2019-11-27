import { isModelChange } from '../../../../src/geometry/util/is-model-change';

describe('isModelChange', () => {
  it('isModelChange', () => {
    const model1 = {
      data: { type: 'A', value: 10 },
      x: [200, 257.0151694723699],
      y: [109, 127.5253515456301],
      color: '#5B8FF9',
      isInCircle: true,
      points: [
        { x: 4.999999997368221e-8, y: 0 },
        { x: 4.999999997368221e-8, y: 0.1 },
        { x: 0.9999999500000001, y: 0.1 },
        { x: 0.9999999500000001, y: 0 },
      ],
      nextPoints: [
        { x: 4.999999997368221e-8, y: 0.1 },
        { x: 4.999999997368221e-8, y: 0.3 },
        { x: 0.9999999500000001, y: 0.3 },
        { x: 0.9999999500000001, y: 0.1 },
      ],
    };

    const model2 = {
      data: { type: 'A', value: 10 },
      x: [200, 257.0151694723699],
      y: [109, 127.5253515456301],
      color: '#5B8FF9',
      isInCircle: true,
      points: [
        { x: 4.999999997368221e-8, y: 0 },
        { x: 4.999999997368221e-8, y: 0.1 },
        { x: 0.9999999500000001, y: 0.1 },
        { x: 0.9999999500000001, y: 0 },
      ],
      nextPoints: [
        { x: 4.999999997368221e-8, y: 0.1 },
        { x: 4.999999997368221e-8, y: 0.3 },
        { x: 0.9999999500000001, y: 0.3 },
        { x: 0.9999999500000001, y: 0.1 },
      ],
    };

    const model3 = {
      data: { type: 'A', value: 10 },
      x: [200, 257.0151694723699],
      y: [109, 127.5253515456301],
      color: '#eee',
      isInCircle: true,
    };

    expect(isModelChange(model1, model2)).toBe(false);
    expect(isModelChange(model1, model3)).toBe(true);
  });
});
