---
title: 螺旋图
order: 18
screenshot: 'https://zos.alipayobjects.com/rmsportal/TpVCbyphCQAQPSV.png'
category: ['comparison', 'time']
similar: ['rose']
---
<img src="https://zos.alipayobjects.com/rmsportal/TpVCbyphCQAQPSV.png" alt="螺旋图示例" width="600">

## 螺旋图的简介


螺旋图，基于阿基米德螺旋坐标系，常用于绘制随时间变化的数据，从螺旋的中心开始向外绘制。

螺旋图有两大好处：
- **绘制大量数据**：螺旋图节省空间，可用于显示大时间段数据的变化趋势
- **绘制周期性数据**：螺旋图每一圈的刻度差相同，当每一圈的刻度差是数据周期的倍数时，能够直观的表达数据的周期性

螺旋图通过将线性时间轴转换为极坐标系下的螺旋形状，从中心点开始向外延伸，既保持了时间的连续性，又实现了空间的紧凑利用。这种表现形式在处理大量时间序列数据时具有独特的视觉优势，特别适合观察数据的**周期**和变化**趋势**。

**英文名**：Spiral Chart

## 螺旋图的构成


螺旋图主要由以下几个部分构成：
<img src="https://zos.alipayobjects.com/rmsportal/qyGdUeuTzufNebS.jpg" alt="螺旋图结构" width="600">

| 图表类型 | 螺旋图 |
|---------|--------|
| 适合的数据 | 一个时间数据字段，一个连续字段 |
| 功能 | 观察数据**周期**和变化**趋势** |
| 数据与图形的映射 | 时间数据字段映射到旋转角度θ轴，连续字段映射到线圈间距radius轴 |
| 适合的数据条数 | 100条以上 |



## 螺旋图的应用场景

### 适合的场景

例子 1: **展示大量数据的变化趋势**

