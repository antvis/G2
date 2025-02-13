---
title: Overview
order: 1
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
  const { Chart, PLOT_CLASS_NAME, ELEMENT_CLASS_NAME, register } = G2;

  register('interaction.customElementHighlight', () => {
    return (context, _, emitter) => {
      const { container } = context;
      const plotArea = container.querySelector(`.${PLOT_CLASS_NAME}`);
      const elements = plotArea.querySelectorAll(`.${ELEMENT_CLASS_NAME}`);
      const elementSet = new Set(elements);

      const pointerover = (e) => {
        const { target: element } = e;
        if (!elementSet.has(element)) return;
        element.style.stroke = "red";
        element.style.lineWidth = 2;
      };

      const pointerout = (e) => {
        const { target: element } = e;
        if (!elementSet.has(element)) return;
        element.style.stroke = null;
      };

      plotArea.addEventListener('pointerover', pointerover);
      plotArea.addEventListener('pointerout', pointerout);
      return () => {
        plotArea.removeEventListener('pointerover', pointerover);
        plotArea.removeEventListener('pointerout', pointerout);
      };
    };
  })

  const chart = new Chart();

  chart
    .interval()
    .data([
      { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
      { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
      { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
      { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
      { name: "London", 月份: "May", 月均降雨量: 47 },
      { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
      { name: "London", 月份: "Jul.", 月均降雨量: 24 },
      { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
      { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
      { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
      { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
      { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
      { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
      { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
      { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
      { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
    ])
    .transform({ type: 'dodgeX' })
    .encode('x', '月份')
    .encode('y', '月均降雨量')
    .encode('color', 'name')
    .interaction('customElementHighlight', true);

  chart.render();

  return chart.getContainer();
})();
```

## Interaction Syntax

> Interaction syntax is still under design...

