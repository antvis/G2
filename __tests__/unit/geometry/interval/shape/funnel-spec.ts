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

const container = new Group({});

canvas.appendChild(container);

describe('interval shapes', () => {
  // todo @万木 scale 和字段走，但是相同字段会映射到不同的属性中，如果剞劂。
  it('funnel', () => {
    const data = [
      { action: '浏览网站', pv: 0.9, type: 'A' },
      { action: '放入购物车', pv: 0.7, type: 'B' },
      { action: '生成订单', pv: 0.6, type: 'C' },
      { action: '支付订单', pv: 0.5, type: 'D' },
      { action: '完成交易', pv: 0.2, type: 'E' },
    ];

    const scales = new Map();
    scales.set('action', new ScaleDef({
      type: 'band',
      domain: ['浏览网站', '放入购物车', '生成订单', '支付订单', '完成交易'],
      // range: [1 / 6, 5 / 6],
      paddingInner: 0.99999999,
    }, 'action'));
    scales.set('type', new ScaleDef({
      type: 'cat',
      domain: ['A', 'B', 'C', 'D', 'E'],
      paddingInner: 0.99999999,
    }, 'type'));
    scales.set('pv', new ScaleDef({ type: 'linear', domain: [0, 1] }, 'pv'));

    const g = new Interval({
      data,
      container,
      scales,
      coordinate: new Rect({
        start: { x: 0, y: 200 },
        end: { x: 400, y: 0 },
      }).transpose().scale(1, -1),
    });

    g.position('action*pv').color('type', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']).shape('', 'funnel');

    g.update({});

    g.paint();
    expect(g.getElements()[0].getShape().getAttribute('lineWidth')).toBe(1);
    expect(g.getElements()[0].getShape().getAttribute('fill')).toBe('#0050B3');
  });
});