用大量数据来形成完整的螺旋形状
```js | ob { inject: true }
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "interval",
  autoFit: true,
  height: 500,
  data: {
    value: [
      { time: "2025.07.11", value: 35 },
      { time: "2025.07.12", value: 30 },
      { time: "2025.07.13", value: 55 },
      { time: "2025.07.14", value: 86 },
      { time: "2025.07.15", value: 100 },
      { time: "2025.07.16", value: 60 },
      { time: "2025.07.17", value: 79 },
      { time: "2025.07.18", value: 15 },
      { time: "2025.07.19", value: 10 },
      { time: "2025.07.20", value: 10 },
      { time: "2025.07.21", value: 10 },
      { time: "2025.07.22", value: 55 },
      { time: "2025.07.23", value: 25 },
      { time: "2025.07.24", value: 35 },
      { time: "2025.07.25", value: 35 },
      { time: "2025.07.26", value: 20 },
      { time: "2025.07.27", value: 40 },
      { time: "2025.07.28", value: 20 },
      { time: "2025.07.29", value: 45 },
      { time: "2025.07.30", value: 45 },
      { time: "2025.07.31", value: 10 },
      { time: "2025.08.01", value: 30 },
      { time: "2025.08.02", value: 45 },
      { time: "2025.08.03", value: 40 },
      { time: "2025.08.04", value: 40 },
      { time: "2025.08.05", value: 20 },
      { time: "2025.08.06", value: 40 },
      { time: "2025.08.07", value: 20 },
      { time: "2025.08.08", value: 50 },
      { time: "2025.08.09", value: 15 },
      { time: "2025.08.10", value: 35 },
      { time: "2025.08.11", value: 40 },
      { time: "2025.08.12", value: 30 },
      { time: "2025.08.13", value: 35 },
      { time: "2025.08.14", value: 30 },
      { time: "2025.08.15", value: 76 },
      { time: "2025.08.16", value: 108 },
      { time: "2025.08.17", value: 44 },
      { time: "2025.08.18", value: 55 },
      { time: "2025.08.19", value: 30 },
      { time: "2025.08.20", value: 35 },
      { time: "2025.08.21", value: 40 },
      { time: "2025.08.22", value: 30 },
      { time: "2025.08.23", value: 15 },
      { time: "2025.08.24", value: 55 },
      { time: "2025.08.25", value: 55 },
      { time: "2025.08.26", value: 30 },
      { time: "2025.08.27", value: 55 },
      { time: "2025.08.28", value: 10 },
      { time: "2025.08.29", value: 35 },
      { time: "2025.08.30", value: 10 },
      { time: "2025.08.31", value: 25 },
      { time: "2025.09.01", value: 25 },
      { time: "2025.09.02", value: 25 },
      { time: "2025.09.03", value: 25 },
      { time: "2025.09.04", value: 25 },
      { time: "2025.09.05", value: 50 },
      { time: "2025.09.06", value: 20 },
      { time: "2025.09.07", value: 35 },
      { time: "2025.09.08", value: 35 },
      { time: "2025.09.09", value: 20 },
      { time: "2025.09.10", value: 30 },
      { time: "2025.09.11", value: 30 },
      { time: "2025.09.12", value: 10 },
      { time: "2025.09.13", value: 25 },
      { time: "2025.09.14", value: 51 },
      { time: "2025.09.15", value: 108 },
      { time: "2025.09.16", value: 116 },
      { time: "2025.09.17", value: 65 },
      { time: "2025.09.18", value: 10 },
      { time: "2025.09.19", value: 20 },
      { time: "2025.09.20", value: 40 },
      { time: "2025.09.21", value: 20 },
      { time: "2025.09.22", value: 45 },
      { time: "2025.09.23", value: 10 },
      { time: "2025.09.24", value: 35 },
      { time: "2025.09.25", value: 20 },
      { time: "2025.09.26", value: 30 },
      { time: "2025.09.27", value: 55 },
      { time: "2025.09.28", value: 30 },
      { time: "2025.09.29", value: 20 },
      { time: "2025.09.30", value: 40 },
      { time: "2025.10.01", value: 50 },
      { time: "2025.10.02", value: 55 },
      { time: "2025.10.03", value: 15 },
      { time: "2025.10.04", value: 25 },
      { time: "2025.10.05", value: 30 },
      { time: "2025.10.06", value: 15 },
      { time: "2025.10.07", value: 10 },
      { time: "2025.10.08", value: 35 },
      { time: "2025.10.09", value: 30 },
      { time: "2025.10.10", value: 10 },
      { time: "2025.10.11", value: 45 },
      { time: "2025.10.12", value: 35 },
      { time: "2025.10.13", value: 30 },
      { time: "2025.10.14", value: 25 },
      { time: "2025.10.15", value: 51 },
      { time: "2025.10.16", value: 100 },
      { time: "2025.10.17", value: 108 },
      { time: "2025.10.18", value: 37 },
      { time: "2025.10.19", value: 10 },
      { time: "2025.10.20", value: 45 },
      { time: "2025.10.21", value: 15 },
      { time: "2025.10.22", value: 10 },
      { time: "2025.10.23", value: 25 },
      { time: "2025.10.24", value: 55 },
      { time: "2025.10.25", value: 10 },
      { time: "2025.10.26", value: 10 },
      { time: "2025.10.27", value: 20 },
      { time: "2025.10.28", value: 20 },
      { time: "2025.10.29", value: 20 },
      { time: "2025.10.30", value: 10 },
      { time: "2025.10.31", value: 15 },
      { time: "2025.11.01", value: 55 },
      { time: "2025.11.02", value: 15 },
      { time: "2025.11.03", value: 55 },
      { time: "2025.11.04", value: 15 },
      { time: "2025.11.05", value: 50 },
      { time: "2025.11.06", value: 20 },
      { time: "2025.11.07", value: 30 },
      { time: "2025.11.08", value: 10 },
      { time: "2025.11.09", value: 25 },
      { time: "2025.11.10", value: 15 },
      { time: "2025.11.11", value: 25 },
      { time: "2025.11.12", value: 50 },
      { time: "2025.11.13", value: 35 },
      { time: "2025.11.14", value: 35 },
      { time: "2025.11.15", value: 72 },
      { time: "2025.11.16", value: 124 },
      { time: "2025.11.17", value: 116 },
      { time: "2025.11.18", value: 37 },
      { time: "2025.11.19", value: 10 },
      { time: "2025.11.20", value: 15 },
      { time: "2025.11.21", value: 55 },
      { time: "2025.11.22", value: 30 },
      { time: "2025.11.23", value: 30 },
      { time: "2025.11.24", value: 20 },
      { time: "2025.11.25", value: 50 },
      { time: "2025.11.26", value: 45 },
      { time: "2025.11.27", value: 50 },
      { time: "2025.11.28", value: 25 },
      { time: "2025.11.29", value: 20 },
      { time: "2025.11.30", value: 50 },
      { time: "2025.12.01", value: 15 },
      { time: "2025.12.02", value: 20 },
      { time: "2025.12.03", value: 15 },
      { time: "2025.12.04", value: 30 },
      { time: "2025.12.05", value: 40 },
      { time: "2025.12.06", value: 40 },
      { time: "2025.12.07", value: 45 },
      { time: "2025.12.08", value: 50 },
      { time: "2025.12.09", value: 25 },
      { time: "2025.12.10", value: 15 },
      { time: "2025.12.11", value: 35 },
      { time: "2025.12.12", value: 35 },
      { time: "2025.12.13", value: 50 },
      { time: "2025.12.14", value: 25 },
      { time: "2025.12.15", value: 30 },
      { time: "2025.12.16", value: 93 },
      { time: "2025.12.17", value: 92 },
      { time: "2025.12.18", value: 132 },
      { time: "2025.12.19", value: 51 },
      { time: "2025.12.20", value: 30 },
      { time: "2025.12.21", value: 35 },
      { time: "2025.12.22", value: 25 },
      { time: "2025.12.23", value: 20 },
      { time: "2025.12.24", value: 45 },
      { time: "2025.12.25", value: 40 },
      { time: "2025.12.26", value: 15 },
      { time: "2025.12.27", value: 40 },
      { time: "2025.12.28", value: 40 },
      { time: "2025.12.29", value: 15 },
      { time: "2025.12.30", value: 55 },
      { time: "2025.12.31", value: 45 },
      { time: "2026.01.01", value: 25 },
      { time: "2026.01.02", value: 45 },
      { time: "2026.01.03", value: 45 },
      { time: "2026.01.04", value: 50 },
      { time: "2026.01.05", value: 45 },
      { time: "2026.01.06", value: 30 },
      { time: "2026.01.07", value: 30 },
      { time: "2026.01.08", value: 55 },
      { time: "2026.01.09", value: 55 },
      { time: "2026.01.10", value: 10 },
      { time: "2026.01.11", value: 20 },
      { time: "2026.01.12", value: 10 },
      { time: "2026.01.13", value: 15 },
      { time: "2026.01.14", value: 50 },
      { time: "2026.01.15", value: 10 },
      { time: "2026.01.16", value: 86 },
      { time: "2026.01.17", value: 68 },
      { time: "2026.01.18", value: 116 },
      { time: "2026.01.19", value: 58 },
      { time: "2026.01.20", value: 10 },
      { time: "2026.01.21", value: 15 },
      { time: "2026.01.22", value: 55 },
      { time: "2026.01.23", value: 15 },
      { time: "2026.01.24", value: 50 },
      { time: "2026.01.25", value: 50 },
      { time: "2026.01.26", value: 55 },
      { time: "2026.01.27", value: 50 },
      { time: "2026.01.28", value: 55 },
      { time: "2026.01.29", value: 50 },
      { time: "2026.01.30", value: 45 },
      { time: "2026.01.31", value: 15 },
      { time: "2026.02.01", value: 15 },
      { time: "2026.02.02", value: 25 },
      { time: "2026.02.03", value: 25 },
      { time: "2026.02.04", value: 40 },
      { time: "2026.02.05", value: 45 },
      { time: "2026.02.06", value: 15 },
      { time: "2026.02.07", value: 45 },
      { time: "2026.02.08", value: 20 },
      { time: "2026.02.09", value: 25 },
      { time: "2026.02.10", value: 55 },
      { time: "2026.02.11", value: 50 },
      { time: "2026.02.12", value: 50 },
      { time: "2026.02.13", value: 55 },
      { time: "2026.02.14", value: 40 },
      { time: "2026.02.15", value: 10 },
      { time: "2026.02.16", value: 58 },
      { time: "2026.02.17", value: 92 },
      { time: "2026.02.18", value: 84 },
      { time: "2026.02.19", value: 44 },
      { time: "2026.02.20", value: 55 },
      { time: "2026.02.21", value: 45 },
      { time: "2026.02.22", value: 40 },
      { time: "2026.02.23", value: 20 },
      { time: "2026.02.24", value: 50 },
      { time: "2026.02.25", value: 10 },
      { time: "2026.02.26", value: 10 },
      { time: "2026.02.27", value: 50 },
      { time: "2026.02.28", value: 15 },
      { time: "2026.03.01", value: 40 },
      { time: "2026.03.02", value: 45 },
      { time: "2026.03.03", value: 45 },
      { time: "2026.03.04", value: 30 },
      { time: "2026.03.05", value: 30 },
      { time: "2026.03.06", value: 50 },
      { time: "2026.03.07", value: 25 },
      { time: "2026.03.08", value: 10 },
      { time: "2026.03.09", value: 40 },
      { time: "2026.03.10", value: 10 },
      { time: "2026.03.11", value: 15 },
      { time: "2026.03.12", value: 30 },
      { time: "2026.03.13", value: 25 },
      { time: "2026.03.14", value: 20 },
      { time: "2026.03.15", value: 50 },
      { time: "2026.03.16", value: 25 },
      { time: "2026.03.17", value: 50 },
      { time: "2026.03.18", value: 20 },
      { time: "2026.03.19", value: 30 },
      { time: "2026.03.20", value: 60 },
      { time: "2026.03.21", value: 68 },
      { time: "2026.03.22", value: 72 },
      { time: "2026.03.23", value: 20 },
      { time: "2026.03.24", value: 20 },
      { time: "2026.03.25", value: 50 },
      { time: "2026.03.26", value: 15 },
      { time: "2026.03.27", value: 25 },
      { time: "2026.03.28", value: 25 },
      { time: "2026.03.29", value: 35 },
      { time: "2026.03.30", value: 45 },
      { time: "2026.03.31", value: 45 },
      { time: "2026.04.01", value: 10 },
      { time: "2026.04.02", value: 45 },
      { time: "2026.04.03", value: 15 },
      { time: "2026.04.04", value: 10 },
      { time: "2026.04.05", value: 45 },
      { time: "2026.04.06", value: 20 },
      { time: "2026.04.07", value: 50 },
      { time: "2026.04.08", value: 30 },
      { time: "2026.04.09", value: 20 },
      { time: "2026.04.10", value: 50 },
      { time: "2026.04.11", value: 35 },
      { time: "2026.04.12", value: 35 },
      { time: "2026.04.13", value: 40 },
      { time: "2026.04.14", value: 25 },
      { time: "2026.04.15", value: 15 },
      { time: "2026.04.16", value: 15 },
      { time: "2026.04.17", value: 55 },
      { time: "2026.04.18", value: 45 },
      { time: "2026.04.19", value: 65 },
      { time: "2026.04.20", value: 76 },
      { time: "2026.04.21", value: 68 },
      { time: "2026.04.22", value: 72 },
      { time: "2026.04.23", value: 45 },
      { time: "2026.04.24", value: 10 },
      { time: "2026.04.25", value: 40 },
      { time: "2026.04.26", value: 25 },
      { time: "2026.04.27", value: 15 },
      { time: "2026.04.28", value: 35 },
      { time: "2026.04.29", value: 30 },
      { time: "2026.04.30", value: 10 },
      { time: "2026.05.01", value: 25 },
      { time: "2026.05.02", value: 40 },
      { time: "2026.05.03", value: 35 },
      { time: "2026.05.04", value: 55 },
      { time: "2026.05.05", value: 35 },
      { time: "2026.05.06", value: 10 },
      { time: "2026.05.07", value: 35 },
      { time: "2026.05.08", value: 30 },
      { time: "2026.05.09", value: 55 },
      { time: "2026.05.10", value: 30 },
      { time: "2026.05.11", value: 20 },
      { time: "2026.05.12", value: 35 },
      { time: "2026.05.13", value: 55 },
      { time: "2026.05.14", value: 45 },
      { time: "2026.05.15", value: 45 },
      { time: "2026.05.16", value: 35 },
      { time: "2026.05.17", value: 55 },
      { time: "2026.05.18", value: 25 },
      { time: "2026.05.19", value: 40 },
      { time: "2026.05.20", value: 93 },
      { time: "2026.05.21", value: 92 },
      { time: "2026.05.22", value: 108 },
      { time: "2026.05.23", value: 93 },
      { time: "2026.05.24", value: 55 },
      { time: "2026.05.25", value: 20 },
      { time: "2026.05.26", value: 40 },
      { time: "2026.05.27", value: 20 },
      { time: "2026.05.28", value: 45 },
      { time: "2026.05.29", value: 50 },
      { time: "2026.05.30", value: 45 },
      { time: "2026.05.31", value: 45 },
      { time: "2026.06.01", value: 40 },
      { time: "2026.06.02", value: 20 },
      { time: "2026.06.03", value: 35 },
      { time: "2026.06.04", value: 35 },
      { time: "2026.06.05", value: 15 },
      { time: "2026.06.06", value: 10 },
      { time: "2026.06.07", value: 55 },
      { time: "2026.06.08", value: 40 },
      { time: "2026.06.09", value: 25 },
      { time: "2026.06.10", value: 20 },
      { time: "2026.06.11", value: 40 },
      { time: "2026.06.12", value: 20 },
      { time: "2026.06.13", value: 25 },
      { time: "2026.06.14", value: 25 },
      { time: "2026.06.15", value: 55 },
      { time: "2026.06.16", value: 35 },
      { time: "2026.06.17", value: 35 },
      { time: "2026.06.18", value: 25 },
      { time: "2026.06.19", value: 25 },
      { time: "2026.06.20", value: 65 },
      { time: "2026.06.21", value: 68 },
      { time: "2026.06.22", value: 68 },
      { time: "2026.06.23", value: 30 },
      { time: "2026.06.24", value: 30 },
      { time: "2026.06.25", value: 10 },
      { time: "2026.06.26", value: 15 },
      { time: "2026.06.27", value: 15 },
      { time: "2026.06.28", value: 40 },
      { time: "2026.06.29", value: 55 },
      { time: "2026.06.30", value: 10 },
      { time: "2026.07.01", value: 15 },
      { time: "2026.07.02", value: 30 },
      { time: "2026.07.03", value: 45 },
      { time: "2026.07.04", value: 35 },
      { time: "2026.07.05", value: 45 },
      { time: "2026.07.06", value: 20 },
      { time: "2026.07.07", value: 30 },
      { time: "2026.07.08", value: 30 },
      { time: "2026.07.09", value: 40 },
      { time: "2026.07.10", value: 45 },
      { time: "2026.07.11", value: 55 },
      { time: "2026.07.12", value: 55 },
      { time: "2026.07.13", value: 55 },
      { time: "2026.07.14", value: 50 },
      { time: "2026.07.15", value: 10 },
      { time: "2026.07.16", value: 55 },
      { time: "2026.07.17", value: 15 },
    ],
  },
  encode: { x: "time", y: "value", color: "value" },
  scale: { color: { type: "linear", range: ["#ffffff", "#1890FF"] } },
  coordinate: {
    type: "helix",
    startAngle: 1.5707963267948966,
    endAngle: 39.269908169872416,
  },
  animate: { enter: { type: "fadeIn" } },
  tooltip: { title: "time" },
});

chart.render();

```

