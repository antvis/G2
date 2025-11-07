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

## Fine-grained Control with className

G2 provides standardized className for various component elements in charts, enabling more precise event handling and style control.

### Listening to Specific Component Element Events

Using className allows you to precisely identify the type of element clicked by users. For example, listening to legend item click events:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
  .encode('color', 'genre');

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');
  const legendMarkers = document.getElementsByClassName('g2-legend-marker');
  const legendLabels = document.getElementsByClassName('g2-legend-label');
  const legendData = Array.from(legendItems).map((item) => item.__data__);

  legendLabels.forEach((label, index) => {
    const labelText = label.getAttribute('text') || label.textContent;

    label.addEventListener('click', (event) => {
      const clickedText = label.getAttribute('text') || label.textContent;
      const itemData = legendData[index];

      console.log('\n  🖱️ Legend label clicked:');
      console.log('    - Label text:', clickedText);
      console.log('    - Index:', index);
      console.log('    - Data:', itemData);
      console.log('    - className:', label.className);

      // Simulate business logic: perform actions based on clicked legend
      alert(`You clicked legend: ${clickedText}
You can trigger custom business logic here, such as:
- Navigate to detail page
- Show more information
- Link with other charts`);
    });
  });
});
```

### Filtering Specific Component Events

Using className makes it easy to filter out events from certain components to avoid interference:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
  .encode('color', 'genre');

chart.render();

// Listen to plot clicks, but exclude legend clicks
chart.on('plot:click', (event) => {
  const className = event.target?.className || '';

  // Check if legend was clicked
  const isLegendClick = className.includes('legend');

  if (isLegendClick) {
    console.log('Legend clicked, ignoring plot:click event');
    return;
  }

  // Handle plot area click logic
  console.log('Plot area clicked', event);
});
```

### Controlling Element Styles with className

You can retrieve specific elements by className and dynamically modify their styles:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
  .encode('color', 'genre');

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');

  // Modify the style of the first legend item
  if (legendItems.length > 0) {
    const firstItem = legendItems[0];
    const firstMarker = firstItem.getElementsByClassName('g2-legend-marker')[0];
    const firstLabel = firstItem.getElementsByClassName('g2-legend-label')[0];

    // Add highlight styles
    if (firstLabel) {
      firstLabel.style.fontWeight = 'bold';
      firstLabel.style.fill = 'orange';
      firstLabel.style.shadowColor = '#d3d3d3';
      firstLabel.style.shadowBlur = 10;
      firstLabel.style.shadowOffsetX = 5;
      firstLabel.style.shadowOffsetY = 5;
    }
  }
});
```

### Finding Specific Elements by Content

Combining className with element attributes allows precise location of specific chart elements:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
  .encode('color', 'genre');

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');
  const targetText = 'Action';
  let targetItem = null;

  // Iterate through all legend labels to find target text
  for (let i = 0; i < legendItems.length; i++) {
    const labels = legendItems[i].getElementsByClassName('g2-legend-label');
    if (labels.length > 0) {
      const labelText = labels[0].getAttribute('text') || labels[0].textContent;
      if (labelText === targetText) {
        targetItem = legendItems[i];
        break;
      }
    }
  }

  if (targetItem) {
    console.log(`✅ Found target legend: "${targetText}"`);
    console.log('   className:', targetItem.className);
    console.log('   Business logic can be executed: e.g., auto-focus, highlight, etc.');

    // Add background color and special styles to target legend item

    console.log(`🎨 Adding special styles to legend "${targetText}"...`);

    // Get the background element of legend item
    const background = targetItem.getElementsByClassName(
      'g2-legend-background',
    )[0];
    const label = targetItem.getElementsByClassName('g2-legend-label')[0];
    const marker = targetItem.getElementsByClassName('g2-legend-marker')[0];

    // Modify background color
    if (background) {
      background.style.fill = '#FFF3E0'; // Light orange background
      background.style.fillOpacity = 0.8;
    }

    // Also modify label style
    if (label) {
      label.style.fill = '#FF6B00'; // Orange text
      label.style.fontWeight = 'bold';
    }
  }
});
```

### Complete List of G2 Component className

#### Legend Component

| className                     | Description                            |
| ----------------------------- | -------------------------------------- |
| **`g2-legend-title`**         | Legend title                           |
| **`g2-legend-item`**          | Container for category legend item     |
| **`g2-legend-background`**    | Background of category legend item     |
| **`g2-legend-marker`**        | Marker icon of category legend item    |
| **`g2-legend-label`**         | Label text of category legend item     |
| **`g2-legend-value`**         | Value of category legend item          |
| **`g2-legend-focus-icon`**    | Focus icon of category legend item     |
| **`g2-legend-ribbon`**        | Color ribbon of continuous legend      |
| **`g2-legend-track`**         | Track of continuous legend             |
| **`g2-legend-selection`**     | Selection area of continuous legend    |
| **`g2-legend-handle`**        | Slider handle of continuous legend     |
| **`g2-legend-handle-marker`** | Slider handle icon of continuous legend|
| **`g2-legend-handle-label`**  | Label/tick value of continuous legend  |

#### Axis Component

| className                | Description       |
| ------------------------ | ----------------- |
| **`g2-axis-line`**       | Main axis line    |
| **`g2-axis-tick`**       | Axis tick line    |
| **`g2-axis-tick-item`**  | Single tick item  |
| **`g2-axis-label`**      | Axis tick label   |
| **`g2-axis-label-item`** | Single label item |
| **`g2-axis-title`**      | Axis title        |
| **`g2-axis-grid`**       | Axis grid line    |

## Typical Use Cases

For detailed examples, see Interaction - Events [Examples](/en/examples#interaction-event)
