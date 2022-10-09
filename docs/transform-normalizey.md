# NormalizeY

**NormalizeY** 转换会将标识按照指定的通道进行分组，然后对每一个系列的 y 通道的值进行转换。可以理解为对这些值相对某个基准进行归一化。默认的基准是 `max`，同时标识会按照 x 通道的值进行分组。内置的基准如下：

- _min_ - 以最小值为基准进行归一化
- _max_ - 以最大值为基准进行归一化
- _first_ - 以第一个值为基准进行归一化
- _last_ - 以第最后一个值为基准进行归一化
- _mean_ - 以平均值为基准进行归一化
- _median_ - 以中位数为基准进行归一化
- _sum_ - 以总和为基准进行归一化
- _deviation_ - 以离差为基准进行归一化

<!-- The **NormalizeY** transform group marks into series by specified channels, and then transform each series's value, say to transform them relative to some basis to apply a moving average. The default basis is `max` and the marks are grouped by `x` channel by default. The built-in basis is as followed:

- min
- max
- first
- last
- mean
- extent
- median
- sum
- deviation -->

## 开始

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

  chart
    .interval()
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .transform({ type: 'stackY' })
    // 指定 normalizeY 转换
    .transform({ type: 'normalizeY' })
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city')
    .axis('y', { tickFormatter: '.0%' });

  return chart.render().node();
})();
```

## 选项

| 参数    | 说明               | 类型                                                                                | 默认值 |
| ------- | ------------------ | ----------------------------------------------------------------------------------- | ------ |
| groupBy | 根据指定的通道分组 | `string \| string[]`                                                                | `x`    |
| basis   | 指定归一化的基准   | `'min' \| 'max' \| 'first' \| 'last' \| 'mean' \| 'median' \| 'sum' \| 'deviation'` | `max`  |

## 案例

### 归一化折线图

这里通过折线图来看看认识不同的基准。

```js | select "pin: false; options: { labels: ['first', 'last', 'min', 'max', 'mean', 'median', 'sum', 'deviation', 'none'], values: ['first', 'last', 'min', 'max', 'mean', 'median', 'sum', 'deviation', 'none'] }; "
basis = 'first';
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
    })
    .call((node) =>
      basis === 'none'
        ? node
        : node.transform({
            type: 'normalizeY',
            groupBy: 'series',
            basis: basis,
          }),
    )
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('x', { title: 'Date' });

  return chart.render().node();
})();
```

### 归一化堆叠面积图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smooth')
    .axis('x', { title: 'Date' })
    .axis('color', { size: 72, autoWrap: true, maxRows: 3, cols: 6 });

  return chart.render().node();
})();
```
