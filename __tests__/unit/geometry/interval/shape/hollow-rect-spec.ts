import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Interval } from '../../../../../src/geometry/interval';
import { ScaleDef } from '../../../../../src/visual/scale';
import { Rect } from '../../../../../src/visual/coordinate';

// @ts-ignore
const canvasRenderer = new Renderer();

// create a canvas
// @ts-ignore
const canvas = new Canvas({
  container: createDiv(),
  width: 400,
  height: 200,
  renderer: canvasRenderer,
});

const container = new Group();

canvas.appendChild(container);

describe('interval shapes', () => {
  it('hollow-rect', () => {
    const data = [
      { city: 'hz', price: 100, type: 'a' },
      { city: 'sh', price: 50, type: 'a' },
      { city: 'bj', price: 75, type: 'a' },
      { city: 'hz', price: 1100, type: 'b' },
      { city: 'sh', price: 150, type: 'b' },
      { city: 'bj', price: 175, type: 'b' },
    ];

    const scales = new Map();
    scales.set('city', new ScaleDef({
      type: 'band',
      domain: ['hz', 'sh', 'bj'],
      range: [1 / 6, 5 / 6],
      paddingInner: 0.99999999,
    }, 'city'));
    scales.set('price', new ScaleDef({ type: 'linear', domain: [0, 2000] }, 'price'));
    scales.set('type', new ScaleDef({ type: 'cat', domain: ['red', 'green'] }, 'type'));

    const g = new Interval({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 400, y: 0 },
      }),
    });

    g.position('city*price').color('type', ['red', 'green']).shape('', 'hollow-rect').style('', {
      lineWidth: 2,
    });

    g.update({});

    g.paint();

    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(2);
    expect(g.getElements()[0].getShape().getAttribute('stroke')).toBe('red');
  });
});
