---
title: "custom"
description: "通过自定义回调处理整个数据集，实现内置数据转换之外的数据加工。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/data/custom/"
version: "5.4.8"
---

[资料索引](/llms.txt)

使用自定义函数的方式来进行数据的加工和处理，这是最为灵活的一种方式。

`custom` 是 `data.transform` 中的数据转换，不是替代 `inline` / `fetch` 的数据源类型。回调接收上一步的数据并返回下一步的数据；不要把函数直接赋给普通标记的 `data`。

## 开始使用

```ts
chart.options({
  type: 'view',
  data: {
    type: 'inline',
    value: [{ value: 1 }, { value: 2 }],
    transform: [
      {
        type: 'custom',
        callback: (rows) => rows.filter((d) => d.value > 1),
      },
    ],
  },
});
```

## 选项

| 属性     | 描述                                 | 类型                 | 默认值     |
| -------- | ------------------------------------ | -------------------- | ---------- |
| callback | 函数，传入当前数据，输出处理后的数据 | `(data: any) => any` | `(d) => d` |
