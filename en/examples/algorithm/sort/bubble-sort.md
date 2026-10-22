---
title: "Bubble Sort"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/algorithm/sort/bubble-sort/"
version: "5.4.8"
---

# Bubble Sort

[Live example](https://g2.antv.antgroup.com/en/examples/algorithm/sort/bubble-sort/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];

function* bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j <= n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      yield arr.map((a, i) => ({
        value: a,
        swap: i === j || i === j + 1,
      }));
    }
  }
  return arr;
}

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'timingKeyframe',
  children: Array.from(bubbleSort(data), (frame) => ({
    type: 'interval',
    data: frame.map((datum, index) => ({ index, ...datum })),
    encode: { x: 'index', y: 'value', key: 'value', color: 'swap' },
  })),
});

chart.render();
```
