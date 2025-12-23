import { Chart } from '@antv/g2';

//  雷达扫描效果 - 科技感数据探测可视化
// 模拟雷达扫描发现目标的过程

const TARGETS = 15; // 目标数量
const FRAMES = 120; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成随机目标
const targets = Array.from({ length: TARGETS }, (_, i) => ({
  id: i,
  angle: Math.random() * 360,
  distance: 20 + Math.random() * 70,
  type:
    Math.random() > 0.7 ? 'threat' : Math.random() > 0.4 ? 'unknown' : 'safe',
  strength: 0.3 + Math.random() * 0.7,
}));

// 生成单帧数据
function generateRadarData(frame) {
  const scanAngle = (frame / FRAMES) * 360 * 3; // 扫描3圈
  const data = [];

  // 添加扫描线
  for (let i = 0; i <= 100; i++) {
    const angle = scanAngle;
    const distance = i;
    const opacity = 1 - i / 100;

    data.push({
      type: 'scan',
      angle,
      distance,
      opacity,
      key: `scan-${i}`,
    });
  }

  // 添加目标点（只有被扫描到的才显示）
  targets.forEach((target) => {
    const angleDiff = Math.abs(
      ((((target.angle - scanAngle) % 360) + 540) % 360) - 180,
    );

    if (angleDiff < 30) {
      // 目标在扫描范围内
      const fadeIn = Math.max(0, 1 - angleDiff / 30);
      const pulsePhase = (frame * 0.1 + target.id) % (Math.PI * 2);
      const pulse = 0.7 + Math.sin(pulsePhase) * 0.3;

      data.push({
        type: 'target',
        angle: target.angle,
        distance: target.distance,
        targetType: target.type,
        strength: target.strength,
        opacity: fadeIn * pulse,
        size: target.strength * 15 * (0.8 + pulse * 0.4),
        key: `target-${target.id}`,
      });
    }
  });

  // 添加同心圆网格
  for (let ring = 0; ring <= 100; ring += 20) {
    for (let a = 0; a < 360; a += 5) {
      data.push({
        type: 'grid',
        angle: a,
        distance: ring,
        opacity: 0.1,
        key: `grid-${ring}-${a}`,
      });
    }
  }

  return data;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const data = generateRadarData(frame);

  const option = {
    type: 'point',
    data: data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'distance',
      size: (d) => {
        if (d.type === 'scan') return 3;
        if (d.type === 'target') return d.size;
        return 1;
      },
      color: (d) => {
        if (d.type === 'scan') return 'scan';
        if (d.type === 'grid') return 'grid';
        return d.targetType;
      },
      shape: 'point',
      key: 'key',
    },
    scale: {
      x: { domain: [0, 360] },
      y: { domain: [0, 100] },
      size: { range: [1, 20] },
      color: {
        domain: ['scan', 'grid', 'safe', 'unknown', 'threat'],
        range: ['#00ff88', '#1a1a2e', '#52c41a', '#faad14', '#ff4d4f'],
      },
    },
    style: {
      fill: (d) => {
        if (d.type === 'scan') return '#00ff88';
        if (d.type === 'grid') return '#1a1a2e';
        const colors = {
          safe: '#52c41a',
          unknown: '#faad14',
          threat: '#ff4d4f',
        };
        return colors[d.targetType];
      },
      fillOpacity: (d) => d.opacity || 0.1,
      stroke: (d) => {
        if (d.type === 'target') {
          const colors = {
            safe: '#52c41a',
            unknown: '#faad14',
            threat: '#ff4d4f',
          };
          return colors[d.targetType];
        }
        return 'none';
      },
      strokeOpacity: (d) => (d.type === 'target' ? d.opacity * 0.8 : 0),
      lineWidth: 2,
    },
    theme: {
      view: {
        viewFill: '#0a0e1a',
      },
    },
    axis: false,
    legend: false,
    tooltip: {
      items: [
        {
          field: 'angle',
          name: '方位',
          valueFormatter: (v) => `${v.toFixed(0)}°`,
        },
        {
          field: 'distance',
          name: '距离',
          valueFormatter: (v) => `${v.toFixed(0)}km`,
        },
        {
          field: 'targetType',
          name: '类型',
          valueFormatter: (v) => {
            const map = {
              safe: '✅ 安全',
              unknown: '❓ 未知',
              threat: '⚠️ 威胁',
            };
            return map[v] || v;
          },
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
