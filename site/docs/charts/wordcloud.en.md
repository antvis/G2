---
title: Word Cloud
order: 19
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original'
category: ['distribution']
similar: ['treemap', 'bubble', 'pack']
---

<img alt="wordcloud" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original" width=600/>

## Introduction to Word Clouds

A word cloud is a visualization technique that displays text data by adjusting the size, color, and position of words to reflect their importance or frequency within the text. Word clouds convert textual information into intuitive visual representations, enabling users to quickly identify key words and themes in the text.

Word clouds are particularly suitable for analyzing large amounts of text data, such as social media comments, user feedback, article content, and survey reports. Through size comparison of words, users can quickly understand which words are most important or appear most frequently, thereby extracting core information and trends from the text.

Word clouds not only possess practical analytical value but also have strong artistic appeal and visual impact, making them commonly used in presentations, report covers, and data visualization displays.

**Other Names**: Tag Cloud, Text Cloud

## Components of a Word Cloud

<img alt="wordcloud-components" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original" width=600 />

| Chart Type           | Word Cloud                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Suitable Data        | List: Text field, frequency or weight field                                                                     |
| Function             | Display frequency distribution and importance of text data                                                       |
| Data-Graphics Mapping| Text field mapped to word content<br>Frequency field mapped to font size<br>Optional category field mapped to color |
| Suitable Data Volume | 20-200 words, too many will cause layout congestion                                                             |

**Components:**
1. **Words**: Key vocabulary from the text, which are the core elements of the word cloud
2. **Font Size**: Usually proportional to word frequency or importance
3. **Color Encoding**: Can be used to distinguish different categories or emphasize importance levels
4. **Layout Algorithm**: Determines the spatial distribution of words
5. **Shape Container**: The overall outline of the word cloud, which can be rectangular, circular, or custom shapes

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'JavaScript', value: 120, category: 'Programming Language' },
    { text: 'Python', value: 100, category: 'Programming Language' },
    { text: 'React', value: 90, category: 'Frontend Framework' },
    { text: 'Vue', value: 85, category: 'Frontend Framework' },
    { text: 'Node.js', value: 80, category: 'Backend Technology' },
    { text: 'TypeScript', value: 75, category: 'Programming Language' },
    { text: 'CSS', value: 70, category: 'Styling Technology' },
    { text: 'HTML', value: 65, category: 'Markup Language' },
    { text: 'Angular', value: 60, category: 'Frontend Framework' },
    { text: 'Express', value: 55, category: 'Backend Technology' },
    { text: 'MongoDB', value: 50, category: 'Database' },
    { text: 'MySQL', value: 45, category: 'Database' },
    { text: 'Git', value: 40, category: 'Version Control' },
    { text: 'Docker', value: 35, category: 'Container Technology' },
    { text: 'AWS', value: 30, category: 'Cloud Service' }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [12, 60],
    padding: 3
  },
  encode: {
    color: 'category'
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96', '#13c2c2']
    }
  },
  style: {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold'
  },
  legend: {
    color: { title: 'Technology Category' }
  }
});

chart.render();
```

## Use Cases of Word Clouds

### Suitable Use Cases

#### 1. Text Content Analysis

Word clouds are excellent for analyzing text content and quickly identifying keywords and themes:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'User Experience', value: 95 },
    { text: 'Product Design', value: 88 },
    { text: 'Interface Optimization', value: 82 },
    { text: 'Feature Enhancement', value: 78 },
    { text: 'Performance Improvement', value: 75 },
    { text: 'Easy Operation', value: 70 },
    { text: 'Visual Effects', value: 65 },
    { text: 'Response Speed', value: 60 },
    { text: 'Compatibility', value: 55 },
    { text: 'Stability', value: 50 }
  ],
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#91d5ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3']
    }
  },
  style: {
    fontFamily: 'Arial, sans-serif'
  }
});

chart.render();
```

#### 2. Social Media Trending Analysis

