---
title: State
order: 11
---

In data visualization, **State** is the core mechanism for implementing interactive feedback, highlighting, selection, and other effects. G2 provides a flexible and powerful state system that allows developers to configure different state styles for each mark in the chart, enabling various interactive scenarios such as mouse hover highlighting and click selection, greatly enhancing chart usability and expressiveness.

State style properties are consistent with the style properties supported by [@antv/g](https://github.com/antvis/g), commonly including `fill` (fill color), `stroke` (stroke color), `strokeWidth` (stroke width), `opacity` (transparency), etc. For details, see [Style](/en/manual/core/style).

## Use Cases

- Mouse hover highlighting data
- Click to select/deselect data
- Multi-dimensional interactive feedback (e.g., hover + select overlay)
- Dynamic effects with animations for state transitions

## Configuration Levels

**Important Note: State Configuration Propagation Mechanism**

In G2, state configuration propagation follows these rules:

### Single Mark Scenario

When there is only one mark under a view, configuring state at the view level **will take effect**, and the state will automatically propagate to the child mark:

```js
// ✅ With a single mark, view-level state configuration will take effect
chart.options({
  type: 'view',
  state: { active: { backgroundFill: 'red', backgroundOpacity: 0.5 } }, // Will propagate to child mark
  children: [
    { type: 'line' }, // Will inherit the view's state configuration
  ],
});
```

### Multiple Marks Scenario

When there are multiple marks under a view, view-level state **will not take effect**, and each mark needs to be configured individually:

```js
// ❌ With multiple marks, view-level state will not propagate
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // This configuration will not propagate to child marks
  children: [{ type: 'line' }, { type: 'point' }],
});

// ✅ Correct: Configure state at each mark level individually
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      state: { active: { stroke: 'red', strokeWidth: 2 } },
    },
    {
      type: 'point',
      state: { active: { fill: 'red', r: 6 } },
    },
  ],
});
```

### Direct Mark-Level Configuration

When using mark APIs directly (such as `chart.line()`), state configuration takes effect at the mark level:

```js
// ✅ Direct mark-level configuration
chart.options({
  type: 'line',
  state: { active: { stroke: 'red', strokeWidth: 2 } },
});
```

## Configuration Options

G2 supports configuring styles for different states at the mark level through the `state` field. Common states include:

| State Name | Description                | Typical Scenario               |
| ---------- | -------------------------- | ------------------------------ |
| active     | Style when highlighted     | Mouse hover                    |
| inactive   | Style when not highlighted | Other non-highlighted elements |
| selected   | Style when selected        | Mouse click                    |
| unselected | Style when not selected    | Other non-selected elements    |

### Configuration Methods

#### 1. Declarative Approach (Recommended)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const state = {
  selected: { fill: 'red' },
  active: { fill: 'green', stroke: 'black', lineWidth: 1 },
};
chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
    inactive: { fill: '#aaa' },
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#eee' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});
chart.render();
```

#### 2. Dynamic Styles (Function Support)

State style properties support functions that dynamically return styles based on data:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: {
      fill: (d) => (d.value > 40 ? 'red' : 'blue'),
    },
  },
  interaction: { elementHighlight: true },
});

chart.render();
```

## State Interactions and Priority Mechanism

G2 supports **multiple states being active simultaneously**. When the same property is configured by multiple states, the final effective style is chosen based on priority.

Priority order:

```
selected:   3
unselected: 3
active:     2
inactive:   2
default:    1
```

- `selected`/`unselected` have higher priority, commonly used for click selection
- `active`/`inactive` have secondary priority, commonly used for hover highlighting
- `default` is the default style

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    selected: { fill: 'red' },
    active: { fill: 'green', stroke: 'black', lineWidth: 1 },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

- When hovering, the `active` state takes effect, showing green color and black stroke
- When clicked, both `selected` and `active` states are active, but `selected` has higher priority, so the final fill color is red

## Common Interactions and State Integration

G2 provides rich interactions that, combined with state styles, can achieve various interactive effects:

| Name                    | Description            | Typical States      |
| ----------------------- | ---------------------- | ------------------- |
| brushAxisHighlight      | Axis brush highlight   | active/inactive     |
| brushHighlight          | Area brush highlight   | active/inactive     |
| brushXHighlight         | X-axis brush highlight | active/inactive     |
| brushYHighlight         | Y-axis brush highlight | active/inactive     |
| elementHighlight        | Hover highlight        | active/inactive     |
| elementHighlightByColor | Highlight by color     | active/inactive     |
| elementHighlightByX     | Highlight by X         | active/inactive     |
| legendHighlight         | Legend highlight       | active/inactive     |
| elementSelect           | Click selection        | selected/unselected |
| elementSelectByColor    | Select by color        | selected/unselected |
| elementSelectByX        | Select by X            | selected/unselected |

## Typical Scenario Examples

### 1. Highlight Interaction (elementHighlight)

Using the `elementHighlight` interaction plugin with `active` and `inactive` state styles to achieve mouse hover highlighting:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    active: { fill: 'red' },
    inactive: { fill: '#aaa' },
  },
  interaction: { elementHighlight: true },
});

chart.render();
```

**Effect Description**:

- When hovering over a bar, it applies the `active` style, while other bars apply the `inactive` style.

### 2. Selection Interaction (elementSelect)

Using the `elementSelect` interaction plugin with `selected` and `unselected` state styles to achieve click selection:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#eee' },
  },
  interaction: { elementSelect: true },
});
chart.render();
```

**Effect Description**:

- When clicking a bar, it applies the `selected` style, while other bars apply the `unselected` style.

### 3. Multiple State Overlay (Highlight + Selection)

Supports simultaneous highlighting and selection, commonly used in dashboards and BI reports:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: { fill: 'yellow' },
    inactive: { fill: '#eee' },
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#ccc' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

### 4. State and Animation Integration

State transitions can be combined with animations (such as fade in/out, scaling, etc.) to enhance the interactive experience. For details, see [Animation System](/en/manual/core/animate/overview).

```js
chart.options({
  type: 'interval',
  state: {
    active: {
      fill: 'red',
      opacity: (d) => (d.value > 40 ? 1 : 0.5),
    },
  },
  // Other configurations...
});
```

## Advanced Usage

### 1. Dynamic State Style Calculation

Supports setting style properties as functions that dynamically return styles based on data:

```js
chart.options({
  type: 'interval',
  state: {
    active: {
      fill: (d) => (d.value > 40 ? 'red' : 'blue'),
    },
  },
  // Other configurations...
});
```

## Common Issues

- **State styles not taking effect?**  
  Check if interaction plugins (such as `elementHighlight`, `elementSelect`) are correctly configured, and ensure the `state` configuration is correct.

- **Multiple state conflicts?**  
  Make good use of the priority mechanism to avoid repeatedly configuring the same property in multiple high-priority states.
- **State styles conflicting with animations?**  
  Pay attention to animation configuration during state transitions to avoid visual anomalies caused by overlapping styles and animations.
