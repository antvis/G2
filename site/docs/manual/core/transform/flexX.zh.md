---
title: flexX
order: 2
---

## 概述

flexX 是一个用于调整柱形图宽度的转换方法。它允许根据数据值动态调整柱形的宽度，使得柱形的宽度能够反映另一个数据维度，从而在可视化中展示更多的信息维度。这种转换特别适用于需要同时展示两个定量变量的场景，比如展示国家 GDP 和人均 GDP 的关系。

## 使用场景

1. **不等宽柱形图**：当需要柱子的宽度反映数据的某个维度时，例如国家 GDP 总量决定柱子宽度，而柱高展示人均 GDP。

2. **马利梅柯图（Marimekko Chart）**：结合 stackY 和 normalizeY 转换，可以创建复杂的商业分析图表，展示市场份额和细分数据。

## 配置项

| 属性    | 描述                   | 类型                                  | 默认值  | 必选 |
| ------- | ---------------------- | ------------------------------------- | ------- | ---- |
| field   | 指定生成权重数组的字段 | `string` \| `(d: any) => Primitive[]` | -       | 否   |
| channel | 指定生成权重数组的通道 | `string`                              | `'y'`   | 否   |
| reducer | 聚合每一组权重的函数   | `Reducer`                             | `'sum'` | 否   |

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

### 1. GDP 不等宽柱形图

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

### 2. 马利梅柯图（Marimekko Chart）

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
