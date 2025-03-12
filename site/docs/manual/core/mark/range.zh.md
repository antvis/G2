---
title: range
order: 20
---

## 概述

`range` 是用来定义一个矩形区域的工具。这个矩形的位置和大小可以通过两组数字来确定：一组用于水平方向（x1, x2），另一组用于垂直方向（y1, y2）。它常用于绘制辅助背景区域或标记某个区域。

- 水平方向（x1, x2）：

  - `x1`：矩形在水平方向上从哪里开始。
  - `x2`：矩形在水平方向上到哪里结束。

- 垂直方向（y1, y2）：

  - `y1`：矩形在垂直方向上从哪里开始。
  - `y2`：矩形在垂直方向上到哪里结束。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json',
    },
    children: [
      { type: 'lineX', data: [0] },
      { type: 'lineY', data: [0] },
      {
        type: 'range',
        // 区域图的数据
        data: [
          { x: [-25, 0], y: [-30, 0], region: '1' },
          { x: [-25, 0], y: [0, 20], region: '2' },
          { x: [0, 5], y: [-30, 0], region: '2' },
          { x: [0, 5], y: [0, 20], region: '1' },
        ],
        // 编码规则，x 和 y 对应数据中的字段，color 对应 region 字段
        encode: { x: 'x', y: 'y', color: 'region' },
        scale: {
          color: {
            range: ['#d8d0c0', '#a3dda1'],
            independent: true,
            guide: null,
          },
        },

        style: {
          fillOpacity: 0.2,
        },
      },
      {
        type: 'point',
        encode: {
          x: 'change in female rate',
          y: 'change in male rate',
          size: 'pop',
          color: 'continent',
          shape: 'point',
        },
        scale: {
          color: {
            range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
          },
          x: { domain: [-25, 5] },
          y: { domain: [-30, 20] },
          size: { range: [4, 30] },
        },
        style: { stroke: '#bbb', fillOpacity: 0.8 },
        axis: { x: { title: false }, y: { title: false } },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 配置项

| 属性   | 描述                                                                                                | 类型              | 默认值 | 必选 |
| ------ | --------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `range` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `range` 标记的图形样式                                                                         | [style](#style)   | -      |      |

### encode

配置 `range` 标记的视觉通道。

| 属性 | 描述                                                                   | 类型     | 默认值 | 必选 |
| ---- | ---------------------------------------------------------------------- | -------- | ------ | ---- |
| x    | 绑定 `range` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段 | `string` | -      | ✓    |
| y    | 绑定 `range` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段     | `string` | -      | ✓    |

更多的 `encode` 配置，可以查看 [编码（Encode）](/manual/core/encode) 介绍页面。

### style

配置 `range` 标记的样式。

| 属性          | 描述                                                                                                          | 类型                                              | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- | ---- |
| fill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -         |      |
| fillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -         |      |
| stroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -         |      |
| strokeOpacity | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -         |      |
| lineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -         |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -         |      |
| opacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -         |      |
| shadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -         |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -         |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -         |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -         |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default' |      |

更多的 `style` 配置，可以查看 [样式（Style）](/manual/core/style) 介绍页面。

## 示例

更多的案例，可以查看 [图表示例 - 数据标注](/examples#annotation-range) 页面。
