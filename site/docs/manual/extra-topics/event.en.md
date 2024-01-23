---
title: Listen and emit events
order: 9
---

G2 exposes some events to get the chart life cycle and interaction information. G2 exports a `ChartEvent` type, used to define the type of event.

<img alt="click event" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z61ZQ5DM5IUAAAAAAAAAAAAADmJ7AQ/original" width="800" />

```js
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({
  container,
  canvas,
});

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .axis({ x: { animate: false }, y: { animate: false } });

chart.on('interval:click', (e) => {
  console.log(e.data.data); // Display clicked data
});

chart.on('element:click', (e) => {
  console.log(e.data.data); // Display clicked data
});

chart.render();
```

## Life cycle events

If you want to get the life cycle information of the chart, you can do the following:

```js
chart.on(ChartEvent.AFTER_RENDER, (ev) => {
  console.log(ev);
});
```

G2 currently provides the following lifecycle events:

| Event name                        | Explanation                   |
| --------------------------------- | ---------------------------- |
| `ChartEvent.`BEFORE\_RENDER       | Before rendering             |
| `ChartEvent.`BEFORE\_PAINT        | Before drawing               |
| `ChartEvent.`AFTER\_PAINT         | After drawing                |
| `ChartEvent.`AFTER\_RENDER        | After rendering              |
| `ChartEvent.`BEFORE\_CHANGE\_DATA | Before changing data         |
| `ChartEvent.`AFTER\_CHANGE\_DATA  | After changing data          |
| `ChartEvent.`BEFORE\_CLEAR        | Before cleaning the canvas   |
| `ChartEvent.`AFTER\_CLEAR         | After cleaning the canvas    |
| `ChartEvent.`BEFORE\_DESTROY      | Before destroying the canvas |
| `ChartEvent.`AFTER\_DESTROY       | After destroying the canvas  |
| `ChartEvent.`BEFORE\_CHANGE\_SIZE | Before changing canvas size  |
| `ChartEvent.`AFTER\_CHANGE\_SIZE  | After changing canvas size   |

* **Before rendering**: Refers to G2 starting to process data, perform layout, drawing graphics and other operations.
* **Before drawing**: Refers to the completion of data processing, layout, graphics drawing and other operations, but has not yet been drawn.
* **After drawing**: Refers to G2 completing all drawing operations, but animation may exist. After the animation ends, the chart is truly rendered.
* **After rendering**: Refers to G2 completing all drawing operations, including animation.
* **After cleaning the canvas**: The chart in the container has been cleaned up, but the G2 instance still exists and can continue to be used.
* **After destroying the canvas**: The G2 instance has been destroyed and can no longer be used.

## Interaction events

If you want to get the interactive information of the chart, you can do the following:

* Monitor the global `element` event

```js
chart.on(`element:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});
```

* Monitor specified `element` event

```js
chart.on(`${markType}:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});

// For example, listen to the click event of the bar in the bar chart
chart.on(`interval:${ChartEvent.CLICK}`, (ev) => {
  console.log(ev);
});
```

* Listen to plot area events

```js
chart.on('plot:click', (event) => console.log(event));
```

* Listen to global component events

```js
chart.on('component:click', (event) => console.log(event));
```

* Listen to global label events

```js
chart.on('label:click', (event) => console.log(event));
```

### Click event

| Event name            | Explanation   | Callback parameters |
| --------------------- | ------------ | ------------------- |
| `ChartEvent.`CLICK    | Click        | `Event`             |
| `ChartEvent.`DBLCLICK | Double click | `Event`             |

### Pointer event

| Event name                      | Explanation                                                       | Callback parameters |
| ------------------------------- | ---------------------------------------------------------------- | ------------------- |
| `ChartEvent.`POINTER\_TAP       |                                                                  | `Event`             |
| `ChartEvent.`POINTER\_DOWN      | When the pointer is pressed                                      | `Event`             |
| `ChartEvent.`POINTER\_UP        | When the pointer is released                                     | `Event`             |
| `ChartEvent.`POINTER\_OVER      | When the pointer enters the target element                       | `Event`             |
| `ChartEvent.`POINTER\_OUT       | When the pointer leaves the target element                       | `Event`             |
| `ChartEvent.`POINTER\_MOVE      | When the pointer changes coordinates                             | `Event`             |
| `ChartEvent.`POINTER\_ENTER     | When the pointer enters the target element or its child elements | `Event`             |
| `ChartEvent.`POINTER\_LEAVE     | When the pointer leaves the target element or its child elements | `Event`             |
| `ChartEvent.`POINTER\_UPOUTSIDE |                                                                  | `Event`             |

### Drag event

If you want to listen to drag events, you need to set the draggable and droppable properties.

```js
chart.interval().style('draggable', true).style('droppable', true);
```

| Event name               | Explanation                                                        | Callback parameters |
| ------------------------ | ----------------------------------------------------------------- | ------------------- |
| `ChartEvent.`DRAG\_START | When starting to drag                                             | `Event`             |
| `ChartEvent.`DRAG        | During dragging                                                   | `Event`             |
| `ChartEvent.`DRAG\_END   | When dragging is complete                                         | `Event`             |
| `ChartEvent.`DRAG\_ENTER | When the element is dragged into the target element               | `Event`             |
| `ChartEvent.`DRAG\_LEAVE | When the element is dragged away from the target element          | `Event`             |
| `ChartEvent.`DRAG\_OVER  | When the element is dragged and hovered within the target element | `Event`             |
| `ChartEvent.`DROP        | When the element is placed inside the target element              | `Event`             |
