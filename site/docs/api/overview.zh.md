---
title: 概览
order: 1
---

G2 是一个简介的、渐进式可视化语法，文档将按照下面的顺序去分别介绍每一个模块，你可以把它当做一个字典去搜索和查询。

* [Overview](./overview) - 所有 API 文档的一句话概览。
* [Chart](./chart) - 提供简洁的命令式 API，一句话生成一个图表。
* [Data](./data/overview) - 介绍不同载入数据的方式和数据变换。
  * [data.sortBy](./scale/sortBy) - 
  * [data.filterBy](./scale/filterBy) - 
  * [data.fold](./scale/fold) - 
  * [data.lookup](./scale/lookup) - 
  * [data.map](./scale/map) - 
  * [custom](./scale/custom) - 
* Mark - 介绍不同图形标记 mark 的配置和用法。
  * [mark.interval](./mark/interval) - 
  * [mark.point](./mark/point) - 
  * [mark.line](./mark/line) - 
  * [mark.area](./mark/area) - 
  * [mark.cell](./mark/cell) - 
  * [mark.rect](./mark/rect) - 
  * [mark.link](./mark/link) - 
  * [mark.vector](./mark/vector) - 
  * [mark.polygon](./mark/polygon) - 
  * [mark.box](./mark/box) - 
  * [mark.boxplot](./mark/boxplot) - 
  * [mark.text](./mark/text) - 
  * [mark.image](./mark/image) - 
  * [mark.shape](./mark/shape) - 
  * [mark.interval](./mark/interval) - 
  * [mark.lineX](./mark/lineX) - 
  * [mark.lineY](./mark/lineY) - 
  * [mark.range](./mark/range) - 
  * [mark.rangeX](./mark/rangeX) - 
  * [mark.rangeY](./mark/rangeY) - 
  * [mark.sankey](./mark/sankey) - 
  * [mark.treemap](./mark/treemap) - 
  * [mark.pack](./mark/pack) - 
  * [mark.forceGraph](./mark/forceGraph) - 
  * [mark.tree](./mark/tree) - 
  * [mark.wordcloud](./mark/wordcloud) - 
* Transform - 对视觉通道 encode 进行变换。
  * [transform.bin](./transform/bin) - 对连续的 x 和 连续的 y 通道进行分箱，并且对通道根据指定的 redcuer 进行聚合。
  * [transform.binX](./transform/binX) - 对 x 通道进行分箱，如果希望对 y 通道进行分箱，使用 binX + transpose 坐标系。
  * [transform.diffY](./transform/diffY) - 对 y 和 y1 通道求差集。
  * [transform.dodgeX](./transform/dodgeX) - 生成 series 通道值为 color 通道的值，根据 series 通道实现分组效果。
  * [transform.flexX](./transform/flexX) - 根据指定通道设置 x 比例尺的 flex 属性，实现不等宽矩形的效果。
  * [transform.group](./transform/group) - 对离散的 x 和 连续的 y 通道进行分组，并且对通道根据指定的 Redcuer 进行聚合。
  * [transform.groupColor](./transform/groupColor) - 对离散的 color 通道进行分组，并且对通道根据指定的 Redcuer 进行聚合。
  * [transform.groupX](./transform/groupX) - 对离散的 x 通道进行分组，并且对通道根据指定的 Redcuer 进行聚合。
  * [transform.groupY](./transform/groupY) - 对离散的 y 通道进行分组，并且对通道根据指定的 Redcuer 进行聚合。
  * [transform.jitter](./transform/jitter) - 根据离散的 x 和 离散的 y 比例尺，生成 dy 和 dx 通道，实现在某个区域散开的效果。
  * [transform.jitterX](./transform/jitterX) - 根据离散的 x 比例尺，生成 dx 通道，实现在某个区域的 x 方向散开的效果。
  * [transform.normalizeY](./transform/normalizeY) - 对 y 和 y1 通道根据指定的 basis 进行归一化处理。
  * [transform.select](./transform/select) - 按照指定通道进行分组，根据指定通道和 selector 从每组选择出数据。
  * [transform.selectX](./transform/selectX) - 按照指定通道进行分组，根据 x 通道和 selector 从每组选择出数据。
  * [transform.selectY](./transform/selectY) - 按照指定的通道进行分组，根据 y 通道和 selector 从每组选择出数据。
  * [transform.pack](./transform/pack) - 生成 transform 和 scale 属性，从而让图形在空间中紧凑排列。
  * [transform.sortColor](./transform/sortColor) - 对离散的 color 比例尺的定义域根据指定通道排序。
  * [transform.sortX](./transform/sortX) - 对离散的 x 比例尺的定义域根据指定通道排序。
  * [transform.sortY](./transform/sortY) - 对离散的 y 比例尺的定义域根据指定通道排序。
  * [transform.stackEnter](./transform/stackEnter) - 对 enterDuration 和 enterDelay 通道进行堆叠，实现分组动画的效果。
  * [transform.stackY](./transform/stackY) - 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果。
  * [transform.symmetryY](./transform/symmetryY) - 按照指定通道分组，给每组的 y 和 y1 通道添加偏移，实现对称效果。
