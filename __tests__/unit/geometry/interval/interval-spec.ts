import { Canvas, Group, Line } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { Interval } from '../../../../src/geometry/interval';
import { Linear, Category } from '../../../../src/visual/scale';
import { Rect } from '../../../../src/visual/coordinate';

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

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 50, type: 'a' },
  { city: 'bj', price: 75, type: 'a' },
  { city: 'hz', price: 1100, type: 'b' },
  { city: 'sh', price: 150, type: 'b' },
  { city: 'bj', price: 175, type: 'b' },
];

const scales = new Map();
scales.set('city', new Category({
  field: 'city',
  values: ['hz', 'sh', 'bj'],
  range: [1 / 6, 5 / 6],
}));
scales.set('price', new Linear({ field: 'price', min: 0, max: 2000 }));
scales.set('type', new Category({ field: 'type', values: ['red', 'green'] }));

const g = new Interval({
  data,
  container,
  scales,
  coordinate: new Rect({
    start: { x: 0, y: 200 },
    end: { x: 400, y: 0 },
  }),
});

g.position('city*price').color('type', ['red', 'green']).style('', {
  fillOpacity: 0.4,
});

describe('interval geometry', () => {
  it('interval init', () => {
    g.update({});

    g.paint();

    expect(container.getElementsByName('interval').length).toBe(6);
    expect(g.getElements().length).toBe(6);
    expect(g.getElements().map((e) => e.id)).toEqual([
      'hz-100',
      'sh-50',
      'bj-75',
      'hz-1100',
      'sh-150',
      'bj-175',
    ]);
  });

  it('update', async () => {
    const scales = new Map();

    scales.set('city', new Category({
      field: 'city',
      values: ['hz', 'sh', 'sz'],
      range: [1 / 6, 5 / 6],
    }));
    scales.set('price', new Linear({ field: 'price', min: 0, max: 2000 }));
    scales.set('type', new Category({ field: 'type', values: ['red', 'green'] }));

    g.update({
      data: [
        { city: 'hz', price: 100, type: 'a' },
        { city: 'sh', price: 50, type: 'a' },
        { city: 'sz', price: 750, type: 'a' },
        { city: 'hz', price: 1100, type: 'b' },
        { city: 'sh', price: 150, type: 'b' },
        { city: 'sz', price: 100, type: 'b' },
      ],
      scales,
    });

    g.paint();
    expect(g.getElements().map((e) => e.id)).toEqual([
      'hz-100',
      'sh-50',
      'hz-1100',
      'sh-150',
      'sz-750',
      'sz-100',
    ]);
  });
});
