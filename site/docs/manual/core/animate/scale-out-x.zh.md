---
title: scaleOutX
description: 沿 x 方向逐渐缩小单个图形，实现横向收缩的退场动画。
order: 2
---

`scaleOutX` 单个图形沿着 x 方向的消失动画。影响 `transform.scale` 属性。

## 开始使用

<img alt="scaleOutX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XpI1SbHQADUAAAAAAAAAAAAADmJ7AQ/original" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'scaleOutX' } },
});
```
