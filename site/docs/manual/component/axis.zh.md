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

### title

| 属性               | 描述                                                           | 类型                                                         | 默认值        | 必须 |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | ---- |
| title              | 关闭标题或设置标题内容                                         | `false`&#124;`string` &#124; `number` &#124; `DisplayObject` | -             |      |
| titleSpacing       | 标题到坐标轴的距离                                             | `number` &#124; `(datum, index, data) => number`             | 10            |      |
| titlePosition      | 标题相对坐标轴的位置，支持首字母简写形式，如`'top'`简写为`'t'` | `'top'`&#124;`'bottom'`&#124;`'left'`&#124;`'right'`         | `'lb'`        |      |
| titleFontSize      | 标题文字大小                                                   | `number` &#124; `(datum, index, data) => number`             | -             |      |
| titleFontWeight    | 标题的字体粗细                                                 | `string` &#124; `(datum, index, data) => string`             | -             |      |
| titleFontFamily    | 标题文字字体                                                   | `number` &#124; `(datum, index, data) => number`             | -             |      |
| titleStroke        | 标题字体颜色                                                   | `string` &#124; `(datum, index, data) => string`             | -             |      |
| titleStrokeOpacity | 标题透明度                                                     | `number` &#124; `(datum, index, data) => number`             | -             |      |
| titleTextBaseline  | 标题垂直基线                                                   | `string` &#124; `(datum, index, data) => string`             | `middle`      |      |
| titleFillOpacity   | 标题填充透明度                                                 | `number` &#124; `(datum, index, data) => number`             | 1             |      |
| titleStroke        | 标题描边颜色                                                   | `string` &#124; `(datum, index, data) => string`             | `transparent` |      |
| titleStrokeOpacity | 标题描边透明度                                                 | `number` &#124; `(datum, index, data) => number`             | 1             |      |
| titleLineHeight    | 标题行高                                                       | `number` &#124; `(datum, index, data) => number`             | 1             |      |
| titleLineWidth     | 标题描边宽度                                                   | `number` &#124; `(datum, index, data) => number`             | 0             |      |
| titleLineDash      | 标题虚线样式                                                   | `number[]` &#124; `(datum, index, data) => number[]`         | []            |      |
| titleOpacity       | 标题整体透明度                                                 | `number` &#124; `(datum, index, data) => number`             | 1             |      |
| titleShadowColor   | 标题阴影颜色                                                   | `string` &#124; `(datum, index, data) => string`             | `transparent` |      |
| titleShadowBlur    | 标题阴影模糊度                                                 | `number` &#124; `(datum, index, data) => number`             | 0             |      |
| titleShadowOffsetX | 标题阴影 X 偏移                                                | `number` &#124; `(datum, index, data) => number`             | 0             |      |
| titleShadowOffsetY | 标题阴影 Y 偏移                                                | `number` &#124; `(datum, index, data) => number`             | 0             |      |
| titleCursor        | 标题鼠标样式                                                   | `string` &#124; `(datum, index, data) => string`             | `default`     |      |

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
      titleFill: 'steelblue', // 设置 y 轴标题的颜色
    },
    // 配置 x 轴
    x: {
      // 这部分是轴标题的配置
      title: 'Letter', // 设置 x 轴标题
    },
  },
});
```

### line

| 属性              | 描述                                                                                                              | 类型                                             | 默认值 | 必须 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ | ---- |
| line              | 是否显示轴线                                                                                                      | `boolean`                                        | false  |      |
| arrow             | 是否显示箭头                                                                                                      | `boolean`                                        | true   |      |
| lineExtension     | 轴线两侧的延长线                                                                                                  | `[number, number]`                               | -      |      |
| lineArrow         | 定义轴线箭头形状，默认为箭头形状                                                                                  | `DisplayObject`                                  | -      |      |
| lineArrowOffset   | 箭头偏移长度                                                                                                      | `number`                                         | 15     |      |
| lineArrowSize     | 箭头尺寸                                                                                                          | `number`                                         | -      |      |
| lineLineWidth     | 轴线宽度                                                                                                          | `number` &#124; `(datum, index, data) => number` | -      |      |
| lineLineDash      | 轴线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`                                | -      |      |
| lineOpacity       | 轴线整体透明度                                                                                                    | `number`                                         | 1      |      |
| lineStroke        | 轴线描边色                                                                                                        | `string`                                         | -      |      |
| lineStrokeOpacity | 轴线描边色透明度                                                                                                  | `number`                                         | -      |      |

