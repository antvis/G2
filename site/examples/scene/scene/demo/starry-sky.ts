import { Chart } from '@antv/g2';

// 星空粒子系统 - 星星闪烁与流星划过
// 模拟夜空中星星的闪烁和流星的轨迹

const STARS = 80; // 星星数量
const METEORS = 3; // 流星数量
const FRAMES = 120; // 动画帧数
const FPS = 30; // 每秒帧数

// 星星类
class Star {
  x: number;
  y: number;
  baseSize: number;
  phase: number;
  speed: number;

  constructor() {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.baseSize = 0.5 + Math.random() * 2;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0.05 + Math.random() * 0.1;
  }

  getState(time: number) {
    // 闪烁效果
    const brightness = 0.5 + 0.5 * Math.sin(time * this.speed + this.phase);
    const size = this.baseSize * (0.8 + brightness * 0.4);

    return {
      x: this.x,
      y: this.y,
      size,
      brightness,
      type: 'star',
    };
  }
}

// 流星类
class Meteor {
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  startFrame: number;
  lifespan: number;

  constructor(startFrame: number) {
    this.startX = Math.random() * 100;
    this.startY = Math.random() * 50; // 从上半部分出现
    this.angle = Math.PI / 4 + ((Math.random() - 0.5) * Math.PI) / 6; // 45° ± 30°
    this.speed = 3 + Math.random() * 2;
    this.startFrame = startFrame;
    this.lifespan = 30 + Math.random() * 20;
  }

  getTrail(currentFrame: number) {
    const age = currentFrame - this.startFrame;
    if (age < 0 || age > this.lifespan) return [];

    const progress = age / this.lifespan;
    const distance = this.speed * age;

    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
      const offset = i * 0.5;
      const x = this.startX + Math.cos(this.angle) * (distance - offset);
      const y = this.startY + Math.sin(this.angle) * (distance - offset);

      // 超出边界则不显示
      if (x < -10 || x > 110 || y < -10 || y > 110) continue;

      const brightness = (1 - progress) * (1 - i / trailLength);
      const size = (3 - i * 0.2) * (1 - progress * 0.5);

      trail.push({
        x,
        y,
        size: Math.max(0.5, size),
        brightness,
        type: 'meteor',
        key: `${this.startFrame}-${i}`,
      });
    }

    return trail;
  }
}

// 创建星星
const stars = Array.from({ length: STARS }, () => new Star());

// 创建流星（在不同时间出现）
const meteors = [new Meteor(0), new Meteor(40), new Meteor(80)];

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const data = [];

  // 添加星星
  stars.forEach((star, index) => {
    const state = star.getState(frame);
    data.push({
      ...state,
      key: `star-${index}`,
    });
  });

  // 添加流星
  meteors.forEach((meteor) => {
    const trail = meteor.getTrail(frame);
    data.push(...trail);
  });

  const option = {
    type: 'point',
    data: data,
    encode: {
      x: 'x',
      y: 'y',
      size: 'size',
      color: 'type',
      shape: 'point',
      key: 'key',
    },
    scale: {
      x: { domain: [0, 100] },
      y: { domain: [0, 100] },
      size: { range: [2, 20] },
      color: {
        domain: ['star', 'meteor'],
        range: ['#fff', '#faad14'],
      },
    },
    style: {
      fill: (d) => {
        if (d.type === 'star') {
          // 星星颜色随亮度变化
          const alpha = 0.6 + d.brightness * 0.4;
          return `rgba(255, 255, 255, ${alpha})`;
        } else {
          // 流星尾迹渐变
          const alpha = d.brightness;
          return `rgba(250, 173, 20, ${alpha})`;
        }
      },
      stroke: (d) => (d.type === 'star' ? '#fff' : '#faad14'),
      strokeOpacity: (d) => d.brightness * 0.5,
      lineWidth: (d) => (d.type === 'meteor' ? 1 : 0),
    },
    theme: {
      view: {
        viewFill: '#0a0e27', // 深蓝色夜空背景
      },
    },
    axis: false,
    legend: false,
    tooltip: {
      items: [
        {
          channel: 'x',
          name: '位置',
          valueFormatter: (d) => `(${d.x?.toFixed(1)}, ${d.y?.toFixed(1)})`,
        },
        {
          field: 'type',
          name: '类型',
          valueFormatter: (v) => (v === 'star' ? '⭐ 星星' : '☄️ 流星'),
        },
        {
          field: 'brightness',
          name: '亮度',
          valueFormatter: (v) => `${(v * 100).toFixed(0)}%`,
        },
      ],
    },
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
