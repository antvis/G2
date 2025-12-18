import { Chart } from '@antv/g2';

// 天气预报 - 24小时动态天气变化
// 模拟温度、降雨、风速等多维气象数据的实时变化

const HOURS = 24; // 24小时
const FRAMES = 96; // 动画帧数
const FPS = 10; // 每秒帧数

// 生成24小时天气数据
function generateWeatherData(timeOffset) {
  const data = [];

  for (let hour = 0; hour < HOURS; hour++) {
    const time = (hour + timeOffset) % 24;

    // 温度曲线（夜间低，下午高）
    const baseTemp = 20;
    const tempVar = 8 * Math.sin(((time - 6) * Math.PI) / 12);
    const temperature = baseTemp + tempVar + (Math.random() - 0.5) * 2;

    // 降雨概率（午后雷阵雨）
    let rainfall = 0;
    if (time >= 14 && time <= 18) {
      rainfall = Math.max(0, 30 + (Math.random() - 0.3) * 40);
    } else if (time >= 2 && time <= 5) {
      rainfall = Math.max(0, 10 + (Math.random() - 0.5) * 20);
    } else {
      rainfall = Math.random() * 5;
    }

    // 风速（白天大，夜间小）
    const windSpeed =
      time >= 6 && time <= 18 ? 3 + Math.random() * 4 : 1 + Math.random() * 2;

    // 天气状态
    let weather = 'sunny';
    if (rainfall > 20) weather = 'rainy';
    else if (rainfall > 5) weather = 'cloudy';
    else if (time < 6 || time > 20) weather = 'night';

    data.push({
      hour: time,
      temperature: Math.round(temperature * 10) / 10,
      rainfall: Math.round(rainfall),
      windSpeed: Math.round(windSpeed * 10) / 10,
      weather,
      key: hour, // 用于追踪
    });
  }

  return data;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const timeOffset = frame * 0.25; // 每帧前进15分钟
  const data = generateWeatherData(timeOffset);

  const option = {
    type: 'view',
    data: data,
    children: [
      // 温度折线图
      {
        type: 'line',
        encode: {
          x: 'hour',
          y: 'temperature',
          key: 'key',
        },
        scale: {
          y: { domain: [10, 32], nice: false },
        },
        style: {
          stroke: '#ff4d4f',
          lineWidth: 3,
        },
        axis: {
          x: {
            title: '时间 (小时)',
            labelFormatter: (d) => `${d}:00`,
          },
          y: {
            title: '温度 (°C)',
            position: 'left',
            grid: true,
          },
        },
        tooltip: {
          title: (d) => `${d.hour}:00`,
          items: [
            {
              field: 'temperature',
              name: '温度',
              valueFormatter: (v) => `${v}°C`,
            },
          ],
        },
      },
      // 温度区域图
      {
        type: 'area',
        encode: {
          x: 'hour',
          y: 'temperature',
          key: 'key',
        },
        scale: {
          y: { domain: [10, 32] },
        },
        style: {
          fill: 'l(90) 0:#ff4d4f 1:#fff1f0',
          fillOpacity: 0.4,
        },
        axis: false,
        tooltip: false,
      },
      // 降雨柱状图
      {
        type: 'interval',
        encode: {
          x: 'hour',
          y: 'rainfall',
          color: 'weather',
          key: 'key',
        },
        scale: {
          y: { domain: [0, 80] },
          color: {
            domain: ['sunny', 'cloudy', 'rainy', 'night'],
            range: ['#faad14', '#bfbfbf', '#1890ff', '#434343'],
          },
        },
        style: {
          fillOpacity: 0.6,
          maxWidth: 15,
        },
        axis: {
          x: false,
          y: {
            title: '降雨量 (mm)',
            position: 'right',
          },
        },
        tooltip: {
          items: [
            {
              field: 'rainfall',
              name: '降雨量',
              valueFormatter: (v) => `${v}mm`,
            },
            {
              field: 'windSpeed',
              name: '风速',
              valueFormatter: (v) => `${v}m/s`,
            },
          ],
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
