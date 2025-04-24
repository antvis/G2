---
title: rect
order: 23
---

## 概述
`rect` 是用于绘制矩形标记的核心图表元素，它通过定义矩形的起点、终点、宽度、高度以及其他图形属性（如颜色、样式），实现不同的可视化需求。`rect`可以根据绑定的数据动态调整矩形的位置、大小和样式，从而直观地展示数据的分布、对比关系或密度信息。`rect`广泛应用于柱状图、热力图、矩阵图等场景。

`rect`核心功能特点：
- **绘制矩形形状**：rect 是构建矩形类图表的基础单元，可以用来构建柱、块、热力等图表。
每个矩形单元通过映射数据的数值或分类信息，展示具体数据内容。
- **丰富的编码映射**：用户可以自由将数据字段映射到矩形的 X 轴、Y 轴、大小、颜色等视觉属性。
提供灵活的自定义能力，通过字段和样式的结合，生成多种样式的矩形图形。
- **高扩展性和互动性**：支持交互功能（如点击、高亮、缩放等），提升图形与用户间的动态互动。
适用于不同领域的矩形可视化需求，如栅格图（heatmap）、数据密度分布图等。
- **与 G2 生态无缝衔接**：作为 G2 Mark 系统的一部分，rect 与其他组件（如 line、point 等）能够自由组合，满足复杂场景的数据可视化需求。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    },
    encode: { x: 'weight', y: 'height', color: 'sex' },
    transform: [{ type: 'bin', opacity: 'count' }],
    style: { inset: 0.5 },
  });

  chart.render(); // 渲染图标

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 配置项

| 属性      | 描述                                                                                      | 类型                    | 默认值 | 必选 |
| --------- | ----------------------------------------------------------------------------------------- | ----------------------- | ------ | ---- |
| encode    | 配置 `rect` 标记的视觉通道，包括`x`、`y`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)       | -      | ✓    |
| transform | 配置 `rect` 数据转换操作（如分箱、排序、过滤等）。                                        | [transform](#transform) | -      |      |
| style     | 配置 `rect` 图形样式                                                                      | [style](#style)         | -      |      |

### encode

配置 `rect` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性  | 描述                                                                                                                | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| color | 绑定 `rect` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | -      |      |
| shape | 绑定 `rect` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                                         | [encode](/manual/core/encode) | 'rect' |      |

**color**

color 视觉通道影响 `rect` 图形标记的填充颜色（在应用某些空心形状的时候，例如 hollow ，则会改变图形的 描边颜色）。在点图上应用时一般映射分类字段，对数据进行分组。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'rect',
    data: [
      {x: 1, y: 1, type: 'type1'},
      {x: 1, y: 2, type: 'type2'},
      {x: 2, y: 1, type: 'type3'},
      {x: 2, y: 2, type: 'type1'},
    ],
    transform: [{ type: 'bin' }],
    encode: { shape: 'rect', x: 'x', y: 'y', color: 'type' },
    style: { inset: 0.5 },
  });

  chart.render(); // 渲染图标

  return chart.getContainer();
})();
```

**shape**

通过 `encode` 的 `shape` 属性，您可以指定单元格的几何形状。shape 决定了每个单元格在画布上以什么样的形状渲染出来。`shape` 标记的支持的形状如下：

| 图形   | 描述     |
| ------ | -------- |
| rect   | 矩形     |
| hollow | 空心矩形 |

```js | ob { pin: false }
(() => {
  const shapeMap = [
    {
      shape: 'rect',
      label: '矩形',
    },
    {
      shape: 'hollow',
      label: '空心矩形',
    },
  ];

  const chart = new G2.Chart();

  chart.options({
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    },
    encode: { shape: 'rect', x: 'weight', y: 'height', color: 'sex' },
    transform: [{ type: 'bin', opacity: 'count' }],
    style: { inset: 0.5 },
  });

  const handleSetShape = (shape) => {
    // 设置选中的坐标系
    chart.options({
      encode: { shape },
    });
    chart.render(); // 重新渲染图表
  };

  // 插入Encode-Color 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择形状 ';
  const selector = document.createElement('select');
  selector.innerHTML = shapeMap.map(
    (shape, index) =>
      `<option value="${shape.shape}" ${index === 0 ? 'selected' : ''}>${
        shape.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetShape(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### transform

`transform` 是用于数据转换的核心配置项，它允许在数据绑定到图形标记之前对原始数据进行预处理。通过对数据的加工，生成更适合可视化的结构化数据，从而更清晰地表达数据分布、密度或统计特征。

常用的转换类型type有以下几个：

- **bin**: 将连续数据分箱，生成直方图矩形
- **stackY**: 垂直方向堆叠矩形，自动计算每个分类的堆叠高度

```js | ob {pin: false}
(()=>{
  const chart = new G2.Chart();

  chart.options({
    type: "rect",
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/athletes.json",
    },
    encode: { x: "weight", color: "sex" },
    transform: [
      { type: "binX", y: "count" },
      { type: "stackY", orderBy: "series" },
    ],
  });

  chart.render();

  return chart.getContainer()
})()
```

更多的`transform`配置，可以查看 [transform](/manual/core/transform/overview) 介绍页面。

### style

`style` 用于设置图表元素的外观样式，包括填充颜色、边框样式、阴影效果等。

| 属性              | 描述                                                                                                          | 类型                                                               | 默认值    |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| radius            | 矩形的四个圆角大小                                                                                            | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopLeft     | 左上角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopRight    | 右上角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomRight | 右下角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomLeft  | 左下角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| inset             | 矩形四个方向的内边距                                                                                          | number \| (datum, index, data, column) => number                   | `0`       |
| insetLeft         | 左边的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetRight        | 右边的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetBottom       | 下面的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetTop          | 上面的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| fill              | 图形的填充色                                                                                                  | number \| (datum, index, data, column) => string                   | -         |
| fillOpacity       | 图形的填充透明度                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| stroke            | 图形的描边                                                                                                    | number \| (datum, index, data, column) => string                   | -         |
| strokeOpacity     | 描边透明度                                                                                                    | number \| (datum, index, data, column) => number                   | -         |
| lineWidth         | 图形描边的宽度                                                                                                | number \| (datum, index, data, column) => number                   | -         |
| lineDash          | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number] \|(datum, index, data, column) => [number, number] | -         |
| opacity           | 图形的整体透明度                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| shadowColor       | 图形阴影颜色                                                                                                  | number \| (datum, index, data, column) => string                   | -         |
| shadowBlur        | 图形阴影的高斯模糊系数                                                                                        | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetX     | 设置阴影距图形的水平距离                                                                                      | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetY     | 设置阴影距图形的垂直距离                                                                                      | number \| (datum, index, data, column) => number                   | -         |
| cursor            | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | number \| (datum, index, data, column) => string                   | 'default' |

尝试一下

<Playground path="style/analysis/bin/demo/binx-color.ts" rid="area-style"></playground>

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。
