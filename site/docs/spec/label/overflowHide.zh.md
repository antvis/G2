---
title: overflowHide
order: 1
---

`overflowHide` 对于标签在图形上放置不下的时候，隐藏标签。

## 开始使用

<img alt="overflowHide" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5-IhR5s5fgcAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

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
        type: 'overflowHide',
      },
    ],
  });
```

## 选项

暂无。
