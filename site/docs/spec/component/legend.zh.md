---
title: legend
order: 1
---

G2 提供了两种图例类型：分类图例（Category Legend）和连续图例（Continuous Legend），分别用于展示分类数据和连续数据。

## 分类图例

使用离散数据绘制视图时采用的图例类型。

<img alt="category" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OexAQb2tdMAAAAAAAAAAAAAADmJ7AQ/original" height="50" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
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
  .legend('color', {
    width: 80,
    gridRow: 1,
    height: 128,
    navLoop: true,
    style: {
      itemMarkerFill: 'transparent',
    },
  });

chart.render();
```

### 图例项

图例项通常由图标、标签和值三部分构成，在部分场景下也可能仅包含图标及标签。

<img alt="item" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RSedT7GvlL4AAAAAAAAAAAAADmJ7AQ/original" height="80" />

| 属性                              | 描述                           | 类型                                                     | 默认值    |
| --------------------------------- | ------------------------------ | -------------------------------------------------------- | --------- |
| `style.`itemMarker                | 图例项图标                     | `DisplayObject` \| `(datum, index, data)=>DisplayObject` | 'circle'  |
| `style.`itemMarkerFill            | 图例项图标填充色               | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemMarkerFillOpacity     | 图例项图标填充色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemMarkerStroke          | 图例项图标描边色               | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemMarkerStrokeOpacity   | 图例项图标描边色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemLabel                 | 图例项标签                     | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemLabelFontSize         | 图例项标签文字大小             | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemLabelFontFamily       | 图例项标签文字字体             | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemLabelFontWeight       | 图例项标签字体粗细             | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemLabelFill             | 图例项标签字体颜色             | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemLabelFillOpacity      | 图例项标签字体透明度           | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemLabelStroke           | 图例项标签描边色               | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemLabelStrokeOpacity    | 图例项标签描边色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemValue                 | 图例项值                       | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemValueFontSize         | 图例项值文字大小               | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemValueFontFamily       | 图例项值文字字体               | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemValueFontWeight       | 图例项值字体粗细               | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemValueFill             | 图例项值字体颜色               | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemValueFillOpacity      | 图例项值字体透明度             | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemValueStroke           | 图例项值描边色                 | `string` \| `(datum, index, data)=>string`               | -         |
| `style.`itemValueStrokeOpacity    | 图例项值描边色透明度           | `number` \| `(datum, index, data)=>number`               | -         |
| `style.`itemSpan                  | 图例项图标、标签和值的空间划分 | `number` \| `number[]`                                   | [1, 1, 1] |
| `style.`itemSpacing               | 图例项图标、标签和值之间的间距 | `number` \| `number[]`                                   | -         |
| `style.`itemBackgroundFill        | 背景颜色                       | `string`                                                 | -         |
| `style.`itemBackgroundFillOpacity | 背景透明度                     | `number`                                                 | -         |

### 布局

<b>网格布局</b>

设置图例的宽`width`高`height`后，会采用网格布局，并通过设置`gridRow`和`gridCol`来控制图例项的行数和列数。

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

<b>流式布局</b>

需要采用流式布局时，需要设置`maxWidth`与`maxHeight`来限制显示区域。

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

| 属性               | 描述                                             | 类型               | 默认值 |
| ------------------ | ------------------------------------------------ | ------------------ | ------ |
| `style.`layout     | 图例项布局方式，网格布局、流式布局               | `'flex'`\|`'grid'` | 'flex' |
| `style.`width      | 图例区域高度，超出该高度后图例项会分页显示       | `number`           | 1000   |
| `style.`height     | 图例区域宽度，超出该宽度后图例项会换行显示       | `number`           | 100    |
| `style.`gridRow    | 指定每页显示的图例项数量                         | `number`           | 1      |
| `style.`gridCol    | 指定每列显示的图例项数量，为空时表示列数不受限制 | `number`           | -      |
| `style.`colPadding | 图例项之间的横向间隔                             | `number`           | 0      |
| `style.`rowPadding | 图例项之间的纵向间隔                             | `number`           | 0      |

### 分页显示

图例项分页显示时能够控制分页器的行为。

<embed src="@/docs/spec/common/navigator.zh.md"></embed>

### 事件

| 事件类型   | 描述                 | 类型                      |
| ---------- | -------------------- | ------------------------- |
| click      | 点击图例项时触发     | `(item:Selection)=>void`  |
| mouseenter | 鼠标移入图例项时触发 | `(item: Selection)=>void` |
| mouseleave | 鼠标移出图例项时触发 | `(item:Selection)=>void`  |

## 连续图例

使用离散数据绘制视图时采用的图例类型。

<img alt="continuous" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NgruQbickEAAAAAAAAAAAAAADmJ7AQ/original" height="50" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
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

| 属性                        | 描述                             | 类型                        | 默认值  |
| --------------------------- | -------------------------------- | --------------------------- | ------- |
| `style.`color               | 色带颜色，为数组时会从中按序取色 | `string[]` \| `interpolate` | -       |
| `style.`block               | 是否按区间显示                   | `boolean`                   | false   |
| `style.`type                | 连续图例类型                     | `'size'` \| `'color'`       | 'color' |
| `style.`ribbonFill          | 色带颜色                         | `string`                    | -       |
| `style.`ribbonFillOpacity   | 色带透明度                       | `number`                    | -       |
| `style.`ribbonStroke        | 色带描边色                       | `string`                    | -       |
| `style.`ribbonStrokeOpacity | 色带描边色透明度                 | `number`                    | -       |

> color 插值器参考 [d3-interpolate](https://github.com/d3/d3-interpolate)

### 滑动窗口

滑动窗口标记了当前的值选取范围，通过与滑动窗口交互能够对视图中的值范围进行选择。

 <img alt="slider-window" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eAnbT6OFQlwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

| 属性                              | 描述                 | 类型                           | 默认值     |
| --------------------------------- | -------------------- | ------------------------------ | ---------- |
| handle                            | 是否显示滑动手柄     | `boolean`                      | true       |
| handleLabel                       | 是否显示手柄文本     | `boolean`                      | true       |
| handleFormatter                   | 手柄文本格式化       | `(datum)=>string`              | -          |
| `style.`slidable                  | 窗口是否可以滑动     | `boolean`                      | true       |
| `style.`range                     | 默认选择范围         | `[number, number]`             | [min, max] |
| `style.`step                      | 单次滑动步长         | `number`                       | 1          |
| `style.`handleMarkerFill          | 手柄图标颜色         | `string`                       | -          |
| `style.`handleMarkerFillOpacity   | 手柄图标色透明度     | `number`                       | -          |
| `style.`handleMarkerStroke        | 手柄图标描边色       | `string`                       | -          |
| `style.`handleMarkerStrokeOpacity | 手柄图标描边色透明度 | `number`                       | -          |
| `style.`handleLabelFontSize       | 手柄文字大小         | `number` \| `Function<number>` | -          |
| `style.`handleLabelFontFamily     | 手柄文字字体         | `string` \| `Function<string>` | -          |
| `style.`handleLabelFontWeight     | 手柄字体粗细         | `number` \|`Function<number>`  | -          |
| `style.`handleLabelFill           | 手柄字体颜色         | `string`                       | -          |
| `style.`handleLabelFillOpacity    | 手柄文本透明度       | `number`                       | -          |
| `style.`handleLabelStroke         | 手柄文本描边色       | `string`                       | -          |
| `style.`handleLabelStrokeOpacity  | 手柄文本描边色透明度 | `number`                       | -          |

### 刻度值

| 属性                       | 描述                                                                  | 类型                            | 默认值     |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------- | ---------- |
| label                      | 是否显示刻度值                                                        | `boolean`                       | true`      |
| labelFormatter             | 刻度值格式化                                                          | `(datum, index, data)=>string`  | -          |
| labelFilter                | 刻度值过滤                                                            | `(datum, index, data)=>boolean` | -          |
| labelDirection             | 刻度值位于色带的位置，参考 axis `direction`                           | `'positive'` \| `'negative'`    | 'positive' |
| `style.`labelSpacing       | 刻度值到色带的间距                                                    | `number`                        | 5          |
| `style.`labelAlign         | 刻度值对齐位置<br/> - `'value'` 对齐到刻度<br/>- `'range'` 对齐到范围 | `'value'`\|`'range'`            | 'value'    |
| `style.`labelFontSize      | 刻度值文字大小                                                        | `number` \| `Function<number>`  | -          |
| `style.`labelFontFamily    | 刻度值文字字体                                                        | `string` \| `Function<string>`  | -          |
| `style.`labelFontWeight    | 刻度值字体粗细                                                        | `number` \| `Function<number>`  | -          |
| `style.`labelStroke        | 刻度值字体颜色                                                        | `string`                        | -          |
| `style.`labelStrokeOpacity | 刻度值文本透明度                                                      | `number`                        | -          |

