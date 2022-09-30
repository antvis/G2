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

> TODO

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
