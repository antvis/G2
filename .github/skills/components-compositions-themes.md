# G2 Components, Compositions, and Themes

This skill covers UI components, visualization compositions, and theming in G2.

## Components (`src/component/`)

Components are UI elements that enhance visualizations (axes, legends, titles, etc.).

### Axis Components

#### AxisX (`src/component/axisX.ts`)
Horizontal axis
```typescript
chart.interval()
  .encode('x', 'category')
  .axis('x', {
    title: 'Categories',
    titleFontSize: 14,
    label: { rotate: 45 },
    grid: true,
    gridStroke: '#ddd',
    tickCount: 5,
  });
```

**Options:**
- `title`: Axis title text
- `titlePosition`: 'start', 'center', 'end'
- `titleFontSize`, `titleFontWeight`, `titleFill`
- `label`: Label configuration
- `labelFormatter`: Function to format labels
- `labelRotate`: Rotation angle
- `grid`: Show grid lines
- `gridStroke`, `gridLineWidth`, `gridLineDash`
- `tick`: Show tick marks
- `tickLength`, `tickStroke`
- `line`: Show axis line
- `lineStroke`, `lineLineWidth`
- `tickCount`: Number of ticks
- `position`: 'top' or 'bottom'

#### AxisY (`src/component/axisY.ts`)
Vertical axis
```typescript
chart.interval()
  .encode('y', 'value')
  .axis('y', {
    title: 'Sales',
    label: { formatter: (d) => `$${d}` },
    grid: true,
    position: 'left',
  });
```

**Options:** Similar to AxisX, plus:
- `position`: 'left' or 'right'

### Legend Components

#### LegendCategory (`src/component/legendCategory.ts`)
Legend for categorical scales
```typescript
chart.interval()
  .encode('color', 'category')
  .legend('color', {
    position: 'right',
    title: 'Category',
    itemMarker: 'circle',
    itemMarkerSize: 8,
    layout: 'vertical',
  });
```

**Options:**
- `position`: 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
- `title`: Legend title
- `itemName`: Item label formatter
- `itemMarker`: Marker shape ('circle', 'square', 'line', etc.)
- `itemMarkerSize`: Marker size
- `layout`: 'horizontal' or 'vertical'
- `itemSpacing`: Space between items
- `maxWidth`, `maxHeight`: Constraints
- `padding`: Legend padding

#### LegendContinuous (`src/component/legendContinuous.ts`)
Legend for continuous scales (color gradients)
```typescript
chart.cell()
  .encode('color', 'value')
  .scale('color', { palette: 'blues' })
  .legend('color', {
    position: 'right',
    title: 'Value',
    length: 200,
    width: 20,
  });
```

**Options:**
- `length`: Length of gradient bar
- `width`: Width of gradient bar
- `label`: Label configuration
- `rail`: Background rail style
- Other common legend options

#### Legends (`src/component/legends.ts`)
Automatic legend for all color channels
```typescript
chart.options({
  legends: {
    color: { position: 'right' }
  }
});
```

### Slider Components

#### SliderX (`src/component/sliderX.ts`)
Horizontal slider for filtering
```typescript
chart.interval()
  .encode('x', 'date')
  .encode('y', 'value');

chart.sliderX({
  start: 0.2,
  end: 0.8,
  trendCfg: {
    data: data,
    encode: { x: 'date', y: 'value' }
  }
});

chart.interaction('sliderFilter');
```

**Options:**
- `start`: Initial start position (0-1)
- `end`: Initial end position (0-1)
- `height`: Slider height
- `padding`: Slider padding
- `trendCfg`: Mini chart configuration
- `backgroundStyle`, `foregroundStyle`: Styling
- `handlerStyle`: Handle styling
- `textStyle`: Label styling

#### SliderY (`src/component/sliderY.ts`)
Vertical slider for filtering
```typescript
chart.sliderY({
  start: 0,
  end: 0.5,
  width: 30,
});
```

**Options:** Similar to SliderX

