---
title: 概览
order: 1
---

G2 是一个简洁的、渐进式的可视化语法。文档将按照下面的顺序去分别介绍每一个模块，你可以把它当做一个字典去搜索和查询。

## [Data](/manual/core/data/overview)

获得和转换数据。

- [fetch](/manual/core/data/fetch) - 获取远程数据。
- [inline](/manual/core/data/inline) - 获取内联数据。

下面是支持的数据转换：

- [sort](/manual/core/data/sort) - 将数据按照指定的比较器字段排序。
- [sortBy](/manual/core/data/sort-by) - 将数据按照指定的字段排序。
- [pick](/manual/core/data/pick) - 从数据中挑选出部分字段组成新的数据。
- [rename](/manual/core/data/rename) - 重命名数据中的一些字段。
- [fold](/manual/core/data/fold) - 将多个字段打包成按照指定的 key value 组织形式。
- [filter](/manual/core/data/filter) - 对数据进行指定条件的过滤。
- [slice](/manual/core/data/slice) - 对数据进行分片，获得子集。
- [map](/manual/core/data/map) - 对数据进行映射，返回新的数组。
- [join](/manual/core/data/join) - 类似 SQL 的方式，将两份数据连接到一起。
- [custom](/manual/core/data/custom) - 使用自定义的方式对数据进行变换。
- [kde](/manual/core/data/kde) - 核密度处理算法。
- [log](/manual/core/data/log) - 用于开发者调试，打印当前数据处理片面的数据。

## Mark

绘制数据驱动的图形。

- [interval](/manual/core/mark/interval) - 通常用来绘制柱、条形图，饼图等相关图表。
- [point](/manual/core/mark/point) - 主要用于绘制散点图，利用点的粒度来分析数据的分布情况。
- [line](/manual/core/mark/line) - 根据一系列的点，绘制折线，通常用来绘制折线图。
- [area](/manual/core/mark/area) - 通常用来绘制我们常见的面积图，通过填充，可以更好突出趋势堆积信息。
- [cell](/manual/core/mark/cell) - 根据 x, y 将空间划分成一个子空间，然后进行可视化绘制，常见于一些方块图，如日历图、聚合热力图等。
- [rect](/manual/core/mark/rect) - 使用两组 x，两组 y 来定位一个矩形区域，常用于直方图、矩阵树图等。
- [link](/manual/core/mark/link) - 标记使用两个用 (x, y) 定位的点，绘制一条带方向的直线。通过指定 `x`，`y` 通道为长度为 2 的字段数组即可。
- [vector](/manual/core/mark/vector) - 用 `start`，`end` 两个点来表示一个向量，通常用于绘制具备向量含义的数据，比如风向量场等。
- [box](/manual/core/mark/box) - 用来绘制箱线图，通常用来展示一组数据分布情况的统计图。
- [boxplot](/manual/core/mark/boxplot) - 用来绘制箱线图，并且内置数据的聚合操作。
- [text](/manual/core/mark/text) - 通过指定文本的样式通道，可以在画布上绘制和数据绑定的文本字符。
- [image](/manual/core/mark/image) - 利用 `src` 通道在画布上绘制图片。
- [shape](/manual/core/mark/shape) - 使用自定义函数灵活绘制自定义图形。
- [lineX](/manual/core/mark/line-x) - 指定 `x` 通道来绘制垂直于 x 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。
- [lineY](/manual/core/mark/line-y) - 指定 `y` 通道来绘制垂直于 y 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。
- [range](/manual/core/mark/range) - 使用一组 `x`(x1, x2) 和一组 `y`(y1, y2) 来定位一个矩形区域，常用于绘制高亮指定区域的辅助区域。
- [rangeX](/manual/core/mark/range-x) - 使用一组 `x`(x1, x2) 来定位一个垂直于 x 轴的矩形区域，常用于绘制高亮指定区域的辅助区域。
- [rangeY](/manual/core/mark/range-y) - 使用一组 `y`(y1, y2) 来定位一个垂直于 y 轴的矩形区域，常用于绘制高亮指定区域的辅助区域。
- [polygon](/manual/core/mark/polygon) - 利用多组 (x, y) 数据点，在画布中绘制闭合的多边形，通常结合一些社区布局算法使用。
- [wordCloud](/manual/core/mark/word-cloud) - 绘制词云图。
- [density](/manual/core/mark/density) - 渲染核密度数据，多用于小提琴图。
- [heatmap](/manual/core/mark/heatmap) - 接受热力数据，多用于绘制热力图。

