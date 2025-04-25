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
| scale  | 配置 `gauge` 标记的图形缩放，包括`y`、`size`等                                             | [scale](#scale)   | -      |      |
| style  | 配置图形样式和标签样式                                                                     | [style](#style)   | -      |      |
| labels | 自定义节点数据标签的配置                                                                   | `label[]`         | `[]`   |      |

### encode

配置 `gauge` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性  | 描述                                                                                                                 | 类型                          | 默认值    | 必选 |
| ----- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- | ---- |
| x     | 绑定 `gauge` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                               | [encode](/manual/core/encode) | `'x'`     |      |
| y     | 绑定 `gauge` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                   | [encode](/manual/core/encode) | `'y'`     |      |
| color | 绑定 `gauge` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | `'color'` |      |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### data

`data`定义仪表盘的数值、目标值及分类信息，通过数据绑定驱动表盘指针位置、颜色映射及多仪表分面展示。

| 属性       | 描述                                                                                                                      | 类型       | 默认值 | 必选 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | ---- |
| target     | 设置仪表盘指针的目标值                                                                                                    | `number`   | -      |      |
| total      | 设置仪表盘刻度的最大范围值                                                                                                | `number`   | -      |      |
| percent    | 设置仪表盘指针指向的百分比(配置`percent`时，`target`、`total`值会失效，`thresholds`请设置在合理区间，否则会造成渲染错误 ) | `number`   | -      |      |
| thresholds | 设置仪表盘刻度阈值区间                                                                                                    | `number[]` | -      |      |

更多的`data`配置，可以查查看 [data](/manual/core/data/overview) 介绍页面。

### scale

`scale`用于定义数据如何映射到视觉属性（如颜色、大小、形状等）。

| 属性  | 描述                                  | 类型                        | 默认值                               | 必选 |
| ----- | ------------------------------------- | --------------------------- | ------------------------------------ | ---- |
| y     | 定义数据字段到 Y 轴视觉位置的映射规则 | [scale](/manual/core/scale/overview) | `{domain: [0, percent ? 1 : total]}` |      |
| color | 定义仪表盘刻度颜色的映射规则          | [scale](/manual/core/scale/overview) | `{range: ['#30BF78', '#D0D0D0']}`    |      |

#### color

颜色的分布与 data 中的数据相关

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

| 属性          | 描述                                                                                                          | 类型                                              | 默认值      | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- | ---- |
| pinFill       | 仪表指示器指针锚点的圆的填充色                                                                                | `string` \| `Function<string>`                    | `'#fff'`    |      |
| pinR          | 仪表指示器指针锚点的圆的半径                                                                                  | `number` \| `Function<string>`                    | `10`        |      |
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

复合图形标记需要通过不同的前缀来区分图形的配置。

- `<label>`: 数据标签的前缀，例如：`labelText` 设置标签的 text 文本。

可以通过设置`textContent`修改仪表盘的指示文本

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
    legend: false,
    style: {
      textContent: (target, total) =>
        `得分：${target}\n占比：${(target / total) * 100}%`,
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/graphic/demo/gauge.ts" rid="gauge-style"></playground>
