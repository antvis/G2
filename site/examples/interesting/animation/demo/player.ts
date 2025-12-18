import { Chart } from '@antv/g2';

// 音乐播放器音频可视化
// 1. 预生成所有帧的 options 配置
// 2. 使用 setInterval 切换 options 实现动画
// 3. encode('key') 确保元素平滑过渡

const BANDS = 32; // 频段数量
const FRAMES = 60; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成单帧音频频谱数据
function generateFrameData(time) {
  const data = [];

  for (let i = 0; i < BANDS; i++) {
    // 模拟不同频段的能量变化
    const frequency = (i / BANDS) * 10;
    const bassWave = Math.sin(time * 2 + i * 0.2) * 0.3; // 低频节奏
    const midWave = Math.sin(time * 4 + i * 0.4) * 0.4; // 中频旋律
    const highWave = Math.sin(time * 8 + i * 0.6) * 0.3; // 高频细节

    // 随机脉冲模拟鼓点
    const pulse = Math.random() > 0.85 ? Math.random() * 0.5 : 0;

    // 综合计算振幅（0-100）
    const amplitude = Math.max(
      0,
      (bassWave + midWave + highWave + pulse) * 50 + 30 + Math.random() * 10,
    );

    // 根据振幅分配能量等级
    let energy = 'low';
    if (amplitude > 70) energy = 'high';
    else if (amplitude > 45) energy = 'medium';

    data.push({
      band: i,
      frequency: `${(frequency * 1000).toFixed(0)}Hz`,
      amplitude: amplitude,
      energy: energy,
    });
  }

  return data;
}

// 预生成所有帧的 options
const allOptions = [];
for (let frame = 0; frame < FRAMES; frame++) {
  const time = frame * 0.1;
  const data = generateFrameData(time);

  // 每一帧都是一个完整的图表配置
  const option = {
    type: 'interval',
    data: data,
    encode: {
      x: 'band',
      y: 'amplitude',
      color: 'energy',
      key: 'band', // 关键：追踪每个频段实现平滑过渡
    },
    scale: {
      color: {
        domain: ['low', 'medium', 'high'],
        range: ['#1890ff', '#52c41a', '#ff4d4f'], // 蓝→绿→红 能量渐变
      },
      y: { domain: [0, 100] },
    },
    axis: {
      x: {
        title: '频段',
        labelFormatter: (d) => (d % 4 === 0 ? d : ''),
      },
      y: { title: '振幅 (dB)' },
    },
    legend: {
      color: {
        itemLabelText: (d) => {
          if (d.label === 'high') return '高';
          else if (d.label === 'medium') return '中';
          else return '低';
        },
      },
    },
    style: {
      radius: 4,
    },
    tooltip: {
      title: (d) => `频段 ${d.band}`,
      items: [
        { field: 'frequency', name: '频率' },
        {
          field: 'amplitude',
          name: '振幅',
          valueFormatter: (v) => `${v.toFixed(1)} dB`,
        },
        {
          field: 'energy',
          name: '能量',
          valueFormatter: (v) => {
            const map = { low: '低', medium: '中', high: '高' };
            return map[v];
          },
        },
      ],
    },
  };

  allOptions.push(option);
}

// 创建图表并渲染初始帧
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options(allOptions[0]);
chart.render();

// 使用 setInterval 切换 options
let currentFrame = 0;

const timer = setInterval(() => {
  currentFrame = (currentFrame + 1) % FRAMES;
  chart.options(allOptions[currentFrame]);
  chart.render();
}, 1000 / FPS);
