---
title: rangeY
order: 22
---

## 概述

使用一组 `y`(y1, y2) 来定位一个绘制于 y 轴的矩形区域，常用于对特定区域进行高亮显示。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    width: 600,
    height: 470,
    type: 'view',
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
        },
        encode: { x: 'height', y: 'weight', color: 'gender' },
      },
      { type: 'rangeY', data: [{ y: [54, 72] }], encode: { y: 'y' } },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

此外，rangeY 还提供了简便写法：

```ts
chart
  .rangeY()
  .data([
    [54, 60],
    [65, 72],
  ])
  .encode('y', (d) => d);

// it can be simplified as follows:
chart.rangeY().data([
  [54, 60],
  [65, 72],
]);
```

## 配置项

| 属性   | 描述                                                                                                 | 类型              | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `rangeY` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `rangeY` 标记的图形样式                                                                         | [style](#style)   | -      |      |

### encode

配置 `rangeY` 标记的视觉通道。

| 属性 | 描述                                                                    | 类型     | 默认值 | 必选 |
| ---- | ----------------------------------------------------------------------- | -------- | ------ | ---- |
| y    | 绑定 `rangeY` 标记的 `y` 属性通道，一般是 `data` 中的时间或有序名词字段 | `string` | -      | ✓    |

更多的 `encode` 配置，可以查看 [编码（Encode）](/manual/core/encode) 介绍页面。

### style

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
