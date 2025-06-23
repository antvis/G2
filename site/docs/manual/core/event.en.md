---
title: Events
order: 17
---

G2 exposes various events to capture chart lifecycle and interaction information. G2 exports a `ChartEvent` type that defines the event types.

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

## Lifecycle Events

To capture chart lifecycle information, you can use the following approach:

```js
chart.on(ChartEvent.AFTER_RENDER, (ev) => {
  console.log(ev);
});
```

G2 currently provides the following lifecycle events:

| Event Name                      | Description                 |
| ------------------------------- | --------------------------- |
| `ChartEvent.`BEFORE_RENDER      | Before rendering            |
| `ChartEvent.`BEFORE_PAINT       | Before painting             |
| `ChartEvent.`AFTER_PAINT        | After painting              |
| `ChartEvent.`AFTER_RENDER       | After rendering             |
| `ChartEvent.`BEFORE_CHANGE_DATA | Before data change          |
| `ChartEvent.`AFTER_CHANGE_DATA  | After data change           |
| `ChartEvent.`BEFORE_CLEAR       | Before clearing canvas      |
| `ChartEvent.`AFTER_CLEAR        | After clearing canvas       |
| `ChartEvent.`BEFORE_DESTROY     | Before destroying canvas    |
| `ChartEvent.`AFTER_DESTROY      | After destroying canvas     |
| `ChartEvent.`BEFORE_CHANGE_SIZE | Before changing canvas size |
| `ChartEvent.`AFTER_CHANGE_SIZE  | After changing canvas size  |

- **Before rendering**: When G2 starts processing data, performing layout, and drawing graphics.
- **Before painting**: When data processing, layout, and graphics operations are complete but painting hasn't started.
- **After painting**: When G2 completes all painting operations, but animations may still be running. The chart is fully rendered when animations finish.
- **After rendering**: When G2 completes all painting operations, including animations.
- **After clearing canvas**: The chart in the container has been cleared, but the G2 instance still exists and can be reused.
- **After destroying canvas**: The G2 instance has been destroyed and cannot be used anymore.

## Interaction Events

To capture chart interaction information, you can use the following approaches:

- Listen to global `element` events

```js
chart.on(`element:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});
```

- Listen to specific `element` events

```js
chart.on(`${markType}:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});

// For example, listen to click events on bars in a bar chart
chart.on(`interval:${ChartEvent.CLICK}`, (ev) => {
  console.log(ev);
});
```

- Listen to plot area events

```js
chart.on('plot:click', (event) => console.log(event));
```

- Listen to global component events

```js
chart.on('component:click', (event) => console.log(event));
```

- Listen to global label events

```js
chart.on('label:click', (event) => console.log(event));
```

### Click Events

| Event Name            | Description  | Callback Parameters |
| --------------------- | ------------ | ------------------- |
| `ChartEvent.`CLICK    | Click        | `Event`             |
| `ChartEvent.`DBLCLICK | Double click | `Event`             |

### Pointer Events

| Event Name                     | Description                                               | Callback Parameters |
| ------------------------------ | --------------------------------------------------------- | ------------------- |
| `ChartEvent.`POINTER_TAP       |                                                           | `Event`             |
| `ChartEvent.`POINTER_DOWN      | When pointer is pressed down                              | `Event`             |
| `ChartEvent.`POINTER_UP        | When pointer is released                                  | `Event`             |
| `ChartEvent.`POINTER_OVER      | When pointer enters the target element                    | `Event`             |
| `ChartEvent.`POINTER_OUT       | When pointer leaves the target element                    | `Event`             |
| `ChartEvent.`POINTER_MOVE      | When pointer coordinates change                           | `Event`             |
| `ChartEvent.`POINTER_ENTER     | When pointer enters the target element or its descendants | `Event`             |
| `ChartEvent.`POINTER_LEAVE     | When pointer leaves the target element or its descendants | `Event`             |
| `ChartEvent.`POINTER_UPOUTSIDE |                                                           | `Event`             |

### Drag Events

To listen to drag events, you need to set the draggable and droppable properties:

```js
chart.interval().style('draggable', true).style('droppable', true);
```

| Event Name              | Description                                              | Callback Parameters |
| ----------------------- | -------------------------------------------------------- | ------------------- |
| `ChartEvent.`DRAG_START | When dragging starts                                     | `Event`             |
| `ChartEvent.`DRAG       | During dragging                                          | `Event`             |
| `ChartEvent.`DRAG_END   | When dragging ends                                       | `Event`             |
| `ChartEvent.`DRAG_ENTER | When element is dragged into the target element          | `Event`             |
| `ChartEvent.`DRAG_LEAVE | When element is dragged away from the target element     | `Event`             |
| `ChartEvent.`DRAG_OVER  | When element is dragged and hovering over target element | `Event`             |
| `ChartEvent.`DROP       | When element is dropped into the target element          | `Event`             |

## Examples

For detailed examples, see Interaction - Events [Examples](/en/examples#interaction-event)
