---
title: Event Handling
order: 17
---

G2 exposes a set of events for accessing the chart's lifecycle and interaction information. G2 exports a `ChartEvent` type to define event types.

<img alt="click event" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z61ZQ5DM5IUAAAAAAAAAAAAADmJ7AQ/original" width="800" />

```js
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({
  container,
  canvas,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  axis: {
    x: { animate: false },
    y: { animate: false },
  },
});

chart.on('interval:click', (e) => {
  console.log(e.data.data); // Display clicked data
});

chart.on('element:click', (e) => {
  console.log(e.data.data); // Display clicked data
});

chart.render();
```

## Lifecycle Events

To access the chart's lifecycle information, you can use the following approach:

```js
chart.on(ChartEvent.AFTER_RENDER, (ev) => {
  console.log(ev);
});
```

G2 currently provides the following lifecycle events:

| Event Name                      | Description              |
| ------------------------------- | ------------------------ |
| `ChartEvent.`BEFORE_RENDER      | Before render            |
| `ChartEvent.`BEFORE_PAINT       | Before paint             |
| `ChartEvent.`AFTER_PAINT        | After paint              |
| `ChartEvent.`AFTER_RENDER       | After render             |
| `ChartEvent.`BEFORE_CHANGE_DATA | Before data change       |
| `ChartEvent.`AFTER_CHANGE_DATA  | After data change        |
| `ChartEvent.`BEFORE_CLEAR       | Before canvas clear      |
| `ChartEvent.`AFTER_CLEAR        | After canvas clear       |
| `ChartEvent.`BEFORE_DESTROY     | Before canvas destroy    |
| `ChartEvent.`AFTER_DESTROY      | After canvas destroy     |
| `ChartEvent.`BEFORE_CHANGE_SIZE | Before canvas size change|
| `ChartEvent.`AFTER_CHANGE_SIZE  | After canvas size change |

- **Before render**: G2 begins processing data, performing layout, drawing graphics, etc.
- **Before paint**: Data processing, layout, and drawing graphics are complete, but actual painting has not yet occurred.
- **After paint**: G2 has completed all painting operations, but animations may still be running. The chart is fully rendered after animations complete.
- **After render**: G2 has completed all painting operations, including animations.
- **After canvas clear**: The chart in the container has been cleared, but the G2 instance still exists and can be used.
- **After canvas destroy**: The G2 instance has been destroyed and can no longer be used.

## Interaction Events

To access the chart's interaction information, you can use the following approaches:

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

| Event Name            | Description | Callback Parameter |
| --------------------- | ----------- | ------------------ |
| `ChartEvent.`CLICK    | Click       | `Event`            |
| `ChartEvent.`DBLCLICK | Double click| `Event`            |

### Pointer Events

| Event Name                     | Description                                      | Callback Parameter |
| ------------------------------ | ------------------------------------------------ | ------------------ |
| `ChartEvent.`POINTER_TAP       |                                                  | `Event`            |
| `ChartEvent.`POINTER_DOWN      | When pointer is pressed down                     | `Event`            |
| `ChartEvent.`POINTER_UP        | When pointer is released                         | `Event`            |
| `ChartEvent.`POINTER_OVER      | When pointer enters the target element           | `Event`            |
| `ChartEvent.`POINTER_OUT       | When pointer leaves the target element           | `Event`            |
| `ChartEvent.`POINTER_MOVE      | When pointer changes coordinates                 | `Event`            |
| `ChartEvent.`POINTER_ENTER     | When pointer enters target element or its children| `Event`           |
| `ChartEvent.`POINTER_LEAVE     | When pointer leaves target element or its children| `Event`           |
| `ChartEvent.`POINTER_UPOUTSIDE |                                                  | `Event`            |

### Drag Events

To listen to drag events, you need to set the draggable and droppable properties:

```js
chart.options({
  type: 'interval',
  style: {
    draggable: true,
    droppable: true,
  },
});
```

