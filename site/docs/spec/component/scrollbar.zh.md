---
title: scrollbar
order: 1
---

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
