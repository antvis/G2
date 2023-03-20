---
title: 概览
order: 1
---

提供简洁的命令式 API，一句话生成图表。

## [Chart](/api/chart)

### 创建可视化

- [new Chart](/api/chart#开始使用) - 创建 Chart 实例。
- [chart.**interval**](/spec/mark/interval) - 添加 interval 标记到该视图。
- [chart.**rect**](/spec/mark/rect) - 添加 rect 标记到该视图。
- [chart.**point**](/spec/mark/point) - 添加 point 标记到该视图。
- [chart.**area**](/spec/mark/area) - 添加 area 标记到该视图。
- [chart.**line**](/spec/mark/line) - 添加 line 标记到该视图。
- [chart.**vector**](/spec/mark/vector) - 添加 vector 标记到该视图。
- [chart.**link**](/spec/mark/link) - 添加 link 标记到该视图。
- [chart.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该视图。
- [chart.**image**](/spec/mark/image) - 添加 image 标记到该视图。
- [chart.**text**](/spec/mark/text) - 添加 text 标记到该视图。
- [chart.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该视图。
- [chart.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该视图。
- [chart.**range**](/spec/mark/range) - 添加 range 标记到该视图。
- [chart.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该视图。
- [chart.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该视图。
- [chart.**connector**](/spec/mark/connector) - 添加 connector 标记到该视图。
- [chart.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该视图。
- [chart.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该视图。
- [chart.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该视图。
- [chart.**shape**](/spec/mark/shape) - 添加 shape 标记到该视图。
- [chart.**pack**](/spec/mark/pack) - 添加 pack 标记到该视图。
- [chart.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [chart.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [chart.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [chart.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。
- [chart.**view**](/spec/mark/view) - 添加 view 到该视图。
- [chart.**spaceLayer**](/spec/mark/spaceLayer)- 添加 spaceLayer 到该视图。
- [chart.**spaceFlex**](/spec/mark/spaceFlex) - 添加 spaceFlex 到该视图。
- [chart.**facetRect**](/spec/mark/facetRect) - 添加 facetRect 到该视图。
- [chart.**facetCircle**](/spec/mark/facetCircle) - 添加 facetCircle 到该视图。
- [chart.**repeatMatrix**](/spec/mark/repeatMatrix) - 添加 repeatMatrix 到该视图。
- [chart.**timingKeyframe**](/spec/mark/timingKeyframe) - 添加 timingKeyframe 到该视图。
- [chart.**geoView**](/spec/mark/geoView) - 添加 geoView 到该视图。
- [chart.**geoPath**](/spec/mark/geoPath) - 添加 geoPath 到该视图。

### 设置属性

- [chart.**attr**](/api/chart#attr) - 设置或获取 chart 的属性。
- [chart.**options**](/api/chart#options) - 设置或获得视图上的属性。
- [chart.**data**](/spec/data/overview) - 添加 data 到该视图。
- [chart.**transform**](/spec/transform/overview) - 添加 transform 到该视图。
- [chart.**theme**](/spec/theme/overview) - 设置 theme 到该视图。
- [chart.**style**](/spec/style/overview) - 设置 style 到该视图。
- [chart.**scale**](/spec/scale/overview) - 设置 scale 到该视图。
- [chart.**coordinate**](/spec/coordinate/overview) - 声明该视图的 coordinate。
- [chart.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [chart.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

### 获取实例

- [chart.**getNodeByKey**](/api/chart#nodegetnodesbykeykey-string-node) - 根据 key 获取 children 对象。
- [chart.**getNodeByType**](/api/chart#chartgetnodebytypetype-string-node) - 根据 key 获取 children 对象组。
- [chart.**getContext**](/api/chart#chartgetcontext) - 获得视图的 context 信息。
- [chart.**getContainer**](/api/chart#chartgetcontainer) - 获得视图的外部容器。
- [chart.**getView**](/api/chart#chartgetview) - 获得视图的 view 实例。
- [chart.**getCoordinate**](/api/chart#chartgetcoordinate) - 获得视图的 coordinate 实例。
- [chart.**getTheme**](/api/chart#getTheme) - 获得视图的 theme 实例。
- [chart.**getGroup**](/api/chart#getGroup) - 获得视图的 canvas group 实例。

### 渲染图表

- [chart.**render**](/api/chart#chartrender) - 渲染该视图。
- [chart.**clear**](/api/chart#chartclear) - 清空该视图。
- [chart.**destroy**](/api/chart#chartdestroy) - 清空该视图并销毁 canvas 画布。
- [chart.**changeSize**](/api/chart#chartchangeSize) - 修改视图尺寸。
- [chart.**changeData**](/api/chart#nodechangeData) - 修改视图数据。
- [chart.**forceFit**](/api/chart#chartforceFit) - 强制自适应布局。
- [chart.**show**](/api/chart#nodeshow) - 显示视图。
- [chart.**hide**](/api/chart#nodehide) - 隐藏视图。

### 事件

- [chart.**on**](/api/chart#on) - 监听视图事件。
- [chart.**once**](/api/chart#once) - 监听视图事件(仅允许执行一次)。
- [chart.**emit**](/api/chart#emit) - 触发视图事件。
- [chart.**off**](/api/chart#off) - 销毁视图事件。

## [Mark](/api/mark)

### 设置属性

- [mark.**attr**](/api/mark#attr) - 设置或获取 mark 的属性。
- [mark.**data**](/spec/data/overview) - 设置或获取 mark 的 data。
- [mark.**encode**](/spec/encode/overview) - 设置或获取 mark 的 encode
- [mark.**transform**](/spec/transform/overview) - 设置或获取 mark 的 transform
- [mark.**scale**](/spec/scale/overview) - 设置或获取 mark 的 scale
- [mark.**interaction**](/spec/interaction/overview) - 设置或获取 mark 的 interaction。
- [mark.**theme**](/spec/theme/overview) -设置或获取 mark 的 theme
- [mark.**label**](/spec/label/overview) - 设置或获取 mark 的 label。

### 获取实例

- [mark.**getNodeByKey**](/api/chart#nodegetnodesbykeykey-string-node) - 根据 key 获取 children 对象。
- [mark.**getNodeByType**](/api/chart#nodegetnodesbytypetype-string-node) - 根据 key 获取 children 对象组。
- [mark.**changeData**](/api/chart#nodechangedata) - 修改视图数据。
- [mark.**getMark**](/api/chart#getMark) - 获得 mark 实例。
- [mark.**getScale**](/api/chart#getScale) - 获得 scale 实例。
- [mark.**getScaleByChannel**](/api/chart#getscalebychannel) - 获得 scale 实例。
- [mark.**getGroup**](/api/chart#chartgetgroup) - 获得 canvas group 实例。

## [View](/api/view)

### 创建可视化

- [view.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [view.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [view.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [view.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [view.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [view.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [view.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [view.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [view.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [view.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [view.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [view.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [view.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [view.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [view.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [view.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [view.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [view.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [view.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [view.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [view.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [view.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该复合视图。
- [view.**tree**](/spec/mark/tree) - 添加 tree 标记到该复合视图。
- [view.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该复合视图。
- [view.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该复合视图。

### 设置属性

- [view.**attr**](/api/view#attr) - 设置或获取该复合视图的属性。
- [view.**coordinate**](/spec/coordinate/overview) - 声明该复合视图的 coordinate。
- [view.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。
- [view.**transform**](/spec/transform/overview) - 设置或获取该复合视图的 transform。
- [view.**interaction**](/spec/interaction/overview) - 设置或获取 view 的 interaction。
- [view.**theme**](/spec/theme/overview) - 设置或获取该复合视图的主题。
- [view.**style**](/spec/style/overview) - 设置或获取该复合视图的 style。
- [view.**scale**](/spec/scale/overview) - 设置或获取该复合视图的 scale。
- [view.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [view.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

### 获取实例

- [view.**getNodeByKey**](/api/chart#nodegetnodesbykeykey-string-node) - 根据 key 获取 children 对象。
- [view.**getNodeByType**](/api/chart#nodegetnodesbytypetype-string-node) - 根据 key 获取 children 对象组。
- [view.**getView**](/api/chart#chartgetview) - 获得复合视图的 view 实例。
- [view.**getCoordinate**](/api/chart#chartgetcoordinate) - 获得复合视图的 coordinate 实例。
- [view.**getTheme**](/api/chart#chartgettheme) - 获得复合视图的 theme 实例。
- [view.**getGroup**](/api/chart#chartgetgroup) - 获得复合视图的 canvas group 实例。

## [GeoView](/api/geoview)

### 创建可视化

- [geoView.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [geoView.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [geoView.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [geoView.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [geoView.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [geoView.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [geoView.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [geoView.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [geoView.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [geoView.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [geoView.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [geoView.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [geoView.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [geoView.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [geoView.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [geoView.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [geoView.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [geoView.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [geoView.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [geoView.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [geoView.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [geoView.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [geoView.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [geoView.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [geoView.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [geoView.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [geoView.**attr**](/api/geoView#attr) - 设置或获取该复合视图的属性。
- [geoView.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。
- [geoView.**transform**](/spec/transform/overview) - 设置或获取该复合视图的 transform。
- [geoView.**coordinate**](/spec/coordinate/overview) - 设置或获取该复合视图的 coordinate。
- [geoView.**theme**](/spec/theme/overview) - 设置或获取该复合视图的主题。
- [geoView.**style**](/spec/style/overview) - 设置或获取该复合视图的 style。
- [geoView.**scale**](/spec/scale/overview) - 设置或获取该复合视图的 scale。
- [geoView.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [geoView.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

## [SpaceLayer](/api/spacelayer)

### 创建可视化

- [spaceLayer.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [spaceLayer.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [spaceLayer.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [spaceLayer.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [spaceLayer.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [spaceLayer.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [spaceLayer.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [spaceLayer.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [spaceLayer.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [spaceLayer.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [spaceLayer.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [spaceLayer.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [spaceLayer.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [spaceLayer.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [spaceLayer.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [spaceLayer.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [spaceLayer.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [spaceLayer.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [spaceLayer.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [spaceLayer.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [spaceLayer.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [spaceLayer.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [spaceLayer.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [spaceLayer.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [spaceLayer.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [spaceLayer.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceLayer.**attr**](/api/spaceLayer#attr) - 设置或获取该复合视图的属性。
- [spaceLayer.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。

## [SpaceFlex](/api/spaceflex)

### 创建可视化

- [spaceFlex.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [spaceFlex.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [spaceFlex.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [spaceFlex.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [spaceFlex.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [spaceFlex.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [spaceFlex.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [spaceFlex.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [spaceFlex.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [spaceFlex.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [spaceFlex.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [spaceFlex.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [spaceFlex.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [spaceFlex.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [spaceFlex.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [spaceFlex.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [spaceFlex.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [spaceFlex.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [spaceFlex.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [spaceFlex.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [spaceFlex.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [spaceFlex.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [spaceFlex.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [spaceFlex.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [spaceFlex.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [spaceFlex.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceFlex.**attr**](/api/spaceFlex#attr) - 设置或获取该复合视图的属性。
- [spaceFlex.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。

## [FacetRect](/api/facetrect)

### 创建可视化

- [facetRect.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [facetRect.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [facetRect.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [facetRect.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [facetRect.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [facetRect.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [facetRect.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [facetRect.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [facetRect.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [facetRect.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [facetRect.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [facetRect.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [facetRect.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [facetRect.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [facetRect.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [facetRect.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [facetRect.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [facetRect.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [facetRect.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [facetRect.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [facetRect.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [facetRect.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [facetRect.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [facetRect.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [facetRect.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [facetRect.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetRect.**attr**](/api/facetRect#attr) - 设置或获取该复合视图的属性。
- [facetRect.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。
- [facetRect.**transform**](/spec/transform/overview) - 设置或获取该复合视图的 transform。
- [facetRect.**theme**](/spec/theme/overview) - 设置或获取该复合视图的主题。
- [facetRect.**style**](/spec/style/overview) - 设置或获取该复合视图的 style。
- [facetRect.**scale**](/spec/scale/overview) - 设置或获取该复合视图的 scale。
- [facetRect.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [facetRect.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

## [FacetCircle](/api/facetcircle)

### 创建可视化

- [facetCircle.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [facetCircle.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [facetCircle.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [facetCircle.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [facetCircle.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [facetCircle.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [facetCircle.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [facetCircle.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [facetCircle.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [facetCircle.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [facetCircle.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [facetCircle.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [facetCircle.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [facetCircle.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [facetCircle.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [facetCircle.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [facetCircle.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [facetCircle.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [facetCircle.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [facetCircle.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [facetCircle.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [facetCircle.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [facetCircle.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [facetCircle.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [facetCircle.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [facetCircle.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetCircle.**attr**](/api/facetCircle#attr) - 设置或获取该复合视图的属性。
- [facetCircle.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。
- [facetCircle.**transform**](/spec/transform/overview) - 设置或获取该复合视图的 transform。
- [facetCircle.**theme**](/spec/theme/overview) - 设置或获取该复合视图的主题。
- [facetCircle.**style**](/spec/style/overview) - 设置或获取该复合视图的 style。
- [facetCircle.**scale**](/spec/scale/overview) - 设置或获取该复合视图的 scale。
- [facetCircle.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [facetCircle.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

## [RepeatMatrix](/api/repeatmatrix)

### 创建可视化

- [repeatMatrix.**view**](/spec/mark/view) - 添加 view 标记到该复合视图。
- [repeatMatrix.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [repeatMatrix.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [repeatMatrix.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [repeatMatrix.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [repeatMatrix.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [repeatMatrix.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [repeatMatrix.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [repeatMatrix.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [repeatMatrix.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [repeatMatrix.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [repeatMatrix.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [repeatMatrix.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [repeatMatrix.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [repeatMatrix.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [repeatMatrix.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [repeatMatrix.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [repeatMatrix.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [repeatMatrix.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [repeatMatrix.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [repeatMatrix.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [repeatMatrix.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [repeatMatrix.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [repeatMatrix.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [repeatMatrix.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [repeatMatrix.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [repeatMatrix.**attr**](/api/repeatMatrix#attr) - 设置或获取该复合视图的属性。
- [repeatMatrix.**data**](/spec/data/overview) - 设置或获取该复合视图的 data。
- [repeatMatrix.**transform**](/spec/transform/overview) - 设置或获取该复合视图的 transform。
- [repeatMatrix.**theme**](/spec/theme/overview) - 设置或获取该复合视图的主题。
- [repeatMatrix.**style**](/spec/style/overview) - 设置或获取该复合视图的 style。
- [repeatMatrix.**scale**](/spec/scale/overview) - 设置或获取该复合视图的 scale。
- [repeatMatrix.**axis**](/spec/axis/overview) - 设置或获取该复合视图的 axis。
- [repeatMatrix.**legend**](/spec/legend/overview) - 设置或获取该复合视图的 legend。

## [TimingKeyframe](/api/timingkeyframe)

### 创建可视化

- [timingKeyFrame.**interval**](/spec/mark/interval) - 添加 interval 标记到该复合视图。
- [timingKeyFrame.**rect**](/spec/mark/rect) - 添加 rect 标记到该复合视图。
- [timingKeyFrame.**point**](/spec/mark/point) - 添加 point 标记到该复合视图。
- [timingKeyFrame.**area**](/spec/mark/area) - 添加 area 标记到该复合视图。
- [timingKeyFrame.**line**](/spec/mark/line) - 添加 line 标记到该复合视图。
- [timingKeyFrame.**vector**](/spec/mark/vector) - 添加 vector 标记到该复合视图。
- [timingKeyFrame.**link**](/spec/mark/link) - 添加 link 标记到该复合视图。
- [timingKeyFrame.**polygon**](/spec/mark/polygon) - 添加 polygon 标记到该复合视图。
- [timingKeyFrame.**image**](/spec/mark/image) - 添加 image 标记到该复合视图。
- [timingKeyFrame.**text**](/spec/mark/text) - 添加 text 标记到该复合视图。
- [timingKeyFrame.**lineX**](/spec/mark/lineX) - 添加 lineX 标记到该复合视图。
- [timingKeyFrame.**lineY**](/spec/mark/lineY) - 添加 lineY 标记到该复合视图。
- [timingKeyFrame.**range**](/spec/mark/range) - 添加 range 标记到该复合视图。
- [timingKeyFrame.**rangeX**](/spec/mark/rangeX) - 添加 rangeX 标记到该复合视图。
- [timingKeyFrame.**rangeY**](/spec/mark/rangeY) - 添加 rangeY 标记到该复合视图。
- [timingKeyFrame.**connector**](/spec/mark/connector) - 添加 connector 标记到该复合视图。
- [timingKeyFrame.**sankey**](/spec/mark/sankey) - 添加 sankey 标记到该复合视图。
- [timingKeyFrame.**treemap**](/spec/mark/treemap) - 添加 treemap 标记到该复合视图。
- [timingKeyFrame.**boxplot**](/spec/mark/boxplot) - 添加 boxplot 标记到该复合视图。
- [timingKeyFrame.**shape**](/spec/mark/shape) - 添加 shape 标记到该复合视图。
- [timingKeyFrame.**pack**](/spec/mark/pack) - 添加 pack 标记到该复合视图。
- [timingKeyFrame.**forceGraph**](/spec/mark/forceGraph) - 添加 forceGraph 标记到该视图。
- [timingKeyFrame.**tree**](/spec/mark/tree) - 添加 tree 标记到该视图。
- [timingKeyFrame.**wordCloud**](/spec/mark/wordCloud) - 添加 wordCloud 标记到该视图。
- [timingKeyFrame.**gauge**](/spec/mark/gauge) - 添加 gauge 标记到该视图。

### 设置属性

- [timingKeyFrame.**attr**](/api/timingKeyFrame#attr) - 设置或获取该复合视图的属性。
