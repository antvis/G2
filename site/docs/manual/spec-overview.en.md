---
title: Spec Overview
order: 2
---

The upcoming documentation will introduce each module in sequence, and you can use this page as a dictionary for searching and referencing.  

## [Data](/manual/core/data/overview)

Acquire and transform data.

- [fetch](/manual/core/data/fetch) - Fetch remote data.
- [inline](/manual/core/data/inline) - Retrieve inline data.

The following data transformations are supported:

- [sort](/manual/core/data/sort) - Sort data by a specified comparator field.
- [sortBy](/manual/core/data/sort-by) - Sort data by a specified field.
- [pick](/manual/core/data/pick) - Select specific fields from the data to form new data.
- [rename](/manual/core/data/rename) - Rename some fields in the data.
- [fold](/manual/core/data/fold) - Pack multiple fields into a key-value format.
- [filter](/manual/core/data/filter) - Filter data based on specified conditions.
- [slice](/manual/core/data/slice) - Slice data to get subsets.
- [map](/manual/core/data/map) - Map data to return a new array.
- [join](/manual/core/data/join) - Join two datasets in an SQL-like manner.
- [custom](/manual/core/data/custom) - Use custom methods to transform data.
- [kde](/manual/core/data/kde) - Kernel density estimation algorithm.
- [log](/manual/core/data/log) - For developer debugging, log data snippets currently being processed.

## Mark

Draw data-driven graphics.

- [interval](/manual/core/mark/interval) - Typically used for bar charts, column charts, pie charts, etc.
- [point](/manual/core/mark/point) - Mainly for scatter plots, using point granularity to analyze data distribution.
- [line](/manual/core/mark/line) - Draw lines based on a series of points, usually for line charts.
- [area](/manual/core/mark/area) - Often used for area charts, filling areas to highlight accumulated trends.
- [cell](/manual/core/mark/cell) - Divide the space into subspaces based on x, y, and visualize, commonly used in heatmaps, calendar charts, etc.
- [rect](/manual/core/mark/rect) - Locate a rectangle using two sets of x and y, commonly used for histograms, treemaps, etc.
- [link](/manual/core/mark/link) - Draw a directed line using two points located by (x, y). Specify `x` and `y` channels as a field array of length 2.
- [vector](/manual/core/mark/vector) - Represent a vector using `start` and `end` points, often for data with vector meanings like wind fields.
- [box](/manual/core/mark/box) - Draw box plots, typically to display the statistical distribution of a data set.
- [boxplot](/manual/core/mark/boxplot) - Draw box plots with built-in data aggregation.
- [text](/manual/core/mark/text) - Specify text style channels to render text characters bound to data on the canvas.
- [image](/manual/core/mark/image) - Use the `src` channel to draw images on the canvas.
- [shape](/manual/core/mark/shape) - Flexibly draw custom shapes with custom functions.
- [lineX](/manual/core/mark/line-x) - Draw an auxiliary line perpendicular to the x-axis, often for average values or other aggregated data.
- [lineY](/manual/core/mark/line-y) - Draw an auxiliary line perpendicular to the y-axis, often for average values or other aggregated data.
- [range](/manual/core/mark/range) - Locate a rectangle with `x`(x1, x2) and `y`(y1, y2) to draw a highlight area.
- [rangeX](/manual/core/mark/range-x) - Use `x`(x1, x2) to locate a rectangle perpendicular to the x-axis.
- [rangeY](/manual/core/mark/range-y) - Use `y`(y1, y2) to locate a rectangle perpendicular to the y-axis.
- [polygon](/manual/core/mark/polygon) - Draw closed polygons using multiple (x, y) data points.
- [wordCloud](/manual/core/mark/word-cloud) - Render a word cloud.
- [density](/manual/core/mark/density) - Render kernel density data, often for violin plots.
- [heatmap](/manual/core/mark/heatmap) - Accept heatmap data to draw heatmaps.

## Transform

Derive data.

