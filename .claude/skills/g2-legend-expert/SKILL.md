---
name: G2 Legend Expert
description: Expert skill for G2 legend development - provides comprehensive knowledge about legend rendering implementation, component architecture, layout algorithms, and interaction handling. Use when implementing, customizing, or debugging legend functionality in G2 visualizations.
---

# G2 Legend Expert Skill

## Overview

This skill provides comprehensive knowledge about legend rendering in G2, covering the complete legend rendering flow from component creation to layout calculation and interaction handling.

## Legend Rendering Flow in G2

The legend rendering flow in G2 follows a multi-stage process that transforms legend configuration into visual components. This flow involves several key stages:

### 1. Legend Component Inference

Legend components are inferred from the chart's scales and configuration during the initial setup phase. The inference process is handled by the `inferComponent` function in `src/runtime/component.ts`:

- **Scale Analysis**: The system analyzes all scales in the chart, looking for channels like `shape`, `size`, `color`, and `opacity`
- **Legend Type Detection**: Based on the scale types, the system determines whether to create `legendCategory` (for discrete scales) or `legendContinuous` (for continuous scales)
- **Position Inference**: Default positions and orientations are inferred based on the chart type and coordinate system

### 2. Legend Component Creation

Two main legend component types are implemented:

#### LegendCategory

Located in `src/component/legendCategory.ts`, this component handles categorical legends:

- **Data Processing**: Processes domain values from scales to create legend items
- **Marker Inference**: Automatically infers appropriate markers based on the chart's shapes and scales
- **Layout Wrapper**: Uses `LegendCategoryLayout` to handle layout positioning
- **Rendering Options**: Supports both standard GUI rendering and custom HTML rendering via the `render` option

#### LegendContinuous

Located in `src/component/legendContinuous.ts`, this handles continuous legends:

- **Scale Type Handling**: Supports various continuous scale types including linear, log, time, quantize, quantile, and threshold
- **Configuration Inference**: Generates appropriate configuration based on scale properties
- **Ribbon Generation**: Creates color ribbons for continuous scales
- **Label Formatting**: Handles proper formatting of continuous scale labels

### 3. Layout and Sizing Calculation

The layout process is managed in `src/runtime/layout.ts` and involves several critical steps:

#### Component Size Computation

The `computeComponentSize` function handles sizing based on component type:

- **Auto vs Manual Padding**: When padding is set to 'auto', the system dynamically calculates component size based on content. When manually set, it uses default sizes.
- **Size Calculation**: Different calculation strategies for different component types (axis, legend, title, etc.)
- **Cross-size Considerations**: Takes into account cross-size dimensions for proper layout

#### Padding Calculation Logic

The core layout logic is in the `computePadding` function:

```typescript
const autoSizeOf = (d) => {
  if (d.size) return;
  if (value !== 'auto') sizeOf(d);
  else {
    // Compute component size dynamically
    computeComponentSize(
      d,
      crossSize,
      crossPadding,
      position,
      theme,
      library,
    );
    defaultSizeOf(d);
  }
};
```

- **Auto Padding ('auto')**: Calls `computeComponentSize` to measure actual content dimensions
- **Manual Padding**: Uses `defaultSize` directly, bypassing content measurement

### 4. Component Rendering

The `renderComponent` function in `src/runtime/component.ts` handles the actual rendering:

- **Component Instantiation**: Creates the appropriate component based on type
- **Context Injection**: Provides scale instances, theme, and other context information
- **Display Object Creation**: Returns a DisplayObject that can be added to the chart

### 5. Legend Positioning and BBox Assignment

After size calculation, the `placeComponents` function assigns bounding boxes:

- **Position-based Grouping**: Components are grouped by position (top, bottom, left, right, center)
- **Area Calculation**: Each position gets a specific area in the chart layout
- **Dimension Assignment**: Components receive their final x, y, width, and height values

## Legend Types and Configuration

### Categorical Legends

Categorical legends (LegendCategory) are used for discrete scales and support:

- **Item Markers**: Automatic marker generation based on chart types
- **Flexible Layouts**: Supports both flex and grid layouts
- **Custom Rendering**: HTML-based custom rendering via the `render` option
- **Interaction Features**: Support for filtering and focus modes

### Continuous Legends

Continuous legends (LegendContinuous) handle continuous scales:

- **Color Ranges**: Support for various color interpolation methods
- **Scale Types**: Handles linear, log, time, and quantile scales
- **Threshold Handling**: Special support for threshold scales with custom boundaries
- **Size Control**: Configurable ribbon sizes and label spacing

## Interaction Handling

### Legend Filtering

The legend filtering interaction is implemented in `src/interaction/legendFilter.ts`:

- **Event Delegation**: Handles click, pointerenter, and pointerout events
- **State Management**: Maintains selection states and visual feedback
- **Filter Propagation**: Updates chart data based on legend selections
- **Cross-chart Coordination**: Supports filtering across multiple chart views

### Visual States

Legends support multiple visual states:

- **Selected/Unselected**: Visual distinction between selected and unselected items
- **Hover States**: Pointer interaction feedback
- **Focus Mode**: Special highlighting for focused items

## Customization and Theming

### Theme Integration

Legend components integrate with G2's theming system:

- **Theme Properties**: Respects theme settings for colors, fonts, and spacing
- **Component-specific Themes**: Separate theme settings for different legend types
- **Style Override**: Allows specific style overrides via component options

### Layout Customization

- **Position Control**: Configurable positions (top, bottom, left, right, center)
- **Size Control**: Manual or automatic size calculation
- **Padding Control**: Configurable padding and spacing
- **Orientation Control**: Horizontal or vertical orientation options

## Best Practices

### Performance Considerations

- **Efficient Data Processing**: Minimize legend data processing for large datasets
- **Optimized Rendering**: Use appropriate rendering strategies for different legend types
- **Event Handling**: Properly manage and clean up event listeners

### Accessibility

- **Label Clarity**: Ensure legend labels are clear and descriptive
- **Color Contrast**: Maintain sufficient contrast for color accessibility
- **Interaction Feedback**: Provide clear visual feedback for interactions

## Troubleshooting Common Issues

### Layout Issues

When `paddingTop` is manually set (e.g., `paddingTop: 72`), the height of `legendCategory` changes unexpectedly (e.g., from 60px to 40px). This occurs because:

1. When padding is manually set, the layout engine uses the component's `defaultSize` instead of measuring actual content
2. For `LegendCategory`, the default size is 40 (defined in `src/component/legendCategory.ts`)
3. To fix this, explicitly set the `size` property in the legend configuration to override the default

### Interaction Issues

- **Event Bubbling**: Ensure proper event handling to prevent unwanted interactions
- **State Synchronization**: Keep legend states synchronized across different chart views
- **Performance**: Use throttling for filter events to prevent excessive updates

## References

For more detailed information on legend layout mechanisms and related topics, see the knowledge directory:

- **Legend Layout Mechanisms**: `./knowledge/legendLayout.md` - Detailed analysis of padding behavior and layout calculations
  - Manual Padding Effects: How manually set padding values affect legend sizing
  - Default Size Fallback: Behavior when padding is set manually vs. 'auto'
  - Layout Calculation Logic: The core algorithm in `computePadding` function
