# Line

用于绘制折线图等。

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    })
    .encode('x', 'date')
    .encode('y', 'close');

  return chart.render().node();
})();
```

## 选项

> Style

| 参数                 | 说明                                                                                         | 类型                  | 默认值  |
| -------------------- | -------------------------------------------------------------------------------------------- | --------------------- | ------- |
| connectNulls          | 是否连接缺失数据区域，当有缺失数据的时候生。效                                               | `boolean`             | `false` |
| defined              | 是否为有有效点的验证函数，默认当 x 或者 y 为 `undefined`，`null`，`NaN` 的时候返回 `false`。 | `(d: any) => boolean` | -       |
| `missing[StyleName]` | 连接缺失区域线条的样式。                                                                     | `number`              | `0`     |

## 案例

### 系列折线图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
    })
    .encode('x', 'date')
    .encode('y', 'unemployment')
    .encode('series', 'division')
    .encode('color', 'steelblue');

  return chart.render().node();
})();
```

### 聚合折线图和标签

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      fontSize: 10,
      transform: [{ type: 'dodgeY' }],
    });

  return chart.render().node();
})();
```

### 数据缺失折线图

默认不会连接缺失区域。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      transform: [
        // 模拟数据缺失
        {
          type: 'map',
          callback: (d) =>
            Object.assign(d, {
              close: d.date.getUTCMonth() < 3 ? NaN : d.close,
            }),
        },
      ],
    })
    .encode('x', 'date')
    .encode('y', 'close');

  return chart.render().node();
})();
```

可以通过配置 `connectNulls` 来连接缺失区域。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      transform: [
        // 模拟数据缺失
        {
          type: 'map',
          callback: (d) =>
            Object.assign(d, {
              close: d.date.getUTCMonth() < 3 ? NaN : d.close,
            }),
        },
      ],
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .style('connectNulls', true);

  return chart.render().node();
})();
```

可以通过 `missing[StyleName]` 的方式来配置连接缺失数据区间线段的样式。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      transform: [
        // 模拟数据缺失
        {
          type: 'map',
          callback: (d) =>
            Object.assign(d, {
              close: d.date.getUTCMonth() < 3 ? NaN : d.close,
            }),
        },
      ],
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .style('missingStroke', 'red')
    .style('missingLineWidth', 10)
    .style('connectNulls', true);

  return chart.render().node();
})();
```

### 斜率图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f0bbdcaa-9dbf-4d44-95c1-ac2e26765023.csv',
    })
    .encode('x', 'year')
    .encode('y', 'receipts')
    .encode('series', 'country')
    .encode('color', '#000')
    .scale('x', { type: 'point', padding: 0.25 })
    .label({
      text: (d) => `${d.country} ${d.receipts}`,
      textAnchor: 'end',
      selector: 'first',
      fontSize: 10,
      dx: -3,
      transform: [{ type: 'dodgeY' }],
    })
    .label({
      text: (d) => `${d.receipts} ${d.country}`,
      selector: 'last',
      fontSize: 10,
      dx: 3,
      transform: [{ type: 'dodgeY' }],
    });

  return chart.render().node();
})();
```
