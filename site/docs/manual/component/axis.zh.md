---
title: 坐标轴（Axis）
order: 7.1
---

## 概述

G2 中 **Axis（坐标轴）** 就像是图表的 "尺子"，用于建立数据与视觉位置的映射关系，并通过刻度、标签、网格线等元素帮助用户直观理解数据的分布与比例。它能帮你快速看懂图形的位置和数值大小。

简单来说，坐标轴可以帮助我们把数据数字和图表上的位置对应起来，让图表更容易理解。

> 举个例子：在柱状图中，横轴通常表示时间，纵轴表示销售额，这样你就能一眼看出 "3 月卖了 200 万，4 月涨到 300 万"

![坐标轴使用方式示意图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

### 构成元素

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vMugQZrzeeYAAAAAAAAAAAAAemJ7AQ/original" width="1000px" />

### 使用方式

通过前面的概述内容，相信你对坐标轴已经有了一个清晰的认识。那么具体该如何使用呢？接下来，我将手把手教你如何配置坐标轴。

配置坐标轴其实就像搭积木，只需记住一个简单的核心口诀："用 axis 属性，按方向配置，哪里需要改哪里改。"

**第一步：启用坐标轴（默认已开启）**

G2 会根据你的数据类型 自动生成坐标轴，不需要任何配置就能看到基础坐标轴

![启用坐标轴（默认已开启）](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, 月份: '三月', 销售额: 200 },
    { id: 3, 月份: '四月', 销售额: 300 },
    { id: 4, 月份: '五月', 销售额: 400 },
    { id: 5, 月份: '六月', 销售额: 500 },
    { id: 6, 月份: '七月', 销售额: 600 },
    { id: 7, 月份: '八月', 销售额: 700 },
  ],
  encode: { x: '月份', y: '销售额', color: '月份' },
  // 不需要 axis 配置也能自动生成坐标轴
  // axis: {},
});
```

**第二步：按方向单独配置**

> 配置 x（水平方向） 坐标轴

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, 月份: '三月', 销售额: 200 },
    { id: 3, 月份: '四月', 销售额: 300 },
    { id: 4, 月份: '五月', 销售额: 400 },
    { id: 5, 月份: '六月', 销售额: 500 },
    { id: 6, 月份: '七月', 销售额: 600 },
    { id: 7, 月份: '八月', 销售额: 700 },
  ],
  encode: { x: '月份', y: '销售额', color: '月份' },
  // 配置 axis（坐标轴）
  axis: {
    // 配置水平方向的坐标轴属性
    x: {
      // 配置参数以及示例可以继续往下看..
    },
  },
});
```

