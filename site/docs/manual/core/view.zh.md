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

| 配置项      | 说明                   | 类型         | 作用范围/继承关系         |
| ----------- | ---------------------- | ------------ | ------------------------ |
| data        | 数据源                 | array/object | view 及其所有 children   |
| encode      | 数据到视觉通道的映射   | object       | view 及其所有 children   |
| scale       | 视觉通道的比例尺       | object       | 可继承/覆盖（view/mark） |
| transform   | 数据变换               | array        | 可继承/覆盖（view/mark） |
| coordinate  | 坐标系配置             | object       | 可继承/覆盖（view/mark） |
| style       | 视图区域样式           | object       | 仅本 view                |
| axis        | 坐标轴配置             | object       | 可继承/覆盖（view/mark） |
| legend      | 图例配置               | object       | 可继承/覆盖（view/mark） |
| tooltip     | 提示框配置             | object       | 仅本 view                |
| interaction | 交互配置               | object       | 可继承/覆盖（view/mark） |
| theme       | 主题配置               | object       | 可继承/覆盖              |
| children    | 子标记（marks）或视图  | array        | 仅本 view                |

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
  children: [
    { type: 'interval', style: { fill: '#5B8FF9' } },
  ],
});
```

**API 方式：**

```js
chart.style('viewFill', '#e6f7ff').style('contentFill', '#f0f5ff');
```

---

## 视图与状态

视图中的每个标记都可以配置[状态（State）](/manual/core/state)，实现高亮、选中、禁用等交互反馈。状态样式可继承视图配置，也可在 mark 层级单独设置。

**示例：**

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    data: [
      { type: 'A', value: 30 },
      { type: 'B', value: 50 },
      { type: 'C', value: 20 },
    ],
    children: [
      {
        type: 'interval',
        encode: { x: 'type', y: 'value' },
        state: {
          active: { fill: 'red' },
          inactive: { fill: '#aaa' },
        },
        interaction: { elementHighlight: true },
      },
    ],
  });
  chart.render();
  return chart.getContainer();
})();
```

---

## 典型场景案例

### 1. 多图层叠加

在同一视图中叠加多种标记，实现多图层效果：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    data: [
      { type: 'A', value: 30 },
      { type: 'B', value: 50 },
      { type: 'C', value: 20 },
    ],
    encode: { x: 'type', y: 'value' },
    children: [
      { type: 'interval', style: { fill: '#5B8FF9' } },
      { type: 'line', style: { stroke: '#faad14', lineWidth: 2 } },
    ],
  });
  chart.render();
  return chart.getContainer();
})();
```

### 2. 分面视图

通过分面组件实现多视图布局，每个视图独立配置：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    data: [
      { type: 'A', value: 30 },
      { type: 'B', value: 50 },
      { type: 'C', value: 20 },
    ],
    encode: { x: 'type', y: 'value' },
    children: [
      { type: 'interval', style: { fill: '#5B8FF9' } },
      { type: 'line', style: { stroke: '#faad14', lineWidth: 2 } },
    ],
  });
  chart.render();
  return chart.getContainer();
})();
```

### 3. 局部交互与样式

每个视图可独立配置交互和样式，实现局部高亮、局部主题：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'spaceLayer',
    children: [
      {
        type: 'view',
        x: 300,
        width: 300,
        height: 600,
        data: [{ x: 'A', y: 10 }, { x: 'B', y: 20 }],
        axis: false,
        interaction: [{ type: 'elementHighlight' }],
        children: [
          {
            type: 'interval',
            encode: { x: 'x', y: 'y' },
            state: { active: { fill: 'red' } },
          },
        ],
      },
      {
        type: 'view',
        width: 300,
        height: 300,
        data: [{ x: 'A', y: 10 }, { x: 'B', y: 20 }],
        interaction: [{ type: 'elementHighlight' }],
        legend: false,
        children: [
          {
            type: 'interval',
            encode: { color: 'x', y: 'y' },
            transform: [{ type: "stackY" }],
            scale: { color: { palette: "cool", offset: (t) => t * 0.8 + 0.1 } },
            coordinate: { type: "theta" },
            state: { active: { lineWidth: 10 } },
          },
        ],
      },
    ],
  });
  chart.render();
  return chart.getContainer();
})();
```

---

## 进阶用法

### 1. 继承与覆盖

视图支持从父级（如复合视图、分面）继承 `scale`、`axis`、`legend`、`transform` 等配置，并可在本地覆盖：

```js
({
  type: 'facetRect',
  scale: { y: { nice: true } },
  axis: { y: { grid: true } },
  children: [
    {
      type: 'view',
      // 本地覆盖父级配置
      scale: { y: { nice: false } },
      axis: { y: { grid: false } },
      children: [
        { type: 'interval' },
      ],
    },
    {
      type: 'view',
      // 继承父级配置
      children: [
        { type: 'interval' },
      ],
    },
  ],
});
```

### 2. 视图嵌套与组合

支持多层嵌套视图，实现复杂布局：

```js
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'interval' }],
    },
    {
      type: 'view',
      children: [{ type: 'line' }],
    },
  ],
});
```

---


## 常见问题

- **视图样式未生效？**  
  检查样式属性是否设置在正确层级（视图 vs. 标记），并参考[样式文档](/manual/core/style)。

- **子标记未继承视图配置？**  
  `data`、`encode`、`scale`、`axis`、`legend`、`transform` 等在 view 层级配置后，会自动作用于所有 children（mark），mark 层级也可单独覆盖。

- **多视图交互冲突？**  
  建议为每个视图单独配置交互，避免全局交互影响所有视图。

- **复杂布局难以维护？**  
  推荐合理拆分视图，利用复合节点（如 `spaceFlex`、`facetRect`）组织结构。

