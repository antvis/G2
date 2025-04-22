---

title: ema

order: 2

---

## 概述

EMA（Exponential Moving Average，指数移动平均）是一种常用的数据平滑算法，它通过对最近的数据点赋予更高的权重，来减少数据的波动性，从而更清晰地观察数据的趋势变化。

在 G2 的实现中，EMA 的计算方式如下：

![ema公式示意图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3EIiS59AD8AAAAAAAAAAAAAAemJ7AQ/original)

其中：

- P<sub>t</sub>：当前时刻的原始数据值；
- EMA<sub>t-1</sub>：上一个时刻的 EMA 值；
- α：平滑因子，范围在 (0, 1) 之间。

> ⚠️ 注意：G2 中 EMA 的实现与传统定义中的 α 权重位置相反，因此：
>
> - `α` 越接近 1，平滑效果越明显；
> - `α` 越接近 0，EMA 越接近原始数据。

## 使用场景

- 时间序列中数据存在剧烈波动，希望突出趋势时；
- 金融数据如股票价格的技术分析；
- 模型训练过程中的指标平滑与动态跟踪。

## 配置项

| 属性  | 描述                                               | 类型    | 默认值  | 是否必选 |
|-------|--------------------------------------------------|---------|---------|----------|
| field | 需要平滑的字段名                                 | `string` | `'y'`  | ✓        |
| alpha | 平滑因子，控制平滑程度（越大越平滑）             | `number` | `0.6`  |          |
| as    | 生成的新字段名，若不指定将覆盖原字段             | `string` | 同 `field` |     |

> 若需保留原字段，建议设置 `as` 属性以输出到新字段。
> 该默认值由组件内部定义，非来源于主题。
> ⚠️ 注意：`field` 字段必须为数值型，否则将导致计算错误。

## 示例

以下示例展示如何在 G2 中对数据字段 `close` 应用 EMA 平滑变换。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
          transform: [
            {
              type: 'ema',
              field: 'close',
              alpha: 0.8,
              as: 'emaClose',
            },
          ],
        },
        encode: {
          x: 'date',
          y: 'emaClose',
        },
      },
      {
        type: 'line',
        style: {
          opacity: 0.3,
        },
        data: {
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
        },
        encode: {
          x: 'date',
          y: 'close',
        },
      },
    ],
  });

  return chart.render().then((chart) => chart.getContainer());
})();
```

### 示例一：突出趋势变化（时间序列）

```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'inline',
          value: [
            { t: 0, y: 100 },
            { t: 1, y: 180 },
            { t: 2, y: 120 },
            { t: 3, y: 200 },
            { t: 4, y: 150 },
            { t: 5, y: 250 },
          ],
          transform: [
            {
              type: 'ema',
              field: 'y',
              alpha: 0.6,
              as: 'emaY',
            },
          ],
        },
        encode: { x: 't', y: 'emaY' },
        style: { stroke: '#f90' },
      },
      {
        type: 'line',
        data: {
          type: 'inline',
          value: [
            { t: 0, y: 100 },
            { t: 1, y: 180 },
            { t: 2, y: 120 },
            { t: 3, y: 200 },
            { t: 4, y: 150 },
            { t: 5, y: 250 },
          ],
        },
        encode: { x: 't', y: 'y' },
        style: { stroke: '#ccc', lineDash: [4, 2] },
      },
    ],
  });
  return chart.render().then((chart) => chart.getContainer());
})();
```

### 示例二：金融行情走势平滑

```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();

  const data = Array.from({ length: 30 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    close:
      100 +
      Math.sin(i / 3) * 20 +
      (i % 5 === 0 ? 20 : 0) +
      Math.random() * 10,
  }));

  chart.options({
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'inline',
          value: data,
          transform: [
            {
              type: 'ema',
              field: 'close',
              alpha: 0.7,
              as: 'emaClose',
            },
          ],
        },
        encode: {
          x: 'date',
          y: 'emaClose',
        },
        style: {
          stroke: '#007aff',
          lineWidth: 2,
        },
      },
      {
        type: 'line',
        data: {
          type: 'inline',
          value: data,
        },
        encode: {
          x: 'date',
          y: 'close',
        },
        style: {
          stroke: '#bbb',
          lineDash: [4, 2],
        },
      },
    ],
  });

  return chart.render().then((chart) => chart.getContainer());
})();
```

### 示例三：训练过程指标平滑

```js | ob { pin:false }
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'inline',
          value: Array.from({ length: 50 }, (_, i) => ({
            epoch: i,
            loss: Math.sin(i / 5) * 20 + 60 + Math.random() * 5,
          })),
          transform: [
            {
              type: 'ema',
              field: 'loss',
              alpha: 0.4,
              as: 'emaLoss',
            },
          ],
        },
        encode: {
          x: 'epoch',
          y: 'emaLoss',
        },
        style: { stroke: '#52c41a' },
      },
      {
        type: 'line',
        data: {
          type: 'inline',
          value: Array.from({ length: 50 }, (_, i) => ({
            epoch: i,
            loss: Math.sin(i / 5) * 20 + 60 + Math.random() * 5,
          })),
        },
        encode: {
          x: 'epoch',
          y: 'loss',
        },
        style: { stroke: '#ddd', lineDash: [4, 2] },
      },
    ],
  });
  return chart.render().then((chart) => chart.getContainer());
})();
```


## 尝试一下

<Playground path="general/ema/demo/ema-basic.ts" rid="ema-style" ></playground>
