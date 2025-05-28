---
title: Word Cloud
order: 19
screenshot: /screenshots/wordcloud.webp
category: ['text', 'distribution']
similar: ['treemap', 'bubble', 'pack']
---

## Introduction to Word Clouds

A word cloud is a visualization technique that displays text data by adjusting the size, color, and position of words to reflect their importance or frequency within the text. Word clouds convert textual information into intuitive visual representations, enabling users to quickly identify key words and themes in the text.

Word clouds are particularly suitable for analyzing large amounts of text data, such as social media comments, user feedback, article content, and survey reports. Through size comparison of words, users can quickly understand which words are most important or appear most frequently, thereby extracting core information and trends from the text.

Word clouds not only possess practical analytical value but also have strong artistic appeal and visual impact, making them commonly used in presentations, report covers, and data visualization displays.

**Chinese Name**: 词云图

## Components of a Word Cloud

### Basic Word Cloud

A word cloud primarily consists of the following components:

1. **Words**: Key vocabulary from the text, which are the core elements of the word cloud
2. **Font Size**: Usually proportional to word frequency or importance
3. **Color Encoding**: Can be used to distinguish different categories or emphasize importance levels
4. **Layout Algorithm**: Determines the spatial distribution of words
5. **Shape Container**: The overall outline of the word cloud, which can be rectangular, circular, or custom shapes

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated word frequency data
  const data = [
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
  ];

  chart.options({
    type: 'wordCloud',
    data,
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

  return chart.getContainer();
})();
```

### Custom Shape Word Cloud

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated brand keyword data
  const data = [
    { text: 'Innovation', value: 95 },
    { text: 'Quality', value: 88 },
    { text: 'Service', value: 82 },
    { text: 'Professional', value: 78 },
    { text: 'Reliable', value: 75 },
    { text: 'Efficiency', value: 70 },
    { text: 'Team', value: 65 },
    { text: 'Experience', value: 60 },
    { text: 'Technology', value: 58 },
    { text: 'Solution', value: 55 },
    { text: 'Cooperation', value: 52 },
    { text: 'Value', value: 50 },
    { text: 'Leading', value: 48 },
    { text: 'Premium', value: 45 },
    { text: 'Custom', value: 42 },
    { text: 'Support', value: 40 },
    { text: 'Fast', value: 38 },
    { text: 'Secure', value: 35 },
    { text: 'Stable', value: 32 },
    { text: 'Flexible', value: 30 }
  ];

  chart.options({
    type: 'wordCloud',
    data,
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
        palette: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594']
      }
    },
    style: {
      fontFamily: 'Arial, Helvetica',
      fontWeight: (d) => d.value > 60 ? 'bold' : 'normal'
    },
    legend: {
      color: { title: 'Importance Level' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## Use Cases of Word Clouds

### Suitable Scenarios

Example 1: **Text Mining and Keyword Analysis**

Word clouds play an important role in text mining, allowing quick identification of high-frequency words in documents or corpora:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated user comment keyword data
  const data = [
    { text: 'Easy to use', value: 145, sentiment: 'positive' },
    { text: 'Convenient', value: 132, sentiment: 'positive' },
    { text: 'Fast', value: 128, sentiment: 'positive' },
    { text: 'Interface', value: 115, sentiment: 'neutral' },
    { text: 'Function', value: 108, sentiment: 'neutral' },
    { text: 'Experience', value: 95, sentiment: 'positive' },
    { text: 'Stable', value: 88, sentiment: 'positive' },
    { text: 'Lag', value: 75, sentiment: 'negative' },
    { text: 'Support', value: 68, sentiment: 'neutral' },
    { text: 'Price', value: 62, sentiment: 'neutral' },
    { text: 'Recommend', value: 58, sentiment: 'positive' },
    { text: 'Problem', value: 55, sentiment: 'negative' },
    { text: 'Update', value: 52, sentiment: 'neutral' },
    { text: 'Optimize', value: 48, sentiment: 'positive' },
    { text: 'Simple', value: 45, sentiment: 'positive' },
    { text: 'Complex', value: 38, sentiment: 'negative' },
    { text: 'Satisfied', value: 35, sentiment: 'positive' },
    { text: 'Improve', value: 32, sentiment: 'neutral' },
    { text: 'Clear', value: 28, sentiment: 'positive' },
    { text: 'Difficult', value: 25, sentiment: 'negative' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'rectangular',
      fontSize: [14, 50],
      padding: 4
    },
    encode: {
      size: 'value',
      color: 'sentiment'
    },
    scale: {
      color: {
        domain: ['positive', 'neutral', 'negative'],
        palette: ['#52c41a', '#1890ff', '#ff4d4f']
      }
    },
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: (d) => d.value > 100 ? 'bold' : 'normal'
    },
    legend: {
      color: { 
        title: 'Sentiment',
        itemName: {
          formatter: (d) => {
            const map = { positive: 'Positive', neutral: 'Neutral', negative: 'Negative' };
            return map[d] || d;
          }
        }
      }
    },
    title: 'User Feedback Sentiment Analysis'
  });

  chart.render();

  return chart.getContainer();
})();
```

