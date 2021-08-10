import { uniq } from '@antv/util';
import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Path } from '../../../../../src/geometry/path';
import { Category, Linear } from '../../../../../src/visual/scale';
import { Rect } from '../../../../../src/visual/coordinate';

const canvasRenderer = new Renderer();

// create a canvas
const canvas = new Canvas({
  container: createDiv(undefined, 'path shapes'),
  width: 800,
  height: 200,
  renderer: canvasRenderer,
});

describe('path shapes', () => {
  const data = [
    { x: '0', y: 7.220005838214272, type: '一' },
    { x: '0', y: 9.220005838214272, type: '二' },
    { x: '1', y: 2.426939752814512, type: '一' },
    { x: '1', y: 4.426939752814512, type: '二' },
    { x: '2', y: 2.048475381536048, type: '一' },
    { x: '2', y: 4.048475381536048, type: '二' },
    { x: '3', y: 8.049595077755281, type: '一' },
    { x: '3', y: 10.049595077755281, type: '二' },
    { x: '4', y: 8.249606086498298, type: '一' },
    { x: '4', y: 10.249606086498298, type: '二' },
    { x: '5', y: 1.70705343862402, type: '一' },
    { x: '5', y: 3.70705343862402, type: '二' },
    { x: '6', y: 5.213053813058545, type: '一' },
    { x: '6', y: 7.213053813058545, type: '二' },
    { x: '7', y: 2.622044001920474, type: '一' },
    { x: '7', y: 4.622044001920473, type: '二' },
    { x: '8', y: 0.8367786696201751, type: '一' },
    { x: '8', y: 2.836778669620175, type: '二' },
    { x: '9', y: 9.042850365133868, type: '一' },
    { x: '9', y: 11.042850365133868, type: '二' },
    { x: '10', y: 6.781543938253611, type: '一' },
    { x: '10', y: 8.781543938253611, type: '二' },
  ];

  const scales = new Map();
  scales.set('x', new Category({ field: 'x', values: uniq(data.map((d) => d.x)) }));
  scales.set('y', new Linear({ field: 'y', min: 0, max: 15 }));
  scales.set('type', new Category({ field: 'type', values: ['一', '二'] }));

  it('line shape', () => {
    const container = new Group();
    canvas.appendChild(container);

    const g = new Path({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 200, y: 0 },
      }),
    });
    g.position('x*y').color('type', ['red', 'orange']);

    g.update({});

    g.paint();

    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(1);
    expect(g.getElements()[0].getShape().getAttribute('stroke')).toBe('red');
  });

  it('dot shape', () => {
    const container = new Group();
    canvas.appendChild(container);

    const g = new Path({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 200, y: 200 },
        end: { x: 405, y: 0 },
      }),
    });

    g.position('x*y').color('type', ['red', 'orange']).shape(null, 'dot');

    g.update({});

    g.paint();
  });

  it('dash shape', () => {
    const container = new Group();
    canvas.appendChild(container);

    const g = new Path({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 410, y: 200 },
        end: { x: 620, y: 0 },
      }),
    });

    g.position('x*y').color('type', ['red', 'orange']).shape(null, 'dash');

    g.update({});

    g.paint();
  });

  it('smooth shape', () => {
    const container = new Group();
    canvas.appendChild(container);

    const g = new Path({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 640, y: 200 },
        end: { x: 800, y: 0 },
      }),
    });

    g.position('x*y').color('type', ['red', 'orange']).shape(null, 'smooth');

    g.update({});

    g.paint();
  });
});
