---
title: fetch
order: 1
---

根据 `value` 指定的 `url` 获取远程的数据。可以通过 `format` 去指定数据类型，G2 默认会根据 `value` 指定的文件后缀名去推断数据类型。

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

| 属性      | 描述                                              | 类型              | 默认值 |
| --------- | ------------------------------------------------- | ----------------- | ------ |
| value     | fetch 请求的网络地址                              | `string`          | `[]`   |
| format    | 远程文件的数据格式类型，决定用什么方式解析        | `'json' \| 'csv'` | `json` |
| delimiter | 如果是 csv 文件，解析的时候分割符                 | `string`          | `,`    |
| autoType  | 如果是 csv 文件，解析的时候是否自动判断列数据类型 | `boolean`         | `true` |
| transform | 对加载后的数据进行变换操作                        | `DataTransform`   | `[]`   |
