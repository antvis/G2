# Area

`Area` 图形标记大部分场景用来绘制我们常见的面积图，它是在折线图的基础上，将包围的区域使用颜色或者纹理填充，可以用来更好的突出趋势，以及趋势的堆积信息。

在视觉通道设计上，`Area` 除了和 `Line` 不同的地方在于，可以设置 `y` 为长度为 2 的数组，分别代表面积的上边界和下边界，默认下边界为 0。

## 快速开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
      { year: '1951 年', sale: 38 },
      { year: '1952 年', sale: 52 },
      { year: '1956 年', sale: 61 },
      { year: '1957 年', sale: 145 },
      { year: '1958 年', sale: 48 },
      { year: '1959 年', sale: 38 },
      { year: '1960 年', sale: 38 },
      { year: '1962 年', sale: 38 },
    ])
    .encode('x', 'year')
    .encode('y', 'sale');

  return chart.render().node();
})();
```

## API

`Area` 对应的 shape 图形有以下：

| shape  | 描述                   | 示例                                                                                                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `area` | 直线链接的面积图 | <img alt='area shape' height='32' src='https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*06vFRoelE68AAAAAAAAAAAAAARQnAQ' /> |
| `smooth` | 平滑曲线的面积图 | <img alt='smooth shape' height='32' src='https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*YaoNSpVhlJ0AAAAAAAAAAAAAARQnAQ' /> |
| `step` | 阶梯面积图 | <img alt='step shape' height='32' src='https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*Z_6BTI4eycQAAAAAAAAAAAAAARQnAQ' /> |


## 使用方式

在这里，可以切换不同的 `shape` 对应的样式和形状。

```js | radio "options: { labels: ['smooth', 'area', 'step'], values: ['smooth', 'area', 'step'] }; pin: false"
shape = 'smooth';
```

### 分组面积图

```js
(() => {
  const chart = new G2.Chart();
  chart
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json'
    })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', shape)
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });
  return chart.render().node();
})()
```

### 堆积面积图

```js
(() => {
  const chart = new G2.Chart();
  chart
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json'
    })
    .transform({ type: 'stackY' })
    // .transform({ type: 'symmetryY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', shape)
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });
  return chart.render().node();
})()
```

### 对称面积图

```js
(() => {
  const chart = new G2.Chart();
  chart
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json'
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'symmetryY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', shape)
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });
  return chart.render().node();
})()
```

### 百分比堆积面积图

```js
(() => {
  const chart = new G2.Chart();
  chart
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json'
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', shape)
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });
  return chart.render().node();
})()
```

### 渐变色面积图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
      { year: '1991', value: 0 },
      { year: '1992', value: 632 },
      { year: '1993', value: 432 },
      { year: '1994', value: 1941 },
      { year: '1995', value: 1532 },
      { year: '1996', value: 15588 },
      { year: '1997', value: 16514 },
      { year: '1998', value: 16572 },
      { year: '1999', value: 17765 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'value')
    .encode('shape', shape)
    .encode('series', 'a')
    .style('gradient', true);

  return chart.render().node();
})();
```

### 雷达图

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

  chart
    .area()
    .data([
      { item: 'Design', type: 'a', score: 70 },
      { item: 'Design', type: 'b', score: 30 },
      { item: 'Development', type: 'a', score: 60 },
      { item: 'Development', type: 'b', score: 70 },
      { item: 'Marketing', type: 'a', score: 50 },
      { item: 'Marketing', type: 'b', score: 60 },
      { item: 'Users', type: 'a', score: 40 },
      { item: 'Users', type: 'b', score: 50 },
      { item: 'Test', type: 'a', score: 60 },
      { item: 'Test', type: 'b', score: 70 },
      { item: 'Language', type: 'a', score: 70 },
      { item: 'Language', type: 'b', score: 50 },
      { item: 'Technology', type: 'a', score: 50 },
      { item: 'Technology', type: 'b', score: 40 },
      { item: 'Support', type: 'a', score: 30 },
      { item: 'Support', type: 'b', score: 40 },
      { item: 'Sales', type: 'a', score: 60 },
      { item: 'Sales', type: 'b', score: 40 },
      { item: 'UX', type: 'a', score: 50 },
      { item: 'UX', type: 'b', score: 60 },
    ])
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .encode('shape', 'smooth')
    .scale('x', { guide: { type: 'axisX' }, padding: 0.5, align: 0 })
    .scale('y', {
      guide: { type: 'axisY', zIndex: 1 },
      tickCount: 5,
    })
    .style('fillOpacity', 0.5);

  return chart.render().node();
})();
```

## 实际案例

使用几个社区实际案例来介绍，如果使用 `Area` 图形标记。

### 空数据连接

使用 `connectNulls` 对于空数据进行连接，让异常数据也能很好的可视化在面积图中。


### 数据标签




### 颜色区分


## FAQ
