---
title: Title
order: 7
---

## Overview

In G2, **Title** is used to specify the title content of the chart, which can be used to display summary information about the chart in one sentence. Chart titles are commonly used components, consisting of a main title and a subtitle, both displayed as text. The style of the chart title can be customized by adjusting the text styles.

### Usage

First, pass a `boolean` to set whether to display the chart title. Chart titles are hidden by default.

```js
({
  type: 'interval',
  title: false; // Hide chart title
})
```

Second, pass _titleOption_ to configure the chart title as a whole.

```js
({
  type: 'interval',
  title: {
    title: 'hello', // Main title text content
    subtitle: 'world', // Subtitle text content
  },
});
```

Titles can also be configured at the View level:

```js
({
  type: 'view',
  title: {
    title: 'hello',
    subtitle: 'world',
  },
});
```

## Getting Started

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  marginTop: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: {
    x: 'letter',
    y: 'frequency',
  },
  title: {
    align: 'center', // Chart title alignment
    size: 28, // Chart title height, default is 36
    spacing: 4, // Spacing between main title and subtitle

    // Title
    title: "I am a title", // Chart title text
    titleFontSize: 28, // Chart main title font size
    titleFontFamily: 'sans-serif', // Chart main title font family
    titleFontWeight: 600, // Chart main title font weight
    titleFill: '#fff', // Chart main title text color
    titleFillOpacity: 1, // Chart main title text opacity
    titleStroke: '#000', // Chart main title text stroke color
    titleLineWidth: 2, // Chart main title text stroke width
    titleStrokeOpacity: 1, // Chart main title text stroke opacity

    // Subtitle
    subtitle: "I am a subtitle", // Chart subtitle text
    subtitleFontSize: 16, // Chart subtitle font size
    subtitleFontFamily: 'Arial', // Chart subtitle font family
    subtitleFontWeight: 300, // Chart subtitle font weight
    subtitleFill: '#2989FF', // Chart subtitle text color
    subtitleFillOpacity: 1, // Chart subtitle text opacity
    subtitleStroke: '#000', // Chart subtitle text stroke color
    subtitleLineWidth: 1, // Chart subtitle text stroke width
    subtitleStrokeOpacity: 0.5, // Chart subtitle text stroke opacity
  },
});

