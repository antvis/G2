import { Chart } from '@antv/g2';

// 股票实时K线动态图
// 从少量数据逐步增加到几十根K线，展示股票涨跌形态

const INITIAL_CANDLES = 5; // 初始K线数量
const MAX_CANDLES = 50; // 最大K线数量
const FRAMES = 100; // 动画帧数
const FPS = 20; // 每秒帧数

// 生成单根K线数据（带趋势）
function generateCandle(index, prevClose, trendPhase) {
  const basePrice = prevClose || 100;

  // 根据趋势阶段调整波动
  let trendBias = 0;
  if (trendPhase === 'bull') {
    // 牛市：70%概率上涨
    trendBias = Math.random() < 0.7 ? 0.015 : -0.008;
  } else if (trendPhase === 'bear') {
    // 熊市：70%概率下跌
    trendBias = Math.random() < 0.7 ? -0.015 : 0.008;
  } else {
    // 震荡：随机波动
    trendBias = (Math.random() - 0.5) * 0.02;
  }

  const volatility = 0.015; // 基础波动率 1.5%
  const change = (trendBias + (Math.random() - 0.5) * volatility) * basePrice;

  const start = basePrice;
  const end = basePrice + change;

  const max =
    Math.max(start, end) + Math.random() * volatility * basePrice * 0.5;
  const min =
    Math.min(start, end) - Math.random() * volatility * basePrice * 0.5;

  // 成交量（价格波动越大，成交量越大）
  const volume = Math.abs(change) * 2000 + Math.random() * 8000 + 5000;

  return {
    index,
    time: `2024-${String(Math.floor(index / 20) + 1).padStart(2, '0')}-${String(
      (index % 20) + 1,
    ).padStart(2, '0')}`,
    start: parseFloat(start.toFixed(2)),
    end: parseFloat(end.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    volume: Math.round(volume),
  };
}

// 预生成完整的股票数据（含不同趋势阶段）
const fullStockData = [];
let currentPrice = 100;

for (let i = 0; i < MAX_CANDLES; i++) {
  // 划分趋势阶段
  let phase;
  if (i < 15) phase = 'bull'; // 0-14: 牛市
  else if (i < 30) phase = 'bear'; // 15-29: 熊市
  else if (i < 40) phase = 'sideways'; // 30-39: 震荡
  else phase = 'bull'; // 40+: 再次上涨

  const candle = generateCandle(i, currentPrice, phase);
  fullStockData.push(candle);
  currentPrice = candle.end;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  // 逐步增加K线数量：从 INITIAL_CANDLES 到 MAX_CANDLES
  const candleCount = Math.min(
    INITIAL_CANDLES + Math.floor(frame * 0.5),
    MAX_CANDLES,
  );

  const data = fullStockData.slice(0, candleCount);

  // 计算价格范围（用于固定Y轴）
  const prices = data.flatMap((d) => [d.min, d.max]);
  const minPrice = Math.min(...prices) * 0.98;
  const maxPrice = Math.max(...prices) * 1.02;

  const option = {
    type: 'view',
    data: data,
    encode: {
      x: 'time',
      color: (d) => {
        const trend = Math.sign(d.start - d.end);
        return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
      },
    },
    scale: {
      x: {
        compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      },
      color: {
        domain: ['下跌', '不变', '上涨'],
        range: ['#4daf4a', '#999999', '#e41a1c'],
      },
    },
    children: [
      // K线上下影线
      {
        type: 'link',
        encode: {
          y: ['min', 'max'],
        },
        tooltip: {
          title: 'time',
          items: [
            {
              field: 'start',
              name: '开盘价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'end',
              name: '收盘价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'min',
              name: '最低价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'max',
              name: '最高价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
          ],
        },
      },
      // K线实体（开盘-收盘）
      {
        type: 'interval',
        encode: {
          y: ['start', 'end'],
        },
        style: {
          fillOpacity: 1,
          stroke: (d) => (d.start === d.end ? '#999999' : undefined),
        },
        axis: {
          x: {
            title: `交易日（共 ${candleCount} 天）`,
            labelFormatter: (d) => {
              const date = new Date(d);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            },
          },
          y: {
            position: 'right',
            title: '价格（元）',
            labelFormatter: (d) => `¥${d.toFixed(2)}`,
          },
        },
        tooltip: {
          title: 'time',
          items: [
            {
              field: 'start',
              name: '开盘价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'end',
              name: '收盘价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'min',
              name: '最低价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
            },
            {
              field: 'max',
              name: '最高价',
              valueFormatter: (v) => `¥${v.toFixed(2)}`,
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
  paddingLeft: 60,
});

chart.options(allOptions[0]);
chart.render();

// 播放动画
let currentFrame = 0;
const timer = setInterval(() => {
  currentFrame = (currentFrame + 1) % FRAMES;
  chart.options(allOptions[currentFrame]);
  chart.render();
}, 10000 / FPS);
