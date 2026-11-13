---
title: "重置刷选"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/event/reset-brush-filter/"
version: "5.4.8"
---

# 重置刷选

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/event/reset-brush-filter/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  scale: {
    x: {
      domain: [140, 200],
    },
    y: {
      domain: [0, 150],
    },
  },
  interaction: { brushFilter: true },
});

chart.render();

// 刷选之后重置选区
const createButton = () => {
  const container = document.querySelector('#container');
  const button = document.createElement('button');
  button.innerText = 'reset';
  button.onclick = () => {
    chart.emit('brush:filter', {
      data: {
        selection: [
          [140, 200],
          [0, 150],
        ],
      },
    });
  };
  container.insertBefore(button, container.firstChild);
};

createButton();
```
