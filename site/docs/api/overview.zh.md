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
- [chart.**shape**](/api/chart#chartshape) - 添加 shape 标记到该视图。
- [chart.**pack**](/api/chart#chartpack) - 添加 pack 标记到该视图。
- [chart.**forceGraph**](/api/chart#chartforcegraph) - 添加 forceGraph 标记到该视图。
- [chart.**tree**](/api/chart#charttree) - 添加 tree 标记到该视图。
- [chart.**wordCloud**](/api/chart#chartwordcloud) - 添加 wordCloud 标记到该视图。
- [chart.**gauge**](/api/chart#chartgauge) - 添加 gauge 标记到该视图。
- [chart.**view**](/api/chart#chartview) - 添加 view 到该图表。
- [chart.**spaceLayer**](/api/chart#chartspaceLayer)- 添加 spaceLayer 到该图表。
- [chart.**spaceFlex**](/api/chart#chartspaceflex) - 添加 spaceFlex 到该图表。
- [chart.**facetRect**](/api/chart#chartfacetrect) - 添加 facetRect 到该图表。
- [chart.**facetCircle**](/api/chart#chartfacetcircle) - 添加 facetCircle 到该图表。
- [chart.**repeatMatrix**](/api/chart#chartrepeatmatrix) - 添加 repeatMatrix 到该图表。
- [chart.**timingKeyframe**](/api/chart#charttimingkeyframe) - 添加 timingKeyframe 到该图表。
- [chart.**geoView**](/api/chart#chartgeoview) - 添加 geoView 到该图表。
- [chart.**geoPath**](/api/chart#chartgeopath) - 添加 geoPath 到该图表。

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
- [chart.**labelTransform**](/api/chart#labelTransform) - 设置或获取该视图的 labelTransform。

### 获取实例

- [chart.**getNodeByKey**](/api/chart/chart#chartgetnodesbykey) - 根据 key 获取 mark。
- [chart.**getNodeByType**](/api/chart#chartgetnodebytype) - 根据 type 获取 mark 数组。
- [chart.**getContext**](/api/chart#chartgetcontext) - 获取视图的 context 信息。
- [chart.**getContainer**](/api/chart#chartgetcontainer) - 获取视图的外部容器。
- [chart.**getView**](/api/chart#chartgetview) - 获取视图的 view 实例。
- [chart.**getCoordinate**](/api/chart#chartgetcoordinate) - 获取视图的 coordinate 实例。
- [chart.**getGroup**](/api/chart#chartgetGroup) - 获取视图的 canvas group 实例。
- [chart.**getScale**](/api/chart#chartgetScale) - 获取该视图的 scale。
- [chart.**getScaleByChannel**](/api/chart#chartgetScaleByChannel) - 获取指定通道的比例尺。

### 渲染图表

- [chart.**render**](/api/chart#chartrender) - 渲染图表。
- [chart.**clear**](/api/chart#chartclear) - 清空图表。
- [chart.**destroy**](/api/chart#chartdestroy) - 清空该视图并销毁 canvas 画布。
- [chart.**changeSize**](/api/chart#chartchangeSize) - 修改图表尺寸。
- [chart.**changeData**](/api/chart#changeData) - 修改图表数据。
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
- [mark.**encode**](/papi/mark#markecode) - 设置或获取 mark 的 encode。
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
- [mark.**getMark**](/api/mark#markgetMark) - 获取 mark 实例。
- [mark.**getScale**](/api/mark#markgetScale) - 获取 scale 实例。
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
- [view.**forceGraph**](/api/view#viewforceGraph) - 添加 forceGraph 标记到该视图。
- [view.**tree**](/api/view#viewtree) - 添加 tree 标记到该视图。
- [view.**wordCloud**](/api/view#viewwordCloud) - 添加 wordCloud 标记到该视图。
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

- [view.**getNodeByKey**](/api/view#viewgetnodesbykey) - 根据 key 获取标记。
- [view.**getNodeByType**](/api/view#viewgetnodesbytype) - 根据 key 获取标记数组。
- [view.**getView**](/api/view#viewgetview) - 获取视图的 view 实例。
- [view.**getCoordinate**](/api/view#viewgetcoordinate) - 获取视图的 coordinate 实例。
- [view.**getGroup**](/api/view#viewgetgroup) - 获取视图的 canvas group 实例。
- [view.**getView**](/api/view#viewgetview) - 获取视图的 view 实例。
- [view.**getCoordinate**](/api/view#viewgetcoordinate) - 获取视图的 coordinate 实例。
- [view.**getGroup**](/api/view#viewgetGroup) - 获取视图的 canvas group 实例。
- [view.**getScale**](/api/view#viewgetScale) - 获取该视图的 scale。
- [view.**getScaleByChannel**](/api/view#viewgetScaleByChannel) - 获取指定通道的比例尺。

## [GeoView](/api/geoview)

### 创建可视化

- [geoView.**view**](/api/geoview#geoviewview) - 添加 view 标记到该地理视图。
- [geoView.**interval**](/api/geoview#geoviewinterval) - 添加 interval 标记到该地理视图。
- [geoView.**rect**](/api/geoview#geoviewrect) - 添加 rect 标记到该地理视图。
- [geoView.**point**](/api/geoview#geoviewpoint) - 添加 point 标记到该地理视图。
- [geoView.**area**](/api/geoview#geoviewarea) - 添加 area 标记到该地理视图。
- [geoView.**line**](/api/geoview#geoviewline) - 添加 line 标记到该地理视图。
- [geoView.**vector**](/api/geoview#geoviewvector) - 添加 vector 标记到该地理视图。
- [geoView.**link**](/api/geoview#geoviewlink) - 添加 link 标记到该地理视图。
- [geoView.**polygon**](/api/geoview#geoviewpolygon) - 添加 polygon 标记到该地理视图。
- [geoView.**image**](/api/geoview#geoviewimage) - 添加 image 标记到该地理视图。
- [geoView.**text**](/api/geoview#geoviewtext) - 添加 text 标记到该地理视图。
- [geoView.**lineX**](/api/geoview#geoviewlineX) - 添加 lineX 标记到该地理视图。
- [geoView.**lineY**](/api/geoview#geoviewlineY) - 添加 lineY 标记到该地理视图。
- [geoView.**range**](/api/geoview#geoviewrange) - 添加 range 标记到该地理视图。
- [geoView.**rangeX**](/api/geoview#geoviewrangeX) - 添加 rangeX 标记到该地理视图。
- [geoView.**rangeY**](/api/geoview#geoviewrangeY) - 添加 rangeY 标记到该地理视图。
- [geoView.**connector**](/api/geoview#geoviewconnector) - 添加 connector 标记到该地理视图。
- [geoView.**sankey**](/api/geoview#geoviewsankey) - 添加 sankey 标记到该地理视图。
- [geoView.**treemap**](/api/geoview#geoviewtreemap) - 添加 treemap 标记到该地理视图。
- [geoView.**boxplot**](/api/geoview#geoviewboxplot) - 添加 boxplot 标记到该地理视图。
- [geoView.**shape**](/api/geoview#geoviewshape) - 添加 shape 标记到该地理视图。
- [geoView.**pack**](/api/geoview#geoviewpack) - 添加 pack 标记到该地理视图。
- [geoView.**forceGraph**](/api/geoview#geoviewforceGraph) - 添加 forceGraph 标记到该地理视图。
- [geoView.**tree**](/api/geoview#geoviewtree) - 添加 tree 标记到该地理视图。
- [geoView.**wordCloud**](/api/geoview#geoviewwordCloud) - 添加 wordCloud 标记到该地理视图。
- [geoView.**gauge**](/api/geoview#geoviewgauge) - 添加 gauge 标记到该地理视图。

### 设置属性

- [geoView.**attr**](/api/geoview#geoviewattr) - 设置或获取该复合视图的属性。
- [geoView.**data**](/api/geoview#geoviewdata) - 设置或获取该复合视图的 data。
- [geoView.**transform**](/api/geoview#geoviewtransform) - 设置或获取该复合视图的 transform。
- [geoView.**coordinate**](/api/geoview#geoviewcoordinate) - 设置或获取该复合视图的 coordinate。
- [geoView.**theme**](/api/geoview#geoviewtheme) - 设置或获取该复合视图的主题。
- [geoView.**style**](/api/geoview#geoviewstyle) - 设置或获取该复合视图的 style。
- [geoView.**scale**](/api/geoview#geoviewscale) - 设置或获取该复合视图的 scale。
- [geoView.**legend**](/api/geoview#geoviewlegend) - 设置或获取该复合视图的 legend。

## [SpaceLayer](/api/spacelayer)

### 创建可视化

- [spaceLayer.**view**](/api/spacelayer#spacelayerview) - 添加 view 标记到该复合视图。
- [spaceLayer.**interval**](/api/spacelayer#spacelayerinterval) - 添加 interval 标记到该复合视图。
- [spaceLayer.**rect**](/api/spacelayer#spacelayerrect) - 添加 rect 标记到该复合视图。
- [spaceLayer.**point**](/api/spacelayer#spacelayerpoint) - 添加 point 标记到该复合视图。
- [spaceLayer.**area**](/api/spacelayer#spacelayerarea) - 添加 area 标记到该复合视图。
- [spaceLayer.**line**](/api/spacelayer#spacelayerline) - 添加 line 标记到该复合视图。
- [spaceLayer.**vector**](/api/spacelayer#spacelayervector) - 添加 vector 标记到该复合视图。
- [spaceLayer.**link**](/api/spacelayer#spacelayerlink) - 添加 link 标记到该复合视图。
- [spaceLayer.**polygon**](/api/spacelayer#spacelayerpolygon) - 添加 polygon 标记到该复合视图。
- [spaceLayer.**image**](/api/spacelayer#spacelayerimage) - 添加 image 标记到该复合视图。
- [spaceLayer.**text**](/api/spacelayer#spacelayertext) - 添加 text 标记到该复合视图。
- [spaceLayer.**lineX**](/api/spacelayer#spacelayerlinex) - 添加 lineX 标记到该复合视图。
- [spaceLayer.**lineY**](/api/spacelayer#spacelayerliney) - 添加 lineY 标记到该复合视图。
- [spaceLayer.**range**](/api/spacelayer#spacelayerrange) - 添加 range 标记到该复合视图。
- [spaceLayer.**rangeX**](/api/spacelayer#spacelayerrangex) - 添加 rangeX 标记到该复合视图。
- [spaceLayer.**rangeY**](/api/spacelayer#spacelayerrangey) - 添加 rangeY 标记到该复合视图。
- [spaceLayer.**connector**](/api/spacelayer#spacelayerconnector) - 添加 connector 标记到该复合视图。
- [spaceLayer.**sankey**](/api/spacelayer#spacelayersankey) - 添加 sankey 标记到该复合视图。
- [spaceLayer.**treemap**](/api/spacelayer#spacelayertreemap) - 添加 treemap 标记到该复合视图。
- [spaceLayer.**boxplot**](/api/spacelayer#spacelayerboxplot) - 添加 boxplot 标记到该复合视图。
- [spaceLayer.**shape**](/api/spacelayer#spacelayershape) - 添加 shape 标记到该复合视图。
- [spaceLayer.**pack**](/api/spacelayer#spacelayerpack) - 添加 pack 标记到该复合视图。
- [spaceLayer.**forceGraph**](/api/spacelayer#spacelayerforcegraph) - 添加 forceGraph 标记到该视图。
- [spaceLayer.**tree**](/api/spacelayer#spacelayertree) - 添加 tree 标记到该视图。
- [spaceLayer.**wordCloud**](/api/spacelayer#spacelayerwordcloud) - 添加 wordCloud 标记到该视图。
- [spaceLayer.**gauge**](/api/spacelayer#spacelayergauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceLayer.**data**](/api/spacelayer#spacelayerdata) - 设置或获取该复合视图的 data。

## [SpaceFlex](/api/spaceflex)

### 创建可视化

- [spaceFlex.**view**](/api/spaceflex#spaceflexview) - 添加 view 标记到该复合视图。
- [spaceFlex.**interval**](/api/spaceflex#spaceflexinterval) - 添加 interval 标记到该复合视图。
- [spaceFlex.**rect**](/api/spaceflex#spaceflexrect) - 添加 rect 标记到该复合视图。
- [spaceFlex.**point**](/api/spaceflex#spaceflexpoint) - 添加 point 标记到该复合视图。
- [spaceFlex.**area**](/api/spaceflex#spaceflexarea) - 添加 area 标记到该复合视图。
- [spaceFlex.**line**](/api/spaceflex#spaceflexline) - 添加 line 标记到该复合视图。
- [spaceFlex.**vector**](/api/spaceflex#spaceflexvector) - 添加 vector 标记到该复合视图。
- [spaceFlex.**link**](/api/spaceflex#spaceflexlink) - 添加 link 标记到该复合视图。
- [spaceFlex.**polygon**](/api/spaceflex#spaceflexpolygon) - 添加 polygon 标记到该复合视图。
- [spaceFlex.**image**](/api/spaceflex#spacefleximage) - 添加 image 标记到该复合视图。
- [spaceFlex.**text**](/api/spaceflex#spaceflextext) - 添加 text 标记到该复合视图。
- [spaceFlex.**lineX**](/api/spaceflex#spaceflexlinex) - 添加 lineX 标记到该复合视图。
- [spaceFlex.**lineY**](/api/spaceflex#spaceflexliney) - 添加 lineY 标记到该复合视图。
- [spaceFlex.**range**](/api/spaceflex#spaceflexrange) - 添加 range 标记到该复合视图。
- [spaceFlex.**rangeX**](/api/spaceflex#spaceflexrangex) - 添加 rangeX 标记到该复合视图。
- [spaceFlex.**rangeY**](/api/spaceflex#spaceflexrangey) - 添加 rangeY 标记到该复合视图。
- [spaceFlex.**connector**](/api/spaceflex#spaceflexconnector) - 添加 connector 标记到该复合视图。
- [spaceFlex.**sankey**](/api/spaceflex#spaceflexsankey) - 添加 sankey 标记到该复合视图。
- [spaceFlex.**treemap**](/api/spaceflex#spaceflextreemap) - 添加 treemap 标记到该复合视图。
- [spaceFlex.**boxplot**](/api/spaceflex#spaceflexboxplot) - 添加 boxplot 标记到该复合视图。
- [spaceFlex.**shape**](/api/spaceflex#spaceflexshape) - 添加 shape 标记到该复合视图。
- [spaceFlex.**pack**](/api/spaceflex#spaceflexpack) - 添加 pack 标记到该复合视图。
- [spaceFlex.**forceGraph**](/api/spaceflex#spaceflexforcegraph) - 添加 forceGraph 标记到该视图。
- [spaceFlex.**tree**](/api/spaceflex#spaceflextree) - 添加 tree 标记到该视图。
- [spaceFlex.**wordCloud**](/api/spaceflex#spaceflexwordcloud) - 添加 wordCloud 标记到该视图。
- [spaceFlex.**gauge**](/api/spaceflex#spaceflexgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [spaceFlex.**attr**](/api/spaceflex#spaceflexattr) - 设置或获取该复合视图的属性。
- [spaceFlex.**data**](/api/spaceflex#spaceflexdata) - 设置或获取该复合视图的 data。

## [FacetRect](/api/facetrect)

### 创建可视化

- [facetRect.**view**](/api/facetrect#facetrectview) - 添加 view 标记到该复合视图。
- [facetRect.**interval**](/api/facetrect#facetrectinterval) - 添加 interval 标记到该复合视图。
- [facetRect.**rect**](/api/facetrect#facetrectrect) - 添加 rect 标记到该复合视图。
- [facetRect.**point**](/api/facetrect#facetrectpoint) - 添加 point 标记到该复合视图。
- [facetRect.**area**](/api/facetrect#facetrectarea) - 添加 area 标记到该复合视图。
- [facetRect.**line**](/api/facetrect#facetrectline) - 添加 line 标记到该复合视图。
- [facetRect.**vector**](/api/facetrect#facetrectvector) - 添加 vector 标记到该复合视图。
- [facetRect.**link**](/api/facetrect#facetrectlink) - 添加 link 标记到该复合视图。
- [facetRect.**polygon**](/api/facetrect#facetrectpolygon) - 添加 polygon 标记到该复合视图。
- [facetRect.**image**](/api/facetrect#facetrectimage) - 添加 image 标记到该复合视图。
- [facetRect.**text**](/api/facetrect#facetrecttext) - 添加 text 标记到该复合视图。
- [facetRect.**lineX**](/api/facetrect#facetrectlinex) - 添加 lineX 标记到该复合视图。
- [facetRect.**lineY**](/api/facetrect#facetrectliney) - 添加 lineY 标记到该复合视图。
- [facetRect.**range**](/api/facetrect#facetrectrange) - 添加 range 标记到该复合视图。
- [facetRect.**rangeX**](/api/facetrect#facetrectrangex) - 添加 rangeX 标记到该复合视图。
- [facetRect.**rangeY**](/api/facetrect#facetrectrangey) - 添加 rangeY 标记到该复合视图。
- [facetRect.**connector**](/api/facetrect#facetrectconnector) - 添加 connector 标记到该复合视图。
- [facetRect.**sankey**](/api/facetrect#facetrectsankey) - 添加 sankey 标记到该复合视图。
- [facetRect.**treemap**](/api/facetrect#facetrecttreemap) - 添加 treemap 标记到该复合视图。
- [facetRect.**boxplot**](/api/facetrect#facetrectboxplot) - 添加 boxplot 标记到该复合视图。
- [facetRect.**shape**](/api/facetrect#facetrectshape) - 添加 shape 标记到该复合视图。
- [facetRect.**pack**](/api/facetrect#facetrectpack) - 添加 pack 标记到该复合视图。
- [facetRect.**forceGraph**](/api/facetrect#facetrectforcegraph) - 添加 forceGraph 标记到该视图。
- [facetRect.**tree**](/api/facetrect#facetrecttree) - 添加 tree 标记到该视图。
- [facetRect.**wordCloud**](/api/facetrect#facetrectwordcloud) - 添加 wordCloud 标记到该视图。
- [facetRect.**gauge**](/api/facetrect#facetrectgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetRect.**attr**](/api/facetrect#facetrectattr) - 设置或获取该复合视图的属性。
- [facetRect.**data**](/api/facetrect#facetrectdata) - 设置或获取该复合视图的 data。
- [facetRect.**transform**](/api/facetrect#facetrecttransform) - 设置或获取该复合视图的 transform。
- [facetRect.**theme**](/api/facetrect#facetrecttheme) - 设置或获取该复合视图的主题。
- [facetRect.**style**](/api/facetrect#facetrectstyle) - 设置或获取该复合视图的 style。
- [facetRect.**scale**](/api/facetrect#facetrectscale) - 设置或获取该复合视图的 scale。
- [facetRect.**axis**](/api/facetrect#facetrectaxis) - 设置或获取该复合视图的 axis。
- [facetRect.**legend**](/api/facetrect#facetrectlegend) - 设置或获取该复合视图的 legend。

## [FacetCircle](/api/facetcircle)

### 创建可视化

- [facetCircle.**view**](/api/facetcircle#facetcircleview) - 添加 view 标记到该复合视图。
- [facetCircle.**interval**](/api/facetcircle#facetcircleinterval) - 添加 interval 标记到该复合视图。
- [facetCircle.**rect**](/api/facetcircle#facetcirclerect) - 添加 rect 标记到该复合视图。
- [facetCircle.**point**](/api/facetcircle#facetcirclepoint) - 添加 point 标记到该复合视图。
- [facetCircle.**area**](/api/facetcircle#facetcirclearea) - 添加 area 标记到该复合视图。
- [facetCircle.**line**](/api/facetcircle#facetcircleline) - 添加 line 标记到该复合视图。
- [facetCircle.**vector**](/api/facetcircle#facetcirclevector) - 添加 vector 标记到该复合视图。
- [facetCircle.**link**](/api/facetcircle#facetcirclelink) - 添加 link 标记到该复合视图。
- [facetCircle.**polygon**](/api/facetcircle#facetcirclepolygon) - 添加 polygon 标记到该复合视图。
- [facetCircle.**image**](/api/facetcircle#facetcircleimage) - 添加 image 标记到该复合视图。
- [facetCircle.**text**](/api/facetcircle#facetcircletext) - 添加 text 标记到该复合视图。
- [facetCircle.**lineX**](/api/facetcircle#facetcirclelinex) - 添加 lineX 标记到该复合视图。
- [facetCircle.**lineY**](/api/facetcircle#facetcircleliney) - 添加 lineY 标记到该复合视图。
- [facetCircle.**range**](/api/facetcircle#facetcirclerange) - 添加 range 标记到该复合视图。
- [facetCircle.**rangeX**](/api/facetcircle#facetcirclerangex) - 添加 rangeX 标记到该复合视图。
- [facetCircle.**rangeY**](/api/facetcircle#facetcirclerangey) - 添加 rangeY 标记到该复合视图。
- [facetCircle.**connector**](/api/facetcircle#facetcircleconnector) - 添加 connector 标记到该复合视图。
- [facetCircle.**sankey**](/api/facetcircle#facetcirclesankey) - 添加 sankey 标记到该复合视图。
- [facetCircle.**treemap**](/api/facetcircle#facetcircletreemap) - 添加 treemap 标记到该复合视图。
- [facetCircle.**boxplot**](/api/facetcircle#facetcircleboxplot) - 添加 boxplot 标记到该复合视图。
- [facetCircle.**shape**](/api/facetcircle#facetcircleshape) - 添加 shape 标记到该复合视图。
- [facetCircle.**pack**](/api/facetcircle#facetcirclepack) - 添加 pack 标记到该复合视图。
- [facetCircle.**forceGraph**](/api/facetcircle#facetcircleforcegraph) - 添加 forceGraph 标记到该视图。
- [facetCircle.**tree**](/api/facetcircle#facetcircletree) - 添加 tree 标记到该视图。
- [facetCircle.**wordCloud**](/api/facetcircle#facetcirclewordcloud) - 添加 wordCloud 标记到该视图。
- [facetCircle.**gauge**](/api/facetcircle#facetcirclegauge) - 添加 gauge 标记到该视图。

### 设置属性

- [facetCircle.**attr**](/api/facetcircle#facetcircleattr) - 设置或获取该复合视图的属性。
- [facetCircle.**data**](/api/facetcircle#facetcircledata) - 设置或获取该复合视图的 data。
- [facetCircle.**transform**](/api/facetcircle#facetcircletransform) - 设置或获取该复合视图的 transform。
- [facetCircle.**theme**](/api/facetcircle#facetcircletheme) - 设置或获取该复合视图的主题。
- [facetCircle.**style**](/api/facetcircle#facetcirclescale) - 设置或获取该复合视图的 style。
- [facetCircle.**scale**](/api/facetcircle#facetcirclescale) - 设置或获取该复合视图的 scale。
- [facetCircle.**axis**](/api/facetcircle#facetcircleaxis) - 设置或获取该复合视图的 axis。
- [facetCircle.**legend**](/api/facetcircle#facetcirclelegend) - 设置或获取该复合视图的 legend。

## [RepeatMatrix](/api/repeatmatrix)

### 创建可视化

- [repeatMatrix.**view**](/api/repeatmatrix#repeatmatrixview) - 添加 view 标记到该复合视图。
- [repeatMatrix.**interval**](/api/repeatmatrix#repeatmatrixinterval) - 添加 interval 标记到该复合视图。
- [repeatMatrix.**rect**](/api/repeatmatrix#repeatmatrixrect) - 添加 rect 标记到该复合视图。
- [repeatMatrix.**point**](/api/repeatmatrix#repeatmatrixpoint) - 添加 point 标记到该复合视图。
- [repeatMatrix.**area**](/api/repeatmatrix#repeatmatrixarea) - 添加 area 标记到该复合视图。
- [repeatMatrix.**line**](/api/repeatmatrix#repeatmatrixline) - 添加 line 标记到该复合视图。
- [repeatMatrix.**vector**](/api/repeatmatrix#repeatmatrixvector) - 添加 vector 标记到该复合视图。
- [repeatMatrix.**link**](/api/repeatmatrix#repeatmatrixlink) - 添加 link 标记到该复合视图。
- [repeatMatrix.**polygon**](/api/repeatmatrix#repeatmatrixpolygon) - 添加 polygon 标记到该复合视图。
- [repeatMatrix.**image**](/api/repeatmatrix#repeatmatriximage) - 添加 image 标记到该复合视图。
- [repeatMatrix.**text**](/api/repeatmatrix#repeatmatrixtext) - 添加 text 标记到该复合视图。
- [repeatMatrix.**lineX**](/api/repeatmatrix#repeatmatrixlinex) - 添加 lineX 标记到该复合视图。
- [repeatMatrix.**lineY**](/api/repeatmatrix#repeatmatrixliney) - 添加 lineY 标记到该复合视图。
- [repeatMatrix.**range**](/api/repeatmatrix#repeatmatrixrange) - 添加 range 标记到该复合视图。
- [repeatMatrix.**rangeX**](/api/repeatmatrix#repeatmatrixrangex) - 添加 rangeX 标记到该复合视图。
- [repeatMatrix.**rangeY**](/api/repeatmatrix#repeatmatrixrangey) - 添加 rangeY 标记到该复合视图。
- [repeatMatrix.**connector**](/api/repeatmatrix#repeatmatrixconnector) - 添加 connector 标记到该复合视图。
- [repeatMatrix.**sankey**](/api/repeatmatrix#repeatmatrixsankey) - 添加 sankey 标记到该复合视图。
- [repeatMatrix.**treemap**](/api/repeatmatrix#repeatmatrixtreemap) - 添加 treemap 标记到该复合视图。
- [repeatMatrix.**boxplot**](/api/repeatmatrix#repeatmatrixboxplot) - 添加 boxplot 标记到该复合视图。
- [repeatMatrix.**shape**](/api/repeatmatrix#repeatmatrixshape) - 添加 shape 标记到该复合视图。
- [repeatMatrix.**pack**](/api/repeatmatrix#repeatmatrixpack) - 添加 pack 标记到该复合视图。
- [repeatMatrix.**forceGraph**](/api/repeatmatrix#repeatmatrixforcegraph) - 添加 forceGraph 标记到该视图。
- [repeatMatrix.**tree**](/api/repeatmatrix#repeatmatrixtree) - 添加 tree 标记到该视图。
- [repeatMatrix.**wordCloud**](/api/repeatmatrix#repeatmatrixwordcloud) - 添加 wordCloud 标记到该视图。
- [repeatMatrix.**gauge**](/api/repeatmatrix#repeatmatrixgauge) - 添加 gauge 标记到该视图。

### 设置属性

- [repeatMatrix.**attr**](/api/repeatmatrix#repeatmatrixattr) - 设置或获取该复合视图的属性。
- [repeatMatrix.**data**](/api/repeatmatrix#repeatmatrixdata) - 设置或获取该复合视图的 data。
- [repeatMatrix.**transform**](/api/repeatmatrix#repeatmatrixtransform) - 设置或获取该复合视图的 transform。
- [repeatMatrix.**theme**](/api/repeatmatrix#repeatmatrixtheme) - 设置或获取该复合视图的主题。
- [repeatMatrix.**style**](/api/repeatmatrix#repeatmatrixstyle) - 设置或获取该复合视图的 style。
- [repeatMatrix.**scale**](/api/repeatmatrix#repeatmatrixscale) - 设置或获取该复合视图的 scale。
- [repeatMatrix.**axis**](/api/repeatmatrix#repeatmatrixaxis) - 设置或获取该复合视图的 axis。
- [repeatMatrix.**legend**](/api/repeatmatrix#repeatmatrixlegend) - 设置或获取该复合视图的 legend。

## [TimingKeyframe](/api/timingkeyframe)

### 创建可视化

- [timingKeyFrame.**interval**](/api/timingkeyframe#timingkeyframeinterval) - 添加 interval 标记到该复合视图。
- [timingKeyFrame.**rect**](/api/timingkeyframe#timingkeyframerect) - 添加 rect 标记到该复合视图。
- [timingKeyFrame.**point**](/api/timingkeyframe#timingkeyframepoint) - 添加 point 标记到该复合视图。
- [timingKeyFrame.**area**](/api/timingkeyframe#timingkeyframearea) - 添加 area 标记到该复合视图。
- [timingKeyFrame.**line**](/api/timingkeyframe#timingkeyframeline) - 添加 line 标记到该复合视图。
- [timingKeyFrame.**vector**](/api/timingkeyframe#timingkeyframevector) - 添加 vector 标记到该复合视图。
- [timingKeyFrame.**link**](/api/timingkeyframe#timingkeyframelink) - 添加 link 标记到该复合视图。
- [timingKeyFrame.**polygon**](/api/timingkeyframe#timingkeyframepolygon) - 添加 polygon 标记到该复合视图。
- [timingKeyFrame.**image**](/api/timingkeyframe#timingkeyframeimage) - 添加 image 标记到该复合视图。
- [timingKeyFrame.**text**](/api/timingkeyframe#timingkeyframetext) - 添加 text 标记到该复合视图。
- [timingKeyFrame.**lineX**](/api/timingkeyframe#timingkeyframelinex) - 添加 lineX 标记到该复合视图。
- [timingKeyFrame.**lineY**](/api/timingkeyframe#timingkeyframeliney) - 添加 lineY 标记到该复合视图。
- [timingKeyFrame.**range**](/api/timingkeyframe#timingkeyframerange) - 添加 range 标记到该复合视图。
- [timingKeyFrame.**rangeX**](/api/timingkeyframe#timingkeyframerangex) - 添加 rangeX 标记到该复合视图。
- [timingKeyFrame.**rangeY**](/api/timingkeyframe#timingkeyframerangey) - 添加 rangeY 标记到该复合视图。
- [timingKeyFrame.**connector**](/api/timingkeyframe#timingkeyframeconnector) - 添加 connector 标记到该复合视图。
- [timingKeyFrame.**sankey**](/api/timingkeyframe#timingkeyframesankey) - 添加 sankey 标记到该复合视图。
- [timingKeyFrame.**treemap**](/api/timingkeyframe#timingkeyframetreemap) - 添加 treemap 标记到该复合视图。
- [timingKeyFrame.**boxplot**](/api/timingkeyframe#timingkeyframeboxplot) - 添加 boxplot 标记到该复合视图。
- [timingKeyFrame.**shape**](/api/timingkeyframe#timingkeyframeshape) - 添加 shape 标记到该复合视图。
- [timingKeyFrame.**pack**](/api/timingkeyframe#timingkeyframepack) - 添加 pack 标记到该复合视图。
- [timingKeyFrame.**forceGraph**](/api/timingkeyframe#timingkeyframeforcegraph) - 添加 forceGraph 标记到该视图。
- [timingKeyFrame.**tree**](/api/timingkeyframe#timingkeyframetree) - 添加 tree 标记到该视图。
- [timingKeyFrame.**wordCloud**](/api/timingkeyframe#timingkeyframewordcloud) - 添加 wordCloud 标记到该视图。
- [timingKeyFrame.**gauge**](/api/timingkeyframe#timingkeyframegauge) - 添加 gauge 标记到该视图。

### 设置属性

- [timingKeyFrame.**attr**](/api/timingkeyframe#timingkeyframeattr) - 设置或获取该复合视图的属性。
