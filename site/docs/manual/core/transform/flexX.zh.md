---
title: flexX
order: 2
---

## 概述

flexX 是一个用于调整柱形图宽度的转换方法。它允许根据数据值动态调整柱形的宽度，使得柱形的宽度能够反映另一个数据维度，从而在可视化中展示更多的信息维度。这种转换特别适用于：

1. 需要同时展示两个定量变量的场景，如国家 GDP（宽度）和人均 GDP（高度）的关系
2. 展示市场份额和细分结构的商业分析图表
3. 人口统计数据的多维度可视化，如人口总数（宽度）和年龄分布（高度）
4. 销售数据分析，如销售总额（宽度）和利润率（高度）的关系

通过 flexX 转换，我们可以在传统柱状图的基础上增加一个额外的数据维度，使图表更加信息丰富。

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    width: 800,
    height: 400,
    paddingLeft: 60,
  });

  chart
    .interval()
    .data([
      { category: '电子产品', sales: 1200000, profitRate: 0.15 },
      { category: '服装', sales: 800000, profitRate: 0.25 },
      { category: '食品', sales: 600000, profitRate: 0.12 },
      { category: '家具', sales: 400000, profitRate: 0.18 },
      { category: '图书', sales: 200000, profitRate: 0.3 },
    ])
    .transform({ type: 'flexX', field: 'sales' })
    .encode('x', 'category')
    .encode('y', 'profitRate')
    .encode('color', 'category')
    .scale('y', { nice: true })
    .axis('y', {
      title: '利润率',
      labelFormatter: '.0%',
    });

  chart.render();
  return chart.getContainer();
})();
```

## 使用场景

1. **不等宽柱形图**：当需要柱子的宽度反映数据的某个维度时，例如国家 GDP 总量决定柱子宽度，而柱高展示人均 GDP。

2. **马利梅柯图（Marimekko Chart）**：结合 stackY 和 normalizeY 转换，可以创建复杂的商业分析图表，展示市场份额和细分数据。
   <br/>
   使用国家 GDP 总量作为柱形宽度，人均 GDP 作为柱形高度：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    width: 1000,
    paddingBottom: 100,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
    })
    .transform({ type: 'flexX', field: 'gdp' })
    .encode('x', 'country')
    .encode('y', 'value')
    .encode('color', 'country')
    .axis('y', { labelFormatter: '~s' });
  chart.render();
  return chart.getContainer();
})();
```

## 配置项

| 属性    | 描述                   | 类型                                  | 默认值 | 必选 |
| ------- | ---------------------- | ------------------------------------- | ------ | ---- |
| field   | 指定生成权重数组的字段 | `string` \| `(d: any) => Primitive[]` | -      | 否   |
| channel | 指定生成权重数组的通道 | string                                | `y`    | 否   |
| reducer | 聚合每一组权重的函数   | `Reducer`                             | sum    | 否   |

### 类型定义

```ts
// 基础数据类型
type Primitive = number | string | boolean | Date;

// 聚合函数类型
type Reducer = 'sum' | ((I: number[], V: Primitive[]) => Primitive);
```

### 参数说明

- **field**: 用于指定柱形宽度的数据字段。当设置了 field 时，其优先级高于 channel。
- **channel**: 指定用于计算柱形宽度的编码通道，默认使用 'y' 通道的值。
- **reducer**: 聚合函数，用于计算最终的宽度值。默认使用 'sum' 求和。

## 示例

### 1. 马利梅柯图（Marimekko Chart）

结合 stackY 和 normalizeY 转换创建市场分析图：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    width: 900,
    height: 800,
    paddingLeft: 0,
    paddingRight: 0,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
    })
    .transform({ type: 'flexX', reducer: 'sum' })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', 'market')
    .encode('y', 'value')
    .encode('color', 'segment')
    .scale('x', { paddingOuter: 0, paddingInner: 0.01 });
  chart.render();
  return chart.getContainer();
})();
```

在这个例子中，flexX 转换使得每个市场部分的宽度与其总价值成正比，结合堆叠和归一化处理，可以清晰地展示市场份额的分布情况。

这个例子展示了如何使用 flexX 来可视化人口数据，其中柱子的宽度表示州/省的总人口数量，高度表示人口密度，颜色区分不同地区。

### 2. 时间序列数据分析

展示每月销售数据，使用交易量作为宽度，价格变化率作为高度：

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'interval',
    width: 800,
    height: 400,
    paddingLeft: 60,
    data: [
      { month: '1月', volume: 5000, priceChange: 0.08 },
      { month: '2月', volume: 8000, priceChange: -0.05 },
      { month: '3月', volume: 12000, priceChange: 0.12 },
      { month: '4月', volume: 6000, priceChange: -0.03 },
      { month: '5月', volume: 9000, priceChange: 0.15 },
      { month: '6月', volume: 15000, priceChange: -0.08 },
    ],
    encode: {
      x: 'month',
      y: 'priceChange',
      color: (d) => (d.priceChange > 0 ? 'red' : 'green'),
    },
    transform: [{ type: 'flexX', field: 'volume' }],
    scale: { y: { nice: true } },
    style: { radius: 4 },
    axis: { y: { title: '价格变化率', labelFormatter: '.0%' } },
  });

  chart.render();
  return chart.getContainer();
})();
```

这个时间序列示例展示了如何使用 flexX 来可视化交易数据，其中柱形的宽度表示交易量大小，高度表示价格变化率，颜色区分涨跌情况。通过这种方式，我们可以同时观察到交易活跃度和价格走势的关系。