- [bin](/manual/core/transform/bin) - Bin continuous x and y channels and aggregate using a specified reducer.
- [binX](/manual/core/transform/bin-x) - Bin the x channel; for the y channel, use binX + transpose coordinate.
- [diffY](/manual/core/transform/diff-y) - Compute the difference between y and y1 channels.
- [dodgeX](/manual/core/transform/dodge-x) - Generate series channel values from the color channel to achieve a grouping effect.
- [flexX](/manual/core/transform/flex-x) - Set x scale's flex attribute for uneven-width rectangles using a specified channel.
- [group](/manual/core/transform/group) - Group discrete x and continuous y channels and aggregate with a specified Reducer.
- [groupColor](/manual/core/transform/group-color) - Group discrete color channels and aggregate with a specified Reducer.
- [groupX](/manual/core/transform/group-x) - Group discrete x channels and aggregate with a specified Reducer.
- [groupY](/manual/core/transform/group-y) - Group discrete y channels and aggregate with a specified Reducer.
- [jitter](/manual/core/transform/jitter) - Use discrete x and y scales to generate dy and dx channels to scatter within an area.
- [jitterX](/manual/core/transform/jitter-x) - Generate dx channels for scattering along the x-direction.
- [jitterY](/manual/core/transform/jitter-y) - Generate dy channels for scattering along the y-direction.
- [normalizeY](/manual/core/transform/normalize-y) - Normalize y and y1 channels based on a specified basis.
- [select](/manual/core/transform/select) - Group and select data using specified channels and a selector.
- [selectX](/manual/core/transform/select-x) - Group and select data by the x channel and a selector.
- [selectY](/manual/core/transform/select-y) - Group and select data by the y channel and a selector.
- [pack](/manual/core/transform/pack) - Generate transform and scale attributes for compact spatial arrangement of graphics.
- [sample](/manual/core/transform/sample) - Enable sampling strategies to enhance chart rendering when data exceeds screen pixels.
- [sortColor](/manual/core/transform/sort-color) - Sort the domain of a discrete color scale by a specified channel.
- [sortX](/manual/core/transform/sort-x) - Sort the domain of a discrete x scale by a specified channel.
- [sortY](/manual/core/transform/sort-y) - Sort the domain of a discrete y scale by a specified channel.
- [stackEnter](/manual/core/transform/stack-enter) - Stack enterDuration and enterDelay channels for grouped animation effects.
- [stackY](/manual/core/transform/stack-y) - Stack y and y1 channels for each group to achieve stacking effects.
- [symmetryY](/manual/core/transform/symmetr-y) - Add offsets to y and y1 channels for symmetric effects by grouping with specified channels.

## Scale

Map abstract data to visual data.

- [band](/manual/core/scale/band) - A special [ordinal](/manual/core/scale/ordinal) scale with a continuous range.
- [linear](/manual/core/scale/linear) - A scale for continuous mapping of continuous data.
- [sqrt](/manual/core/scale/sqrt) - A `pow` scale with a fixed exponent of `0.5`.
- [pow](/manual/core/scale/pow) - Similar to `linear` but with an exponential mapping function.
- [log](/manual/core/scale/log) - Similar to `linear` but with a logarithmic mapping function.
- [ordinal](/manual/core/scale/ordinal) - Maps discrete data to other discrete data.
- [point](/manual/core/scale/point) - A special [band](/manual/core/scale/band) scale with `bandWidth = 0`.
- [quantize](/manual/core/scale/quantize) - Similar to `threshold` but slices based on data value.
- [quantile](/manual/core/scale/quantile) - Similar to `threshold` but slices based on data index.
- [threshold](/manual/core/scale/threshold) - Divides a continuous range into slices and maps to discrete data.
- [time](/manual/core/scale/time) - A special [linear](/manual/core/scale/linear) scale for time-ordered data.

## Coordinate

Apply transformations to spatial channels.

- [polar](/manual/core/coordinate/polar) - Commonly used for rose charts.
- [theta](/manual/core/coordinate/theta) - Commonly used for pie charts.
- [radial](/manual/core/coordinate/radial) - Commonly used for radial diagrams.
- [parallel](/manual/core/coordinate/parallel) - Used to draw parallel coordinates.

Supported coordinate transformations:

- [transpose](/manual/core/coordinate/transpose) - Change chart drawing direction.
- [fisheye](/manual/core/coordinate/fisheye) - Fisheye coordinate system.

## Composition

Content related to view composition.

- [spaceLayer](/manual/core/composition/space-layer) - No spatial division; multiple views share the same space, often for layered views.
- [spaceFlex](/manual/core/composition/space-flex) - Use a CSS flex-like layout for spatial division, often for multi-chart comparisons.
- [facetRect](/manual/core/composition/facet-rect) - Divide space and data by row and column dimensions and visualize data fragments in subspaces.
- [facetCircle](/manual/core/composition/facet-circle) - Partition data by fields and use circles to divide space for faceted data visualization.
- [repeatMatrix](/manual/core/composition/repeat-matrix) - Divide space and visualize by the number of fields.
- [timingKeyframe](/manual/core/composition/timing-keyframe) - Play different visualization frames between time slices.

## Component

Draw auxiliary visual elements.

- [title](/manual/component/title) - Draw chart titles and subtitles.
- [axis](/manual/component/axis) - Draw axes.
- [legend](/manual/component/legend) - Draw legends.
- [scrollbar](/manual/component/scrollbar) - Draw scrollbars.
- [slider](/manual/component/slider) - Draw sliders.

## [Label](/manual/core/label/overview)

Draw data labels and transform label properties.

- [contrastReverse](/manual/core/label/contrast-reverse) - Choose optimal contrast color from a palette when label contrast is low on the background.
- [overflowHide](/manual/core/label/overflow-hide) - Hide labels when they can't fit on graphics.
- [overlapDodgeY](/manual/core/label/overlap-dodge-y) - Adjust overlapping labels on the y-axis to prevent overlap.
- [overlapHide](/manual/core/label/overlap-hide) - Hide overlapping labels, defaulting to keep the first and hide the second.

