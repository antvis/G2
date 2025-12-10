import { Chart } from '@antv/g2';
import { Path, Circle, Group } from '@antv/g';

const chart = new Chart({
  container: 'container',
});

function getOrigin(points) {
  if (points.length === 1) return points[0];
  const [[x0, y0], [x2, y2]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2];
}

// 钻石形发光指针
const coolDiamondPointer = () => {
  return (points, value, coordinate) => {
    const [x, y] = getOrigin(points);
    const [cx, cy] = coordinate.getCenter();
    const angle = Math.atan2(y - cy, x - cx);

    // 指针尺寸常量
    const length = 120; // 指针长度
    const width = 12; // 指针宽度
    const tipWidth = 3; // 指针尖端宽度

    // 指针形状比例常量
    const POINTER_WAIST_RATIO = 0.7; // 指针腰部位置比例
    const POINTER_BASE_RATIO = 0.3; // 指针基部位置比例
    const WAIST_WIDTH_RATIO = 1.0; // 腰部宽度比例
    const BASE_WIDTH_RATIO = 0.6; // 基部宽度比例
    const HIGHLIGHT_MID_RATIO = 0.5; // 高光中点位置比例

    // 创建指针组合
    const group = new Group();

    // 主指针路径 - 钻石造型
    const pointerPath = [
      ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length], // 尖端
      [
        'L',
        cx +
          Math.cos(angle) * (length * POINTER_WAIST_RATIO) +
          Math.cos(angle + Math.PI / 2) * width * WAIST_WIDTH_RATIO,
        cy +
          Math.sin(angle) * (length * POINTER_WAIST_RATIO) +
          Math.sin(angle + Math.PI / 2) * width * WAIST_WIDTH_RATIO,
      ],
      [
        'L',
        cx +
          Math.cos(angle) * (length * POINTER_BASE_RATIO) +
          Math.cos(angle + Math.PI / 2) * (width * BASE_WIDTH_RATIO),
        cy +
          Math.sin(angle) * (length * POINTER_BASE_RATIO) +
          Math.sin(angle + Math.PI / 2) * (width * BASE_WIDTH_RATIO),
      ],
      [
        'L',
        cx + Math.cos(angle + Math.PI / 2) * tipWidth,
        cy + Math.sin(angle + Math.PI / 2) * tipWidth,
      ],
      [
        'L',
        cx + Math.cos(angle - Math.PI / 2) * tipWidth,
        cy + Math.sin(angle - Math.PI / 2) * tipWidth,
      ],
      [
        'L',
        cx +
          Math.cos(angle) * (length * POINTER_BASE_RATIO) +
          Math.cos(angle - Math.PI / 2) * (width * BASE_WIDTH_RATIO),
        cy +
          Math.sin(angle) * (length * POINTER_BASE_RATIO) +
          Math.sin(angle - Math.PI / 2) * (width * BASE_WIDTH_RATIO),
      ],
      [
        'L',
        cx +
          Math.cos(angle) * (length * POINTER_WAIST_RATIO) +
          Math.cos(angle - Math.PI / 2) * width * WAIST_WIDTH_RATIO,
        cy +
          Math.sin(angle) * (length * POINTER_WAIST_RATIO) +
          Math.sin(angle - Math.PI / 2) * width * WAIST_WIDTH_RATIO,
      ],
      ['Z'],
    ];

    // 发光外层（模糊效果）
    const glowPath = new Path({
      style: {
        d: pointerPath,
        fill: '#FF6B9D',
        opacity: 0.3,
        shadowColor: '#FF6B9D',
        shadowBlur: 20,
      },
    });

    // 主指针 - 渐变填充
    const mainPointer = new Path({
      style: {
        d: pointerPath,
        fill: 'l(0) 0:#FF6B9D 0.5:#C44569 1:#6C5CE7',
        shadowColor: '#FF6B9D',
        shadowBlur: 15,
      },
    });

    // 指针高光
    const highlightPath = [
      ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length],
      [
        'L',
        cx +
          Math.cos(angle) * (length * POINTER_WAIST_RATIO) +
          Math.cos(angle + Math.PI / 2) * (width * HIGHLIGHT_MID_RATIO),
        cy +
          Math.sin(angle) * (length * POINTER_WAIST_RATIO) +
          Math.sin(angle + Math.PI / 2) * (width * HIGHLIGHT_MID_RATIO),
      ],
      [
        'L',
        cx + Math.cos(angle) * (length * HIGHLIGHT_MID_RATIO),
        cy + Math.sin(angle) * (length * HIGHLIGHT_MID_RATIO),
      ],
      ['Z'],
    ];

    const highlight = new Path({
      style: {
        d: highlightPath,
        fill: 'l(0) 0:rgba(255,255,255,0.8) 1:rgba(255,255,255,0)',
        opacity: 0.6,
      },
    });

    // 中心装饰圆环
    const centerRing = new Circle({
      style: {
        cx,
        cy,
        r: 15,
        fill: 'r(0.5, 0.5, 1) 0:#FF6B9D 0.5:#A855F7 1:#6C5CE7',
        shadowColor: '#FF6B9D',
        shadowBlur: 15,
      },
    });

    const innerRing = new Circle({
      style: {
        cx,
        cy,
        r: 10,
        fill: '#0f0f1e', // 深色背景
        stroke: '#E0E0E0',
        lineWidth: 2,
        shadowColor: '#A855F7',
        shadowBlur: 8,
      },
    });

    // 组装所有元素
    group.appendChild(glowPath);
    group.appendChild(mainPointer);
    group.appendChild(highlight);
    group.appendChild(centerRing);
    group.appendChild(innerRing);

    return group;
  };
};

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 285,
      total: 400,
      thresholds: [100, 200, 300, 400],
    },
  },
  scale: {
    color: {
      range: ['#FF6B9D', '#FF8C42', '#FFD93D', '#6BCF7F', '#00D9FF'],
    },
  },
  axis: {
    y: {
      // 刻度标签样式
      labelFontSize: 18,
      labelFontWeight: 'bold',
      labelStroke: '#fff',
      labelLineWidth: 3,
      labelShadowColor: 'rgba(0, 0, 0, 0.3)',
      labelShadowBlur: 1,
      // 刻度线样式
      tickLineWidth: 4,
      tickLength: 14,
      // 刻度线颜色 - 根据label值动态变色
      tickStroke: (datum) => {
        const value = Number(datum.label);
        if (value <= 100) return '#FF6B9D'; // 粉色
        if (value <= 200) return '#FFA07A'; // 橙色
        if (value <= 300) return '#FFD700'; // 金色
        return '#00D9FF'; // 青色
      },
      // 标签颜色 - 根据label值动态变色
      labelFill: (datum) => {
        const value = Number(datum.label);
        if (value <= 100) return '#FF6B9D';
        if (value <= 200) return '#FFA07A';
        if (value <= 300) return '#FFD700';
        return '#00D9FF';
      },
      // 网格线样式
      gridLineWidth: 0,
    },
  },
  style: {
    arcShape: 'round', // 圆角弧形
    arcLineWidth: 8, // 增加弧形边框宽度
    arcStroke: 'rgba(247, 246, 250, 0.9)', // 深色边框
    arcInnerRadius: 0.85, // 增加内半径，让弧形更粗
    arcOuterRadius: 1, // 外半径
    arcShadowColor: 'rgba(255, 107, 157, 0.25)', // 粉色发光阴影
    arcShadowBlur: 15, // 阴影模糊度
    arcShadowOffsetY: 0, // 无偏移，环形发光
    pointerShape: coolDiamondPointer, // 使用炫酷钻石指针
    pinShape: false, // 隐藏默认中心点
    // 中心文字内容 - 多行显示，格式优化
    textContent: (target, total) => {
      const percentage = ((target / total) * 100).toFixed(1);
      return `${target}
${percentage}%
EXCELLENT`;
    },
    // 调整文字位置，向下移动避免遮挡指针
    textX: '50%',
    textY: '72%',
    // 中心文字样式 - 使用text前缀
    textFontSize: 24,
    textFontWeight: 900,
    textLineHeight: 32,
    // 使用渐变色，与圆弧和刻度保持一致
    textFill: 'l(270) 0:#FF6B9D 0.5:#FFD700 1:#00D9FF',
    textTextAlign: 'center',
    textTextBaseline: 'middle',
    // 白色描边增强对比度
    textStroke: 'rgba(255, 255, 255, 0.3)',
    textLineWidth: 1,
    // 多层阴影营造发光效果
    textShadowColor: '#FF6B9D',
    textShadowBlur: 20,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
  },
  legend: false,
});

chart.render();