> 配置 y（垂直方向） 坐标轴

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, 月份: '三月', 销售额: 200 },
    { id: 3, 月份: '四月', 销售额: 300 },
    { id: 4, 月份: '五月', 销售额: 400 },
    { id: 5, 月份: '六月', 销售额: 500 },
    { id: 6, 月份: '七月', 销售额: 600 },
    { id: 7, 月份: '八月', 销售额: 700 },
  ],
  encode: { x: '月份', y: '销售额', color: '月份' },
  // 配置 axis（坐标轴）
  axis: {
    // 配置垂直方向的坐标轴属性
    y: {
      // 配置参数以及示例可以继续往下看..
    },
  },
});
```

### 配置层级

坐标轴可以在 Mark 层级配置。在 G2 中每个标记（Mark）都有自己的坐标轴。如果标记对应比例尺是同步的，那么坐标轴也会合并。

```ts
({
  type: 'interval',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

坐标轴也可以在 View 层级配置。坐标轴具有传递性。视图上声明的坐标轴会传递给 `children` 声明的标记，如果该标记有对应通道的坐标轴，就合并；否则不影响。

```ts
({
  type: 'view',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

### 隐藏坐标轴

隐藏每个通道的坐标轴：

![坐标轴隐藏演示](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Z2JsTKPQxUMAAAAAAAAAAAAAemJ7AQ/original)

> 隐藏 x 坐标轴：

```ts
({
  type: 'interval',
  axis: { x: false }, // 隐藏 x 水平方向坐标轴
});
```

> 隐藏 y 坐标轴：

```ts
({
  type: 'interval',
  axis: { y: false }, // 隐藏 y 垂直方向坐标轴
});
```

> 隐藏多个坐标轴

```ts
({
  type: 'interval',
  axis: false,
});
```

## 配置项

每个坐标轴由 标题（title）、轴线（line）、刻度（tick）、刻度值（label）以及网格线（grid）组成。

| 属性     | 描述                           | 类型                                               | 默认值                       | 必选 |
| -------- | ------------------------------ | -------------------------------------------------- | ---------------------------- | ---- |
| title    | 设置坐标轴的标题文本及其样式   | [title](#title)                                    | -                            |      |
| line     | 设置坐标轴线的显示及其样式     | [line](#line)                                      | -                            |      |
| tick     | 设置坐标轴刻度线的显示及其样式 | [tick](#tick)                                      | -                            |      |
| label    | 设置坐标轴刻度值的显示及其样式 | [label](#label)                                    | -                            |      |
| grid     | 设置坐标轴网格线的显示及其样式 | [grid](#grid)                                      | -                            |      |
| animate  | 设置坐标轴动画效果             | `boolean` &#124; [animate](#animate)               | -                            |
| position | 设置坐标轴的位置               | `left` &#124; `right` &#124; `top` &#124; `bottom` | `x: bottom` &#124; `y: left` |      |

:::warning{title=注意}
标题（title）、轴线（line）、刻度（tick）、刻度值（label）以及网格线（grid）的配置同级，不是以对象的形式来配置，而是以前缀加属性的方式来配置。
:::

例如配置刻度值的旋转，不是在 label 对象下配置，而是通过如下的方式：

```js
({
  axis: {
    x: {
      title: 'x 轴标题',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      transform: [
        // 旋转
        {
          type: 'rotate',
          optionalAngles: [0, 45, 90], // 尝试旋转 0 度、45 度、90 度
          recoverWhenFailed: true, // 如果旋转后无法解决问题，恢复到默认角度
        },
      ],
    },
  },
});
```

### title

| 属性               | 描述                                                           | 类型                                                                                                                         | 默认值        | 必须 |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------- | ---- |
| title              | 关闭标题或设置标题内容                                         | `false`&#124;`string` &#124; `number` &#124; [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object)           | -             |      |
| titleSpacing       | 标题到坐标轴的距离                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 10            |      |
| titlePosition      | 标题相对坐标轴的位置，支持首字母简写形式，如`'top'`简写为`'t'` | `'top'`&#124;`'bottom'`&#124;`'left'`&#124;`'right'`                                                                         | `'lb'`        |      |
| titleFontSize      | 标题文字大小                                                   | `number` &#124; `(datum, index, data) => number`                                                                             | -             |      |
| titleFontWeight    | 标题文字字体粗细                                               | `number` &#124; `(datum, index, data) => number`                                                                             | -             |      |
| titleFontFamily    | 标题文字字体                                                   | `string` &#124; `(datum, index, data) => string`                                                                             | -             |      |
| titleLineHeight    | 标题文字行高                                                   | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |      |
| titleTextAlign     | 标题文字水平对齐方式                                           | `'center'` &#124; `'end'` &#124; `'left'` &#124; `'right'` &#124; `'start'` &#124; `(datum, index, data) => string`          | `'start'`     |      |
| titleTextBaseline  | 标题文字垂直基线                                               | `'top'` &#124; `'middle'` &#124; `'bottom'` &#124; `'alphabetic'` &#124; `'hanging'` &#124; `(datum, index, data) => string` | `'middle'`    |      |
| titleFill          | 标题文字填充色                                                 | `string` &#124; `(datum, index, data) => string`                                                                             | -             |      |
| titleFillOpacity   | 标题文字填充透明度                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |      |
| titleStroke        | 标题文字描边颜色                                               | `string` &#124; `(datum, index, data) => string`                                                                             | `transparent` |      |
| titleStrokeOpacity | 标题文字描边透明度                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |      |
| titleLineWidth     | 标题文字描边宽度                                               | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |
| titleLineDash      | 标题文字描边虚线配置                                           | `number[]` &#124; `(datum, index, data) => number[]`                                                                         | []            |      |
| titleOpacity       | 标题文字整体透明度                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |      |
| titleShadowColor   | 标题文字阴影颜色                                               | `string` &#124; `(datum, index, data) => string`                                                                             | `transparent` |      |
| titleShadowBlur    | 标题文字阴影高斯模糊系数                                       | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |
| titleShadowOffsetX | 标题文字阴影水平偏移量                                         | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |
| titleShadowOffsetY | 标题文字阴影垂直偏移量                                         | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |
| titleCursor        | 标题文字鼠标样式                                               | `string` &#124; `(datum, index, data) => string`                                                                             | `default`     |      |
| titleDx            | 标题文字水平偏移量                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |
| titleDy            | 标题文字垂直偏移量                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |      |

> 配置方式

```ts
({
  // 配置坐标轴
  axis: {
    // 配置 y 轴
    y: {
      // 这部分是轴标题的配置
      title: 'Frequency', // 设置 y 轴标题
      titleSpacing: 30, // 设置 y 轴标题与轴线之间的间距
      titlePosition: 'left', // 设置 y 轴标题位置
      titleFill: 'steelblue', // 设置 y 轴标题的颜色
      titleFontSize: 16, // 设置 y 轴标题字体大小
      titleFontWeight: 'bold', // 设置 y 轴标题字体粗细
      titleFontFamily: 'Arial', // 设置 y 轴标题字体
      titleTextAlign: 'center', // 设置 y 轴标题水平对齐方式
      titleTextBaseline: 'middle', // 设置 y 轴标题垂直基线
      titleOpacity: 0.9, // 设置 y 轴标题整体透明度
      titleStroke: '#333', // 设置 y 轴标题描边颜色
      titleLineWidth: 1, // 设置 y 轴标题描边宽度
      titleShadowColor: 'rgba(0,0,0,0.3)', // 设置 y 轴标题阴影颜色
      titleShadowBlur: 3, // 设置 y 轴标题阴影模糊度
      titleShadowOffsetX: 2, // 设置 y 轴标题阴影水平偏移
      titleShadowOffsetY: 2, // 设置 y 轴标题阴影垂直偏移
      titleDx: 5, // 设置 y 轴标题水平偏移量
      titleDy: 0, // 设置 y 轴标题垂直偏移量
      titleCursor: 'pointer', // 设置 y 轴标题鼠标样式
    },
    // 配置 x 轴
    x: {
      // 这部分是轴标题的配置
      title: 'Letter', // 设置 x 轴标题
      titleSpacing: 20, // 设置 x 轴标题与轴线之间的间距
      titlePosition: 'bottom', // 设置 x 轴标题位置
      titleFontSize: 14, // 设置 x 轴标题字体大小
      titleFontWeight: 'normal', // 设置 x 轴标题字体粗细
      titleFill: '#666', // 设置 x 轴标题颜色
      titleTextAlign: 'center', // 设置 x 轴标题水平对齐方式
      titleOpacity: 1, // 设置 x 轴标题透明度
      titleLineHeight: 1.2, // 设置 x 轴标题行高
      titleFillOpacity: 0.8, // 设置 x 轴标题填充透明度
    },
  },
});
```

### line

| 属性              | 描述                                                                                                            | 类型                                                                  | 默认值    | 必须 |
| ----------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------- | ---- |
| line              | 是否显示轴线                                                                                                    | `boolean`                                                             | false     |      |
| arrow             | 是否显示箭头                                                                                                    | `boolean`                                                             | true      |      |
| lineExtension     | 轴线两侧的延长线                                                                                                | `[number, number]`                                                    | -         |      |
| lineArrow         | 定义轴线箭头形状，默认为箭头形状                                                                                | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -         |      |
| lineArrowOffset   | 箭头偏移长度                                                                                                    | `number`                                                              | 15        |      |
| lineArrowSize     | 箭头尺寸                                                                                                        | `number`                                                              | -         |      |
| lineStroke        | 轴线描边颜色                                                                                                    | `string` &#124; `(datum, index, data) => string`                      | -         |      |
| lineStrokeOpacity | 轴线描边透明度                                                                                                  | `number` &#124; `(datum, index, data) => number`                      | -         |      |
| lineLineWidth     | 轴线描边宽度                                                                                                    | `number` &#124; `(datum, index, data) => number`                      | -         |      |
| lineLineDash      | 轴线描边虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data) => [number,number]`    | -         |      |
| lineOpacity       | 轴线整体透明度                                                                                                  | `number` &#124; `(datum, index, data) => number`                      | 1         |      |
| lineShadowColor   | 轴线阴影颜色                                                                                                    | `string` &#124; `(datum, index, data) => string`                      | -         |      |
| lineShadowBlur    | 轴线阴影高斯模糊系数                                                                                            | `number` &#124; `(datum, index, data) => number`                      | -         |      |
| lineShadowOffsetX | 轴线阴影水平偏移量                                                                                              | `number` &#124; `(datum, index, data) => number`                      | -         |      |
| lineShadowOffsetY | 轴线阴影垂直偏移量                                                                                              | `number` &#124; `(datum, index, data) => number`                      | -         |      |
| lineCursor        | 轴线鼠标样式                                                                                                    | `string` &#124; `(datum, index, data) => string`                      | `default` |      |

> 配置方式

```ts
({
  axis: {
    x: {
      line: true, // 是否显示轴线
      arrow: true, // 是否显示箭头
      lineArrowOffset: 10, // 箭头偏移长度
      lineArrowSize: 30, // 箭头尺寸
      lineLineWidth: 10, // 轴线描边宽度
      lineExtension: [5, 5], // 轴线两侧的延长线
      lineStroke: '#333', // 轴线描边颜色
      lineStrokeOpacity: 0.8, // 轴线描边透明度
      lineLineDash: [5, 5], // 轴线描边虚线配置
      lineOpacity: 1, // 轴线整体透明度
      lineShadowColor: 'rgba(0,0,0,0.3)', // 轴线阴影颜色
      lineShadowBlur: 3, // 轴线阴影高斯模糊系数
      lineShadowOffsetX: 2, // 轴线阴影水平偏移量
      lineShadowOffsetY: 2, // 轴线阴影垂直偏移量
      lineCursor: 'pointer', // 轴线鼠标样式
    },
    y: {
      line: true, // 是否显示轴线
      arrow: true, // 是否显示箭头
      lineArrowOffset: 10, // 箭头偏移长度
      lineArrowSize: 30, // 箭头尺寸
      lineLineWidth: 10, // 轴线描边宽度
      lineStroke: '#666', // 轴线描边颜色
      lineOpacity: 0.9, // 轴线整体透明度
    },
  },
});
```

### tick

| 属性              | 描述                                                                                                              | 类型                                                                                                                        | 默认值     | 必须 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------- | ---- |
| tick              | 是否显示刻度                                                                                                      | `boolean`                                                                                                                   | true       |      |
| tickCount         | 设置推荐生成的刻度数量；tickCount 只是一个建议值                                                                  | `number`                                                                                                                    | -          |      |
| tickMethod        | 自定义刻度生成方法                                                                                                | `(start: number \| Date, end: number \| Date, tickCount: number) => number[]`                                               | -          |      |
| tickFilter        | 刻度线过滤                                                                                                        | `(datum, index, data)=>boolean`                                                                                             | -          |      |
| tickFormatter     | 刻度线格式化，可用于自定义刻度样式，回调函数中会额外返回该刻度的方向                                              | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) &#124; `(datum, index, data, Vector)=> DisplayObject` | -          |      |
| tickDirection     | 刻度朝向，为 `positive` 时，位于侧轴方向（即主轴顺时针 90 度方向）, 为 `negative` 时，刻度位于侧轴负方向          | `'positive'` &#124; `'negative'`                                                                                            | `positive` |
| tickLength        | 刻度线长度                                                                                                        | `number`&#124;`(datum, index, data)=>number`                                                                                | 15         |      |
| tickStroke        | 刻度线描边颜色                                                                                                    | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | -          |      |
| tickStrokeOpacity | 刻度线描边透明度                                                                                                  | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickLineWidth     | 刻度线描边宽度                                                                                                    | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickLineDash      | 刻度线描边虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data, Vector)=>[number,number]`                                                    | -          |      |
| tickOpacity       | 刻度线整体透明度                                                                                                  | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickShadowColor   | 刻度线阴影颜色                                                                                                    | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | -          |      |
| tickShadowBlur    | 刻度线阴影高斯模糊系数                                                                                            | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickShadowOffsetX | 刻度线阴影水平偏移量                                                                                              | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickShadowOffsetY | 刻度线阴影垂直偏移量                                                                                              | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -          |      |
| tickCursor        | 刻度线鼠标样式                                                                                                    | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | `default`  |      |

```ts
({
  // 配置坐标轴
  axis: {
    y: {
      tickCount: 10, // 设置推荐生成的刻度数量
      tickLength: 20, // 设置 y 轴刻度线的长度
      tickFilter: (_, i) => i % 3 !== 0, // 过滤 y 轴刻度线，只显示每隔 3 个刻度线
      tick: true, // 是否显示刻度
      tickDirection: 'positive', // 刻度朝向
      tickStroke: '#333', // 刻度线描边颜色
      tickStrokeOpacity: 0.8, // 刻度线描边透明度
      tickLineWidth: 2, // 刻度线描边宽度
      tickLineDash: [2, 2], // 刻度线描边虚线配置
      tickOpacity: 1, // 刻度线整体透明度
      tickShadowColor: 'rgba(0,0,0,0.2)', // 刻度线阴影颜色
      tickShadowBlur: 2, // 刻度线阴影高斯模糊系数
      tickShadowOffsetX: 1, // 刻度线阴影水平偏移量
      tickShadowOffsetY: 1, // 刻度线阴影垂直偏移量
      tickCursor: 'crosshair', // 刻度线鼠标样式
    },
    x: {
      tick: true, // 是否显示刻度
      tickCount: 8, // 设置推荐生成的刻度数量
      tickMethod: (start, end, count) => {
        // 自定义刻度生成方法
        const step = (end - start) / (count - 1);
        return Array.from({ length: count }, (_, i) => start + i * step);
      },
      tickLength: 10, // 刻度线长度
      tickDirection: 'positive', // 刻度朝向
      tickStroke: '#3366ff', // 刻度线描边颜色
      tickLineWidth: 5, // 刻度线描边宽度
      tickOpacity: 0.9, // 刻度线整体透明度
      tickFilter: (_, i) => i % 2 === 0, // 过滤刻度线，只显示偶数索引的刻度
    },
  },
});
```

### label

| 属性               | 描述                                                                                                                                                                  | 类型                                                                                                                       | 默认值     | 必须 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- | ---- |
| label              | 是否显示刻度值                                                                                                                                                        | `boolean`                                                                                                                  | -          |      |
| labelFontSize      | 刻度标签文字大小                                                                                                                                                      | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelFontFamily    | 刻度标签文字字体                                                                                                                                                      | `string` &#124; `(datum, index, data)=>string`                                                                             | -          |      |
| labelFontWeight    | 刻度标签文字字体粗细                                                                                                                                                  | `number` &#124;`(datum, index, data)=>number`                                                                              | -          |      |
| labelLineHeight    | 刻度标签文字行高                                                                                                                                                      | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelTextAlign     | 刻度标签文字水平对齐方式                                                                                                                                              | `'center'` &#124; `'end'` &#124; `'left'` &#124; `'right'` &#124; `'start'` &#124; `(datum, index, data)=>string`          | `'start'`  |      |
| labelTextBaseline  | 刻度标签文字垂直基线                                                                                                                                                  | `'top'` &#124; `'middle'` &#124; `'bottom'` &#124; `'alphabetic'` &#124; `'hanging'` &#124; `(datum, index, data)=>string` | `'bottom'` |      |
| labelAlign         | 刻度值对齐方式<br/>- 'horizontal' 始终保持水平<br/> - 'parallel' 平行于坐标轴<br/> - 'perpendicular' 垂直于坐标轴                                                     | `'horizontal'` &#124; `'parallel'` &#124; `'perpendicular'`                                                                | `parallel` |      |
| labelFilter        | 刻度值过滤                                                                                                                                                            | `(datum, index, data)=> boolean`                                                                                           | -          |      |
| labelFormatter     | 刻度值格式化，可以传入一个函数或者是 [d3-format](https://d3js.org/d3-format) 支持的字符串                                                                             | `string` \| `(datum, index, array) => string`                                                                              | -          |      |
| transform          | 刻度值转换，避免文本之间发生重叠。当前支持超长文本缩略、重叠刻度值隐藏、自动旋转                                                                                      | `Transform[]`                                                                                                              | -          |      |
| labelTransform     | 刻度值转换，在局部坐标系下进行变换的快捷方式，包括缩放、平移、旋转、拉伸、矩阵变换，具体见[transform](https://g.antv.antgroup.com/api/basic/display-object#transform) | `string`                                                                                                                   | -          |      |
| labelAutoHide      | 自动隐藏重叠的刻度值，设置 size 值的时候生效                                                                                                                          | `boolean` &#124; `HideOverlapCfg`                                                                                          | -          |      |
| labelAutoRotate    | 自动旋转刻度，设置 size 值的时候生效值                                                                                                                                | `boolean` &#124; `RotateOverlapCfg`                                                                                        | -          |      |
| labelAutoEllipsis  | 自动缩略刻度值，设置 size 值的时候生效                                                                                                                                | `boolean` &#124; `EllipsisOverlapCfg`                                                                                      | -          |      |
| labelAutoWrap      | 自动换行刻度值，设置 size 值的时候是生效                                                                                                                              | `boolean` &#124; `WrapOverlapCfg`                                                                                          | -          |      |
| labelDirection     | 刻度值位于轴线的位置，参考`tickDirection`                                                                                                                             | `'positive'` &#124; `'negative'`                                                                                           | `positive` |      |
| labelSpacing       | 刻度值到其对应刻度的间距                                                                                                                                              | `number`                                                                                                                   | 0          |      |
| labelFill          | 刻度标签文字填充色                                                                                                                                                    | `string` &#124; `(datum, index, data)=>string`                                                                             | -          |      |
| labelFillOpacity   | 刻度标签文字填充透明度                                                                                                                                                | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelStroke        | 刻度标签文字描边颜色                                                                                                                                                  | `string` &#124; `(datum, index, data)=>string`                                                                             | -          |      |
| labelStrokeOpacity | 刻度标签文字描边透明度                                                                                                                                                | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelLineWidth     | 刻度标签文字描边宽度                                                                                                                                                  | `number` &#124;`(datum, index, data)=>number`                                                                              | -          |      |
| labelLineDash      | 刻度标签文字描边虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。                                               | `[number,number]` &#124; `(datum, index, data)=>[number, number]`                                                          | -          |      |
| labelOpacity       | 刻度标签文字整体透明度                                                                                                                                                | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelShadowColor   | 刻度标签文字阴影颜色                                                                                                                                                  | `string` &#124; `(datum, index, data)=>string`                                                                             | -          |      |
| labelShadowBlur    | 刻度标签文字阴影高斯模糊系数                                                                                                                                          | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelShadowOffsetX | 刻度标签文字阴影水平偏移量                                                                                                                                            | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelShadowOffsetY | 刻度标签文字阴影垂直偏移量                                                                                                                                            | `number` &#124; `(datum, index, data)=>number`                                                                             | -          |      |
| labelCursor        | 刻度标签文字鼠标样式                                                                                                                                                  | `string` &#124; `(datum, index, data)=>string`                                                                             | `default`  |      |
| labelDx            | 刻度标签文字水平偏移量                                                                                                                                                | `number` &#124; `(datum, index, data)=>number`                                                                             | 0          |      |
| labelDy            | 刻度标签文字垂直偏移量                                                                                                                                                | `number` &#124; `(datum, index, data)=>number`                                                                             | 0          |      |

#### labelFormatter

`labelFormatter` 视觉通道用于调整标签的格式。

##### 基本用法

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, 月份: '03', 销售额: 200 },
    { id: 3, 月份: '04', 销售额: 300 },
    { id: 4, 月份: '05', 销售额: 400 },
    { id: 5, 月份: '06', 销售额: 500 },
    { id: 6, 月份: '07', 销售额: 600 },
    { id: 7, 月份: '08', 销售额: 700 },
  ],
  encode: { x: '月份', y: '销售额', color: '月份' },
  axis: {
    y: {
      title: '销售额',
    },
    x: {
      title: '月份',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`, // 刻度值线格式化
    },
  },
});
chart.render();
```

##### D3 Format 格式化字符串

G2 支持使用 [d3-format](https://d3js.org/d3-format) 兼容的格式化字符串，这是一套强大且标准化的数值格式化规范。

##### 格式化语法

D3 format 的基本语法：`[[fill]align][sign][symbol][0][width][,][.precision][~][type]`

- **fill**: 填充字符，默认是空格
- **align**: 对齐方式（`<` 左对齐，`^` 居中，`>` 右对齐，`=` 数字右对齐）
- **sign**: 符号显示（`+` 总是显示符号，`-` 只显示负号，`(` 负数用括号）
- **symbol**: 前缀符号（`#` 进制前缀，`$` 货币符号）
- **0**: 零填充
- **width**: 最小宽度
- **,**: 千分位分隔符
- **precision**: 精度
- **~**: 去除尾随零
- **type**: 格式类型

##### 常用格式化类型

| 类型 | 描述       | 示例          |
| ---- | ---------- | ------------- |
| `d`  | 整数       | `42`          |
| `f`  | 固定小数位 | `42.00`       |
| `e`  | 科学计数法 | `4.2e+1`      |
| `s`  | SI 前缀    | `42k`, `1.5M` |
| `%`  | 百分比     | `42%`         |
| `$`  | 货币格式   | `$42.00`      |
| `r`  | 有效数字   | `42.0`        |
| `g`  | 通用格式   | `42`          |

##### D3-format 完整格式化参考

```js
// 常用数值格式
'.2f'; // 固定2位小数：23.45
'.0f'; // 整数：23
'.1%'; // 百分比：23.4%
',.0f'; // 千分位：1,234,567

// SI前缀格式（推荐用于大数值）
's'; // SI前缀：1.2M, 3.4k
'.1s'; // 1位小数SI：1.2M, 3.4k
'~s'; // 去尾随零SI：1.2M, 3k
'.0s'; // 整数SI：1M, 3k

// 货币格式
'$,.2f'; // 美元：$1,234.56
'$.2s'; // 美元SI：$1.23M

// 科学计数法
'.2e'; // 科学计数：1.23e+6
'.2g'; // 通用格式：1.2e+6 或 1234

// 进制格式
'd'; // 十进制整数：1234
'x'; // 十六进制：4d2
'o'; // 八进制：2322
'b'; // 二进制：10011010010
```

##### 格式化示例

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { 类型: '收入', 值: 1234567.89 },
    { 类型: '支出', 值: -987654.32 },
    { 类型: '利润', 值: 246913.57 },
    { 类型: '投资', 值: 5000000 },
  ],
  encode: { x: '类型', y: '值', color: '类型' },
  axis: {
    y: {
      title: '金额（元）',
      // 使用 d3-format 格式化字符串
      labelFormatter: ',.2s', // 千分位 + 两位有效数字 + SI前缀
    },
    x: {
      title: '业务类型',
    },
  },
});
chart.render();
```

##### 自定义格式化函数

除了使用 d3-format 字符串，你也可以传入自定义函数：

```js
axis: {
  y: {
    labelFormatter: (value, index, data) => {
      // 自定义逻辑
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toString();
    },
  },
}
```

#### labelTransform

`labelTransform` 是 G 提供的在局部坐标系下进行变换的快捷方式，同时与 [CSS Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 保持一致。

下面的例子展示了如何配置 `labelTransform` 来让 x 轴刻度值旋转 90 度。

```js
({
  axis: {
    x: {
      title: 'x 轴标题',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      labelTransform: 'rotate(90)',
    },
  },
});
```

#### transform

`transform` 为了避免刻度标签重叠或超出显示范围，系统提供了多种优化方式，包括缩略、旋转、隐藏和换行。
这些功能可通过两种方式配置：

1. `transform` 数组（多策略组合）
2. `labelAutoXXX` 系列属性（单策略快捷配置）`推荐`

两者的核心功能完全一致，区别在于使用场景和配置方式。

> 1. `transform` 数组（多策略组合）

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 500,
  data: [
    { id: 1, label: 'x 轴刻度值标签1', value: 200 },
    { id: 3, label: 'x 轴刻度值标签2', value: 300 },
    { id: 4, label: 'x 轴刻度值标签3', value: 400 },
    { id: 5, label: 'x 轴刻度值标签4', value: 500 },
    { id: 6, label: 'x 轴刻度值标签5', value: 600 },
    { id: 7, label: 'x 轴刻度值标签6', value: 700 },
    { id: 8, label: 'x 轴刻度值标签999', value: 800 },
  ],
  encode: { x: 'label', y: 'value' },
  axis: {
    y: {
      title: 'y 轴标题',
    },
    x: {
      title: 'x 轴标题',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      size: 100,
      transform: [
        // 缩略
        {
          type: 'ellipsis',
          suffix: '..', // 缩略符（默认...）
          minLength: 8, // 少于8字符不缩略
          maxLength: 12, // 超过12字符强制缩略
        },
        //  换行
        {
          type: 'wrap',
          wordWrapWidth: 80, // 单行最大宽度为 80px
          maxLines: 2, // 最多显示两行
          recoverWhenFailed: true, // 如果换行失败恢复到默认布局
        },
        // 旋转
        {
          type: 'rotate',
          optionalAngles: [0, 45, 90], // 尝试旋转 0 度、45 度、90 度
          recoverWhenFailed: true, // 如果旋转后无法解决问题，恢复到默认角度
        },
        // 隐藏
        {
          type: 'hide',
          keepHeader: true, // 保留第一个刻度值
          keepTail: true, // 保留最后一个刻度值
        },
      ],
    },
  },
});
chart.render();
```

