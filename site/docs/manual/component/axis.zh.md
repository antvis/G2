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

![构成元素](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DnhUSZbue48AAAAAAAAAAAAAemJ7AQ/original)

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
// Functional API
// 第一种方式（不推荐）
chart
  .interval()
  .axis('x', { labelFormatter: '%0' })
  .axis('y', { tickCount: 5 });

// Spec API
// 第二种方式（推荐）
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
// Functional API
// 第一种方式（不推荐）
chart.axis('x', { labelFormatter: '%0' }).axis('y', { tickCount: 5 });

// Spec API
// 第二种方式（推荐）
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

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    marginTop: 40,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    axis: {
      y: {
        // Title
        title: 'Frequency',
        titleSpacing: 30,
        titleFill: 'steelblue',

        // Line
        line: true,
        arrow: true,
        lineArrowOffset: 10,
        lineArrowSize: 30,
        lineLineWidth: 10,

        // Tick
        tickLength: 20,
        tickFilter: (_, i) => i % 3 !== 0,

        // Label
        labelFormatter: '.0%',

        // Grid
        gridLineDash: null,
        gridStroke: 'red',
        gridStrokeWidth: 5,
        gridAreaFill: '#eee',
      },
      x: {
        title: 'Letter',
        labelFormatter: (d) => d.repeat(3),
        labelFontSize: 30,
        labelSpacing: 30,
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 选项

### 标题

| 属性               | 描述                                                           | 类型                                                         | 默认值 |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| title              | 关闭标题或设置标题内容                                         | `false`&#124;`string` &#124; `number` &#124; `DisplayObject` | -      |
| titleSpacing       | 标题到坐标轴的距离                                             | `number`                                                     | 10     |
| titlePosition      | 标题相对坐标轴的位置，支持首字母简写形式，如`'top'`简写为`'t'` | `'top'`&#124;`'bottom'`&#124;`'left'`&#124;`'right'`         | `'lb'` |
| titleFontSize      | 标题文字大小                                                   | `number`                                                     | -      |
| titleFontFamily    | 标题文字字体                                                   | `string`                                                     | -      |
| titleFontWeight    | 标题字体粗细                                                   | `number`                                                     | -      |
| titleStroke        | 标题字体颜色                                                   | `string`                                                     | -      |
| titleStrokeOpacity | 标题透明度                                                     | `number`                                                     | -      |

### 轴线

| 属性              | 描述                                                                                                              | 类型               | 默认值 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| line              | 是否显示轴线                                                                                                      | `boolean`          | true   |
| arrow             | 是否显示箭头                                                                                                      | `boolean`          | true   |
| lineExtension     | 轴线两侧的延长线                                                                                                  | `[number, number]` | -      |
| lineArrow         | 定义轴线箭头形状，默认为箭头形状                                                                                  | `DisplayObject`    | -      |
| lineArrowOffset   | 箭头偏移长度                                                                                                      | `number`           | 15     |
| lineArrowSize     | 箭头尺寸                                                                                                          | `number`           | -      |
| lineLineWidth     | 轴线宽度                                                                                                          | `number`           | -      |
| lineLineDash      | 轴线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`  | -      |
| lineStroke        | 轴线描边色                                                                                                        | `string`           | -      |
| lineStrokeOpacity | 轴线描边色透明度                                                                                                  | `number`           | -      |

### 刻度

| 属性              | 描述                                                                                                                | 类型                                                                     | 默认值     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------- |
| tick              | 是否显示刻度                                                                                                        | `boolean`                                                                | true       |
| tickFilter        | 刻度线过滤                                                                                                          | `(datum, index, data)=>boolean`                                          | -          |
| tickFormatter     | 刻度线格式化，可用于自定义刻度样式，回调函数中会额外返回该刻度的方向                                                | `DisplayObject` &#124; `(datum, index, data, Vector)=> DisplayObject`    | -          |
| tickDirection     | 刻度朝向，为 `positive` 时，位于侧轴方向（即主轴顺时针 90 度方向）, 为 `negative` 时，刻度位于侧轴负方向            | `'positive'` &#124; `'negative'`                                         | 'positive' |
| tickLength        | 刻度线长度                                                                                                          | `number`&#124;`(datum, index, data)=>number`                             | 15         |
| tickLineWidth     | 刻度线宽度                                                                                                          | `number` &#124; `(datum, index, data, Vector)=>number`                   | -          |
| tickLineDash      | 刻度线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data, Vector)=>[number,number]` | -          |
| tickStroke        | 刻度线颜色                                                                                                          | `string` &#124; `(datum, index, data, Vector)=>string`                   | -          |
| tickStrokeOpacity | 刻度线透明度                                                                                                        | `number` &#124; `(datum, index, data, Vector)=>number`                   | -          |

### 刻度值

| 属性               | 描述                                                                                                                | 类型                                                                  | 默认值     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------- |
| label              | 是否显示刻度值                                                                                                      | `boolean`                                                             | -          |
| labelOpacity       | 刻度值透明度                                                                                                        | `number` &#124; `(datum, index, data)=>number`                        | -          |
| labelFilter        | 刻度值过滤                                                                                                          | `(datum, index, data)=> boolean`                                      | -          |
| labelFormatter     | 刻度值线格式化                                                                                                      | `DisplayObject` &#124; `(datum, index, data, Vector)=> DisplayObject` | -          |
| transform          | 刻度值转换，避免文本之间发生重叠。当前支持超长文本缩略、重叠刻度值隐藏、自动旋转                                    | `Transform[]`                                                         | -          |
| labelAutoHide      | 自动隐藏重叠的刻度值，设置 size 值的时候生效                                                                        | `boolean` &#124; `HideOverlapCfg`                                     | -          |
| labelAutoRotate    | 自动旋转刻度，设置 size 值的时候生效值                                                                              | `boolean` &#124; `RotateOverlapCfg`                                   | -          |
| labelAutoEllipsis  | 自动缩略刻度值，设置 size 值的时候生效                                                                              | `boolean` &#124; `EllipsisOverlapCfg`                                 | -          |
| labelAutoWrap      | 自动换行刻度值，设置 size 值的时候是生效                                                                            | `boolean` &#124; `WrapOverlapCfg`                                     | -          |
| labelAlign         | 刻度值对齐方式<br/>- 'horizontal' 始终保持水平<br/> - 'parallel' 平行于坐标轴<br/> - 'perpendicular' 垂直于坐标轴   | `'horizontal'` &#124; `'parallel'` &#124; `'perpendicular'`           | 'parallel' |
| labelDirection     | 刻度值位于轴线的位置，参考`tickDirection`                                                                           | `'positive'` &#124; `'negative'`                                      | 'positive' |
| labelSpacing       | 刻度值到其对应刻度的间距                                                                                            | `number`                                                              | 0          |
| labelLineWidth     | 刻度值宽度                                                                                                          | `number` &#124;`(datum, index, data)=>number`                         | -          |
| labelLineDash      | 刻度值描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` &#124; `(datum, index, data)=>[number, number]`     | -          |
| labelFontSize      | 刻度值文字大小                                                                                                      | `number` &#124; `(datum, index, data)=>number`                        | -          |
| labelFontFamily    | 刻度值文字字体                                                                                                      | `string` &#124; `(datum, index, data)=>string`                        | -          |
| labelFontWeight    | 刻度值字体粗细                                                                                                      | `number` &#124;`(datum, index, data)=>number`                         | -          |
| labelFill          | 刻度值字体颜色                                                                                                      | `string` &#124; `(datum, index, data)=>string`                        | -          |
| labelFillOpacity   | 刻度值文本透明度                                                                                                    | `number` &#124; `(datum, index, data)=>number`                        | -          |
| labelStroke        | 刻度值文本描边颜色                                                                                                  | `string` &#124; `(datum, index, data)=>string`                        | -          |
| labelStrokeOpacity | 刻度值文本描边透明度                                                                                                | `number` &#124; `(datum, index, data)=>number`                        | -          |

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

### 网格线

在不同坐标系下网格线会具有不同的样式

| 场景标签            | 样式                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `直角坐标系`        | <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  |
| `极坐标系`          | <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="100" />  |
| `极坐标系`          | <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="100" />   |
| `极坐标系` `雷达图` | <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="100" /> |

| 属性              | 描述                                                                                                                | 类型                                                             | 默认值 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| grid              | 是否显示网格线                                                                                                      | `boolean`                                                        | false  |
| gridFilter        | 网格线过滤                                                                                                          | `(datum, index, data)=> boolean`                                 | -      |
| gridLength        | 网格线长度。一般情况下，不需要用户配置。                                                                            | `number` &#124; `(datum, index, data)=> number`                  | 0      |
| gridAreaFill      | 网格线区域颜色                                                                                                      | `string` &#124; `string[]`&#124; `(datum, index, data)=> string` | -      |
| gridLineWidth     | 网格线宽度                                                                                                          | `number`                                                         | -      |
| gridLineDash      | 网格线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`                                                | -      |
| gridStroke        | 网格线颜色                                                                                                          | `string`                                                         | -      |
| gridStrokeOpacity | 网格线透明度                                                                                                        | `number`                                                         | -      |

### 动画

支持设置更新时的动画效果

| 属性    | 描述         | 类型                            | 默认值 |
| ------- | ------------ | ------------------------------- | ------ |
| animate | 是否开启动画 | `boolean` &#124; `EffectTiming` | -      |

EffectTiming 支持配置的属性如下：

| 属性     | 描述                           | 类型     | 默认值 |
| -------- | ------------------------------ | -------- | ------ |
| delay    | 延迟执行时间 (ms)              | `number` | -      |
| duration | 动画持续时间 (ms)              | `number` | -      |
| easing   | 动画的缓动函数                 | `Easing` | -      |
| endDelay | 延迟执行时间 (ms)              | `number` | -      |
| fill     | 动画处于非运行状态时的展示效果 | `Fill`   | -      |

## 示例

更多的案例，可以查看 [图表示例 - 坐标轴](/examples/component/axis/#axis-x) 页面。
