---
title: Interaction
order: 8
---

In G2, **Interaction** provides the ability to explore data as needed.

Interaction can be set at the view level:

```js
({
  type: 'view',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
// First method
chart.interaction('tooltip', {}).interaction('brushHighlight', {});

// Second method
chart.interaction({
  tooltip: {},
  brushHighlight: {},
});
```

Interaction can also be set at the mark level:

```js
({
  type: 'interval',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
//First method
chart.interval().interaction('tooltip', {}).interaction('brushHighlight', {});

//Second method
chart.interval().interaction({
  tooltip: {},
  brushHighlight: {},
});
```

## View Level Interaction

G2's interactions are effective for each view. If you want to turn off the interaction, you can do as follows:


```js
({
  type: 'view',
  interaction: {
    tooltip: false,
    brushHighlight: false,
  },
});
```

## Mark Level Interaction

Interaction has a bubbling nature. The view interaction will be overridden by the interaction set by its mark, and the coordinate system corresponding to the last mark has the highest priority.


```js
chart.interaction('elementHighlight', { link: true, background: true });
chart.line().interaction('elementHighlight', { link: false });
chart.area().interaction('elementHighlight', { background: false });
```

This is equivalent to the following situation:

```js
chart.interaction('elementHighlight', { link: false, background: false });
chart.line();
chart.area():
```

## Interaction State

In G2, you can set the interaction state of the mark through `mark.state`, such as setting the select and unselect states as follows. When using elementSelect, these two states will be consumed.


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
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state({
      selected: { fill: '#f4bb51' }, // set selected state
      unselected: { opacity: 0.6 }, // set unselected state
    })
    .interaction('elementSelect', true);

  chart.render();

  return chart.getContainer();
})();
```

In addition to selected and unselected, there are the following built-in state types:

- active
- inactive

## Custom Interaction

If the built-in interaction cannot meet your needs, you can also implement some interactions through custom interaction. Here is a custom highlight interaction.


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
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state({
      selected: { fill: '#f4bb51' }, // set selected state
      unselected: { opacity: 0.6 }, // set unselected state
    })
    .interaction('elementSelect', true);

  // Bind interaction after rendering
  chart.render().then((chart) => {
    // Get G Canvas instance
    const { canvas } = chart.getContext();

    // Find graphic elements
    const elements = canvas.document.getElementsByClassName(
      G2.ELEMENT_CLASS_NAME,
    );

    // Highlight
    for (const element of elements) {
      element.addEventListener('mouseenter', () => {
        element.style._fill = element.style.fill;
        element.style.fill = 'red';
      });

      element.addEventListener('mouseleave', () => {
        element.style.fill = element.style._fill;
      });
    }
  });

  return chart.getContainer();
})();
```

## Interaction Syntax

> Interaction syntax is still under design...

