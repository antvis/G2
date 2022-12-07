---
title: slider
order: 1
---

缩略轴（slider）是一种辅助看数据的组件，它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。

## 何时使用

缩略轴是值域数据的浓缩，它跟位置通道 `x`, `y` 对应的比例尺的类型息息相关。一般来说时间类型上使用缩略轴的频率高，连续轴使用缩略轴频次低、分类轴几乎不会使用到缩略轴。

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205075894-09f6b3a7-8cec-4953-af1a-2c466999f598.png" width="600" />

- 时间轴，数据跨度非常大，【高频使用】，比如一组时序数据跨度 10 年，需观察这期间数据变化趋势时，建议开启缩略轴；
- 时间轴，数据密度很高，【高频使用】，比如分钟级更新的实时数据，当需要查看一天内的数据走势时，建议开启缩略轴；
- 连续轴，数据密度很高，【低频使用】比如查看 1-100 岁平均身高分布，开启缩略轴可以全局查看身高分布；
- 分类轴【不建议使用】。

## 开始使用

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205065555-8ef69242-ae35-4a9b-b7db-f380e82fd544.png" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
  // 开启 X 方向缩略轴
  .slider('x', {});

chart.render();
```

## 选项

| 属性                     | 描述                           | 类型            | 默认值 |
| ------------------------ | ------------------------------ | --------------- | ------ |
| values                   | 默认起始、结束位置             | [number,number] | [0, 1] |
| selectionFill            | 缩略轴选区填充色               | string          |        |
| selectionFillOpacity     | 缩略轴选区填充色透明度         | number          |        |
| selectionStroke          | 缩略轴选区描边色               | string          |        |
| selectionStrokeOpacity   | 缩略轴选区描边色透明度         | number          |        |
| backgroundFill           | 缩略轴背景填充色               | string          |        |
| backgroundFillOpacity    | 缩略轴背景填充色透明度         | number          |        |
| backgroundStroke         | 缩略轴背景描边色               | string          |        |
| backgroundStrokeOpacity  | 缩略轴背景描边色透明度         | number          |        |
| handleIconSize           | 缩略轴手柄大小                 | number          | 10     |
| handleIconFill           | 缩略轴手柄填充色               | string          |        |
| handleIconFillOpacity    | 缩略轴手柄填充色透明度         | number          |        |
| handleIconStroke         | 缩略轴手柄描边色               | string          |        |
| handleIconStrokeOpacity  | 缩略轴手柄描边色透明度         | number          |        |
| handleLabelFontSize      | 缩略轴手柄标签字体大小         | number          |        |
| handleLabelFontWeight    | 缩略轴手柄标签字体权重高       | number\|string  |        |
| handleLabelFill          | 缩略轴手柄标签字体填充色       | string          |        |
| handleLabelFillOpacity   | 缩略轴手柄标签字体填充色透明   | number          |        |
| handleLabelStroke        | 缩略轴手柄标签字体描边色       | string          |        |
| handleLabelStrokeOpacity | 缩略轴手柄标签字体描边色透明度 | number          |        |

<!--                     | size                           | 缩略轴大小。横向上代表高度，纵向上代表宽度 | number   |     | -->

## 事件

TODO
