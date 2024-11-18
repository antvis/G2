---
title: ema
order: 1
---


EMA（Exponential Moving Average）是一种常用的平滑算法，用于计算数据的指数移动平均值。它通过给较近的数据赋予权重来平滑数据，从而减少噪声和波动。

在模型训练中，可以使用EMA来平滑数据，观察数据变化趋势。

如下公式显示，α越大平滑效果更明显


$EMA_t =  (1 - \alpha) \cdot P_t +  \alpha \cdot EMA_{t-1}$

具体细节可参考[文档](https://en.wikipedia.org/wiki/Exponential_smoothing)  



## 开始使用

```ts
const data = [
  { x: 1, y: 2 },
  { x: 4, y: 5 },
  { x: 5, y: 8 },
];

chart
  .data({
    type: 'line',
    value: data,
    transform: [
      {
        type: 'ema',
        field: 'y',
        alpha: 0.6,
        as: 'other'
      },
    ],
  });
```

上述例子处理之后，数据变成为：

```js
[
  {
    "x": 1,
    "y": 2,
    "other": 2,
  },
  {
    "x": 4,
    "y": 3.2,
    "other": 3.2,
  },
  {
    "x": 5,
    "y": 5.12,
    "other": 5.12,
  }
];
```

## 开始使用

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
            },
          ],
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
      },
    ],
    encode: {
      x: 'date',
      y: 'close',
    },
  });

  return chart.render().then((chart) => chart.getContainer());
})();
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------------------| --------------------|
| field     |  需要处理的字段列表                             | string    |  y          |
| alpha     |  平滑因子,范围在0-1                             | number   | 0.6          |
| as     |         存储的字段, 默认是field传入的值，可自定义字段避免覆盖原字段数据                     | string   | y          |
