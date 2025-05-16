---
title: elementHighlight
order: 10
---

## 概述

`elementHighlight` 交互的对象是图表元素 element，当鼠标悬浮在元素上时，将该元素高亮显示。

- 触发：鼠标悬浮在元素上。

- 结束：鼠标移出元素。

- 影响状态：

悬浮的元素变为 `active` 状态。

其他元素变为 `inactive` 状态。

交互内置状态：

```js
({
  // active 状态下的元素为1px黑色边框
  state: { active: { lineWidth: '1', stroke: '#000' } },
});
```

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670296745624/element-highlight.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .state('active', { fill: 'orange' })
  .state('inactive', { opacity: 0.5 });

chart.interaction('elementHighlight', true);

chart.render();
```

## 使用方式

配置 `elementHighlight` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementHighlight: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'interval',
  interaction: { elementHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { elementHighlight: true },
});
```

## 配置项

元素高亮配置

| 属性       | 描述             | 类型      | 默认值 |
| ---------- | ---------------- | --------- | ------ |
| background | 是否高亮背景     | `boolean` | false  |
| region     | 空白区域是否触发 | `boolean` | false  |

元素高亮样式，详见示例[自定义高亮](#自定义高亮)

| 属性                      | 描述           | 类型         | 默认值 |
| ------------------------- | -------------- | ------------ | ------ |
| offset                    | 主方向的偏移量 | `number`     | 0      |
| `background${StyleAttrs}` | 背景的样式     | `StyleAttrs` | -      |

## 事件

### 监听事件

支持以下的事件：

- `element:highlight` - 元素高亮时触发
- `element:unhighlight` - 元素取消高亮时触发

```js
chart.on('element:highlight', (e) => {
  console.log(e.data.data);
  console.log(e.data.group);
  console.log(e.nativeEvent);
});

chart.on('element:unhighlight', (e) => {
  console.log(e.nativeEvent);
});
```

### 触发交互

支持以下的事件：

- `element:highlight` - 高亮数据
- `element:unhighlight` - 取消高亮

```js
chart.emit('element:highlight', {
  data: { data: { population: 5038433 } },
});

chart.emit('element:unhighlight', {});
```

## 示例

### 基础高亮

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'interval',
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency' },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    axis: { y: { labelFormatter: '.0%' } },
    interaction: { elementHighlight: { background: true, region: true } },
  });

  chart.render();

  return chart.getContainer();
})();
```

### 自定义高亮

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'interval',
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency' },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    axis: { y: { labelFormatter: '.0%' } },
    state: {
      active: {
        backgroundFill: (d) => (d.frequency > 0.1 ? 'red' : '#000'),
        backgroundFillOpacity: 0.6,
        backgroundRadius: 10,
        offset: 10,
        fill: 'green',
      },
    },
    interaction: {
      elementHighlight: {
        background: true,
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```
