---
title: Legend
order: 7.2
---

## Overview

In G2, **Legend** is an auxiliary element of the chart that uses color, size, and shape to distinguish different data types and is used for data filtering in charts. It can be understood as the visualization of scales corresponding to non-spatial channels (`color`, `opacity`, `size`, `shape`). G2 automatically generates different legends based on the set graphic attribute mappings and data types. When a variable corresponds to multiple graphic attributes, G2 merges the legends to achieve simplification.

The four non-spatial channels `color`, `opacity`, `size`, and `shape` automatically generate different legends when they receive parameters that are determined to be fields from the data source:

| Visual Channel | Description                                |
| -------------- | ------------------------------------------ |
| color          | Generate legend based on different colors  |
| opacity        | Generate legend based on different opacity |
| size           | Generate legend based on different sizes   |
| shape          | Generate legend based on different shapes  |

### Components

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lGLWS4QUPscAAAAAAAAAAAAAemJ7AQ/original"/>

### Usage

There are two ways to configure legends:

First, pass a `boolean` to set whether to display the legend.

```js
({
  type: 'interval',
  legend: false; // Hide all legends
})
```

```js
({
  type: 'interval',
  legend: {color: false}; // Hide the legend for the color channel
})
```

Second, pass _legendOption_ to configure the legend as a whole.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

### Configuration Levels

Legends can be configured at the Mark level. In G2, each mark has its own legend. If the scales corresponding to marks are synchronized, the legends are also merged.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

Legends can also be configured at the View level. Legends have transitivity. Legends declared on a view are passed to the marks declared in `children`. If the mark has a legend for the corresponding channel, they are merged; otherwise, they don't affect each other.

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## Configuration Options

Legends in G2 are divided into **continuous legends** and **categorical legends**. Due to the different structures of these two types of legends, their configuration options also differ.

Some configuration options are scoped to categorical legends and continuous legends:
<Badge type="success">Categorical Legend</Badge>
<Badge type="warning">Continuous Legend</Badge>

