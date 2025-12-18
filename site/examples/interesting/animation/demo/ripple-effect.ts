import { Chart } from '@antv/g2';

// 💧 粒子涟漪效果 - 水波扩散动态可视化
// 模拟点击水面产生的涟漪扩散效果

const FRAMES = 80; // 动画帧数
const FPS = 30; // 每秒帧数

// 涟漪类
class Ripple {
  x: number;
  y: number;
  startFrame: number;
  maxRadius: number;
  lifespan: number;

  constructor(x, y, startFrame) {
    this.x = x;
    this.y = y;
    this.startFrame = startFrame;
    this.maxRadius = 15;
    this.lifespan = 40; // 涟漪持续帧数
  }

  // 获取当前帧的涟漪点数据
  getPoints(currentFrame) {
    const age = currentFrame - this.startFrame;
    if (age < 0 || age > this.lifespan) return [];

    const progress = age / this.lifespan;
    const radius = progress * this.maxRadius;
    const opacity = 1 - progress;
    const points = [];

    // 生成多圈涟漪
    for (let ring = 0; ring < 3; ring++) {
      const ringRadius = radius - ring * 3;
      if (ringRadius <= 0) continue;

      const numPoints = Math.max(8, Math.floor(ringRadius * 4));

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const x = this.x + Math.cos(angle) * ringRadius;
        const y = this.y + Math.sin(angle) * ringRadius;

        points.push({
          x,
          y,
          size: Math.max(1, (1 - progress) * 8 - ring * 2),
          opacity: opacity * (1 - ring * 0.3),
          ring,
          key: `${this.startFrame}-${ring}-${i}`, // 唯一标识
        });
      }
    }

    return points;
  }
}

// 创建涟漪序列（在不同时间点击不同位置）
const ripples = [
  new Ripple(20, 30, 0),
  new Ripple(50, 50, 10),
  new Ripple(35, 70, 20),
  new Ripple(70, 40, 30),
  new Ripple(60, 80, 40),
  new Ripple(25, 55, 50),
  new Ripple(80, 65, 60),
  new Ripple(45, 25, 70),
];

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const allPoints = [];

  // 收集所有活跃涟漪的点
  ripples.forEach((ripple) => {
    const points = ripple.getPoints(frame);
    allPoints.push(...points);
  });

  // 添加背景网格点（静态水面）
  const gridPoints = [];
  for (let i = 0; i < 100; i += 5) {
    for (let j = 0; j < 100; j += 5) {
      gridPoints.push({
        x: i,
        y: j,
        size: 1,
        opacity: 0.2,
        ring: -1,
        key: `grid-${i}-${j}`,
      });
    }
  }

  const option = {
    type: 'point',
    data: [...gridPoints, ...allPoints],
    encode: {
      x: 'x',
      y: 'y',
      size: 'size',
      shape: 'point',
      color: 'ring',
      key: 'key', // 关键：追踪每个粒子
    },
    scale: {
      x: { domain: [0, 100] },
      y: { domain: [0, 100] },
      size: { range: [1, 16] },
      color: {
        domain: [-1, 0, 1, 2],
        range: ['#d9d9d9', '#1890ff', '#52c41a', '#faad14'],
      },
    },
    style: {
      fill: (d) => {
        if (d.ring === -1) return '#d9d9d9'; // 背景网格
        const colors = ['#1890ff', '#52c41a', '#faad14'];
        return colors[d.ring] || '#1890ff';
      },
      fillOpacity: (d) => d.opacity,
      stroke: 'none',
    },
    axis: false,
    legend: false,
  };

  allOptions.push(option);
}

// 创建图表
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options(allOptions[0]);
chart.render();

// 播放动画
let currentFrame = 0;
const timer = setInterval(() => {
  currentFrame = (currentFrame + 1) % FRAMES;
  chart.options(allOptions[currentFrame]);
  chart.render();
}, 1000 / FPS);
