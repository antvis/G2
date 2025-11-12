---
title: sliderFilter
order: 21
---

## 概述

`sliderFilter`交互的对象是数据域，通过缩略轴过滤显示的数据范围。它允许用户通过拖拽缩略轴手柄或者选区来动态调整可视化图表中显示的数据范围，从而实现数据的交互式筛选。

- 触发：拖动缩略轴手柄、选区
- 结束：释放手柄、选区
- 影响：更新图表显示的数据范围

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nNa7R6quqkwAAAAAAAAAAAAADmJ7AQ/original" width="640">

## 使用方式

配置 `sliderFilter` 交互有两种方式：
第一种，通过配置 slider 组件自动启用缩略轴筛选交互：

```js
({
  slider: {
    x: true,
    y: true,
  },
});
```

第二种，直接在 interaction 中配置：

```js
({
  slider: {
    x: true,
  },
  interaction: {
    sliderFilter: true, //采取默认配置项
  },
});
```

## 配置层级

交互可以配置在 View 层级：

```js
({
  type: 'view',
  slider: { x: true, y: true },
  interaction: { sliderFilter: true },
});
```

## 配置项

| 属性          | 描述                             | 类型                                         | 默认值                                             | 必选 |
| :------------ | :------------------------------- | :------------------------------------------- | :------------------------------------------------- | :--- |
| initDomain    | 初始化坐标轴范围                 | { x: [number, number], y: [number, number] } | {}                                                 |      |
| setValue      | 设置缩略轴值的自定义函数           | (component, values) => void                  | (component, values) => component.setValues(values) |      |
| hasState      | 是否保存缩略轴比例状态             | boolean                                      | false                                              |      |
| wait          | 节流等待时间(毫秒)               | number                                       | 50                                                 |      |
| leading       | 节流时是否在开始前执行           | boolean                                      | true                                               |      |
| trailing      | 节流时是否在结束后执行           | boolean                                      | false                                              |      |
| adaptiveMode  | 自适应过滤模式                   | 'filter' \| false \| null                    | 'filter'                                           |      |
| getInitValues | 获取缩略轴初始值的函数             | (slider) => [number, number]                 | undefined                                          |

### slider 组件配置

除了与 sliderFilter 交互的配置外，slider 组件本身也有一些重要的配置项，这些配置会影响缩略轴筛选的行为：

| 属性     | 描述                                 | 类型               | 默认值 | 必选 |
| -------- | ------------------------------------ | ------------------ | ------ | ---- |
| padding  | 缩略轴内边距                         | number \| number[] | -      |      |
| values   | 缩略轴初始选区范围，位于 0 ～ 1 区间 | [number, number]   | -      |      |
| slidable | 是否允许拖动选取和手柄               | boolean            | true   |      |

具体文档看[缩略轴 Slider](https://g2.antv.antgroup.com/manual/component/slider)

### 自适应过滤模式

`adaptiveMode` 配置项控制缩略轴的自适应过滤行为：

- `'filter'`：启用自适应过滤，根据选定数据范围动态调整其他轴的域值（**默认值**）
- `false` 或 `null`：禁用自适应过滤

**自适应过滤的工作原理：**

- **单轴自适应**：当只有 X 轴或只有 Y 轴配置了缩略轴时，拖拽缩略轴会根据当前选择的数据范围自动调整另一个轴的显示范围
- **多轴自适应**：当图表中存在独立的坐标轴时，系统会根据缩略轴的配置层级采用不同的自适应策略
- **双向互斥**：如果 X 轴与 Y 轴都配置了缩略轴，自适应功能将不会生效

```js
({
  slider: {
    x: { values: [0.1, 0.8] }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // 启用自适应过滤（默认值）
      // adaptiveMode: false   // 禁用自适应过滤
    }
  }
})
```

## 事件

### 触发事件

缩略轴筛选交互支持以下事件：

- `sliderX:filter` - 触发 X 轴过滤
- `sliderY:filter` - 触发 Y 轴过滤

```js
chart.emit('sliderX:filter', {
  data: { selection: [['2001-01', '2001-03'], undefined] },
});

chart.emit('sliderY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

### 监听数据

- `sliderX:filter` - X 轴缩略轴过滤事件
- `sliderY:filter` - Y 轴缩略轴过滤事件

```js
chart.on('sliderX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderX:filter', data.selection);
});

chart.on('sliderY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('sliderY:filter', data.selection);
});
```

## 示例

### 基础缩略轴筛选

下面的示例展示了如何在折线图上添加基础的 X 轴缩略轴筛选功能：

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
    sliderFilter: {
      wait: 100,
      leading: false,
      tariling: true,
    },
  },
});

chart.render();
```

### 自适应过滤示例

#### 单轴自适应过滤

当只配置 X 轴缩略轴时，拖拽 X 轴缩略轴会自动调整 Y 轴的显示范围：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 生成有趣的数据，包含一些异常值
const data = [];
for (let i = 0; i < 50; i++) {
  const baseValue = Math.sin(i / 8) * 30 + 50;
  // 在特定区间添加异常高值
  const anomaly = (i >= 20 && i <= 25) ? Math.random() * 150 : 0;
  data.push({
    time: i,
    value: baseValue + anomaly + Math.random() * 10,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
  });
}

chart.options({
  type: 'point',
  data,
  encode: { x: 'time', y: 'value', color: 'category' },
  slider: {
    x: {
      values: [0.2, 0.8],
      labelFormatter: (d) => `时间: ${Math.round(d)}`
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // 启用自适应过滤
    }
  },
  style: {
    fillOpacity: 0.8
  }
});

chart.render();
```

#### Y 轴自适应过滤

当只配置 Y 轴缩略轴时，拖拽 Y 轴缩略轴会自动调整 X 轴的显示范围：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv'
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    y: {
      values: [0.1, 0.9],
      labelFormatter: (d) => `价格: ${Math.round(d)}`
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // 启用自适应过滤
    }
  }
});

chart.render();
```

#### 禁用自适应过滤

如果不需要自适应功能，可以显式关闭：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 10) * 50 + 100 + Math.random() * 20
  });
}

chart.options({
  type: 'line',
  data,
  encode: { x: 'x', y: 'y' },
  slider: {
    x: {
      values: [0.3, 0.7]
    }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: false  // 禁用自适应过滤
    }
  },
  scale: {
    y: { domain: [0, 200] }  // 固定 Y 轴范围
  }
});

chart.render();
```