## [Animation](/manual/core/animate/overview)

Data-driven and morphing animations.

- [fadeIn](/manual/core/animate/fade-in) - Fade-in animation.
- [fadeOut](/manual/core/animate/fade-out) - Fade-out animation.
- [growInX](/manual/core/animate/grow-in-x) - Matrix animation expanding along x, often used for G.Group containers.
- [growInY](/manual/core/animate/grow-in-y) - Matrix animation expanding along y, often used for G.Group containers.
- [morphing](/manual/core/animate/morphing) - Shape-changing animation between graphics.
- [pathIn](/manual/core/animate/pathin) - Path entry animation.
- [scaleInX](/manual/core/animate/scale-in-x) - Growth animation along x for individual graphics.
- [scaleInY](/manual/core/animate/scale-in-y) - Growth animation along y for individual graphics.
- [scaleOutX](/manual/core/animate/scale-out-x) - Fade animation along x for individual graphics.
- [scaleOutY](/manual/core/animate/scale-out-y) - Fade animation along y for individual graphics.
- [waveIn](/manual/core/animate/wave-in) - Wave-in animation, varying by coordinate system.
- [zoomIn](/manual/core/animate/zoom-in) - Zoom-in animation centered on graphics.
- [zoomOut](/manual/core/animate/zoom-out) - Zoom-out animation centered on graphics.

## Interaction

Interact with the view to display detailed information.

- [brushFilter](/manual/core/interaction/brush-filter) - Lasso filter.
- [brushXFilter](/manual/core/interaction/brush-x-filter) - X-direction lasso filter.
- [brushYFilter](/manual/core/interaction/brush-y-filter) - Y-direction lasso filter.
- [brushHighlight](/manual/core/interaction/brush-highlight) - Lasso highlight.
- [brushXHighlight](/manual/core/interaction/brush-x-highlight) - X-direction lasso highlight.
- [brushYHighlight](/manual/core/interaction/brush-y-highlight) - Y-direction lasso highlight.
- [brushAxisHighlight](/manual/core/interaction/brush-axis-highlight) - Axis lasso highlight.
- [legendHighlight](/manual/core/interaction/legend-highlight) - Legend highlight.
- [legendFilter](/manual/core/interaction/legend-filter) - Legend filter.
- [tooltip](/manual/core/interaction/tooltip) - Display tooltip information.
- [elementHighlight](/manual/core/interaction/element-highlight) - Highlight elements.
- [elementHighlightByX](/manual/core/interaction/element-highlight-by-x) - Highlight elements with the same x channel value.
- [elementHighlightByColor](/manual/core/interaction/element-highlight-by-color) - Highlight elements with the same color channel.
- [elementSelect](/manual/core/interaction/element-select) - Select elements.
- [elementSelectByX](/manual/core/interaction/element-select-by-x) - Select elements with the same x channel value.
- [elementSelectByColor](/manual/core/interaction/element-select-by-color) - Select elements with the same color channel.
- [fisheye](/manual/core/interaction/fisheye) - Fisheye interaction.
- [chartIndex](/manual/core/interaction/chart-index) - Chart index.
- [poptip](/manual/core/interaction/poptip) - Display pop-up text.
- [sliderFilter](/manual/core/interaction/slider-filter) - Slider filter.

## Graph

Drawing related to relationship graphs.

- [sankey](/manual/extra-topics/graph/sankey) - Draw a Sankey diagram.
- [treemap](/manual/extra-topics/graph/treemap) - Draw a treemap.
- [pack](/manual/extra-topics/graph/pack) - Draw a pack layout.
- [forceGraph](/manual/extra-topics/graph/force-graph) - Draw a force-directed graph.
- [tree](/manual/extra-topics/graph/tree) - Draw a tree diagram.

## Geo

Drawing graphics related to maps.

- [geoPath](/manual/extra-topics/geo/geo-path) - Used to draw maps with geojson.
- [geoView](/manual/extra-topics/geo/geo-view) - Container for drawing maps, used for layering multiple geoPath layers.

## [Theme](/manual/core/theme/overview)

Theme-related content.

- [academy](/manual/core/theme/academy) - Academic style theme.
- [classic](/manual/core/theme/classic) - Classic theme.
- [classicDark](/manual/core/theme/classic-dark) - Classic dark theme.

## Plugin

Content related to G plugins.

- [renderer](/manual/extra-topics/plugin/renderer) - `Canvas`, `SVG` rendering engines.
- [rough](/manual/extra-topics/plugin/rough) - Plugin for drawing hand-drawn graphics.
- [lottie](/manual/extra-topics/plugin/lottie) - Plugin for playing Lottie animations in charts.

## Common

Common configurations.

- [style](/manual/core/style) - Draw chart titles and subtitles.  
