---
title: line
order: 12
---

## 概述

折线图（ `line` ）图形标记根据一系列的点，绘制折线，显示数据在一个具有顺序性的维度上的变化。通常用来绘制折线图，是最常用的 `Mark` 之一。

折线图用于分析事物随时间或有序类别而变化的趋势。如果有多组数据，则用于分析多组数据随时间变化或有序类别的相互作用和影响。折线的方向表示正/负变化。折线的斜率表示变化的程度。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    autoFit: true,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    },
    encode: { x: 'date', y: 'close' },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 折线图](/examples#general-line)页面。

## 配置项

| 属性       | 描述                                                                                                         | 类型                      | 默认值                 | 必选 |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `line` 标记的视觉通道，包括`x`、`y`、`color`、`shape`、 `size` 等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| coordinate | 配置 `line` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式                               | [coordinate](#coordinate) | `{type: 'cartesian' }` |      |
| style      | 配置 `line` 标记的图形样式                                                                                   | [style](#style)           | -                      |      |

### encode

配置 `line` 标记的视觉通道。

| 属性   | 描述                                                                                                                                        | 类型                                        | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ | ---- |
| x      | 绑定 `line` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                                                       | [encode](/manual/core/encode)               | -      | ✓    |
| y      | 绑定 `line` 标记的 `y` 属性通道，一般是 `data` 中的数值字段                                                                                 | [encode](/manual/core/encode)               | -      | ✓    |
| color  | 绑定 `line` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多条不同颜色的折线，一般用来配置多折线图等 | [encode](/manual/core/encode)               | -      |      |
| series | 绑定 `line` 标记的 `series` 属性通道，根据 series 通道实现分组效果                                                                          | [encode](/manual/core/encode)               | -      |
| shape  | 绑定 `line` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                                                                 | `rect` \| `hollow` \| `funnel` \| `pyramid` | `rect` |      |
|        |

## 选项

目前 line 有以下几个内置 shape 图形，默认为 `line`。

| 图形   | 描述                             | 示例 |
| ------ | -------------------------------- | ---- |
| line   | 绘制直线连接的折线图             |      |
| smooth | 绘制平滑曲线的折线图             |      |
| vh     | 绘制阶梯折线图，先竖线后横线连接 |      |
| hv     | 绘制阶梯折线图，先横线后竖线连接 |      |
| hvh    | 绘制阶梯折线图，竖横竖，中点连接 |      |
| trail  | 绘制轨迹，类似一个笔迹           |      |

### line

| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
| connect        | 是否连接空值                                                                                                  | `number` \| `Function<number>`                    | false                          |
| connect[Style] | connector 对应的属性样式                                                                                      | 和对应 `style` 保持一致                           | -                              |
| defined        | 决定数据是否为空值                                                                                            | `(v: any) = boolean`                              | !(NaN \|\| null \|\| undefine) |
| fill           | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| fillOpacity    | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| stroke         | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -                              |
| strokeOpacity  | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -                              |
| lineWidth      | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -                              |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -                              |
| opacity        | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -                              |
| shadowColor    | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -                              |
| shadowBlur     | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -                              |
| shadowOffsetX  | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| shadowOffsetY  | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -                              |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default'                      |

### smooth

和 `line` 配置相同。

### vh

和 `line` 配置相同。

### hv

和 `line` 配置相同。

### hvh

和 `line` 配置相同。
