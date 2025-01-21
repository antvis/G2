---
title: fetch
order: 1
---

Load data from a `url` specified by the `value` option. G2 will infer the data type from the file extension by default. The format of input data can also be specified by the `format` option.

```js
// Spec
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
});
```

```js
// API
chart.data({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
});
```

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    },
    encode: {
      x: 'weight',
      y: 'height',
      color: 'gender',
    },
  });

  return chart.render().then((chart) => chart.getContainer());
})();
```

## 选项

| 属性      | 描述                                                  | 类型              | 默认值 |
| --------- | ----------------------------------------------------- | ----------------- | ------ |
| value     | requested url                                         | `string`          | `[]`   |
| format    | data format                                           | `'json' \| 'csv'` | `json` |
| delimiter | delimiter for parsing for csv data                    | `string`          | `,`    |
| autoType  | wether infers the types of values for csv data or not | `boolean`         | `true` |
| transform | data transform for loaded data                        | `DataTransform`   | `[]`   |
