---
title: timingKeyframe
order: 2
---

在不同视图之间执行连续的过渡动画。通过 `mark.key` 和 `mark.groupKey` 去关联图形。

## 开始使用

<img src="https://gw.alipayobjects.com/zos/raptor/1669043493952/point-keyframe.gif" width=640 alt="keyframe"/>

```js
fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      paddingTop: 60,
      paddingLeft: 100,
    });

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 4,
      children: [
        // 条形图
        {
          type: 'interval',
          data: data,
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: {
            x: 'gender',
            y: 'weight',
            color: 'gender',
            key: 'gender', // 指定 key
          },
        },
        // 散点图
        {
          type: 'point',
          data: data,
          encode: {
            x: 'height',
            y: 'weight',
            color: 'gender',
            groupKey: 'gender', // 指定合并的条的 key
            shape: 'point',
          },
        },
      ],
    });

    chart.render();
  });
```

## 选项

| 属性           | 描述                                                          | 类型     | 默认值     |
| -------------- | ------------------------------------------------------------- | -------- | ---------- |
| duration       | 每一视图的动画过渡时间                                        | `number` | 1000       |
| iterationCount | `'infinite' \| number`                                        |          | 1          |
| direction      | `'normal' \| 'reverse' \| 'alternate' \| 'reverse-alternate'` | `number` | `'normal'` |
| children       | 执行动画的视图节点                                            | `Node[]` | `[]`       |
