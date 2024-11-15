---
title: ema
order: 1
---

对数据进行指数平滑 

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
      },
    ],
  });
```

上述例子处理之后，数据变成为：

```js
[
    {
        "x": 1,
        "y": 2
    },
    {
        "x": 4,
        "y": 3.2
    },
    {
        "x": 5,
        "y": 5.12
    }
];
```

## 开始使用
渲染了处理前，处理后的数据
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
