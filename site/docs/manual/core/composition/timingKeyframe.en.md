---
title: timingKeyframe
order: 2
---

Execute continuous transition animations between different views. Use `mark.key` and `mark.groupKey` to associate graphics.

## Getting Started

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

    // Bar chart
    keyframe
      .interval()
      .data(data)
      .transform({ type: 'groupX', y: 'mean' })
      .encode('x', 'gender')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('key', 'gender'); // Specify key

    // Scatter plot
    keyframe
      .point()
      .data(data)
      .encode('x', 'height')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('groupKey', 'gender') // Specify the key for the merged bars
      .encode('shape', 'point');

    chart.render();
  });
```

## Options

| Property       | Description                                                   | Type     | Default    |
| -------------- | ------------------------------------------------------------- | -------- | ---------- |
| duration       | Animation transition time for each view                       | `number` | 1000       |
| iterationCount | `'infinite' \| number`                                        |          | 1          |
| direction      | `'normal' \| 'reverse' \| 'alternate' \| 'reverse-alternate'` | `number` | `'normal'` |
| children       | View nodes that execute animations                            | `Node[]` | `[]`       |
