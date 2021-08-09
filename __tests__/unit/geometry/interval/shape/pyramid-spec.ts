import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { createDiv } from '../../../../util/dom';
import { Interval } from '../../../../../src/geometry';
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
  it('pyramid', () => {
    const data = [
      { action: '浏览网站', pv: 0.9, type: 'A' },
      { action: '放入购物车', pv: 0.7, type: 'B' },
      { action: '生成订单', pv: 0.6, type: 'C' },
      { action: '支付订单', pv: 0.5, type: 'D' },
      { action: '完成交易', pv: 0.2, type: 'E' },
    ];

    const scales = new Map();
    scales.set('action', new Category({
      field: 'action',
      values: ['浏览网站', '放入购物车', '生成订单', '支付订单', '完成交易'],
    }));
    scales.set('type', new Category({
      field: 'type',
      values: ['A', 'B', 'C', 'D', 'E'],
    }));
    scales.set('pv', new Linear({ field: 'pv', min: 0.2, max: 1 }));

    const g = new Interval({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 400, y: 0 },
      }).transpose().scale(1, -1),
    });

    g.position('action*pv').color('type', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']).shape('', 'pyramid');

    g.update({});

    g.paint();
    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(1);
    expect(g.getElements()[0].getShape().getAttribute('fill')).toBe('#0050B3');
  });
});
