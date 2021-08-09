import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Interval } from '../../../../../src/geometry/interval';
import { Category, Linear } from '../../../../../src/visual/scale';
import { Rect } from '../../../../../src/visual/coordinate';

const canvasRenderer = new Renderer();

// create a canvas
const canvas = new Canvas({
  container: createDiv(),
  width: 400,
  height: 200,
  renderer: canvasRenderer,
});

const container = new Group();

canvas.appendChild(container);

describe('interval shapes', () => {
  it('line', () => {
    const data = [
      { city: 'hz', price: 100 },
      { city: 'sh', price: 50 },
      { city: 'bj', price: 75 },
    ];

    const scales = new Map();
    scales.set('city', new Category({
      field: 'city',
      values: ['hz', 'sh', 'bj'],
      range: [1 / 6, 5 / 6],
    }));
    scales.set('price', new Linear({ field: 'price', min: 0, max: 130 }));
    const g = new Interval({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 400, y: 0 },
      }),
    });

    g.position('city*price').shape('', 'tick').style('', {
      stroke: 'red',
      lineWidth: 2,
    });

    g.update({});

    g.paint();

    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(2);
    expect(g.getElements()[0].getShape().getAttribute('fill')).toBe(null);
    expect(g.getElements()[0].getShape().getAttribute('stroke')).toBe('red');
  });
});
