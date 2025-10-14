---
title: sliderWheel
order: 22
---

## 概述

`sliderWheel` 交互的对象是数据域，通过鼠标滚轮或触控板手势来控制缩略轴的选择范围。它允许用户通过滚轮操作来动态调整选区的大小，从而实现数据范围的快速缩放操作。

- 触发：在图表区域内使用鼠标滚轮或触控板滚动
- 结束：停止滚轮操作
- 影响：放大缩小选区范围，保持选区中心位置不变

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*S6UaT7Wy45cAAAAAgCAAAAgAemJ7AQ/original" width="640">

## 使用方式

配置 `sliderWheel` 交互需要首先确保图表有缩略轴组件，然后在 interaction 中配置：

```js
({
  slider: {
    x: true, // 启用 X 轴缩略轴
    y: true, // 启用 Y 轴缩略轴
  },
  interaction: {
    sliderWheel: true, // 采取默认配置项
  },
});
```

也可以传入配置项进行自定义：

```js
({
  slider: {
    x: true,
  },
  interaction: {
    sliderWheel: {
      wheelSensitivity: 0.1,
      minRange: 0.05,
      x: true,
      y: 'shift', // 仅在按住 Shift 键时触发 sliderWheel 交互
    },
  },
});
```

## 配置层级

交互可以配置在 View 层级：

```js
({
  type: 'view',
  slider: { x: true, y: true },
  interaction: { sliderWheel: true },
});
```

## 配置项

| 属性             | 描述                     | 类型                        | 默认值                                             | 必选 |
| :--------------- | :----------------------- | :-------------------------- | :------------------------------------------------- | :--- |
| setValue         | 设置缩略轴值的自定义函数 | (component, values) => void | (component, values) => component.setValues(values) |      |
| minRange         | 最小缩放范围             | number                      | 0.01                                               |      |
| wheelSensitivity | 滚轮缩放灵敏度           | number                      | 0.05                                               |      |
| x                | X 轴滚轮交互响应模式     | SliderDirection             | true                                               |      |
| y                | Y 轴滚轮交互响应模式     | SliderDirection             | true                                               |      |

### 复杂类型说明

#### SliderDirection

`SliderDirection` 类型定义了滚轮交互的响应模式：

```typescript
type SliderDirection = true | false | 'shift' | 'ctrl' | 'alt';
```

- `true`：始终响应滚轮操作
- `false`：不响应滚轮操作
- `'shift'`：仅在按住 Shift 键时响应
- `'ctrl'`：仅在按住 Ctrl 键时响应
- `'alt'`：仅在按住 Alt 键时响应

这个配置允许您为不同轴设置不同的触发条件，避免意外的缩放操作。

#### minRange

`minRange` 参数控制缩略轴选区可以缩放到的最小范围，取值范围为 0.000001 到 1。当选区达到最小范围时，继续向内滚动将不会产生更多缩放效果。

#### wheelSensitivity

`wheelSensitivity` 参数控制滚轮缩放的灵敏度。较小的值使缩放更加精细，较大的值使缩放更加快速。系统会根据当前选区大小自动调整实际灵敏度，确保在不同缩放级别下都有良好的操作体验。

## 工作原理

### 自适应灵敏度

滚轮交互采用了自适应灵敏度机制，确保在不同缩放级别下都有合适的操作体验：

- **大范围选区**：滚轮操作产生较大的缩放变化，便于快速调整
- **小范围选区**：滚轮操作产生较小的缩放变化，便于精细调节

## 事件

### 触发事件

滚轮缩放操作会触发缩略轴的 `valuechange` 事件，这与手动拖拽缩略轴手柄产生的事件相同：

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;

  document.querySelector('.slider').addEventListener('valuechange', (evt) => {
    console.log('值变化:', evt.detail.value);
  });
});
```

## 示例

### 基础滚轮缩放

下面的示例展示了如何在折线图上启用基础的滚轮缩放功能：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', y1: 0.000001 },
  slider: { x: true },
  interaction: {
    sliderWheel: true, // 启用滚轮缩放
  },
});

chart.render();
```

### 自定义滚轮灵敏度

这个示例展示了如何调整滚轮的缩放灵敏度和最小范围：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close', color: 'symbol' },
  slider: {
    x: { values: [0.2, 0.8] },
  },
  interaction: {
    sliderFilter: true,
    sliderWheel: {
      wheelSensitivity: 0.1, // 降低滚轮灵敏度，使缩放更精细
      minRange: 0.05, // 设置最小缩放范围为 5%
    },
  },
});

chart.render();
```

### 修饰键控制

这个示例展示了如何使用修饰键来控制不同轴的滚轮响应：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 生成示例数据
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 10) * 50 + 100 + Math.random() * 20,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
  });
}

chart.options({
  type: 'point',
  autoFit: true,
  height: 300,
  data,
  encode: { x: 'x', y: 'y', color: 'category' },
  slider: {
    x: { values: [0.3, 0.7] },
    y: {},
  },
  interaction: {
    sliderFilter: true,
    sliderWheel: {
      x: true, // X 轴始终响应滚轮
      y: 'shift', // Y 轴仅在按住 Shift 键时响应滚轮
      wheelSensitivity: 0.08,
    },
  },
});

chart.render();
```

### 高精度缩放

这个示例展示了如何配置高精度的滚轮缩放，适合需要精细操作的场景：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 生成高密度数据
const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    time: i,
    value: Math.sin(i / 50) * 30 + 50 + Math.random() * 5,
  });
}

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data,
  encode: { x: 'time', y: 'value' },
  slider: {
    x: {
      values: [0.45, 0.55], // 初始选择一个小范围
      labelFormatter: (d) => `时间: ${Math.round(d)}`,
    },
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter', // 启用自适应过滤
    },
    sliderWheel: {
      wheelSensitivity: 0.02, // 非常低的灵敏度，便于精细操作
      minRange: 0.001, // 允许缩放到非常小的范围
    },
  },
  style: {
    lineWidth: 1.5,
  },
});

chart.render();
```

### 密集气泡图缩放

这个示例展示了如何在包含大量数据点的气泡图中使用双轴滚轮缩放，通过滚轮可以精确探索数据的不同区域：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 生成密集气泡数据（模拟 3 个系列，每个系列 500 个数据点）
const random = (max) => +(Math.random() * max).toFixed(3);
const data = [];

for (let i = 0; i < 500; i++) {
  data.push({
    x: random(15),
    y: random(10),
    size: random(1),
    category: 'scatter1',
  });
  data.push({
    x: random(10),
    y: random(10),
    size: random(1),
    category: 'scatter2',
  });
  data.push({
    x: random(15),
    y: random(10),
    size: random(1),
    category: 'scatter3',
  });
}

chart.options({
  type: 'point',
  autoFit: true,
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'size',
    color: 'category',
    shape: 'point',
  },
  scale: {
    size: { range: [4, 40] },
  },
  style: {
    fillOpacity: 0.8,
  },
  legend: {
    color: {
      position: 'top',
    },
    size: false,
  },
  slider: {
    x: {},
    y: {},
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter', // 启用自适应过滤
    },
    sliderWheel: {
      x: true, // X 轴：直接滚动
      y: 'shift', // Y 轴：按住 Shift 键滚动
      wheelSensitivity: 0.08,
      minRange: 0.001,
    },
    tooltip: {
      body: false, // 数据量大时简化 tooltip
    },
  },
});

chart.render();
```