| Property                                                        | Description                                                                           | Type                                                               | Default Value                         | Required |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- | -------- |
| orientation                                                     | Legend orientation, which is the scroll direction for categorical legends             | `horizontal` \| `vertical`                                         | `horizontal`                          |          |
| position                                                        | Position of the legend                                                                | `top` \| `right` \| `left` \| `bottom`                             | `top`                                 |          |
| layout                                                          | Adjust the flex layout of the legend                                                  | [layout](#layout)                                                  | See [layout](#layout)                 |          |
| size                                                            | Size of the legend component                                                          | number                                                             | -                                     |          |
| length                                                          | Length of the legend component                                                        | number                                                             | -                                     |          |
| crossPadding                                                    | Distance from legend to chart area                                                    | number                                                             | `12`                                  |          |
| order                                                           | Order of legend in layout                                                             | number                                                             | `1`                                   |          |
| title                                                           | Configure legend title                                                                | [title](#title)                                                    | See [title](#title)                   |          |
| cols <Badge type="success">Categorical Legend</Badge>           | Specify the number of legend items displayed per row; empty means no limit on columns | number                                                             | -                                     |          |
| colPadding <Badge type="success">Categorical Legend</Badge>     | Specify horizontal spacing between legend items                                       | number                                                             | `12`                                  |          |
| rowPadding <Badge type="success">Categorical Legend</Badge>     | Specify vertical spacing between legend items                                         | number                                                             | `8`                                   |          |
| maxRows <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of rows for legend                                             | number                                                             | `3`                                   |          |
| maxCols <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of columns for legend                                          | number                                                             | `3`                                   |          |
| itemMarker <Badge type="success">Categorical Legend</Badge>     | Configure legend item marker                                                          | [itemMarker](#itemmarker)                                          | See [itemMarker](#itemmarker)         |          |
| itemLabel <Badge type="success">Categorical Legend</Badge>      | Configure legend item label text                                                      | [itemLabel](#itemlabel)                                            | See [itemLabel](#itemlabel)           |          |
| itemValue <Badge type="success">Categorical Legend</Badge>      | Configure legend item value                                                           | [itemValue](#itemvalue)                                            | See [itemValue](#itemvalue)           |          |
| itemBackground <Badge type="success">Categorical Legend</Badge> | Configure legend item background                                                      | [itemBackground](#itembackground)                                  | See [itemBackground](#itembackground) |          |
| itemWidth <Badge type="success">Categorical Legend</Badge>      | Configure legend item width                                                           | number                                                             | -                                     |          |
| itemSpan <Badge type="success">Categorical Legend</Badge>       | Configure space allocation for legend item marker, label, and value                   | number \| number[]                                                 | `[1, 1, 1]`                           |          |
| itemSpacing <Badge type="success">Categorical Legend</Badge>    | Configure spacing between legend item marker, label, and value                        | number \| number[]                                                 | `[8, 8]`                              |          |
| nav <Badge type="success">Categorical Legend</Badge>            | Configure legend navigator                                                            | [nav](#nav)                                                        | See [nav](#nav)                       |          |
| poptip <Badge type="success">Categorical Legend</Badge>            | Legend item poptip                                 | [poptip](#poptip)                                                        | See [poptip](#poptip)                       |
| color <Badge type="warning">Continuous Legend</Badge>           | Configure color band colors for continuous legend                                     | string[] \| [d3-interpolate](https://github.com/d3/d3-interpolate) | -                                     |          |
| block <Badge type="warning">Continuous Legend</Badge>           | Whether continuous legend displays by intervals                                       | boolean                                                            | false                                 |          |
| type <Badge type="warning">Continuous Legend</Badge>            | Configure type of continuous legend                                                   | `size` \|`color`                                                   | `color`                               |          |
| ribbon <Badge type="warning">Continuous Legend</Badge>          | Configure color band of continuous legend                                             | [ribbon](#ribbon)                                                  | See [ribbon](#ribbon)                 |          |
| handle <Badge type="warning">Continuous Legend</Badge>          | Configure slider handle of continuous legend                                          | [handle](#handle)                                                  | See [handle](#handle)                 |          |
| label <Badge type="warning">Continuous Legend</Badge>           | Configure labels/tick values of continuous legend                                     | [label](#label)                                                    | See [label](#label)                   |          |
| indicator <Badge type="warning">Continuous Legend</Badge>       | Configure indicator of continuous legend                                              | [indicator](#indicator)                                            | See [indicator](#indicator)           |          |

### orientation

<description>**optional** _horizontal | vertical_ </description>

Legend orientation, which is the scroll direction for categorical legends. Default is `horizontal`.

### position

<description> **optional** _"top" | "right" | "left" | "bottom"_ </description>

Position of the legend. Default is `top`.

```js | ob { inject: true, pin: false }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const positionList = ['top', 'right', 'left', 'bottom'];
const positionMap = positionList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

chart.options({
  type: 'interval',
  data: [
    { name: 'London', month: 'Jan.', avgRainfall: 18.9 },
    { name: 'London', month: 'Feb.', avgRainfall: 28.8 },
    { name: 'London', month: 'Mar.', avgRainfall: 39.3 },
    { name: 'London', month: 'Apr.', avgRainfall: 81.4 },
    { name: 'London', month: 'May', avgRainfall: 47 },
    { name: 'London', month: 'Jun.', avgRainfall: 20.3 },
    { name: 'London', month: 'Jul.', avgRainfall: 24 },
    { name: 'London', month: 'Aug.', avgRainfall: 35.6 },
    { name: 'Berlin', month: 'Jan.', avgRainfall: 12.4 },
    { name: 'Berlin', month: 'Feb.', avgRainfall: 23.2 },
    { name: 'Berlin', month: 'Mar.', avgRainfall: 34.5 },
    { name: 'Berlin', month: 'Apr.', avgRainfall: 99.7 },
    { name: 'Berlin', month: 'May', avgRainfall: 52.6 },
    { name: 'Berlin', month: 'Jun.', avgRainfall: 35.5 },
    { name: 'Berlin', month: 'Jul.', avgRainfall: 37.4 },
    { name: 'Berlin', month: 'Aug.', avgRainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'avgRainfall', color: 'name' },
  transform: [{ type: 'dodgeX' }],
});

const handleSetPosition = (position) => {
  chart.options({
    legend: {
      color: {
        position,
      },
    },
  });
  chart.render(); // Re-render the chart
};

// Insert Position selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select legend position ';
const selector = document.createElement('select');
selector.innerHTML = positionMap.map(
  (position, index) =>
    `<option value="${position.value}" ${index === 0 ? 'selected' : ''}>${
      position.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetPosition(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

### layout

<description> _LegendLayoutCfg_ **optional** </description>

Legend component supports adjusting its position on the canvas through the `layout` property. Legend layout uses the **Flexbox layout model**, where `position` determines the legend's basic position on the canvas, and `layout` further controls the precise alignment within the legend.

#### Concept of Layout Axes

The key to understanding legend layout is mastering the concepts of **main axis** and **cross axis**:

| **position** | **Default flexDirection** | **Main Axis Direction** | **Cross Axis Direction** | **Main Axis Meaning**   | **Cross Axis Meaning** |
| ------------ | ------------------------- | ----------------------- | ------------------------ | ----------------------- | ---------------------- |
| `top`        | `row`                     | Horizontal →            | Vertical ↓               | Legend items left-right | Legend area top-bottom |
| `bottom`     | `row`                     | Horizontal →            | Vertical ↑               | Legend items left-right | Legend area top-bottom |
| `left`       | `column`                  | Vertical ↓              | Horizontal →             | Legend items top-bottom | Legend area left-right |
| `right`      | `column`                  | Vertical ↓              | Horizontal ←             | Legend items top-bottom | Legend area left-right |

#### Configuration Properties

_LegendLayoutCfg_ configuration:

| Property       | Description         | Type                                   | Default Value                                                 | Affects | Required |
| -------------- | ------------------- | -------------------------------------- | ------------------------------------------------------------- | ------- | -------- |
| justifyContent | Main axis align     | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                  | Main    |          |
| alignItems     | Cross axis align    | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                  | Cross   |          |
| flexDirection  | Main axis direction | `row` \| `column`                      | `row` when position is `top` and `bottom`, `column` otherwise | -       |          |

#### position + layout Combination Configuration

Through the combination of `position` and `layout`, precise positioning of legends can be achieved:

```js
// 1. Top center legend
({
  legend: {
    color: {
      position: 'top', // Legend at top
      layout: {
        justifyContent: 'center', // Main axis (horizontal) center
      },
    },
  },
});

// 2. Right vertical center legend
({
  legend: {
    color: {
      position: 'right', // Legend at right
      layout: {
        justifyContent: 'center', // Main axis (vertical) center
      },
    },
  },
});

// 3. Bottom right-aligned legend
({
  legend: {
    color: {
      position: 'bottom', // Legend at bottom
      layout: {
        justifyContent: 'flex-end', // Main axis (horizontal) right-align
      },
    },
  },
});

// 4. Left bottom-aligned legend
({
  legend: {
    color: {
      position: 'left', // Legend at left
      layout: {
        justifyContent: 'flex-end', // Main axis (vertical) bottom-align
      },
    },
  },
});
```

#### Interactive Example

Through the interactive example below, you can intuitively see the effects of different `position` and `layout` combinations:

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 400,
  width: 600,
});
const container = chart.getContainer();

const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      position: 'top',
      layout: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
  },
});

const positionOptions = [
  { value: 'top', label: 'Top (top)' },
  { value: 'bottom', label: 'Bottom (bottom)' },
  { value: 'left', label: 'Left (left)' },
  { value: 'right', label: 'Right (right)' },
];

const justifyOptions = [
  { value: 'flex-start', label: 'Start align (flex-start)' },
  { value: 'center', label: 'Center align (center)' },
  { value: 'flex-end', label: 'End align (flex-end)' },
];

const alignOptions = [
  { value: 'flex-start', label: 'Start align (flex-start)' },
  { value: 'center', label: 'Center align (center)' },
  { value: 'flex-end', label: 'End align (flex-end)' },
];

// Create control panel
const controlPanel = document.createElement('div');
controlPanel.style.cssText = `
  margin-bottom: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

// Position selector
const positionContainer = document.createElement('div');
positionContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    Legend Position (position):
  </label>
`;
const positionSelect = document.createElement('select');
positionSelect.style.cssText = 'width: 100%; padding: 4px;';
positionSelect.innerHTML = positionOptions
  .map(
    (option, index) =>
      `<option value="${option.value}" ${index === 0 ? 'selected' : ''}>${
        option.label
      }</option>`,
  )
  .join('');
positionContainer.appendChild(positionSelect);

// JustifyContent selector
const justifyContainer = document.createElement('div');
justifyContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    Main Axis Align (justifyContent):
  </label>
`;
const justifySelect = document.createElement('select');
justifySelect.style.cssText = 'width: 100%; padding: 4px;';
justifySelect.innerHTML = justifyOptions
  .map(
    (option, index) =>
      `<option value="${option.value}" ${index === 0 ? 'selected' : ''}>${
        option.label
      }</option>`,
  )
  .join('');
justifyContainer.appendChild(justifySelect);

// AlignItems selector
const alignContainer = document.createElement('div');
alignContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    Cross Axis Align (alignItems):
  </label>
`;
const alignSelect = document.createElement('select');
alignSelect.style.cssText = 'width: 100%; padding: 4px;';
alignSelect.innerHTML = alignOptions
  .map(
    (option, index) =>
      `<option value="${option.value}" ${index === 0 ? 'selected' : ''}>${
        option.label
      }</option>`,
  )
  .join('');
alignContainer.appendChild(alignSelect);

controlPanel.appendChild(positionContainer);
controlPanel.appendChild(justifyContainer);
controlPanel.appendChild(alignContainer);

// Status display
const statusDiv = document.createElement('div');
statusDiv.style.cssText = `
  margin-bottom: 16px;
  padding: 12px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
`;

const updateChart = () => {
  const position = positionSelect.value;
  const justifyContent = justifySelect.value;
  const alignItems = alignSelect.value;

  chart.options({
    legend: {
      color: {
        position,
        layout: {
          justifyContent,
          alignItems,
        },
      },
    },
  });
  chart.render();

  // Update status display
  const isHorizontal = position === 'top' || position === 'bottom';
  const mainAxis = isHorizontal ? 'Horizontal' : 'Vertical';
  const crossAxis = isHorizontal ? 'Vertical' : 'Horizontal';

  statusDiv.innerHTML = `
Current Config: position: "${position}", justifyContent: "${justifyContent}", alignItems: "${alignItems}"<br>
Main Axis Direction: ${mainAxis} | Cross Axis Direction: ${crossAxis}<br>
Main Axis Align: ${justifyContent} | Cross Axis Align: ${alignItems}
  `;
};

// Bind events
positionSelect.addEventListener('change', updateChart);
justifySelect.addEventListener('change', updateChart);
alignSelect.addEventListener('change', updateChart);

// Insert control panel
container.insertBefore(controlPanel, container.firstChild);
container.insertBefore(statusDiv, container.lastChild);

// Initial render
updateChart();
```

#### Common Layout Scenarios

Here are some common legend layout requirements and their configuration methods:

```js
// 🎯 Scenario 1: Top center display, suitable for dashboards
({
  legend: {
    color: {
      position: 'top',
      layout: {
        justifyContent: 'center', // Horizontal center
      },
    },
  },
});

// 🎯 Scenario 2: Right vertical center, suitable for detailed charts
({
  legend: {
    color: {
      position: 'right',
      layout: {
        justifyContent: 'center', // Vertical center
      },
    },
  },
});

// 🎯 Scenario 3: Bottom left-aligned, space-saving
({
  legend: {
    color: {
      position: 'bottom',
      layout: {
        justifyContent: 'flex-start', // Left-aligned
      },
    },
  },
});

// 🎯 Scenario 4: Right top-aligned, compact layout
({
  legend: {
    color: {
      position: 'right',
      layout: {
        justifyContent: 'flex-start', // Top-aligned
      },
    },
  },
});

// 🎯 Scenario 5: Left bottom-aligned, aligned with chart bottom
({
  legend: {
    color: {
      position: 'left',
      layout: {
        justifyContent: 'flex-end', // Bottom-aligned
      },
    },
  },
});
```

💡 **Layout Tips**

- **Horizontal center**: `position: 'top'` + `justifyContent: 'center'`
- **Vertical center**: `position: 'right'` + `justifyContent: 'center'`
- **Compact layout**: Use `flex-start` to keep legend close to chart

### size

<description> _number_ **optional** </description>

Size of the Legend component, used for G2 internal layout calculation and space allocation. Affects the component size on the **cross axis**:

- For horizontal layout legends (`position: 'top'` or `'bottom'`), controls the legend height
- For vertical layout legends (`position: 'left'` or `'right'`), controls the legend width

Manual configuration will cause G2's internal calculation logic to fail, requiring you to configure margin, padding, inset, etc. yourself. See [Chart Layout](/en/manual/core/chart/chart-component#chart-layout). Not recommended for configuration unless customization scenarios are needed.

### length

<description> _number_ **optional** </description>

Length of the Legend component, used for G2 internal layout calculation and space allocation. Affects the component size on the **main axis**:

- For horizontal layout legends (`position: 'top'` or `'bottom'`), controls the legend width
- For vertical layout legends (`position: 'left'` or `'right'`), controls the legend height

<img alt="legend-overview" width=600 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KIXzR7Mwb1cAAAAARbAAAAgAemJ7AQ/original"/>

<img alt="legend-overview" width=600 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZpfMQpeB4jUAAAAARpAAAAgAemJ7AQ/original"/>

### crossPadding

<description> _number_ **optional** </description>

Distance between the Legend component and the chart. Default is `12`.

### order

<description> _number_ **optional** </description>

Sort order of the Legend component during layout. Default is `1`. All components in G2 have default sort sizes, with smaller values closer to the chart area. For example, the Title component has a default sort of `2`, which is farther from the chart area than the Legend component with default sort of `1`.

### title

<description> _LegendTitleCfg_ **optional** </description>

Legend title configuration. _LegendTitleCfg_ configuration:

| Property           | Description                                                                                                                                | Type                                                                                                       | Default Value                                     | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| title              | Close title or set title content                                                                                                           | false \| string                                                                                            | true for continuous legend, false for categorical |          |
| titleSpacing       | Spacing from title to content area                                                                                                         | number \| number[]                                                                                         | `4`                                               |          |
| titleInset         | Title text inner padding                                                                                                                   | number \| number[]                                                                                         | `0`                                               |          |
| titlePosition      | Title position. Can use abbreviated form, e.g., `i` for `inner`, `lt` for `left-top`                                                       | `top` \| `bottom` \|`left` \|`right` \|`left-top` \|`left-bottom` \|`right-top` \|`right-bottom` \|`inner` | -                                                 |          |
| titleFontSize      | Title text size                                                                                                                            | number \| (datum, index, data) => number                                                                   | `12`                                              |          |
| titleFontFamily    | Title text font                                                                                                                            | string \| (datum, index, data) => string                                                                   | -                                                 |          |
| titleFontWeight    | Title font weight                                                                                                                          | number \| (datum, index, data) => number                                                                   | `normal`                                          |          |
| titleLineHeight    | Title text line height                                                                                                                     | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleTextAlign     | Set current text alignment for title content                                                                                               | `center` \| `end` \| `left` \| `right` \| `start`                                                          | `start`                                           |          |
| titleTextBaseline  | Set current text baseline used when drawing title text                                                                                     | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                                                 | `bottom`                                          |          |
| titleFill          | Title text color                                                                                                                           | string \| (datum, index, data) => string                                                                   | `#1D2129`                                         |          |
| titleFillOpacity   | Title text color opacity                                                                                                                   | number \| (datum, index, data) => number                                                                   | `0.65`                                            |          |
| titleStroke        | Title text stroke color                                                                                                                    | string \| (datum, index, data) => string                                                                   | -                                                 |          |
| titleStrokeOpacity | Title text stroke color opacity                                                                                                            | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleLineWidth     | Title stroke width                                                                                                                         | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleLineDash      | Title text stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number]                                               | -                                                 |          |
| titleOpacity       | Title text overall opacity                                                                                                                 | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleShadowColor   | Title text shadow color                                                                                                                    | string \| (datum, index, data) => string                                                                   | -                                                 |          |
| titleShadowBlur    | Title text shadow Gaussian blur coefficient                                                                                                | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleShadowOffsetX | Title shadow horizontal offset                                                                                                             | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleShadowOffsetY | Title shadow vertical offset                                                                                                               | number \| (datum, index, data) => number                                                                   | -                                                 |          |
| titleCursor        | Title cursor style. Same as CSS cursor style.                                                                                              | string \| (datum, index, data) => string                                                                   | `default`                                         |          |

In the Legend component, when configuring the title, it's not configured as an object, but with the `title` prefix plus property:

```js
({
  legend: {
    size: {
      title: 'Legend Title',
      titleSpacing: 0,
      titleInset: 0,
      titlePosition: 't',
      titleFontSize: 16,
      titleFontFamily: 'sans-serif',
      titleFontWeight: 500,
      titleLineHeight: 20,
      titleTextAlign: 'center',
      titleTextBaseline: 'middle',
      titleFill: '#000',
      titleFillOpacity: 0.9,
      titleStroke: '#DAF5EC',
      titleStrokeOpacity: 0.9,
      titleLineWidth: 2,
      titleLineDash: [4, 8],
      titleOpacity: 1,
      titleShadowColor: '#d3d3d3',
      titleShadowBlur: 10,
      titleShadowOffsetX: 10,
      titleShadowOffsetY: 10,
      titleCursor: 'pointer',
    },
  },
});
```

Try it:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 300 });

chart.options({
  type: 'legends',
  title: 'Legend Title',
  titleSpacing: 0,
  titleInset: 0,
  titlePosition: 't',
  titleFontSize: 16,
  titleFontFamily: 'sans-serif',
  titleFontWeight: 500,
  titleLineHeight: 20,
  titleTextAlign: 'center',
  titleTextBaseline: 'middle',
  titleFill: '#000',
  titleFillOpacity: 0.9,
  titleStroke: '#DAF5EC',
  titleStrokeOpacity: 0.9,
  titleLineWidth: 2,
  titleLineDash: [4, 8],
  titleOpacity: 1,
  titleShadowColor: '#d3d3d3',
  titleShadowBlur: 10,
  titleShadowOffsetX: 10,
  titleShadowOffsetY: 10,
  titleCursor: 'pointer',
  scale: {
    size: {
      type: 'linear',
      domain: [0, 10],
      range: [0, 100],
    },
  },
});

chart.render();
```

### cols

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specifies the number of legend items displayed per row. When empty, it means the number of columns is unlimited.

Legend layout uses **flow layout** by default.

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

When `cols` is specified, **grid layout** is used.

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

### colPadding

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specifies horizontal spacing between legend items. Default is `12`.

### rowPadding

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specifies vertical spacing between legend items. Default is `8`.

### maxRows

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specifies maximum number of rows for legend. Default is `3`.

⚠️ **Note**: This configuration only takes effect in **horizontal layout** (`position: 'top'` or `'bottom'`). When legend position is `'left'` or `'right'`, G2 automatically calculates the number of rows based on container height, and `maxRows` configuration will be ignored.

### maxCols

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specifies maximum number of columns for legend. Default is `3`.

⚠️ **Note**: This configuration only takes effect in **vertical layout** (`position: 'left'` or `'right'`). When legend position is `'top'` or `'bottom'`, G2 automatically calculates the number of columns based on container width, and `maxCols` configuration will be ignored.

💡 **How do maxRows and maxCols affect legend layout?**

maxRows and maxCols are used to limit the maximum number of rows and columns in legend layout, but they have different effects under different layout directions:

| **Parameter** | **Horizontal Layout (top/bottom)**              | **Vertical Layout (left/right)**                 |
| ------------- | ----------------------------------------------- | ------------------------------------------------ |
| **maxRows**   | ✅ Limits rows, controls legend height          | ❌ **No effect**, rows auto-calculated by height |
| **maxCols**   | ❌ **No effect**, rows auto-calculated by width | ✅ Limits columns, controls legend width         |

⚠️ **Note**: When using `maxRows` and `maxCols`, avoid manually configuring legend container's `size` and `length`.

### itemMarker

<description> _LegendItemMarkerCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item markers. _LegendItemMarkerCfg_ configuration:

| Property                    | Description                                                                                                                              | Type                                                         | Default Value    | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------- | -------- |
| itemMarker                  | Legend item marker                                                                                                                       | _Symbols_ \|(datum, index, data)=>_Symbols_                  | `circle`         |          |
| itemMarkerSize              | Legend item marker size                                                                                                                  | number \| (datum, index, data) => number                     | `8`              |          |
| itemMarkerFill              | Legend item marker fill color                                                                                                            | string \| (datum, index, data) => string                     | -                |          |
| itemMarkerFillOpacity       | Legend item marker fill opacity                                                                                                          | number \| (datum, index, data) => number                     | `1`              |          |
| itemMarkerStroke            | Legend item marker stroke                                                                                                                | string \| (datum, index, data) => string                     | -                |          |
| itemMarkerStrokeOpacity     | Legend item marker stroke opacity                                                                                                        | number \| (datum, index, data) => number                     | -                |          |
| itemMarkerLineWidth         | Legend item marker stroke width                                                                                                          | number \| (datum, index, data) => number                     | `4` for line markers |       |
| itemMarkerLineDash          | Legend item marker stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -                |          |
| itemMarkerOpacity           | Legend item marker overall opacity                                                                                                       | number \| (datum, index, data) => number                     | -                |          |
| itemMarkerShadowColor       | Legend item marker shadow color                                                                                                          | string \| (datum, index, data) => string                     | -                |          |
| itemMarkerShadowBlur        | Legend item marker shadow Gaussian blur coefficient                                                                                      | number \| (datum, index, data) => number                     | -                |          |
| itemMarkerShadowOffsetX     | Set horizontal distance of shadow from legend item marker                                                                               | number \| (datum, index, data) => number                     | -                |          |
| itemMarkerShadowOffsetY     | Set vertical distance of shadow from legend item marker                                                                                 | number \| (datum, index, data) => number                     | -                |          |
| itemMarkerCursor            | Legend item marker cursor style. Same as CSS cursor style.                                                                              | string \| (datum, index, data) => string                     | `default`        |          |

#### Available Symbol Types

| Property           | Description                   |
| ------------------ | ----------------------------- |
| bowtie             | Shape type: Bowtie            |
| cross              | Shape type: Cross             |
| dash               | Shape type: Dash              |
| diamond            | Shape type: Diamond           |
| dot                | Shape type: Dot               |
| hexagon            | Shape type: Hexagon           |
| hollowBowtie       | Shape type: Hollow Bowtie     |
| hollowDiamond      | Shape type: Hollow Diamond    |
| hollowHexagon      | Shape type: Hollow Hexagon    |
| hollowPoint        | Shape type: Hollow Point      |
| hollowSquare       | Shape type: Hollow Square     |
| hollowTriangle     | Shape type: Hollow Triangle   |
| hollowTriangleDown | Shape type: Hollow Triangle Down |
| hv                 | Style type: HV Path           |
| hvh                | Style type: HVH Path          |
| hyphen             | Shape type: Hyphen            |
| line               | Shape type: Line              |
| plus               | Shape type: Plus              |
| point              | Shape type: Solid Point       |
| rect               | Shape type: Rectangle         |
| smooth             | Style type: Smooth Curve      |
| square             | Shape type: Square            |
| tick               | Shape type: Tick              |
| triangleDown       | Shape type: Triangle Down     |
| triangle           | Shape type: Triangle          |
| vh                 | Style type: VH Path           |
| vhv                | Style type: VHV Path          |

Try it:

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
// Available itemMarker shapes
const shapeList = [
  'bowtie',
  'cross',
  'dash',
  'diamond',
  'dot',
  'hexagon',
  'hollowBowtie',
  'hollowDiamond',
  'hollowHexagon',
  'hollowPoint',
  'hollowSquare',
  'hollowTriangle',
  'hollowTriangleDown',
  'hv',
  'hvh',
  'hyphen',
  'line',
  'plus',
  'point',
  'rect',
  'smooth',
  'square',
  'tick',
  'triangleDown',
  'triangle',
  'vh',
  'vhv',
];
const shapeMap = shapeList.map((p) => {
  return {
    label: p,
    value: p,
  };
});

chart.options({
  type: 'legends',
  height: 60,
  itemMarker: 'bowtie',
  scale: {
    color: {
      type: 'ordinal',
      domain: ['a', 'b'],
      range: ['steelblue', 'orange'],
    },
  },
});

const handleSetShape = (shape) => {
  chart.options({
    itemMarker: shape,
  });
  chart.render(); // Re-render the chart
};

const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select legend item marker shape ';
const selector = document.createElement('select');
selector.innerHTML = shapeMap.map(
  (shape, index) =>
    `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
      shape.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetShape(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

In the Legend component, when configuring legend item markers, it's not configured as an object, but with the `itemMarker` prefix plus property:

```js
({
  legend: {
    color: {
      itemMarker: 'rect',
      itemMarkerSize: 20,
      itemMarkerFill: '#000',
      itemMarkerFillOpacity: 0.9,
      itemMarkerStroke: '#DAF5EC',
      itemMarkerStrokeOpacity: 0.9,
      itemMarkerLineWidth: 2,
      itemMarkerLineDash: [4, 8],
      itemMarkerOpacity: 1,
      itemMarkerShadowColor: '#d3d3d3',
      itemMarkerShadowBlur: 10,
      itemMarkerShadowOffsetX: 10,
      itemMarkerShadowOffsetY: 10,
      itemMarkerCursor: 'pointer',
    },
  },
});
```

### itemLabel

<description> _LegendItemLabelCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item labels. _LegendItemLabelCfg_ configuration:

| Property                   | Description                                                                                                                              | Type                                                           | Default Value | Required |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- | -------- |
| itemLabelText              | Legend item label content                                                                                                                | string \| (datum, index, data) => string                       | -             |          |
| itemLabelFontSize          | Legend item label text size                                                                                                              | number \| (datum, index, data) => number                       | `12`          |          |
| itemLabelFontFamily        | Legend item label text font                                                                                                              | string \| (datum, index, data) => string                       | -             |          |
| itemLabelFontWeight        | Legend item label font weight                                                                                                            | number \| (datum, index, data) => number                       | `normal`      |          |
| itemLabelLineHeight        | Legend item label text line height                                                                                                       | number \| (datum, index, data) => number                       | -             |          |
| itemLabelTextAlign         | Set current text alignment for legend item label content                                                                                | `center` \| `end` \| `left` \| `right` \| `start`              | `start`       |          |
| itemLabelTextBaseline      | Set current text baseline used when drawing legend item label text                                                                      | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`     | `bottom`      |          |
| itemLabelFill              | Legend item label text color                                                                                                             | string \| (datum, index, data) => string                       | `#1D2129`     |          |
| itemLabelFillOpacity       | Legend item label text color opacity                                                                                                     | number \| (datum, index, data) => number                       | `0.9`         |          |
| itemLabelStroke            | Legend item label text stroke color                                                                                                      | string \| (datum, index, data) => string                       | -             |          |
| itemLabelStrokeOpacity     | Legend item label text stroke color opacity                                                                                              | number \| (datum, index, data) => number                       | -             |          |
| itemLabelLineWidth         | Legend item label text stroke width                                                                                                      | number \| (datum, index, data) => number                       | -             |          |
| itemLabelLineDash          | Legend item label text stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (da tu m, index, data) => [number , number] | -             |          |
| itemLabelOpacity           | Legend item label text overall opacity                                                                                                   | number \| (datum, index, data) => number                       | -             |          |
| itemLabelShadowColor       | Legend item label text shadow color                                                                                                      | string \| (datum, index, data) => string                       | -             |          |
| itemLabelShadowBlur        | Legend item label text shadow Gaussian blur coefficient                                                                                  | number \| (datum, index, data) => number                       | -             |          |
| itemLabelShadowOffsetX     | Set horizontal distance of shadow from legend item label text                                                                           | number \| (datum, index, data) => number                       | -             |          |
| itemLabelShadowOffsetY     | Set vertical distance of shadow from legend item label text                                                                             | number \| (datum, index, data) => number                       | -             |          |
| itemLabelCursor            | Legend item label cursor style. Same as CSS cursor style.                                                                               | string \| (datum, index, data) => string                       | `default`     |          |

In the Legend component, when configuring legend item labels, it's not configured as an object, but with the `itemLabel` prefix plus property:

```js
({
  legend: {
    color: {
      itemLabelText: 'Legend Item Label',
      itemLabelFontSize: 16,
      itemLabelFontFamily: 'sans-serif',
      itemLabelFontWeight: 500,
      itemLabelLineHeight: 20,
      itemLabelTextAlign: 'center',
      itemLabelTextBaseline: 'middle',
      itemLabelFill: '#000',
      itemLabelFillOpacity: 0.9,
      itemLabelStroke: '#DAF5EC',
      itemLabelStrokeOpacity: 0.9,
      itemLabelLineWidth: 2,
      itemLabelLineDash: [4, 8],
      itemLabelOpacity: 1,
      itemLabelShadowColor: '#d3d3d3',
      itemLabelShadowBlur: 10,
      itemLabelShadowOffsetX: 10,
      itemLabelShadowOffsetY: 10,
      itemLabelCursor: 'pointer',
    },
  },
});
```

### itemValue

<description> _LegendItemValueCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item values. _LegendItemValueCfg_ configuration:

| Property                   | Description                                                                                                                              | Type                                                         | Default Value | Required |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| itemValueText              | Legend item value content                                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| itemValueFontSize          | Legend item value text size                                                                                                              | number \| (datum, index, data) => number                     | `12`          |          |
| itemValueFontFamily        | Legend item value text font                                                                                                              | string \| (datum, index, data) => string                     | -             |          |
| itemValueFontWeight        | Legend item value font weight                                                                                                            | number \| (datum, index, data) => number                     | `normal`      |          |
| itemValueLineHeight        | Legend item value text line height                                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| itemValueTextAlign         | Set current text alignment for legend item value content                                                                                | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| itemValueTextBaseline      | Set current text baseline used when drawing legend item value text                                                                      | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| itemValueFill              | Legend item value text color                                                                                                             | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| itemValueFillOpacity       | Legend item value text color opacity                                                                                                     | number \| (datum, index, data) => number                     | `0.65`        |          |
| itemValueStroke            | Legend item value text stroke color                                                                                                      | string \| (datum, index, data) => string                     | -             |          |
| itemValueStrokeOpacity     | Legend item value text stroke color opacity                                                                                              | number \| (datum, index, data) => number                     | -             |          |
| itemValueLineWidth         | Legend item value text stroke width                                                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemValueLineDash          | Legend item value text stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| itemValueOpacity           | Legend item value text overall opacity                                                                                                   | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowColor       | Legend item value text shadow color                                                                                                      | string \| (datum, index, data) => string                     | -             |          |
| itemValueShadowBlur        | Legend item value text shadow Gaussian blur coefficient                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowOffsetX     | Set horizontal distance of shadow from legend item value text                                                                           | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowOffsetY     | Set vertical distance of shadow from legend item value text                                                                             | number \| (datum, index, data) => number                     | -             |          |
| itemValueCursor            | Legend item value cursor style. Same as CSS cursor style.                                                                               | string \| (datum, index, data) => string                     | `default`     |          |

In the Legend component, when configuring legend item values, it's not configured as an object, but with the `itemValue` prefix plus property:

```js
({
  legend: {
    color: {
      itemValueText: 'Legend Item Value',
      itemValueFontSize: 16,
      itemValueFontFamily: 'sans-serif',
      itemValueFontWeight: 500,
      itemValueLineHeight: 20,
      itemValueTextAlign: 'center',
      itemValueTextBaseline: 'middle',
      itemValueFill: '#000',
      itemValueFillOpacity: 0.9,
      itemValueStroke: '#DAF5EC',
      itemValueStrokeOpacity: 0.9,
      itemValueLineWidth: 2,
      itemValueLineDash: [4, 8],
      itemValueOpacity: 1,
      itemValueShadowColor: '#d3d3d3',
      itemValueShadowBlur: 10,
      itemValueShadowOffsetX: 10,
      itemValueShadowOffsetY: 10,
      itemValueCursor: 'pointer',
    },
  },
});
```

### itemBackground

<description> _LegendItemBackgroundCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item backgrounds. _LegendItemBackgroundCfg_ configuration:

| Property                        | Description                                                                                                                              | Type                                                         | Default Value | Required |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| itemBackgroundRadius            | Legend item background border radius                                                                                                     | number \| (datum, index, data) => number                     | `0`           |          |
| itemBackgroundFill              | Legend item background fill color                                                                                                        | string \| (datum, index, data) => string                     | `transparent` |          |
| itemBackgroundFillOpacity       | Legend item background fill opacity                                                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundStroke            | Legend item background stroke                                                                                                            | string \| (datum, index, data) => string                     | -             |          |
| itemBackgroundStrokeOpacity     | Legend item background stroke opacity                                                                                                    | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundLineWidth         | Legend item background stroke width                                                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundLineDash          | Legend item background stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| itemBackgroundOpacity           | Legend item background overall opacity                                                                                                   | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowColor       | Legend item background shadow color                                                                                                      | string \| (datum, index, data) => string                     | -             |          |
| itemBackgroundShadowBlur        | Legend item background shadow Gaussian blur coefficient                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowOffsetX     | Set horizontal distance of shadow from legend item background                                                                           | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowOffsetY     | Set vertical distance of shadow from legend item background                                                                             | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundCursor            | Legend item background cursor style. Same as CSS cursor style.                                                                          | string \| (datum, index, data) => string                     | `default`     |          |

In the Legend component, when configuring legend item backgrounds, it's not configured as an object, but with the `itemBackground` prefix plus property:

```js
({
  legend: {
    color: {
      itemBackgroundRadius: 50,
      itemBackgroundFill: '#000',
      itemBackgroundFillOpacity: 0.9,
      itemBackgroundStroke: '#DAF5EC',
      itemBackgroundStrokeOpacity: 0.9,
      itemBackgroundLineWidth: 2,
      itemBackgroundLineDash: [4, 8],
      itemBackgroundOpacity: 1,
      itemBackgroundShadowColor: '#d3d3d3',
      itemBackgroundShadowBlur: 10,
      itemBackgroundShadowOffsetX: 10,
      itemBackgroundShadowOffsetY: 10,
      itemBackgroundCursor: 'pointer',
    },
  },
});
```

Next, try combining various properties of `itemMarker`, `itemLabel`, `itemValue`, and `itemBackground` to configure a custom legend:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });
const shapeList = ['bowtie', 'smooth', 'hv', 'rect', 'hollowPoint'];
const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      size: 100,
      itemWidth: 120,
      // itemMarker
      itemMarker: (d, index) => shapeList[index],
      // itemLabel
      itemLabelFill: 'red',
      // itemValue
      itemValueText: (d, index) => data[index]['sold'],
      // itemBackground
      itemBackgroundFill: (d) => d.color,
      itemBackgroundFillOpacity: 0.2,
    },
  },
});

chart.render();
```

### itemWidth

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item width.

### itemSpan

<description> _number|number[]_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure space allocation for legend item marker, label, and value. Default is `[1, 1, 1]`.

### itemSpacing

<description> _number|number[]_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure spacing between legend item marker, label, and value. Default is `[8, 8]`.

### nav

<description> _LegendNavCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend navigator. In grid layout, page capacity = `gridRow` × `gridCol`. If the number of categorical items exceeds this capacity, pagination occurs. In flex layout, page capacity is calculated dynamically, limited by container width and height. When categorical items exceed container height or width, pagination occurs and the navigator component is shown.

💡 **Vertical Layout Legend Pagination Configuration**

For vertical layout legends (`position: 'right'` or `'left'`), since `maxRows` doesn't take effect, it's recommended to enable pagination through the following methods:

```js
legend: {
  color: {
    position: 'right',
    size: 100,               // Limit legend width, trigger pagination
    length: 200,             // Limit legend height, trigger pagination
    navOrientation: 'vertical', // Vertical navigator
    navDefaultPage: 0,       // Default to first page
    navLoop: true,           // Enable loop pagination
  }
}
```

_LegendNavCfg_ configuration:

<img alt="legend-nav" width=300 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QkXFSoUuqGYAAAAAAAAAAAAAemJ7AQ/original"/>

| Property                    | Description                                                                                                                              | Type                                                                       | Default Value | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- | -------- |
| navEffect                   | Page transition effect                                                                                                                   | See [Web Animations API](https://g.antv.antgroup.com/api/animation/waapi) | `linear`      |          |
| navDuration                 | Single page transition animation duration                                                                                                | number                                                                     | `200`         |          |
| navOrientation              | Pagination scroll direction<br>- Horizontal `horizontal`<br>- Vertical `vertical`                                                      | `horizontal` \|`vertical`                                                  | `horizontal`  |          |
| navDefaultPage              | Default page number to display                                                                                                           | number                                                                     | `0`           |          |
| navLoop                     | Whether to enable loop pagination                                                                                                        | boolean                                                                    | false         |          |
| navPageWidth                | Navigator page width                                                                                                                     | number                                                                     | -             |          |
| navPageHeight               | Navigator page height                                                                                                                    | number                                                                     | -             |          |
| navControllerPadding        | Spacing between navigator buttons and page numbers                                                                                       | number \| number[]                                                         | `5`           |          |
| navControllerSpacing        | Spacing between navigator buttons and pages, can configure spacing between navigator and legend                                         | number \| number[]                                                         | `5`           |          |
| navPageNumFontSize          | Navigator page number text size                                                                                                          | number \| (datum, index, data) => number                                   | `12`          |          |
| navPageNumFontFamily        | Navigator page number text font                                                                                                          | string \| (datum, index, data) => string                                   | -             |          |
| navPageNumFontWeight        | Navigator page number font weight                                                                                                        | number \| (datum, index, data) => number                                   | `normal`      |          |
| navPageNumLineHeight        | Navigator page number text line height                                                                                                   | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumTextAlign         | Set current text alignment for navigator page number content                                                                            | `center` \| `end` \| `left` \| `right` \| `start`                          | `start`       |          |
| navPageNumTextBaseline      | Set current text baseline used when drawing navigator page number text                                                                  | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                 | `bottom`      |          |
| navPageNumFill              | Navigator page number text color                                                                                                         | string \| (datum, index, data) => string                                   | `#1D2129`     |          |
| navPageNumFillOpacity       | Navigator page number text color opacity                                                                                                 | number \| (datum, index, data) => number                                   | `0.45`        |          |
| navPageNumStroke            | Navigator page number text stroke color                                                                                                  | string \| (datum, index, data) => string                                   | -             |          |
| navPageNumStrokeOpacity     | Navigator page number text stroke color opacity                                                                                          | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumLineWidth         | Navigator page number text stroke width                                                                                                  | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumLineDash          | Navigator page number text stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number]               | -             |          |
| navPageNumOpacity           | Navigator page number text overall opacity                                                                                               | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumShadowColor       | Navigator page number text shadow color                                                                                                  | string \| (datum, index, data) => string                                   | -             |          |
| navPageNumShadowBlur        | Navigator page number text shadow Gaussian blur coefficient                                                                              | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumShadowOffsetX     | Set horizontal distance of shadow from navigator page number text                                                                       | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumShadowOffsetY     | Set vertical distance of shadow from navigator page number text                                                                         | number \| (datum, index, data) => number                                   | -             |          |
| navPageNumCursor            | Navigator page number cursor style. Same as CSS cursor style.                                                                           | string \| (datum, index, data) => string                                   | `default`     |          |
| navButtonSize               | Navigator button size                                                                                                                    | number \| (datum, index, data) => number                                   | -             |          |
| navButtonFill               | Navigator button fill color                                                                                                              | string \| (datum, index, data) => string                                   | `#1D2129`     |          |
| navButtonFillOpacity        | Navigator button fill opacity                                                                                                            | number \| (datum, index, data) => number                                   | `0.65`        |          |
| navButtonStroke             | Navigator button stroke                                                                                                                  | string \| (datum, index, data) => string                                   | -             |          |
| navButtonStrokeOpacity      | Navigator button stroke opacity                                                                                                          | number \| (datum, index, data) => number                                   | -             |          |
| navButtonLineWidth          | Navigator button stroke width                                                                                                            | number \| (datum, index, data) => number                                   | -             |          |
| navButtonLineDash           | Navigator button stroke dash configuration. First value is dash segment length, second is gap length. Setting lineDash to [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number]               | -             |          |
| navButtonOpacity            | Navigator button overall opacity                                                                                                         | number \| (datum, index, data) => number                                   | -             |          |
| navButtonShadowColor        | Navigator button shadow color                                                                                                            | string \| (datum, index, data) => string                                   | -             |          |
| navButtonShadowBlur         | Navigator button shadow Gaussian blur coefficient                                                                                        | number \| (datum, index, data) => number                                   | -             |          |
| navButtonShadowOffsetX      | Set horizontal distance of shadow from navigator button                                                                                 | number \| (datum, index, data) => number                                   | -             |          |
| navButtonShadowOffsetY      | Set vertical distance of shadow from navigator button                                                                                   | number \| (datum, index, data) => number                                   | -             |          |
| navButtonCursor             | Navigator button cursor style. Same as CSS cursor style.                                                                                | string \| (datum, index, data) => string                                   | `default`     |          |
| navFormatter                | Page number text formatter                                                                                                               | (current: number, total: number) => string                                 | -             |          |

In the Legend component, when configuring navigator properties, it's not configured as an object, but with the `nav` prefix plus property:

```js
({
  legend: {
    color: {
      navEffect: 'cubic-bezier',
      navDuration: 400,
      navOrientation: 'vertical',
      navDefaultPage: 1,
      navLoop: true,
      navPageWidth: 10,
      navPageHeight: 10,
      navControllerPadding: 10,
      navControllerSpacing: 10,

      // Configure navPageNum drawing properties
      navPageNumFontSize: 16,
      navPageNumFontFamily: 'sans-serif',
      navPageNumFontWeight: 500,
      navPageNumLineHeight: 20,
      navPageNumTextAlign: 'center',
      navPageNumTextBaseline: 'middle',
      navPageNumFill: '#000',
      navPageNumFillOpacity: 0.9,
      navPageNumStroke: '#DAF5EC',
      navPageNumStrokeOpacity: 0.9,
      navPageNumLineWidth: 2,
      navPageNumLineDash: [4, 8],
      navPageNumOpacity: 1,
      navPageNumShadowColor: '#d3d3d3',
      navPageNumShadowBlur: 10,
      navPageNumShadowOffsetX: 10,
      navPageNumShadowOffsetY: 10,
      navPageNumCursor: 'pointer',

      // Configure navButton drawing properties
      navButtonFill: '#000',
      navButtonFillOpacity: 0.9,
      navButtonStroke: '#DAF5EC',
      navButtonStrokeOpacity: 0.9,
      navButtonLineWidth: 2,
      navButtonLineDash: [4, 8],
      navButtonOpacity: 1,
      navButtonShadowColor: '#d3d3d3',
      navButtonShadowBlur: 10,
      navButtonShadowOffsetX: 10,
      navButtonShadowOffsetY: 10,
      navButtonCursor: 'pointer',
    },
  },
});
```

Try it:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      itemWidth: 160,
      navEffect: 'cubic-bezier',
      navDuration: 400,
      navOrientation: 'vertical',
      navDefaultPage: 2,
      navLoop: true,

      // Configure navPageNum drawing properties
      navPageNumFontSize: 16,
      navPageNumFontFamily: 'sans-serif',
      navPageNumFontWeight: 500,
      navPageNumLineHeight: 20,
      navPageNumTextAlign: 'center',
      navPageNumTextBaseline: 'middle',
      navPageNumFill: '#2989FF',
      navPageNumFillOpacity: 0.9,
      navPageNumStroke: '#DAF5EC',
      navPageNumStrokeOpacity: 0.9,
      navPageNumLineWidth: 2,
      navPageNumLineDash: [4, 8],
      navPageNumOpacity: 1,
      navPageNumShadowColor: '#d3d3d3',
      navPageNumShadowBlur: 10,
      navPageNumShadowOffsetX: 10,
      navPageNumShadowOffsetY: 10,
      navPageNumCursor: 'pointer',

      // Configure navButton drawing properties
      navButtonFill: '#2989FF',
      navButtonFillOpacity: 0.7,
      navButtonStroke: '#DAF5EC',
      navButtonStrokeOpacity: 0.9,
      navButtonLineWidth: 2,
      navButtonLineDash: [4, 8],
      navButtonOpacity: 0.9,
      navButtonShadowColor: '#d3d3d3',
      navButtonShadowBlur: 10,
      navButtonShadowOffsetX: 10,
      navButtonShadowOffsetY: 10,
      navButtonCursor: 'pointer',

      navFormatter: (current, total) => `Page ${current}/Total ${total}`,
    },
  },
});