## Transform

派生数据。

- [bin](/manual/core/transform/bin) - 对连续的 x 和 连续的 y 通道进行分箱，并且对通道根据指定的 reducer 进行聚合。
- [binX](/manual/core/transform/bin-x) - 对 x 通道进行分箱，如果希望对 y 通道进行分箱，使用 binX + transpose 坐标系。
- [diffY](/manual/core/transform/diff-y) - 对 y 和 y1 通道求差集。
- [dodgeX](/manual/core/transform/dodge-x) - 生成 series 通道值为 color 通道的值，根据 series 通道实现分组效果。
- [flexX](/manual/core/transform/flex-x) - 根据指定通道设置 x 比例尺的 flex 属性，实现不等宽矩形的效果。
- [group](/manual/core/transform/group) - 对离散的 x 和 连续的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupColor](/manual/core/transform/group-color) - 对离散的 color 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupX](/manual/core/transform/group-x) - 对离散的 x 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupY](/manual/core/transform/group-y) - 对离散的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [jitter](/manual/core/transform/jitter) - 根据离散的 x 和 离散的 y 比例尺，生成 dy 和 dx 通道，实现在某个区域散开的效果。
- [jitterX](/manual/core/transform/jitter-x) - 根据离散的 x 比例尺，生成 dx 通道，实现在某个区域的 x 方向散开的效果。
- [jitterY](/manual/core/transform/jitter-y) - 根据离散的 y 比例尺，生成 dy 通道，实现在某个区域的 y 方向散开的效果。
- [normalizeY](/manual/core/transform/normalize-y) - 对 y 和 y1 通道根据指定的 basis 进行归一化处理。
- [select](/manual/core/transform/select) - 按照指定通道进行分组，根据指定通道和 selector 从每组选择出数据。
- [selectX](/manual/core/transform/select-x) - 按照指定通道进行分组，根据 x 通道和 selector 从每组选择出数据。
- [selectY](/manual/core/transform/select-y) - 按照指定的通道进行分组，根据 y 通道和 selector 从每组选择出数据。
- [pack](/manual/core/transform/pack) - 生成 transform 和 scale 属性，从而让图形在空间中紧凑排列。
- [sample](/manual/core/transform/sample) - 当数据量远大于屏幕像素的时候，开启一些内置的采样策略，提升图表绘制性能。
- [sortColor](/manual/core/transform/sort-color) - 对离散的 color 比例尺的定义域根据指定通道排序。
- [sortX](/manual/core/transform/sort-x) - 对离散的 x 比例尺的定义域根据指定通道排序。
- [sortY](/manual/core/transform/sort-y) - 对离散的 y 比例尺的定义域根据指定通道排序。
- [stackEnter](/manual/core/transform/stack-enter) - 对 enterDuration 和 enterDelay 通道进行堆叠，实现分组动画的效果。
- [stackY](/manual/core/transform/stack-y) - 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果。
- [symmetryY](/manual/core/transform/symmetr-y) - 按照指定通道分组，给每组的 y 和 y1 通道添加偏移，实现对称效果。

## Scale

将抽象的数据映射为视觉数据。

