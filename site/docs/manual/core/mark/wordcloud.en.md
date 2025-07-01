---
title: wordCloud
order: 27
---

## Overview

`wordCloud` is a specialized tool for generating word cloud visualizations. Word clouds are a visual representation that intuitively displays the frequency of keywords in text data through words of different sizes, colors, and positions to reflect the importance or weight of words.

When using the `wordCloud` component, users can easily transform text data into visual word clouds. It supports highly customizable configuration options, including word size ranges, color mapping, rotation angles, and layout algorithms, thereby meeting diverse visualization needs. Additionally, `wordCloud` can seamlessly integrate with other G2 features, such as data filtering, interactive event binding, etc., further enhancing user experience.

Whether used to display trending topics on social media, analyze user comment sentiment, or present keyword distribution, `wordCloud` can elegantly help users quickly gain insights into trends and patterns behind the data. `wordCloud` is not only simple to use but also delivers excellent performance, making it an ideal choice in the field of data visualization.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud', // Specify chart type as word cloud
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  layout: {
    spiral: 'rectangular', // Word cloud layout mode: rectangular spiral layout
  },
  encode: { color: 'text' }, // Map data field `text` to word cloud color
  legend: false,
  axis: false,
  tooltip: false,
});

chart.render();
```

For more examples, please visit the [Chart Examples - Text](/en/examples#general-text) page.

## Configuration

| Property | Description                                                                                                                                                    | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure visual channels for `wordCloud` mark, including `x`, `y`, `color`, `size`, etc., to specify relationships between visual element properties and data | [encode](#encode) | -       | ✓        |
| labels   | Configure custom node data labels for `wordCloud`                                                                                                              | label[]           | `[]`    |          |
| layout   | Configure `wordCloud` layout, including `padding`, `rotate`, etc.                                                                                              | [layout](#style)  | -       |          |
| padding  | Configure margin of `wordCloud` container                                                                                                                      | number            | `0`     |          |
| scale    | Configure graphic scaling for `wordCloud` mark, including `x`, `y`, `series`, `size`, etc.                                                                     | [scale](#scale)   | -       |          |
| style    | Configure `wordCloud` graphic style                                                                                                                            | [style](#style)   | -       |          |

### encode

Configure visual channels for `wordCloud` mark, an important configuration that defines the mapping relationship between data fields and visual properties, determining how data is transformed into visual representation.

| Property | Description                                                                                                          | Type                             | Default  | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------- | -------- |
| text     | Bind the `text` property channel of `wordCloud` mark                                                                 | [encode](/en/manual/core/encode) | 'text'   |          |
| rotate   | Bind the `rotate` property channel of `wordCloud` mark, used to map data fields to font rotation of graphic elements | [encode](/en/manual/core/encode) | 'rotate' |          |
| fontSize | Bind the `fontSize` property channel of `wordCloud` mark, used to map data fields to font size of graphic elements   | [encode](/en/manual/core/encode) | 'size'   |          |
| color    | Bind the `color` property channel of `wordCloud` mark, mapping data fields to color channel                          | [encode](/en/manual/core/encode) | -        |          |

For more `encode` configurations, please visit the [encode](/en/manual/core/encode) introduction page.

### scale

`scale` is used to define how data maps to visual properties (such as color, size, shape, etc.). In the context of `cell` usage, the common role of scale is to provide mapping rules for each visual channel (such as color, size, position, etc.), enabling data points to be accurately represented.

| Property | Description                                                     | Type                                                    | Default             | Required |
| -------- | --------------------------------------------------------------- | ------------------------------------------------------- | ------------------- | -------- |
| x        | Define mapping rules from data fields to X-axis visual position | Record<string, [scale](/en/manual/core/scale/overview)> | `{ range: [0, 1] }` |          |
| y        | Define mapping rules from data fields to Y-axis visual position | Record<string, [scale](/en/manual/core/scale/overview)> | `{ range: [0, 1] }` |          |

For more `scale` configurations, please visit the [scale](/en/manual/core/scale/overview) introduction page.

### padding

Configure margins of `wordCloud` container, you can configure margins in different directions through `padding{Position}`

```
type Position = 'Top' | 'Bottom' | 'left' | 'right';
```

Comparison with `padding` configuration in layout

| Property              | Description                                                                      | Type                            | Example                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| option.padding        | Configure margin of `wordCloud` container                                        | number                          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qunnQK7EIGUAAAAAAAAAAAAAemJ7AQ/original"></img> |
| option.layout.padding | Set spacing between words in pixels, can be a specific value or dynamic function | number \| (word: any) => number | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-tAsSJGr0ngAAAAAAAAAAAAAemJ7AQ/original"></img> |

### layout

| Property     | Description                                                                                                                      | Type                                                                                                               | Default                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| font         | Set font style, can be string or function, function returns font based on word, modifies d3 word cloud configuration             | string \| (word: any) => string                                                                                    | 'Impact'                                 |
| fontSize     | Set font size, can be specific value, range [min, max] or function, modifies d3 word cloud configuration                         | number \| [number, number] \| (word: any) => number                                                                | -                                        |
| imageMask    | Set image as mask for word layout, can be HTML image element or image path string                                                | 'HTMLImageElement \| string                                                                                        | -                                        |
| on           | Configure event listener functions, can listen to layout completion (end) or word update (word)                                  | ((type: 'end', details?: { cloud; words; bounds }) => void) \| ((type: 'word', details?: { cloud; word }) => void) | -                                        |
| padding      | Set spacing between words in pixels, can be specific value or dynamic function                                                   | number \| (word: any) => number                                                                                    | `2`                                      |
| rotate       | Set rotation angle of words, can be specific value or dynamic function                                                           | number \| word => number                                                                                           | `() => (~~(Math.random() * 6) - 3) * 30` |
| random       | Set random number generator, can be specific value or function                                                                   | number \| (word => number)                                                                                         | -                                        |
| size         | Set rectangular width and height of layout, format is [width, height]                                                            | [number, number]                                                                                                   | `[20, 60]`                               |
| spiral       | Set word arrangement mode, can choose "archimedean" or "rectangular" built-in spiral types, or implement custom through function | 'archimedean' \| 'rectangular'                                                                                     | -                                        |
| text         | Set word text accessor function, used to return word text based on word data                                                     | (word: any) => string                                                                                              | `(d) => d.text`                          |
| timeInterval | Set time interval of layout algorithm, controls runtime                                                                          | number                                                                                                             | -                                        |

**spiral**

`spiral` is a parameter that controls the word cloud layout algorithm, determining how words are arranged on the canvas and their path patterns. By adjusting spiral, you can optimize the visual effect, layout density, and performance of the word cloud.

| Parameter Value | Description                                                                                             | Use Case                                           |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| archimedean     | Archimedean spiral (default), words arrange from center outward in spiral path, more compact layout.    | General scenarios, pursuing natural compact layout |
| rectangular     | Rectangular spiral, words arrange in rectangular path, faster computation but relatively sparse layout. | Optimizing performance when data volume is large   |

```js | ob {  inject: true, pin: false }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const spiralMap = [
  {
    label: 'Archimedean Spiral',
    spiral: 'archimedean',
  },
  {
    label: 'Rectangular Spiral',
    spiral: 'rectangular',
  },
];

