---
title: lineY
order: 13
---

## 概述

`lineY`和`lineY`图形标记配置相似，`lineY`图形标记用于绘制垂直于 y 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "view",
    height: 200,
    autoFit: true,
    children: [
      {
        type: "interval",
        data: [
          { year: "1951 年", sales: 38 },
          { year: "1952 年", sales: 52 },
          { year: "1956 年", sales: 61 },
          { year: "1957 年", sales: 120 },
          { year: "1958 年", sales: 48 },
          { year: "1959 年", sales: 38 },
        ],
        encode: { x: "year", y: "sales" },
      },
      {
        type: "lineY",
        data: [100, 59],
        style: {
          stroke: (v) => {
            if (v >= 60) {
              return "green";
            } else {
              return "red";
            }
          },
          lineWidth: 2,
        },
        labels: [
          // 文本具体配置可以参考 mark text
          {
            text: (v) => v >= 60 ? "lineY 分割线1" : 'lineY 分割线2',
            position: "top-right",
            textBaseline: "bottom",
            fill: "#000",
            fillOpacity: 0.45,
            background: true,
            backgroundFill: "#000",
            backgroundOpacity: 0.15,
          },
        ],
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 线标注](/examples#annotation-line)页面。

## 配置项

| 属性       | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `lineY` 标记的视觉通道，包括`y`、`color`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| style      | 配置 `lineY` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### encode

配置 `lineY` 标记的视觉通道。

| 属性  | 描述                                                                                                                                        | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x     | 绑定 `lineY` 标记的 `y` 属性通道。 不需要 `x` 属性通道，可以直接data([1,...]) 配置数据，会自动配置到 `y`通道。或者配合 transform 来计算原始数据的平均值(mean)或中位数(median)，从而不用自己计算来自动自动绘画平均线或中位线                                            | [encode](/manual/core/encode) | -      |     |
| color | 绑定 `lineY` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域 | [encode](/manual/core/encode) | -      |      |

尝试一下：

<Playground path="style/annotation/line/demo/interval-mean-line.ts" rid="lineY-mean"></playground>

### style

| 属性           | 描述                                                                                                          | 类型                                              | 默认值                         | 必选  |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |-------|
| stroke         | 图形的描边                                                                                                    | _string_ \| _Function\<string\>_                    | -                              |       |
| strokeOpacity  | 描边透明度                                                                                                    | _number_ \| _Function\<number\>_                    | -                              |       |
| lineWidth      | 图形描边的宽度                                                                                                | _number_ \| _Function\<number\>_                    | -                              |       |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | _[number,number]_ \| _Function\<[number, number]\>_ | -                              |       |
| opacity        | 图形的整体透明度                                                                                              | _number_ \| _Function\<number\>_                    | -                              |       |
| shadowColor    | 图形阴影颜色                                                                                                  | _string_ \| _Function\<string\>_                    | -                              |       |
| shadowBlur     | 图形阴影的高斯模糊系数                                                                                        | _number_ \| _Function\<number\>_                    | -                              |       |
| shadowOffsetX  | 设置阴影距图形的水平距离                                                                                      | _number_ \| _Function\<number\>_                    | -                              |       |
| shadowOffsetY  | 设置阴影距图形的垂直距离                                                                                      | _number_ \| _Function\<number\>_                    | -                              |       |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | _string_ \| _Function\<string\>_                    | `default`                      |       |
