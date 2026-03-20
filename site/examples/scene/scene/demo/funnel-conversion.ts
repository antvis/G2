import { Chart } from '@antv/g2';

// 流量漏斗分析 - 用户转化流程动态变化
// 从初始状态逐步演变，展示转化率的实时波动

const STAGES = ['访问首页', '浏览商品', '加入购物车', '下单', '支付'];
const FRAMES = 150; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成单帧漏斗数据
function generateFunnelData(frame) {
  const baseUsers = 10000;
  const data = [];

  // 随着时间变化的转化率模式
  const t = (frame / FRAMES) * Math.PI * 4; // 完整周期

  let remainingUsers = baseUsers;

  STAGES.forEach((stage, index) => {
    let users;

    if (index === 0) {
      // 第一阶段：访问量
      users = baseUsers;
    } else {
      // 每个阶段的转化率随时间波动
      let dropRate;

      if (index === 1) {
        // 浏览商品：30-50% 流失
        dropRate = 0.35 + Math.sin(t + index) * 0.15;
      } else if (index === 2) {
        // 加入购物车：50-70% 流失
        dropRate = 0.6 + Math.sin(t * 1.5 + index) * 0.15;
      } else if (index === 3) {
        // 下单：20-40% 流失
        dropRate = 0.3 + Math.sin(t * 1.2 + index) * 0.12;
      } else {
        // 支付：10-20% 流失
        dropRate = 0.15 + Math.sin(t * 1.8 + index) * 0.08;
      }

      users = Math.round(remainingUsers * (1 - dropRate));
    }

    // 计算转化率和流失率
    const conversionRate = ((users / baseUsers) * 100).toFixed(1);
    const lossRate =
      index === 0
        ? '0.0'
        : (((remainingUsers - users) / remainingUsers) * 100).toFixed(1);
    const lossRateNum = index === 0 ? 0 : parseFloat(lossRate);

    // 根据流失率判断状态
    let status = 'normal';
    if (index === STAGES.length - 1) {
      status = 'success';
    } else if (lossRateNum > 55) {
      status = 'danger';
    } else if (lossRateNum > 35) {
      status = 'warning';
    }

    data.push({
      stage,
      users,
      conversionRate,
      lossRate,
      status,
      index,
    });

    remainingUsers = users;
  });

  return data;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const data = generateFunnelData(frame);

  const option = {
    type: 'interval',
    data: data,
    coordinate: { transform: [{ type: 'transpose' }] },
    encode: {
      x: 'stage',
      y: 'users',
      color: 'status',
      key: 'index',
    },
    scale: {
      x: {
        domain: STAGES,
      },
      y: {
        domain: [0, 10000],
        nice: false,
      },
      color: {
        domain: ['normal', 'warning', 'danger', 'success'],
        range: ['#1890ff', '#faad14', '#ff4d4f', '#52c41a'],
      },
    },
    transform: [{ type: 'symmetryY' }],
    style: {
      fillOpacity: 0.85,
      radius: 6,
    },
    axis: {
      x: {
        title: '转化阶段',
        labelFontSize: 12,
      },
      y: {
        title: '用户数',
        labelFormatter: (d) => `${(d / 1000).toFixed(0)}k`,
      },
    },
    legend: {
      color: {
        layout: { justifyContent: 'flex-start' },
        itemLabelText: (d) => {
          const map = {
            normal: '正常',
            warning: '需关注',
            danger: '高流失',
            success: '最终转化',
          };
          return map[d.label] || d.label;
        },
      },
    },
    labels: [
      {
        text: (d) => `${d.users.toLocaleString()}人`,
        position: 'inside',
        fontSize: 13,
        fontWeight: 'bold',
        fill: '#fff',
      },
      {
        text: (d) => `转化率 ${d.conversionRate}%`,
        position: 'inside',
        dy: 16,
        fontSize: 10,
        fill: '#fff',
        fillOpacity: 0.9,
      },
    ],
    tooltip: {
      title: (d) => `📍 ${d.stage}`,
      items: [
        {
          field: 'users',
          name: '当前用户数',
          valueFormatter: (v) => `${v.toLocaleString()} 人`,
        },
        {
          field: 'conversionRate',
          name: '总体转化率',
          valueFormatter: (v) => `${v}%`,
        },
        {
          field: 'lossRate',
          name: '本阶段流失率',
          valueFormatter: (v) => `${v}%`,
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