* Scale - 比例尺相关的介绍
  * [scale.linear](./scale/linear) - 针对连续数据，对数据进行连续映射的比例尺。
  * [scale.sqrt](./scale/sqrt) - 指数固定为 `0.5` 的 `pow` 比例尺。
  * [scale.pow](./scale/pow) - 类似于 `linear` 比例尺，但是映射函数为指数函数（exponential）。
  * [scale.log](./scale/log) - 类似于 `linear` 比例尺，但是映射函数为对数函数（logarithmic）。
  * [scale.ordinal](./scale/ordinal) - 将离散的数据映射到另外一个离散数据中。
  * [scale.quantize](./scale/quantize) - 类似于 `threshold`，但是计算切片的方式是基于元素的数据值。
  * [scale.quantile](./scale/quantile) - 类似于 `threshold`， 但是计算切片的方式是基于元素在数据中的索引。
  * [scale.threshold](./scale/threshold) - 将连续的值域范围划分为多个切片，并将这些切片映射到一个离散的数据中。
* Coordinate - 坐标系相关的介绍。
  * [coordinate.polar](./scale/polar) - 
  * [coordinate.theta](./scale/theta) - 
  * [coordinate.radial](./scale/radial) - 
  * [coordinate.parallel](./scale/parallel) - 
  * [coordinate.transpose](./scale/transpose) - 
  * [coordinate.fisheye](./scale/fisheye) - 
* Composition - 视图复合相关的内容。
  * [spaceLayer](./scale/spaceLayer) - 
  * [spaceFlex](./scale/spaceFlex) - 
  * [facetRect](./scale/facetRect) - 
  * [facetCircle](./scale/facetCircle) - 
  * [repeatMatrix](./scale/repeatMatrix) - 
  * [timingKeyframe](./scale/timingKeyframe) - 
* Component - 图表组件相关的内容。
  * [axisX](./scale/axisX) - 
  * [axisY](./scale/axisY) - 
  * [legendCateogry](./scale/legendCateogry) - 
  * [legendContiuous](./scale/legendContiuous) - 
* Label - 数据标签相关的内容
  * [label.dodgeY](./scale/dodgeY) - 
  * [label.hideOverlap](./scale/hideOverlap) - 
  * [label.spider](./scale/spider) - 
  * [label.surround](./scale/surround) - 
* Animation - 动画相关的内容。
  * [animation.fadeIn](./scale/fadeIn) - 
  * [animation.fadeOut](./scale/fadeOut) - 
  * [animation.growInX](./scale/growInX) - 
  * [animation.growInY](./scale/growInY) - 
  * [animation.pathIn](./scale/pathIn) - 
  * [animation.scaleInX](./scale/scaleInX) - 
  * [animation.scaleInY](./scale/scaleInY) - 
  * [animation.scaleOutX](./scale/scaleOutX) - 
  * [animation.scaleOutY](./scale/scaleOutY) - 
  * [animation.waveIn](./scale/waveIn) - 
  * [animation.zoomIn](./scale/zoomIn) - 
  * [animation.zoomOut](./scale/zoomOut) - 
* Interaction - 交互相关内容。
* [Graph]() - 
* [Geo]() - 
* [Theme](./theme) - 主题相关内容。
* Plugin - 基于 G 插件相关的内容。
  * [rough](./plugin/rough) - 绘制手绘图的插件。
  * [lottie](./plugin/lottie) - 可以在图表中播放 lottie 动画的插件。