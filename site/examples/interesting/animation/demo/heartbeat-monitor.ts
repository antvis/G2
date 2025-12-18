import { Chart } from '@antv/g2';

// 心率监测仪 - 心电图波形动态可视化
// 模拟心电图（ECG）波形的实时监测效果

const POINTS = 150; // 波形点数
const FRAMES = 120; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成标准心电图波形（PQRST波）
function generateECGWave(offset, heartRate = 75) {
  const data = [];
  const beatInterval = 60 / heartRate; // 心跳间隔（秒）
  const pointsPerBeat = beatInterval * 50; // 每次心跳的点数

  for (let i = 0; i < POINTS; i++) {
    const x = (i + offset) / 50; // 时间（秒）
    const beatPhase = ((i + offset) % pointsPerBeat) / pointsPerBeat;

    let y = 0;

    // 模拟 PQRST 波形
    if (beatPhase < 0.1) {
      // P波（心房收缩）
      y = 0.15 * Math.sin(beatPhase * Math.PI * 10);
    } else if (beatPhase < 0.2) {
      // PR段
      y = 0;
    } else if (beatPhase < 0.25) {
      // Q波
      y = -0.1 * Math.sin((beatPhase - 0.2) * Math.PI * 20);
    } else if (beatPhase < 0.3) {
      // R波（主波，心室收缩）
      y = 1.0 * Math.sin((beatPhase - 0.25) * Math.PI * 20);
    } else if (beatPhase < 0.35) {
      // S波
      y = -0.2 * Math.sin((beatPhase - 0.3) * Math.PI * 20);
    } else if (beatPhase < 0.45) {
      // ST段
      y = 0;
    } else if (beatPhase < 0.6) {
      // T波（心室复极）
      y = 0.25 * Math.sin((beatPhase - 0.45) * Math.PI * 6.67);
    } else {
      // 基线
      y = 0;
    }

    // 添加轻微噪声模拟真实心电图
    y += (Math.random() - 0.5) * 0.02;

    // 根据振幅判断状态
    let status = 'normal';
    if (Math.abs(y) > 0.8) status = 'peak'; // R波峰值
    else if (Math.abs(y) > 0.15) status = 'active'; // P波、T波

    data.push({
      time: i,
      value: y,
      status,
      // 用于 key 编码确保平滑过渡
      key: i,
    });
  }

  return data;
}

// 预生成所有帧的 options
const allOptions = [];
let heartRate = 75; // 初始心率

for (let frame = 0; frame < FRAMES; frame++) {
  // 模拟心率变化（运动时加速）
  if (frame > 30 && frame < 70) {
    heartRate = 75 + (frame - 30) * 0.5; // 加速到 95
  } else if (frame >= 70) {
    heartRate = 95 - (frame - 70) * 0.4; // 减速回 75
  }

  const data = generateECGWave(frame * 3, Math.min(heartRate, 95));

  const option = {
    type: 'view',
    paddingLeft: 60,
    children: [
      // 心电图波形
      {
        type: 'line',
        data: data,
        encode: {
          x: 'time',
          y: 'value',
          color: 'status',
          key: 'key',
        },
        scale: {
          y: { domain: [-0.5, 1.2] },
          color: {
            domain: ['normal', 'active', 'peak'],
            range: ['#52c41a', '#1890ff', '#ff4d4f'],
          },
        },
        style: {
          lineWidth: 2,
          lineCap: 'round',
        },
        axis: {
          x: { title: '时间 (s)', labelFormatter: (d) => (d / 50).toFixed(1) },
          y: { title: '电压 (mV)' },
        },
        legend: false,
      },
      // 心率文本标注
      {
        type: 'text',
        style: {
          text: `心率: ${Math.round(heartRate)} BPM`,
          x: '90%',
          y: '10%',
          fontSize: 24,
          fontWeight: 'bold',
          fill: heartRate > 85 ? '#ff4d4f' : '#52c41a',
          textAlign: 'end',
        },
      },
    ],
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