### 不适合的场景

螺旋图虽然有很多优势，但也存在一些局限性：

**1. 数据量过少的场景**

螺旋图需要足够的数据点（通常100条以上）来形成完整的螺旋形状，如果数据量太少，螺旋效果不明显，此时使用普通的折线图或散点图会更合适。

```js | ob { inject: true }
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "interval",
  autoFit: true,
  height: 500,
  data: {
    value: [
      { time: "2025.07.11", value: 15 },
      { time: "2025.07.12", value: 50 },
      { time: "2025.07.13", value: 50 },
      { time: "2025.07.14", value: 86 },
      { time: "2025.07.15", value: 60 },
    ],
  },
  encode: { x: "time", y: "value", color: "value" },
  scale: { color: { type: "linear", range: ["#ffffff", "#1890FF"] } },
  coordinate: {
    type: "helix",
    startAngle: 1.5707963267948966,
    endAngle: 39.269908169872416,
  },
  animate: { enter: { type: "fadeIn" } },
  tooltip: { title: "time" },
});

chart.render();

```
**更适合的折线图示例：**

```js | ob { inject: true }
import { Chart } from "@antv/g2";

// 同样的5天数据，使用折线图展示
const data = [];
const dates = ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'];
const values = [45, 68, 52, 71, 59]; // 模拟5天的销售数据

dates.forEach((date, index) => {
  data.push({
    time: date,
    value: values[index]
  });
});

const chart = new Chart({ 
  container: "container",
  autoFit: true,
  height: 400,
  padding: [50, 50, 50, 50]
});

chart.options({
  type: 'line',
  data,
  encode: {
    x: 'time',
    y: 'value'
  },
  scale: {
    time: {
      type: 'time',
      mask: 'yyyy.mm.dd'
    }
  },
  style: {
    stroke: '#1890ff',
    strokeWidth: 3,
    lineJoin: 'round'
  },
  point: {
    style: {
      fill: '#1890ff',
      stroke: '#ffffff',
      strokeWidth: 2,
      r: 6
    }
  },
  axis: {
    x: { 
      title: '时间',
      labelAutoRotate: false
    },
    y: { title: '销售额' }
  },
  title: '推荐方案：少量数据使用折线图更清晰（5天数据）'
});

chart.render();
```