chart.render();
```

### poptip

<description> _LegendPoptipCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure the tooltip information for legend items, which is generally used when the legend is too long to be fully displayed.

| Property | Description | Type  | Default Value | Required |
| -------------- | -------------- | -------------- | -------------- | -------------- |
| render                   | Custom rendering content is available, and HTML characters are supported.      |   `string` \| `() => string`   | - | - |
| position                 | The position of the Poptip box can be overridden through CSS styles.   | `top left right bottom top-left top-right bottom-left bottom-right left-top left-bottom right-top right-bottom` | -        |   -   |
| offset                   | Offset    | [number, number] | [0, 20]         |   -   |
| follow                   | Whether to follow the mouse. When set to true, the position setting will be ignored. | boolean |   -      |   -   |
| domStyles                | Container Styles   | object |   -      |   -   |

The default configuration of domStyles is as follows:

```ts
{
  domStyles: {
    '.component-poptip': {
      opacity: '1',
      padding: '8px 12px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    '.component-poptip-arrow': {
      display: 'none',
    },
    '.component-poptip-text': {
      color: '#000',
      lineHeight: '20px',
    },
  },
}
```

### color

<description> _string[] | [d3-interpolate](https://github.com/d3/d3-interpolate)_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure color band colors for continuous legend. When it's an array, colors are taken sequentially.

### block

<description> _boolean_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Whether continuous legend displays by intervals. Default is false.

### type

<description> _size | color_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure type of continuous legend. Default is `color`.

Combining `block` and `type` properties can configure different styles of continuous legends. Continuous data legends have 4 styles:

- Continuous representation `Default`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ds9pTqbi4OAAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Range representation `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kpDRTJVgkaEAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Size representation `type='size'`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uHJYTbVSebgAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Size, range representation `type='size'` `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MahwS6sQocoAAAAAAAAAAAAADmJ7AQ/original" width="300" />

## Events

Legend component exposes some special events to get component interaction information.

| Event Type                                            | Description                                          | Type                                             |
| ----------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| click <Badge type="success">Categorical Legend</Badge>       | Triggered when clicking legend item                 | `(item:Selection)=>void`                         |
| mouseenter <Badge type="success">Categorical Legend</Badge>  | Triggered when mouse enters legend item             | `(item: Selection)=>void`                        |
| mouseleave <Badge type="success">Categorical Legend</Badge>  | Triggered when mouse leaves legend item             | `(item:Selection)=>void`                         |
| valuechange <Badge type="warning">Continuous Legend</Badge> | Triggered when sliding window range changes         | `(range: [number, number])=>void`                |
| indicate <Badge type="warning">Continuous Legend</Badge>    | Triggered when indicator value changes              | `(value: number, range: [number, number])=>void` |

Component appears only after chart rendering, so component events should be mounted after `afterrender`. Here's an example:

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.component')
    .addEventListener('valuechange', (range) => {});
});
```