### Scrollbar Components

#### ScrollbarX (`src/component/scrollbarX.ts`)
Horizontal scrollbar
```typescript
chart.scrollbarX({
  padding: 10,
  scrollRatio: 0.5,
});

chart.interaction('scrollbarFilter');
```

**Options:**
- `scrollRatio`: Visible ratio (0-1)
- `padding`: Scrollbar padding
- `trackStyle`: Track background style
- `thumbStyle`: Thumb style

#### ScrollbarY (`src/component/scrollbarY.ts`)
Vertical scrollbar
```typescript
chart.scrollbarY({
  scrollRatio: 0.3,
});
```

### Title Component

#### TitleComponent (`src/component/title.ts`)
Chart title
```typescript
chart.options({
  title: {
    text: 'Sales Dashboard',
    subtitle: 'Q1 2024',
    position: 'top',
    align: 'center',
    style: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    subtitleStyle: {
      fontSize: 14,
      fill: '#666'
    }
  }
});
```

**Options:**
- `text`: Main title text
- `subtitle`: Subtitle text
- `position`: 'top', 'bottom', 'left', 'right'
- `align`: 'start', 'center', 'end'
- `style`: Main title style
- `subtitleStyle`: Subtitle style
- `padding`: Title padding

## Compositions (`src/composition/`)

Compositions combine multiple views or create special layouts.

### Space Compositions

#### SpaceLayer (`src/composition/spaceLayer.ts`)
Layer multiple visualizations
- Shares same coordinate space
- Used for overlaying marks
```typescript
const layer = chart.spaceLayer();

// First layer: bars
layer.interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value1')
  .style('fill', 'steelblue');

// Second layer: line
layer.line()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value2')
  .style('stroke', 'red')
  .style('lineWidth', 2);

chart.render();
```

#### SpaceFlex (`src/composition/spaceFlex.ts`)
Flexible space layout
- Divides space flexibly
- Used for side-by-side or stacked charts
```typescript
const flex = chart.spaceFlex()
  .direction('horizontal')  // or 'vertical'
  .ratio([1, 2]);  // Width ratios

// First chart (1/3 width)
flex.interval()
  .data(data1)
  .encode('x', 'category')
  .encode('y', 'value');

// Second chart (2/3 width)
flex.line()
  .data(data2)
  .encode('x', 'date')
  .encode('y', 'value');

chart.render();
```

### Facet Compositions

#### FacetRect (`src/composition/facetRect.ts`)
Rectangular faceting (small multiples)
- Creates grid of subplots
```typescript
chart
  .facetRect()
  .data(data)
  .encode('x', 'region')   // Facet columns
  .encode('y', 'year')     // Facet rows
  .interval()              // Mark for each facet
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category');

chart.render();
```

**Options:**
- `padding`: Padding between facets
- `shareX`: Share X scale across facets
- `shareY`: Share Y scale across facets
- `title`: Facet title template

#### FacetCircle (`src/composition/facetCircle.ts`)
Circular faceting
- Arranges facets in a circle
```typescript
chart
  .facetCircle()
  .data(data)
  .encode('position', 'category')  // Position around circle
  .interval()
  .encode('x', 'month')
  .encode('y', 'value')
  .coordinate({ type: 'polar' });

chart.render();
```

### Matrix Composition

#### RepeatMatrix (`src/composition/repeatMatrix.ts`)
Scatterplot matrix (SPLOM)
- Shows relationships between multiple variables
```typescript
chart
  .repeatMatrix()
  .data(data)
  .encode('position', ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'])
  .point()
  .encode('x', (d, i, data, { position }) => d[position[0]])
  .encode('y', (d, i, data, { position }) => d[position[1]])
  .encode('color', 'species');

chart.render();
```

### Animation Composition

#### TimingKeyframe (`src/composition/timingKeyframe.ts`)
Keyframe-based animation
- Animate between different data states
```typescript
chart
  .timingKeyframe()
  .data(dataByYear)  // Array of data for each keyframe
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category')
  .animate('update', { duration: 1000 });

chart.render();

// Later, advance to next keyframe
chart.nextKeyframe();
```

