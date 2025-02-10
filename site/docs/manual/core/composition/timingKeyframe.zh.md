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

    const keyframe = chart
      .timingKeyframe()
      .attr('direction', 'alternate')
      .attr('iterationCount', 4);

    // 条形图
    keyframe
      .interval()
      .data(data)
      .transform({ type: 'groupX', y: 'mean' })
      .encode('x', 'gender')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('key', 'gender'); // 指定 key

    // 散点图
    keyframe
      .point()
      .data(data)
      .encode('x', 'height')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('groupKey', 'gender') // 指定合并的条的 key
      .encode('shape', 'point');

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
