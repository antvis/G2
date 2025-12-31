# G2 Visualization Library Overview

G2 is a grammar of graphics visualization library for building charts and data visualizations in JavaScript. This skill provides an overview of the G2 architecture and core concepts.

## Core Architecture

G2 follows a **grammar of graphics** approach with these main components:

### 1. **Library System** (`src/lib/`)
G2 provides multiple library configurations:
- **litelib**: Minimal library with basic marks
- **corelib**: Core functionality with all basic marks, scales, coordinates, and interactions
- **plotlib**: Statistical and analytical plots
- **graphlib**: Graph and network visualizations
- **geolib**: Geographic visualizations
- **stdlib**: Standard library combining most features

### 2. **API System** (`src/api/`)
The API is built on a fluent, chainable interface:
- **Runtime**: Core rendering engine
- **Chart**: Main entry point created by extending Runtime with a library
- **extend()**: Function to create custom Chart classes with specific library configurations
- **Mark Nodes**: Represent visual marks (geometric shapes)
- **Composition Nodes**: Represent composed/nested visualizations

### 3. **Marks** (`src/mark/`)
Geometric shapes for representing data:
- Basic: `interval`, `line`, `point`, `area`, `rect`, `cell`, `text`, `image`, `polygon`, `path`
- Advanced: `box`, `boxplot`, `vector`, `link`, `connector`, `density`, `heatmap`, `wordCloud`
- Statistical: `beeswarm`, `gauge`, `liquid`
- Hierarchical: `tree`, `treemap`, `pack`, `partition`, `sankey`
- Graph: `forceGraph`, `chord`

### 4. **Transforms** (`src/transform/`)
Data transformations applied to marks:
- **Layout**: `stackY`, `dodgeX`, `flexX`, `pack`
- **Aggregation**: `group`, `groupX`, `groupY`, `groupColor`, `bin`, `binX`
- **Filtering**: `filter`, `select`, `selectX`, `selectY`, `sample`
- **Sorting**: `sort`, `sortX`, `sortY`, `sortColor`
- **Statistical**: `normalizeY`, `symmetryY`, `diffY`
- **Positioning**: `jitter`, `jitterX`, `jitterY`
- **Auto-inference**: `maybe*` transforms (e.g., `maybeStackY`, `maybeZeroY`)

### 5. **Scales** (`src/scale/`)
Map data values to visual properties:
- Quantitative: `linear`, `log`, `pow`, `sqrt`, `time`, `sequential`
- Categorical: `ordinal`, `band`, `point`
- Special: `identity`, `threshold`, `quantile`, `quantize`, `constant`

### 6. **Coordinates** (`src/coordinate/`)
Transform the space in which marks are drawn:
- `cartesian` (default), `polar`, `transpose`, `theta`, `parallel`, `radial`, `radar`, `helix`, `fisheye`

### 7. **Encode** (`src/encode/`)
Map data fields to visual channels:
- **Channels**: x, y, color, size, shape, opacity, etc.
- **Types**: `field`, `constant`, `transform`, `column`

### 8. **Animations** (`src/animation/`)
Enter/exit/update animations:
- Enter: `fadeIn`, `scaleInX`, `scaleInY`, `growInX`, `growInY`, `waveIn`, `zoomIn`, `pathIn`
- Exit: `fadeOut`, `scaleOutX`, `scaleOutY`, `zoomOut`
- Update: `morphing`

### 9. **Interactions** (`src/interaction/`)
User interaction behaviors:
- Highlight: `elementHighlight`, `elementHighlightByX`, `elementHighlightByColor`, `legendHighlight`
- Select: `elementSelect`, `elementSelectByX`, `elementSelectByColor`
- Filter: `legendFilter`, `brushFilter`, `brushXFilter`, `brushYFilter`, `sliderFilter`, `scrollbarFilter`
- Brush: `brushHighlight`, `brushXHighlight`, `brushYHighlight`, `brushAxisHighlight`
- Other: `tooltip`, `fisheye`, `drillDown`, `elementHoverScale`, `elementPointMove`, `poptip`

