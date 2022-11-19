# Fetch

请求 json 或 csv 格式数据。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({});

  chart
    .interval()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    .encode('x', 'date')
    .encode('y', 'deaths')
    .encode('color', 'cause')
    .scale('x', {
      guide: {
        formatter: (d) =>
          `${new Date(d).toLocaleString('en', { month: 'narrow' })}`,
      },
    })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });

  return chart.render().node();
})();
```


## API

| 参数      | 说明                       | 类型            | 默认值 |
|-----------|----------------------------|-----------------|--------|
| value     | 请求地址                   | string          | ''     |
| format    | 请求格式                   | 'json' \| 'csv' | 'json' |
| delimiter | csv 格式间隔符             | string          | ','    |
| autoType  | 是否自动将数据转为 js 格式 | boolean         | true  |



## 使用方法

### csv 格式数据

`autoType` 能自动将数据中 string 类型的数字转化成 number 类型: '123' => 123。

```js
(() => {
  const chart = new G2.Chart();

  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/87092954-aed4-48b2-93ba-b07b255f04a2.csv',
      format: 'csv',
      autoType: true
    })
    .encode('x', 'to')
    .encode('y', 'from')
    .encode('color', 'weight')

  return chart.render().node();
})();
```
### 添加其他数据处理模块

```js
(() => {
  const chart = new G2.Chart();
  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/87092954-aed4-48b2-93ba-b07b255f04a2.csv',
      format: 'csv',
      autoType: true,
      transform: [
        {
          type: 'filter',
          callback: (d) => d.weight > 100,
        }
      ]
    })
    .encode('x', 'to')
    .encode('y', 'from')
    .encode('color', 'weight')

  return chart.render().node();
})();
```
