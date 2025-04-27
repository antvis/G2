---
title: gauge
order: 8
---

## 概述

`gauge` 用于创建仪表盘，它是一种常见的可视化图表，用于展示数据的进度、比例或比较情况。

典型应用场景：

- 业务指标：销售额达成率、用户增长进度；
- 系统监控：CPU/内存使用率、磁盘容量预警；
- 设备仪表：车辆时速表、温度计模拟。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'gauge', // 设置图表的类型为仪表盘
    data: {
      value: {
        target: 120, // 仪表盘的目标值
        total: 400, // 仪表盘的总值
        name: 'score', // 仪表盘数据的名称
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 选项

| 属性   | 描述                                                                                       | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------ | ----------------- | ------ | ---- |
| data   | 定义仪表盘的数值、目标值及分类信息，通过数据绑定驱动表盘指针位置、颜色映射及多仪表分面展示 | [data](#data)     | -      | ✓    |
| encode | 配置 `gauge` 标记的视觉通道，包括`x`、`y`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      |      |
| scale  | 配置 `gauge` 标记的比例尺，包括`y`、`size`等                                               | [scale](#scale)   | -      |      |
| style  | 配置图形样式和标签样式                                                                     | [style](#style)   | -      |      |

### data

`data`定义仪表盘的数值、目标值及分类信息，通过数据绑定驱动表盘指针位置、颜色映射及多仪表分面展示。

| 属性       | 描述                                                                                                                      | 类型       | 默认值 | 必选 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | ---- |
| target     | 设置仪表盘指针的目标值                                                                                                    | `number`   | -      |      |
| total      | 设置仪表盘刻度的最大范围值                                                                                                | `number`   | -      |      |
| percent    | 设置仪表盘指针指向的百分比(配置`percent`时，`target`、`total`值会失效，`thresholds`请设置在合理区间，否则会造成渲染错误 ) | `number`   | -      |      |
| thresholds | 设置仪表盘刻度阈值区间                                                                                                    | `number[]` | -      |      |

更多的`data`配置，可以查查看 [data](/manual/core/data/overview) 介绍页面。

### encode

配置 `gauge` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性  | 描述                                                                                                                 | 类型                          | 默认值    | 必选 |
| ----- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- | ---- |
| x     | 绑定 `gauge` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                               | [encode](/manual/core/encode) | `'x'`     |      |
| y     | 绑定 `gauge` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                   | [encode](/manual/core/encode) | `'y'`     |      |
| color | 绑定 `gauge` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | `'color'` |      |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### scale

`scale`用于定义数据如何映射到视觉属性（如颜色、大小、形状等）。

| 属性  | 描述                                  | 类型                                 | 默认值                               | 必选 |
| ----- | ------------------------------------- | ------------------------------------ | ------------------------------------ | ---- |
| y     | 定义数据字段到 Y 轴视觉位置的映射规则 | [scale](/manual/core/scale/overview) | `{domain: [0, percent ? 1 : total]}` |      |
| color | 定义仪表盘刻度颜色的映射规则          | [scale](/manual/core/scale/overview) | `{range: ['#30BF78', '#D0D0D0']}`    |      |

#### color

颜色的分布与 data 中的数据相关。这里的颜色可以设置为渐变色，用于配置渐变色的仪表盘。

- 只有`target`或者`percent`，`color`参数`range`可以由两个颜色参数组成，在仪表盘刻度会由这两个颜色将会将仪表盘刻度分成两段

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'gauge',
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    },
    scale: {
      color: { range: ['#FAAD14', 'green'] },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

- 设置了`thresholds`，`color`参数`range`的颜色与`thresholds`的长度一致，仪表盘刻度会被`thresholds`中的值分段，并填充`scale`参数`color`对应位置的色彩

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'gauge',
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
        thresholds: [100, 200, 400],
      },
    },
    scale: {
      color: { range: ['#F4664A', '#FAAD14', 'green'] },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### style

`style` 用于设置图表元素的外观样式，包括填充颜色、边框样式、阴影效果等。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*L2ajRK5KsBkAAAAAAAAAAAAAemJ7AQ/original" width=600/>

| 属性    | 描述                     | 类型                | 默认值                   | 必选 |
| ------- | ------------------------ | ------------------- | ------------------------ | ---- |
| arc     | 配置仪表盘圆弧的样式     | [arc](#arc)         | 详见 [arc](#arc)         |      |
| pin     | 配置仪表盘指针轴心的样式 | [pin](#pin)         | 详见 [pin](#pin)         |      |
| pointer | 配置仪表盘指针的样式     | [pointer](#pointer) | 详见 [pointer](#pointer) |      |
| text    | 配置仪表盘中心文字的样式 | [text](#text)       | 详见 [text](#text)       |      |

复合图形标记需要通过不同的前缀来区分图形的配置。

#### arc

通过 `arc` 前缀配置仪表盘圆弧的样式。

| 属性             | 描述                   | 类型                                                         | 默认值    | 必选 |
| ---------------- | ---------------------- | ------------------------------------------------------------ | --------- | ---- |
| arcShape         | 仪表盘圆弧形状         | `'rect'` \|`'hollow'`\|`'round'`                             | `'rect'`  |      |
| arcFill          | 仪表盘圆弧填充颜色     | string \| (datum, index, data) => string                     | -         |      |
| arcFillOpacity   | 仪表盘圆弧填充透明度   | number \| (datum, index, data) => number                     | -         |      |
| arcStroke        | 仪表盘圆弧描边颜色     | string \| (datum, index, data) => string                     | -         |      |
| arcStrokeOpacity | 仪表盘圆弧描边透明度   | number \| (datum, index, data) => number                     | -         |      |
| arcLineHeight    | 仪表盘圆弧行高         | number \| (datum, index, data) => number                     | -         |      |
| arcLineWidth     | 仪表盘圆弧描边宽度     | number \| (datum, index, data) => number                     | -         |      |
| arcLineDash      | 仪表盘圆弧虚线配置     | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| arcOpacity       | 仪表盘圆弧整体透明度   | number \| (datum, index, data) => number                     | -         |      |
| arcShadowColor   | 仪表盘圆弧阴影颜色     | string \| (datum, index, data) => string                     | -         |      |
| arcShadowBlur    | 仪表盘圆弧阴影模糊系数 | number \| (datum, index, data) => number                     | -         |      |
| arcShadowOffsetX | 仪表盘圆弧阴影水平偏移 | number \| (datum, index, data) => number                     | -         |      |
| arcShadowOffsetY | 仪表盘圆弧阴影垂直偏移 | number \| (datum, index, data) => number                     | -         |      |
| arcCursor        | 仪表盘圆弧鼠标样式     | string \| (datum, index, data) => string                     | `default` |      |

#### pin

通过 `pin` 前缀配置仪表盘指针轴心的样式。

| 属性             | 描述                       | 类型                                                         | 默认值    | 必选 |
| ---------------- | -------------------------- | ------------------------------------------------------------ | --------- | ---- |
| pinR             | 仪表盘指针轴心半径大小     | number \| (datum, index, data) => number                     | `10`      |      |
| pinFill          | 仪表盘指针轴心填充颜色     | string \| (datum, index, data) => string                     | `'#fff'`  |      |
| pinFillOpacity   | 仪表盘指针轴心填充透明度   | number \| (datum, index, data) => number                     | -         |      |
| pinStroke        | 仪表盘指针轴心描边颜色     | string \| (datum, index, data) => string                     | -         |      |
| pinStrokeOpacity | 仪表盘指针轴心描边透明度   | number \| (datum, index, data) => number                     | -         |      |
| pinLineHeight    | 仪表盘指针轴心行高         | number \| (datum, index, data) => number                     | -         |      |
| pinLineWidth     | 仪表盘指针轴心描边宽度     | number \| (datum, index, data) => number                     | -         |      |
| pinLineDash      | 仪表盘指针轴心虚线配置     | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| pinOpacity       | 仪表盘指针轴心整体透明度   | number \| (datum, index, data) => number                     | -         |      |
| pinShadowColor   | 仪表盘指针轴心阴影颜色     | string \| (datum, index, data) => string                     | -         |      |
| pinShadowBlur    | 仪表盘指针轴心阴影模糊系数 | number \| (datum, index, data) => number                     | -         |      |
| pinShadowOffsetX | 仪表盘指针轴心阴影水平偏移 | number \| (datum, index, data) => number                     | -         |      |
| pinShadowOffsetY | 仪表盘指针轴心阴影垂直偏移 | number \| (datum, index, data) => number                     | -         |      |
| pinCursor        | 仪表盘指针轴心鼠标样式     | string \| (datum, index, data) => string                     | `default` |      |

#### pointer

通过 `pointer` 前缀配置仪表盘指针的样式。

| 属性                 | 描述                   | 类型                                                             | 默认值    | 必选 |
| -------------------- | ---------------------- | ---------------------------------------------------------------- | --------- | ---- |
| pointerShape         | 仪表盘指针形状         | `'line'` \|`(points, value, coordinate, theme) => DisplayObject` | `'line'`  |      |
| pointerStroke        | 仪表盘指针描边颜色     | string \| (datum, index, data) => string                         | -         |      |
| pointerStrokeOpacity | 仪表盘指针描边透明度   | number \| (datum, index, data) => number                         | -         |      |
| pointerLineWidth     | 仪表盘指针线宽         | number \| (datum, index, data) => number                         | -         |      |
| pointerLineDash      | 仪表盘指针虚线配置     | [number,number] \| (datum, index, data) => [number , number]     | -         |      |
| pointerOpacity       | 仪表盘指针整体透明度   | number \| (datum, index, data) => number                         | -         |      |
| pointerShadowColor   | 仪表盘指针阴影颜色     | string \| (datum, index, data) => string                         | -         |      |
| pointerShadowBlur    | 仪表盘指针阴影模糊系数 | number \| (datum, index, data) => number                         | -         |      |
| pointerShadowOffsetX | 仪表盘指针阴影水平偏移 | number \| (datum, index, data) => number                         | -         |      |
| pointerShadowOffsetY | 仪表盘指针阴影垂直偏移 | number \| (datum, index, data) => number                         | -         |      |
| pointerCursor        | 仪表盘指针鼠标样式     | string \| (datum, index, data) => string                         | `default` |      |

#### text

通过 `text` 前缀配置仪表盘指示文本的样式。

| 属性              | 描述                                                                       | 类型                                                         | 默认值    | 必选 |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ | --------- | ---- |
| textContent       | 设置仪表盘中心指示文本内容                                                 | string                                                       | -         |      |
| textX             | 仪表盘中心指示文本 x 方向上的偏移量，可以设置为具体数值，也可以设置百分比  | number \| string                                             | `50%`     |      |
| textY             | 仪表盘中心指示文本 y 方向上的偏移量 ，可以设置为具体数值，也可以设置百分比 | number \| string                                             | `60%`     |      |
| textFontSize      | 仪表盘指示文本文字大小                                                     | number \| (datum, index, data) => number                     | `20`      |      |
| textFontFamily    | 仪表盘指示文本字体                                                         | string \| (datum, index, data) => string                     | -         |      |
| textFontWeight    | 仪表盘指示文本字重                                                         | number \| (datum, index, data) => number                     | `800`     |      |
| textTextAlign     | 仪表盘指示文本对齐方式                                                     | `center` \| `end` \| `left` \| `right` \| `start`            | `center`  |      |
| textTextBaseline  | 仪表盘指示文本基线对齐                                                     | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `middle`  |      |
| textFill          | 仪表盘指示文本颜色                                                         | string \| (datum, index, data) => string                     | `#888`    |      |
| textFillOpacity   | 仪表盘指示文本透明度                                                       | number \| (datum, index, data) => number                     | -         |      |
| textStroke        | 仪表盘指示文本描边色                                                       | string \| (datum, index, data) => string                     | -         |      |
| textStrokeOpacity | 仪表盘指示文本描边透明度                                                   | number \| (datum, index, data) => number                     | -         |      |
| textLineHeight    | 仪表盘指示文本行高                                                         | number \| (datum, index, data) => number                     | -         |      |
| textLineWidth     | 仪表盘指示文本描边宽度                                                     | number \| (datum, index, data) => number                     | -         |      |
| textLineDash      | 仪表盘指示文本虚线配置                                                     | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| textOpacity       | 仪表盘指示文本整体透明度                                                   | number \| (datum, index, data) => number                     | -         |      |
| textShadowColor   | 仪表盘指示文本阴影颜色                                                     | string \| (datum, index, data) => string                     | -         |      |
| textShadowBlur    | 仪表盘指示文本阴影模糊                                                     | number \| (datum, index, data) => number                     | -         |      |
| textShadowOffsetX | 仪表盘指示文本阴影水平偏移                                                 | number \| (datum, index, data) => number                     | -         |      |
| textShadowOffsetY | 仪表盘指示文本阴影垂直偏移                                                 | number \| (datum, index, data) => number                     | -         |      |
| textCursor        | 仪表盘指示文本鼠标样式                                                     | string \| (datum, index, data) => string                     | `default` |      |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'gauge',
    data: {
      value: {
        target: 159,
        total: 400,
        name: 'score',
        // thresholds: [200, 400],
      },
    },
    scale: {
      color: {
        range: ['l(0):0:#62CFF4 1:#2C67F2', 'l(0):0:#2C67F2 1:#00008B'],
      },
      y: {
        range: [1, -0.5],
      },
    },
    style: {
      // 配置仪表盘指示文本样式
      textContent: (target, total) => `占比：${(target / total) * 100}%`,
      textFill: '#000',
      textFontSize: 24,
      textfontWeight: 300,
      textX: '35%',
      textY: '75%',
      // 配置仪表盘指针样式
      pointerStroke: '#c5c5c5',
      pointershadowColor: '#333333',
      pointershadowBlur: 10,
      pointershadowOffsetX: 5,
      pointershadowOffsetY: 5,
      // 配置仪表盘指针轴心样式
      pinStroke: '#d5d5d5',
      pinFill: '#d5d5d5',
      pinlinewidth: 6,
      pinshadowColor: '#333333',
      pinshadowBlur: 30,
      pinshadowOffsetX: 5,
      pinshadowOffsetY: 5,
      // 配置仪表盘圆弧样式
      arcLineWidth: 2,
      arcStroke: '#fff',
      arcshadowColor: '#333333',
      arcshadowBlur: 30,
      arcshadowOffsetX: 5,
      arcshadowOffsetY: 5,
    },
    legend: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/graphic/demo/gauge.ts" rid="gauge-style"></playground>

## 示例

### 自定义仪表盘指针形状

<Playground path="general/gauge/demo/gauge-custom-shape.ts" rid="gauge-custom-shape"></playground>
