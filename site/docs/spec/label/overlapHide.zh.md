---
title: overlapHide
order: 1
---

`overlapHide` 对位置碰撞的标签进行隐藏。算法逻辑是碰撞的两个标签，保留前一个，隐藏后一个。 

## 开始使用

<img alt="overlapHide" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*k6SUS6cF0wEAAAAAAAAAAAAADmJ7AQ/original" width="100%" style="max-width: 800px" />

```ts
chart
  .line()
  .encode('x', 'letter')
  .encode('y', 'frequency')
  /* ... */
  .label({
    text: 'frequency',
    transform: [
      {
        type: 'overlapHide',
      },
    ],
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| --------------| ----------------------------------------------------------- | --------------------| ------------------|
| priority      | 标签排序的优先级，通过设置一个排序比较器，实现优先级                 | `(a, b) => number`  |  -                |
