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
  container: createDiv(undefined, 'step line shapes'),
  width: 440,
  height: 200,
  renderer: canvasRenderer,
});

describe('step line shapes', () => {
  const data = [
    { year: '1995', price: 30, type: 'a' },
    { year: '1996', price: 40, type: 'a' },
    { year: '1997', price: 50, type: 'a' },
    { year: '1998', price: 65, type: 'a' },
    { year: '1999', price: 85, type: 'a' },
    { year: '2000', price: 105, type: 'a' },
    { year: '1995', price: 100, type: 'b' },
    { year: '1996', price: 80, type: 'b' },
    { year: '1997', price: 70, type: 'b' },
    { year: '1998', price: 60, type: 'b' },
    { year: '1999', price: 55, type: 'b' },
    { year: '2000', price: 45, type: 'b' },
  ];
  const scales = new Map();
  scales.set(
    'year',
    new ScaleDef(
      {
        type: 'time',
        // todo 为什么不指定 domain 会绘制不正确
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
    g.position('year*price').color('type', ['red', 'green']).shape(null, 'hv');

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
        start: { x: 110, y: 200 },
        end: { x: 210, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'vh');

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
        start: { x: 220, y: 200 },
        end: { x: 330, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'hvh');

    g.update({});

    g.paint();
  });

  it('smooth shape', () => {
    const container = new Group({});
    canvas.appendChild(container);

    const g = new Line({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 340, y: 200 },
        end: { x: 440, y: 0 },
      }),
    });

    g.position('year*price').color('type', ['red', 'green']).shape(null, 'vhv');

    g.update({});

    g.paint();
  });
});
