---
title: Dot Map
order: 2
screenshot: 'https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png'
category: ['distribution', 'map']
similar: ['bubble-map', 'choropleth-map', 'scatter']
---

<img alt="dot-map" src="https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png" width=600/>

## Introduction to Dot Maps

A dot map is a geographic visualization method that represents data distribution density and patterns through densely distributed dots on a geographic map. Each dot typically represents a certain quantity of statistical units (such as population, economic activity, agricultural output, etc.), and the distribution density of dots intuitively reflects the concentration and distribution characteristics of data in geographic space.

The greatest advantage of dot maps is their ability to intuitively display spatial distribution patterns of data. Through the density of dots, you can quickly identify data concentration areas and sparse regions. Compared to [choropleth maps](/en/charts/choropleth-map), dot maps can more precisely show the continuous distribution characteristics of data within geographic space, avoiding the impact of administrative boundary divisions on data presentation.

Dot maps are widely used in population distribution analysis, economic activity density display, natural resource distribution, disease transmission analysis, and many other geographic data visualization scenarios.

**English Name**: Dot Map, Dot Density Map

## Components of Dot Maps

<img alt="basic-dot-map" src="https://gw.alipayobjects.com/zos/rmsportal/dpmTuGGpBkGJidrRZFyy.png" width=600 />

| Chart Type | Basic Dot Map |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Suitable Data | Data containing geographic coordinates (longitude and latitude) and numerical fields |
| Function | Display data distribution density and patterns in geographic space |
| Data-to-Graphics Mapping | Longitude and latitude fields map to map positions<br>Numerical fields affect the number or density of dots<br>Categorical fields can map to colors<br>Other attributes can map to shapes |
| Suitable Data Volume | Suitable for medium to large amounts of data points (typically 100-10,000 dots) |

The main components of a basic dot map include:

- **Geographic Background**: Provides the geographic coordinate system's map background, such as world maps, country maps, regional maps, etc.
- **Dot Markers**: Dots representing data units, positioned according to geographic coordinates
- **Dot Density**: The distribution density of dots reflects the spatial distribution patterns of data
- **Color Encoding**: Different colors distinguish data categories or numerical ranges

## Application Scenarios for Dot Maps

### Suitable Scenarios

Example 1: **US Airport Distribution Dot Map**

Based on real US map data and airport location data, showing the geographic distribution of airports across the United States.

```js | ob { inject: true }
/**
 * Airport Distribution Dot Map Based on Real US Map Data
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson-client';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/airports.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us, airports] = values;
  const states = feature(us, us.objects.states).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoView',
    coordinate: { type: 'albersUsa' },
    children: [
      {
        type: 'geoPath',
        data: states,
        style: {
          fill: '#f5f5f5',
          stroke: '#d0d0d0',
          lineWidth: 1,
        },
      },
      {
        type: 'point',
        data: airports,
        encode: {
          x: 'longitude',
          y: 'latitude',
          color: '#1890ff',
          shape: 'point',
          size: 2,
        },
        style: {
          opacity: 0.8,
        },
        tooltip: {
          title: 'name',
          items: [
            { name: 'Airport Code', field: 'iata' },
            { name: 'Longitude', field: 'longitude' },
            { name: 'Latitude', field: 'latitude' },
          ],
        },
      },
    ],
  });

  chart.render();
});
```

**Description**:

- Uses real US map TopoJSON data and airport coordinate data
- Through dot distribution density, you can observe that airports are mainly concentrated on the East Coast, West Coast, and Great Lakes region
- `albersUsa` projection is suitable for displaying geographic data of the continental United States

Example 2: **US Ethnic Distribution Dot Map**

> **Note**: The following example uses fictional ethnic distribution data for demonstration purposes

