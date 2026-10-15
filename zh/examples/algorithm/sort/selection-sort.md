---
title: "选择排序"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/algorithm/sort/selection-sort/"
version: "5.4.8"
---

# 选择排序

[运行示例](https://g2.antv.antgroup.com/zh/examples/algorithm/sort/selection-sort/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];

function* selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (lowest !== i) {
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
    }
    yield arr.map((a, index) => ({
      value: a,
      swap: index === lowest || index === i,
    }));
  }
  return arr;
}

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'timingKeyframe',
  children: Array.from(selectionSort(data), (frame) => ({
    type: 'interval',
    data: frame.map((datum, index) => ({ index, ...datum })),
    encode: { x: 'index', y: 'value', key: 'value', color: 'swap' },
  })),
});

chart.render();
```