`labelTransform` 是 G 提供的在局部坐标系下进行变换的快捷方式，同时与 [CSS Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 保持一致。

下面的例子展示了如何配置 `labelTransform` 来让 x 轴刻度值旋转 90 度。

```js
({
  axis: {
    x: {
      title: 'x 轴标题',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      labelTransform: 'rotate(90)',
    },
  },
});
```

> 2. 使用 `labelAutoHide`、`labelAutoRotate`、`labelAutoEllipsis`、`labelAutoWrap`、 属性（需设置 `size`）

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 500,
  data: [
    { id: 1, label: 'x 轴刻度值标签1', value: 200 },
    { id: 3, label: 'x 轴刻度值标签2', value: 300 },
    { id: 4, label: 'x 轴刻度值标签3', value: 400 },
    { id: 5, label: 'x 轴刻度值标签4', value: 500 },
    { id: 6, label: 'x 轴刻度值标签5', value: 600 },
    { id: 7, label: 'x 轴刻度值标签6', value: 700 },
    { id: 8, label: 'x 轴刻度值标签999', value: 800 },
  ],
  encode: { x: 'label', y: 'value' },
  axis: {
    y: {
      title: 'y 轴标题',
    },
    x: {
      title: 'x 轴标题',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,

      size: 100, // 必须设置 size
      labelAutoEllipsis: {
        suffix: '..',
        minLength: 8,
        maxLength: 12,
      },
      labelAutoWrap: {
        wordWrapWidth: 80,
        maxLines: 2,
        recoverWhenFailed: true,
      },
      labelAutoRotate: {
        optionalAngles: [0, 45, 90], // 尝试旋转 0 度、45 度、90 度
        recoverWhenFailed: true, // 如果旋转后无法解决问题，恢复到默认角度
      },
      labelAutoHide: {
        keepHeader: true, // 保留第一个刻度值
        keepTail: true, // 保留最后一个刻度值
      },
    },
  },
});
chart.render();
```

```ts
export interface Transform {
  /** 避免刻度值重叠时的额外边距 */
  margin?: number[];
}

