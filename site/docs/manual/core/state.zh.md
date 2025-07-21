---
title: 状态管理（State）
order: 11
---

在数据可视化中，**状态（State）** 是实现交互反馈、高亮、选中等效果的核心机制。G2 提供了灵活且强大的状态系统，允许开发者为图表中的每个标记（mark）配置不同的状态样式，实现如鼠标悬停高亮、点击选中等多种交互场景，极大提升了图表的可用性和表现力。

状态样式的属性与 [@antv/g](https://github.com/antvis/g) 支持的样式属性一致，常见如 `fill`（填充色）、`stroke`（描边色）、`strokeWidth`（描边宽度）、`opacity`（透明度）等，详见[样式（Style）](/manual/core/style)。


## 适用场景

- 鼠标悬停高亮数据
- 点击选中/取消选中数据
- 多维度交互反馈（如 hover+select 叠加）
- 结合动画实现状态切换的动态效果


## 配置层级

**重要提示：State 配置的传播机制**

在 G2 中，state 配置的传播遵循以下规则：

### 单个 Mark 的情况

当 view 下只有一个 mark 时，在 view 层级配置 state **会生效**，state 会自动传播到子 mark：

```js
// ✅ 单个 mark 时，view 层级的 state 配置会生效
chart.options({
  type: 'view',
  state: { active: { backgroundFill: 'red', backgroundOpacity: 0.5 } }, // 会传播到子 mark
  children: [
    { type: 'line' }, // 会继承 view 的 state 配置
  ],
});
```

### 多个 Mark 的情况

当 view 下有多个 mark 时，view 层级的 state **不会生效**，需要在每个 mark 中单独配置：

```js
// ❌ 多个 mark 时，view 层级的 state 不会传播
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // 这个配置不会传播到子 mark
  children: [{ type: 'line' }, { type: 'point' }],
});

// ✅ 正确：在每个 mark 层级单独配置 state
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      state: { active: { stroke: 'red', strokeWidth: 2 } },
    },
    {
      type: 'point',
      state: { active: { fill: 'red', r: 6 } },
    },
  ],
});
```

### 直接在 Mark 层级配置

当直接使用 mark API（如 `chart.line()`）时，state 配置在 mark 层级生效：

```js
// ✅ 直接在 mark 层级配置
chart.options({
  type: 'line',
  state: { active: { stroke: 'red', strokeWidth: 2 } },
});
```

## 配置项

G2 支持在 mark 层级通过 `state` 字段配置不同状态下的样式。常用状态包括：

| 状态名     | 说明           | 典型场景           |
| ---------- | -------------- | ------------------ |
| active     | 高亮时的样式   | 鼠标悬停           |
| inactive   | 非高亮时的样式 | 其他未被高亮的元素 |
| selected   | 选中时的样式   | 鼠标点击           |
| unselected | 未选中时的样式 | 其他未被选中的元素 |


### 配置方式

#### 1. 配置式写法（推荐）

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const state = {
  selected: { fill: 'red' },
  active: { fill: 'green', stroke: 'black', lineWidth: 1 },
};
chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
    inactive: { fill: '#aaa' },
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#eee' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});
chart.render();
```

#### 2. 动态样式（支持函数）

状态样式属性支持函数，根据数据动态返回样式：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: {
      fill: (d) => (d.value > 40 ? 'red' : 'blue'),
    },
  },
  interaction: { elementHighlight: true },
});

chart.render();
```

## 状态交互与优先级机制

G2 支持**多个状态同时生效**，当同一属性被多个状态配置时，会按照优先级选择最终生效的样式。

优先级如下：

```
selected:   3
unselected: 3
active:     2
inactive:   2
default:    1
```

- `selected`/`unselected` 优先级高，常用于点击选中
- `active`/`inactive` 次之，常用于悬停高亮
- `default` 为默认样式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    selected: { fill: 'red' },
    active: { fill: 'green', stroke: 'black', lineWidth: 1 },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

- 悬停时，`active` 状态生效，显示绿色和黑色描边
- 点击后，`selected` 和 `active` 同时生效，但 `selected` 优先级更高，最终填充色为红色


## 常用交互与状态联动

G2 提供了丰富的交互，配合状态样式可实现多种交互效果：

| 名称                    | 说明         | 典型状态            |
| ----------------------- | ------------ | ------------------- |
| brushAxisHighlight      | 轴刷选高亮   | active/inactive     |
| brushHighlight          | 区域刷选高亮 | active/inactive     |
| brushXHighlight         | X 轴刷选高亮 | active/inactive     |
| brushYHighlight         | Y 轴刷选高亮 | active/inactive     |
| elementHighlight        | 悬停高亮     | active/inactive     |
| elementHighlightByColor | 按颜色高亮   | active/inactive     |
| elementHighlightByX     | 按 X 高亮    | active/inactive     |
| legendHighlight         | 图例高亮     | active/inactive     |
| elementSelect           | 点击选中     | selected/unselected |
| elementSelectByColor    | 按颜色选中   | selected/unselected |
| elementSelectByX        | 按 X 选中    | selected/unselected |


## 典型场景案例

### 1. 高亮交互（elementHighlight）

通过 `elementHighlight` 交互插件，配合 `active` 和 `inactive` 状态样式，实现鼠标悬停高亮效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    active: { fill: 'red' },
    inactive: { fill: '#aaa' },
  },
  interaction: { elementHighlight: true },
});

chart.render();
```

**效果说明**：

- 鼠标悬停在某个柱子上时，该柱子应用 `active` 样式，其他柱子应用 `inactive` 样式。


### 2. 选择交互（elementSelect）

通过 `elementSelect` 交互插件，配合 `selected` 和 `unselected` 状态样式，实现点击选中效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#eee' },
  },
  interaction: { elementSelect: true },
});
chart.render();
```

**效果说明**：

- 点击某个柱子，该柱子应用 `selected` 样式，其他柱子应用 `unselected` 样式。


### 3. 多状态叠加（高亮+选中）

支持同时高亮与选中，常用于仪表盘、BI 报表等场景：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: { fill: 'yellow' },
    inactive: { fill: '#eee' },
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#ccc' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```


### 4. 状态与动画联动

状态切换时可结合动画（如淡入淡出、缩放等），提升交互体验。详见[动画系统](./animate/overview.zh.md)。

```js
chart.options({
  type: 'interval',
  state: {
    active: {
      fill: 'red',
      opacity: (d) => (d.value > 40 ? 1 : 0.5),
    },
  },
  // 其他配置...
});
```


## 进阶用法

### 1. 状态样式动态计算

支持将样式属性设置为函数，根据数据动态返回样式：

```js
chart.options({
  type: 'interval',
  state: {
    active: {
      fill: (d) => (d.value > 40 ? 'red' : 'blue'),
    },
  },
  // 其他配置...
});
```


## 常见问题

- **状态样式未生效？**  
  检查是否正确配置了交互插件（如 `elementHighlight`、`elementSelect`），并确保 `state` 配置正确。

- **多个状态冲突？**  
  合理利用优先级机制，避免同一属性在多个高优先级状态下重复配置。
- **状态样式与动画冲突？**  
  注意状态切换时动画的配置，避免样式和动画叠加导致的视觉异常。