| Event Name              | Description                                      | Callback Parameter |
| ----------------------- | ------------------------------------------------ | ------------------ |
| `ChartEvent.`DRAG_START | When dragging starts                             | `Event`            |
| `ChartEvent.`DRAG       | During dragging                                  | `Event`            |
| `ChartEvent.`DRAG_END   | When dragging completes                          | `Event`            |
| `ChartEvent.`DRAG_ENTER | When element is dragged into the target element  | `Event`            |
| `ChartEvent.`DRAG_LEAVE | When element is dragged out of the target element| `Event`            |
| `ChartEvent.`DRAG_OVER  | When element is dragged over the target element  | `Event`            |
| `ChartEvent.`DROP       | When element is dropped into the target element  | `Event`            |

## Fine-grained Control with className

G2 provides standardized className for various component elements in the chart, enabling more fine-grained event listening and style control.

:::warning{title=Important Note}
For interaction events on components like legends and axes, **it is highly recommended to use G2's high-level interaction events** rather than directly manipulating DOM elements. This provides a more stable and semantically clear event handling mechanism. Related interaction documentation: [Legend Filter](/en/manual/core/interaction/legend-filter), [Legend Highlight](/en/manual/core/interaction/legend-highlight).
:::

### Recommended Approaches for Component Event Listening

For components like legends and axes, the following approaches are recommended:

**Approach 1: Using High-level Interaction Events (Recommended ⭐⭐⭐⭐⭐)**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();

// Recommended: Use high-level interaction events
chart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return; // Filter programmatic events

  console.log('✅ Legend filter event:', data);
  console.log('   - Channel:', data.channel);
  console.log('   - Current selected values:', data.values);
});

chart.on('legend:reset', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('✅ Legend reset (select all)');
});
```

**Approach 2: Listening to Specific Child Element Events (Suitable for simple custom interactions)**

For custom interaction logic, you can listen to component child element events:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();

// Listen to legend label and marker clicks
const handleLegendClick = (event, source) => {
  // Method 1: Get complete data via parent container (recommended)
  const item = event.target.parentNode.parentNode; // marker/label -> group -> item
  if (item && item.__data__) {
    // Find the actual legend component (className includes 'legend-category')
    let legend = item.parentNode;
    while (legend && !legend.className.includes('legend-category')) {
      legend = legend.parentNode;
      if (!legend) return;
    }

    if (legend && legend.attributes && legend.attributes.data) {
      const { data } = legend.attributes;
      const { index } = item.__data__;
      const itemData = data[index];
      console.log(`✅ Clicked ${source}:`, itemData); // {id, label, color}
      console.log(`   - ID: ${itemData.id}`);
      console.log(`   - Label: ${itemData.label}`);
      console.log(`   - Color: ${itemData.color}`);
    }
  }

  // Method 2: Get partial information from target.attributes
  if (source === 'label') {
    console.log('   - Text:', event.target.attributes.text);
  } else if (source === 'marker') {
    console.log('   - Color:', event.target.attributes.fill);
  }
};

chart.on('g2-legend-marker:click', (e) => handleLegendClick(e, 'marker'));
chart.on('g2-legend-label:click', (e) => handleLegendClick(e, 'label'));
```

**Approach 3: Direct Canvas DOM Manipulation (Most flexible, for fully customized scenarios)**