export interface EllipsisOverlapCfg extends Transform {
  type: 'ellipsis';
  /** 缩略替换字符，默认为 ... */
  suffix?: string;
  /** 文本短于该长度时不再缩略 */
  minLength: string | number;
  /** 文本短于该长度时一定会进行缩略 */
  maxLength?: string | number;
  /** 每次缩略执行步长 */
  step?: string | number;
}

export interface RotateOverlapCfg extends Transform {
  type: 'rotate';
  /** 可选的旋转角度值 */
  optionalAngles: number[];
  /** 当旋转无法避免重叠时，是否恢复为默认旋转角度 */
  recoverWhenFailed?: boolean;
}

export interface HideOverlapCfg extends Transform {
  type: 'hide';
  /** 保证第一个刻度值不被隐藏 */
  keepHeader?: boolean;
  /** 保证最后一个刻度值不被隐藏 */
  keepTail?: boolean;
}

export interface WrapOverlapCfg extends Transform {
  type: 'wrap';
  /** 单行最大宽度 */
  wordWrapWidth?: number;
  /** 最大行数 */
  maxLines?: number;
  recoverWhenFailed?: boolean;
}
```

### grid

在不同坐标系下网格线会具有不同的样式

| 场景标签            | 样式                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `直角坐标系`        | <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  |
| `极坐标系`          | <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="100" />  |
| `极坐标系`          | <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="100" />   |
| `极坐标系` `雷达图` | <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="100" /> |

| 属性              | 描述                                                                                                              | 类型                                                              | 默认值    | 必须 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------- | ---- |
| grid              | 是否显示网格线                                                                                                    | `boolean`                                                         | false     |      |
| gridFilter        | 网格线过滤                                                                                                        | `(datum, index, data)=> boolean`                                  | -         |      |
| gridLength        | 网格线长度。一般情况下，不需要用户配置。                                                                          | `number` &#124; `(datum, index, data)=> number`                   | 0         |      |
| gridAreaFill      | 网格线区域填充色                                                                                                  | `string` &#124; `string[]`&#124; `(datum, index, data)=> string`  | -         |      |
| gridStroke        | 网格线描边颜色                                                                                                    | `string` &#124; `(datum, index, data)=> string`                   | -         |      |
| gridStrokeOpacity | 网格线描边透明度                                                                                                  | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridLineWidth     | 网格线描边宽度                                                                                                    | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridLineDash      | 网格线描边虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data)=> [number,number]` | -         |      |
| gridOpacity       | 网格线整体透明度                                                                                                  | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridShadowColor   | 网格线阴影颜色                                                                                                    | `string` &#124; `(datum, index, data)=> string`                   | -         |      |
| gridShadowBlur    | 网格线阴影高斯模糊系数                                                                                            | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridShadowOffsetX | 网格线阴影水平偏移量                                                                                              | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridShadowOffsetY | 网格线阴影垂直偏移量                                                                                              | `number` &#124; `(datum, index, data)=> number`                   | -         |      |
| gridCursor        | 网格线鼠标样式                                                                                                    | `string` &#124; `(datum, index, data)=> string`                   | `default` |      |

