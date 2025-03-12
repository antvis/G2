---
title: rangeX
order: 21
---

## 概述

使用一组 `x`(x1, x2) 来定位一个绘制于 x 轴的矩形区域，常用于对特定区域进行高亮显示。

```js | ob
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_falkensee.html
 */
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    width: 600,
    height: 360,
    paddingLeft: 60,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/year-population.json',
    },
    children: [
      {
        type: 'rangeX',
        data: [
          { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
          {
            year: [new Date('1948'), new Date('1989')],
            event: 'GDR (East Germany)',
          },
        ],
        encode: { x: 'year', color: 'event' },
        scale: { color: { independent: true, range: ['#FAAD14', '#30BF78'] } },
        style: { fillOpacity: 0.75 },
      },
      {
        type: 'line',
        encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
      },
      {
        type: 'point',
        encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
        style: { lineWidth: 1.5 },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

此外，rangeX 还提供了简便写法：

```ts
chart
  .rangeX()
  .data([[new Date('2010'), new Date('2011')]])
  .encode('x', (d) => d);

// it can be simplified as follows:
chart.rangeX().data([new Date('2010'), new Date('2011')]);
```

## 配置项

| 属性   | 描述                                                                                                 | 类型              | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `rangeX` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `rangeX` 标记的图形样式                                                                         | [style](#style)   | -      |      |

### encode

配置 `rangeX` 标记的视觉通道。

| 属性 | 描述                                                                    | 类型     | 默认值 | 必选 |
| ---- | ----------------------------------------------------------------------- | -------- | ------ | ---- |
| x    | 绑定 `rangeX` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段 | `string` | -      | ✓    |

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