**2. 需要精确比较数值的场景**

由于螺旋图的非线性特性，不便于精确比较具体数值或变化率。

```js | ob { inject: true }
import { Chart } from "@antv/g2";

// 需要精确对比的数据示例
const data = [];
const categories = ['产品A', '产品B', '产品C', '产品D'];
categories.forEach((category, index) => {
  for (let month = 1; month <= 12; month++) {
    data.push({
      time: `2023-${month.toString().padStart(2, '0')}`,
      category: category,
      sales: 80 + index * 5 + Math.random() * 10 // 接近的数值，需要精确比较
    });
  }
});

const chart = new Chart({ 
  container: "container",
  autoFit: true,
  height: 400,
  padding: [50, 50, 50, 50]
});

chart.options({
  type: 'interval',
  data,
  coordinate: {
    type: 'helix',
    startAngle: 1 * Math.PI,
    endAngle: 5 * Math.PI
  },
  encode: {
    x: 'time',
    y: 'sales',
    color: 'category'
  },
  scale: {
    color: { 
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#f5222d']
    },
    time: {
      type: 'time',
      mask: 'yyyy.mm'
    }
  },
  style: {
    fillOpacity: 0.8
  },

});

chart.render();
```

## 螺旋图的扩展

### 多层螺旋图

展示多个相关数据系列的螺旋对比：

