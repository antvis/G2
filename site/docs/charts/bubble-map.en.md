---
title: Bubble Map
order: 3
screenshot: 'https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png'
category: ['location', 'comparison']
similar: ['scatter-chart', 'dot-map', 'choropleth-map']
---

<img alt="bubble-map" src="https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png" width=600/>

> Note: G2 5.0 does not directly support complete map background functionality. This page primarily provides concept introduction. For actual applications, additional map components and data need to be imported.

## Introduction to Bubble Maps

A Bubble Map is a visualization chart that uses bubbles (circles) on a geographic map to represent data size at different geographic locations. The size of the bubble typically represents the magnitude of a value, the position represents geographic coordinates, and colors can be used to distinguish different categories or represent another dimension of values.

Bubble Maps are more suitable for comparing geographically related data than [Choropleth Maps](/en/charts/choropleth-map). The main disadvantage is that when there are too many large bubbles on the map, they may overlap and affect data display, so this needs to be considered when creating the chart.

**Other Names**: Bubble Chart Map, Geographic Bubble Chart

## Components of a Bubble Map

### Basic Bubble Map

<img alt="bubble-map-anatomy" src="https://t.alipayobjects.com/images/T1yxpjXnVfXXXXXXXX.png" width=600 />

| Chart Type      | Bubble Map                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Suitable Data   | Data containing geographic coordinates (longitude and latitude) and one or more numeric fields     |
| Function        | Display geographic distribution and value relationships on a geographic background                 |
| Data Mapping    | Longitude/latitude fields mapped to map position<br>Numeric field mapped to bubble size<br>Category field can be mapped to color<br>Other values can be mapped to color intensity |
| Data Volume     | Recommended not to exceed 100 data points to avoid bubble overlap affecting readability            |

The main components of a Bubble Map include:

- **Geographic Background**: Provides a map background with geographic coordinate system, such as world map, country map, etc.
- **Bubbles**: Circular markers where position represents geographic coordinates and size represents the magnitude of values
- **Color Encoding**: Uses different colors to distinguish categories or represent value ranges
- **Legend**: Explains the meaning of bubble size and color

---

## Use Cases of Bubble Maps

### Suitable Use Cases

**Case 1: Geographic Data Distribution Analysis**

Bubble Maps are ideal tools for analyzing data with geographic attributes, clearly showing the distribution pattern of data across geographic space.

<img alt="geographic-distribution" src="https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png" width=600 />

**Case 2: Regional Comparison Analysis**

Through comparison of bubble size and color, different regions' data differences can be effectively compared.

**Case 3: Multi-dimensional Geographic Data Display**

Bubble Maps can simultaneously display multiple dimensions of information including location, value size, and category.

### Unsuitable Use Cases

**Case 1: Too Many Data Points Causing Overlap**

When there are too many data points on the map, bubbles may overlap and affect clear data display. In such cases, heat maps or dot density maps should be considered.

**Case 2: Lack of Geographic Coordinate Information**

For data without latitude and longitude information, geocoding conversion is needed first, or other chart types should be considered.

**Case 3: Precise Value Display**

Bubble Maps focus on showing geographic distribution trends of data and are not suitable for scenarios requiring precise values. Tables or other precise display methods should be used in such cases.

## Extensions of Bubble Maps

### Multi-layer Bubble Maps

By setting different layers and transparency levels, multiple data series can be displayed on the same map.

<img alt="multi-layer" src="https://t.alipayobjects.com/images/T1yxpjXnVfXXXXXXXX.png" width=600 />

### Bubble Maps with Map Backgrounds

Combining geographic boundary data provides richer geographic background information.

### Time Series Bubble Maps

Showing changes in bubbles over time through animation.

## Comparing Bubble Maps to Other Charts

### Bubble Maps and [Scatter Charts](/en/charts/scatter-chart)

- Bubble Maps use geographic coordinate systems, suitable for displaying geospatial data
- Scatter Charts use Cartesian coordinate systems, suitable for displaying correlations between two continuous variables

### Bubble Maps and [Choropleth Maps](/en/charts/choropleth-map)

- Bubble Maps use bubble size to represent values, allowing precise comparison of values across different regions
- Choropleth Maps use color intensity to represent value ranges, suitable for displaying overall distribution patterns of data

### Bubble Maps and [Dot Charts](/en/charts/scatter-chart)

- Bubble Maps incorporate geographic information, where position has geographic significance
- Regular dot charts' positions only represent data dimensions without geographic attributes

## Implementing Bubble Maps in G2 5.0

To implement a complete bubble map with map background in G2 5.0, you need to:

1. Import map projection components
2. Load complete GeoJSON map data
3. Use the correct transform configuration

```js
// The following code is for reference only; please use it with map components in actual applications
import { Chart } from '@antv/g2';
import { Projection } from '@antv/g2';

// Register projection component
Projection.registerProjection();

// Load GeoJSON map data
// Configure map projection
// Draw bubbles
```

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
