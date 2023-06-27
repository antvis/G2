---
title: 交互
order: 8
---

**交互（Interaction）** 提供了按需探索数据的能力。在 G2 中通过 `node.interaction` 去给当前节点指定交互，同样可以声明多个交互。

```js
// 添加交互
chart
  .interaction('elementHighlight') // 图形高亮
  .interaction('brushHighlight');

// 关闭交互
chart.interaction('tooltip', false); // 提示信息
```

## 状态

在 G2 中可以通过 `mark.state` 去设置标记的交互状态，比如如下设置 select 和 unselect 的状态，当使用 elementSelect 的时候会消费这两个状态。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gwt_SpgIGsMAAAAAAAAAAAAADmJ7AQ/original" alt="element-select" width="640">

```js
chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 5 })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .state({
    selected: { fill: '#f4bb51' }, // 设置选中状态
    unselected: { opacity: 0.6 }, // 设置非选中状态
  });

chart.interaction('elementSelect'); // 设置交互
```

除了 select 和 unselect 之外，还有如下的内置状态类型：

- active
- inactive

## 冒泡

交互拥有冒泡性，chart 实例的交互会被它的标记所设置交互覆盖，并且最后一个标记所对应的坐标系优先级最高。

```js
chart.interaction('elementHighlight', { link: true, background: true });
chart.line().interaction('elementHighlight', { link: false });
chart.area().interaction('elementHighlight', { background: false });
```

和下面的情况等价：

```js
chart.interaction('elementHighlight', { link: false, background: false });
chart.line();
chart.area():
```

## 自定义交互

如果内置的交互不能满足你的需求，也可以通过自定义交互的方式去实现一些交互。下面自定义一个高亮交互。

```js
import { Chart, ELEMENT_CLASS_NAME } from '@antv/g2';

const chart = new Chart({
  // ...
});

// ...

// 获得 G Canvas 实例
const { canvas } = chart.getContext();

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

## 交互语法

> 交互语法还在设计中，估计在 5.2.0 （5 月底）的版本上线。
