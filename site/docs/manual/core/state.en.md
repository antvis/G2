---
title: 状态（State）
order: 11
---

State in G2 is mainly used to control the state style of mark. These states will be interactively triggered and the attributes are style attributes supported by @antv/g.

```js
({
  type: 'interval',
  state: {
    active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
    inactive: { fill: '#aaa' },
  },
});
```

```js
// API
// First way
chart
  .interval()
  .state('active', { fill: 'red', stroke: 'blue', strokeWidth: 2 })
  .state('inactive', { fill: '#aaa' });

// Second way
chart.interval().state({
  active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
  inactive: { fill: '#aaa' },
});
```

## Built-in States

There are currently 4 built-in states:

- active - the style when highlighted
- inactive - style when not highlighted
- selected - style when selected
- unselected - style when not selected

## Highlighted States

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
    .interaction('elementHighlight'); // Set up highlight interaction

  chart.render();

  return chart.getContainer();
})();
```

## Selected States

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
    .interaction('elementSelect'); // Set up selection interaction

  chart.render();

  return chart.getContainer();
})();
```