```js | ob { inject: true }
/**
 * Fictional Data: US Ethnic Distribution Dot Map
 * Note: This example uses fictional ethnic distribution data for demonstration
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson-client';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us] = values;
  const states = feature(us, us.objects.states).features;

  // Fictional ethnic distribution data for major US cities (for demonstration only)
  const ethnicGroups = [
    { type: 'White', ratio: 0.6, color: '#1890ff' },
    { type: 'Hispanic', ratio: 0.18, color: '#52c41a' },
    { type: 'African American', ratio: 0.13, color: '#faad14' },
    { type: 'Asian', ratio: 0.06, color: '#f5222d' },
    { type: 'Others', ratio: 0.03, color: '#722ed1' },
  ];

  // Coordinates of major US cities (with fictional population data)
  const cities = [
    { name: 'New York', lng: -74.0059, lat: 40.7128, population: 850 },
    { name: 'Los Angeles', lng: -118.2437, lat: 34.0522, population: 400 },
    { name: 'Chicago', lng: -87.6298, lat: 41.8781, population: 270 },
    { name: 'Houston', lng: -95.3698, lat: 29.7604, population: 230 },
    { name: 'Philadelphia', lng: -75.1652, lat: 39.9526, population: 160 },
    { name: 'Phoenix', lng: -112.074, lat: 33.4484, population: 170 },
    { name: 'San Antonio', lng: -98.4936, lat: 29.4241, population: 150 },
    { name: 'San Diego', lng: -117.1611, lat: 32.7157, population: 140 },
    { name: 'Dallas', lng: -96.797, lat: 32.7767, population: 130 },
    { name: 'San Jose', lng: -121.8863, lat: 37.3382, population: 100 },
    { name: 'Austin', lng: -97.7431, lat: 30.2672, population: 95 },
    { name: 'Detroit', lng: -83.0458, lat: 42.3314, population: 67 },
    { name: 'Miami', lng: -80.1918, lat: 25.7617, population: 47 },
    { name: 'Seattle', lng: -122.3321, lat: 47.6062, population: 75 },
    { name: 'Denver', lng: -104.9903, lat: 39.7392, population: 72 },
  ];

  // Generate fictional ethnic distribution dot data
  const ethnicData = [];
  cities.forEach((city) => {
    ethnicGroups.forEach((group) => {
      // Calculate number of dots based on ethnic ratio and city population
      const pointCount = Math.floor((city.population * group.ratio) / 10); // One dot per 100,000 people

      for (let i = 0; i < pointCount; i++) {
        // Randomly distribute dots around the city, different ethnicities have different clustering patterns
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 1.5; // Distributed within 1.5 degrees

        // Simulate different ethnic clustering characteristics
        if (group.type === 'Asian') {
          // Asians tend to cluster in specific areas
          distance = Math.random() * 0.8;
        } else if (group.type === 'Hispanic') {
          // Hispanics are more concentrated in southern cities
          if (city.lat < 35) distance = Math.random() * 0.6;
        }

        ethnicData.push({
          city: city.name,
          lng: city.lng + Math.cos(angle) * distance,
          lat: city.lat + Math.sin(angle) * distance,
          ethnicity: group.type,
          value: 10, // Each dot represents 100,000 people
        });
      }
    });
  });

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoView',
    coordinate: { type: 'albersUsa' },
    children: [
      {
        type: 'geoPath',
        data: states,
        style: {
          fill: '#f5f5f5',
          stroke: '#d0d0d0',
          lineWidth: 1,
        },
      },
      {
        type: 'point',
        data: ethnicData,
        encode: {
          x: 'lng',
          y: 'lat',
          color: 'ethnicity',
          shape: 'ethnicity',
          size: 2,
        },
        style: {
          opacity: 0.7,
          stroke: 'white',
          lineWidth: 0.5,
        },
        scale: {
          color: {
            domain: ['White', 'Hispanic', 'African American', 'Asian', 'Others'],
            range: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
          },
          shape: {
            domain: ['White', 'Hispanic', 'African American', 'Asian', 'Others'],
            range: ['point', 'square', 'triangle', 'diamond', 'cross'],
          },
        },
        tooltip: {
          title: 'city',
          items: [
            { name: 'Ethnicity', field: 'ethnicity' },
            { name: 'Population', field: 'value', valueFormatter: (v) => `${v}0k people` },
          ],
        },
      },
    ],
  });

  chart.render();
});
```

**Description**:

- Uses fictional ethnic distribution data to show population composition in major US cities
- Different colors and shapes represent different ethnic groups
- Through dot distribution density, you can observe ethnic distribution characteristics and clustering patterns in various regions
- Simulates real ethnic geographic distribution patterns, such as Asian clustering on the West Coast and Hispanic concentration in the South

### Unsuitable Scenarios

Example 1: **Not Suitable for Precise Numerical Comparison**

Dot maps focus on displaying distribution patterns and density, and are not suitable for scenarios requiring precise comparison of specific numerical values. If you need to accurately compare numerical sizes across different regions, you should use [choropleth maps](/en/charts/choropleth-map) or [bubble maps](/en/charts/bubble-map).

Example 2: **Not Suitable for Displaying Continuous Surface Data**

For continuously changing surface data such as temperature and precipitation, the discrete nature of dot maps cannot well represent the continuity of data. In such cases, consider using [heatmaps](/en/charts/heatmap) or [contour maps](/en/charts/contourline).

## Comparison with Other Charts

### Dot Maps vs [Bubble Maps](/en/charts/bubble-map)

- Dot maps use dense small dots to represent data distribution, suitable for showing distribution patterns and density
- Bubble maps use circles of different sizes to represent numerical values, suitable for precise comparison of data magnitudes across different regions
- Dot maps are more suitable for showing continuous distribution, while bubble maps are more suitable for showing discrete data points

### Dot Maps vs [Choropleth Maps](/en/charts/choropleth-map)

- Dot maps represent data characteristics through dot distribution density, not limited by administrative divisions
- Choropleth maps represent data ranges through regional colors, related to administrative boundary divisions
- Dot maps are more suitable for showing continuous spatial distribution, while choropleth maps are more suitable for showing comparisons between regions

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
