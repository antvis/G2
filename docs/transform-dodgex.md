# DodgeX

<!-- The dodge group marks into series by color or series channel, and then produce new series channel for each series by specified order, say to form horizontal "columns" by specified channels. The built-in order is as followed:

- _sum_ - order columns by ascending total value of corresponding series
- _value_ - order columns by ascending values of y channel
- _series_ - order columns by nature alphabetical order of series or color channel
- _maxIndex_ - order columns by the index of their max value of corresponding series
- _a function_ - order columns by the specified function of data
- _an array_ - order columns by the specified array of fields
- _null_ - respect input order

The _reverse_ option reverse any of the above orders. -->

**DodgeX** 转换对标识根据指定通道进行分组，然后根据指定的排序方式生成新的 series 通道。该 series 通道的值会对每组标识进行躲避，防止它们重叠。内置的排序有以下几种：

- _sum_ - 组内标识按照每一个系列 y 值之和排序
- _value_ - 组内标识按照每一个系列最大 y 值排序
- _series_ - 组内标识按照 series 或者 color 通道的字母序排序
- _maxIndex_ - 组内标识按照对应 series 最大的索引排序
- _a function_ - 组内标识按照指定函数返回值进行排序
- _an array_ - 组内标识按照指定字段进行排序
- _null_ - 保持和输入顺序一致

## 开始

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    .transform({ type: 'dodgeX' })
    .encode('x', 'date')
    .encode('y', 'deaths')
    .encode('color', 'cause')
    .axis('x', {
      tickFormatter: (d) =>
        `${new Date(d).toLocaleString('en', { month: 'narrow' })}`,
    })
    .axis('y', { tickFormatter: '~s' });

  return chart.render().node();
})();
```

## 选项

| 参数    | 说明                 | 类型                                                                           | 默认值  |
| ------- | -------------------- | ------------------------------------------------------------------------------ | ------- |
| reverse | 是否降序排序         | `boolean`                                                                      | `false` |
| groupBy | 根据指定的通道分组   | `string \| string[]`                                                           | `x`     |
| orderBy | 指定排序方法         | `'sum' \| 'value' \| 'series' \| 'maxIndex' \| 'Function' \| string[] \| null` | `null`  |
| padding | 每组内标识之间的间距 | `number`                                                                       | `0.1`   |

## 案例

### 分组柱状图

```js | radio "options: { labels: ['value', 'series', 'sum'], values: ['value', 'series', 'sum'] }; pin: false"
orderBy = 'value';
```

```js | range "pin: false; min: 0.1; max: 0.9; step: 0.1"
padding = 0.1;
```

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data([
      { year: '2014', type: 'Sales', sales: 1000 },
      { year: '2015', type: 'Sales', sales: 1170 },
      { year: '2016', type: 'Sales', sales: 660 },
      { year: '2017', type: 'Sales', sales: 1030 },
      { year: '2014', type: 'Expenses', sales: 400 },
      { year: '2015', type: 'Expenses', sales: 460 },
      { year: '2016', type: 'Expenses', sales: 1120 },
      { year: '2017', type: 'Expenses', sales: 540 },
      { year: '2014', type: 'Profit', sales: 300 },
      { year: '2015', type: 'Profit', sales: 300 },
      { year: '2016', type: 'Profit', sales: 300 },
      { year: '2017', type: 'Profit', sales: 350 },
    ])
    .transform({
      type: 'dodgeX',
      orderBy: orderBy,
      reverse: true,
      padding: padding,
    })
    .encode('x', 'year')
    .encode('y', 'sales')
    .encode('color', 'type');

  return chart.render().node();
})();
```

### 分组箱线图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .box()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/62fd7bf5-beb5-4791-9b62-6c66fa0204da.json',
    })
    .transform({ type: 'dodgeX', paddingInner: 0.3, paddingOuter: 0.1 })
    .encode('x', 'type')
    .encode('y', 'bin')
    .encode('color', 'Species')
    .scale('y', { zero: true })
    .style('stroke', 'black');

  return chart.render().node();
})();
```