### 10. **Components** (`src/component/`)
UI elements for the visualization:
- `axisX`, `axisY`, `legendCategory`, `legendContinuous`, `title`, `sliderX`, `sliderY`, `scrollbarX`, `scrollbarY`, `legends`

### 11. **Compositions** (`src/composition/`)
Combine multiple visualizations:
- `spaceLayer`, `spaceFlex`, `facetRect`, `facetCircle`, `repeatMatrix`, `timingKeyframe`

### 12. **Themes** (`src/theme/`)
Visual styling presets:
- `classic`, `classicDark`, `academy`, `light`, `dark`

### 13. **Data Transformations** (`src/data/`)
Pipeline transformations before visualization:
- Loading: `fetch`, `inline`
- Manipulation: `filter`, `map`, `sort`, `sortBy`, `slice`, `pick`, `rename`, `fold`, `join`
- Analysis: `kde` (kernel density estimation), `wordCloud`, `log`, `ema` (exponential moving average)
- Custom: `custom` for user-defined transformations

## Key Concepts

### Specification Pattern
G2 uses a declarative specification approach where visualizations are described as objects:
```typescript
{
  type: 'interval',          // Mark type
  data: [...],               // Data source
  encode: {                  // Map data to visual channels
    x: 'category',
    y: 'value',
    color: 'type'
  },
  transform: [               // Apply transformations
    { type: 'stackY' }
  ],
  scale: {                   // Configure scales
    y: { domain: [0, 100] }
  }
}
```

### Fluent API Pattern
G2 also provides a fluent, chainable API:
```typescript
chart
  .interval()               // Create mark
  .data(data)               // Bind data
  .encode('x', 'category')  // Map x channel
  .encode('y', 'value')     // Map y channel
  .transform({ type: 'stackY' });
```

### Extension Mechanism
G2 is highly extensible via the `register()` function:
```typescript
import { register } from '@antv/g2';

register('mark.customMark', CustomMark);
register('transform.customTransform', CustomTransform);
register('scale.customScale', CustomScale);
```

### Runtime and Rendering
- G2 uses the **@antv/g** rendering engine underneath
- Supports Canvas, SVG, and WebGL rendering
- Rendering is triggered by `chart.render()`

## File Structure

```
src/
├── api/           # Fluent API and extension system
├── mark/          # Visual mark implementations
├── transform/     # Data transformation implementations
├── scale/         # Scale implementations
├── coordinate/    # Coordinate system implementations
├── encode/        # Channel encoding implementations
├── animation/     # Animation implementations
├── interaction/   # Interaction implementations
├── component/     # Component implementations
├── composition/   # Composition implementations
├── theme/         # Theme definitions
├── data/          # Data transformation implementations
├── label-transform/ # Label layout transformations
├── palette/       # Color palette definitions
├── shape/         # Custom shape definitions
├── spec/          # TypeScript type definitions for specs
├── runtime/       # Core runtime and rendering
├── lib/           # Library presets
└── utils/         # Utility functions
```

## Common Patterns

### Creating a Chart
```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
});
```

### Adding Marks
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value');
```

### Applying Transforms
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'category')
  .transform({ type: 'stackY' });
```

### Configuring Interactions
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .interaction('elementHighlight', { background: true })
  .interaction('tooltip', { shared: true });
```

## Testing Structure

Tests are located in `__tests__/` directory:
- `__tests__/unit/`: Unit tests for individual components
- `__tests__/integration/`: Integration tests for complete charts

## Build Commands

- `npm run build`: Build all versions (CJS, ESM, UMD)
- `npm run build:cjs`: Build CommonJS version
- `npm run build:esm`: Build ES modules version
- `npm run build:umd`: Build UMD bundle
- `npm test`: Run all tests
- `npm run lint`: Check code style
- `npm run dev`: Start development server

## Key Dependencies

- `@antv/g`: Rendering engine (Canvas/SVG/WebGL)
- `@antv/coord`: Coordinate transformations
- `@antv/scale`: Scale implementations
- `@antv/component`: UI components
- `@antv/util`: Utility functions