## Examples

### Default Display of Partial Legend Items on First Render

Currently there's no built-in API, you need to manually trigger the `legendFilter` interaction to achieve this.

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();

chart.on(ChartEvent.AFTER_RENDER, () => {
  chart.emit('legend:filter', {
    data: { channel: 'color', values: ['Sports', 'Strategy', 'Action'] },
  });
});
```

You can set `animate: false` to avoid triggering update animations, but there will still be flickering. This will be handled internally through configuration options in the future to achieve better filtering effects.

### Vertical Layout Legend Pagination

When legend position is `right` or `left`, since `maxRows` doesn't take effect, you need to control legend height through the `length` property to achieve pagination.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
  width: 600,
});

// Create data with multiple legend items
const data = [
  { category: 'Category A', value: 40 },
  { category: 'Category B', value: 35 },
  { category: 'Category C', value: 30 },
  { category: 'Category D', value: 25 },
  { category: 'Category E', value: 20 },
  { category: 'Category F', value: 18 },
  { category: 'Category G', value: 15 },
  { category: 'Category H', value: 12 },
  { category: 'Category I', value: 10 },
  { category: 'Category J', value: 8 },
  { category: 'Category K', value: 6 },
  { category: 'Category L', value: 4 },
];

chart.options({
  type: 'interval',
  data,
  encode: { x: 'category', y: 'value', color: 'category' },
  legend: {
    color: {
      position: 'right',
      length: 150, // Limit legend height to trigger pagination
      size: 120, // Control legend width
      navOrientation: 'vertical', // Vertical pagination
      navDefaultPage: 0, // Default to first page
      navLoop: true, // Enable loop navigation
      navButtonFill: '#1890ff', // Pagination button color
      navPageNumFill: '#1890ff', // Page number color
      navFormatter: (current, total) => `${current + 1}/${total}`, // Page number format
    },
  },
});

chart.render();
```

