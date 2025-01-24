---
title: 滚动条（Scrollbar）
order: 7.3
---

G2 中**滚动条（Scrollbar）** 可以用于过滤数据，可以和 x 或者 y 通道绑定的，滚动条默认都是关闭的。

## 配置方式

滚动条可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的滚动条。如果标记对应的比例尺是同步的，那么滚动条也会合并。

```js
// Functional API
// 第一种方式
chart.interval().scrollbar('x', {}).scrollbar('y', {});

// Spec API
// 第二种方式
({
  type: 'interval',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

滚动条也可以在 View 层级配置。滚动条具有传递性。视图上声明的滚动条会传递给 `children` 声明的标记，如果该标记有对应通道的滚动条，就合并；否则不影响。

```js
// Functional API
// 第一种方式
chart.scrollbar('x', {}).scrollbar('y', {});

// Spec API
// 第二种方式
({
  type: 'view',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

滚动条（scrollbar）是一个交互组件，当显示区域大小不足以容纳全部信息时，可以将超出部分隐藏，并通过滚动条的垂直或横向滑动来显示出被隐藏部分。

## 何时使用

内容是否超出显示区域取决于内容的多少以及显示区域的尺寸，当需要显示的内容在纵向方向上超过显示区域的大小时，应当使用垂直滚动条以控制显示的部分，横向滚动条同理。

## 开始使用

<img alt="scrollbar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ompnRpW0vycAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  // 开启 X 轴方向上的滚动条
  .scrollbar('x', {});

chart.render();
```

## 选项

### 基本

| 属性                       | 描述                   | 类型                   | 默认值 |
| -------------------------- | ---------------------- | ---------------------- | ------ |
| ratio                      | 滚动条的比例             | `number`               | 0.5   |
| value                      | 滚动条的起始位置          | `[0, 1]`               | 0   |
| slidable                   | 是否可以拖动           | `boolean`              | true   |
| scrollable                 | 是否支持滚轮滚动       | `boolean`              | true   |
| `style.`isRound            | 滚动条样式是否为圆角   | `boolean`              | false  |
| `style.`padding            | 滚动条轨道内边距       | `number` \| `number[]` | 2      |
| `style.`thumbFill          | 滚动条滑块填充色       | `string`               | –      |
| `style.`thumbFillOpacity   | 滚动条滑块填充色透明度 | `number`               | –      |
| `style.`thumbStroke        | 滚动条滑块描边色       | `string`               | –      |
| `style.`thumbStrokeOpacity | 滚动条滑块描边色透明度 | `number`               | –      |
| `style.`trackSize          | 滚动条的轨道宽度       | `number`               | 10     |
| `style.`trackFill          | 滚动条轨道填充色       | `string`               | -      |
| `style.`trackFillOpacity   | 滚动条轨道填充色透明度 | `number`               | -      |
| `style.`trackStroke        | 滚动条轨道描边色       | `string`               | –      |
| `style.`trackStrokeOpacity | 滚动条轨道描边色透明度 | `number`               | –      |

### 事件

| 属性        | 描述                             | 类型          |
| ----------- | -------------------------------- | ------------- |
| valuechange | 发生滚动变化时触发，通过事件监听 | `function(e)` |

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  // 开启 X 轴缩略轴
  .scrollbar('x', {});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document.querySelector('.g2-scrollbar').addEventListener('valuechange', (evt) => {
    console.info(evt.detail);
  });
});

chart.render();
```
