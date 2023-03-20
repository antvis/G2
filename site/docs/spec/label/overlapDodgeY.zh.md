---
title: overlapDodgeY
order: 1
---

`overlapDodgeY` 位置碰撞的标签在 y 方向上进行调整，防止标签重叠。

## 开始使用

<img alt="overlapDodgeY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oH2mQZEQOUcAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

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
        type: 'overlapDodgeY',
      },
    ],
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| --------------| ----------------------------------------------------------- | -----------------| ---------------------|
| maxIterations | 位置调整的最大迭代次数。                                        | `number`         |  `10`                |
| padding       | 期望调整之后，标签和标签之间的间距                                | `number`         | `1`                  |
| maxError      | 最大误差，指实际间距和期望间距 `padding` 之间的误差                | `number`         | `0.1`                |
