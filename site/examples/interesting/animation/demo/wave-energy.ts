import { Chart } from '@antv/g2';

// 波浪能量图 - 流动的能量波浪效果
// 模拟能量在不同频率下的波动传播

const POINTS = 80; // 波形点数
const WAVES = 5; // 波浪数量
const FRAMES = 100; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成单帧波浪数据
function generateWaveData(frame) {
  const data = [];
  const time = frame * 0.05;

  for (let waveIndex = 0; waveIndex < WAVES; waveIndex++) {
    const wavePhase = waveIndex * Math.PI * 0.4;
    const waveColor = waveIndex;

    for (let i = 0; i < POINTS; i++) {
      const x = (i / POINTS) * 100;
      const t = time + wavePhase;

      // 多层波浪叠加
      const wave1 = Math.sin(x * 0.1 + t * 2) * 15;
      const wave2 = Math.sin(x * 0.15 - t * 1.5) * 10;
      const wave3 = Math.sin(x * 0.08 + t * 2.5) * 8;

      // 能量衰减
      const decay = Math.exp(-waveIndex * 0.15);
      const y = (wave1 + wave2 + wave3) * decay + waveIndex * 20;

      // 计算能量强度（基于振幅）
      const amplitude = Math.abs(wave1 + wave2 + wave3);
      const energy = amplitude / 30;

      data.push({
        x,
        y,
        wave: waveIndex,
        waveColor,
        energy,
        key: `wave-${waveIndex}-${i}`,
      });
    }
  }

  return data;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const data = generateWaveData(frame);

  const option = {
    type: 'view',
    data: data,
    children: [
      // 波浪面积图
      {
        type: 'area',
        encode: {
          x: 'x',
          y: 'y',
          color: 'wave',
          key: (d) => `area-${d.wave}`,
        },
        scale: {
          y: { domain: [-20, 100] },
          color: {
            type: 'sequential',
            domain: [0, WAVES - 1],
            range: ['#1890ff', '#52c41a', '#faad14', '#ff7a45', '#f5222d'],
          },
        },
        style: {
          fillOpacity: 0.3,
        },
        axis: {
          x: { title: '位置', grid: false },
          y: {
            title: '能量',
            grid: true,
            gridLineWidth: 0.5,
            gridStroke: '#444',
          },
        },
      },
      // 波浪线条
      {
        type: 'line',
        encode: {
          x: 'x',
          y: 'y',
          color: 'wave',
          key: (d) => `line-${d.wave}`,
        },
        scale: {
          color: {
            type: 'sequential',
            domain: [0, WAVES - 1],
            range: ['#1890ff', '#52c41a', '#faad14', '#ff7a45', '#f5222d'],
          },
        },
        style: {
          lineWidth: 2,
          lineCap: 'round',
          lineJoin: 'round',
        },
        axis: false,
      },
      // 能量高点标记
      {
        type: 'point',
        data: data.filter((d) => d.energy > 0.7),
        encode: {
          x: 'x',
          y: 'y',
          size: (d) => d.energy * 10,
          color: 'wave',
          shape: 'point',
          key: 'key',
        },
        scale: {
          size: { range: [3, 12] },
          color: {
            type: 'sequential',
            domain: [0, WAVES - 1],
            range: ['#1890ff', '#52c41a', '#faad14', '#ff7a45', '#f5222d'],
          },
        },
        style: {
          fillOpacity: 0.8,
          stroke: '#fff',
          strokeOpacity: 0.6,
          lineWidth: 1,
        },
        tooltip: {
          title: (d) => `波浪 ${d.wave + 1}`,
          items: [
            { field: 'x', name: '位置', valueFormatter: (v) => v.toFixed(1) },
            { field: 'y', name: '振幅', valueFormatter: (v) => v.toFixed(1) },
            {
              field: 'energy',
              name: '能量',
              valueFormatter: (v) => `${(v * 100).toFixed(0)}%`,
            },
          ],
        },
      },
    ],
    theme: {
      view: {
        viewFill: '#0a0e1a',
      },
    },
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
