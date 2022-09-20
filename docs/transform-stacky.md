# StackY

**StackY** 转换会根据指定的通道值对标识进行分组，然后根据指定的排序方法给每组内的标识排序，然后生成新的 y 通道。在视觉上会形成垂直的栈。内置的排序方法有以下几种：

- _sum_ - 根据堆叠后每个系列的 y 通道值的和进行排序
- _value_ - 根据每个系列堆叠后 y 通道值的值升序排序
- _series_ - 根据 series 或者 color 通道的字母序进行排序
- _maxIndex_ - 根据每个系列最大的索性进行排序
- _a function_ - 根据指定的函数的返回值进行排序
- _an array_ - 根据指定的字段数据进行排序
- _null_ - 遵循输入的顺序

其中 _reverse_ 选项会对顺序进行反序。同时 _y_ 渲染会控制是用上边界的 y 还是下边界的 y1 的值生成新的 y 通道。

<!-- The **stack** transform group marks into series by color or series channel, and then produce new y channel for each series by specified order, say to form vertical "stacks" by specified channels. The built-in order is as followed:

- _sum_ - order stacks by ascending total value of corresponding series
- _value_ - order stacks by ascending values of y channel
- _series_ - order stacks by nature alphabetical order of series or color channel
- _maxIndex_ - order stacks by the index of their max value of corresponding series
- _a function_ - order stacks by the specified function of data
- _an array_ - order stacks by the specified array of fields
- _null_ - respect input order

The _reverse_ option reverse any of the above orders. And the _y_ option control wether using the ceil (_y_) or floor (_y1_) of stacked y channel as the new y channel. -->

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'stackY' })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('color', 'age')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

## 选项

| 参数    | 说明                           | 类型                                                                           | 默认值  |
| ------- | ------------------------------ | ------------------------------------------------------------------------------ | ------- |
| reverse | 是否降序排序                   | `boolean`                                                                      | `false` |
| groupBy | 根据指定的通道分组             | `string \| string[]`                                                           | `x`     |
| orderBy | 指定排序方法                   | `'sum' \| 'value' \| 'series' \| 'maxIndex' \| 'Function' \| string[] \| null` | `null`  |
| y       | 对 x 比例尺定义域进行截取      | `'y' \| 'y1'`                                                                  | `'y'`   |
| series  | 是否将 series 通道的值用于排序 | `boolean`                                                                      | `true`  |

## 案例

StackY 不仅仅适用于 Interval 标识，它还使用于 Area 和 Point 表示标识。它支持的对每一“层”的排序功能，可以大大提高分析数据的效率和图表的丰富度。

### 堆叠面积图

当 _orderBy_ 是 `value` 的时候，设置 _orderBy_ 为 `d => d.unemployed` 或者 `['unemployed']` 会得到相同的结果。前者是函数比较器，或者是字段比较器。

```js | radio "options: { labels: ['value', 'series', 'sum'], values: ['value', 'series', 'sum'] }; pin: false"
orderBy = 'value';
```

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
    .transform({ type: 'stackY', orderBy: orderBy })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { formatter: '~s' })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

### 出现顺序

```js
(() => {
  const chart = new G2.Chart();
  const xy = (node) =>
    node
      .encode('x', (d) => new Date(d.year))
      .encode('y', 'revenue')
      .encode('series', 'format');

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
  });

  chart
    .area()
    .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true })
    .call(xy)
    .encode('color', 'group')
    .encode('shape', 'smoothArea')
    .scale('y', { formatter: '~s' });

  chart
    .line()
    .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' })
    .call(xy)
    .encode('shape', 'smooth')
    .style('stroke', 'white');

  return chart.render().node();
})();
```

### 堆叠点图

```js
(() => {
  const chart = new G2.Chart({ height: 360 });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
    })
    .transform({ type: 'stackY' })
    .encode('x', (d) => 2021 - d.birth)
    .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
    .encode('color', 'gender')
    .scale('color', { field: 'Gender' })
    .scale('x', { field: 'Age →', nice: true })
    .scale('y', {
      field: '← Women · Men →',
      formatter: (d) => `${Math.abs(+d)}`,
    });

  chart.annotationLineY().data([0]).encode('y', 0).style('stroke', 'black');

  return chart.render().node();
})();
```
