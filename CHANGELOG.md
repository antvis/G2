# G2 - Changelog

## 5.0.1

[发布于 2023 年 3 月 28 日](https://github.com/antvis/G2/releases/tag/5.0.1)。

修复使用 sample transform 提示形式的标题展示有误的问题。([#4832](https://github.com/antvis/G2/pull/4832))

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TXgKS6nQwJYAAAAAAAAAAAAADmJ7AQ/original" alt="tooltip-sample" width=640>

```ts
export function aaplLineAreaBasicSample(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    children: [
      {
        type: 'area',
        encode: {
          x: 'date',
          y: 'close',
        },
        transform: [
          {
            type: 'sample',
            thresholds: 100,
            strategy: 'lttb',
          },
        ],
        style: {
          fillOpacity: 0.5,
        },
        tooltip: {
          title: (d) => new Date(d.date).toUTCString(),
        },
      },
    ],
  };
}
```

修复拥有缺失数据，在使用 transpose 坐标系变换后，面积图的提示信息 crosshair 展示有误的问题 ([#4883](https://github.com/antvis/G2/pull/4833))。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RpMCQ4eCzUsAAAAAAAAAAAAADmJ7AQ/original" alt="tooltip-missing" height=800>

```ts
export function aaplAreaMissingDataTranspose(): G2Spec {
  return {
    width: 800,
    type: 'area',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close: d.date.getUTCMonth() <= 3 ? NaN : d.close,
          }),
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    scale: {
      x: { type: 'time' },
    },
    style: {
      connect: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
    tooltip: {
      title: (d) => new Date(d.date).toUTCString(),
    },
  };
}
```

## 5.0.0

[发布于 2023 年 3 月 21 日](https://github.com/antvis/G2/releases/tag/5.0.0)。
