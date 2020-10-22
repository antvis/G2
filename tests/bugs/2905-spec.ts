import { Chart, registerShape } from '../../src';
import { createDiv, simulateMouseEvent } from '../util/dom';
import { getClientPoint } from '../util/simulate';
import { delay } from '../util/delay';

describe('#2905: 没有自定义主题，自定义 shape 中 draw 方法获取不到 defaultStyle', () => {
  const data = [
    { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
    { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
    { name: 'RELEASING', value: 48, washaway: 0 },
  ];

  registerShape('interval', 'text-interval', {
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      const group = container.addGroup();
      group.addShape('polygon', {
        attrs: {
          points: points.map((point) => [point.x, point.y]),
          fill: cfg.color || cfg.defaultStyle.fill,
        },
      });

      return group;
    },
  });

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
    autoFit: true,
  });

  chart.data(data);
  chart.scale({
    value: {
      alias: '访问数',
      nice: true,
    },
    name: {
      alias: '步骤名称',
    },
  });

  chart.interval().position('name*value').shape('text-interval').size(30);

  chart.render();

  it('default: 默认取 defaultShapeType 的主题设置', () => {
    expect(chart.geometries[0].elements[0].getModel().color).toBeUndefined();
    expect(chart.geometries[0].elements[0].getModel().defaultStyle).toEqual(
      chart.getTheme().geometries.interval.rect.default.style
    );
  });

  it('manual: 手动设置自定义 shape 的主题', async () => {
    chart.theme({
      geometries: {
        interval: {
          'text-interval': {
            default: {
              style: {
                fill: 'red',
              },
            },
            active: {
              style: {
                stroke: 'green',
              },
            },
          },
        },
      },
    });
    chart.interaction('element-active');
    chart.render();
    const element0 = chart.geometries[0].elements[0];
    expect(element0.getModel().color).toBe(undefined);

    const canvas = chart.getCanvas();
    const el = canvas.get('el');
    const box = element0.shape.getCanvasBBox();

    simulateMouseEvent(el, 'mouseenter', getClientPoint(canvas, (box.minX + box.maxX) / 2, (box.minY + box.maxY) / 2));
    expect(element0.hasState('active')).toBe(true);

    await delay(10);
    expect(element0.shape.get('children')[0].attr('stroke')).toBe('green');
  });
});