#### 网格线配置示例

##### 基础网格线

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { 月份: '1月', 销售额: 2000 },
    { 月份: '2月', 销售额: 1500 },
    { 月份: '3月', 销售额: 3000 },
    { 月份: '4月', 销售额: 2500 },
    { 月份: '5月', 销售额: 4000 },
    { 月份: '6月', 销售额: 3500 },
  ],
  encode: { x: '月份', y: '销售额', color: '月份' },
  axis: {
    y: {
      title: '销售额（万元）',
      // 显示基础网格线
      grid: true,
      gridStroke: '#e6e6e6', // 网格线颜色
      gridLineWidth: 2, // 网格线宽度
      gridStrokeOpacity: 0.7, // 网格线透明度
      gridLineDash: [0, 0],
    },
    x: {
      title: '月份',
      // x 轴通常不需要网格线
      grid: false,
    },
  },
});
chart.render();
```

##### 虚线网格线

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600,
  height: 400,
  data: [
    { 时间: '9:00', 温度: 18 },
    { 时间: '12:00', 温度: 24 },
    { 时间: '15:00', 温度: 28 },
    { 时间: '18:00', 温度: 22 },
    { 时间: '21:00', 温度: 20 },
  ],
  encode: { x: '时间', y: '温度' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: {
    y: {
      title: '温度（°C）',
      grid: true,
      gridStroke: '#d9d9d9',
      gridLineDash: [4, 4], // 虚线配置：4px 实线，4px 空白
      gridStrokeOpacity: 0.8,
    },
    x: {
      title: '时间',
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [2, 2], // 更细的虚线
      gridStrokeOpacity: 0.6,
    },
  },
});
chart.render();
```