- [band](/manual/core/scale/band) - 特殊的 [ordinal](/manual/core/scale/ordinal) 比例尺，它的值域范围是一个连续的范围。
- [linear](/manual/core/scale/linear) - 针对连续数据，对数据进行连续映射的比例尺。
- [sqrt](/manual/core/scale/sqrt) - 指数固定为 `0.5` 的 `pow` 比例尺。
- [pow](/manual/core/scale/pow) - 类似于 `linear` 比例尺，但是映射函数为指数函数（exponential）。
- [log](/manual/core/scale/log) - 类似于 `linear` 比例尺，但是映射函数为对数函数（logarithmic）。
- [ordinal](/manual/core/scale/ordinal) - 将离散的数据映射到另外一个离散数据中。
- [point](/manual/core/scale/point) - 特殊 [band](/manual/core/scale/band) 比例尺，固定配置 `bandWith = 0`。
- [quantize](/manual/core/scale/quantize) - 类似于 `threshold`，但是计算切片的方式是基于元素的数据值。
- [quantile](/manual/core/scale/quantile) - 类似于 `threshold`， 但是计算切片的方式是基于元素在数据中的索引。
- [threshold](/manual/core/scale/threshold) - 将连续的值域范围划分为多个切片，并将这些切片映射到一个离散的数据中。
- [time](/manual/core/scale/time) - 特殊的 [linear](/manual/core/scale/linear) 比例尺，它的值域是一组有时间顺序的数据。

## Coordinate

对空间通道应用点变换。

- [polar](/manual/core/coordinate/polar) - 常用于绘制玫瑰图等。
- [theta](/manual/core/coordinate/theta) - 常用于绘制饼图等。
- [radial](/manual/core/coordinate/radial) - 常用于绘制玉珏图等。
- [parallel](/manual/core/coordinate/parallel) - 绘制平行坐标系。

以下是支持的坐标系变换。

- [transpose](/manual/core/coordinate/transpose) - 改变图表绘制方向。
- [fisheye](/manual/core/coordinate/fisheye) - 鱼眼坐标系。

## Composition

视图复合相关的内容。

- [spaceLayer](/manual/core/composition/space-layer) - 对空间不做任何划分，多个视图使用同一个空间区域，常用于视图的层叠。
- [spaceFlex](/manual/core/composition/space-flex) - 使用类似 css flex 的布局方式来划分空间区域，常用于多图表对比的视图。
- [facetRect](/manual/core/composition/facet-rect) - 用 row、column 字段维值对空间和数据进行划分，在各个子空间可视化数据片段。
- [facetCircle](/manual/core/composition/facet-circle) - 根据字段分片数据，利用圆形划分空间，然就进行各个分面的数据可视化。
- [repeatMatrix](/manual/core/composition/repeat-matrix) - 根据字段的数量对空间进行划分和可视化。
- [timingKeyframe](/manual/core/composition/timing-keyframe) - 在不同时间片之间播放不同的可视化视图帧。

## Component

绘制辅助视觉元素。

- [title](/manual/component/title) - 绘制图表标题和副标题。
- [axis](/manual/component/axis) - 绘制坐标轴。
- [legend](/manual/component/legend) - 绘制图例。
- [scrollbar](/manual/component/scrollbar) - 绘制滚动条。
- [slider](/manual/component/slider) - 绘制拖动条。

## [Label](/manual/component/label)

绘制数据标签和标签属性的变换。

- [contrastReverse](/manual/core/label/contrast-reverse) - 标签颜色在图形背景上对比度低的情况下，从指定色板选择一个对比度最优的颜色。
- [overflowHide](/manual/core/label/overflow-hide) - 对于标签在图形上放置不下的时候，隐藏标签。
- [overlapDodgeY](/manual/core/label/overlap-dodge-y) - 对位置碰撞的标签在 y 方向上进行调整，防止标签重叠。
- [overlapHide](/manual/core/label/overlap-hide) - 对位置碰撞的标签进行隐藏，默认保留前一个，隐藏后一个。

## [Animation](/manual/core/animate/overview)

数据驱动的动画和连续的形变动画。

