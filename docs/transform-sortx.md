# SortX

**SortX** 对 x 比例尺的定义域（Domain）进行排序，一般用于离散的比例尺（序数比例尺）。可以理解为将几何元素按照 x 通道的值进行分组，然后根据指定的通道和聚合函数聚合得到后的值进行排序。目前支持的聚合函数如下：

- _max_ - 根据每组的最大值排序
- _min_ - 根据每组的最小值排序
- _sum_ - 根据每组值的和排序
- _first_ - 根据每组第一个值排序
- _last_ - 根据每组最后一个值排序
- _a function_ - 根据该聚合函数返回的值排序

## 开始

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 50,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    // 条按照 y 通道值之和排序，默认为升序
    .transform({ type: 'sortX', channel: 'y', reducer: 'sum' })
    .transform({ type: 'stackY' })
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

| 参数    | 说明                      | 类型                         | 默认值  |
| ------- | ------------------------- | ---------------------------- | ------- |
| reverse | 是否降序排序              | `boolean`                    | `false` |
| by      | 排序依据的通道            | `string`                     | `'y'`   |
| reducer | 聚合每一组值的函数        | `'max' \| 'min' \| Reducer ` | `'max'` |
| slice   | 对 x 比例尺定义域进行截取 | `number \| [number, number]` | -       |

## 案例

SortX 还具有对数据进行筛选的功能，比如只想展示 Top5 的数据。

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 50,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    .transform({
      type: 'sortX',
      by: 'y',
      reducer: 'sum',
      reverse: true, // 降序排序
      slice: 5, // 只展示前 5 组数据
    })
    .encode('x', 'date')
    .encode('y', 'deaths')
    .encode('color', 'cause')
    .encode('series', 'cause')
    .axis('x', {
      tickFormatter: (d) =>
        `${new Date(d).toLocaleString('en', { month: 'narrow' })}`,
    })
    .axis('y', { tickFormatter: '~s' });

  return chart.render().node();
})();
```

## FAQ

> SortX 和数据转换 SortBy 的区别？

- SortBy 是对原始数据进行排序，但是 SorX 是对 x 比例尺的定义域进行排序。
- SortX 的能力更加强大，它可以对元素先分组再排序，SortBy 只对单个数据进行排序。
