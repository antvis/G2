---
title: 状态（State）
order: 11
---

G2 中**状态（State）** 主要用来控制标记的状态样式。这些状态会被交互触发，属性是 @antv/g 支持的样式属性。

```js
({
  type: 'interval',
  state: {
    /** fill 填充色；stroke 描边色；strokeWidth 描边宽度 */
    active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
    inactive: { fill: '#aaa' },
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .state('active', { fill: 'red', stroke: 'blue', strokeWidth: 2 })
  .state('inactive', { fill: '#aaa' });

// 第二种方式
chart.interval().state({
  active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
  inactive: { fill: '#aaa' },
});
```

## 内置状态

目前一共有 4 个内置状态：

- active - 高亮时候的样式
- inactive - 没有高亮时候的样式
- selected - 选择时候的样式
- unselected - 没有选择时候的样式

## 高亮状态

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state('active', { fill: 'red' })
    .state('inactive', { fill: '#aaa' })
    .interaction('elementHighlight'); // 设置高亮交互

  chart.render();

  return chart.getContainer();
})();
```

## 选择状态

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state('selected', { fill: 'red', stroke: 'blue', strokeWidth: 2 })
    .state('unselected', { fill: '#aaa' })
    .interaction('elementSelect'); // 设置选择交互

  chart.render();

  return chart.getContainer();
})();
```

## 状态优先级

g2 支持多个状态同时生效，当状态配置产生冲突时，会按照优先级选择生效的配置

考虑如下配置

```js | ob
(() => {
  const chart = new G2.Chart();
  const state = {
    selected: { fill: 'red' },
    active: { fill: 'green', stroke: 'black', lineWidth: 1 },
  };

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .interaction('elementHighlight', { state }) // 设置高亮交互;
    .interaction('elementSelect', { state }); // 设置选择交互;

  chart.render();

  return chart.getContainer();
})();
```

hover 时，active 状态生效，会有边框（stroke）和绿色背景色（fill）。

点击时，active 与 selected 状态同时生效，但两者都配置了 fill 产生冲突，此时 selected 状态的优先级更高，最终生效的是红色 red。

具体的状态优先级为

```
selected: 3
unselected: 3
active: 2
inactive: 2
default: 1
```
