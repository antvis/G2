---
title: 概览
order: 1
---

提供简洁的命令式 API，一句话生成图表。

## [Chart](/api/chart)

### 创建可视化

- [new Chart](/api/chart#new-chart) - 创建 Chart 实例。
- [chart.**interval**](/api/chart#chartinterval) - 添加 interval 标记到该视图。
- [chart.**rect**](/api/chart#chartrect) - 添加 rect 标记到该视图。
- [chart.**point**](/api/chart#chartpoint) - 添加 point 标记到该视图。
- [chart.**area**](/api/chart#chartarea) - 添加 area 标记到该视图。
- [chart.**line**](/api/chart#chartline) - 添加 line 标记到该视图。
- [chart.**vector**](/api/chart#chartvector) - 添加 vector 标记到该视图。
- [chart.**link**](/api/chart#chartlink) - 添加 link 标记到该视图。
- [chart.**polygon**](/api/chart#chartpolygon) - 添加 polygon 标记到该视图。
- [chart.**image**](/api/chart#chartimage) - 添加 image 标记到该视图。
- [chart.**text**](/api/chart#charttext) - 添加 text 标记到该视图。
- [chart.**lineX**](/api/chart#chartlinex) - 添加 lineX 标记到该视图。
- [chart.**lineY**](/api/chart#chartliney) - 添加 lineY 标记到该视图。
- [chart.**range**](/api/chart#chartrange) - 添加 range 标记到该视图。
- [chart.**rangeX**](/api/chart#chartrangex) - 添加 rangeX 标记到该视图。
- [chart.**rangeY**](/api/chart#chartrangey) - 添加 rangeY 标记到该视图。
- [chart.**connector**](/api/chart#chartconnector) - 添加 connector 标记到该视图。
- [chart.**sankey**](/api/chart#chartsankey) - 添加 sankey 标记到该视图。
- [chart.**treemap**](/api/chart#charttreemap) - 添加 treemap 标记到该视图。
- [chart.**boxplot**](/api/chart#chartboxplot) - 添加 boxplot 标记到该视图。
- [chart.**density**](/api/chart#density) - 添加 density 标记到该视图。
- [chart.**heatmap**](/api/chart#heatmap) - 添加 heatmap 标记到该视图。
- [chart.**shape**](/api/chart#chartshape) - 添加 shape 标记到该视图。
- [chart.**pack**](/api/chart#chartpack) - 添加 pack 标记到该视图。
- [chart.**forceGraph**](/api/chart#chartforcegraph) - 添加 forceGraph 标记到该视图。
- [chart.**tree**](/api/chart#charttree) - 添加 tree 标记到该视图。
- [chart.**wordCloud**](/api/chart#chartwordcloud) - 添加 wordCloud 标记到该视图。
- [chart.**gauge**](/api/chart#chartgauge) - 添加 gauge 标记到该视图。
- [chart.**view**](/api/chart#chartview) - 添加 view 到该图表。
- [chart.**spaceLayer**](/api/chart#chartspacelayer)- 添加 spaceLayer 到该图表。
- [chart.**spaceFlex**](/api/chart#chartspaceflex) - 添加 spaceFlex 到该图表。
- [chart.**facetRect**](/api/chart#chartfacetrect) - 添加 facetRect 到该图表。
- [chart.**facetCircle**](/api/chart#chartfacetcircle) - 添加 facetCircle 到该图表。
- [chart.**repeatMatrix**](/api/chart#chartrepeatmatrix) - 添加 repeatMatrix 到该图表。
- [chart.**timingKeyframe**](/api/chart#charttimingkeyframe) - 添加 timingKeyframe 到该图表。
- [chart.**geoView**](/api/chart#chartgeoview) - 添加 geoView 到该图表。
- [chart.**geoPath**](/api/chart#chartgeopath) - 添加 geoPath 到该图表。
- [chart.**point3D**](/api/chart#chartpoint3d) - 添加 point3D 标记到该视图。

### 设置属性

- [chart.**attr**](/api/chart#chartattr) - 设置或获取 chart 的属性。
- [chart.**width**](/api/chart#chartwidth) - 设置或获取 width 的属性。
- [chart.**height**](/api/chart#chartheight) - 设置或获取 height 的属性。
- [chart.**title**](/api/chart#charttitle) - 设置或获取 title 的属性。
- [chart.**encode**](/api/chart#chartencode) - 设置或获得 chart 的 encode。
- [chart.**options**](/api/chart#chartoptions) - 设置或获取视图上的属性。
- [chart.**data**](/api/chart#chartdata) - 设置或获取该视图的 data。
- [chart.**transform**](/api/chart#charttransform) - 设置或获取该视图的 transform。
- [chart.**theme**](/api/chart#charttheme) - 设置或获取该视图的 theme。
- [chart.**style**](/api/chart#chartstyle) - 设置或获取该视图的 style。
- [chart.**scale**](/api/chart#chartscale) - 设置或获取该视图的 scale。
- [chart.**coordinate**](/api/chart#chartcoordinate) - 设置或获取该视图的 coordinate。
- [chart.**axis**](/api/chart#chartaxis) - 设置或获取该视图的 axis。
- [chart.**legend**](/api/chart#chartlegend) - 设置或获取该视图的 legend。
- [chart.**labelTransform**](/api/chart#labeltransform) - 设置或获取该视图的 labelTransform。

### 获取实例

- [chart.**getNodeByKey**](/api/chart#chartgetnodebykey) - 根据 key 获取 mark。
- [chart.**getNodeByType**](/api/chart#chartgetnodesbytype) - 根据 type 获取 mark 数组。
- [chart.**getContext**](/api/chart#chartgetcontext) - 获取视图的 context 信息。
- [chart.**getContainer**](/api/chart#chartgetcontainer) - 获取视图的外部容器。
- [chart.**getView**](/api/chart#chartgetview) - 获取视图的 view 实例。
- [chart.**getCoordinate**](/api/chart#chartgetcoordinate) - 获取视图的 coordinate 实例。
- [chart.**getGroup**](/api/chart#chartgetgroup) - 获取视图的 canvas group 实例。
- [chart.**getScale**](/api/chart#chartgetscale) - 获取该视图的 scale。
- [chart.**getScaleByChannel**](/api/chart#chartgetscalebychannel) - 获取指定通道的比例尺。

### 渲染图表

- [chart.**render**](/api/chart#chartrender) - 渲染图表。
- [chart.**clear**](/api/chart#chartclear) - 清空图表。
- [chart.**destroy**](/api/chart#chartdestroy) - 清空该视图并销毁 canvas 画布。
- [chart.**changeSize**](/api/chart#chartchangesize) - 修改图表尺寸。
- [chart.**changeData**](/api/chart#changedata) - 修改图表数据。
- [chart.**forceFit**](/api/chart#chartforceFit) - 强制自适应布局。
- [chart.**show**](/api/chart#show) - 显示图表。
- [chart.**hide**](/api/chart#hide) - 隐藏图表。

### 事件

- [chart.**on**](/api/chart#charton) - 监听图表事件。
- [chart.**once**](/api/chart#chartonce) - 监听图表事件(仅允许执行一次)。
- [chart.**emit**](/api/chart#chartemit) - 触发视图事件。
- [chart.**off**](/api/chart#chartoff) - 销毁视图事件。

## [Mark](/api/mark)

### 设置属性

- [mark.**attr**](/api/mark#markattr) - 设置或获取 mark 的属性。
- [mark.**data**](/api/mark#markdata) - 设置或获取 mark 的 data。
- [mark.**encode**](/api/mark#markecode) - 设置或获取 mark 的 encode。
- [mark.**transform**](/api/mark#marktransform) - 设置或获取 mark 的 transform。
- [mark.**scale**](/api/mark#markscale) - 设置或获取 mark 的 scale。
- [mark.**interaction**](/api/mark#markinteraction) - 设置或获取 mark 的 interaction。
- [mark.**label**](/api/mark#marklabel) - 设置或获取 mark 的 label。
- [mark.**animate**](/api/mark#markanimate) - 设置或获取 mark 的 animate。
- [mark.**coordinate**](/api/mark#markcoordinate) - 设置或获取 mark 的 coordinate。
- [mark.**axis**](/api/mark#markaxis) - 设置或获取 mark 的 axis。
- [mark.**legend**](/api/mark#marklegend) - 设置或获取 mark 的 legend。
- [mark.**slider**](/api/mark#markslider) - 设置或获取 mark 的 slider。
- [mark.**scrollbar**](/api/mark#markscrollbar) - 设置或获取 mark 的 scrollbar。
- [mark.**state**](/api/mark#markstate) - 设置或获取 mark 的 state。
- [mark.**tooltip**](/api/mark#marktooltip) - 设置或获取 mark 的 tooltip。

### 获取实例

- [mark.**changeData**](/api/mark#markchangedata) - 修改 mark 数据。
- [mark.**getMark**](/api/mark#markgetmark) - 获取 mark 实例。
- [mark.**getScale**](/api/mark#markgetscale) - 获取 scale 实例。
- [mark.**getScaleByChannel**](/api/mark#markgetscalebychannel) - 获取指定通道的 scale 实例。
- [mark.**getGroup**](/api/mark#markgetgroup) - 获取 canvas group 实例。

## [View](/api/view)

### 创建可视化

- [view.**interval**](/api/view#viewinterval) - 添加 interval 标记到该视图。
- [view.**rect**](/api/view#viewrect) - 添加 rect 标记到该视图。
- [view.**point**](/api/view#viewpoint) - 添加 point 标记到该视图。
- [view.**area**](/api/view#viewarea) - 添加 area 标记到该视图。
- [view.**line**](/api/view#viewline) - 添加 line 标记到该视图。
- [view.**vector**](/api/view#viewvector) - 添加 vector 标记到该视图。
- [view.**link**](/api/view#viewlink) - 添加 link 标记到该视图。
- [view.**polygon**](/api/view#viewpolygon) - 添加 polygon 标记到该视图。
- [view.**image**](/api/view#viewimage) - 添加 image 标记到该视图。
- [view.**text**](/api/view#viewtext) - 添加 text 标记到该视图。
- [view.**lineX**](/api/view#viewlinex) - 添加 lineX 标记到该视图。
- [view.**lineY**](/api/view#viewliney) - 添加 lineY 标记到该视图。
- [view.**range**](/api/view#viewrange) - 添加 range 标记到该视图。
- [view.**rangeX**](/api/view#viewrangex) - 添加 rangeX 标记到该视图。
- [view.**rangeY**](/api/view#viewrangey) - 添加 rangeY 标记到该视图。
- [view.**connector**](/api/view#viewconnector) - 添加 connector 标记到该视图。
- [view.**sankey**](/api/view#viewsankey) - 添加 sankey 标记到该视图。
- [view.**treemap**](/api/view#viewtreemap) - 添加 treemap 标记到该视图。
- [view.**boxplot**](/api/view#viewboxplot) - 添加 boxplot 标记到该视图。
- [view.**shape**](/api/view#viewshape) - 添加 shape 标记到该视图。
- [view.**pack**](/api/view#viewpack) - 添加 pack 标记到该视图。
- [view.**forceGraph**](/api/view#viewforcegraph) - 添加 forceGraph 标记到该视图。
- [view.**tree**](/api/view#viewtree) - 添加 tree 标记到该视图。
- [view.**wordCloud**](/api/view#viewwordcloud) - 添加 wordCloud 标记到该视图。
- [view.**gauge**](/api/view#viewgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [view.**attr**](/api/view#viewattr) - 设置或获取该视图的属性。
- [view.**coordinate**](/api/view#viewcoordinate) - 声明该视图的 coordinate。
- [view.**data**](/api/view#viewdata) - 设置或获取该视图的 data。
- [view.**transform**](/api/view#viewtransform) - 设置或获取该视图的 transform。
- [view.**interaction**](/api/view#viewinteraction) - 设置或获取 view 的 interaction。
- [view.**theme**](/api/view#viewtheme) - 设置或获取该视图的主题。
- [view.**style**](/api/view#viewstyle) - 设置或获取该视图的 style。
- [view.**scale**](/api/view#viewscale) - 设置或获取该视图的 scale。
- [view.**axis**](/api/view#viewaxis) - 设置或获取该视图的 axis。
- [view.**legend**](/api/view#viewlegend) - 设置或获取该视图的 legend。
- [view.**labelTransform**](/api/view#viewlabeltranform) - 设置或获取该视图的 labelTransform。

### 获取实例

- [view.**getNodeByKey**](/api/view#viewgetnodebykey) - 根据 key 获取标记。
- [view.**getNodeByType**](/api/view#viewgetnodesbytype) - 根据 key 获取标记数组。
- [view.**getView**](/api/view#viewgetview) - 获取视图的 view 实例。
- [view.**getCoordinate**](/api/view#viewgetcoordinate) - 获取视图的 coordinate 实例。
- [view.**getGroup**](/api/view#viewgetgroup) - 获取视图的 canvas group 实例。
- [view.**getView**](/api/view#viewgetview) - 获取视图的 view 实例。
- [view.**getCoordinate**](/api/view#viewgetcoordinate) - 获取视图的 coordinate 实例。
- [view.**getGroup**](/api/view#viewgetgroup) - 获取视图的 canvas group 实例。
- [view.**getScale**](/api/view#viewgetscale) - 获取该视图的 scale。
- [view.**getScaleByChannel**](/api/view#viewgetscalebychannel) - 获取指定通道的比例尺。

## [GeoView](/api/geo-view)

### 创建可视化

- [geoView.**view**](/api/geo-view#geoviewview) - 添加 view 标记到该地理视图。
- [geoView.**interval**](/api/geo-view#geoviewinterval) - 添加 interval 标记到该地理视图。
- [geoView.**rect**](/api/geo-view#geoviewrect) - 添加 rect 标记到该地理视图。
- [geoView.**point**](/api/geo-view#geoviewpoint) - 添加 point 标记到该地理视图。
- [geoView.**area**](/api/geo-view#geoviewarea) - 添加 area 标记到该地理视图。
- [geoView.**line**](/api/geo-view#geoviewline) - 添加 line 标记到该地理视图。
- [geoView.**vector**](/api/geo-view#geoviewvector) - 添加 vector 标记到该地理视图。
- [geoView.**link**](/api/geo-view#geoviewlink) - 添加 link 标记到该地理视图。
- [geoView.**polygon**](/api/geo-view#geoviewpolygon) - 添加 polygon 标记到该地理视图。
- [geoView.**image**](/api/geo-view#geoviewimage) - 添加 image 标记到该地理视图。
- [geoView.**text**](/api/geo-view#geoviewtext) - 添加 text 标记到该地理视图。
- [geoView.**lineX**](/api/geo-view#geoviewlineX) - 添加 lineX 标记到该地理视图。
- [geoView.**lineY**](/api/geo-view#geoviewlineY) - 添加 lineY 标记到该地理视图。
- [geoView.**range**](/api/geo-view#geoviewrange) - 添加 range 标记到该地理视图。
- [geoView.**rangeX**](/api/geo-view#geoviewrangeX) - 添加 rangeX 标记到该地理视图。
- [geoView.**rangeY**](/api/geo-view#geoviewrangeY) - 添加 rangeY 标记到该地理视图。
- [geoView.**connector**](/api/geo-view#geoviewconnector) - 添加 connector 标记到该地理视图。
- [geoView.**sankey**](/api/geo-view#geoviewsankey) - 添加 sankey 标记到该地理视图。
- [geoView.**treemap**](/api/geo-view#geoviewtreemap) - 添加 treemap 标记到该地理视图。
- [geoView.**boxplot**](/api/geo-view#geoviewboxplot) - 添加 boxplot 标记到该地理视图。
- [geoView.**shape**](/api/geo-view#geoviewshape) - 添加 shape 标记到该地理视图。
- [geoView.**pack**](/api/geo-view#geoviewpack) - 添加 pack 标记到该地理视图。
- [geoView.**forceGraph**](/api/geo-view#geoviewforcegraph) - 添加 forceGraph 标记到该地理视图。
- [geoView.**tree**](/api/geo-view#geoviewtree) - 添加 tree 标记到该地理视图。
- [geoView.**wordCloud**](/api/geo-view#geoviewwordcloud) - 添加 wordCloud 标记到该地理视图。
- [geoView.**gauge**](/api/geo-view#geoviewgauge) - 添加 gauge 标记到该地理视图。

### 设置属性

- [geoView.**attr**](/api/geo-view#geoviewattr) - 设置或获取该复合视图的属性。
- [geoView.**data**](/api/geo-view#geoviewdata) - 设置或获取该复合视图的 data。
- [geoView.**transform**](/api/geo-view#geoviewtransform) - 设置或获取该复合视图的 transform。
- [geoView.**coordinate**](/api/geo-view#geoviewcoordinate) - 设置或获取该复合视图的 coordinate。
- [geoView.**theme**](/api/geo-view#geoviewtheme) - 设置或获取该复合视图的主题。
- [geoView.**style**](/api/geo-view#geoviewstyle) - 设置或获取该复合视图的 style。
- [geoView.**scale**](/api/geo-view#geoviewscale) - 设置或获取该复合视图的 scale。
- [geoView.**legend**](/api/geo-view#geoviewlegend) - 设置或获取该复合视图的 legend。

## [SpaceLayer](/api/space-layer)

### 创建可视化

- [spaceLayer.**view**](/api/space-layer#spacelayerview) - 添加 view 标记到该复合视图。
- [spaceLayer.**interval**](/api/space-layer#spacelayerinterval) - 添加 interval 标记到该复合视图。
- [spaceLayer.**rect**](/api/space-layer#spacelayerrect) - 添加 rect 标记到该复合视图。
- [spaceLayer.**point**](/api/space-layer#spacelayerpoint) - 添加 point 标记到该复合视图。
- [spaceLayer.**area**](/api/space-layer#spacelayerarea) - 添加 area 标记到该复合视图。
- [spaceLayer.**line**](/api/space-layer#spacelayerline) - 添加 line 标记到该复合视图。
- [spaceLayer.**vector**](/api/space-layer#spacelayervector) - 添加 vector 标记到该复合视图。
- [spaceLayer.**link**](/api/space-layer#spacelayerlink) - 添加 link 标记到该复合视图。
- [spaceLayer.**polygon**](/api/space-layer#spacelayerpolygon) - 添加 polygon 标记到该复合视图。
- [spaceLayer.**image**](/api/space-layer#spacelayerimage) - 添加 image 标记到该复合视图。
- [spaceLayer.**text**](/api/space-layer#spacelayertext) - 添加 text 标记到该复合视图。
- [spaceLayer.**lineX**](/api/space-layer#spacelayerlinex) - 添加 lineX 标记到该复合视图。
- [spaceLayer.**lineY**](/api/space-layer#spacelayerliney) - 添加 lineY 标记到该复合视图。
- [spaceLayer.**range**](/api/space-layer#spacelayerrange) - 添加 range 标记到该复合视图。
- [spaceLayer.**rangeX**](/api/space-layer#spacelayerrangex) - 添加 rangeX 标记到该复合视图。
- [spaceLayer.**rangeY**](/api/space-layer#spacelayerrangey) - 添加 rangeY 标记到该复合视图。
- [spaceLayer.**connector**](/api/space-layer#spacelayerconnector) - 添加 connector 标记到该复合视图。
- [spaceLayer.**sankey**](/api/space-layer#spacelayersankey) - 添加 sankey 标记到该复合视图。
- [spaceLayer.**treemap**](/api/space-layer#spacelayertreemap) - 添加 treemap 标记到该复合视图。
- [spaceLayer.**boxplot**](/api/space-layer#spacelayerboxplot) - 添加 boxplot 标记到该复合视图。
- [spaceLayer.**shape**](/api/space-layer#spacelayershape) - 添加 shape 标记到该复合视图。
- [spaceLayer.**pack**](/api/space-layer#spacelayerpack) - 添加 pack 标记到该复合视图。
- [spaceLayer.**forceGraph**](/api/space-layer#spacelayerforcegraph) - 添加 forceGraph 标记到该视图。
- [spaceLayer.**tree**](/api/space-layer#spacelayertree) - 添加 tree 标记到该视图。
- [spaceLayer.**wordCloud**](/api/space-layer#spacelayerwordcloud) - 添加 wordCloud 标记到该视图。
- [spaceLayer.**gauge**](/api/space-layer#spacelayergauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceLayer.**data**](/api/space-layer#spacelayerdata) - 设置或获取该复合视图的 data。

## [SpaceFlex](/api/space-flex)

### 创建可视化

- [spaceFlex.**view**](/api/space-flex#spaceflexview) - 添加 view 标记到该复合视图。
- [spaceFlex.**interval**](/api/space-flex#spaceflexinterval) - 添加 interval 标记到该复合视图。
- [spaceFlex.**rect**](/api/space-flex#spaceflexrect) - 添加 rect 标记到该复合视图。
- [spaceFlex.**point**](/api/space-flex#spaceflexpoint) - 添加 point 标记到该复合视图。
- [spaceFlex.**area**](/api/space-flex#spaceflexarea) - 添加 area 标记到该复合视图。
- [spaceFlex.**line**](/api/space-flex#spaceflexline) - 添加 line 标记到该复合视图。
- [spaceFlex.**vector**](/api/space-flex#spaceflexvector) - 添加 vector 标记到该复合视图。
- [spaceFlex.**link**](/api/space-flex#spaceflexlink) - 添加 link 标记到该复合视图。
- [spaceFlex.**polygon**](/api/space-flex#spaceflexpolygon) - 添加 polygon 标记到该复合视图。
- [spaceFlex.**image**](/api/space-flex#spacefleximage) - 添加 image 标记到该复合视图。
- [spaceFlex.**text**](/api/space-flex#spaceflextext) - 添加 text 标记到该复合视图。
- [spaceFlex.**lineX**](/api/space-flex#spaceflexlinex) - 添加 lineX 标记到该复合视图。
- [spaceFlex.**lineY**](/api/space-flex#spaceflexliney) - 添加 lineY 标记到该复合视图。
- [spaceFlex.**range**](/api/space-flex#spaceflexrange) - 添加 range 标记到该复合视图。
- [spaceFlex.**rangeX**](/api/space-flex#spaceflexrangex) - 添加 rangeX 标记到该复合视图。
- [spaceFlex.**rangeY**](/api/space-flex#spaceflexrangey) - 添加 rangeY 标记到该复合视图。
- [spaceFlex.**connector**](/api/space-flex#spaceflexconnector) - 添加 connector 标记到该复合视图。
- [spaceFlex.**sankey**](/api/space-flex#spaceflexsankey) - 添加 sankey 标记到该复合视图。
- [spaceFlex.**treemap**](/api/space-flex#spaceflextreemap) - 添加 treemap 标记到该复合视图。
- [spaceFlex.**boxplot**](/api/space-flex#spaceflexboxplot) - 添加 boxplot 标记到该复合视图。
- [spaceFlex.**shape**](/api/space-flex#spaceflexshape) - 添加 shape 标记到该复合视图。
- [spaceFlex.**pack**](/api/space-flex#spaceflexpack) - 添加 pack 标记到该复合视图。
- [spaceFlex.**forceGraph**](/api/space-flex#spaceflexforcegraph) - 添加 forceGraph 标记到该视图。
- [spaceFlex.**tree**](/api/space-flex#spaceflextree) - 添加 tree 标记到该视图。
- [spaceFlex.**wordCloud**](/api/space-flex#spaceflexwordcloud) - 添加 wordCloud 标记到该视图。
- [spaceFlex.**gauge**](/api/space-flex#spaceflexgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceFlex.**attr**](/api/space-flex#spaceflexattr) - 设置或获取该复合视图的属性。
- [spaceFlex.**data**](/api/space-flex#spaceflexdata) - 设置或获取该复合视图的 data。

## [FacetRect](/api/facet-rect)

### 创建可视化

- [facetRect.**view**](/api/facet-rect#facetrectview) - 添加 view 标记到该复合视图。
- [facetRect.**interval**](/api/facet-rect#facetrectinterval) - 添加 interval 标记到该复合视图。
- [facetRect.**rect**](/api/facet-rect#facetrectrect) - 添加 rect 标记到该复合视图。
- [facetRect.**point**](/api/facet-rect#facetrectpoint) - 添加 point 标记到该复合视图。
- [facetRect.**area**](/api/facet-rect#facetrectarea) - 添加 area 标记到该复合视图。
- [facetRect.**line**](/api/facet-rect#facetrectline) - 添加 line 标记到该复合视图。
- [facetRect.**vector**](/api/facet-rect#facetrectvector) - 添加 vector 标记到该复合视图。
- [facetRect.**link**](/api/facet-rect#facetrectlink) - 添加 link 标记到该复合视图。
- [facetRect.**polygon**](/api/facet-rect#facetrectpolygon) - 添加 polygon 标记到该复合视图。
- [facetRect.**image**](/api/facet-rect#facetrectimage) - 添加 image 标记到该复合视图。
- [facetRect.**text**](/api/facet-rect#facetrecttext) - 添加 text 标记到该复合视图。
- [facetRect.**lineX**](/api/facet-rect#facetrectlinex) - 添加 lineX 标记到该复合视图。
- [facetRect.**lineY**](/api/facet-rect#facetrectliney) - 添加 lineY 标记到该复合视图。
- [facetRect.**range**](/api/facet-rect#facetrectrange) - 添加 range 标记到该复合视图。
- [facetRect.**rangeX**](/api/facet-rect#facetrectrangex) - 添加 rangeX 标记到该复合视图。
- [facetRect.**rangeY**](/api/facet-rect#facetrectrangey) - 添加 rangeY 标记到该复合视图。
- [facetRect.**connector**](/api/facet-rect#facetrectconnector) - 添加 connector 标记到该复合视图。
- [facetRect.**sankey**](/api/facet-rect#facetrectsankey) - 添加 sankey 标记到该复合视图。
- [facetRect.**treemap**](/api/facet-rect#facetrecttreemap) - 添加 treemap 标记到该复合视图。
- [facetRect.**boxplot**](/api/facet-rect#facetrectboxplot) - 添加 boxplot 标记到该复合视图。
- [facetRect.**shape**](/api/facet-rect#facetrectshape) - 添加 shape 标记到该复合视图。
- [facetRect.**pack**](/api/facet-rect#facetrectpack) - 添加 pack 标记到该复合视图。
- [facetRect.**forceGraph**](/api/facet-rect#facetrectforcegraph) - 添加 forceGraph 标记到该视图。
- [facetRect.**tree**](/api/facet-rect#facetrecttree) - 添加 tree 标记到该视图。
- [facetRect.**wordCloud**](/api/facet-rect#facetrectwordcloud) - 添加 wordCloud 标记到该视图。
- [facetRect.**gauge**](/api/facet-rect#facetrectgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetRect.**attr**](/api/facet-rect#facetrectattr) - 设置或获取该复合视图的属性。
- [facetRect.**data**](/api/facet-rect#facetrectdata) - 设置或获取该复合视图的 data。
- [facetRect.**transform**](/api/facet-rect#facetrecttransform) - 设置或获取该复合视图的 transform。
- [facetRect.**theme**](/api/facet-rect#facetrecttheme) - 设置或获取该复合视图的主题。
- [facetRect.**style**](/api/facet-rect#facetrectstyle) - 设置或获取该复合视图的 style。
- [facetRect.**scale**](/api/facet-rect#facetrectscale) - 设置或获取该复合视图的 scale。
- [facetRect.**axis**](/api/facet-rect#facetrectaxis) - 设置或获取该复合视图的 axis。
- [facetRect.**legend**](/api/facet-rect#facetrectlegend) - 设置或获取该复合视图的 legend。

## [FacetCircle](/api/facet-circle)

### 创建可视化

- [facetCircle.**view**](/api/facet-circle#facetcircleview) - 添加 view 标记到该复合视图。
- [facetCircle.**interval**](/api/facet-circle#facetcircleinterval) - 添加 interval 标记到该复合视图。
- [facetCircle.**rect**](/api/facet-circle#facetcirclerect) - 添加 rect 标记到该复合视图。
- [facetCircle.**point**](/api/facet-circle#facetcirclepoint) - 添加 point 标记到该复合视图。
- [facetCircle.**area**](/api/facet-circle#facetcirclearea) - 添加 area 标记到该复合视图。
- [facetCircle.**line**](/api/facet-circle#facetcircleline) - 添加 line 标记到该复合视图。
- [facetCircle.**vector**](/api/facet-circle#facetcirclevector) - 添加 vector 标记到该复合视图。
- [facetCircle.**link**](/api/facet-circle#facetcirclelink) - 添加 link 标记到该复合视图。
- [facetCircle.**polygon**](/api/facet-circle#facetcirclepolygon) - 添加 polygon 标记到该复合视图。
- [facetCircle.**image**](/api/facet-circle#facetcircleimage) - 添加 image 标记到该复合视图。
- [facetCircle.**text**](/api/facet-circle#facetcircletext) - 添加 text 标记到该复合视图。
- [facetCircle.**lineX**](/api/facet-circle#facetcirclelinex) - 添加 lineX 标记到该复合视图。
- [facetCircle.**lineY**](/api/facet-circle#facetcircleliney) - 添加 lineY 标记到该复合视图。
- [facetCircle.**range**](/api/facet-circle#facetcirclerange) - 添加 range 标记到该复合视图。
- [facetCircle.**rangeX**](/api/facet-circle#facetcirclerangex) - 添加 rangeX 标记到该复合视图。
- [facetCircle.**rangeY**](/api/facet-circle#facetcirclerangey) - 添加 rangeY 标记到该复合视图。
- [facetCircle.**connector**](/api/facet-circle#facetcircleconnector) - 添加 connector 标记到该复合视图。
- [facetCircle.**sankey**](/api/facet-circle#facetcirclesankey) - 添加 sankey 标记到该复合视图。
- [facetCircle.**treemap**](/api/facet-circle#facetcircletreemap) - 添加 treemap 标记到该复合视图。
- [facetCircle.**boxplot**](/api/facet-circle#facetcircleboxplot) - 添加 boxplot 标记到该复合视图。
- [facetCircle.**shape**](/api/facet-circle#facetcircleshape) - 添加 shape 标记到该复合视图。
- [facetCircle.**pack**](/api/facet-circle#facetcirclepack) - 添加 pack 标记到该复合视图。
- [facetCircle.**forceGraph**](/api/facet-circle#facetcircleforcegraph) - 添加 forceGraph 标记到该视图。
- [facetCircle.**tree**](/api/facet-circle#facetcircletree) - 添加 tree 标记到该视图。
- [facetCircle.**wordCloud**](/api/facet-circle#facetcirclewordcloud) - 添加 wordCloud 标记到该视图。
- [facetCircle.**gauge**](/api/facet-circle#facetcirclegauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetCircle.**attr**](/api/facet-circle#facetcircleattr) - 设置或获取该复合视图的属性。
- [facetCircle.**data**](/api/facet-circle#facetcircledata) - 设置或获取该复合视图的 data。
- [facetCircle.**transform**](/api/facet-circle#facetcircletransform) - 设置或获取该复合视图的 transform。
- [facetCircle.**theme**](/api/facet-circle#facetcircletheme) - 设置或获取该复合视图的主题。
- [facetCircle.**style**](/api/facet-circle#facetcirclescale) - 设置或获取该复合视图的 style。
- [facetCircle.**scale**](/api/facet-circle#facetcirclescale) - 设置或获取该复合视图的 scale。
- [facetCircle.**axis**](/api/facet-circle#facetcircleaxis) - 设置或获取该复合视图的 axis。
- [facetCircle.**legend**](/api/facet-circle#facetcirclelegend) - 设置或获取该复合视图的 legend。

## [RepeatMatrix](/api/repeat-matrix)

### 创建可视化

- [repeatMatrix.**view**](/api/repeat-matrix#repeatmatrixview) - 添加 view 标记到该复合视图。
- [repeatMatrix.**interval**](/api/repeat-matrix#repeatmatrixinterval) - 添加 interval 标记到该复合视图。
- [repeatMatrix.**rect**](/api/repeat-matrix#repeatmatrixrect) - 添加 rect 标记到该复合视图。
- [repeatMatrix.**point**](/api/repeat-matrix#repeatmatrixpoint) - 添加 point 标记到该复合视图。
- [repeatMatrix.**area**](/api/repeat-matrix#repeatmatrixarea) - 添加 area 标记到该复合视图。
- [repeatMatrix.**line**](/api/repeat-matrix#repeatmatrixline) - 添加 line 标记到该复合视图。
- [repeatMatrix.**vector**](/api/repeat-matrix#repeatmatrixvector) - 添加 vector 标记到该复合视图。
- [repeatMatrix.**link**](/api/repeat-matrix#repeatmatrixlink) - 添加 link 标记到该复合视图。
- [repeatMatrix.**polygon**](/api/repeat-matrix#repeatmatrixpolygon) - 添加 polygon 标记到该复合视图。
- [repeatMatrix.**image**](/api/repeat-matrix#repeatmatriximage) - 添加 image 标记到该复合视图。
- [repeatMatrix.**text**](/api/repeat-matrix#repeatmatrixtext) - 添加 text 标记到该复合视图。
- [repeatMatrix.**lineX**](/api/repeat-matrix#repeatmatrixlinex) - 添加 lineX 标记到该复合视图。
- [repeatMatrix.**lineY**](/api/repeat-matrix#repeatmatrixliney) - 添加 lineY 标记到该复合视图。
- [repeatMatrix.**range**](/api/repeat-matrix#repeatmatrixrange) - 添加 range 标记到该复合视图。
- [repeatMatrix.**rangeX**](/api/repeat-matrix#repeatmatrixrangex) - 添加 rangeX 标记到该复合视图。
- [repeatMatrix.**rangeY**](/api/repeat-matrix#repeatmatrixrangey) - 添加 rangeY 标记到该复合视图。
- [repeatMatrix.**connector**](/api/repeat-matrix#repeatmatrixconnector) - 添加 connector 标记到该复合视图。
- [repeatMatrix.**sankey**](/api/repeat-matrix#repeatmatrixsankey) - 添加 sankey 标记到该复合视图。
- [repeatMatrix.**treemap**](/api/repeat-matrix#repeatmatrixtreemap) - 添加 treemap 标记到该复合视图。
- [repeatMatrix.**boxplot**](/api/repeat-matrix#repeatmatrixboxplot) - 添加 boxplot 标记到该复合视图。
- [repeatMatrix.**shape**](/api/repeat-matrix#repeatmatrixshape) - 添加 shape 标记到该复合视图。
- [repeatMatrix.**pack**](/api/repeat-matrix#repeatmatrixpack) - 添加 pack 标记到该复合视图。
- [repeatMatrix.**forceGraph**](/api/repeat-matrix#repeatmatrixforcegraph) - 添加 forceGraph 标记到该视图。
- [repeatMatrix.**tree**](/api/repeat-matrix#repeatmatrixtree) - 添加 tree 标记到该视图。
- [repeatMatrix.**wordCloud**](/api/repeat-matrix#repeatmatrixwordcloud) - 添加 wordCloud 标记到该视图。
- [repeatMatrix.**gauge**](/api/repeat-matrix#repeatmatrixgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [repeatMatrix.**attr**](/api/repeat-matrix#repeatmatrixattr) - 设置或获取该复合视图的属性。
- [repeatMatrix.**data**](/api/repeat-matrix#repeatmatrixdata) - 设置或获取该复合视图的 data。
- [repeatMatrix.**transform**](/api/repeat-matrix#repeatmatrixtransform) - 设置或获取该复合视图的 transform。
- [repeatMatrix.**theme**](/api/repeat-matrix#repeatmatrixtheme) - 设置或获取该复合视图的主题。
- [repeatMatrix.**style**](/api/repeat-matrix#repeatmatrixstyle) - 设置或获取该复合视图的 style。
- [repeatMatrix.**scale**](/api/repeat-matrix#repeatmatrixscale) - 设置或获取该复合视图的 scale。
- [repeatMatrix.**axis**](/api/repeat-matrix#repeatmatrixaxis) - 设置或获取该复合视图的 axis。
- [repeatMatrix.**legend**](/api/repeat-matrix#repeatmatrixlegend) - 设置或获取该复合视图的 legend。

## [TimingKeyframe](/api/timing-keyframe)

### 创建可视化

- [timingKeyframe.**interval**](/api/timing-keyframe#timingkeyframeinterval) - 添加 interval 标记到该复合视图。
- [timingKeyframe.**rect**](/api/timing-keyframe#timingkeyframerect) - 添加 rect 标记到该复合视图。
- [timingKeyframe.**point**](/api/timing-keyframe#timingkeyframepoint) - 添加 point 标记到该复合视图。
- [timingKeyframe.**area**](/api/timing-keyframe#timingkeyframearea) - 添加 area 标记到该复合视图。
- [timingKeyframe.**line**](/api/timing-keyframe#timingkeyframeline) - 添加 line 标记到该复合视图。
- [timingKeyframe.**vector**](/api/timing-keyframe#timingkeyframevector) - 添加 vector 标记到该复合视图。
- [timingKeyframe.**link**](/api/timing-keyframe#timingkeyframelink) - 添加 link 标记到该复合视图。
- [timingKeyframe.**polygon**](/api/timing-keyframe#timingkeyframepolygon) - 添加 polygon 标记到该复合视图。
- [timingKeyframe.**image**](/api/timing-keyframe#timingkeyframeimage) - 添加 image 标记到该复合视图。
- [timingKeyframe.**text**](/api/timing-keyframe#timingkeyframetext) - 添加 text 标记到该复合视图。
- [timingKeyframe.**lineX**](/api/timing-keyframe#timingkeyframelinex) - 添加 lineX 标记到该复合视图。
- [timingKeyframe.**lineY**](/api/timing-keyframe#timingkeyframeliney) - 添加 lineY 标记到该复合视图。
- [timingKeyframe.**range**](/api/timing-keyframe#timingkeyframerange) - 添加 range 标记到该复合视图。
- [timingKeyframe.**rangeX**](/api/timing-keyframe#timingkeyframerangex) - 添加 rangeX 标记到该复合视图。
- [timingKeyframe.**rangeY**](/api/timing-keyframe#timingkeyframerangey) - 添加 rangeY 标记到该复合视图。
- [timingKeyframe.**connector**](/api/timing-keyframe#timingkeyframeconnector) - 添加 connector 标记到该复合视图。
- [timingKeyframe.**sankey**](/api/timing-keyframe#timingkeyframesankey) - 添加 sankey 标记到该复合视图。
- [timingKeyframe.**treemap**](/api/timing-keyframe#timingkeyframetreemap) - 添加 treemap 标记到该复合视图。
- [timingKeyframe.**boxplot**](/api/timing-keyframe#timingkeyframeboxplot) - 添加 boxplot 标记到该复合视图。
- [timingKeyframe.**shape**](/api/timing-keyframe#timingkeyframeshape) - 添加 shape 标记到该复合视图。
- [timingKeyframe.**pack**](/api/timing-keyframe#timingkeyframepack) - 添加 pack 标记到该复合视图。
- [timingKeyframe.**forceGraph**](/api/timing-keyframe#timingkeyframeforcegraph) - 添加 forceGraph 标记到该视图。
- [timingKeyframe.**tree**](/api/timing-keyframe#timingkeyframetree) - 添加 tree 标记到该视图。
- [timingKeyframe.**wordCloud**](/api/timing-keyframe#timingkeyframewordcloud) - 添加 wordCloud 标记到该视图。
- [timingKeyframe.**gauge**](/api/timing-keyframe#timingkeyframegauge) - 添加 gauge 标记到该视图。

### 设置属性

- [timingKeyframe.**attr**](/api/timing-keyframe#timingkeyframeattr) - 设置或获取该复合视图的属性。