<b>刻度值对齐方式</b>

- 对齐到刻度

 <img alt="align-tick" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vN1uQqWZ3K4AAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 对齐到范围

 <img alt="align-range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R_C4QJ5JxgMAAAAAAAAAAAAADmJ7AQ/original" width="300" />

### 指示器

指示器是在与连续图例交互过程中指示当前所在位置所表示值大小的提示组件。

<img alt="indicator" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NiI8Ta84y_MAAAAAAAAAAAAADmJ7AQ/original" height="50" />

| 属性                                     | 描述                     | 类型                               | 默认值 |
| ---------------------------------------- | ------------------------ | ---------------------------------- | ------ |
| indicator                                | 是否显示值指示器         | `boolean`                          | true   |
| indicatorFormatter                       | 值指示器格式化           | `(datum)=>string \| DisplayObject` | -      |
| `style.`indicatorLabelFontSize           | 值指示器文本文字大小     | `number` \| `Function<number>`     | -      |
| `style.`indicatorLabelFontFamily         | 值指示器文本文字字体     | `string` \| `Function<string>`     | -      |
| `style.`indicatorLabelFontWeight         | 值指示器文本字体粗细     | `number` \|`Function<number>`      | -      |
| `style.`indicatorLabelStroke             | 值指示器字体颜色         | `string`                           | -      |
| `style.`indicatorLabelStrokeOpacity      | 值指示器文本透明度       | `number`                           | -      |
| `style.`indicatorBackgroundFill          | 值指示器背景颜色         | `string`                           | -      |
| `style.`indicatorBackgroundFillOpacity   | 值指示器背景透明度       | `number`                           | -      |
| `style.`indicatorBackgroundStroke        | 值指示器背景描边色       | `string`                           | -      |
| `style.`indicatorBackgroundStrokeOpacity | 值指示器背景描边色透明度 | `number`                           | -      |

### 事件

| 事件类型    | 描述                       | 类型                                             |
| ----------- | -------------------------- | ------------------------------------------------ |
| valuechange | 滑动窗口选取范围改变时触发 | `(range: [number, number])=>void`                |
| indicate    | 指示器值改变时触发         | `(value: number, range: [number, number])=>void` |

## 通用选项

### 标题

<embed src="@/docs/spec/common/componentTitle.zh.md"></embed>

### 布局