> 配置方式

```ts
({
  axis: {
    x: {
      line: true, // 是否显示轴线
      arrow: true, // 是否显示箭头
      lineArrowOffset: 10, // 箭头偏移长度
      lineArrowSize: 30, // 箭头尺寸
      lineLineWidth: 10, // 轴线宽度
    },
    y: {
      line: true, // 是否显示轴线
      arrow: true, // 是否显示箭头
      lineArrowOffset: 10, // 箭头偏移长度
      lineArrowSize: 30, // 箭头尺寸
      lineLineWidth: 10, // 轴线宽度
    },
  },
});
```

### tick

| 属性              | 描述                                                                                                                | 类型                                                                     | 默认值     | 必须 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------- | ---- |
| tick              | 是否显示刻度                                                                                                        | `boolean`                                                                | true       |      |
| tickFilter        | 刻度线过滤                                                                                                          | `(datum, index, data)=>boolean`                                          | -          |      |
| tickFormatter     | 刻度线格式化，可用于自定义刻度样式，回调函数中会额外返回该刻度的方向                                                | `DisplayObject` &#124; `(datum, index, data, Vector)=> DisplayObject`    | -          |      |
| tickDirection     | 刻度朝向，为 `positive` 时，位于侧轴方向（即主轴顺时针 90 度方向）, 为 `negative` 时，刻度位于侧轴负方向            | `'positive'` &#124; `'negative'`                                         | `positive` |
| tickLength        | 刻度线长度                                                                                                          | `number`&#124;`(datum, index, data)=>number`                             | 15         |      |
| tickLineWidth     | 刻度线宽度                                                                                                          | `number` &#124; `(datum, index, data, Vector)=>number`                   | -          |      |
| tickLineDash      | 刻度线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data, Vector)=>[number,number]` | -          |      |
| tickStroke        | 刻度线颜色                                                                                                          | `string` &#124; `(datum, index, data, Vector)=>string`                   | -          |      |
| tickStrokeOpacity | 刻度线透明度                                                                                                        | `number` &#124; `(datum, index, data, Vector)=>number`                   | -          |      |

```ts
({
  // 配置坐标轴
  axis: {
    y: {
      tickLength: 20, // 设置 y 轴刻度线的长度
      tickFilter: (_, i) => i % 3 !== 0, // 过滤 y 轴刻度线，只显示每隔 3 个刻度线
    },
  },
});
```

### label

| 属性               | 描述                                                                                                                | 类型                                                                  | 默认值     | 必须 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------- | ---- |
| label              | 是否显示刻度值                                                                                                      | `boolean`                                                             | -          |      |
| labelFontSize      | 刻度值文字大小                                                                                                      | `number` &#124; `(datum, index, data)=>number`                        | -          |      |
| labelOpacity       | 刻度值透明度                                                                                                        | `number` &#124; `(datum, index, data)=>number`                        | -          |      |
| labelFontWeight    | 刻度值字体粗细                                                                                                      | `number` &#124;`(datum, index, data)=>number`                         | -          |      |
| labelFontFamily    | 刻度值文字字体                                                                                                      | `string` &#124; `(datum, index, data)=>string`                        | -          |      |
| labelAlign         | 刻度值对齐方式<br/>- 'horizontal' 始终保持水平<br/> - 'parallel' 平行于坐标轴<br/> - 'perpendicular' 垂直于坐标轴   | `'horizontal'` &#124; `'parallel'` &#124; `'perpendicular'`           | `parallel` |      |
| labelFilter        | 刻度值过滤                                                                                                          | `(datum, index, data)=> boolean`                                      | -          |      |
| labelFormatter     | 刻度值线格式化                                                                                                      | `DisplayObject` &#124; `(datum, index, data, Vector)=> DisplayObject` | -          |      |
| transform          | 刻度值转换，避免文本之间发生重叠。当前支持超长文本缩略、重叠刻度值隐藏、自动旋转                                    | `Transform[]`                                                         | -          |      |
| labelAutoHide      | 自动隐藏重叠的刻度值，设置 size 值的时候生效                                                                        | `boolean` &#124; `HideOverlapCfg`                                     | -          |      |
| labelAutoRotate    | 自动旋转刻度，设置 size 值的时候生效值                                                                              | `boolean` &#124; `RotateOverlapCfg`                                   | -          |      |
| labelAutoEllipsis  | 自动缩略刻度值，设置 size 值的时候生效                                                                              | `boolean` &#124; `EllipsisOverlapCfg`                                 | -          |      |
| labelAutoWrap      | 自动换行刻度值，设置 size 值的时候是生效                                                                            | `boolean` &#124; `WrapOverlapCfg`                                     | -          |      |
| labelDirection     | 刻度值位于轴线的位置，参考`tickDirection`                                                                           | `'positive'` &#124; `'negative'`                                      | `positive` |      |
| labelSpacing       | 刻度值到其对应刻度的间距                                                                                            | `number`                                                              | 0          |      |
| labelLineWidth     | 刻度值宽度                                                                                                          | `number` &#124;`(datum, index, data)=>number`                         | -          |      |
| labelLineDash      | 刻度值描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data)=>[number, number]`     | -          |      |
| labelFill          | 刻度值字体颜色                                                                                                      | `string` &#124; `(datum, index, data)=>string`                        | -          |      |
| labelFillOpacity   | 刻度值文本透明度                                                                                                    | `number` &#124; `(datum, index, data)=>number`                        | -          |      |
| labelStroke        | 刻度值文本描边颜色                                                                                                  | `string` &#124; `(datum, index, data)=>string`                        | -          |      |
| labelStrokeOpacity | 刻度值文本描边透明度                                                                                                | `number` &#124; `(datum, index, data)=>number`                        | -          |      |