chart.render();
```

The simplest way to set the title is to directly specify a string as the title, which uses default styles and positioning. You can also use complete configuration options for flexible customization.

More options about title, see the API document of [title](/manual/component/title).

```js
// API
chart.interval().title({
  title: 'hello',
  subtitle: 'world',
});
```

```js
// API
chart.title({ title: 'hello', subtitle: 'world' });
```

## Configuration Options

| Property | Description                                      | Type                          | Default Value             |
| -------- | ------------------------------------------------ | ----------------------------- | ------------------------- |
| size     | Height of the chart title                        | `number`                      | `36`                      |
| align    | Chart title alignment                            | `left` \| `center` \| `right` | `left`                    |
| spacing  | Vertical spacing between main title and subtitle | `number`                      | `2`                       |
| title    | Chart title configuration options                | [title](#title)               | See [title](#title)       |
| subtitle | Chart subtitle configuration options             | [subtitle](#subtitle)         | See [subtitle](#subtitle) |

### size

<description> _number_ **optional** </description>

Used to configure the space height of the chart title. Default is `36px`. If configured too small, it may cause overlap between the title and chart graphics.

### align

<description> _string_ **optional** </description>

Used to configure the horizontal alignment of the chart title. Default is `left`. You can choose `left`, `center`, or `right`, representing left-aligned, center-aligned, and right-aligned respectively.

Try it out:

```js | ob
(() => {
  const chart = new G2.Chart({ width: 480, height: 160 });

  const alignList = ['center', 'right', 'left'];
  const alignMap = alignList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

  chart.options({
    data,
    type: 'interval',
    encode: {
      x: (_, idx) => idx,
      y: (d) => d,
    },
    title: {
      align: 'center',
      title: 'This is a chart title.',
      subtitle: 'Displayed are sampled values.',
    },
    axis: false,
  });
  const handleSetAlign = (align) => {
    chart.title({ align });
    chart.render(); // Re-render the chart
  };

  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = 'Select title alignment ';
  const selector = document.createElement('select');
  selector.innerHTML = alignMap.map(
    (align, index) =>
      `<option value="${align.value}" ${index === 0 ? 'selected' : ''}>${
        align.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetAlign(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);
  chart.render();

  return node;
})();
```

### spacing

<description> _number_ **optional** </description>

Used to configure the spacing between the chart main title and subtitle. Default is `2px`. Appropriate spacing can make the chart look more harmonious overall.

### title

The chart title, specifically the main title, can be customized with the following configurations for various title styles.

| Property           | Description             | Type                                             | Default Value |
| ------------------ | ----------------------- | ------------------------------------------------ | ------------- |
| title              | Chart title text        | `number` \| `(datum, index, data) => number`     | -             |
| titleFontSize      | Chart title font size   | `number` \| `(datum, index, data) => number`     | 14            |
| titleFontFamily    | Chart title font family | `string` \| `(datum, index, data) => string`     | sans-serif    |
| titleFontWeight    | Chart title font weight | `string` \| `(datum, index, data) => string`     | normal        |
| titleTextAlign     | Chart title horizontal alignment | `string` \| `(datum, index, data) => string` | center        |
| titleTextBaseline  | Chart title vertical baseline | `string` \| `(datum, index, data) => string` | middle        |
| titleFill          | Chart title fill color  | `string` \| `(datum, index, data) => string`     | #000          |
| titleFillOpacity   | Chart title fill opacity | `number` \| `(datum, index, data) => number`    | 1             |
| titleStroke        | Chart title stroke color | `string` \| `(datum, index, data) => string`    | transparent   |
| titleStrokeOpacity | Chart title stroke opacity | `number` \| `(datum, index, data) => number`  | 1             |
| titleLineHeight    | Chart title line height | `number` \| `(datum, index, data) => number`     | 14            |
| titleLineWidth     | Chart title stroke width | `number` \| `(datum, index, data) => number`    | 0             |
| titleLineDash      | Chart title dash style  | `number[]` \| `(datum, index, data) => number[]` | []            |
| titleOpacity       | Chart title overall opacity | `number` \| `(datum, index, data) => number` | 1             |
| titleShadowColor   | Chart title shadow color | `string` \| `(datum, index, data) => string`    | transparent   |
| titleShadowBlur    | Chart title shadow blur | `number` \| `(datum, index, data) => number`     | 0             |
| titleShadowOffsetX | Chart title shadow X offset | `number` \| `(datum, index, data) => number` | 0             |
| titleShadowOffsetY | Chart title shadow Y offset | `number` \| `(datum, index, data) => number` | 0             |
| titleCursor        | Chart title mouse cursor | `string` \| `(datum, index, data) => string`    | default       |

### subtitle

The chart subtitle, which can be customized with the following configurations for various subtitle styles.

| Property              | Description                   | Type                                             | Default Value |
| --------------------- | ----------------------------- | ------------------------------------------------ | ------------- |
| subtitle              | Chart subtitle text           | `string` \| `(datum, index, data) => string`     | -             |
| subtitleFontSize      | Chart subtitle font size      | `number` \| `(datum, index, data) => number`     | 12            |
| subtitleFontFamily    | Chart subtitle font family    | `string` \| `(datum, index, data) => string`     | sans-serif    |
| subtitleFontWeight    | Chart subtitle font weight    | `string` \| `(datum, index, data) => string`     | normal        |
| subtitleTextAlign     | Chart subtitle horizontal alignment | `string` \| `(datum, index, data) => string` | center        |
| subtitleTextBaseline  | Chart subtitle vertical baseline | `string` \| `(datum, index, data) => string` | middle        |
| subtitleFill          | Chart subtitle fill color     | `string` \| `(datum, index, data) => string`     | #666          |
| subtitleFillOpacity   | Chart subtitle fill opacity   | `number` \| `(datum, index, data) => number`     | 1             |
| subtitleStroke        | Chart subtitle stroke color   | `string` \| `(datum, index, data) => string`     | transparent   |
| subtitleStrokeOpacity | Chart subtitle stroke opacity | `number` \| `(datum, index, data) => number`     | 1             |
| subtitleLineHeight    | Chart subtitle line height    | `number` \| `(datum, index, data) => number`     | 12            |
| subtitleLineWidth     | Chart subtitle stroke width   | `number` \| `(datum, index, data) => number`     | 0             |
| subtitleLineDash      | Chart subtitle dash style     | `number[]` \| `(datum, index, data) => number[]` | []            |
| subtitleOpacity       | Chart subtitle overall opacity | `number` \| `(datum, index, data) => number`    | 1             |
| subtitleShadowColor   | Chart subtitle shadow color   | `string` \| `(datum, index, data) => string`     | transparent   |
| subtitleShadowBlur    | Chart subtitle shadow blur    | `number` \| `(datum, index, data) => number`     | 0             |
| subtitleShadowOffsetX | Chart subtitle shadow X offset | `number` \| `(datum, index, data) => number`    | 0             |
| subtitleShadowOffsetY | Chart subtitle shadow Y offset | `number` \| `(datum, index, data) => number`    | 0             |
| subtitleCursor        | Chart subtitle mouse cursor   | `string` \| `(datum, index, data) => string`     | default       |

Try it out:

<Playground path="component/title/demo/title-style.ts" rid="title-style"></Playground>
