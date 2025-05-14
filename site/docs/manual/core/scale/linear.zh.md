---
title: linear
order: 2
---

## 概述

针对连续型数据的基础线性比例尺，它的核心作用是将数据从数据域（domain）线性映射到视觉范围（range），同时保留数据之间的比例关系。每个输出值 y 均可表示为输入值 x 的线性函数：`y = mx + b`。

## 使用方式

linear 比例尺常规用于将数据映射到归一化坐标上。这个例子中会将 y 通道的比例尺设置它的映射方式，从而影响到图形在画布上的位置。

```ts
chart
  .line()
  .encode('x', 'year')
  .encode('y', 'sale')
  .scale('y', {
    type: 'linear',
    range: [0.2, 0.8],
    /* 其他配置项 */
  });
```

### 何时使用 linear 比例尺？

数据类型为连续数值，比如：价格、温度；

需要保持数据比例关系，比如：颜色渐变、图形大小。

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'line',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

也可以配置在 View 层级：

```ts
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

## 配置项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain      | 设置数据的定义域范围                                            | `number[]` | 输入数据的最大最小值范围 |
| domainMin      | 设置数据的定义域最小值                                     | `number` | 输入数据的最小值 |
| domainMax      | 设置数据的定义域最大值                                           | `number` | 输入数据的最大 |
| range       | 设置数据映射的值域范围                                           | `number[]` \| `string[]` | `[0, 1]` |
| rangeMin       | 设置数据映射的值域最小值                                        | `number \| string` | `0` |
| rangeMax       | 设置数据映射的值域最大值                                      | `number \| string` | `1` |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                | `any` | `undefined` |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number` | `5` |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                           | `(min: number, max: number, count: number) => number[]`      | `d3-ticks` |
| round       | 输出值去四舍五入                                                | `boolean` | `false` |
| clamp       | 将映射值限定在 range 的范围内                                     | `boolean` | `false` |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                     | `boolean` | `false` |
| interpolate | 自定义差值函数                                                  | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## 示例

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'line',
    autoFit: true,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    },
    encode: {
      x: (d) => new Date(d.Date),
      y: 'Close',
      color: 'Symbol',
      key: 'Symbol',
      title: (d) => d.Date.toLocaleString(),
    },
    axis: {
      y: {
        title: '↑ Change in price (%)',
        labelAutoRotate: false,
      },
    },
    scale: {
      y: {
        type: 'log',
      },
    },
    label: {
      text: 'Symbol',
      selector: 'last',
      style: {
        fontSize: 10,
      },
    },
    interaction: {
      tooltip: {
        crosshairs: false, // 关闭辅助线
      },
      chartIndex: {
        ruleStroke: 'pink',
        ruleLineWidth: 8,
        ruleLineDash: [4, 8],
        ruleShadowColor: 'green',
        ruleShadowBlur: 5,
        ruleShadowOffsetX: 5,
        ruleShadowOffsetY: 5,
        ruleOpacity: 0.9,
        labelDy: 30,
        labelFontSize: 20,
        labelTextAlign: 'center',
        labelFill: 'red',
        labelStroke: 'yellow',
        labelLineWidth: 2,
        labelFormatter: (d) => `${d.toLocaleDateString()}`,
      },
    },
  });

  chart.render();
  return chart.getContainer();
})();
```

## FAQ

- 怎么自定义 y 轴的刻度？

比如只需要在刻度上显示 0, 100, 600，那就以下方式设置 y 比例尺。

```ts
chart
  .line()
  // ...
  .scale('y', {
    type: 'linear',
    domain: [0, 700],
    tickMethod: () => [0, 100, 600]
  });
```
