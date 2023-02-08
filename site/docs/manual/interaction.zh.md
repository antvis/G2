---
title: 交互
order: 7
---

**交互（Interaction）** 提供了按需探索数据的能力。

## 内置交互

在 G2 中通过 `node.interaction` 去给当前节点指定交互，同样可以声明多个交互。

```js
chart
  .interaction('elementHighlight') // 图形高亮
  .interaction('tooltip'); // 提示信息
```

## 自定义交互

如果内置的交互不能满足你的需求，也可以通过自定义交互的方式去实现一些交互。下面自定义一个高亮交互。

```js
import { Chart, ELEMENT_CLASS_NAME } from '@antv/g2';

const chart = new Chart();

// ...

// 获得 G Canvas 实例
const { canvas } = chart.context();

// 找到图形元素
const elements = canvas.document.getElementsByClassName(ELEMENT_CLASS_NAME);

// 高亮
for (const element of elements) {
  element.addEventListener('mouseenter', () => {
    element.style._fill = element.style.fill;
    element.style.fill = 'red';
  });

  element.addEventListener('mouseleave', () => {
    element.style.fill = element.style._fill;
  });
}
```
