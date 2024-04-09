import { Chart, register } from '@antv/g2';

// 注册自定义图形，代码在下面
register('shape.interval.petal', petal);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'theta' });

chart.data([
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: 'Other', value: 5 },
]);

chart
  .interval()
  .transform({ type: 'stackY' })
  .encode('y', 'value')
  .encode('color', 'type')
  .encode('shape', 'petal')
  .style('offset', 0.5) // 👈🏻 在这里配置属性
  .style('ratio', 0.2) // 👈🏻 在这里配置属性
  .label({
    text: (d, i, data) => d.type + '\n' + d.value,
    radius: 0.9,
    fontSize: 9,
    dy: 12,
  })
  .animate('enter', { type: 'fadeIn' })
  .legend(false);

chart.render();

/** Functions for custom shape. */

function getPoint(p0, p1, ratio) {
  return [p0[0] + (p1[0] - p0[0]) * ratio, p0[1] + (p1[1] - p0[1]) * ratio];
}

function sub(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return [x1 - x2, y1 - y2];
}

function dist(p0, p1) {
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

function getAngle(p) {
  const [x, y] = p;
  return Math.atan2(y, x);
}

function getXY(angle, center, radius) {
  return [
    Math.cos(angle) * radius + center[0],
    Math.sin(angle) * radius + center[1],
  ];
}

/**
 * Custom shape for petal.
 */
function petal({ offset = 1, ratio = 0.5 }, context) {
  const { coordinate } = context;
  return (points, value, defaults) => {
    // 圆形坐标
    const center = coordinate.getCenter();
    // 1° 的偏移
    const offsetAngle = (Math.PI / 180) * offset;
    // eslint-disable-next-line
    let [p0, p1, p2, p3] = points;
    // 半径
    const radius = dist(center, p0);
    const qRadius = radius * ratio;
    const angleQ1 = getAngle(sub(p3, center)) + offsetAngle;
    const angleQ2 = getAngle(sub(p0, center)) - offsetAngle;

    // 偏移 1° 后的 q1, q2
    const q1 = getXY(angleQ1, center, qRadius);
    const q2 = getXY(angleQ2, center, qRadius);

    // 偏移 1° 后的 p3, p0
    p3 = getXY(angleQ1, center, radius);
    p0 = getXY(angleQ2, center, radius);

    // mid 对应的角度为 p0 和 p3 中点的夹角
    const angle = getAngle(sub(getPoint(p0, p3, 0.5), center));
    const mid = getXY(angle, center, radius);

    const path = [
      ['M', ...p1],
      ['L', ...q1],
      ['Q', ...p3, ...mid],
      ['Q', ...p0, ...q2],
      ['L', ...p2],
      ['Z'],
    ];

    const { document } = chart.getContext().canvas;
    const g = document.createElement('g', {});
    const p = document.createElement('path', {
      style: {
        d: path,
        inset: 1,
        fill: value.color,
      },
    });
    g.appendChild(p);

    return g;
  };
}