```js | ob { inject: true }
import { Chart } from "@antv/g2";

// 生成多层螺旋数据
const data = [];
const series = ['系列A', '系列B', '系列C'];

series.forEach((seriesName, seriesIndex) => {
  for (let i = 0; i < 120; i++) {
    const angle = (i / 120) * 4 * Math.PI;
    const baseRadius = 30 + seriesIndex * 15; // 不同系列不同半径
    const radius = baseRadius + i * 0.8;
    
    // 不同系列有不同的数据模式
    let value;
    if (seriesIndex === 0) {
      value = 50 + 20 * Math.sin(angle);
    } else if (seriesIndex === 1) {
      value = 45 + 25 * Math.cos(angle * 0.5);
    } else {
      value = 55 + 15 * Math.sin(angle * 2);
    }
    
    value += Math.random() * 10;
    
    data.push({
      time: i,
      angle: angle * 180 / Math.PI,
      radius: radius,
      value: value,
      series: seriesName
    });
  }
});

const chart = new Chart({ 
  container: "container",
  autoFit: true,
  height: 600,
  padding: [50, 50, 50, 50]
});

chart.options({
  type: 'line',
  data,
  coordinate: { type: 'polar' },
  encode: {
    x: 'angle',
    y: 'radius',
    color: 'series'
  },
  scale: {
    color: { 
      palette: ['#1890ff', '#52c41a', '#fa8c16']
    },
    x: { type: 'linear' },
    y: { type: 'linear' }
  },
  style: {
    strokeWidth: 2,
    strokeOpacity: 0.8
  },
  axis: {
    x: { title: null },
    y: { title: '螺旋进程' }
  },
  legend: {
    color: { title: '数据系列' }
  },
  title: '多层螺旋对比图'
});

chart.render();
```