### Custom Legend Item Marker (itemMarker)

In actual development, the built-in legend item markers may not meet your requirements. Don't worry, G2 provides powerful customization features.

#### Custom Symbol

Each symbol can be customized, mainly in three steps:

- Define symbol path.
- Register symbol.
- Use symbol.

First, let's see how to define a symbol path. A symbol path is a function that takes the starting point coordinates x, y and drawing radius, and returns a path.

```js
import { type SymbolFactor } from '@antv/g2';

const triangle: SymbolFactor = (x, y, r) => {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y + diffY],
    ['L', x, y - diffY],
    ['L', x + r, y + diffY],
    ['Z'],
  ];
};
triangle.style = ['fill'];
```

Next is registering the symbol, by calling `G2.register('symbol.${symbol}', Symbol)`. Where `symbol` is the symbol name and `Symbol` is the defined symbol path. For example, registering a triangle symbol:

```js
import { register } from '@antv/g2';

register('symbol.customTriangle', triangle);
```

Finally, use the symbol:

```js
legend: {
  color: {
    itemMarker: 'customTriangle';
  }
}
```

#### Using Images

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const logo = [
  [
    'TikTok',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8IXHQLvx9QkAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Kuaishou',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*swueRrrKvbcAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Xiaomi',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*79G3TIt3mBoAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'WeChat',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_ELBTJLp0dQAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Keep',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JzbKRpFhR14AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Chrome',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xLnYTaZfdh8AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'QQ',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AbGNTpA5JLwAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Youku',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*UL6lS4jw9lUAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Baidu Maps',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I6nrTITAxcoAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Tencent Video',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zwVvT5OFnuYAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Bilibili',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6jkAQayTiMMAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Word',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*FbkXT6K6mVEAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Excel',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CKb-R6ZAFpYAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'PowerPoint',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K7-FT4RYRqIAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Tencent Meeting',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xbPXR7snu44AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'NetEase Cloud Music',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*upKlRJ9QB4cAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Safari',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kjDHRbiW734AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Maps',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tl-2QIB8LKIAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Docker',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iJ4dS49yrJ4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'VSCode',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rR6nRInEcz4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Baidu Netdisk',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*futaTbIAkG4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Evernote',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Skh1S4BfL9oAAAAAAAAAAAAADmJ7AQ/original',
  ],
];