- [fadeIn](/manual/core/animation/fade-in) - 渐现动画。
- [fadeOut](/manual/core/animation/fade-out) - 渐隐动画。
- [growInX](/manual/core/animation/grow-in-x) - 容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。
- [growInY](/manual/core/animation/grow-in-y) - 容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。
- [morphing](/manual/core/animation/morphing) - 图形之间的形变动画。
- [pathIn](/manual/core/animation/pathin) - Path 路径入场动画。
- [scaleInX](/manual/core/animation/scale-in-x) - 单个图形沿着 x 方向的生长动画。
- [scaleInY](/manual/core/animation/scale-in-y) - 单个图形沿着 y 方向的生长动画。
- [scaleOutX](/manual/core/animation/scale-out-x) - 单个图形沿着 x 方向的消退动画。
- [scaleOutY](/manual/core/animation/scale-out-y) - 单个图形沿着 y 方向的消退动画。
- [waveIn](/manual/core/animation/wave-in) - 划入入场动画效果，不同坐标系下效果不同。
- [zoomIn](/manual/core/animation/zoom-in) - 沿着图形中心点的放大动画。
- [zoomOut](/manual/core/animation/zoom-out) - 沿着图形中心点的缩小动画。

## Interaction

操作视图并且展现详细信息。

- [brushFilter](/manual/core/interaction/brush-filter) - 框选筛选。
- [brushXFilter](/manual/core/interaction/brush-x-filter) - x 方向框选筛选。
- [brushYFilter](/manual/core/interaction/brush-y-filter) - y 方向框选筛选。
- [brushHighlight](/manual/core/interaction/brush-highlight) - 框选高亮。
- [brushXHighlight](/manual/core/interaction/brush-x-highlight) - x 方向框选高亮。
- [brushYHighlight](/manual/core/interaction/brush-y-Higlight) - y 方向框选高亮。
- [brushAxisHighlight](/manual/core/interaction/brush-axis-higlight) - 坐标轴框选高亮。
- [legendHighlight](/manual/core/interaction/legend-highlight) - 图例高亮。
- [legendFilter](/manual/core/interaction/legend-filter) - 图例筛选。
- [tooltip](/manual/core/interaction/tooltip) - 展现提示信息。
- [elementHighlight](/manual/core/interaction/element-highlight) - 高亮元素。
- [elementHighlightByX](/manual/core/interaction/element-highlight-by-x) - 高亮具有相同 x 通道值的元素。
- [elementHighlightByColor](/manual/core/interaction/element-highlight-by-color) - 高亮具有相同 color 通道的元素。
- [elementSelect](/manual/core/interaction/element-select) - 选择元素。
- [elementSelectByX](/manual/core/interaction/element-select-by-x) - 选择拥有相同 x 通道值的元素。
- [elementSelectByColor](/manual/core/interaction/element-select-by-color) - 选择拥有相同 color 通道值的元素。
- [fisheye](/manual/core/interaction/fisheye) - 鱼眼交互。
- [charIndex](/manual/core/interaction/chart-index) - 索引图表。
- [poptip](/manual/core/interaction/poptip) - 展现提示文本。
- [sliderFilter](/manual/core/interaction/slider-filter) - 拖动条筛选。

## Graph

关系图相关的绘制。

- [sankey](/manual/extra-topics/graph/sankey) - 绘制桑基图。
- [treemap](/manual/extra-topics/graph/treemap) - 绘制矩阵树图。
- [pack](/manual/extra-topics/graph/pack) - 绘制打包图。
- [forceGraph](/manual/extra-topics/graph/force-graph) - 绘制力导向图。
- [tree](/manual/extra-topics/graph/tree) - 绘制树图。

## Geo

地图相关的图形绘制。

- [geoPath](/manual/extra-topics/geo/geo-path) - 可以用来结合 geojson 绘制地图。
- [geoView](/manual/extra-topics/geo/geo-view) - 绘制地图的容器，用于多 geoPath 图层叠加。

## [Theme](/manual/core/theme/overview)

主题相关内容。

- [academy](/manual/core/theme/academy) - 学术风格的主题。
- [classic](/manual/core/theme/classic) - 经典主题。
- [classicDark](/manual/core/theme/classic-dark) - 经典暗黑主题。

## Plugin

基于 G 插件相关的内容。

- [renderer](/manual/extra-topics/plugin/renderer) - `Canvas`、`SVG` 两大渲染器。
- [rough](/manual/extra-topics/plugin/rough) - 绘制手绘图的插件。
- [lottie](/manual/extra-topics/plugin/lottie) - 可以在图表中播放 lottie 动画的插件。


## Common

公共配置。

- [style](/manual/core/style) - 绘制图表标题和副标题。
