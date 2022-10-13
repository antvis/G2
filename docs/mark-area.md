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

使用 `connectNulls` 对于空数据进行连接，让异常数据也能很好的可视化在面积图中。我们以一个交易情况的数据为例，模拟每年年初到 3 月份，交易关闭数据为空的情况。

```js | table "pin: false"
aapl = genji.fetchJSON(
  'https://assets.antv.antgroup.com/g2/aapl.json',
).then((data) => {
  // Mock missing data.
  return data.map((d) => ({
    date: new Date(d.date),
    close: new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close, // Mock missing data.
  }));
});
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data(aapl)
    .encode('x', 'date')
    .encode('y', 'close')
    .scale('x', { type: 'time' })
    .style('connectNulls', true)
    .style('connectFill', 'grey')
    .style('connectFillOpacity', 0.15);

  return chart.render().node();
})();
```

### 数据标签

使用面积图专属的 `area` 标签定位，可以让面积图的标签更加美观清晰。这里使用美国各大区、州的收人数据为例，绘制具体的数据标签，并调整标签的位置、角度，让其显示到最优的位置上。

```js | dom "pin: false"
state = [
  'Massachusetts',
  'Connecticut',
  'Maine',
  'Rhode Island',
  'New Hampshire',
  'Vermont',
  'New York',
  'Pennsylvania',
  'New Jersey',
  'North Carolina',
  'Virginia',
  'Georgia',
  'Florida',
  'Maryland',
  'South Carolina',
  'West Virginia',
  'District of Columbia',
  'Delaware',
  'Tennessee',
  'Kentucky',
  'Alabama',
  'Mississippi',
  'Texas',
  'Louisiana',
  'Oklahoma',
  'Arkansas',
  'Illinois',
  'Ohio',
  'Michigan',
  'Indiana',
  'Wisconsin',
  'Missouri',
  'Minnesota',
  'Iowa',
  'Kansas',
  'Nebraska',
  'South Dakota',
  'North Dakota',
  'Colorado',
  'Arizona',
  'Utah',
  'New Mexico',
  'Montana',
  'Idaho',
  'Nevada',
  'Wyoming',
  'California',
  'Washington',
  'Oregon',
  'Hawaii',
  'Alaska',
];
```

```js | dom "pin: false"
regionStateMap = new Map([
  ['Alaska', 'Pacific'],
  ['Alabama', 'East South Central'],
  ['Arkansas', 'West South Central'],
  ['Arizona', 'Mountain'],
  ['California', 'Pacific'],
  ['Colorado', 'Mountain'],
  ['Connecticut', 'New England'],
  ['District of Columbia', 'South Atlantic'],
  ['Delaware', 'South Atlantic'],
  ['Florida', 'South Atlantic'],
  ['Georgia', 'South Atlantic'],
  ['Hawaii', 'Pacific'],
  ['Iowa', 'West North Central'],
  ['Idaho', 'Mountain'],
  ['Illinois', 'East North Central'],
  ['Indiana', 'East North Central'],
  ['Kansas', 'West North Central'],
  ['Kentucky', 'East South Central'],
  ['Louisiana', 'West South Central'],
  ['Massachusetts', 'New England'],
  ['Maryland', 'South Atlantic'],
  ['Maine', 'New England'],
  ['Michigan', 'East North Central'],
  ['Minnesota', 'West North Central'],
  ['Missouri', 'West North Central'],
  ['Mississippi', 'East South Central'],
  ['Montana', 'Mountain'],
  ['North Carolina', 'South Atlantic'],
  ['North Dakota', 'West North Central'],
  ['Nebraska', 'West North Central'],
  ['New Hampshire', 'New England'],
  ['New Jersey', 'Middle Atlantic'],
  ['New Mexico', 'Mountain'],
  ['Nevada', 'Mountain'],
  ['New York', 'Middle Atlantic'],
  ['Ohio', 'East North Central'],
  ['Oklahoma', 'West South Central'],
  ['Oregon', 'Pacific'],
  ['Pennsylvania', 'Middle Atlantic'],
  ['Rhode Island', 'New England'],
  ['South Carolina', 'South Atlantic'],
  ['South Dakota', 'West North Central'],
  ['Tennessee', 'East South Central'],
  ['Texas', 'West South Central'],
  ['Utah', 'Mountain'],
  ['Virginia', 'South Atlantic'],
  ['Vermont', 'New England'],
  ['Washington', 'Pacific'],
  ['Wisconsin', 'East North Central'],
  ['West Virginia', 'South Atlantic'],
  ['Wyoming', 'Mountain'],
]);
```

```js | dom "pin: false"
populationByState = genji.fetchJSON(
  'https://assets.antv.antgroup.com/g2/population-by-state.json',
).then(data => data.map(d => Object.assign({}, d, { date: new Date(d.date) })));
```

```js
(() => {
  const chart = new G2.Chart({ width: 800 });

  chart.data({
    type: 'inline',
    value: populationByState,
    transform: [{
      type: 'fold',
      fields: state,
      as: ['state', 'population'],
    }, {
      type: 'map',
      callback: d => Object.assign({}, d, { region: regionStateMap.get(d.state) }),
    }],
  });

  chart
    .area()
    .transform([{ type: 'stackY' }, { type: 'normalizeY' }])
    .encode('x', 'date')
    .encode('y', 'population')
    .encode('color', 'region')
    .encode('series', 'state')
    .label({
      text: 'state',
      position: 'area',
      selector: 'first',
      fontSize: 10,
      transform: [{ type: 'hideOverlap' }],
    });

  chart
    .line()
    .transform([{ type: 'stackY' }, { type: 'normalizeY' }])
    .encode('x', 'date')
    .encode('y', 'population')
    .encode('series', 'state')
    .style('stroke', '#000')
    .style('lineWidth', 0.5)
    .style('fillOpacity', 0.8);

  return chart.render().node();
})();
```

### 面积颜色对比

通过两个面积之间的 diff，并赋予不同的颜色，让图形更加容易关注到之间的差别。这里使用`纽约`和`旧金山`的气温情况进行对比，如果纽约的气温高于旧金山，则显示为绿色，否则为红色。

```js | dom "pin: false"
weather = genji.fetchJSON(
  'https://assets.antv.antgroup.com/g2/weather.json',
).then(data => data.map(d => Object.assign({}, d, { date: new Date(d.date) })));
```

```js
(() => {
  const chart = new G2.Chart({ width: 800 });

  chart.data(weather);

  chart
    .area()
    .data({
      transform: [{
        type: 'fold',
        fields: ['New York', 'San Francisco'],
        as: ['city', 'temperature'],
      }]
    })
    .transform([{ type: 'diffY' }]) // 对面积进行 diff 操作
    .encode('x', 'date')
    .encode('y', 'temperature')
    .encode('color', 'city')
    .encode('shape', 'step')
    .scale('color', { range: ['#67a9cf', '#ef8a62'] });

  chart
    .line()
    .encode('x', 'date')
    .encode('y', 'San Francisco')
    .encode('shape', 'hvh')
    .style('stroke', '#000');

  return chart.render().node();
})();
```

## FAQ
