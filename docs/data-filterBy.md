# FilterBy

根据字段和对应函数对数据进行筛选。

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
      transform: [{ type: 'filterBy', fields: [['sold', d => d > 200]] }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```


## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| fields | 筛选规则数组。<br>第一个参数是字段名称。第二个参数针对该字段的筛选规则。<br>例如：`[['sold', d => d > 10]]`, 表示筛选数据中`sold>10`的所有数据。 | [string, (d:any)=>boolean][] | [] |


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
      // 1
      transform: [{ type: 'filterBy', fields: [['a', d => d > 0]] }],

      // 2
      transform: [{ type: 'filterBy', fields: [['a', d => d > 0], ['b', d => d < 0]] }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```