## Themes (`src/theme/`)

Themes define the visual style of charts.

### Built-in Themes

#### Classic (`src/theme/classic.ts`)
Default light theme
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'classic',  // or omit (default)
});
```

#### ClassicDark (`src/theme/classicDark.ts`)
Dark version of classic
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'classicDark',
});
```

#### Academy (`src/theme/academy.ts`)
Academic publication style
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'academy',
});
```

#### Light (`src/theme/light.ts`)
Light theme
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'light',
});
```

#### Dark (`src/theme/dark.ts`)
Dark theme
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'dark',
});
```

### Theme Structure

Themes define these properties:
- **Colors**: Color palettes for marks
- **Typography**: Font families, sizes, weights
- **Shapes**: Mark shapes and styles
- **Sizes**: Default sizes for marks
- **Components**: Component styles (axes, legends, etc.)
- **Interaction**: Interaction feedback styles

### Custom Themes

Create custom themes:
```typescript
const customTheme = {
  // Color palette
  colors10: ['#1f77b4', '#ff7f0e', '#2ca02c', ...],
  colors20: [...],
  
  // Typography
  fontFamily: '"Segoe UI", Arial, sans-serif',
  
  // Component styles
  axis: {
    line: {
      stroke: '#333',
      lineWidth: 1,
    },
    tick: {
      length: 5,
      stroke: '#333',
    },
    label: {
      fill: '#333',
      fontSize: 12,
    },
    title: {
      fill: '#000',
      fontSize: 14,
      fontWeight: 'bold',
    },
    grid: {
      stroke: '#ddd',
      lineWidth: 1,
      lineDash: [3, 3],
    },
  },
  
  legend: {
    category: {
      item: {
        marker: {
          size: 8,
        },
        label: {
          fill: '#333',
          fontSize: 12,
        },
      },
    },
  },
  
  // Mark defaults
  mark: {
    interval: {
      fill: '#5B8FF9',
      fillOpacity: 0.95,
    },
    line: {
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
    point: {
      fill: '#5B8FF9',
      size: 4,
      lineWidth: 0,
    },
    area: {
      fill: '#5B8FF9',
      fillOpacity: 0.25,
    },
  },
  
  // Interaction styles
  interaction: {
    active: {
      fillOpacity: 1,
      strokeOpacity: 1,
    },
    inactive: {
      fillOpacity: 0.3,
      strokeOpacity: 0.3,
    },
    selected: {
      stroke: '#000',
      lineWidth: 2,
    },
  },
};

// Register custom theme
import { register } from '@antv/g2';
register('theme.custom', customTheme);

// Use custom theme
const chart = new Chart({
  container: 'container',
  theme: 'custom',
});
```

### Override Theme Properties

Override specific theme properties:
```typescript
const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// Override globally
chart.theme({
  axis: {
    label: { fill: 'red' }
  }
});

// Override per mark
chart.interval()
  .style('fill', 'blue');  // Overrides theme color
```

## Palettes (`src/palette/`)

Color palettes for categorical and sequential data.

### Categorical Palettes

#### Category10 (`src/palette/category10.ts`)
10-color categorical palette
```typescript
chart.interval()
  .encode('color', 'category')
  .scale('color', { palette: 'category10' });
```

#### Category20 (`src/palette/category20.ts`)
20-color categorical palette
```typescript
.scale('color', { palette: 'category20' });
```

### Sequential Palettes

Sequential palettes for continuous data:
- Blues, Greens, Reds, Purples, Oranges
- Spectral, Viridis, Plasma, Inferno, Magma

```typescript
chart.cell()
  .encode('color', 'value')
  .scale('color', { 
    type: 'sequential',
    palette: 'blues'  // or custom range
  });
```

### Custom Palettes

Define custom color palettes:
```typescript
chart.interval()
  .encode('color', 'category')
  .scale('color', {
    range: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  });
```

## Common Patterns

### Dashboard Layout
```typescript
const dashboard = chart.spaceFlex()
  .direction('vertical');

// Top: KPI cards
const kpis = dashboard.spaceFlex()
  .direction('horizontal')
  .ratio([1, 1, 1]);

kpis.interval().data(kpi1Data)...;
kpis.interval().data(kpi2Data)...;
kpis.interval().data(kpi3Data)...;

// Bottom: Main chart
dashboard.line().data(timeSeriesData)...;

chart.render();
```

### Small Multiples with Facets
```typescript
chart
  .facetRect()
  .data(data)
  .encode('x', 'region')
  .encode('y', 'category')
  .shareX(true)
  .shareY(true)
  .interval()
  .encode('x', 'month')
  .encode('y', 'sales')
  .encode('color', 'product');
```

### Dual-Axis Chart
```typescript
const layer = chart.spaceLayer();

// Left Y axis
layer.interval()
  .data(data)
  .encode('x', 'month')
  .encode('y', 'sales')
  .axis('y', { title: 'Sales' });

// Right Y axis
layer.line()
  .data(data)
  .encode('x', 'month')
  .encode('y', 'growth')
  .scale('y', { independent: true })
  .axis('y', { 
    title: 'Growth %',
    position: 'right'
  });
```

### Themed Visualizations
```typescript
// Use consistent theme across multiple charts
const theme = 'classicDark';

const chart1 = new Chart({ container: 'chart1', theme });
const chart2 = new Chart({ container: 'chart2', theme });
const chart3 = new Chart({ container: 'chart3', theme });

// All share same visual style
```

### Custom Component Styling
```typescript
chart.interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .axis('x', {
    title: 'Categories',
    titleFontSize: 16,
    titleFontWeight: 'bold',
    label: {
      rotate: -45,
      fill: '#333',
      fontSize: 12
    },
    grid: true,
    gridStroke: '#e0e0e0',
    gridLineDash: [4, 4]
  })
  .axis('y', {
    title: 'Values',
    label: {
      formatter: (d) => `$${d.toFixed(2)}`
    }
  })
  .legend('color', {
    position: 'top-right',
    layout: 'horizontal',
    title: 'Legend',
    itemSpacing: 12
  });
```

## Testing Components and Compositions

When testing:
1. Verify component rendering
2. Test layout calculations
3. Verify facet subdivisions
4. Test theme application
5. Validate style overrides
6. Test interaction with components (e.g., slider filtering)

## Performance Considerations

1. **Limit facets**: Too many facets can be slow
2. **Simplify components**: Minimal styling for large charts
3. **Use appropriate compositions**: Layers are cheaper than facets
4. **Cache theme objects**: Don't recreate themes repeatedly
5. **Batch component updates**: Update multiple properties together

## Debugging Tips

### Inspect Component State
```typescript
chart.render().then(() => {
  console.log(chart.getComponents());  // All components
});
```

### Visualize Layout Bounds
```typescript
// Show component boundaries
chart.options({
  theme: {
    axis: {
      line: { stroke: 'red', lineWidth: 2 }
    }
  }
});
```

### Test Theme Application
```typescript
chart.theme('dark');
chart.render();

// Verify colors applied
const elements = chart.getCanvas().getChildren();
console.log(elements.map(e => e.attr('fill')));
```

## Best Practices

1. **Use appropriate components**: Don't overload with UI elements
2. **Keep facets simple**: Complex marks in facets hurt performance
3. **Test themes with data**: Colors may not work for all data
4. **Provide clear axis labels**: Essential for interpretation
5. **Position legends thoughtfully**: Consider space and readability
6. **Use consistent themes**: Within applications
7. **Document custom themes**: Make them reusable
8. **Test accessibility**: Ensure sufficient contrast in custom themes
9. **Responsive layouts**: Use spaceFlex for responsive designs
10. **Profile compositions**: Test performance with many facets