##### 带背景填充的网格线

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { 产品: 'A产品', 销量: 120 },
    { 产品: 'B产品', 销量: 200 },
    { 产品: 'C产品', 销量: 150 },
    { 产品: 'D产品', 销量: 300 },
    { 产品: 'E产品', 销量: 250 },
  ],
  encode: { x: '产品', y: '销量', color: '产品' },
  axis: {
    y: {
      title: '销量（件）',
      grid: true,
      gridStroke: '#e8e8e8',
      gridLineWidth: 1,
      gridAreaFill: ['#fafafa', '#ffffff'], // 交替填充颜色
      gridOpacity: 0.9,
    },
    x: {
      title: '产品类型',
      grid: false,
    },
  },
});
chart.render();
```

##### 自定义网格线过滤

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  width: 600,
  height: 400,
  data: [
    { 季度: 'Q1', 收入: 100, 支出: 80 },
    { 季度: 'Q2', 收入: 120, 支出: 90 },
    { 季度: 'Q3', 收入: 150, 支出: 110 },
    { 季度: 'Q4', 收入: 180, 支出: 140 },
  ],
  encode: { x: '季度', y: '收入' },
  style: { fillOpacity: 0.6 },
  axis: {
    y: {
      title: '金额（万元）',
      grid: true,
      gridStroke: '#cccccc',
      gridLineWidth: 1,
      // 只显示偶数索引的网格线
      gridFilter: (datum, index) => index % 2 === 0,
      gridStrokeOpacity: 0.8,
    },
    x: {
      title: '季度',
      grid: true,
      gridStroke: '#e6e6e6',
      gridLineDash: [3, 3],
      gridStrokeOpacity: 0.5,
    },
  },
});
chart.render();
```

### animate

支持设置更新时的动画效果

| 属性    | 描述         | 类型                            | 默认值 | 必须 |
| ------- | ------------ | ------------------------------- | ------ | ---- |
| animate | 是否开启动画 | `boolean` &#124; `EffectTiming` | -      |      |

EffectTiming 支持配置的属性如下：

| 属性     | 描述                           | 类型     | 默认值 | 必须 |
| -------- | ------------------------------ | -------- | ------ | ---- |
| delay    | 延迟执行时间 (ms)              | `number` | -      |      |
| duration | 动画持续时间 (ms)              | `number` | -      |      |
| easing   | 动画的缓动函数                 | `Easing` | -      |      |
| endDelay | 延迟执行时间 (ms)              | `number` | -      |      |
| fill     | 动画处于非运行状态时的展示效果 | `Fill`   | -      |      |

## 事件

坐标轴(axis)组件本身没有专属的事件类型。

## 示例

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval', // 设置图表类型为柱状图
  marginTop: 40, // 设置图表的上边距像素
  data: [
    { id: 1, label: 'x 轴刻度值标签1', value: 200 },
    { id: 3, label: 'x 轴刻度值标签2', value: 300 },
    { id: 4, label: 'x 轴刻度值标签3', value: 400 },
    { id: 5, label: 'x 轴刻度值标签4', value: 500 },
    { id: 6, label: 'x 轴刻度值标签5', value: 600 },
    { id: 7, label: 'x 轴刻度值标签6', value: 700 },
  ],
  // 设置数据编码
  encode: { x: 'label', y: 'value' },
  axis: {
    // 配置 x 轴
    x: {
      position: 'bottom', // 设置坐标轴的位置

      // 这部分是轴标题的配置
      title: 'x 轴标题', // 轴标题内容
      titleFontWeight: 500, // 标题文字字体粗细
      titleSpacing: 15, // 标题到坐标轴的距离
      titlePosition: 'bottom', // 标题相对坐标轴的位置
      titleFontSize: 14, // 标题文字大小
      titleFill: '#333', // 标题文字填充色

      // 这部分是网格线的配置
      grid: true, // 是否显示网格线
      gridLineWidth: 2, // 网格线描边宽度
      gridStroke: '#f0f0f0', // 网格线描边颜色
      gridStrokeOpacity: 0.8, // 网格线描边透明度
      gridLineDash: [3, 3], // 网格线描边虚线配置
      gridOpacity: 0.9, // 网格线整体透明度
      gridAreaFill: ['#fafafa', '#ffffff'], // 网格线区域填充色
      gridFilter: (_, i) => i % 2 === 0, // 网格线过滤

      // 这部分是轴线的配置
      line: true, // 是否显示轴线
      lineLineWidth: 5, // 轴线描边宽度
      lineStroke: '#f50', // 轴线描边颜色
      arrow: true, // 是否显示箭头
      lineArrowOffset: 8, // 箭头偏移长度

      // 这部分是轴刻度的配置
      tick: true, // 是否显示刻度
      tickCount: 8, // 设置推荐生成的刻度数量
      tickLineWidth: 5, // 刻度线描边宽度
      tickLength: 10, // 刻度线长度
      tickStroke: '#3366ff', // 刻度线描边颜色
      tickDirection: 'positive', // 刻度朝向
      tickOpacity: 0.9, // 刻度线整体透明度

      // 这部分是轴刻度值标签的配置
      label: true, // 是否显示刻度值
      labelFontSize: 12, // 刻度标签文字大小
      labelFill: '#009900', // 刻度标签文字填充色
      labelFontWeight: 500, // 刻度标签文字字体粗细
      labelFontFamily: 'Arial', // 刻度标签文字字体
      labelTextAlign: 'center', // 刻度标签文字水平对齐方式
      labelTextBaseline: 'middle', // 刻度标签文字垂直基线
      labelAlign: 'horizontal', // 刻度值对齐方式
      labelDirection: 'positive', // 刻度值位于轴线的位置
      labelSpacing: 5, // 刻度值到其对应刻度的间距
      labelFillOpacity: 0.9, // 刻度标签文字填充透明度
      labelStroke: '#ffffff', // 刻度标签文字描边颜色
      labelStrokeOpacity: 0.5, // 刻度标签文字描边透明度
      labelLineWidth: 1, // 刻度标签文字描边宽度
      labelOpacity: 1, // 刻度标签文字整体透明度
      labelDx: 2, // 刻度标签文字水平偏移量
      labelDy: 0, // 刻度标签文字垂直偏移量
      labelCursor: 'pointer', // 刻度标签文字鼠标样式
    },
    // 配置 y 轴
    y: {
      position: 'left', // 设置坐标轴的位置

      // 这部分是轴标题的配置
      title: 'y 轴标题', // 轴标题内容
      titleFontWeight: 500, // 标题文字字体粗细
      titleSpacing: 20, // 标题到坐标轴的距离
      titlePosition: 'left', // 标题相对坐标轴的位置
      titleFontSize: 14, // 标题文字大小
      titleFill: '#333', // 标题文字填充色

      // 这部分是网格线的配置
      grid: true, // 是否显示网格线
      gridLineWidth: 2, // 网格线描边宽度
      gridStroke: '#e6e6e6', // 网格线描边颜色
      gridStrokeOpacity: 0.7, // 网格线描边透明度
      gridLineDash: [5, 5], // 网格线描边虚线配置
      gridOpacity: 0.8, // 网格线整体透明度

      // 这部分是轴线的配置
      line: true, // 是否显示轴线
      lineLineWidth: 5, // 轴线描边宽度
      lineStroke: '#f50', // 轴线描边颜色
      arrow: false, // 是否显示箭头
      lineOpacity: 1, // 轴线整体透明度

      // 这部分是轴刻度的配置
      tick: true, // 是否显示刻度
      tickCount: 8, // 设置推荐生成的刻度数量
      tickLineWidth: 5, // 刻度线描边宽度
      tickLength: 10, // 刻度线长度
      tickStroke: '#3366ff', // 刻度线描边颜色
      tickDirection: 'negative', // 刻度朝向
      tickStrokeOpacity: 0.8, // 刻度线描边透明度

      // 这部分是轴刻度值标签的配置
      label: true, // 是否显示刻度值
      labelFontSize: 12, // 刻度标签文字大小
      labelFill: '#009900', // 刻度标签文字填充色
      labelFontWeight: 500, // 刻度标签文字字体粗细
      labelFontFamily: 'Helvetica', // 刻度标签文字字体
      labelTextAlign: 'right', // 刻度标签文字水平对齐方式
      labelTextBaseline: 'middle', // 刻度标签文字垂直基线
      labelAlign: 'perpendicular', // 刻度值对齐方式
      labelSpacing: 8, // 刻度值到其对应刻度的间距
      labelLineHeight: 1.2, // 刻度标签文字行高
      labelFormatter: (d) => `${d}万`, // 刻度值格式化
    },
  },
});

