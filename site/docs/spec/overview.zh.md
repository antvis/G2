---
title: 概览
order: 1
---

G2 是一个简洁的、渐进式的可视化语法。文档将按照下面的顺序去分别介绍每一个模块，你可以把它当做一个字典去搜索和查询。

## [Data](/spec/data/overview)

获得和转换数据。

- [fetch](/spec/data/fetch) - 获取远程数据。
- [inline](/spec/data/inline) - 获取内联数据。

下面是支持的数据转换：

- [sort](/spec/data/sort) - 将数据按照指定的比较器字段排序。
- [sortBy](/spec/data/sort-by) - 将数据按照指定的字段排序。
- [pick](/spec/data/pick) - 从数据中挑选出部分字段组成新的数据。
- [rename](/spec/data/rename) - 重命名数据中的一些字段。
- [fold](/spec/data/fold) - 将多个字段打包成按照指定的 key value 组织形式。
- [filter](/spec/data/filter) - 对数据进行指定条件的过滤。
- [slice](/spec/data/slice) - 对数据进行分片，获得子集。
- [map](/spec/data/map) - 对数据进行映射，返回新的数组。
- [join](/spec/data/join) - 类似 SQL 的方式，将两份数据连接到一起。
- [custom](/spec/data/custom) - 使用自定义的方式对数据进行变换。
- [kde](/spec/data/kde) - 核密度处理算法。
- [log](/spec/data/log) - 用于开发者调试，打印当前数据处理片面的数据。

## Mark

绘制数据驱动的图形。

- [interval](/spec/mark/interval) - 通常用来绘制柱、条形图，饼图等相关图表。
- [point](/spec/mark/point) - 主要用于绘制散点图，利用点的粒度来分析数据的分布情况。
- [line](/spec/mark/line) - 根据一系列的点，绘制折线，通常用来绘制折线图。
- [area](/spec/mark/area) - 通常用来绘制我们常见的面积图，通过填充，可以更好突出趋势堆积信息。
- [cell](/spec/mark/cell) - 根据 x, y 将空间划分成一个子空间，然后进行可视化绘制，常见于一些方块图，如日历图、聚合热力图等。
- [rect](/spec/mark/rect) - 使用两组 x，两组 y 来定位一个矩形区域，常用于直方图、矩阵树图等。
- [link](/spec/mark/link) - 标记使用两个用 (x, y) 定位的点，绘制一条带方向的直线。通过指定 `x`，`y` 通道为长度为 2 的字段数组即可。
- [vector](/spec/mark/vector) - 用 `start`，`end` 两个点来表示一个向量，通常用于绘制具备向量含义的数据，比如风向量场等。
- [box](/spec/mark/box) - 用来绘制箱线图，通常用来展示一组数据分布情况的统计图。
- [boxplot](/spec/mark/boxplot) - 用来绘制箱线图，并且内置数据的聚合操作。
- [text](/spec/mark/text) - 通过指定文本的样式通道，可以在画布上绘制和数据绑定的文本字符。
- [image](/spec/mark/image) - 利用 `src` 通道在画布上绘制图片。
- [shape](/spec/mark/shape) - 使用自定义函数灵活绘制自定义图形。
- [lineX](/spec/mark/line-x) - 指定 `x` 通道来绘制垂直于 x 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。
- [lineY](/spec/mark/line-y) - 指定 `y` 通道来绘制垂直于 y 轴的辅助线，常用于绘制平均值或其他聚合数据辅助线。
- [range](/spec/mark/range) - 使用一组 `x`(x1, x2) 和一组 `y`(y1, y2) 来定位一个矩形区域，常用于绘制高亮指定区域的辅助区域。
- [rangeX](/spec/mark/range-x) - 使用一组 `x`(x1, x2) 来定位一个垂直于 x 轴的矩形区域，常用于绘制高亮指定区域的辅助区域。
- [rangeY](/spec/mark/range-y) - 使用一组 `y`(y1, y2) 来定位一个垂直于 y 轴的矩形区域，常用于绘制高亮指定区域的辅助区域。
- [polygon](/spec/mark/polygon) - 利用多组 (x, y) 数据点，在画布中绘制闭合的多边形，通常结合一些社区布局算法使用。
- [wordCloud](/spec/mark/word-cloud) - 绘制词云图。
- [density](/spec/mark/density) - 渲染核密度数据，多用于小提琴图。
- [heatmap](/spec/mark/heatmap) - 接受热力数据，多用于绘制热力图。

