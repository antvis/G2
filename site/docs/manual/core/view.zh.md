---
title: 视图（View）
order: 3
---

## 概述

在 G2 中，**视图（View）** 是图表的核心组成单元，用于承载和组织多个标记（Mark），并统一管理数据、坐标系、交互、样式等。每个视图拥有独立的数据、坐标系和交互配置，是应用交互和样式的最小单位。通过合理拆分视图，可以实现多图层、分面、嵌套等复杂可视化布局。

视图不仅支持灵活的数据和编码配置，还能继承和覆盖父级（如复合视图、分面等）传递的配置，实现灵活的组合与复用。

---

## 适用场景

- 单一图表（如柱状图、折线图等）的基础绘制
- 多图层叠加（如柱状图+折线图、点图+热力图等）
- 分面（Facet）、小 multiples、仪表盘等复合布局
- 局部交互、局部样式、局部数据的独立管理
- 主题、动画、状态等高级特性分区应用

---

## 配置项

视图支持丰富的配置项，涵盖数据、编码、坐标、样式、交互等各个方面。其配置项与顶层 Chart 基本一致，常用如下：

| 配置项      | 说明                  | 类型         | 作用范围/继承关系        |
| ----------- | --------------------- | ------------ | ------------------------ |
| data        | 数据源                | array/object | view 及其所有 children   |
| encode      | 数据到视觉通道的映射  | object       | view 及其所有 children   |
| scale       | 视觉通道的比例尺      | object       | 可继承/覆盖（view/mark） |
| transform   | 数据变换              | array        | 可继承/覆盖（view/mark） |
| coordinate  | 坐标系配置            | object       | 可继承/覆盖（view/mark） |
| style       | 视图区域样式          | object       | 仅本 view                |
| axis        | 坐标轴配置            | object       | 可继承/覆盖（view/mark） |
| legend      | 图例配置              | object       | 可继承/覆盖（view/mark） |
| tooltip     | 提示框配置            | object       | 仅本 view                |
| interaction | 交互配置              | object       | 可继承/覆盖（view/mark） |
| theme       | 主题配置              | object       | 可继承/覆盖              |
| children    | 子标记（marks）或视图 | array        | 仅本 view                |

**说明：**

- `data`、`encode`、`scale`、`axis`、`legend`、`transform`、`coordinate`、`interaction` 等配置在 view 层级设置后，会自动作用于所有 children（mark），mark 层级也可单独覆盖。
- 其他如 `style`、`tooltip` 仅作用于当前 view。
  **完整配置示例：**

```js
({
  type: 'view',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  scale: { y: { nice: true } },
  coordinate: { type: 'rect' },
  style: { viewFill: '#f5f5f5' },
  axis: { y: { grid: true } },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: { field: 'type' },
    items: [{ field: 'value' }],
  },
  interaction: { elementHighlight: true },
  theme: { color: ['#5B8FF9', '#5AD8A6', '#5D7092'] },
  children: [
    { type: 'interval' },
    { type: 'line', style: { stroke: '#faad14' } },
  ],
});
```

---

## 配置方式

### 1. 配置式声明

直接在 options 中声明视图及其子元素：

```js
({
  type: 'view',
  data: [...],
  encode: {...},
  children: [
    { type: 'interval', encode: {...} },
    { type: 'line', encode: {...} },
  ],
});
```

### 2. API 链式调用

通过 API 创建视图并添加标记：

```js
const chart = new G2.Chart();
const view = chart.view({ data: [...] });
view.interval().encode('x', 'type').encode('y', 'value');
view.line().encode('x', 'type').encode('y', 'value');
chart.render();
```

### 3. 复合视图与分面

视图可作为复合节点（如分面、空间布局）的子节点：

```js
const facet = chart.facetRect();
facet.view().interval().encode('x', 'type').encode('y', 'value');
facet.view().line().encode('x', 'type').encode('y', 'value');
```

---

## 视图与样式

视图支持设置自身区域的样式（如背景色、边框等），并可对子标记进行统一样式管理。详见[样式（Style）](/manual/core/style)。

```js
({
  type: 'view',
  style: {
    viewFill: '#e6f7ff',
    plotFill: '#fffbe6',
    mainFill: '#fff',
    contentFill: '#f0f5ff',
  },
  children: [{ type: 'interval', style: { fill: '#5B8FF9' } }],
});
```
