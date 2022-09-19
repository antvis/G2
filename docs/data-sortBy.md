# SortBy

根据字段对数据进行排序。

## 快速开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      value: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      transform: [{ type: 'sortBy', fields: [['sold', true]] }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```


## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| fields | 字段排序规则数组。<br/>第一个参数是字段名称。第二个参数为 true 表示升序，false 表示降序。<br/>例如：`[['sold', true]]`。根据 sold 字段升序排列。 | [string, boolean][] | [] |


## 使用方法

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      value: [
      { a: 3, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4 },
    ],
      // a, b 均升序排列
      transform: [{ type: 'sortBy', fields: ['a', 'b'] }],

      // a 升序, b 降序
      transform: [{ type: 'sortBy', fields: ['a', ['b', false]] }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```
