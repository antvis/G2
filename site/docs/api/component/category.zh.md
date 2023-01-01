---
title: category
order: 1
---

## 开始使用

使用离散数据绘制视图时采用的图例类型。

<img alt="category" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OexAQb2tdMAAAAAAAAAAAAAADmJ7AQ/original" height="50" />

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
  .legend('sex', {
    width: 80,
    gridRow: 1,
    height: 128,
    navLoop: true,
    itemMarkerFill: 'transparent',
  });

chart.render();
```

## 选项

### 图例项

图例项通常由图标、标签和值三部分构成，在部分场景下也可能仅包含图标及标签。

<img alt="item" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RSedT7GvlL4AAAAAAAAAAAAADmJ7AQ/original" height="80" />

| 属性                      | 描述                           | 类型                                                     | 默认值    |
| ------------------------- | ------------------------------ | -------------------------------------------------------- | --------- |
| itemMarker                | 图例项图标                     | `DisplayObject` \| `(datum, index, data)=>DisplayObject` | 'circle'  |
| itemMarkerFill            | 图例项图标填充色               | `string` \| `(datum, index, data)=>string`               | -         |
| itemMarkerFillOpacity     | 图例项图标填充色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| itemMarkerStroke          | 图例项图标描边色               | `string` \| `(datum, index, data)=>string`               | -         |
| itemMarkerStrokeOpacity   | 图例项图标描边色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| itemLabel                 | 图例项标签                     | `string` \| `(datum, index, data)=>string`               | -         |
| itemLabelFontSize         | 图例项标签文字大小             | `number` \| `(datum, index, data)=>number`               | -         |
| itemLabelFontFamily       | 图例项标签文字字体             | `string` \| `(datum, index, data)=>string`               | -         |
| itemLabelFontWeight       | 图例项标签字体粗细             | `number` \| `(datum, index, data)=>number`               | -         |
| itemLabelFill             | 图例项标签字体颜色             | `string` \| `(datum, index, data)=>string`               | -         |
| itemLabelFillOpacity      | 图例项标签字体透明度           | `number` \| `(datum, index, data)=>number`               | -         |
| itemLabelStroke           | 图例项标签描边色               | `string` \| `(datum, index, data)=>string`               | -         |
| itemLabelStrokeOpacity    | 图例项标签描边色透明度         | `number` \| `(datum, index, data)=>number`               | -         |
| itemValue                 | 图例项值                       | `string` \| `(datum, index, data)=>string`               | -         |
| itemValueFontSize         | 图例项值文字大小               | `number` \| `(datum, index, data)=>number`               | -         |
| itemValueFontFamily       | 图例项值文字字体               | `string` \| `(datum, index, data)=>string`               | -         |
| itemValueFontWeight       | 图例项值字体粗细               | `number` \| `(datum, index, data)=>number`               | -         |
| itemValueFill             | 图例项值字体颜色               | `string` \| `(datum, index, data)=>string`               | -         |
| itemValueFillOpacity      | 图例项值字体透明度             | `number` \| `(datum, index, data)=>number`               | -         |
| itemValueStroke           | 图例项值描边色                 | `string` \| `(datum, index, data)=>string`               | -         |
| itemValueStrokeOpacity    | 图例项值描边色透明度           | `number` \| `(datum, index, data)=>number`               | -         |
| itemSpan                  | 图例项图标、标签和值的空间划分 | `number` \| `number[]`                                   | [1, 1, 1] |
| itemSpacing               | 图例项图标、标签和值之间的间距 | `number` \| `number[]`                                   | -         |
| itemBackgroundFill        | 背景颜色                       | `string`                                                 | -         |
| itemBackgroundFillOpacity | 背景透明度                     | `number`                                                 | -         |

### 布局

<b>网格布局</b>

设置图例的宽`width`高`height`后，会采用网格布局，并通过设置`gridRow`和`gridCol`来控制图例项的行数和列数。

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

<b>流式布局</b>

需要采用流式布局时，需要设置`maxWidth`与`maxHeight`来限制显示区域。

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

| 属性       | 描述                                             | 类型               | 默认值 |
| ---------- | ------------------------------------------------ | ------------------ | ------ |
| layout     | 布局方式，网格布局、流式布局                     | `'flex'`\|`'grid'` | 'flex' |
| width      | 图例区域高度，超出该高度后图例项会分页显示       | `number`           | 1000   |
| height     | 图例区域宽度，超出该宽度后图例项会换行显示       | `number`           | 100    |
| gridRow    | 指定每页显示的图例项数量                         | `number`           | 1      |
| gridCol    | 指定每列显示的图例项数量，为空时表示列数不受限制 | `number`           | -      |
| colPadding | 图例项之间的横向间隔                             | `number`           | 0      |
| rowPadding | 图例项之间的纵向间隔                             | `number`           | 0      |

### 分页显示

图例项分页显示时能够控制分页器的行为。

<embed src="@/docs/api/common/navigator.zh.md"></embed>

### 事件

| 事件类型   | 描述                 | 类型                      |
| ---------- | -------------------- | ------------------------- |
| click      | 点击图例项时触发     | `(item:Selection)=>void`  |
| mouseenter | 鼠标移入图例项时触发 | `(item: Selection)=>void` |
| mouseleave | 鼠标移出图例项时触发 | `(item:Selection)=>void`  |

## 基础选项

### 标题

<embed src="@/docs/api/common/componentTitle.zh.md"></embed>
