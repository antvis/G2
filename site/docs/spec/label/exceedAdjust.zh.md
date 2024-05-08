---
title: exceedAdjust
order: 1
---

`exceedAdjust` 会自动对标签做溢出检测和矫正，即当标签超出视图区域时，会对标签自动做反方向的位移。

## 开始使用

<img alt="contrastReverse" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*B2GwQbqkH_kAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .line()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'type')
  /* ... */
  .label({
    text: 'frequency',
    transform: [
      {
        type: 'exceedAdjust',
      },
    ],
  });
```

## 选项

* 暂无
