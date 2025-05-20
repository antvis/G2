---
title: quantile
order: 2
---

## 概述

`quantile` 比例尺属于**离散化比例尺**，主要用于将连续型数据按照分位数（quantile）进行分组，然后映射到指定的值域（range）。与 [threshold](/manual/core/scale/threshold) 类似，但 quantile 是根据数据的排序索引自动等分，而不是手动指定阈值。

> **核心概念**：quantile 是一种**按照数据密度自动分段**的度量。它会根据数据的分布密度自动分段，分段点（ticks）由数据的分位数决定，而不是均匀分布。scale 时是按照 ticks 进行分段映射，而不是均匀分段。ticks 的计算方式采用 `tickMethod: quantile`。
>


### 典型应用场景
将连续数据分组后映射为不同的颜色或符号。

- 色块图

- 热力图


### 映射效果举例

一般情况下不需要手动设置 ticks，设置 ticks 时效果同 quantize。min、max 等配置项对 quantile 度量无效。

- 未设置ticks
```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4 },
    { year: "1996", value: 5 },
    { year: "1997", value: 7 },
    { year: "1998", value: 7 },
    { year: "1999", value: 13 },
  ],
  encode: { x: "year", y: "value" },
  scale: { x: { range: [0, 1] }, value: { type: "quantile" } },
  children: [
    { type: "line", labels: [{ text: "value", style: { dx: -10, dy: -12 } }] },
    { type: "point", style: { fill: "white" }, tooltip: false },
  ],
});

chart.render();


  return chart.getContainer();
})();
```
> 上图说明 4-5 之间的数据密度最大。



- 设置ticks

```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { year: "1991", value: 2 },
    { year: "1992", value: 4 },
    { year: "1993", value: 2 },
    { year: "1994", value: 4 },
    { year: "1995", value: 4 },
    { year: "1996", value: 4 },
    { year: "1997", value: 4 },
    { year: "1998", value: 8 },
    { year: "1999", value: 13 },
  ],
  encode: { x: "year", y: "value" },
  scale: {
    x: { range: [0, 1] },
    value: { min: 0, type: "quantile", ticks: [0, 2, 4, 8, 10, 15] },
  },
  children: [
    { type: "line", labels: [{ text: "value", style: { dx: -10, dy: -12 } }] },
    { type: "point", style: { fill: "white" }, tooltip: false },
  ],
});

chart.render();


  return chart.getContainer();
})();
```



> **类型归属**：quantile 属于离散化比例尺（Discretizing Scale），它将连续型数据离散化后再映射。

## 配置项

| 属性        | 描述                                                                 | 类型                                                        | 默认值              | 必选 |
| ----------- | -------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------- | ---- |
| domain      | 设置数据的定义域范围                                                | `number[]`                                                  | `[]`                |      |
| range       | 设置数据映射的值域范围                                               | `any[]`                                                    | `[]`                | ✔    |
| unknown     | 对于 `undefined`、`NaN`、`null` 空值，返回的数据                    | `any`                                                       | `undefined`         |      |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不保证完全生效        | `number`                                                    | `5`                 |      |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                             | `(min: number, max: number, count: number) => number[]`     | `wilkinson-extended`|      |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                       | `boolean`                                                   | `false`             |      |

### 复杂类型说明

- **tickMethod**：
  - 类型：`(min: number, max: number, count: number) => number[]`
  - 说明：用于自定义 tick 的生成方法，默认使用 `wilkinson-extended` 算法。

## 示例


### 色块图
以下示例展示如何用 quantile 比例尺将薪资数据分为三组并映射为不同颜色：

```js | ob 
(() => {
  const chart = new G2.Chart();
chart.options({
  type: "cell",
  height: 640,
  data: {
    type: "fetch",
    value:
      "https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json",
  },
  encode: { x: "x", y: "y", color: "index" },
  scale: {
    color: { type: "quantile", range: ["#eeeeee", "#ffc3ce", "#ff0d0d"] },
  },
  style: { stroke: "#000", inset: 2 },
  animate: { enter: { type: "fadeIn" } },
});
      
chart.render();


  return chart.getContainer();
})();

```

> 在上例中，quantile 比例尺会自动根据数据分布将薪资分为三组，并映射为三种不同的颜色，适合展示数据分布的分层效果。

### 热力图


```js | ob 
(() => {
  const chart = new G2.Chart();
chart.options({
  type: "view",
  autoFit: true,
  padding: 0,
  axis: false,
  children: [
    {
      type: "image",
      style: {
        src: "https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png",
        x: "50%",
        y: "50%",
        width: "100%",
        height: "100%",
      },
      tooltip: false,
    },
    {
      type: "heatmap",
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/heatmap.json",
      },
      encode: { x: "g", y: "l", color: "tmp" },
      scale: { color: { type: "quantile" } },
      style: { opacity: 0 },
      tooltip: false,
    },
  ],
});
      
chart.render();


  return chart.getContainer();
})();

```