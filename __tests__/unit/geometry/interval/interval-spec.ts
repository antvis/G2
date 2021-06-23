import { ORIGINAL_FIELD } from '../../../../src';
import { Interval } from '../../../../src/geometry/interval';
import { ScaleDef } from '../../../../src/visual/scale';
import { Rect } from '../../../../src/visual/coordinate';

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 50, type: 'a' },
  { city: 'bj', price: 75, type: 'a' },
  { city: 'hz', price: 1100, type: 'b' },
  { city: 'sh', price: 150, type: 'b' },
  { city: 'bj', price: 175, type: 'b' },
];

describe('interval geometry', () => {
  it('interval init', () => {
    // 重开一个实例
    const scales = new Map();
    scales.set('city', new ScaleDef({ type: 'cat', domain: ['hz', 'sh', 'bj'] }, 'city'));
    scales.set('price', new ScaleDef({ type: 'linear', domain: [50, 1100] }, 'price'));
    scales.set('type', new ScaleDef({ type: 'cat', domain: ['red', 'green'] }, 'type'));

    const g = new Interval({
      data,
      container: {},
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 0 },
        end: { x: 500, y: 400 },
      }),
    });

    g.position('city*price').color('type', ['red', 'green']);

    g.update({});

    g.paint();
  });
});