Analyzing trending topics and keywords on social media:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'Artificial Intelligence', value: 120 },
    { text: 'Machine Learning', value: 100 },
    { text: 'Deep Learning', value: 90 },
    { text: 'Big Data', value: 85 },
    { text: 'Cloud Computing', value: 80 },
    { text: 'Blockchain', value: 75 },
    { text: 'Internet of Things', value: 70 },
    { text: '5G', value: 65 },
    { text: 'Virtual Reality', value: 60 },
    { text: 'Augmented Reality', value: 55 }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [14, 56],
    padding: 4
  },
  encode: {
    color: 'text'
  },
  scale: {
    color: {
      palette: ['#ff7875', '#ff9c6e', '#ffc069', '#fff566', '#95de64', '#5cdbd3', '#69c0ff', '#85a5ff', '#b37feb', '#ff85c0']
    }
  }
});

chart.render();
```

### Unsuitable Use Cases

#### Too Many Words Causing Layout Chaos

When there are too many words, word clouds become crowded and difficult to read:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Generate large amount of word data
const data = Array.from({ length: 100 }, (_, i) => ({
  text: `Word${i + 1}`,
  value: Math.random() * 50 + 10
}));

chart.options({
  type: 'wordCloud',
  data,
  layout: {
    spiral: 'rectangular',
    fontSize: [8, 24],
    padding: 1
  },
  encode: {
    size: 'value'
  },
  style: {
    fill: '#1890ff'
  }
});

chart.render();
```

**Solution: Data Filtering and Grouping**

Filter data to show only the most important words:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Show only top 20 most important words
const filteredData = Array.from({ length: 20 }, (_, i) => ({
  text: `Important Word ${i + 1}`,
  value: 100 - i * 3
}));

chart.options({
  type: 'wordCloud',
  data: filteredData,
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#52c41a', '#1890ff', '#722ed1']
    }
  }
});

chart.render();
```

## Comparing Word Clouds to Other Charts

### Word Clouds and [Treemaps](/en/charts/treemap)

- **Word Clouds**: Suitable for displaying text data frequency distribution with artistic appeal
- **Treemaps**: Suitable for displaying hierarchical data with high space utilization

### Word Clouds and [Bubble Charts](/en/charts/bubble)

- **Word Clouds**: Specifically for text data, using font size to represent importance
- **Bubble Charts**: For numerical data, using bubble size to represent values

### Word Clouds and [Bar Charts](/en/charts/bar)

- **Word Clouds**: Strong visual impact, suitable for overview display
- **Bar Charts**: Precise value comparison, suitable for detailed analysis

## Extensions

### Shaped Word Clouds

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'Innovation', value: 95 },
    { text: 'Quality', value: 88 },
    { text: 'Service', value: 82 },
    { text: 'Professional', value: 78 },
    { text: 'Reliable', value: 75 },
    { text: 'Efficiency', value: 70 },
    { text: 'Team', value: 65 },
    { text: 'Experience', value: 60 },
    { text: 'Technology', value: 58 },
    { text: 'Solutions', value: 55 }
  ],
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5,
    rotate: [-45, 45]
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#ff7875', '#ffc069', '#95de64', '#5cdbd3', '#69c0ff']
    }
  },
  style: {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold'
  }
});

chart.render();
```

### Multi-Color Word Clouds

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'Data Visualization', value: 100, category: 'Technology' },
    { text: 'User Interface', value: 90, category: 'Design' },
    { text: 'User Experience', value: 85, category: 'Experience' },
    { text: 'Responsive Design', value: 80, category: 'Design' },
    { text: 'Frontend Development', value: 75, category: 'Technology' },
    { text: 'User Research', value: 70, category: 'Experience' },
    { text: 'Prototype Design', value: 65, category: 'Design' },
    { text: 'Performance Optimization', value: 60, category: 'Technology' },
    { text: 'Usability Testing', value: 55, category: 'Experience' },
    { text: 'Visual Design', value: 50, category: 'Design' }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [14, 42],
    padding: 4
  },
  encode: {
    size: 'value',
    color: 'category'
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16']
    }
  },
  legend: {
    color: { title: 'Category' }
  }
});

chart.render();
```

## Similar Charts

<code src="./demos/list-category.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>