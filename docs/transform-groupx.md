# GroupX

**GroupX** 将标识按照 x 通道的值进行分组，然后对每组标识的通道值按照指定的聚合函数进行聚合。支持的聚合函数如下：

- _count_ - 返回数量
- _sum_ - 返回总和
- _min_ - 返回最小值
- _max_ - 返回最大值
- _first_ - 返回第一值
- _last_ - 返回最后一个值
- _mean_ - 返回平均值
- _median_ - 返回中位数
- _a function_ - 聚合函数

## 开始

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
    // 指定 y 通道是每一组的数量
    .transform({ type: 'groupX', y: 'count' })
    .encode('x', 'clarity')
    .encode('color', 'clarity')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

## 选项

| 参数      | 说明                     | 类型                                                                            | 默认值 |
| --------- | ------------------------ | ------------------------------------------------------------------------------- | ------ |
| [channel] | 指定每一个通道的聚合函数 | `'min' \| 'max' \| 'first' \| 'last' \| 'mean' \| 'median' \| 'sum' \| Reducer` | -      |

## 案例

这里通过如下的珠宝数据来看看不同的聚合的使用方式和效果。

```js | table "pin: false"
data = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
);
```

```js | select "pin: false; options: { labels: ['first', 'last', 'min', 'max', 'mean', 'median', 'sum', ], values: ['first', 'last', 'min', 'max', 'mean', 'median', 'sum'] }; "
reducer = 'first';
```

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data(data)
    .transform({
      type: 'groupX',
      y: reducer,
    })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'clarity')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

在上面的基础上我们还可以使用 **SortX** 转换将聚合后的 Interval 排序。

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data(data)
    .transform({ type: 'groupX', y: reducer })
    .transform({ type: 'sortX' })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'clarity')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```
