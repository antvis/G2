---
title: Spiral
order: 18
screenshot: /screenshots/spiral.webp
category: ['comparison', 'time']
similar: ['rose']
---

## Introduction

A spiral chart is a specialized visualization that displays time series data in a spiral format. It starts from a center point and extends outward in a spiral manner, maintaining temporal continuity while achieving compact spatial utilization. Spiral charts are particularly suitable for displaying long-term time series data with periodic patterns, such as daily temperature variations throughout a year or periodic fluctuations in website traffic.

By converting a linear time axis into a spiral shape in polar coordinates, spiral charts not only clearly show temporal trends but also highlight periodic patterns and outliers in the data. This representation offers unique visual advantages when handling large amounts of time series data.

**Chinese Name**: Spiral

## Components

### Basic Spiral Chart

A spiral chart consists of several main components:

1. **Center Point**: The starting position of the spiral, usually representing the beginning of the time series
2. **Spiral Path**: The spiral trajectory extending outward from the center, representing the passage of time
3. **Data Points**: Points distributed along the spiral path, representing values at various time points
4. **Angular Encoding**: Angular position usually corresponds to time periodicity (such as hours in a day, months in a year)
5. **Radial Encoding**: Distance from center usually corresponds to time progression or data magnitude

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Generate spiral time series data
  const data = [];
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * 8 * Math.PI; // 8 spiral turns
    const radius = i * 2; // Radial distance increases with time
    const value = 50 + 30 * Math.sin(angle * 2) + Math.random() * 10; // Simulate data fluctuation
    data.push({
      time: i,
      angle: angle,
      radius: radius,
      value: value,
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'cartesian' },
    encode: {
      x: 'x',
      y: 'y',
      size: 'value',
      color: 'time'
    },
    scale: {
      size: { range: [2, 8] },
      color: { palette: 'spectral' }
    },
    style: {
      fillOpacity: 0.8,
      stroke: '#fff',
      strokeWidth: 1
    },
    axis: false,
    legend: {
      size: { title: 'Value Size' },
      color: { title: 'Time Progress' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

### Polar Coordinate Spiral Chart

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Generate polar coordinate spiral data
  const data = [];
  for (let i = 0; i < 365; i++) {
    const dayOfYear = i;
    const angle = (dayOfYear / 365) * 2 * Math.PI; // One year as one circle
    const radius = 50 + dayOfYear * 0.2; // Spiral extends outward
    const temperature = 20 + 15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI/2) + Math.random() * 5;
    
    data.push({
      day: dayOfYear,
      angle: angle * 180 / Math.PI, // Convert to degrees
      radius: radius,
      temperature: temperature,
      month: Math.floor(dayOfYear / 30) + 1
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'temperature',
      size: 4
    },
    scale: {
      color: { 
        palette: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.8,
      stroke: '#fff',
      strokeWidth: 0.5
    },
    axis: {
      x: { title: 'Angle (degrees)' },
      y: { title: 'Time Progress' }
    },
    legend: {
      color: { title: 'Temperature (°C)' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## Use Cases

### Suitable Scenarios

Example 1: **Displaying Periodic Time Series Data**

Spiral charts are particularly suitable for displaying time series data with obvious periodicity, such as annual temperature variations:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulate 365 days of temperature data
  const data = [];
  for (let day = 0; day < 365; day++) {
    const angle = (day / 365) * 2 * Math.PI;
    const radius = 50 + day * 0.3;
    // Simulate seasonal temperature changes
    const baseTemp = 15 + 20 * Math.sin(angle - Math.PI/2);
    const dailyVariation = 5 * Math.sin(day * 0.1) + Math.random() * 3;
    const temperature = baseTemp + dailyVariation;
    
    data.push({
      day: day + 1,
      angle: angle * 180 / Math.PI,
      radius: radius,
      temperature: temperature,
      season: day < 90 ? 'Spring' : day < 180 ? 'Summer' : day < 270 ? 'Autumn' : 'Winter'
    });
  }

  chart.options({
    type: 'line',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'temperature'
    },
    scale: {
      color: { 
        palette: ['#0571b0', '#92c5de', '#f7f7f7', '#f4a582', '#ca0020']
      },
      x: { type: 'linear', range: [0, 1] },
      y: { type: 'linear' }
    },
    style: {
      strokeWidth: 2,
      strokeOpacity: 0.8
    },
    axis: {
      x: { 
        title: null,
        tick: false,
        label: false
      },
      y: { 
        title: 'Day Progress',
        grid: true
      }
    },
    legend: {
      color: { title: 'Temperature (°C)' }
    },
    title: 'Annual Temperature Variation Spiral Chart'
  });

  chart.render();

  return chart.getContainer();
})();
```

Example 2: **Displaying Periodic Patterns in Long-term Trends**

Spiral charts can show long-term trends while highlighting periodic patterns:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulate stock price spiral display (each point represents one week)
  const data = [];
  let basePrice = 100;
  
  for (let week = 0; week < 104; week++) { // 2 years of data
    const angle = (week / 52) * 2 * Math.PI; // One year as one circle
    const radius = 30 + week * 1.5; // Spiral extends outward
    
    // Simulate price changes: long-term upward trend + seasonal fluctuation + random variation
    const trendGrowth = week * 0.5;
    const seasonalEffect = 10 * Math.sin(angle * 2);
    const randomChange = (Math.random() - 0.5) * 5;
    
    basePrice += trendGrowth + seasonalEffect + randomChange;
    const weeklyReturn = randomChange / basePrice * 100;
    
    data.push({
      week: week + 1,
      angle: angle * 180 / Math.PI,
      radius: radius,
      price: basePrice,
      return: weeklyReturn,
      year: Math.floor(week / 52) + 1
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'return',
      size: 'price'
    },
    scale: {
      color: { 
        palette: ['#d73027', '#f46d43', '#fdae61', '#ffffbf', '#abd9e9', '#74add1', '#4575b4']
      },
      size: { range: [3, 12] },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.7,
      stroke: '#fff',
      strokeWidth: 1
    },
    axis: {
      x: { title: 'Annual Cycle' },
      y: { title: 'Time Progress (Weeks)' }
    },
    legend: {
      color: { title: 'Weekly Return (%)' },
      size: { title: 'Stock Price' }
    },
    title: 'Stock Price Spiral Trend Chart'
  });

  chart.render();

  return chart.getContainer();
})();
```

Example 3: **Multi-dimensional Data Spiral Display**

Spiral charts can simultaneously display information from multiple dimensions:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Simulate website traffic data spiral display
  const data = [];
  for (let hour = 0; hour < 24 * 30; hour++) { // 30 days of hourly data
    const dayHour = hour % 24;
    const day = Math.floor(hour / 24);
    const angle = (dayHour / 24) * 360; // 24 hours as one circle
    const radius = 20 + day * 2; // Extend outward each day
    
    // Simulate visits: high during work hours, low at night, different on weekends
    let baseVisits = 100;
    if (dayHour >= 9 && dayHour <= 18) {
      baseVisits = 300; // Work hours
    } else if (dayHour >= 19 && dayHour <= 22) {
      baseVisits = 200; // Evening
    }
    
    const weekday = day % 7;
    if (weekday === 0 || weekday === 6) {
      baseVisits *= 0.7; // Reduce on weekends
    }
    
    const visits = baseVisits + Math.random() * 50;
    const conversionRate = 2 + 3 * Math.random();
    
    data.push({
      hour: hour,
      dayHour: dayHour,
      day: day + 1,
      angle: angle,
      radius: radius,
      visits: visits,
      conversion: conversionRate,
      period: dayHour < 6 ? 'Late Night' : dayHour < 12 ? 'Morning' : dayHour < 18 ? 'Afternoon' : 'Evening'
    });
  }

  chart.options({
    type: 'point',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      size: 'visits',
      color: 'conversion'
    },
    scale: {
      color: { 
        palette: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494']
      },
      size: { range: [1, 8] },
      x: { type: 'linear', domain: [0, 360] },
      y: { type: 'linear' }
    },
    style: {
      fillOpacity: 0.6,
      stroke: '#fff',
      strokeWidth: 0.5
    },
    axis: {
      x: { 
        title: 'Hour (24-hour format)',
        tickCount: 8
      },
      y: { title: 'Day Progress' }
    },
    legend: {
      color: { title: 'Conversion Rate (%)' },
      size: { title: 'Visits' }
    },
    title: 'Website Traffic Spiral Analysis'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Unsuitable Scenarios

Example 1: **Scenarios with Too Little Data**

Spiral charts require sufficient data points to form a complete spiral shape. If there's too little data, the spiral effect is not obvious, and regular line charts or scatter plots would be more appropriate.

Example 2: **Data Without Clear Periodicity**

If time series data lacks obvious periodic characteristics, the advantages of spiral charts cannot be demonstrated, and they may instead increase comprehension difficulty.

## Extensions

### 3D Spiral Chart

Adding a third dimension to enhance the expressiveness of spiral charts:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Generate 3D effect spiral data
  const data = [];
  for (let i = 0; i < 200; i++) {
    const t = i / 20; // Time parameter
    const angle = t * 2 * Math.PI;
    const radius = 20 + t * 3;
    const height = Math.sin(t) * 30; // Height variation
    
    // Project to 2D plane, simulate 3D through perspective effect
    const perspective = 0.8 + 0.2 * Math.sin(angle);
    const x = radius * Math.cos(angle) * perspective;
    const y = radius * Math.sin(angle) * 0.6 + height * 0.4;
    
    data.push({
      time: i,
      x: x,
      y: y,
      radius: radius,
      height: height + 50, // Offset for display
      depth: perspective
    });
  }

  chart.options({
    type: 'line',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 'height',
      size: 'depth'
    },
    scale: {
      color: { 
        palette: ['#440154', '#31688e', '#35b779', '#fde725']
      },
      size: { range: [1, 4] }
    },
    style: {
      strokeOpacity: 0.8
    },
    axis: false,
    legend: {
      color: { title: 'Height Dimension' },
      size: { title: 'Depth Perspective' }
    },
    title: '3D Effect Spiral Chart'
  });

  chart.render();

  return chart.getContainer();
})();
```

### Multi-layer Spiral Chart

Displaying spiral comparisons of multiple related data series:

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // Generate multi-layer spiral data
  const data = [];
  const series = ['Series A', 'Series B', 'Series C'];
  
  series.forEach((seriesName, seriesIndex) => {
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * 4 * Math.PI;
      const baseRadius = 30 + seriesIndex * 15; // Different radius for different series
      const radius = baseRadius + i * 0.8;
      
      // Different series have different data patterns
      let value;
      if (seriesIndex === 0) {
        value = 50 + 20 * Math.sin(angle);
      } else if (seriesIndex === 1) {
        value = 45 + 25 * Math.cos(angle * 0.5);
      } else {
        value = 55 + 15 * Math.sin(angle * 2);
      }
      
      value += Math.random() * 10;
      
      data.push({
        time: i,
        angle: angle * 180 / Math.PI,
        radius: radius,
        value: value,
        series: seriesName
      });
    }
  });

  chart.options({
    type: 'line',
    data,
    coordinate: { type: 'polar' },
    encode: {
      x: 'angle',
      y: 'radius',
      color: 'series'
    },
    scale: {
      color: { 
        palette: ['#1890ff', '#52c41a', '#fa8c16']
      },
      x: { type: 'linear' },
      y: { type: 'linear' }
    },
    style: {
      strokeWidth: 2,
      strokeOpacity: 0.8
    },
    axis: {
      x: { title: null },
      y: { title: 'Spiral Progress' }
    },
    legend: {
      color: { title: 'Data Series' }
    },
    title: 'Multi-layer Spiral Comparison Chart'
  });

  chart.render();

  return chart.getContainer();
})();
```

## Comparison

### Spiral Chart vs [Line Chart](/en/charts/line)

- Spiral charts save space through spiral format, suitable for long time series data
- Line charts display in linear coordinate system, more intuitively showing data change trends
- Spiral charts better highlight periodic patterns, line charts are more suitable for analyzing precise temporal trends

### Spiral Chart vs [Polar Chart](/en/charts/polar)

- Spiral charts are a special form of polar charts, emphasizing spiral progression of time
- Polar charts usually display relationships between angle and radius
- Spiral charts are more suitable for time series, polar charts are more suitable for directional data

### Spiral Chart vs [Heatmap](/en/charts/heatmap)

- Spiral charts show continuity of time series through spiral paths
- Heatmaps show data density and patterns through color matrices
- Spiral charts maintain temporal order, heatmaps are more suitable for displaying categorical data distributions

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code>
