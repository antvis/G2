---
title: heatmap
order: 9
---

## 概述

`heatmap`（热力图） 是一种通过颜色强度映射二维数据密度或数值大小的可视化图表，擅长揭示数据分布规律、聚类特征及异常点。
`heatmap`将两个分类/连续字段（如 x、y）映射为坐标轴，第三个数值字段（如 value）映射为颜色梯度（如 color: 'value'），形成网格化的色块矩阵。
`heatmap`可以定义色阶，冷色调（如蓝色）表示低值，暖色调（如红色）表示高值，直观地表示数值的大小或频率分布。

典型应用包括：

- 相关性分析：例如，用于展示变量之间的相关性矩阵，通过颜色深浅快速识别强相关或弱相关的变量。
- 密度分析：展示二维数据的密度分布，常用于观察热点区域，例如在地理空间数据中用于分析人群聚集分布。
- 时间序列与类别分析：将时间（如小时、天、周）与类别数据结合，用于分析时序模式或分类分布。

```js | ob
(() => {
  const chart = new g2.Chart();

  chart.options({
    type: 'heatmap', // 子组件类型为热力图
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
    },
    encode: { x: 'g', y: 'l', color: 'tmp' }, // 数据编码配置，x 轴为 'g'，y 轴为 'l'，颜色为 'tmp'
    style: { opacity: 0 }, // 热力图的透明度为 0
    tooltip: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 热力图](/examples#general-heatmap)页面。

## 配置项

| 属性   | 描述                                                                                         | 类型              | 默认值 | 必选 |
| ------ | -------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `heatmap` 标记的视觉通道，包括`x`、`y`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `heatmap` 图形样式                                                                      | [style](#style)   | -      |      |

### encode

配置 `heatmap` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性  | 描述                                                                                                                   | 类型                          | 默认值 | 必选 |
| ----- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x     | 绑定 `heatmap` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                               | [encode](/manual/core/encode) | -      | ✓    |
| y     | 绑定 `heatmap` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                   | [encode](/manual/core/encode) | -      | ✓    |
| color | 绑定 `heatmap` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | -      |      |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### style

| 属性               | 描述                                                                                                          | 类型                                              | 默认值      | 必选 |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- | ---- |
| gradient           | 图形对应的渐变色配置                                                                                          | `string` \| `Array<[number, string]>`             | -           |      |
| opacity            | 热力图的透明度 ，如果设置，则会覆盖 `maxOpacity`, `minOpacity` 配置，范围 0 ~ 1                               | `number`                                          | `0.6`       |      |
| maxOpacity         | 热力图像素点透明度最大值，在 `opacity = 0` 时候生效，范围 0 ~ 1                                               | `number`                                          | `1`         |      |
| minOpacity         | 热力图像素点透明度最小值，在 `opacity = 0` 时候生效，范围 0 ~ 1                                               | `number`                                          | `0`         |      |
| blur               | 热力图的模糊因子，范围 0 ~ 1，越大图形约平滑                                                                  | `number`                                          | `0.85`      |      |
| useGradientOpacity | 图形的填充色                                                                                                  | `boolean`                                         | `false`     |      |
| fill               | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -           |      |
| fillOpacity        | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -           |      |
| stroke             | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -           |      |
| strokeOpacity      | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -           |      |
| lineWidth          | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -           |      |
| lineDash           | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -           |      |
| shadowColor        | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -           |      |
| shadowBlur         | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -           |      |
| shadowOffsetX      | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -           |      |
| shadowOffsetY      | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -           |      |
| cursor             | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | `'default'` |      |

关于 `gradient` 配置，来一个示例如下，也是 G2 默认内置的渐变色：

```ts
const gradient = [
  [0.25, 'rgb(0,0,255)'],
  [0.55, 'rgb(0,255,0)'],
  [0.85, 'yellow'],
  [1.0, 'rgb(255,0,0)'],
];

const gradient =
  '0.25:rgb(0,0,255) 0.55:rgb(0,255,0) 0.85:yellow 1.0:rgb(255,0,0)';
```

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。

尝试一下：

<Playground path="style/general/heatmap/demo/heatmap-density.ts" rid="area-style"></playground>

## 示例

- 可以创建一个容器视图，将热力图与地图同时渲染，直观呈现数据在地理位置的差异

```js | ob {pin: false}
(() => {
  const chart = new g2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    padding: 0,
    axis: false,
    children: [
      {
        type: 'image',
        style: {
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
          x: '50%',
          y: '50%',
          width: '100%',
          height: '100%',
        },
        tooltip: false,
      },
      {
        type: 'heatmap',
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
        },
        encode: { x: 'g', y: 'l', color: 'tmp' },
        style: { opacity: 0 },
        tooltip: false,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
