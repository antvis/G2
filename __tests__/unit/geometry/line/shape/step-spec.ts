import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Line } from '../../../../../src/geometry/line';
import { Category, Linear, TimeCat } from '../../../../../src/visual/scale';
import { Rect } from '../../../../../src/visual/coordinate';

const canvasRenderer = new Renderer();

// create a canvas
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
  scales.set('year', new TimeCat({ field: 'year', values: ['1995', '1996', '1997', '1998', '1999', '2000'] }));
  scales.set('price', new Linear({ field: 'price', min: 0, max: 150 }));
  scales.set('type', new Category({ field: 'type', values: ['a', 'b'] }));

  it('line shape', () => {
    const container = new Group();
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
    const container = new Group();
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
    const container = new Group();
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
    const container = new Group();
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
