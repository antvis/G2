---
title: fisheye
order: 2
---

## 概述

鱼眼坐标系（Fisheye）是一种特殊的坐标系变换，它对输入的维度应用笛卡尔鱼眼效果，使得焦点区域被放大，而远离焦点的区域则被压缩。这种变换类似于鱼眼镜头的视觉效果，能够在保持全局视图的同时突出显示局部细节。

鱼眼坐标系变换主要用于以下场景：

1. **数据探索**：当需要同时关注数据的整体分布和局部细节时
2. **可视化密集数据**：当数据点过于密集，难以区分个体时
3. **交互式数据分析**：结合鼠标交互，动态调整焦点位置，实现数据的动态放大和缩小

在 G2 中，鱼眼坐标系可以通过坐标系变换来实现，也可以通过交互组件来动态应用。

### 坐标系原理

鱼眼坐标系的基本原理是：

1. 定义一个焦点位置（focusX, focusY）
2. 设置畸变程度（distortionX, distortionY）
3. 根据点到焦点的距离，应用非线性变换
4. 距离焦点越近的点变换后间距越大（放大效果）
5. 距离焦点越远的点变换后间距越小（压缩效果）

### 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [{ type: 'fisheye', focusX: 0.5, focusY: 0.5 }],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
});

chart.render();
```

## 使用场景

鱼眼坐标系特别适合以下场景：

1. **密集数据可视化**：当数据点过于密集时，鱼眼效果可以帮助用户聚焦于特定区域，同时保持对整体数据的感知
2. **网络图分析**：在大型网络图中，鱼眼效果可以放大关注的节点和连接，同时保持网络的整体结构
3. **地图导航**：在地图可视化中，鱼眼效果可以放大特定区域，同时保持对周围环境的感知
4. **交互式数据探索**：结合鼠标交互，用户可以动态调整焦点位置，实现数据的动态放大和缩小

### 注意事项

1. **畸变程度**：畸变程度（distortionX/distortionY）设置过大会导致视觉失真严重，建议根据实际数据分布调整
2. **焦点位置**：焦点位置（focusX/focusY）应该根据数据分布和用户关注点来设置
3. **交互体验**：在交互式应用中，鱼眼效果的变化应该平滑，避免突变导致的视觉不适

## 配置项

鱼眼坐标系的配置项如下：

| 属性        | 描述                                  | 类型      | 默认值  | 必选 |
| ----------- | ------------------------------------- | --------- | ------- | ---- |
| focusX      | 鱼眼变换中心点 x 方向位置             | `number`  | `0`     |      |
| focusY      | 鱼眼变换中心点 y 方向位置             | `number`  | `0`     |      |
| distortionX | 鱼眼变换 x 方向畸变大小               | `number`  | `2`     |      |
| distortionY | 鱼眼变换 y 方向畸变大小               | `number`  | `2`     |      |
| visual      | focusX 和 focusY 的值是否是视觉坐标点 | `boolean` | `false` |      |

### 参数说明

- **focusX/focusY**：定义鱼眼效果的焦点位置。当 `visual=false` 时，取值范围为 [0, 1]，表示归一化坐标；当 `visual=true` 时，表示实际的视觉坐标点。
- **distortionX/distortionY**：控制鱼眼效果的畸变程度，值越大，畸变效果越明显。
- **visual**：决定 focusX 和 focusY 的坐标系统。设为 true 时，使用视觉坐标系统；设为 false 时，使用归一化坐标系统。

## 常见用例

### 1. 静态鱼眼效果

最简单的用法是设置一个固定的鱼眼焦点，适用于需要突出显示特定区域的场景。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.7,
        focusY: 0.3,
        distortionX: 3,
        distortionY: 3,
      },
    ],
  },
  type: 'point',
  data: [
    { x: 1, y: 1, category: 'A' },
    { x: 2, y: 2, category: 'B' },
    { x: 3, y: 3, category: 'C' },
    { x: 4, y: 4, category: 'D' },
    { x: 5, y: 5, category: 'E' },
    { x: 6, y: 6, category: 'F' },
    { x: 7, y: 7, category: 'G' },
    { x: 8, y: 8, category: 'H' },
    { x: 9, y: 9, category: 'I' },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'category',
    shape: 'point',
  },
  style: {
    r: 6,
    lineWidth: 1,
  },
});

chart.render();
```

### 2. 交互式鱼眼效果

通过添加交互组件，可以实现动态的鱼眼效果，焦点随鼠标移动而变化。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
  interaction: {
    fisheye: true, // 启用鱼眼交互
  },
});

chart.render();
```

## 完整示例

以下是一个结合了鱼眼坐标系和散点图的完整示例，展示了如何使用鱼眼效果来分析多维数据：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 800,
  height: 500,
  padding: [40, 60, 60, 80],
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.6,
        focusY: 0.4,
        distortionX: 2.5,
        distortionY: 2.5,
      },
    ],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
    x: {
      nice: true,
    },
    y: {
      nice: true,
    },
  },
  style: {
    fillOpacity: 0.6,
    lineWidth: 1,
    stroke: '#fff',
  },
  legend: {
    color: {
      position: 'bottom',
      layout: 'horizontal',
    },
    size: false,
  },
  axis: {
    x: {
      title: 'GDP',
      titleFill: '#333',
      labelFontSize: 12,
    },
    y: {
      title: '预期寿命',
      titleFill: '#333',
      labelFontSize: 12,
    },
  },
  tooltip: {
    title: (d) => d.country,
    items: [
      (d) => ({ name: 'GDP', value: d.GDP }),
      (d) => ({ name: '预期寿命', value: d.LifeExpectancy }),
      (d) => ({ name: '人口', value: d.Population }),
    ],
  },
});

chart.render();
```

这个示例展示了如何创建一个功能完整的鱼眼坐标系散点图，包括以下特性：

1. 设置适当的鱼眼焦点和畸变程度，突出显示关键区域
2. 使用多个数据维度（GDP、预期寿命、人口）创建散点图
3. 根据大洲设置点的颜色，使用人口大小设置点的大小
4. 自定义坐标轴和图例样式，提高可读性
5. 添加交互式提示信息，显示详细数据

## 与其他坐标系的组合

鱼眼坐标系变换可以与其他坐标系变换组合使用，例如与 transpose 变换组合：

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      { type: 'transpose' },
      {
        type: 'fisheye',
        focusX: 0.5,
        focusY: 0.5,
        distortionX: 2,
        distortionY: 2,
      },
    ],
  },
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();
```

## 总结

鱼眼坐标系是一种强大的可视化工具，特别适合处理密集数据和需要关注局部细节的场景。通过合理设置焦点位置和畸变程度，可以在保持全局视图的同时突出显示关键区域。结合交互功能，鱼眼效果可以提供更加灵活和直观的数据探索体验。

在实际应用中，建议根据数据分布和用户需求调整鱼眼参数，避免过度畸变导致的视觉失真。同时，考虑与其他坐标系变换和交互组件的组合，可以创建更加丰富和有效的可视化效果。
