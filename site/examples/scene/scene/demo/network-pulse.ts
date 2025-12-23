import { Chart } from '@antv/g2';

// 数据脉冲网络 - 节点间的数据传输可视化
// 模拟网络中数据包在节点间的脉冲传输

const NODES = 8; // 节点数量
const FRAMES = 150; // 动画帧数
const FPS = 30; // 每秒帧数

// 生成网络节点（圆形布局）
const nodes = Array.from({ length: NODES }, (_, i) => {
  const angle = (i / NODES) * Math.PI * 2 - Math.PI / 2;
  const radius = 40;
  return {
    id: i,
    name: `Node ${i + 1}`,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    status: Math.random() > 0.7 ? 'active' : 'normal',
  };
});

// 生成连接关系
const connections = [];
for (let i = 0; i < NODES; i++) {
  // 每个节点连接到相邻节点
  const next = (i + 1) % NODES;
  connections.push({ from: i, to: next });

  // 随机添加一些跨节点连接
  if (Math.random() > 0.6) {
    const target = (i + 3) % NODES;
    connections.push({ from: i, to: target });
  }
}

// 生成单帧数据
function generateNetworkData(frame) {
  const data = [];
  const time = frame * 0.05;

  // 添加节点
  nodes.forEach((node) => {
    const pulsePhase = (time * 2 + node.id) % (Math.PI * 2);
    const pulse = 0.7 + Math.sin(pulsePhase) * 0.3;

    data.push({
      type: 'node',
      x: node.x,
      y: node.y,
      name: node.name,
      status: node.status,
      size: node.status === 'active' ? 12 * pulse : 8,
      key: `node-${node.id}`,
    });
  });

  // 添加连接线
  connections.forEach((conn, connIndex) => {
    const from = nodes[conn.from];
    const to = nodes[conn.to];

    // 为每条连接添加多个点形成线段
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;

      data.push({
        type: 'link',
        x,
        y,
        connection: connIndex,
        key: `link-${connIndex}-${i}`,
      });
    }
  });

  // 添加脉冲数据包
  connections.forEach((conn, connIndex) => {
    const from = nodes[conn.from];
    const to = nodes[conn.to];

    // 每条连接上可能有多个数据包
    const packetsPerLink = 2;
    for (let p = 0; p < packetsPerLink; p++) {
      const progress = (time * 0.5 + connIndex * 0.3 + p * 0.5) % 1;
      const x = from.x + (to.x - from.x) * progress;
      const y = from.y + (to.y - from.y) * progress;

      // 数据包尾迹
      for (let tail = 0; tail < 5; tail++) {
        const tailProgress = Math.max(0, progress - tail * 0.05);
        const tailX = from.x + (to.x - from.x) * tailProgress;
        const tailY = from.y + (to.y - from.y) * tailProgress;
        const opacity = (1 - tail / 5) * 0.8;

        if (tailProgress >= 0 && tailProgress <= 1) {
          data.push({
            type: 'pulse',
            x: tailX,
            y: tailY,
            size: 4 - tail,
            opacity,
            key: `pulse-${connIndex}-${p}-${tail}`,
          });
        }
      }
    }
  });

  return data;
}

// 预生成所有帧的 options
const allOptions = [];

for (let frame = 0; frame < FRAMES; frame++) {
  const data = generateNetworkData(frame);

  const option = {
    type: 'point',
    data: data,
    encode: {
      x: 'x',
      y: 'y',
      size: (d) => d.size || 1,
      color: 'type',
      shape: 'point',
      key: 'key',
    },
    scale: {
      x: { domain: [0, 100] },
      y: { domain: [0, 100] },
      size: { range: [1, 15] },
      color: {
        domain: ['node', 'link', 'pulse'],
        range: ['#1890ff', '#2a2a3e', '#52c41a'],
      },
    },
    style: {
      fill: (d) => {
        if (d.type === 'node') {
          return d.status === 'active' ? '#ff4d4f' : '#1890ff';
        }
        if (d.type === 'link') return '#2a2a3e';
        if (d.type === 'pulse') return '#52c41a';
        return '#666';
      },
      fillOpacity: (d) => {
        if (d.type === 'node') return 0.9;
        if (d.type === 'link') return 0.3;
        if (d.type === 'pulse') return d.opacity || 0.8;
        return 0.5;
      },
      stroke: (d) => {
        if (d.type === 'node') return '#fff';
        if (d.type === 'pulse') return '#52c41a';
        return 'none';
      },
      strokeOpacity: (d) => (d.type === 'node' ? 0.8 : d.opacity || 0),
      lineWidth: (d) => (d.type === 'node' ? 2 : 1),
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
        { field: 'name', name: '节点' },
        {
          field: 'status',
          name: '状态',
          valueFormatter: (v) => (v === 'active' ? '🔴 活跃' : '🔵 正常'),
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
