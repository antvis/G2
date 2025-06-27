---
title: fetch
order: 2
---

## Overview

G2 has two types of data sources: one is `inline`, which directly passes in specific data and is the default data source type in G2; the other data source type is `fetch`, which fetches data from remote interfaces.

G2's `fetch` supports obtaining data from remote interfaces, making data sources dynamic. It supports parsing JSON, CSV and other formats, adapts to multi-scenario data integration, and improves development efficiency and interactive experience for applications like dashboards and monitoring systems. In terms of configuration, remote data is obtained based on the `url` specified by `value`. You can specify the data type through `format`. G2 will infer the data type based on the file extension specified by `value` by default. Make sure the remote address is not authentication-protected.

### Usage

When setting data, directly pass in an object and set the type to `fetch`.

```js
// Spec
chart.options({
  type: 'point',
  data: {
    type: 'fetch', // Specify fetch type
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json', // Remote address
  },
});
```

## Getting Started

Here is an example:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: {
    x: 'weight',
    y: 'height',
    color: 'gender',
  },
});

chart.render();
```

## Configuration

| Property  | Description                                                                 | Type                                                         | Default                                              |
| --------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| value     | Network address for fetch request                                           | string                                                       | []                                                   |
| format    | Data format type of remote file, determines parsing method                  | `'json' \| 'csv'`                                            | Default takes the suffix after the last `.` in value |
| delimiter | Delimiter for parsing CSV files                                             | string                                                       | `,`                                                  |
| autoType  | Whether to automatically determine column data types when parsing CSV files | boolean                                                      | true                                                 |
| transform | Transform operations on loaded data                                         | [DataTransform](/en/manual/core/data/overview#datatransform) | []                                                   |

In the `fetch` implementation, if format is `json`, it uses JavaScript's `fetch` API and converts the return value to a JSON Object; if format is `csv`, it calls `d3-dsv` to parse the interface return value.

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

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: {
    x: 'weight',
    y: 'height',
    color: 'gender',
  },
});

chart.render();
```

## 选项

| 属性      | 描述                                                  | 类型              | 默认值 |
| --------- | ----------------------------------------------------- | ----------------- | ------ |
| value     | requested url                                         | `string`          | `[]`   |
| format    | data format                                           | `'json' \| 'csv'` | `json` |
| delimiter | delimiter for parsing for csv data                    | `string`          | `,`    |
| autoType  | wether infers the types of values for csv data or not | `boolean`         | `true` |
| transform | data transform for loaded data                        | `DataTransform`   | `[]`   |