chart.render();
```

更多的案例，可以查看 [图表示例 - 坐标轴](/examples/component/axis/#axis-x) 页面。

## 刻度值格式化示例

### 示例 1：金融股票图表格式化

金融数据需要精确的价格显示和简洁的时间轴，常用于股票价格、基金净值等场景：

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600,
  height: 400,
  data: [
    { date: '2024-01-01', price: 23.45, volume: 120000 },
    { date: '2024-01-02', price: 24.12, volume: 150000 },
    { date: '2024-01-03', price: 23.89, volume: 98000 },
    { date: '2024-01-04', price: 25.3, volume: 200000 },
    { date: '2024-01-05', price: 24.78, volume: 175000 },
    { date: '2024-01-08', price: 26.15, volume: 220000 },
  ],
  encode: { x: 'date', y: 'price' },
  style: { stroke: '#ff6b35', lineWidth: 2 },
  axis: {
    x: {
      title: '交易日期',
      // 时间格式化需要自定义函数
      labelFormatter: (d) => {
        const date = new Date(d);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
      },
      labelFontSize: 11,
    },
    y: {
      title: '股价（¥）',
      // 使用 d3-format：固定2位小数
      labelFormatter: '.2f', // 相当于 d.toFixed(2)
      grid: true,
      gridStroke: '#f5f5f5',
      tickCount: 6,
    },
  },
});
chart.render();
```

**D3-format vs 自定义函数对比：**

```js
// ✅ D3-format（推荐用于标准数值格式）
labelFormatter: '.2f'; // 固定2位小数：23.45
labelFormatter: '.1%'; // 百分比：23.4%
labelFormatter: '$,.2f'; // 货币格式：$1,234.56

// ✅ 自定义函数（复杂逻辑、特殊需求）
labelFormatter: (d) => `¥${d.toFixed(2)}`; // 人民币符号
labelFormatter: (d) => {
  /* 复杂业务逻辑 */
};
```

### 示例 2：电商销售数据智能单位转换

销售数据通常涉及大金额，需要自动转换为合适的单位显示。对比 d3-format 和自定义函数的应用场景：

#### 使用 D3-format（国际化标准格式）

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { category: '电子产品', sales: 8500000 },
    { category: '服装鞋帽', sales: 12300000 },
    { category: '家居用品', sales: 6800000 },
    { category: '美妆护肤', sales: 15600000 },
    { category: '食品饮料', sales: 9200000 },
  ],
  encode: { x: 'category', y: 'sales', color: 'category' },
  axis: {
    x: {
      title: '商品类别',
      labelFontSize: 12,
    },
    y: {
      title: '销售额',
      // 使用 d3-format：SI前缀格式，自动K/M单位
      labelFormatter: '~s', // 8.5M, 12.3M, 6.8M, 15.6M, 9.2M
      grid: true,
      gridStroke: '#e8e8e8',
      tickCount: 5,
    },
  },
});
chart.render();
```

#### 使用自定义函数（中文格式）

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart2 = new Chart({
  container: 'container',
});

chart2.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { category: '电子产品', sales: 8500000 },
    { category: '服装鞋帽', sales: 12300000 },
    { category: '家居用品', sales: 6800000 },
    { category: '美妆护肤', sales: 15600000 },
    { category: '食品饮料', sales: 9200000 },
  ],
  encode: { x: 'category', y: 'sales', color: 'category' },
  axis: {
    x: {
      title: '商品类别',
      labelFontSize: 12,
    },
    y: {
      title: '销售额',
      // 自定义中文单位格式
      labelFormatter: (value) => {
        if (value >= 100000000) {
          return `${(value / 100000000).toFixed(1)}亿`;
        } else if (value >= 10000) {
          return `${(value / 10000).toFixed(0)}万`;
        } else {
          return value.toString();
        }
      },
      grid: true,
      gridStroke: '#e8e8e8',
      tickCount: 5,
    },
  },
});
chart2.render();
```

### 示例 3：用户增长数据国际化格式

用户数据通常使用国际标准的 K、M 单位，D3-format 提供了简洁的实现方式：

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  width: 600,
  height: 400,
  data: [
    { quarter: '2023 Q1', users: 125000 },
    { quarter: '2023 Q2', users: 158000 },
    { quarter: '2023 Q3', users: 234000 },
    { quarter: '2023 Q4', users: 312000 },
    { quarter: '2024 Q1', users: 425000 },
    { quarter: '2024 Q2', users: 586000 },
  ],
  encode: { x: 'quarter', y: 'users' },
  style: {
    fill: 'linear-gradient(270deg, #667eea 0%, #764ba2 100%)',
    fillOpacity: 0.6,
  },
  axis: {
    x: {
      title: '季度',
      // 时间字符串处理需要自定义函数
      labelFormatter: (d) => {
        return d.replace('2023 ', '').replace('2024 ', '24');
      },
      labelFontSize: 11,
    },
    y: {
      title: '用户数量',
      // 使用 d3-format：国际标准K/M格式
      labelFormatter: '.0s', // 125k, 158k, 234k, 312k, 425k, 586k
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [3, 3],
      tickCount: 6,
    },
  },
});
chart.render();
```

## 长刻度值标签处理方案详解

在实际业务场景中，经常会遇到坐标轴刻度值过长导致重叠、超出显示范围的问题。G2 提供了四种核心解决方案，各有其最佳适用场景：

### 方案选择指南

| 方案               | 适用场景                                       | 优点                   | 缺点                           | 推荐业务场景                 |
| ------------------ | ---------------------------------------------- | ---------------------- | ------------------------------ | ---------------------------- |
| **缩略(ellipsis)** | 文本长度差异大、用户可通过其他方式获取完整信息 | 保持整洁、不改变布局   | 信息丢失                       | 产品名称、用户 ID、文件名    |
| **旋转(rotate)**   | 文本长度相近、空间充足                         | 保留完整信息、视觉清晰 | 需要更多垂直空间、阅读体验稍差 | 日期时间、地区名称、分类标签 |
| **换行(wrap)**     | 中等长度文本、有充足垂直空间                   | 保留完整信息、易阅读   | 占用更多垂直空间               | 产品描述、部门名称           |
| **隐藏(hide)**     | 标签密度过高、主要关注趋势                     | 解决重叠、保持关键节点 | 信息缺失                       | 时间序列、大数据量可视化     |

### 示例 1：电商产品销量排行榜（缩略方案）

电商平台需要展示热销产品排行，产品名称长短不一，从"iPhone"到"Apple iPhone 15 Pro Max 1TB 深空黑色"

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 650, // 适当减小宽度以触发缩略
  data: [
    { product: 'iPhone 15 Pro Max', sales: 2500 },
    { product: 'Samsung Galaxy S24 Ultra 512GB 幻夜黑色版本', sales: 1800 },
    {
      product: 'Apple MacBook Pro 16英寸 M3 Max芯片 1TB 深空灰色',
      sales: 1200,
    },
    { product: 'Sony WH-1000XM5 无线降噪头戴式耳机 午夜黑色', sales: 3200 },
    { product: '小米14 Ultra 摄影套装版 16GB+1TB 白色限量版', sales: 2100 },
    { product: 'iPad Pro 12.9英寸 M2芯片 1TB WiFi版 深空灰色', sales: 1600 },
    { product: 'MacBook Air 15英寸 M2芯片 512GB 星光色', sales: 1400 },
    { product: 'AirPods Pro 第二代 主动降噪无线耳机', sales: 2800 },
  ],
  encode: { x: 'product', y: 'sales', color: 'product' },
  axis: {
    x: {
      title: '热销产品',
      labelFontSize: 11,
      // 缩略方案：适合产品名称场景
      size: 100,
      transform: [
        {
          type: 'ellipsis',
          suffix: '...', // 缩略符号
        },
      ],
    },
    y: {
      title: '销量（台）',
      labelFormatter: ',.0f', // 千分位格式
      grid: true,
      gridStroke: '#f0f0f0',
    },
  },
  tooltip: {
    // 悬浮时显示完整产品名称
    title: (d) => d.product,
    items: [{ field: 'sales', name: '销量', formatter: ',.0f' }],
  },
});
chart.render();
```