chart.options({
  type: 'wordCloud',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  layout: {
    spiral: 'rectangular',
  },
  encode: { color: 'text' },
});

const handleSetSpiral = (spiral) => {
  // Set selected coordinate system
  chart.options({
    layout: { spiral },
  });
  chart.render(); // Re-render chart
};

// layout-spiral selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Choose spiral ';
const selector = document.createElement('select');
selector.innerHTML = spiralMap.map(
  (spiral, index) =>
    `<option value="${spiral.spiral}" ${index === 0 ? 'selected' : ''}>${
      spiral.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetSpiral(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

**imageMask**

`imageMask` is a key configuration item for controlling word cloud shape. Its function is to limit the word cloud layout within the contour range of a specified image mask, thereby generating word cloud effects that match the image shape.

`imageMask` receives a mask image, and the WordCloud layout algorithm analyzes the pixel information of the imageMask image, treating non-transparent areas of the image as areas where words can be placed, while transparent areas prohibit word placement. Words dynamically adjust their size and position within non-transparent areas based on weight (such as word frequency).

Notes:

- Image quality: Mask images should typically be monochrome (black and white) images. Generally, word clouds define shapes based on non-white areas.
- Image loading: When using image masks, ensure that image resources are fully loaded, otherwise rendering issues may occur.
- Performance impact: Complex shapes (such as high-resolution images) may affect word cloud construction speed.

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  layout: {
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 12,
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  },
  encode: { color: 'name', text: 'name' },
  legend: false,
});

chart.render();
```

### style

Composite graphic marks need to distinguish graphic configurations through different prefixes.

| Property      | Description                                                                                                                                                                   | Type                                                                        | Default   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- |
| fontStyle     | Set text style, calls G drawing for rendering                                                                                                                                 | FontStyle \| (datum, index, data, column) => FontStyle                      | 'normal'  |
| fontSize      | Set text font size, calls G drawing for rendering                                                                                                                             | number \| (datum, index, data, column) => number                            | -         |
| fontWeight    | Set text font weight, calls G drawing for rendering                                                                                                                           | FontWeight \| number \| (datum, index, data, column) => number \|FontWeight | 'normal'  |
| fill          | Fill color of graphic                                                                                                                                                         | number \| (datum, index, data, column) => string                            | -         |
| fillOpacity   | Fill opacity of graphic                                                                                                                                                       | number \| (datum, index, data, column) => number                            | -         |
| stroke        | Stroke of graphic                                                                                                                                                             | number \| (datum, index, data, column) => string                            | -         |
| strokeOpacity | Stroke opacity                                                                                                                                                                | number \| (datum, index, data, column) => number                            | -         |
| text          | Text content                                                                                                                                                                  | number \| (datum, index, data, column) => string                            | -         |
| textAlign     | Set text alignment                                                                                                                                                            | TextAlign \| (datum, index, data, column) => TextAlign                      | 'center'  |
| textBaseline  | Set text baseline position                                                                                                                                                    | TextBaseline \| (datum, index, data, column) => TextBaseline                | 'middle'  |
| lineWidth     | Width of graphic stroke                                                                                                                                                       | number \| (datum, index, data, column) => number                            | -         |
| lineDash      | Dashed line configuration for stroke, first value is length of each dash segment, second value is distance between segments. Setting lineDash to [0, 0] results in no stroke. | [number,number] \|(datum, index, data, column) => [number, number]          | -         |
| opacity       | Overall opacity of graphic                                                                                                                                                    | number \| (datum, index, data, column) => number                            | -         |
| shadowColor   | Shadow color of graphic                                                                                                                                                       | number \| (datum, index, data, column) => string                            | -         |
| shadowBlur    | Gaussian blur coefficient of graphic shadow                                                                                                                                   | number \| (datum, index, data, column) => number                            | -         |
| shadowOffsetX | Set horizontal distance of shadow from graphic                                                                                                                                | number \| (datum, index, data, column) => number                            | -         |
| shadowOffsetY | Set vertical distance of shadow from graphic                                                                                                                                  | number \| (datum, index, data, column) => number                            | -         |
| cursor        | Mouse style. Same as CSS mouse style, default 'default'.                                                                                                                      | number \| (datum, index, data, column) => string                            | 'default' |

```js
type FontStyle = 'normal' | 'italic' | 'oblique';

type FontWeight = 'normal' | 'bold' | 'lighter';

type TextAlign = 'left' | 'center' | 'right';

type TextBaseline = 'top' | 'middle' | 'bottom';
```

Try it out:

```js | ob {. inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingTop: 40,
});

chart
  .wordCloud()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  })
  .layout({
    spiral: 'rectangular',
    fontSize: [20, 100],
  })
  .encode('color', 'text');

chart.render();

```
