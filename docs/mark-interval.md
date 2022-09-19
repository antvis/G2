# Interval

常用于条形图、柱状图、饼图等。

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'steelblue')
    .scale('y', { formatter: '.0%' });

  return chart.render().node();
})();
```

## API

> TODO

## 案例

### 柱状图

竖直方向的条形图又被称为柱状图，并且常常用 **SortX** 进行排序。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX' })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'steelblue')
    .scale('y', { formatter: '.0%' });

  return chart.render().node();
})();
```

### 水平条形图

指定 `Transpose` 坐标系变换可以将一个竖直方向的条形图变成水平方向的条形图，同时可以通过 `label` 设置数据标签。

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'steelblue')
    .scale('y', { formatter: '.0%' })
    .label({
      text: 'frequency',
      textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
      fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
      dx: (d) => (+d.frequency > 0.008 ? '-5px' : '5px'),
      formatter: '.1%',
    });

  return chart.render().node();
})();
```

### 堆叠条形图

条会根据 color 通道进行分组，当每一个 x 有多个条时，可以使用 **StackY** 转换堆叠条形图，防止重叠。

```js
(() => {
  const chart = new G2.Chart({ width: 1000 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'sortX', channel: 'y', reverse: true })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('color', 'age')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

### 重叠条形图

如果不使用 **StackY**，当每一个 x 有多个条时，会形成堆叠条形图。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
      format: 'csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['year', (d) => d === 2000]],
        },
      ],
    })
    .transform({ type: 'groupX', y: 'sum' })
    .encode('x', 'age')
    .encode('y', 'people')
    .encode('color', 'sex')
    .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
    .scale('y', { formatter: '~s' })
    .style('fillOpacity', 0.7);

  return chart.render().node();
})();
```

### 分组条形图

除了可以通过 **StackY** 来防止重叠之外，有两种方式来绘制分组条形图：

- 指定 **series** 通道。
- 指定 **DodgeX** 转换。

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 50 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', channel: 'y', reverse: true, slice: 6 })
    .transform({ type: 'dodgeX' })
    .encode('x', 'state')
    .encode('y', (d) => +d.population)
    .encode('color', 'age')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

### 发散条形图

当条 y 方向的值为负数的时候，就可以绘制一个发散条形图。比如下面的人口金字塔。

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['year', (d) => d === 2000]],
        },
      ],
    })
    .encode('x', 'age')
    .encode('y', (d) => (d.sex === 1 ? -d.people : d.people))
    .encode('color', 'sex')
    .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
    .scale('y', { formatter: '~s' })
    .scale('x', { range: [1, 0] });

  return chart.render().node();
})();
```

### 发散堆叠条形图

除了普通的发散条形图，当每个 x 对应条的时候，也可以绘制发散堆叠条形图。这里需要注意的是，小于零的 y 会反方向堆叠，从而保持视觉上和数据本来的顺序一致。

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 80,
  });
  const types = [
    'Strongly disagree',
    'Disagree',
    'Neither agree nor disagree',
    'Agree',
    'Strongly agree',
  ];
  const colors = ['#c30d24', '#f3a583', '#cccccc', '#94c6da', '#1770ab'];

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/82c97016-0f99-433b-ab21-9ecf14244610.csv',
    })
    .transform({ type: 'stackY' })
    .encode('x', 'question')
    .encode('color', 'type')
    .encode('y', (d) =>
      d.type === 'Disagree' || d.type === 'Strongly disagree'
        ? -d.percentage
        : d.type === 'Neither agree nor disagree'
        ? -d.percentage / 2
        : +d.percentage,
    )
    .scale('y', { nice: true })
    .scale('color', { domain: types, range: colors });

  return chart.render().node();
})();
```

### 聚合条形图

可以通过 **GroupX** 来实现聚合条形图。

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({
      type: 'groupX',
      y: 'max',
    })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'clarity')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

### 堆叠聚合条形图

当聚合的条在 x 方向重叠的时候，同样可以使用 **StackY** 来防止重叠。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/3ed6f372-5362-4861-a33b-a16a9efbc922.csv',
    })
    .transform({ type: 'groupX', y: 'count' })
    .transform({ type: 'stackY', reverse: true, orderBy: 'series' })
    .encode('x', (d) => new Date(d.date).getMonth())
    .encode('color', 'weather')
    .scale('color', {
      domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
      range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
    });

  return chart.render().node();
})();
```

### 归一化堆叠条形图

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['year', (d) => d === 2000]],
        },
      ],
    })
    .transform({ type: 'groupX', y: 'sum' })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', 'age')
    .encode('y', 'people')
    .encode('color', 'sex')
    .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
    .scale('y', { formatter: '.0%' })
    .label({ text: 'people', position: 'inside', fill: 'white' });

  return chart.render().node();
})();
```

### 不等宽条形图

可以通过 **FlexX** 转化来实现不等宽条形图。

```js
(() => {
  const chart = new G2.Chart({
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
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

### 马赛克图

```js
(() => {
  const chart = new G2.Chart({
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
    .scale('y', { guide: null })
    .scale('x', { paddingOuter: 0, paddingInner: 0.01 })
    .label({
      text: 'segment',
      x: 5,
      y: 5,
      textAnchor: 'start',
      textBaseline: 'top',
      fontSize: 10,
      fill: '#fff',
    })
    .label({
      text: 'value',
      x: 5,
      y: 5,
      textAnchor: 'start',
      dy: '1.5em',
      fontSize: 10,
      fill: '#fff',
    });

  return chart.render().node();
})();
```

### 区间条形图

可以指定 y 通道为一个数组通道来绘制区间条形图。

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

  chart
    .interval()
    .data([
      { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
      { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
      { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
      { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
      { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
      { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
      { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
      { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
      { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
      { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
      { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
      { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
      { month: 'Total', start: 0, end: 3164946 },
    ])
    .encode('x', 'month')
    .encode('y', ['end', 'start'])
    .encode('color', (d) =>
      d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    )
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```
