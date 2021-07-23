import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../util/dom';
import { Line } from '../../../../src/geometry/line';
import { ScaleDef } from '../../../../src/visual/scale';
import { Rect } from '../../../../src/visual/coordinate';

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

const container = new Group({});

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
scales.set('city', new ScaleDef({
  type: 'band',
  domain: ['hz', 'sh', 'bj'],
  range: [1 / 6, 5 / 6],
  paddingInner: 0.99999999,
}, 'city'));
scales.set('price', new ScaleDef({ type: 'linear', domain: [0, 2000] }, 'price'));
scales.set('type', new ScaleDef({ type: 'cat', domain: ['red', 'green'] }, 'type'));

const g = new Line({
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

describe('line geometry', () => {
  it('line init', () => {
    g.update({});

    g.paint();

    // expect(container.getElementsByName('line').length).toBe(6);
    // expect(g.getElements().length).toBe(6);
    // expect(g.getElements().map((e) => e.id)).toEqual([
    //   'hz-100',
    //   'sh-50',
    //   'bj-75',
    //   'hz-1100',
    //   'sh-150',
    //   'bj-175',
    // ]);
  });

  it('update', async () => {
    const scales = new Map();

    scales.set('city', new ScaleDef({
      type: 'band',
      domain: ['hz', 'sh', 'sz'],
      range: [1 / 6, 5 / 6],
      paddingInner: 0.99999999,
    }, 'city'));
    scales.set('price', new ScaleDef({ type: 'linear', domain: [0, 2000] }, 'price'));
    scales.set('type', new ScaleDef({ type: 'cat', domain: ['red', 'green'] }, 'type'));

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
    // expect(g.getElements().map((e) => e.id)).toEqual([
    //   'hz-100',
    //   'sh-50',
    //   'hz-1100',
    //   'sh-150',
    //   'sz-750',
    //   'sz-100',
    // ]);
  });
});
