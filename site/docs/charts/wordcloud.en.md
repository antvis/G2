---
title: Word Cloud
order: 19
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6BoRoDMolwAAAAAAAAAAAAADmJ7AQ/fmt.webp'
category: ['comparison']
similar: ['bubble-chart', 'bar']
---

<img alt="wordcloud" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6BoRoDMolwAAAAAAAAAAAAADmJ7AQ/fmt.webp" width=600/>

## Introduction to Word Cloud

A word cloud is a chart type that visually displays text data by adjusting the size, color, and position of words to reflect their importance or frequency in the text. Word clouds transform textual information into intuitive visual representations, enabling users to quickly identify key words and themes in the text.

Word clouds are particularly suitable for analyzing large amounts of text data, such as social media comments, user feedback, article content, survey reports, etc. Through the comparison of word sizes, users can quickly understand which words are most important or appear most frequently, thereby extracting core information and trends from the text.

Word clouds not only have practical analytical value but also possess strong artistic appeal and visual impact, making them commonly used in presentations, report covers, and data visualization displays.

**English Name**: Word Cloud, Tag Cloud

## Components of Word Cloud

<img alt="wordcloud-components" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0xE1T7W2Oq4AAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type           | Word Cloud                                                                        |
| -------------------- | --------------------------------------------------------------------------------- |
| Suitable Data        | List: text field, frequency or weight field                                      |
| Function             | Display frequency distribution and importance of text data                       |
| Data-Visual Mapping  | Text field maps to word content<br>Frequency field maps to font size<br>Optional category field maps to color |
| Suitable Data Volume | 20-200 words, too many will cause layout congestion                             |

**Components:**

1. **Words**: Key vocabulary in the text, the core elements of word cloud
2. **Font Size**: Usually proportional to frequency or importance
3. **Color Encoding**: Can be used to distinguish different categories or emphasize importance
4. **Layout Algorithm**: Determines the spatial distribution of words
5. **Shape Container**: The overall outline of the word cloud, can be rectangular, circular, or custom shapes

## Use Cases for Word Cloud

### Suitable Scenarios

#### 1. Comparing Large Amounts of Text

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  paddingTop: 40,
  layout: { spiral: 'rectangular', fontSize: [20, 100] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  encode: { color: 'text' },
});

chart.render();
```

#### 2. Using Specific Shapes as Boundary Constraints

Word clouds with specific shapes can be created by combining with images.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'wordCloud',
  width: 700,
  height: 400,
  layout: {
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 8,
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

### Unsuitable Scenarios

#### Data with Poor Differentiation

When data has poor differentiation, using word clouds cannot achieve highlighting effects.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  data: [
    // Adjectives with similar frequencies in English literature (based on corpus statistics)
    // These words appear 89-115 times in literary works, with very small differences
    { text: 'beautiful', value: 115 },
    { text: 'wonderful', value: 112 },
    { text: 'excellent', value: 109 },
    { text: 'amazing', value: 106 },
    { text: 'brilliant', value: 103 },
    { text: 'fantastic', value: 100 },
    { text: 'marvelous', value: 97 },
    { text: 'splendid', value: 94 },
    { text: 'gorgeous', value: 91 },
    { text: 'stunning', value: 89 },
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [18, 28], // Small range, visual differences not obvious
    padding: 3,
  },
  encode: {
    color: 'text',
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96'],
    },
  },
  style: {
    fontFamily: 'Arial, sans-serif',
  },
  axis: false,
  legend: false,
  tooltip: {
    items: [
      { field: 'text', name: 'Adjective' },
      { field: 'value', name: 'Literature Frequency' },
    ],
  },
});

chart.render();

// Problem: Word frequency differences are too small (only 26 units), word cloud cannot effectively highlight key words
// All words appear almost the same size visually, losing the core value of word cloud
// Suggestion: Use bar chart, column chart, or table to accurately compare these similar values
```

#### Insufficient Data

When there's too little data, it's difficult to create an attractive word cloud layout. We recommend using [bar charts](/en/charts/bar).

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  data: [
    // Frequency of the word "death" in Shakespeare's four great tragedies (real corpus data)
    { text: 'Hamlet', value: 67 },
    { text: 'Macbeth', value: 45 },
    { text: 'Othello', value: 23 },
    { text: 'King Lear', value: 19 },
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [18, 48],
    padding: 8,
  },
  encode: {
    color: 'text',
  },
  scale: {
    color: {
      palette: ['#722ed1', '#eb2f96', '#fa8c16', '#52c41a'],
    },
  },
  style: {
    fontFamily: 'Times New Roman, serif',
    fontWeight: 'bold',
  },
  axis: false,
  legend: false,
  tooltip: {
    items: [
      { field: 'text', name: 'Play' },
      { field: 'value', name: '"death" Frequency' },
    ],
  },
});

chart.render();
```

Effect using bar chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
  height: 300,
});

chart.options({
  type: 'interval',
  data: [
    { play: 'Hamlet', frequency: 67 },
    { play: 'Macbeth', frequency: 45 },
    { play: 'Othello', frequency: 23 },
    { play: 'King Lear', frequency: 19 },
  ],
  encode: {
    x: 'play',
    y: 'frequency',
    color: 'play',
  },
  scale: {
    color: {
      palette: ['#722ed1', '#eb2f96', '#fa8c16', '#52c41a'],
    },
  },
  axis: {
    x: {
      title: "Shakespeare's Four Great Tragedies",
      labelTransform: 'rotate(45)',
    },
    y: { title: 'Frequency of "death"' },
  },
  legend: false,
});

chart.render();
```

## Comparison with Other Charts

### Word Cloud vs [Bubble Chart](/en/charts/bubble)

- **Word Cloud**: Specifically for text data, uses font size to represent importance
- **Bubble Chart**: For numerical data, uses bubble size to represent values

### Word Cloud vs [Bar Chart](/en/charts/bar)

- **Word Cloud**: Strong visual impact, suitable for overview display
- **Bar Chart**: Precise numerical comparison, suitable for detailed analysis

## Extensions of Word Cloud

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code>