## Transform

派生数据。

- [bin](/spec/transform/bin) - 对连续的 x 和 连续的 y 通道进行分箱，并且对通道根据指定的 reducer 进行聚合。
- [binX](/spec/transform/bin-x) - 对 x 通道进行分箱，如果希望对 y 通道进行分箱，使用 binX + transpose 坐标系。
- [diffY](/spec/transform/diff-y) - 对 y 和 y1 通道求差集。
- [dodgeX](/spec/transform/dodge-x) - 生成 series 通道值为 color 通道的值，根据 series 通道实现分组效果。
- [flexX](/spec/transform/flex-x) - 根据指定通道设置 x 比例尺的 flex 属性，实现不等宽矩形的效果。
- [group](/spec/transform/group) - 对离散的 x 和 连续的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupColor](/spec/transform/group-color) - 对离散的 color 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupX](/spec/transform/group-x) - 对离散的 x 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [groupY](/spec/transform/group-y) - 对离散的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。
- [jitter](/spec/transform/jitter) - 根据离散的 x 和 离散的 y 比例尺，生成 dy 和 dx 通道，实现在某个区域散开的效果。
- [jitterX](/spec/transform/jitter-x) - 根据离散的 x 比例尺，生成 dx 通道，实现在某个区域的 x 方向散开的效果。
- [jitterY](/spec/transform/jitter-y) - 根据离散的 y 比例尺，生成 dy 通道，实现在某个区域的 y 方向散开的效果。
- [normalizeY](/spec/transform/normalize-y) - 对 y 和 y1 通道根据指定的 basis 进行归一化处理。
- [select](/spec/transform/select) - 按照指定通道进行分组，根据指定通道和 selector 从每组选择出数据。
- [selectX](/spec/transform/select-x) - 按照指定通道进行分组，根据 x 通道和 selector 从每组选择出数据。
- [selectY](/spec/transform/select-y) - 按照指定的通道进行分组，根据 y 通道和 selector 从每组选择出数据。
- [pack](/spec/transform/pack) - 生成 transform 和 scale 属性，从而让图形在空间中紧凑排列。
- [sample](/spec/transform/sample) - 当数据量远大于屏幕像素的时候，开启一些内置的采样策略，提升图表绘制性能。
- [sortColor](/spec/transform/sort-color) - 对离散的 color 比例尺的定义域根据指定通道排序。
- [sortX](/spec/transform/sort-x) - 对离散的 x 比例尺的定义域根据指定通道排序。
- [sortY](/spec/transform/sort-y) - 对离散的 y 比例尺的定义域根据指定通道排序。
- [stackEnter](/spec/transform/stack-enter) - 对 enterDuration 和 enterDelay 通道进行堆叠，实现分组动画的效果。
- [stackY](/spec/transform/stack-y) - 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果。
- [symmetryY](/spec/transform/symmetr-y) - 按照指定通道分组，给每组的 y 和 y1 通道添加偏移，实现对称效果。

## Scale

将抽象的数据映射为视觉数据。