chart
  .interval()
  .data(logo)
  .encode('x', (d) => d[0])
  .encode('y', () => Math.random())
  .encode('color', (d) => d[1])
  .scale('y', { nice: true })
  .legend({
    color: {
      itemMarker: (_, index) => () => {
        const { document } = chart.getContext().canvas;
        const image = document.createElement('image', {
          style: {
            width: 20,
            height: 20,
            transform: `translate(-10, -10)`,
            src: logo[index][1],
          },
        });
        return image;
      },
      itemMarkerSize: 40,
      itemLabelText: (_, index) => logo[index][0],
      maxRows: 1,
    },
  })
  .tooltip(false);

chart.render();
```

### Custom Legend

G2's built-in legends are drawn with canvas or svg. If you want to render legends with HTML, you can customize legends by following these steps:

- Turn off built-in legends and render the chart.
- Wait for chart rendering to complete, then render HTML legend based on scale data.
- Add interactions (if needed).

First, turn off built-in legends and render the chart.

```js
chart.options({ legend: false });
```

Then wait for chart rendering to complete and call `legendColor` to render HTML legend:

```js
chart.render().then(legendColor);
```

In `legendColor`, we first need to draw the legend. The following example draws the legend and adds it in front of the canvas:

```js
function legendColor(chart) {
  const node = chart.getContainer();
  const legend = document.createElement('div');
  node.insertBefore(legend, node.childNodes[0]);

  // ...
}
```

After drawing the legend, we need to draw legend items. This data comes from the corresponding channel's scale: `chart.getScale().color`, and get corresponding names and values through the scale's domain and range.

```js
function legendColor(chart) {
  // ...
  const scale = chart.getScale().color;
  const { domain } = scale.getOptions();
  const items = domain.map(() => {});
  // ...
}
```

After drawing legend items, we should add interactions to each legend item through `item.onclick`, collect currently selected values, and add Filter transforms to the chart declaration based on these values, then re-render the chart. The complete implementation is as follows:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Add legend
function legendColor(chart) {
  // Create Legend and mount legend
  const node = chart.getContainer();
  const legend = document.createElement('div');
  legend.style.display = 'flex';
  node.insertBefore(legend, node.childNodes[0]);

  // Create and mount Items
  const { color: scale } = chart.getScale();
  const { domain } = scale.getOptions();
  const items = domain.map((value) => {
    const item = document.createElement('div');
    const color = scale.map(value);
    item.style.marginLeft = '1em';
    item.innerHTML = `
      <span style="
        background-color:${color};
        display:inline-block;
        width:10px;
        height:10px;"
      ></span>
      <span>${value}</span>
      `;
    return item;
  });
  items.forEach((d) => legend.append(d));

  // Listen to events
  const selectedValues = [...domain];
  const options = chart.options();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const value = domain[i];
    item.style.cursor = 'pointer';
    item.onclick = () => {
      const index = selectedValues.indexOf(value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
        item.style.opacity = 0.5;
      } else {
        selectedValues.push(value);
        item.style.opacity = 1;
      }
      changeColor(selectedValues);
    };
  }

  // Re-render view
  function changeColor(value) {
    const { transform = [] } = options;
    const newTransform = [{ type: 'filter', color: { value } }, ...transform];
    chart.options({
      ...options,
      transform: newTransform, // Specify new transform
      scale: { color: { domain } },
    });
    chart.render(); // Re-render chart
  }
}

// Draw chart
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
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
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: false,
});

chart.render().then(legendColor);
```

### How to Display Full Content on Hover for Long Legend Text

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.options({
  type: 'interval',
  data: [
    { category: 'This is a very long category name A that exceeds the display range', value: 40 },
    { category: 'This is a very long category name B that exceeds the display range', value: 32 },
    { category: 'This is a very long category name C that exceeds the display range', value: 28 },
  ],
  encode: { x: 'category', y: 'value', color: 'category' },
  coordinate: {
    transform: [
      {
        type: 'transpose',
      },
    ],
  },
  legend: {
    color: {
      itemWidth: 120, // Limit width to trigger poptip
      poptip: {
        render: (item) => `Full name: ${item.label}
        `,
        position: 'top',
        offset: [0, 20],
        domStyles: {
          '.component-poptip': {
            background: 'rgb(114, 128, 191) ',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            fontSize: '14px',
            lineHeight: '1.5',
            maxWidth: '280px',
            zIndex: '1000',
          },
          '.component-poptip-arrow': {
            display: 'block',
            borderTopColor: '#667eea',
          },
          '.component-poptip-text': {
            color: '#fff',
            lineHeight: '1.5',
          },
        },
      },
    },
  },
});

chart.render();
```
