---
title: Candlestick Chart
order: 10
screenshot: 'https://os.alipayobjects.com/rmsportal/UCqFUhWcZgDJsDH.png'
category: ['trend', 'time', 'comparison']
similar: ['line', 'area', 'bar']
---

<img alt="candlestick" src="https://os.alipayobjects.com/rmsportal/UCqFUhWcZgDJsDH.png" width=600/>

## Introduction to Candlestick Charts

A candlestick chart, originally known as a candle chart, is also called a yin-yang chart, bar line, red-black line, or candle line, commonly used to display stock trading data. A candlestick chart represents the daily, weekly, or monthly opening price, closing price, highest price, and lowest price of various stocks and their fluctuation changes in a graphical manner.

Candlestick charts provide an intuitive visual representation that can quickly reflect price movements over a certain period, helping analysts and investors judge market trends. Each candlestick contains four key price information points: opening price, closing price, highest price, and lowest price, which together form complete trading information.

The design concept of candlestick charts originated in Japan and was initially used for rice futures trading. Later, it was widely applied in technical analysis across various financial markets.

**Other Names**

K Chart, Candle Chart, OHLC Chart

## Components of a Candlestick Chart

### Single Candlestick Structure

<img alt="candlestick-structure" src="https://t.alipayobjects.com/images/T1FtFkXXXlXXXXXXXX.png" width=600/>

As shown in the figure, a candlestick consists of:

1. **Upper Shadow**: The thin line at the top, representing the price difference between the highest price and the closing price (or opening price)
2. **Body**: The thick line in the middle, representing the price difference between the opening price and closing price
3. **Lower Shadow**: The thin line at the bottom, representing the difference between the opening price (or closing price) and the lowest price

When the closing price is higher than the opening price, indicating an upward trend in stock price, we call this type of candlestick a bullish candle, with the body usually displayed in red or white. Conversely, it's called a bearish candle, displayed with a green or black body.

| Chart Type           | Candlestick Chart                                                                    |
| -------------------- | ----------------------------------------------------------------------------------- |
| Suitable Data        | Time series: one time field, four numerical fields (open, close, high, low prices) |
| Function             | Observe data **trend** changes<br>**Compare** price ranges across different periods |
| Data-to-Graphics Mapping | Time field maps to x-axis<br>Four price fields map to y-axis forming candlestick body and shadows<br>Rise/fall status maps to color |
| Suitable Data Volume | Suitable for medium to long-term data, typically dozens to hundreds of trading periods |

## Use Cases of Candlestick Charts

### Suitable Use Cases

**Use Case 1: Stock Price Analysis**

The most classic application of candlestick charts is stock market analysis, where observing candlestick patterns can help determine the balance of bullish and bearish forces in the market.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
  },
  {
    time: '2015-11-16',
    start: 8.48,
    max: 8.85,
    min: 8.43,
    end: 8.7,
  },
  {
    time: '2015-11-13',
    start: 8.01,
    max: 8.75,
    min: 7.97,
    end: 8.41,
  },
  {
    time: '2015-11-12',
    start: 7.76,
    max: 8.18,
    min: 7.61,
    end: 8.15,
  },
  {
    time: '2015-11-11',
    start: 7.55,
    max: 7.81,
    min: 7.49,
    end: 7.8,
  },
  {
    time: '2015-11-10',
    start: 7.5,
    max: 7.68,
    min: 7.44,
    end: 7.57,
  },
];

chart
  .data(data)
  .encode('x', 'time')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? 'Decline' : trend === 0 ? 'Unchanged' : 'Rise';
  })
  .scale('x', {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  })
  .scale('color', {
    domain: ['Decline', 'Unchanged', 'Rise'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  });

chart
  .link()
  .encode('y', ['min', 'max'])
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: 'Open' },
      { field: 'end', name: 'Close' },
      { field: 'min', name: 'Low' },
      { field: 'max', name: 'High' },
    ],
  });

chart
  .interval()
  .encode('y', ['start', 'end'])
  .style('fillOpacity', 1)
  .style('stroke', (d) => {
    if (d.start === d.end) return '#999999';
  })
  .axis('y', {
    title: 'Price',
  })
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: 'Open' },
      { field: 'end', name: 'Close' },
      { field: 'min', name: 'Low' },
      { field: 'max', name: 'High' },
    ],
  });

chart.render();
```

**Use Case 2: Commodity Futures Analysis**

Candlestick charts are equally suitable for analyzing commodity futures, forex, and other financial derivatives, helping traders identify price patterns and trends.

**Use Case 3: Cryptocurrency Analysis**

In cryptocurrency trading, candlestick charts are the most commonly used technical analysis tool, clearly displaying price volatility.

### Unsuitable Use Cases

**Use Case 1: Non-Time Series Data**

Candlestick charts are specifically designed for time series data. For categorical data comparisons that don't involve time dimensions, [bar charts](/en/charts/bar) or [column charts](/en/charts/bar) should be used instead.

**Use Case 2: Single Value Display**

If you only need to show simple numerical trend changes, [line charts](/en/charts/line) or [area charts](/en/charts/area) would be more concise and clear.

## Extensions of Candlestick Charts

### Candlestick Charts Combined with Volume

Combining candlestick charts with volume bar charts provides a more comprehensive analysis of market behavior.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

// Create containers for candlestick chart
document.getElementById('container').innerHTML = `
  <div id="kChart" style="height: 300px;"></div>
  <div id="volumeChart" style="height: 150px; margin-top: 10px;"></div>
`;

const KChart = new Chart({
  container: 'kChart',
  autoFit: true,
});

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
    volumn: 1810,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
    volumn: 2790,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
    volumn: 3729,
  },
  {
    time: '2015-11-16',
    start: 8.48,
    max: 8.85,
    min: 8.43,
    end: 8.7,
    volumn: 2890,
  },
];

KChart
  .data(data)
  .encode('x', 'time')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? 'Decline' : trend === 0 ? 'Unchanged' : 'Rise';
  })
  .scale('color', {
    domain: ['Decline', 'Unchanged', 'Rise'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  });

KChart.link().encode('y', ['min', 'max']);
KChart.interval().encode('y', ['start', 'end']).style('fillOpacity', 1);

// Volume chart
const VolumeChart = new Chart({
  container: 'volumeChart',
  autoFit: true,
});

VolumeChart
  .data(data)
  .interval()
  .encode('x', 'time')
  .encode('y', 'volumn')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? 'Decline' : trend === 0 ? 'Unchanged' : 'Rise';
  })
  .scale('color', {
    domain: ['Decline', 'Unchanged', 'Rise'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  })
  .axis('y', { title: 'Volume' });

KChart.render();
VolumeChart.render();
```

### Multiple Timeframe Candlesticks

You can switch between different timeframes (daily, weekly, monthly candlesticks) to observe price movements at different levels.

## Comparing Candlestick Charts to Other Charts

### Candlestick Charts, [Line Charts](/en/charts/line), and [Bar Charts](/en/charts/bar)

- Candlestick charts display complete price information (open, close, high, low), suitable for detailed technical analysis
- Line charts only show a single price line (usually closing price), suitable for displaying overall price trend direction
- Bar charts are mainly used for comparing numerical values between different categories, not involving time series

### Candlestick Charts and [Box Plots](/en/charts/boxplot)

- Candlestick charts display price ranges at specific time points, focusing on price trend analysis
- Box plots display statistical distribution characteristics of data, focusing on statistical analysis of data distribution

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