`labelFormatter` 视觉通道用于调整标签的格式。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

`transform` 为了避免刻度标签重叠或超出显示范围，系统提供了多种优化方式，包括缩略、旋转、隐藏和换行。
这些功能可通过两种方式配置：

1. `transform` 数组（多策略组合）
2. `labelAutoXXX` 系列属性（单策略快捷配置）`推荐`

两者的核心功能完全一致，区别在于使用场景和配置方式。

> 1. `transform` 数组（多策略组合）

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    width: 500,
    height: 500,
    data: [
      { id: 1, label: 'x 轴标签1', value: 200 },
      { id: 3, label: 'x 轴标签2', value: 300 },
      { id: 4, label: 'x 轴标签3', value: 400 },
      { id: 5, label: 'x 轴标签4', value: 500 },
      { id: 6, label: 'x 轴标签5', value: 600 },
      { id: 7, label: 'x 轴标签6', value: 700 },
      { id: 8, label: 'x 轴标签999', value: 800 },
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

  return chart.getContainer();
})();
```

> 2. 使用 `labelAutoHide`、`labelAutoRotate`、`labelAutoEllipsis`、`labelAutoWrap`、 属性（需设置 `size`）

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    width: 500,
    height: 500,
    data: [
      { id: 1, label: 'x 轴标签1', value: 200 },
      { id: 3, label: 'x 轴标签2', value: 300 },
      { id: 4, label: 'x 轴标签3', value: 400 },
      { id: 5, label: 'x 轴标签4', value: 500 },
      { id: 6, label: 'x 轴标签5', value: 600 },
      { id: 7, label: 'x 轴标签6', value: 700 },
      { id: 8, label: 'x 轴标签999', value: 800 },
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

  return chart.getContainer();
})();
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

| 属性              | 描述                                                                                                                | 类型                                                             | 默认值 | 必须 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ | ---- |
| grid              | 是否显示网格线                                                                                                      | `boolean`                                                        | false  |      |
| gridFilter        | 网格线过滤                                                                                                          | `(datum, index, data)=> boolean`                                 | -      |      |
| gridLength        | 网格线长度。一般情况下，不需要用户配置。                                                                            | `number` &#124; `(datum, index, data)=> number`                  | 0      |      |
| gridAreaFill      | 网格线区域颜色                                                                                                      | `string` &#124; `string[]`&#124; `(datum, index, data)=> string` | -      |      |
| gridLineWidth     | 网格线宽度                                                                                                          | `number`                                                         | -      |      |
| gridLineDash      | 网格线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`                                                | -      |      |
| gridStroke        | 网格线颜色                                                                                                          | `string`                                                         | -      |      |
| gridStrokeOpacity | 网格线透明度                                                                                                        | `number`                                                         | -      |      |

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

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval', // 设置图表类型为柱状图
    marginTop: 40, // 设置图表的上边距像素
    data: [
      { id: 1, label: 'x 轴标签1', value: 200 },
      { id: 3, label: 'x 轴标签2', value: 300 },
      { id: 4, label: 'x 轴标签3', value: 400 },
      { id: 5, label: 'x 轴标签4', value: 500 },
      { id: 6, label: 'x 轴标签5', value: 600 },
      { id: 7, label: 'x 轴标签6', value: 700 },
    ],
    // 设置数据编码
    encode: { x: 'label', y: 'value' },
    axis: {
      // 配置 x 轴
      x: {
        position: 'bottom', // 设置坐标轴的位置

        // 这部分是轴标题的配置
        title: 'x 轴标题', // 轴标题内容
        titleFontWeight: 500, // 轴标题的字体粗细

        // 这部分是网格线的配置
        grid: true, // 是否显示网格线
        gridLineWidth: 2, // 网格线宽度

        // 这部分是轴线的配置
        line: true, // 是否显示轴线
        lineLineWidth: 5, // 轴线宽度
        lineStroke: '#f50', // 轴线描边色

        // 这部分是轴刻度的配置
        tick: true, // 是否显示刻度
        tickLineWidth: 5, // 刻度线宽度
        tickLength: 10, // 刻度线长度
        tickStroke: '#3366ff', // 刻度线颜色

        // 这部分是轴标签的配置
        label: true, // 是否显示刻度值
        labelFontSize: 12, // 刻度值文字大小
        labelFill: '#009900', // 刻度值字体颜色
        labelFontWeight: 500, // 刻度值字体粗细
      },
      // 配置 y 轴
      y: {
        position: 'left', // 设置坐标轴的位置

        // 这部分是轴标题的配置
        title: 'y 轴标题', // 轴标题内容
        titleFontWeight: 500, // 轴标题的字体粗细

        // 这部分是网格线的配置
        grid: true, // 是否显示网格线
        gridLineWidth: 2, // 网格线宽度

        // 这部分是轴线的配置
        line: true, // 是否显示轴线
        lineLineWidth: 5, // 轴线宽度
        lineStroke: '#f50', // 轴线描边色

        // 这部分是轴刻度的配置
        tick: true, // 是否显示刻度
        tickLineWidth: 5, // 刻度线宽度
        tickLength: 10, // 刻度线长度
        tickStroke: '#3366ff', // 刻度线颜色

        // 这部分是轴标签的配置
        label: true, // 是否显示刻度值
        labelFontSize: 12, // 刻度值文字大小
        labelFill: '#009900', // 刻度值字体颜色
        labelFontWeight: 500, // 刻度值字体粗细
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看 [图表示例 - 坐标轴](/examples/component/axis/#axis-x) 页面。
