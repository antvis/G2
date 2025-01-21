---
title: contrastReverse
order: 1
---

`contrastReverse` 标签颜色在图形背景上[颜色对比度](https://webaim.org/resources/contrastchecker/)低的情况下，从指定色板选择一个对比度最优的颜色。

## 开始使用

<img alt="contrastReverse" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q6gmRL6zdgUAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .interval()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  /* ... */
  .label({
    text: 'frequency',
    position: 'inside',
    transform: [
      {
        type: 'contrastReverse',
      },
    ],
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ---------------------|
| threshold    | 标签和背景图形的颜色对比度阈值，超过阈值才会推荐颜色提升对比度        | `Type`            |  `4.5`               |
| palette      | 对比度提升算法中，备选的颜色色板                                 | `Type`            | `['#000', '#fff']`   |
