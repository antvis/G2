---
title: fetch
order: 1
---

获取远程的数据。

## 开始使用

```js
chart.data({
  type: 'fetch',
  value: 'https://xxx',
  format: 'json',
});
```

## 选项

| 属性      | 描述                                              | 类型              | 默认值 |
| --------- | ------------------------------------------------- | ----------------- | ------ |
| value     | fetch 请求的网络地址                              | `string`          | `[]`   |
| format    | 远程文件的数据格式类型，决定用什么方式解析        | `'json' \| 'csv'` | `json` |
| delimiter | 如果是 csv 文件，解析的时候分割符                 | `string`          | `,`    |
| autoType  | 如果是 csv 文件，解析的时候是否自动判断列数据类型 | `boolean`         | `true` |
| transform | 针对装载后的数据进行变换操作                      | `DataTransform`   | `[]`   |
