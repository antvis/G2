---
title: continuous
order: 1
---

## 开始使用

使用离散数据绘制视图时采用的图例类型。

<img alt="continuous" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NgruQbickEAAAAAAAAAAAAAADmJ7AQ/original" height="50" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
  })
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .legend('y', {
    ribbonLen: 200,
    ribbonSize: 30,
    labelFormatter: (datum, index, data) => datum.people.toLocaleString(),
    type: 'size',
    color: [
      '#d0e3fa',
      '#acc7f6',
      '#8daaf2',
      '#6d8eea',
      '#4d73cd',
      '#325bb1',
      '#5a3e75',
      '#8c3c79',
      '#e23455',
      '#e7655b',
    ],
  });

chart.render();
```

## 选项

### 背景色带

连续数据的图例具有 4 种样式，分别为：

- 连续表示 `默认`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ds9pTqbi4OAAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 范围表示 `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kpDRTJVgkaEAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 尺寸表示 `type='size'`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uHJYTbVSebgAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 尺寸、范围表示 `type='size'` `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MahwS6sQocoAAAAAAAAAAAAADmJ7AQ/original" width="300" />

| 属性                | 描述                             | 类型                           | 默认值       |
| ------------------- | -------------------------------- | ------------------------------ | ------------ |
| orientation              | 色带朝向，横向及纵向             | `'horizontal'` \| `'vertical'` | 'horizontal' |
| color               | 色带颜色，为数组时会从中按序取色 | `string[]` \| `interpolate`    | -            |
| block               | 是否按区间显示                   | `boolean`                      | false        |
| type                | 连续图例类型                     | `'size'` \| `'color'`          | 'color'      |
| ribbonFill          | 色带颜色                         | `string`                       | -            |
| ribbonFillOpacity   | 色带透明度                       | `number`                       | -            |
| ribbonStroke        | 色带描边色                       | `string`                       | -            |
| ribbonStrokeOpacity | 色带描边色透明度                 | `number`                       | -            |

> color 插值器参考 [d3-interpolate](https://github.com/d3/d3-interpolate)

### 滑动窗口

滑动窗口标记了当前的值选取范围，通过与滑动窗口交互能够对视图中的值范围进行选择。

 <img alt="slider-window" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eAnbT6OFQlwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

| 属性                      | 描述                 | 类型                           | 默认值     |
| ------------------------- | -------------------- | ------------------------------ | ---------- |
| slidable                  | 窗口是否可以滑动     | `boolean`                      | true       |
| range                     | 默认选择范围         | `[number, number]`           | [min, max] |
| step                      | 单次滑动步长         | `number`                       | 1          |
| showHandle                | 是否显示滑动手柄     | `boolean`                      | true       |
| showHandleLabel           | 是否显示手柄文本     | `boolean`                      | true       |
| handleMarkerFill          | 手柄图标颜色         | `string`                       | -          |
| handleMarkerFillOpacity   | 手柄图标色透明度     | `number`                       | -          |
| handleMarkerStroke        | 手柄图标描边色       | `string`                       | -          |
| handleMarkerStrokeOpacity | 手柄图标描边色透明度 | `number`                       | -          |
| handleLabelFontSize       | 手柄文字大小         | `number` \| `Function<number>` | -          |
| handleLabelFontFamily     | 手柄文字字体         | `string` \| `Function<string>` | -          |
| handleLabelFontWeight     | 手柄字体粗细         | `number` \|`Function<number>`  | -          |
| handleLabelFill           | 手柄字体颜色         | `string`                       | -          |
| handleLabelFillOpacity    | 手柄文本透明度       | `number`                       | -          |
| handleLabelStroke         | 手柄文本描边色       | `string`                       | -          |
| handleLabelStrokeOpacity  | 手柄文本描边色透明度 | `number`                       | -          |
| handleFormatter           | 手柄文本格式化       | `(datum)=>string`              | -          |

### 刻度值

| 属性               | 描述                                                                  | 类型                            | 默认值     |
| ------------------ | --------------------------------------------------------------------- | ------------------------------- | ---------- |
| showLabel          | 是否显示刻度值                                                        | `boolean`                       | true`      |
| labelDirection     | 刻度值位于色带的位置，参考 axis `direction`                           | `'positive'` \| `'negative'`    | 'positive' |
| labelSpacing       | 刻度值到色带的间距                                                    | `number`                        | 5          |
| labelFormatter     | 刻度值格式化                                                          | `(datum, index, data)=>string`  | -          |
| labelFilter        | 刻度值过滤                                                            | `(datum, index, data)=>boolean` | -          |
| labelAlign         | 刻度值对齐位置<br/> - `'value'` 对齐到刻度<br/>- `'range'` 对齐到范围 | `'value'`\|`'range'`            | 'value'    |
| labelFontSize      | 刻度值文字大小                                                        | `number` \| `Function<number>`  | -          |
| labelFontFamily    | 刻度值文字字体                                                        | `string` \| `Function<string>`  | -          |
| labelFontWeight    | 刻度值字体粗细                                                        | `number` \| `Function<number>`  | -          |
| labelStroke        | 刻度值字体颜色                                                        | `string`                        | -          |
| labelStrokeOpacity | 刻度值文本透明度                                                      | `number`                        | -          |

<b>刻度值对齐方式</b>

- 对齐到刻度

 <img alt="align-tick" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vN1uQqWZ3K4AAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 对齐到范围

 <img alt="align-range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R_C4QJ5JxgMAAAAAAAAAAAAADmJ7AQ/original" width="300" />

### 指示器

指示器是在与连续图例交互过程中指示当前所在位置所表示值大小的提示组件。

<img alt="indicator" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NiI8Ta84y_MAAAAAAAAAAAAADmJ7AQ/original" height="50" />

| 属性                             | 描述                     | 类型                               | 默认值 |
| -------------------------------- | ------------------------ | ---------------------------------- | ------ |
| showIndicator                    | 是否显示值指示器         | `boolean`                          | true   |
| indicatorFormatter               | 值指示器格式化           | `(datum)=>string \| DisplayObject` | -      |
| indicatorLabelFontSize           | 值指示器文本文字大小     | `number` \| `Function<number>`     | -      |
| indicatorLabelFontFamily         | 值指示器文本文字字体     | `string` \| `Function<string>`     | -      |
| indicatorLabelFontWeight         | 值指示器文本字体粗细     | `number` \|`Function<number>`      | -      |
| indicatorLabelStroke             | 值指示器字体颜色         | `string`                           | -      |
| indicatorLabelStrokeOpacity      | 值指示器文本透明度       | `number`                           | -      |
| indicatorBackgroundFill          | 值指示器背景颜色         | `string`                           | -      |
| indicatorBackgroundFillOpacity   | 值指示器背景透明度       | `number`                           | -      |
| indicatorBackgroundStroke        | 值指示器背景描边色       | `string`                           | -      |
| indicatorBackgroundStrokeOpacity | 值指示器背景描边色透明度 | `number`                           | -      |

### 事件

| 事件类型    | 描述                       | 类型                                             |
| ----------- | -------------------------- | ------------------------------------------------ |
| valuechange | 滑动窗口选取范围改变时触发 | `(range: [number, number])=>void`                |
| indicate   | 指示器值改变时触发         | `(value: number, range: [number, number])=>void` |

## 基础选项

### 标题

<embed src="@/docs/api/common/componentTitle.zh.md"></embed>
