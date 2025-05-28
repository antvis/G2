---
title: Choropleth Map
order: 10
screenshot: 'https://t.alipayobjects.com/images/T1dSNjXcNhXXXXXXXX.png'
category: ['map']
similar: ['bubble-map', 'heatmap']
---

A Choropleth Map, also known as a color-coded map or thematic map, is a type of specialized map. It divides geographic regions (such as countries, provinces, cities, districts, etc.) based on numerical indicators (such as population density, GDP, sales, etc.) and fills these regions with different colors or patterns to visually display the distribution and differences of these indicators across different regions.

## Introduction to Choropleth Maps

Choropleth maps use color intensity changes to represent data magnitude. Color intensity is usually proportional to numerical values, helping users quickly identify high-value and low-value regions. Here's an example of a choropleth map showing unemployment rates by US counties:

<div style="text-align: center;">
  <img src="https://t.alipayobjects.com/images/T1dSNjXcNhXXXXXXXX.png" alt="Choropleth Map Example" width="600">
</div>

Below is an example of a choropleth map showing unemployment rates by US states:

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

// Load map and data
Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) =>
    res.json(),
  ),
]).then(([us, unemployment]) => {
  const counties = feature(us, us.objects.counties).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    coordinate: { 
      type: 'albersUsa'  // Use US-specific map projection
    },
    data: {
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    },
    scale: {
      color: {
        palette: 'ylGnBu',  // Use yellow-to-blue gradient palette
        unknown: '#fff',    // Display unknown data as white
      }
    },
    encode: {
      color: 'rate'  // Map unemployment rate to color channel
    },
    legend: {
      color: { 
        layout: { justifyContent: 'center' }  // Adjust legend layout
      }
    },
    style: {
      stroke: '#666',
      strokeWidth: 0.5,
    }
  });

  chart.render();
});
```

The above code demonstrates how to create a basic choropleth map using G2. The main steps include:

1. Loading geographic data (GeoJSON/TopoJSON format) and statistical data
2. Creating a map view and setting appropriate map projection
3. Associating statistical data with geographic data
4. Setting color mapping and legend

Below is a more complex example showing the global distribution of Human Development Index (HALE):

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/countries-50m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/hale.json').then((res) =>
    res.json(),
  ),
]).then(([world, hale]) => {
  const countries = feature(world, world.objects.countries).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    data: {
      value: countries,
      transform: [
        {
          type: 'join',
          join: hale,
          on: [(d) => d.properties.name, 'name'],
          select: ['hale'],
        },
      ],
    },
    encode: {
      color: 'hale',
    },
    scale: {
      color: {
        type: 'sequential',
        palette: 'spectral',
        unknown: '#ccc',
      },
    },
    legend: {
      color: {
        layout: { justifyContent: 'center' },
        length: 400,
      },
    },
    style: {
      stroke: '#000',
      strokeWidth: 0.5,
    },
    tooltip: {
      title: (d) => d.properties.name,
      items: [
        { field: 'hale', name: 'HALE Index' },
      ],
    },
  });

  chart.render();
});
```

This example demonstrates more advanced features:

1. Using TopoJSON's mesh functionality to create boundary lines
2. Adding earth outline
3. Setting color handling for unknown data
4. Optimizing visual effects of boundary lines

**Chinese Name**: 分级统计地图

**Other Names**: Color-coded map, Thematic map

## Components of Choropleth Maps

| Chart Type           | Choropleth Map                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Suitable Data        | Geospatial data (such as GeoJSON, TopoJSON format geographic boundary data) and numerical data related to these geographic regions. |
| Function             | Display the distribution of numerical data across geographic regions, compare numerical differences between different regions. |
| Data-to-Visual Mapping | Geographic region boundaries map to polygons on the map, numerical data maps to polygon fill colors.       |
| Suitable Data Volume | Depends on the granularity of geographic region division; too many or too few regional divisions may affect chart readability. |

## Use Cases of Choropleth Maps

### Suitable Use Cases

- **Population Distribution Display**: For example, showing population density across different provinces, with darker colors indicating higher population density.
- **Economic Indicator Visualization**: For example, showing GDP totals or per capita GDP across different countries, helping analyze regional economic development.
- **Election Result Analysis**: For example, showing voting results across different constituencies, using different colors to represent different party victories.
- **Pandemic Data Display**: For example, showing confirmed cases or growth rates across different regions, helping understand pandemic spread.
- **Sales Data Analysis**: For example, showing product sales or market share across different sales regions.

