---
title: 仪表盘
order: 15
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original'
category: ['interval']
similar: ['pie']
---

<img alt="gauge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 仪表盘的简介

仪表盘是一种半圆或圆形的可视化图表，用于展示数据在指定范围内的位置。它通过指针和刻度的方式，模拟物理仪表（如速度表、压力表）的显示效果，直观地表达数据值相对于目标值或阈值的位置关系。

仪表盘特别适合显示进度、完成率或者在一定范围内的单一数值，可以通过颜色区分不同的数值区间，增强数据的可读性和警示效果。

在数据可视化中，仪表盘常用于表现关键绩效指标（KPI）、目标达成情况、系统状态监控等，能够帮助用户快速理解数据在预设目标中的表现。

**英文名**：Gauge Chart, Dial Chart

## 仪表盘的构成

### 基础仪表盘

<img alt="basic-gauge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hpjTRr6LM7IAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础仪表盘                                                           |
| ---------------- | -------------------------------------------------------------------- |
| 适合的数据       | 单一数值数据：当前值、目标值或总值、可选的阈值                       |
| 功能             | 展示数据在指定范围内的位置，通过指针和刻度表示数值                   |
| 数据与图形的映射 | 当前值映射到指针位置<br>总值定义刻度范围<br>可选的阈值映射为颜色分区 |
| 适合的场景       | 表达单一指标在目标值范围内的完成度或状态                             |

## 仪表盘的应用场景

### 适合的场景

例子 1: **适合展示目标完成进度**

下面的仪表盘展示了一个评分指标的完成情况，当前得分为 120，总分为 400。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  },
  legend: false,
});

chart.render();
```

**说明** ：

- `target` 表示当前的得分，映射到仪表盘的指针位置
- `total` 表示总分，定义了仪表盘的刻度范围
- `name` 表示该指标的名称
- 仪表盘通过指针位置直观展示了当前得分在总分中的比例

例子 2: **适合展示多阈值状态监控**

仪表盘可以通过设置多个阈值和不同颜色，清晰地展示数据落在哪个区间，适用于系统状态监控、性能评估等场景。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    textContent: (target, total) =>
      `得分：${target}\n占比：${((target / total) * 100).toFixed(0)}%`,
  },
  legend: false,
});

chart.render();
```

**说明**：

- 通过 `thresholds` 设置了三个区间：0-100、100-200 和 200-400
- 使用不同的颜色映射了各个区间：红色表示低分区间，黄色表示中等区间，绿色表示高分区间
- 自定义了文本内容，同时显示得分和占总分的百分比
- 颜色的变化直观地反映了数据所处的状态区间

例子 3: **自定义仪表盘样式**

仪表盘支持高度的样式自定义，可以根据业务需求调整外观和交互方式。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: {
      range: ['#F4664A', '#FAAD14', 'green'],
    },
  },
  style: {
    arcShape: 'round',
    arcLineWidth: 2,
    arcStroke: '#fff',
    textContent: (target, total) =>
      `得分：${target}\n占比：${((target / total) * 100).toFixed(0)}%`,
  },
  legend: false,
});

chart.render();
```

**说明**：

- 使用 `arcShape: 'round'` 设置了圆弧的形状为圆角
- 通过 `arcLineWidth` 和 `arcStroke` 设置了圆弧的线宽和边框颜色
- 指针和文本的位置自动适应仪表盘的布局
- 圆角设计和细微的样式调整使仪表盘更加现代化和美观

### 不适合的场景

例子 1: **不适合展示多维度数据比较**

仪表盘主要适合展示单一指标值在一定范围内的位置，不适合用于多维度数据的直接比较。如果需要比较多个类别或维度的数据，柱状图、雷达图等可能是更好的选择。

例子 2: **不适合展示时间序列趋势**

仪表盘展示的是某一时刻的静态数据，无法有效地表达数据随时间的变化趋势。对于需要展示随时间变化的数据，折线图或面积图更为适合。

## 仪表盘的扩展

### 自定义指针形状

仪表盘支持自定义指针的形状，可以根据业务场景调整指针的样式，使图表更具个性化。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';
import { Path } from '@antv/g';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

function getOrigin(points) {
  if (points.length === 1) return points[0];
  const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
}
// 自定义指针形状
const customShape = (style) => {
  return (points, value, coordinate, theme) => {
    // 获取几何点中心坐标
    const [x, y] = getOrigin(points);
    const [cx, cy] = coordinate.getCenter();
    // 计算指针方向角度
    const angle = Math.atan2(y - cy, x - cx);
    const length = 100; // 指针长度
    const width = 8; // 指针底部宽度
    // 构造指针三角形路径
    return new Path({
      style: {
        d: [
          ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length], // 顶点
          [
            'L',
            cx + Math.cos(angle + Math.PI / 2) * width,
            cy + Math.sin(angle + Math.PI / 2) * width,
          ], // 底部左点
          [
            'L',
            cx + Math.cos(angle - Math.PI / 2) * width,
            cy + Math.sin(angle - Math.PI / 2) * width,
          ], // 底部右点
          ['Z'], // 闭合路径
        ],
        fill: '#30BF78', // 填充色
      },
    });
  };
};

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 424,
      name: 'score',
    },
  },
  style: {
    pointerShape: customShape,
    pinShape: false,
    textContent: (target, total) => {
      return `得分：${target}\n占比：${((target / total) * 100).toFixed(0)}%`;
    },
  },
});

chart.render();
```

**说明**：

- 使用 `pointerShape` 自定义了仪表盘的指针形状为三角形
- 通过 `pinShape: false` 移除了指针中心的圆点
- 可以根据业务需求完全控制指针的外观、颜色和尺寸

## 仪表盘与其他图表的对比

### 仪表盘和[饼图](/charts/pie)

- 仪表盘侧重展示单一数值在目标范围中的位置，强调数据与目标或阈值的关系
- 饼图侧重于展示多个部分在整体中的占比关系
- 当只关注单一值与总体的关系时，仪表盘提供更突出和直观的表现形式

### 仪表盘和[柱状图](/charts/bar)

- 仪表盘适合展示单一数据点相对于固定范围的位置，强调完成度
- 柱状图更适合比较多个类别之间的数值大小差异
- 对于需要精确比较多个数值的场景，柱状图通常是更好的选择

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