Example 2: **Brand Analysis and Market Research**

Word clouds can help companies understand brand perception and market positioning:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated brand association data
  const data = [
    { text: 'Trustworthy', value: 125, category: 'Brand Image' },
    { text: 'Innovative', value: 118, category: 'Brand Image' },
    { text: 'High Quality', value: 110, category: 'Product Feature' },
    { text: 'Expensive', value: 95, category: 'Price Perception' },
    { text: 'Professional', value: 88, category: 'Service Quality' },
    { text: 'Premium', value: 82, category: 'Brand Position' },
    { text: 'Reliable', value: 78, category: 'Brand Image' },
    { text: 'Customer Service', value: 72, category: 'Service Quality' },
    { text: 'Technology', value: 68, category: 'Product Feature' },
    { text: 'Market Leader', value: 65, category: 'Brand Position' },
    { text: 'User-friendly', value: 62, category: 'Product Feature' },
    { text: 'Global', value: 58, category: 'Brand Position' },
    { text: 'Sustainable', value: 55, category: 'Brand Value' },
    { text: 'Efficient', value: 52, category: 'Product Feature' },
    { text: 'Responsive', value: 48, category: 'Service Quality' },
    { text: 'Modern', value: 45, category: 'Brand Image' },
    { text: 'Competitive', value: 42, category: 'Market Position' },
    { text: 'Customizable', value: 38, category: 'Product Feature' },
    { text: 'Scalable', value: 35, category: 'Product Feature' },
    { text: 'Award-winning', value: 32, category: 'Recognition' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'archimedean',
      fontSize: [12, 48],
      padding: 4
    },
    encode: {
      size: 'value',
      color: 'category'
    },
    scale: {
      color: {
        palette: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96', '#13c2c2', '#fadb14']
      }
    },
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'normal'
    },
    legend: {
      color: { title: 'Attribute Category' }
    },
    title: 'Brand Perception Analysis'
  });

  chart.render();

  return chart.getContainer();
})();
```

Example 3: **Social Media Trend Analysis**

Word clouds effectively display trending topics and discussions on social media platforms:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated social media trending data
  const data = [
    { text: 'AI', value: 165, trend: 'rising' },
    { text: 'Climate Change', value: 142, trend: 'stable' },
    { text: 'Remote Work', value: 128, trend: 'declining' },
    { text: 'Sustainability', value: 115, trend: 'rising' },
    { text: 'Digital Transformation', value: 105, trend: 'stable' },
    { text: 'Mental Health', value: 98, trend: 'rising' },
    { text: 'Cryptocurrency', value: 85, trend: 'declining' },
    { text: 'Education Technology', value: 78, trend: 'stable' },
    { text: 'Healthcare Innovation', value: 72, trend: 'rising' },
    { text: 'Space Exploration', value: 68, trend: 'stable' },
    { text: 'Renewable Energy', value: 65, trend: 'rising' },
    { text: 'Virtual Reality', value: 58, trend: 'declining' },
    { text: 'Food Security', value: 55, trend: 'stable' },
    { text: 'Cybersecurity', value: 52, trend: 'rising' },
    { text: 'Electric Vehicles', value: 48, trend: 'stable' },
    { text: 'Gene Therapy', value: 45, trend: 'rising' },
    { text: 'Smart Cities', value: 42, trend: 'stable' },
    { text: 'Quantum Computing', value: 38, trend: 'rising' },
    { text: 'Social Commerce', value: 35, trend: 'declining' },
    { text: 'Blockchain', value: 32, trend: 'declining' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'rectangular',
      fontSize: [14, 52],
      padding: 5
    },
    encode: {
      size: 'value',
      color: 'trend'
    },
    scale: {
      color: {
        domain: ['rising', 'stable', 'declining'],
        palette: ['#52c41a', '#1890ff', '#ff4d4f']
      }
    },
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: (d) => d.trend === 'rising' ? 'bold' : 'normal'
    },
    legend: {
      color: { 
        title: 'Trend Direction',
        itemName: {
          formatter: (d) => {
            const map = { rising: 'Rising ↗', stable: 'Stable →', declining: 'Declining ↘' };
            return map[d] || d;
          }
        }
      }
    },
    title: 'Social Media Trending Topics'
  });

  chart.render();

  return chart.getContainer();
})();
```

## Extensions of Word Clouds

### Layered Word Cloud