### Unsuitable Use Cases

- **Displaying Precise Values**: Choropleth maps are mainly used to show relative data size and distribution trends, not suitable for scenarios requiring precise value reading.
- **Large Differences in Regional Areas**: When regional areas vary greatly, larger areas will visually dominate even if their corresponding values are smaller, potentially misleading users. In such cases, consider using bubble maps or other map types.
- **Data Not Geographically Related**: If data has no direct relationship with geographic location, using choropleth maps is meaningless.

Here's a typical choropleth map application scenario:

**Global Population Gender Ratio Distribution in 2015.** The chart below shows the global male-to-female ratio in 2015, where values represent the number of males per 100 females. It can be seen that in European and American countries, females generally outnumber males slightly, and this phenomenon is particularly prominent in former Soviet regions, while Middle Eastern regions have more males than females.

| name (Country) | value (Males per 100 Females) |
|----------------|-------------------------------|
| Russia         | 86.8                         |
| China          | 106.3                        |
| Japan          | 94.7                         |

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

const userData = [
  {name: 'Russia',value: 86.8},
  {name: 'China',value: 106.3},
  {name: 'Japan',value: 94.7},
  {name: 'Mongolia',value: 98},
  {name: 'Canada',value: 98.4},
  {name: 'United Kingdom',value: 97.2},
  {name: 'United States of America',value: 98.3},
  {name: 'Brazil',value: 96.7},
  {name: 'Argentina',value: 95.8},
  {name: 'Algeria',value: 101.3},
  {name: 'France',value: 94.8},
  {name: 'Germany',value: 96.6},
  {name: 'Ukraine',value: 86.3},
  {name: 'Egypt',value: 102.1},
  {name: 'South Africa',value: 101.3},
  {name: 'India',value: 107.6},
  {name: 'Australia',value: 99.9},
  {name: 'Saudi Arabia',value: 130.1},
  {name: 'Afghanistan',value: 106.5},
  {name: 'Kazakhstan',value: 93.4},
  {name: 'Indonesia',value: 101.4}
];

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/countries-50m.json').then((res) =>
    res.json(),
  ),
]).then(([world]) => {
  const countries = feature(world, world.objects.countries).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options({
    type: 'geoPath',
    data: {
      value: countries,
      transform: [
        {
          type: 'join',
          join: userData,
          on: [(d) => d.properties.name, 'name'],
          select: ['value'],
        },
      ],
    },
    encode: {
      color: 'value',
    },
    scale: {
      color: {
        type: 'threshold',
        domain: [95, 100, 105],
        range: ['#C45A5A', '#E8E8E8', '#14647D'], // More females->Balanced->More males
        unknown: '#ccc',
      },
    },
    style: {
      stroke: '#fff',
      strokeWidth: 0.5,
    },
    tooltip: {
      title: (d) => d.properties.name,
      items: [
        { field: 'value', name: 'Gender Ratio' },
      ],
    },
  });

  chart.render();
});
```

This example demonstrates:

1. Using threshold scales to group data
2. Using specific color schemes to express different gender ratio intervals
3. Adding boundary lines to enhance map readability
4. Using hover tooltips to display specific values

## Extensions of Choropleth Maps

- **Interactivity**: Add mouse hover tooltips to display specific values, click regions for drill-down to view more detailed data.
- **Multi-variable Display**: Besides color, combine other visual channels (such as patterns, transparency) to display more dimensions of data, but be careful to avoid over-complication.
- **Time Series Display**: Through animation or time sliders, show data changes over time.

## Comparing Choropleth Maps to Other Charts

### Choropleth Maps and Bubble Maps

- **Choropleth Maps**: Use color intensity to represent value size, suitable for displaying continuous data distribution.
- **Bubble Maps**: Use bubble size to represent value size, bubble position corresponds to geographic coordinates, suitable for displaying discrete point data or avoiding misleading when regional area differences are large.

### Choropleth Maps and Heatmaps (Non-geographic Heatmaps)

- **Choropleth Maps**: Specifically used for displaying geospatial data distribution.
- **Heatmaps**: More general, can use color to display numerical values in any two-dimensional matrix data, such as website click heatmaps.

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