- [band](/spec/scale/band) - 特殊的 [ordinal](/spec/scale/ordinal) 比例尺，它的值域范围是一个连续的范围。
- [linear](/spec/scale/linear) - 针对连续数据，对数据进行连续映射的比例尺。
- [sqrt](/spec/scale/sqrt) - 指数固定为 `0.5` 的 `pow` 比例尺。
- [pow](/spec/scale/pow) - 类似于 `linear` 比例尺，但是映射函数为指数函数（exponential）。
- [log](/spec/scale/log) - 类似于 `linear` 比例尺，但是映射函数为对数函数（logarithmic）。
- [ordinal](/spec/scale/ordinal) - 将离散的数据映射到另外一个离散数据中。
- [point](/spec/scale/point) - 特殊 [band](/spec/scale/band) 比例尺，固定配置 `bandWith = 0`。
- [quantize](/spec/scale/quantize) - 类似于 `threshold`，但是计算切片的方式是基于元素的数据值。
- [quantile](/spec/scale/quantile) - 类似于 `threshold`， 但是计算切片的方式是基于元素在数据中的索引。
- [threshold](/spec/scale/threshold) - 将连续的值域范围划分为多个切片，并将这些切片映射到一个离散的数据中。
- [time](/spec/scale/time) - 特殊的 [linear](/spec/scale/linear) 比例尺，它的值域是一组有时间顺序的数据。

## Coordinate

对空间通道应用点变换。

- [polar](/spec/coordinate/polar) - 常用于绘制玫瑰图等。
- [theta](/spec/coordinate/theta) - 常用于绘制饼图等。
- [radial](/spec/coordinate/radial) - 常用于绘制玉珏图等。
- [parallel](/spec/coordinate/parallel) - 绘制平行坐标系。

以下是支持的坐标系变换。

- [transpose](/spec/coordinate/transpose) - 改变图表绘制方向。
- [fisheye](/spec/coordinate/fisheye) - 鱼眼坐标系。

## Composition

视图复合相关的内容。

- [spaceLayer](/spec/composition/space-layer) - 对空间不做任何划分，多个视图使用同一个空间区域，常用于视图的层叠。
- [spaceFlex](/spec/composition/space-flex) - 使用类似 css flex 的布局方式来划分空间区域，常用于多图表对比的视图。
- [facetRect](/spec/composition/facet-rect) - 用 row、column 字段维值对空间和数据进行划分，在各个子空间可视化数据片段。
- [facetCircle](/spec/composition/facet-circle) - 根据字段分片数据，利用圆形划分空间，然就进行各个分面的数据可视化。
- [repeatMatrix](/spec/composition/repeat-matrix) - 根据字段的数量对空间进行划分和可视化。
- [timingKeyframe](/spec/composition/timing-keyframe) - 在不同时间片之间播放不同的可视化视图帧。

## Component

绘制辅助视觉元素。

- [title](/spec/component/title) - 绘制图表标题和副标题。
- [axis](/spec/component/axis) - 绘制坐标轴。
- [legend](/spec/component/legend) - 绘制图例。
- [scrollbar](/spec/component/scrollbar) - 绘制滚动条。
- [slider](/spec/component/slider) - 绘制拖动条。

## [Label](/spec/label/overview)

绘制数据标签和标签属性的变换。

- [contrastReverse](/spec/label/contrast-reverse) - 标签颜色在图形背景上对比度低的情况下，从指定色板选择一个对比度最优的颜色。
- [overflowHide](/spec/label/overflow-hide) - 对于标签在图形上放置不下的时候，隐藏标签。
- [overlapDodgeY](/spec/label/overlap-dodge-y) - 对位置碰撞的标签在 y 方向上进行调整，防止标签重叠。
- [overlapHide](/spec/label/overlap-hide) - 对位置碰撞的标签进行隐藏，默认保留前一个，隐藏后一个。

## [Animation](/spec/animation/overview)

数据驱动的动画和连续的形变动画。