**特点**

- 保持图表整洁，避免产品名称重叠
- 用户可通过 tooltip 查看完整产品名称
- 适合产品名称长短差异很大的场景

### 示例 2：用户活跃度时间分析（旋转方案）

需要展示每小时用户活跃度，时间标签需要显示"YYYY-MM-DD HH:mm"格式

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600, // 减小宽度以触发旋转
  marginBottom: 30, // 预留旋转的空间
  data: [
    { time: '2024-01-15 08:00', activeUsers: 1200 },
    { time: '2024-01-15 09:00', activeUsers: 1800 },
    { time: '2024-01-15 10:00', activeUsers: 2800 },
    { time: '2024-01-15 11:00', activeUsers: 3200 },
    { time: '2024-01-15 12:00', activeUsers: 4500 },
    { time: '2024-01-15 13:00', activeUsers: 4200 },
    { time: '2024-01-15 14:00', activeUsers: 3200 },
    { time: '2024-01-15 15:00', activeUsers: 3600 },
    { time: '2024-01-15 16:00', activeUsers: 3800 },
    { time: '2024-01-15 17:00', activeUsers: 4800 },
    { time: '2024-01-15 18:00', activeUsers: 5200 },
    { time: '2024-01-15 19:00', activeUsers: 4800 },
    { time: '2024-01-15 20:00', activeUsers: 4100 },
    { time: '2024-01-15 21:00', activeUsers: 3500 },
    { time: '2024-01-15 22:00', activeUsers: 2600 },
    { time: '2024-01-15 23:00', activeUsers: 1900 },
  ],
  encode: { x: 'time', y: 'activeUsers' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: {
    x: {
      title: '时间',
      labelFontSize: 10,
      // 旋转方案：适合时间标签
      size: 100,
      transform: [
        {
          type: 'rotate',
          optionalAngles: [0, 30, 45, 60, 90], // 尝试多个角度
          recoverWhenFailed: true, // 失败时恢复默认角度
        },
      ],
    },
    y: {
      title: '活跃用户数',
      labelFormatter: ',.0f',
      grid: true,
      gridStroke: '#e6e6e6',
      gridLineDash: [3, 3],
    },
  },
});
chart.render();
```

**特点**

- 保留完整时间信息，便于精确分析
- 自动选择最佳旋转角度避免重叠
- 适合时间序列、地区名称等固定格式标签

### 示例 3：部门绩效评估（换行方案）

展示各部门季度绩效，部门名称中等长度，需要完整显示

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 800,
  data: [
    { department: '市场营销部门', score: 85 },
    { department: '产品研发中心', score: 92 },
    { department: '客户服务部', score: 78 },
    { department: '人力资源管理部', score: 81 },
    { department: '财务审计部门', score: 89 },
    { department: '战略规划中心', score: 87 },
  ],
  encode: { x: 'department', y: 'score', color: 'department' },
  axis: {
    x: {
      title: '部门',
      labelFontSize: 12,
      // 换行方案：适合部门名称
      size: 100,
      transform: [
        {
          type: 'wrap',
          wordWrapWidth: 60, // 单行最大60像素
          maxLines: 2, // 最多显示2行
          recoverWhenFailed: true, // 换行失败时恢复默认布局
        },
      ],
    },
    y: {
      title: '绩效得分',
      grid: true,
      gridStroke: '#f5f5f5',
      domain: [0, 100],
    },
  },
});
chart.render();
```

**特点**

- 保留完整部门名称，便于准确识别
- 换行布局保持良好的可读性
- 适合中等长度的标签文本

### 示例 4：股票价格大数据趋势（隐藏方案）

展示连续交易日股价趋势，数据点密集，重点关注趋势而非具体日期

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

// 生成模拟股价数据
const generateStockData = () => {
  const data = [];
  let price = 100;
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < 90; i++) {
    // 增加到90个数据点
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // 随机价格波动
    price += (Math.random() - 0.5) * 4;
    price = Math.max(80, Math.min(120, price)); // 限制在80-120范围

    data.push({
      date: currentDate.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  return data;
};

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 700, // 减小宽度增加密度
  marginRight: 30, // 预留右侧保留最后一个刻度值的宽度
  data: generateStockData(),
  encode: { x: 'date', y: 'price' },
  style: { stroke: '#722ed1', lineWidth: 1.5 },
  axis: {
    x: {
      title: '交易日期',
      labelFontSize: 9,
      // 隐藏方案：适合密集数据
      size: 100,
      transform: [
        {
          type: 'hide',
          keepHeader: true, // 保留第一个日期
          keepTail: true, // 保留最后一个日期
        },
      ],
    },
    y: {
      title: '股价（元）',
      labelFormatter: '.2f',
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [2, 2],
    },
  },
});
chart.render();
```

**特点**

- 解决密集数据点的标签重叠问题
- 保留首尾关键时间节点
- 重点突出数据趋势而非具体数值

### 示例 5 快捷配置（ 推荐 ）

对于简单场景，推荐使用 `labelAutoXXX` 系列属性：

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 650, // 减小宽度以触发变换效果
  marginBottom: 50, // 为多重变换预留空间
  marginRight: 100,
  data: [
    { region: '北京市朝阳区CBD核心商务区金融中心', revenue: 8500 },
    { region: '上海市浦东新区陆家嘴金融贸易区总部基地', revenue: 9200 },
    { region: '深圳市南山区高新技术产业园区', revenue: 7800 },
    { region: '广州市天河区珠江新城国际商务中心', revenue: 6900 },
    { region: '杭州市西湖区互联网创新产业园区', revenue: 5600 },
    { region: '成都市高新区软件产业园科技创新区', revenue: 4800 },
    { region: '苏州市工业园区生物纳米科技园', revenue: 5200 },
    { region: '南京市江宁区未来科技城创新基地', revenue: 4500 },
  ],
  encode: { x: 'region', y: 'revenue', color: 'region' },
  axis: {
    x: {
      title: '业务区域',
      labelFontSize: 10,
      size: 100,
      // 快捷配置，等价于 transform 数组
      labelAutoEllipsis: true, // 启用自动缩略
      labelAutoRotate: true, // 启用自动旋转
      labelAutoHide: true, // 启用自动隐藏
      labelAutoWrap: true, // 启用自动换行
    },
    y: {
      title: '营收（万元）',
      labelFormatter: ',.0f',
      grid: true,
      gridStroke: '#e8e8e8',
    },
  },
});
chart.render();
```