### 基因螺旋图

基因螺旋图是螺旋图在生物信息学领域的特殊应用，常用于展示基因表达数据随时间的变化模式。通过螺旋坐标系，可以清晰地观察基因在不同条件下（如野生型WT和敲除型KO）的表达差异：

```js | ob { inject: true }
import { Chart } from "@antv/g2";

// 模拟基因表达数据
const data = [];
const groups = ['WT', 'KO']; // 野生型和敲除型
const hours = 72; // 72小时时间序列
const baseValues = {
  WT: 2.0,   // 野生型基础表达水平
  KO: 2.3,   // 敲除型基础表达水平
};

for (let i = 0; i < hours; i++) {
  const time = `${i}h`;
  groups.forEach((group) => {
    // 模拟基因表达的周期性变化和随机波动
    const cyclicPattern = Math.sin(i / 10) * 0.3; // 周期性模式
    const randomNoise = Math.random() * 0.4 - 0.2; // 随机噪声
    const trendFactor = group === 'KO' ? 0.1 : 0; // 敲除型可能有轻微上升趋势
    
    data.push({
      time,
      group,
      logFPKM: baseValues[group] + cyclicPattern + randomNoise + (i * trendFactor / 100)
    });
  });
}

const chart = new Chart({ 
  container: "container",
  autoFit: true,
  height: 600,
  padding: [50, 50, 50, 50]
});

chart.options({
  type: 'interval',
  data,
  coordinate: {
    type: 'helix',
    startAngle: 0.2 * Math.PI,
    endAngle: 6.5 * Math.PI,
    innerRadius: 0.1,
  },
  encode: {
    x: 'time',
    y: 'group',
    color: 'logFPKM'
  },
  scale: {
    color: {
      type: 'linear',
      range: ['#fff', '#ec4839']
    }
  },
  style: {
    fillOpacity: 0.8
  },
  tooltip: {
    title: 'time',
    items: [
      { field: 'group', name: '组别' },
      {
        field: 'logFPKM',
        name: 'log(FPKM)',
        valueFormatter: (value) => value.toFixed(2),
      },
    ],
  },
  animate: {
    enter: { type: 'fadeIn', duration: 1000 }
  },
  axis: {
    x: { title: '时间进程' },
    y: { title: '基因组别' }
  },
  legend: {
    color: { title: '基因表达水平 log(FPKM)' }
  },
  title: '基因表达螺旋图：WT vs KO (72小时)'
});

chart.render();
```

这种可视化方式特别适合：
- **时间序列基因表达数据**：展示基因在长时间序列中的表达变化
- **多组别比较**：同时比较不同基因型或处理条件下的表达差异  
- **周期性模式识别**：识别基因表达的昼夜节律或其他周期性规律
- **表达热图展示**：通过颜色编码直观展示表达强度差异

## 螺旋图与其他图表的对比

### 螺旋图和[折线图](/charts/line)

- 螺旋图通过螺旋形式节省空间，适合展示长时间序列数据
- 折线图在直线坐标系中展示，更直观地显示数据变化趋势
- 螺旋图更能突出周期性模式，折线图更适合分析精确的时间趋势

### 螺旋图和[热力图](/charts/heatmap)

- 螺旋图通过螺旋路径展示时间序列的连续性
- 热力图通过颜色矩阵展示数据密度和模式
- 螺旋图保持时间顺序，热力图更适合展示分类数据的分布

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>