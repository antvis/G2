---
title: connector
order: 27
---

## 概述

`Connector` 组件用于绘制连接线，可以在两个点之间创建带有路径的连接器。它主要用于流程图、关系图、桑基图等需要展示元素间连接关系的可视化场景。

连接器的路径通常包含以下几个关键点：

- **起点（Source）**：连接的起始位置
- **终点（Target）**：连接的结束位置
- **中间点**：根据偏移量和连接长度计算的路径转折点
- **端点标记**：可选的箭头或标记符号

### 路径计算逻辑

### 直角坐标系

在标准的直角坐标系中，连接器会创建一个 L 型路径：

```
  起点
    ───┐
       │
       │(中间段)
       │
       └── 终点 →

```

### 转置坐标系

在转置坐标系中，路径会相应调整：

```
起点
 │
 │ (中间段)
 │
 └─────── 终点 →
```

## 配置项

| 属性           | 描述                                    | 类型                              | 默认值    | 必选 |
| -------------- | --------------------------------------- | --------------------------------- | --------- | ---- |
| offsetX        | 统一的 X 轴偏移量，同时作用于起点和终点 | `number`                          | `0`       |      |
| offsetY        | 统一的 Y 轴偏移量，同时作用于起点和终点 | `number`                          | `0`       |      |
| sourceOffsetX  | 起点的 X 轴偏移量                       | `number`                          | `offsetX` |      |
| sourceOffsetY  | 起点的 Y 轴偏移量                       | `number`                          | `offsetY` |      |
| targetOffsetX  | 终点的 X 轴偏移量                       | `number`                          | `offsetX` |      |
| targetOffsetY  | 终点的 Y 轴偏移量                       | `number`                          | `offsetY` |      |
| connectLength1 | 连接器的中间段长度                      | `number`                          | -         |      |
| endMarker      | 是否显示端点标记（箭头）                | `boolean`                         | `true`    |      |
| style          | 连接器的样式配置                        | [ConnectorPathStyleProps](#style) | -         |      |

### style

连接器支持所有 Path 元素的样式属性，以及端点标记的样式配置。

| 属性            | 描述                       | 类型                   | 默认值   |
| --------------- | -------------------------- | ---------------------- | -------- |
| stroke          | 连接线的颜色               | `string`               | -        |
| strokeWidth     | 连接线的宽度               | `number`               | `1`      |
| strokeOpacity   | 连接线的透明度             | `number`               | `1`      |
| strokeDasharray | 虚线样式                   | `string` \| `number[]` | -        |
| fill            | 填充色（通常用于封闭路径） | `string`               | `'none'` |
| endMarkerSize   | 端点标记的大小             | `number`               | -        |
| endMarkerFill   | 端点标记的填充色           | `string`               | -        |
| endMarkerStroke | 端点标记的描边色           | `string`               | -        |

## 使用示例

### 基础连接器

使用 connector 标记可以创建基础连接线，连接两个数据点。

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'connector',
  data: [
    { source: 'A', target: 'B', x1: 100, y1: 100, x2: 300, y2: 200 },
    { source: 'B', target: 'C', x1: 300, y1: 200, x2: 500, y2: 150 },
    { source: 'C', target: 'D', x1: 500, y1: 150, x2: 400, y2: 300 },
  ],
  encode: {
    x: ['x1', 'x2'],
    y: ['y1', 'y2'],
    color: 'source',
  },
  style: {
    stroke: '#1890ff',
    strokeWidth: 2,
    endMarker: true,
  },
  legend: false,
});

chart.render();
```

### 组合使用

连接器通常和其他 mark 一起使用：

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

// 原始数据
const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: 'Other', value: 5 },
];

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: data,
      encode: {
        x: 'type',
        y: 'value',
        color: 'type',
      },
    },
    {
      type: 'connector',
      data: [
        {
          source: '分类一',
          target: '分类三',
          x1: '分类一',
          x2: '分类三',
          y1: 27,
          y2: 18,
        },
      ],
      encode: {
        x: ['x1', 'x2'],
        y: ['y1', 'y2'],
      },
      style: {
        stroke: 'orange',
        strokeWidth: 2,
        sourceOffsetX: 15,
        targetOffsetX: -20,
      },
      legend: false,
    },
  ],
});

chart.render();
```

## 高级用法

### 响应式连接器

```js
// 根据数据动态调整连接器样式
const connector = new Connector({
  stroke: (d) => (d.type === 'important' ? '#ff4d4f' : '#1890ff'),
  strokeWidth: (d) => d.weight || 1,
  connectLength1: (d) => d.distance || 20,
});
```

### 动画连接器

```js
// 带动画效果的连接器
const connector = new Connector({
  stroke: '#1890ff',
  strokeWidth: 2,
  defaultEnterAnimation: 'growIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
});
```

## 注意事项

1. **坐标系兼容性**：当前版本主要支持直角坐标系，极坐标系的支持正在开发中
2. **性能优化**：对于大量连接器的场景，建议使用批量渲染或虚拟化技术
3. **路径计算**：复杂的路径可能需要自定义 `connectorPath` 属性
4. **端点标记**：默认的端点标记是箭头形状，可通过样式配置修改
