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
    .axis('y', { tickFormatter: '.0%' });

  return chart.render().node();
})();
```

## 选项

> style

| 参数              | 说明                       | 类型     | 默认值 |
| ----------------- | -------------------------- | -------- | ------ |
| radius            | 圆角                       | `number` | `0`    |
| radiusTopLeft     | 左上角圆角                 | `number` | `0`    |
| radiusTopRight    | 右上角圆角                 | `number` | `0`    |
| radiusBottomRight | 右下角圆角                 | `number` | `0`    |
| radiusBottomLeft  | 左下角圆角                 | `number` | `0`    |
| inset             | 扇形之间的间隔，单位为角度 | `number` | `0`    |

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
    .axis('y', { tickFormatter: '.0%' });

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
    .axis('y', { tickFormatter: '.0%' })
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
    .axis('y', { tickFormatter: '~s' });

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
    .axis('y', { tickFormatter: '~s' })
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
    .encode('y', 'population')
    .encode('color', 'age')
    .axis('y', { tickFormatter: '~s' });

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
    .axis('y', { tickFormatter: '~s' })
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
    .axis('y', { tickFormatter: '~s' });

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
    .axis('y', { tickFormatter: '.0%' })
    .label({ text: 'people', position: 'inside', fill: 'white' });

  return chart.render().node();
})();
```

### 弹性条形图

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
    .axis('y', { tickFormatter: '~s' });

  return chart.render().node();
})();
```

### 不等宽条形图

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
    .encode('x', 'country')
    .encode('y', 'value')
    .encode('color', 'country')
    .encode('size', 'gdp')
    .scale('size', { range: [10, 60] })
    .axis('y', { tickFormatter: '~s' });

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
    .axis('y', false)
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
    .axis('y', { tickFormatter: '~s' });

  return chart.render().node();
})();
```

### 固定宽度的圆角条形图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
      { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
      { name: 'RELEASING', value: 48, washaway: 0 },
    ])
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('color', 'name')
    .encode('size', 80)
    .style('radiusTopLeft', 10)
    .style('radiusTopRight', 20)
    .style('radiusBottomRight', 30)
    .style('radiusBottomLeft', 40);

  return chart.render().node();
})();
```

### 饼图

```js
(() => {
  const chart = new G2.Chart({ height: 640 });

  chart.coordinate({ type: 'theta' });

  chart
    .interval()
    .transform({ type: 'stackY' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    })
    .encode('y', 'value')
    .encode('color', 'name')
    .style('stroke', 'white')
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    .legend(false)
    .label({ text: 'name', radius: 0.8, fontSize: 10, fontWeight: 'bold' })
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      radius: 0.8,
      fontSize: 9,
      dy: '0.75em',
    });

  return chart.render().node();
})();
```

### 甜甜圈图

```js
(() => {
  const chart = new G2.Chart({ height: 640 });

  chart.coordinate({ type: 'theta', innerRadius: 0.6 });

  chart
    .interval()
    .transform({ type: 'stackY' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    })
    .encode('y', 'value')
    .encode('color', 'name')
    .style('stroke', 'white')
    .style('inset', 1)
    .style('radius', 10)
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    .legend(false)
    .label({ text: 'name', fontSize: 10, fontWeight: 'bold' })
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      fontSize: 9,
      dy: '0.75em',
    });

  return chart.render().node();
})();
```

### 玫瑰图

```js
(() => {
  const chart = new G2.Chart({ width: 720, height: 720 });

  chart.coordinate({ type: 'polar' });

  chart
    .interval()
    .transform({ type: 'groupX', y: 'sum' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    })
    .encode('x', 'year')
    .encode('y', 'people')
    .scale('y', { type: 'sqrt' })
    .axis('y', {
      tickFormatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      direction: 'right',
    });

  return chart.render().node();
})();
```

### 堆叠玫瑰图

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 800,
  });
  const colors = [
    '#98abc5',
    '#8a89a6',
    '#7b6888',
    '#6b486b',
    '#a05d56',
    '#d0743c',
    '#ff8c00',
  ];

  chart.coordinate({ type: 'polar', innerRadius: 0.4 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/d582a447-2057-4a74-97ed-1d73a5459ea4.csv',
      transform: [
        {
          type: 'fold',
          fields: [
            'Under 5 Years',
            '5 to 13 Years',
            '14 to 17 Years',
            '18 to 24 Years',
            '25 to 44 Years',
            '45 to 64 Years',
            '65 Years and Over',
          ],
          as: ['Age', 'Population'],
        },
      ],
    })
    .transform({ type: 'stackY' })
    .encode('x', 'State')
    .encode('y', 'Population')
    .encode('color', 'Age')
    .scale('color', {
      range: colors,
      guide: { position: 'center', title: null, dx: 64, dy: 54 },
    })
    .scale('y', {
      type: 'sqrt',
    })
    .axis('y', {
      tickFormatter: '~s',
      tickFilter: (_, i) => i !== 0,
      direction: 'center',
    })
    .axis('x', { position: 'bottom' });

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 800,
  });
  const colors = [
    '#98abc5',
    '#8a89a6',
    '#7b6888',
    '#6b486b',
    '#a05d56',
    '#d0743c',
    '#ff8c00',
  ];

  chart.coordinate({ type: 'polar', innerRadius: 0.4 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/d582a447-2057-4a74-97ed-1d73a5459ea4.csv',
      transform: [
        {
          type: 'fold',
          fields: [
            'Under 5 Years',
            '5 to 13 Years',
            '14 to 17 Years',
            '18 to 24 Years',
            '25 to 44 Years',
            '45 to 64 Years',
            '65 Years and Over',
          ],
          as: ['Age', 'Population'],
        },
      ],
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'sortX', reverse: true })
    .encode('x', 'State')
    .encode('y', 'Population')
    .encode('color', 'Age')
    .scale('color', {
      range: colors,
      guide: { position: 'center', title: null, dx: 64, dy: 54 },
    })
    .scale('y', {
      type: 'sqrt',
      formatter: '~s',
      tickFilter: (_, i) => i !== 0,
    })
    .axis('x', { position: 'bottom' });

  return chart.render().node();
})();
```

### 玉钰图

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });

  chart
    .interval()
    .data([
      { question: '问题 1', percent: 0.21 },
      { question: '问题 2', percent: 0.4 },
      { question: '问题 3', percent: 0.49 },
      { question: '问题 4', percent: 0.52 },
      { question: '问题 5', percent: 0.53 },
      { question: '问题 6', percent: 0.84 },
      { question: '问题 7', percent: 1.0 },
      { question: '问题 8', percent: 1.2 },
    ])
    .encode('x', 'question')
    .encode('y', 'percent')
    .encode('color', 'percent')
    .style('stroke', 'white')
    .scale('color', {
      range: '#BAE7FF-#1890FF-#0050B3',
    })
    .scale('y', { tickFilter: (d, i) => i !== 0 });

  return chart.render().node();
})();
```
