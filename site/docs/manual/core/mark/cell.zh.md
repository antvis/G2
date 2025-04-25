---
title: cell
order: 5
---

## 概述

`cell` 是矩形标记（Rect Shape）的一种抽象表示，主要用于表示分面（facet）或者网格中的单元格，是图表中数据映射到视觉元素的最小单元。它一般是在可视化布局中用来表示网格化结构或数据分割的“单元”。具体来说，它是一种对区域的划分，在不同的分面中通常会对应一个独立的绘图区域，常见于矩阵型图表（如日历图、聚合热力图等）中。

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'cell',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    },
    transform: [{ type: 'group', color: 'max' }], // 对数据进行分组变换，按颜色的最大值进行分组
    encode: {
      x: (d) => new Date(d.date).getUTCDate(), // 编码 x 轴，使用数据中的日期字段的 UTC 日期部分
      y: (d) => new Date(d.date).getUTCMonth(), // 编码 y 轴，使用数据中的日期字段的 UTC 月份部分
      color: 'temp_max', // 编码颜色，使用数据中的 temp_max 字段
      shape: 'cell',
    },
    style: { inset: 0.5 }, // 设置单元格的内边距为 0.5
    scale: {
      color: {
        type: 'sequential', // 设置颜色比例尺为顺序比例尺
        palette: 'gnBu', // 设置使用 'gnBu' 调色板
      },
    },
  });

  chart.render(); // 渲染图标

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples#general-cell)页面。

## 配置项

| 属性      | 描述                                                                                               | 类型                    | 默认值 | 必选 |
| --------- | -------------------------------------------------------------------------------------------------- | ----------------------- | ------ | ---- |
| encode    | 配置 `cell` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)       | -      | ✓    |
| scale     | 配置 `cell` 标记的图形缩放，包括`x`、`y`、`color`、`shape`等                                       | [scale](#scale)         | -      |      |
| style     | 配置 `cell` 图形样式                                                                         | [style](#style)         | -      |      |
| transform | 配置 `cell` 数据转换操作（如分箱、排序、过滤等）。                                                 | [transform](#transform) | -      |      |

### encode

配置 `cell` 标记的视觉通道。

| 属性  | 描述                                                                                                                | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x     | 绑定 `cell` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                               | [encode](/manual/core/encode) | -      | ✓    |
| y     | 绑定 `cell` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                   | [encode](/manual/core/encode) | -      | ✓    |
| color | 绑定 `cell` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | -      |      |
| shape | 绑定 `cell` 标记的 `shape` 属性通道，改变图形标记的绘制形状，支持的属性：`cell` \| `hollow`                         | _string_                      | `cell` |      |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

#### color

通过 `encode` 的 `color` 属性，你可以将数据字段映射到颜色值，从而根据数据的变化自动调整标记的颜色。这对于数据可视化来说非常有用，因为它可以帮助您快速识别数据的模式和趋势。

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'cell',
    data: [
      { x: 'x-a', y: 'y-a', data1: 1, data2: 5 },
      { x: 'x-a', y: 'y-b', data1: 3, data2: 8 },
      { x: 'x-a', y: 'y-c', data1: 2, data2: 6 },
      { x: 'x-b', y: 'y-a', data1: 8, data2: 2 },
      { x: 'x-b', y: 'y-b', data1: 5, data2: 4 },
      { x: 'x-b', y: 'y-c', data1: 6, data2: 9 },
      { x: 'x-c', y: 'y-a', data1: 7, data2: 1 },
      { x: 'x-c', y: 'y-b', data1: 4, data2: 2 },
      { x: 'x-c', y: 'y-c', data1: 9, data2: 3 },
    ],
    encode: {
      x: 'x', // 编码 x 轴
      y: 'y', // 编码 y 轴
      color: 'data1', // 使用数据中的 data1 字段
    },
    style: {
      inset: 5,
      lineWidth: 10,
    },
  });

  // 插入Encode-Color 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择映射到颜色的字段 ';
  const selector = document.createElement('select');
  selector.innerHTML = `
    <option value="data1" selected>data1</option>
    <option value="data2">data2</option>
  `;

  selector.onchange = (e) => {
    chart.options({
      encode: {
        color: e.target.value, // 使用选中的字段映射颜色
      },
    });
    chart.render(); // 重新渲染图表
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

#### shape

通过 `encode` 的 `shape` 属性，您可以指定单元格的几何形状。shape 决定了每个单元格（cell）在画布上以什么样的形状渲染出来。`shape` 标记的支持的形状如下：

| 形状   | 描述                 | 示例                                                                                                             |
| ------ | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| cell   | 使用颜色填充整个表格 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zsXFRKR3ZZkAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hollow | 绘制平滑曲线的面积图 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uu_9QavQ-zUAAAAAAAAAAAAAemJ7AQ/original"></img> |

### scale

`scale`用于定义数据如何映射到视觉属性（如颜色、大小、形状等）。在`cell`的使用场景，scale 的常见作用就是为每个视觉通道（如颜色、大小、位置等）提供映射规则，使数据点能够准确地呈现。

| 属性      | 描述                 | 类型                                        | 默认值 |
| --------- | -------------------- | ------------------------------------------- | ------ |
| [channel] | 映射到视觉属性的通道 | Record<string, [scale](/manual/core/scale/overview)> | -      |

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### style

`style` 用于设置图表元素的外观样式，包括填充颜色、边框样式、阴影效果等。

| 属性              | 描述                                                                                                          | 类型                                              | 默认值                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------- |
| radius            | 矩形的四个圆角大小                                                                                            | `number` \| `Function<number>`                    | 0                                |
| radiusTopLeft     | 左上角的圆角                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| radiusTopRight    | 右上角的圆角                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| radiusBottomRight | 右下角的圆角                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| radiusBottomLeft  | 左下角的圆角                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| inset             | 矩形四个方向的内边距                                                                                          | `number` \| `Function<number>`                    | 0                                |
| insetLeft         | 左边的内间距                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| insetRight        | 右边的内间距                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| insetBottom       | 下面的内间距                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| insetTop          | 上面的内间距                                                                                                  | `number` \| `Function<number>`                    | 0                                |
| fill              | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | `shape`为`hollow`时，默认值为 '' |
| fillOpacity       | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | `shape`为`cell`时，默认值为 0.95 |
| stroke            | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -                                |
| strokeOpacity     | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | `shape`为`hollow`时，默认值为 1  |
| lineWidth         | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | `shape`为`hollow`时，默认值为 2  |
| lineDash          | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -                                |
| opacity           | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -                                |
| shadowColor       | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -                                |
| shadowBlur        | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -                                |
| shadowOffsetX     | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -                                |
| shadowOffsetY     | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -                                |
| cursor            | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default'                        |

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

### transform

`transform` 是用于数据转换的核心配置项，它允许在数据绑定到图形标记之前对原始数据进行预处理。通过对数据的加工，生成更适合可视化的结构化数据，从而更清晰地表达数据分布、密度或统计特征。

| 属性      | 描述                                      | 类型               | 默认值     |
| --------- | ----------------------------------------- | ------------------ | ---------- |
| type      | 针对哪些通道做数据分组聚合                | string \| string[] | ['x', 'y'] |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | Reducer            | -          |

```ts
type Primitive = number | string | boolean | Date;

type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```

更多的`transform`配置，可以查看 [transform](/manual/core/transform/overview) 介绍页面。

尝试一下：

<Playground path="style/general/cell/demo/cell-heatmap.ts" rid="area-style"></playground>
