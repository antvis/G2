---
title: fetch
order: 2
---

## 概述

G2 的数据源来源有两种，一种是 `inline`，即直接传入具体的数据，这种是 G2 默认的数据源类型；另外一种数据源类型是 `fetch`，即从远程接口获取数据。

G2 的 `fetch` 支持从远程接口获得数据，让数据源具备一定的动态性，支持 JSON、CSV 等格式解析，适配多场景数据集成，提升大屏、监控等应用的开发效率与交互体验。配置上，根据 `value` 指定的 `url` 获取远程的数据。可以通过 `format` 去指定数据类型，G2 默认会根据 `value` 指定的文件后缀名去推断数据类型，记得保证远程的地址没有设置鉴权。

### 使用方式

直接在设置数据得时候，传入一个对象，并设置类型 type 为 `fetch`。

```js
// Spec
chart.options({
  type: 'point',
  data: {
    type: 'fetch', // 指定 fetch 类型
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json', // 远程地址
  },
});
```

## 开始使用

举一个例子如下：

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

## 配置项

| 属性      | 描述                                              | 类型                                                      | 默认值                         |
| --------- | ------------------------------------------------- | --------------------------------------------------------- | ------------------------------ |
| value     | fetch 请求的网络地址                              | string                                                    | []                             |
| format    | 远程文件的数据格式类型，决定用什么方式解析        | `'json' \| 'csv'`                                         | 默认取 value 末尾 `.` 后的后缀 |
| delimiter | 如果是 csv 文件，解析的时候分割符                 | string                                                    | `,`                            |
| autoType  | 如果是 csv 文件，解析的时候是否自动判断列数据类型 | boolean                                                   | true                           |
| transform | 对加载后的数据进行变换操作                        | [DataTransform](/manual/core/data/overview#datatransform) | []                             |

在 `fetch` 实现上，如果 format 为 `json`，则使用 JavaScript 的 `fetch` API 然后将返回值转成 JSON Object；如果 format 为 `csv`，则调用 `d3-dsv` 去解析接口返回值。
