import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Line } from '../../../../../src/geometry/line';
import { ScaleDef } from '../../../../../src/visual/scale';
import { Rect } from '../../../../../src/visual/coordinate';

// @ts-ignore
const canvasRenderer = new Renderer();

// create a canvas
// @ts-ignore
const canvas = new Canvas({
  container: createDiv(undefined, 'line shapes'),
  width: 400,
  height: 200,
  renderer: canvasRenderer,
});

describe('line shapes', () => {
  const data = [
    { year: '1995', price: 30, type: 'a' },
    { year: '1996', price: 40, type: 'a' },
    { year: '1997', price: 50, type: 'a' },
    { year: '1998', price: 105, type: 'a' },
    { year: '1999', price: 85, type: 'a' },
    { year: '2000', price: 65, type: 'a' },
    { year: '1995', price: 50, type: 'b' },
    { year: '1996', price: 40, type: 'b' },
    { year: '1997', price: 90, type: 'b' },
    { year: '1998', price: 85, type: 'b' },
    { year: '1999', price: 75, type: 'b' },
    { year: '2000', price: 65, type: 'b' },
  ];
  const scales = new Map();
  scales.set(
    'year',
    new ScaleDef(
      {
        type: 'time',
        domain: [new Date(1995, 0, 1, 0, 12), new Date(2000, 0, 1, 23, 48)],
      },
      'year',
    ),
  );
  scales.set('price', new ScaleDef({ type: 'linear', domain: [20, 120] }, 'price'));
  scales.set('type', new ScaleDef({ type: 'cat', domain: ['red', 'green'] }, 'type'));

  it('line shape', () => {
    const container = new Group({});
    canvas.appendChild(container);

    const g = new Line({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 100, y: 0 },
      }),
    });
    g.position('year*price').color('type', ['red', 'green']);

    g.update({});

    g.paint();

    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(1);
    expect(g.getElements()[0].getShape().getAttribute('stroke')).toBe('red');
  });

  it('dot shape', () => {
    const container = new Group({});
    canvas.appendChild(container);

    const g = new Line({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 100, y: 200 },
        end: { x: 200, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'dot');

    g.update({});

    g.paint();
  });

  it('dash shape', () => {
    const container = new Group({});
    canvas.appendChild(container);

    const g = new Line({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 200, y: 200 },
        end: { x: 300, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'dash');

    g.update({});

    g.paint();
  });

  // fixme 绘制不正确
  it('smooth shape', () => {
    const container = new Group({});
    canvas.appendChild(container);

    const g = new Line({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 300, y: 200 },
        end: { x: 400, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'smooth');

    g.update({});

    g.paint();
  });
});