- [fadeIn](/spec/animation/fade-in) - 渐现动画。
- [fadeOut](/spec/animation/fade-out) - 渐隐动画。
- [growInX](/spec/animation/grow-in-x) - 容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。
- [growInY](/spec/animation/grow-in-y) - 容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。
- [morphing](/spec/animation/morphing) - 图形之间的形变动画。
- [pathIn](/spec/animation/pathin) - Path 路径入场动画。
- [scaleInX](/spec/animation/scale-in-x) - 单个图形沿着 x 方向的生长动画。
- [scaleInY](/spec/animation/scale-in-y) - 单个图形沿着 y 方向的生长动画。
- [scaleOutX](/spec/animation/scale-out-x) - 单个图形沿着 x 方向的消退动画。
- [scaleOutY](/spec/animation/scale-out-y) - 单个图形沿着 y 方向的消退动画。
- [waveIn](/spec/animation/wave-in) - 划入入场动画效果，不同坐标系下效果不同。
- [zoomIn](/spec/animation/zoom-in) - 沿着图形中心点的放大动画。
- [zoomOut](/spec/animation/zoom-out) - 沿着图形中心点的缩小动画。

## Interaction

操作视图并且展现详细信息。

- [brushFilter](/spec/interaction/brush-filter) - 框选筛选。
- [brushXFilter](/spec/interaction/brush-x-filter) - x 方向框选筛选。
- [brushYFilter](/spec/interaction/brush-y-filter) - y 方向框选筛选。
- [brushHighlight](/spec/interaction/brush-highlight) - 框选高亮。
- [brushXHighlight](/spec/interaction/brush-x-highlight) - x 方向框选高亮。
- [brushYHighlight](/spec/interaction/brush-y-Higlight) - y 方向框选高亮。
- [brushAxisHighlight](/spec/interaction/brush-axis-higlight) - 坐标轴框选高亮。
- [legendHighlight](/spec/interaction/legend-highlight) - 图例高亮。
- [legendFilter](/spec/interaction/legend-filter) - 图例筛选。
- [tooltip](/spec/interaction/tooltip) - 展现提示信息。
- [elementHighlight](/spec/interaction/element-highlight) - 高亮元素。
- [elementHighlightByX](/spec/interaction/element-highlight-by-x) - 高亮具有相同 x 通道值的元素。
- [elementHighlightByColor](/spec/interaction/element-highlight-by-color) - 高亮具有相同 color 通道的元素。
- [elementSelect](/spec/interaction/element-select) - 选择元素。
- [elementSelectByX](/spec/interaction/element-select-by-x) - 选择拥有相同 x 通道值的元素。
- [elementSelectByColor](/spec/interaction/element-select-by-color) - 选择拥有相同 color 通道值的元素。
- [fisheye](/spec/interaction/fisheye) - 鱼眼交互。
- [charIndex](/spec/interaction/chart-index) - 索引图表。
- [poptip](/spec/interaction/poptip) - 展现提示文本。
- [sliderFilter](/spec/interaction/slider-filter) - 拖动条筛选。

## Graph

关系图相关的绘制。

- [sankey](/spec/graph/sankey) - 绘制桑基图。
- [treemap](/spec/graph/treemap) - 绘制矩阵树图。
- [pack](/spec/graph/pack) - 绘制打包图。
- [forceGraph](/spec/graph/force-graph) - 绘制力导向图。
- [tree](/spec/graph/tree) - 绘制树图。

## Geo

地图相关的图形绘制。

- [geoPath](/spec/geo/geo-path) - 可以用来结合 geojson 绘制地图。
- [geoView](/spec/geo/geo-view) - 绘制地图的容器，用于多 geoPath 图层叠加。

## [Theme](/spec/theme/theme)

主题相关内容。

- [academy](/spec/theme/academy) - 学术风格的主题。
- [classic](/spec/theme/classic) - 经典主题。
- [classicDark](/spec/theme/classic-dark) - 经典暗黑主题。

## Plugin

基于 G 插件相关的内容。

- [renderer](/spec/plugin/renderer) - `Canvas`、`SVG` 两大渲染器。
- [rough](/spec/plugin/rough) - 绘制手绘图的插件。
- [lottie](/spec/plugin/lottie) - 可以在图表中播放 lottie 动画的插件。


## Common

公共配置。

- [style](/spec/common/style) - 绘制图表标题和副标题。
