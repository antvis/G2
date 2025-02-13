import * as G2 from '../../../src';

export function issue6564(context) {
  const { container, canvas } = context;
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: 'Other', value: 5 },
  ];

  const max = Math.max(...data.map((obj) => obj.value ?? 0), 0);
  function ShapeSlice(style, context) {
    const { document } = context;
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;

      const percentValue = value.items[0].value;
      const percent =
        typeof percentValue === 'string'
          ? Number.parseFloat(percentValue.replace('%', '')) / max
          : Number(percentValue) / max;

      const transformPoints = scalePoints(p1, p0, p3, percent);

      const svg = pathArrayToString(createArcPath(...transformPoints));

      return document.createElement('path', {
        style: {
          fill: color,
          d: svg,
          ...style,
        },
      });
    };
  }

  G2.register('shape.interval.slice', ShapeSlice);

  const chart = new G2.Chart({
    container: container,
    autoFit: true,
    canvas,
  });

  chart
    .coordinate({ type: 'theta', outerRadius: 0.8 })
    .interval()
    .data(data)
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'type')
    .legend('color', {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    })
    .label({
      position: 'outside',
      text: (data) => ` ${data.value}%`,
    })
    .tooltip((data) => ({
      name: data.type,
      value: `${data.value}%`,
    }))
    // .animate(false)
    .encode('shape', 'slice');

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}

function scalePoints(
  center: [number, number],
  p1: [number, number],
  p2: [number, number],
  factor: number,
): [[number, number], [number, number], [number, number]] {
  const dx1 = p1[0] - center[0];
  const dy1 = p1[1] - center[1];

  const dx2 = p2[0] - center[0];
  const dy2 = p2[1] - center[1];

  const scaledP1: [number, number] = [
    center[0] + dx1 * factor,
    center[1] + dy1 * factor,
  ];
  const scaledP2: [number, number] = [
    center[0] + dx2 * factor,
    center[1] + dy2 * factor,
  ];

  return [center, scaledP1, scaledP2];
}

function pathArrayToString(pathArray) {
  return pathArray
    .map((item) => {
      if (Array.isArray(item)) {
        return item.join(' '); // 将数组元素连接成字符串
      }
      return item; // 对于 "Z" 直接返回
    })
    .join(' '); // 用空格连接整个路径
}
function createArcPath(center: number[], point1: number[], point2: number[]) {
  // 计算两个点到中心点的距离（半径）
  const radius1 = Math.sqrt(
    Math.pow(point1[0] - center[0], 2) + Math.pow(point1[1] - center[1], 2),
  );
  const radius2 = Math.sqrt(
    Math.pow(point2[0] - center[0], 2) + Math.pow(point2[1] - center[1], 2),
  );

  // 确保半径相等，以便形成一个闭合的弧
  const radius = Math.min(radius1, radius2);

  // 计算角度（单位：弧度）
  const angle1 = Math.atan2(point1[1] - center[1], point1[0] - center[0]);
  const angle2 = Math.atan2(point2[1] - center[1], point2[0] - center[0]);

  // 计算弧的路径（从angle1到angle2）
  const largeArcFlag = angle2 - angle1 > Math.PI ? 1 : 0;

  // 生成路径
  return [
    ['M', center[0], center[1]], // 移动到圆心
    ['L', point1[0], point1[1]], // 画一条直线到第一个点
    ['A', radius, radius, 0, 0, 0, point2[0], point2[1]], // 绘制弧
    'Z', // 闭合路径
  ];
}