Use only when complete customization is needed:

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const items = document.getElementsByClassName('g2-legend-item');

  items.forEach((item) => {
    // Utilize event bubbling: clicks on child elements bubble to container
    item.addEventListener('click', () => {
      // Find the actual legend component
      let legend = item.parentNode;
      while (legend && !legend.className.includes('legend-category')) {
        legend = legend.parentNode;
        if (!legend) return;
      }

      if (legend && legend.attributes && legend.attributes.data) {
        const { data } = legend.attributes;
        const { index } = item.__data__;
        const itemData = data[index]; // {id, label, color}
        console.log('Legend item data:', itemData);
      }
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

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

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

  // Handle plot click logic
  console.log('Plot area clicked', event);
});
```

### Controlling Element Styles with className

You can get specific elements via className and dynamically modify their styles:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');

  // Modify the first legend item's style
  if (legendItems.length > 0) {
    const firstItem = legendItems[0];
    const firstMarker = firstItem.getElementsByClassName('g2-legend-marker')[0];
    const firstLabel = firstItem.getElementsByClassName('g2-legend-label')[0];

    // Add highlight style
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

Combining className with element attributes allows precise targeting of specific chart elements:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

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
    console.log('   Can execute business logic: e.g., auto-focus, highlight, etc.');

    // Add background color and special styles to the target legend item

    console.log(`🎨 Adding special styles to legend "${targetText}"...`);

    // Get the legend item's background element
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

## Complete List of G2 Component className

### Legend Components

| className                     | Description                          |
| ----------------------------- | ------------------------------------ |
| **`g2-legend-title`**         | Legend title                         |
| **`g2-legend-item`**          | Category legend item container       |
| **`g2-legend-background`**    | Category legend item background      |
| **`g2-legend-marker`**        | Category legend item marker          |
| **`g2-legend-label`**         | Category legend item label text      |
| **`g2-legend-value`**         | Category legend item value           |
| **`g2-legend-focus-icon`**    | Category legend item focus icon      |
| **`g2-legend-ribbon`**        | Continuous legend color ribbon       |
| **`g2-legend-track`**         | Continuous legend slider track       |
| **`g2-legend-selection`**     | Continuous legend selection area     |
| **`g2-legend-handle`**        | Continuous legend slider handle      |
| **`g2-legend-handle-marker`** | Continuous legend handle marker      |
| **`g2-legend-handle-label`**  | Continuous legend label/tick value   |

### Axis Components

| className                | Description       |
| ------------------------ | ----------------- |
| **`g2-axis-line`**       | Axis main line    |
| **`g2-axis-tick`**       | Axis tick line    |
| **`g2-axis-tick-item`**  | Individual tick   |
| **`g2-axis-label`**      | Axis tick label   |
| **`g2-axis-label-item`** | Individual label  |
| **`g2-axis-title`**      | Axis title        |
| **`g2-axis-grid`**       | Axis grid lines   |

### Why don't click events work on container elements?

Container elements like `g2-legend-item` and `g2-axis` are typically the outermost elements of components with transparent backgrounds and no clickable rendered area. Actual click events are triggered by their child elements and then propagate to the container through event bubbling.

**Legend Component Examples:**

- ✅ `g2-legend-marker:click` - Click on marker icon
- ✅ `g2-legend-label:click` - Click on label text
- ❌ `g2-legend-item:click` - Container itself has no clickable area

**Axis Component Examples:**

- ✅ `g2-axis-label:click` - Click on axis label
- ✅ `g2-axis-title:click` - Click on axis title
- ✅ `g2-axis-line:click` - Click on axis line
- ❌ `g2-axis:click` - Container itself has no clickable area

**How to get clicked legend item data?**

Child elements (marker/label) don't directly store complete data. Use the following approaches:

1. **Via parent container** (recommended): Navigate up to the item container, get complete data via `item.__data__.index` + `legend.attributes.data`
2. **From attributes**: Label's `text` property, marker's `fill` property contain partial information
3. **Using DOM listeners**: Bind events directly on the item container, get data via `item.__data__`

**Example: Get corresponding label when clicking marker**

```js
chart.on('g2-legend-marker:click', (e) =>  {
  const item = e.target.parentNode.parentNode;
  if (item && item.__data__) {
    // Find the actual legend component
    let legend = item.parentNode;
    while (legend && !legend.className.includes('legend-category')) {
      legend = legend.parentNode;
      if (!legend) return;
    }

    if (legend && legend.attributes && legend.attributes.data) {
      const { data } = legend.attributes;
      const { index } = item.__data__;
      const itemData = data[index];
      console.log('Clicked marker, corresponding label is:', itemData.label);
      console.log('Complete data:', itemData); // {id, label, color}
    }
  }
});
```

## Typical Use Cases

See Interaction - Event [Examples](/en/examples#interaction-event)
