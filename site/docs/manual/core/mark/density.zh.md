---
title: density
order: 7
---

## 概述

`density`是一种用于可视化连续变量分布概率密度的图表类型，通过核密度估计[（Kernel Density Estimation, KDE）](/manual/core/data/kde) 将离散数据点转化为平滑的连续概率密度曲线，直观反映数据的集中趋势、分布形态及异常值。

`density` 的核心目标是从散点或点云数据中提取出其整体分布模式，并将其密度信息映射为一个连续的区域图或渐变效果。这种图表通常用于分析大量数据点的聚集区域、数据集中热点或数据分布的概率密度，例如在地理可视化中用于表示人口分布的密集程度，或者在分析中展示交易频率的区域性。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'density', // 设置图表类型为密度图
    data: {
      type: 'fetch', // 指定数据类型为通过网络获取
      value: 'https://assets.antv.antgroup.com/g2/species.json', // 设置数据的 URL 地址
      transform: [
        {
          type: 'kde', // 使用核密度估计（KDE）进行数据转换
          field: 'y', // 指定 KDE 计算的字段为 'y'
          groupBy: ['x', 'species'], // 按 'x' 和 'species' 字段对数据进行分组
        },
      ],
    },
    encode: {
      x: 'x', // 将 'x' 字段映射到 x 轴
      y: 'y', // 将 'y' 字段映射到 y 轴
      color: 'species', // 将 'species' 字段映射到颜色
      size: 'size', // 将 'size' 字段映射到图形大小
      series: 'species', // 将 'species' 字段映射到系列
    },

    tooltip: false, // 关闭图表的 tooltip 功能
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 小提琴图](/examples#general-violin)页面。

## 配置项

| 属性       | 描述                                                                                                 | 类型                      | 默认值        | 必选 |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------------------------- | ------------- | ---- |
| coordinate | 配置 `density` 图形坐标系统，支持的属性：`cartesian` \| `polar`                                      | [coordinate](#coordinate) | `'cartesian'` |      |
| encode     | 配置 `density` 标记的视觉通道，包括`x`、`y`、`color`、`size`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -             | ✓    |
| scale      | 配置 `density` 标记的图形缩放，包括`x`、`y`、`series`、`size`等                                      | [scale](#scale)           | -             |      |
| style      | 配置 `density` 图形样式                                                                              | [style](#style)           | -             |      |

### coordinate

`coordinate`是数据可视化中定义数据映射到图形空间的核心系统，它决定了数据如何从“数值域”转换为“视觉位置”。坐标系通过不同的空间变换规则，重塑密度分布的视觉表达形式。

| 坐标系     | 类型          | 图表             |
| ---------- | ------------- | ---------------- |
| 直角坐标系 | `'cartesian'` | 和密度图等       |
| 极坐标系   | `'polar'`     | 极坐标小提琴图等 |

```js | ob { pin: false }
(() => {
  const coordinateMap = [
    {
      coordinate: 'cartesian',
      label: '直角坐标系',
    },
    {
      coordinate: 'polar',
      label: '极坐标系',
    },
  ];

  const chart = new G2.Chart();

  chart.options({
    type: 'density',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/species.json',
      transform: [
        {
          type: 'kde',
          field: 'y',
          groupBy: ['x', 'species'],
        },
      ],
    },
    encode: {
      x: 'x',
      y: 'y',
      color: 'species',
      size: 'size',
      series: 'species',
    },
    coordinate: { type: coordinateMap[0].coordinate },
    tooltip: false,
  });

  const handleSetCoordinate = (coordinate) => {
    // 设置选中的坐标系
    chart.coordinate({
      type: coordinate,
    });
    chart.render(); // 重新渲染图表
  };

  // 插入Encode-Color 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择坐标系 ';
  const selector = document.createElement('select');
  selector.innerHTML = coordinateMap.map(
    (coordinate, index) =>
      `<option value="${coordinate.coordinate}" ${
        index === 0 ? 'selected' : ''
      }>${coordinate.label}</option>`,
  );
  selector.onchange = (e) => {
    handleSetCoordinate(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

更多的`coordinate`配置，可以查查看 [coordinate](/manual/core/coordinate/overview) 介绍页面。

### encode

配置 `density` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性   | 描述                                                                                                                                                              | 类型                          | 默认值 | 必选 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x      | 绑定 `density` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                                                                          | [encode](/manual/core/encode) | -      | ✓    |
| y      | 绑定 `density` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                                                              | [encode](/manual/core/encode) | -      | ✓    |
| color  | 绑定 `density` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域                                            | [encode](/manual/core/encode) | -      |      |
| size   | 绑定 `density` 标记的 `size` 属性通道，用于将数据字段映射为图形元素的尺寸属性，通过调整密度曲线的线条粗细或填充区域的视觉比例，增强数据分布的对比维度与信息密度。 | [encode](/manual/core/encode) | -      | ✓    |
| series | 绑定 `density` 标记的 `series` 属性通道， 用于将数据分组字段映射到图表的系列或类别的配置项，根据某个字段对数据进行分类，并为每个类别生成独立的图形表现。          | [encode](/manual/core/encode) | -      | ✓    |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### scale

`scale`用于定义数据如何映射到视觉属性（如颜色、大小、形状等）。在`cell`的使用场景，scale 的常见作用就是为每个视觉通道（如颜色、大小、位置等）提供映射规则，使数据点能够准确地呈现。

| 属性   | 描述                                                                   | 类型                        | 默认值               | 必选 |
| ------ | ---------------------------------------------------------------------- | --------------------------- | -------------------- | ---- |
| x      | 定义数据字段到 X 轴视觉位置的映射规则                                  | [scale](/manual/core/scale/overview) | `{type: 'band'}`     |      |
| series | 控制分类字段（series 编码）到视觉属性（如颜色、线型、符号）的映射规则  | [scale](/manual/core/scale/overview) | `{type: 'band'}`     |      |
| size   | 将数据字段映射到视觉元素（如密度曲线宽度、点面积或区域高度）的尺寸属性 | [scale](/manual/core/scale/overview) | `{type: 'identity'}` |      |

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### style

`style` 用于设置图表元素的外观样式，包括填充颜色、边框样式、阴影效果等。

| 属性          | 描述                                                                                                          | 类型                                              | 默认值      | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- | ---- |
| fill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -           |      |
| fillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -           |      |
| stroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -           |      |
| strokeOpacity | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -           |      |
| lineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -           |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -           |      |
| opacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -           |      |
| shadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -           |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | `'default'` |      |

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/general/violin/demo/density.ts" rid="area-style"></playground>