Display keywords in hierarchical layers to show different levels of importance:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated layered keyword data
  const data = [
    { text: 'Product Strategy', value: 120, layer: 'core', importance: 'high' },
    { text: 'User Experience', value: 110, layer: 'core', importance: 'high' },
    { text: 'Market Analysis', value: 105, layer: 'core', importance: 'high' },
    { text: 'Data Analytics', value: 95, layer: 'important', importance: 'medium' },
    { text: 'Design System', value: 88, layer: 'important', importance: 'medium' },
    { text: 'Technology Stack', value: 82, layer: 'important', importance: 'medium' },
    { text: 'Performance', value: 78, layer: 'important', importance: 'medium' },
    { text: 'Security', value: 72, layer: 'important', importance: 'medium' },
    { text: 'Scalability', value: 68, layer: 'important', importance: 'medium' },
    { text: 'Quality Assurance', value: 65, layer: 'important', importance: 'medium' },
    { text: 'Documentation', value: 58, layer: 'support', importance: 'low' },
    { text: 'Testing', value: 55, layer: 'support', importance: 'low' },
    { text: 'Deployment', value: 52, layer: 'support', importance: 'low' },
    { text: 'Team', value: 48, layer: 'support', importance: 'low' },
    { text: 'Process', value: 45, layer: 'support', importance: 'low' },
    { text: 'Budget', value: 42, layer: 'support', importance: 'low' },
    { text: 'Timeline', value: 40, layer: 'support', importance: 'low' },
    { text: 'Resources', value: 38, layer: 'support', importance: 'low' },
    { text: 'Solutions', value: 35, layer: 'support', importance: 'low' },
    { text: 'Standards', value: 32, layer: 'support', importance: 'low' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'archimedean',
      fontSize: [14, 48],
      padding: 4
    },
    encode: {
      size: 'value',
      color: 'layer'
    },
    scale: {
      color: {
        domain: ['core', 'important', 'support'],
        palette: ['#ff4d4f', '#faad14', '#1890ff']
      }
    },
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: (d) => d.importance === 'high' ? 'bold' : 'normal',
      opacity: (d) => {
        const opacityMap = { high: 1, medium: 0.8, low: 0.6 };
        return opacityMap[d.importance];
      }
    },
    legend: {
      color: { 
        title: 'Keyword Layer',
        itemName: {
          formatter: (d) => {
            const map = { core: 'Core Layer', important: 'Important Layer', support: 'Support Layer' };
            return map[d] || d;
          }
        }
      }
    },
    title: 'Product Keyword Layered Word Cloud'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Time Evolution Word Cloud

Show how keywords change over time:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulated time evolution data (showing current time point)
  const timeData = {
    '2020': [
      { text: 'Pandemic', value: 150 },
      { text: 'Remote Work', value: 120 },
      { text: 'Online Education', value: 100 },
      { text: 'Health Code', value: 80 },
      { text: 'Face Mask', value: 75 }
    ],
    '2021': [
      { text: 'Vaccine', value: 140 },
      { text: 'Metaverse', value: 110 },
      { text: 'Carbon Neutral', value: 95 },
      { text: 'Chip Shortage', value: 85 },
      { text: 'Clean Energy', value: 70 }
    ],
    '2022': [
      { text: 'ChatGPT', value: 180 },
      { text: 'AI Art', value: 130 },
      { text: 'NFT', value: 90 },
      { text: 'COVID Treatment', value: 75 },
      { text: 'World Cup', value: 65 }
    ]
  };

  // Currently displaying 2022 data
  const currentData = timeData['2022'].map(item => ({
    ...item,
    year: '2022',
    category: item.value > 100 ? 'hot' : item.value > 80 ? 'warm' : 'normal'
  }));

  chart.options({
    type: 'wordCloud',
    data: currentData,
    layout: {
      spiral: 'rectangular',
      fontSize: [16, 60],
      padding: 5
    },
    encode: {
      size: 'value',
      color: 'category'
    },
    scale: {
      color: {
        domain: ['hot', 'warm', 'normal'],
        palette: ['#ff4d4f', '#faad14', '#1890ff']
      }
    },
    style: {
      fontFamily: 'Arial, Helvetica',
      fontWeight: 'bold'
    },
    legend: {
      color: { 
        title: 'Popularity Level',
        itemName: {
          formatter: (d) => {
            const map = { hot: 'Hot', warm: 'Warm', normal: 'Normal' };
            return map[d] || d;
          }
        }
      }
    },
    title: '2022 Annual Trending Words'
  });

  chart.render();

  return chart.getContainer();
})();
```

## Comparing Word Clouds to Other Charts

### Word Cloud and [Treemap](/en/charts/treemap)

- Word clouds represent data size through font size, while treemaps use rectangle area
- Word clouds are better suited for text data display, treemaps for hierarchical data
- Word clouds have stronger artistic appeal, treemaps provide more accurate numerical expression

### Word Cloud and [Bubble Chart](/en/charts/bubble)

- Word clouds use text as data carriers, bubble charts use circles
- Word clouds focus on keyword identification, bubble charts focus on numerical relationships
- Word clouds have more flexible and diverse layouts, bubble charts have more precise positional encoding

### Word Cloud and [Bar Chart](/en/charts/bar)

- Word clouds convey information through visual impact, bar charts through precise comparison
- Word clouds are suitable for overview and trend identification, bar charts for specific numerical analysis
- Word clouds are more decorative, bar charts more analytical

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code>
