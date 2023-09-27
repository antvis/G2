---
title: 概览
order: 1
---

Provides a concise imperative API to generate charts in one sentence.

## [Chart](/api/chart)

### Create a visualization

* [new Chart](/api/chart#new-chart)- Create Chart instance.
* [chart.**interval**](/api/chart#chartinterval)- Add interval tag to this view.
* [chart.**rect**](/api/chart#chartrect)- Add rect tag to this view.
* [chart.**point**](/api/chart#chartpoint)- Add a point marker to the view.
* [chart.**area**](/api/chart#chartarea)- Add area tag to this view.
* [chart.**line**](/api/chart#chartline)- Add line tag to this view.
* [chart.**vector**](/api/chart#chartvector)- Add vector tag to this view.
* [chart.**link**](/api/chart#chartlink)- Add link tag to this view.
* [chart.**polygon**](/api/chart#chartpolygon)- Add polygon tag to this view.
* [chart.**image**](/api/chart#chartimage)- Add image tag to this view.
* [chart.**text**](/api/chart#charttext)- Add text tag to this view.
* [chart.**lineX**](/api/chart#chartlinex)- Add lineX markup to this view.
* [chart.**lineY**](/api/chart#chartliney)- Add lineY tag to this view.
* [chart.**range**](/api/chart#chartrange)- Add range tag to this view.
* [chart.**rangeX**](/api/chart#chartrangex)- Add rangeX tag to this view.
* [chart.**rangeY**](/api/chart#chartrangey)- Add rangeY tag to this view.
* [chart.**connector**](/api/chart#chartconnector)- Add connector tag to this view.
* [chart.**sankey**](/api/chart#chartsankey)- Add sankey tag to this view.
* [chart.**treemap**](/api/chart#charttreemap)- Add treemap markup to this view.
* [chart.**boxplot**](/api/chart#chartboxplot)- Add boxplot markers to the view.
* [chart.**density**](/api/chart#density)- Add density tag to this view.
* [chart.**heatmap**](/api/chart#heatmap)- Add heatmap markers to this view.
* [chart.**shape**](/api/chart#chartshape)- Add a shape tag to the view.
* [chart.**pack**](/api/chart#chartpack)- Add pack tag to this view.
* [chart.**forceGraph**](/api/chart#chartforcegraph)- Add forceGraph tag to this view.
* [chart.**tree**](/api/chart#charttree)- Add tree tag to this view.
* [chart.**wordCloud**](/api/chart#chartwordcloud)- Add wordCloud markup to this view.
* [chart.**gauge**](/api/chart#chartgauge)- Add gauge markers to the view.
* [chart.**view**](/api/chart#chartview)- Add a view to the chart.
* [chart.**spaceLayer**](/api/chart#chartspacelayer)- Add a spaceLayer to the chart.
* [chart.**spaceFlex**](/api/chart#chartspaceflex)- Add spaceFlex to the diagram.
* [chart.**facetRect**](/api/chart#chartfacetrect)- Add facetRect to the chart.
* [chart.**facetCircle**](/api/chart#chartfacetcircle)- Add facetCircle to the chart.
* [chart.**repeatMatrix**](/api/chart#chartrepeatmatrix)- Add repeatMatrix to the chart.
* [chart.**timingKeyframe**](/api/chart#charttimingkeyframe)- Add timingKeyframe to this chart.
* [chart.**geoView**](/api/chart#chartgeoview)- Add a geoView to the chart.
* [chart.**geoPath**](/api/chart#chartgeopath)- Add geoPath to the chart.
* [chart.**point3D**](/api/chart#chartpoint3d)- Add point3D marker to this view.

### Set properties

* [chart.**attr**](/api/chart#charter)- Set or get chart properties.
* [chart.**width**](/api/chart#chartwidth)- Set or get the width property.
* [chart.**height**](/api/chart#chartheight)- Set or get the height attribute.
* [chart.**title**](/api/chart#charttitle)- Set or get the title attribute.
* [chart.**encode**](/api/chart#chartencode)- Set or get the encode of chart.
* [chart.**options**](/api/chart#chartoptions)- Set or get properties on the view.
* [chart.**data**](/api/chart#chartdata)- Set or get the data of this view.
* [chart.**transform**](/api/chart#charttransform)- Set or get the transform of this view.
* [chart.**theme**](/api/chart#charttheme)- Set or get the theme of this view.
* [chart.**style**](/api/chart#chartstyle)- Set or get the style of this view.
* [chart.**scale**](/api/chart#chartscale)- Set or get the scale of this view.
* [chart.**coordinate**](/api/chart#chartcoordinate)- Set or get the coordinate of this view.
* [chart.**axis**](/api/chart#chartaxis)- Set or get the axis of this view.
* [chart.**legend**](/api/chart#chartlegend)- Set or get the legend of this view.
* [chart.**labelTransform**](/api/chart#labeltransform)- Set or get the labelTransform of this view.

### Get instance

* [chart.**getNodeByKey**](/api/chart#chartgetnodebykey)- Get mark based on key.
* [chart.**getNodeByType**](/api/chart#chartgetnodesbytype)- Get the mark array based on type.
* [chart.**getContext**](/api/chart#chartgetcontext)- Get the context information of the view.
* [chart.**getContainer**](/api/chart#chartgetcontainer)- Get the outer container of the view.
* [chart.**getView**](/api/chart#chartgetview)- Get the view instance of the view.
* [chart.**getCoordinate**](/api/chart#chartgetcoordinate)- Get the coordinate instance of the view.
* [chart.**getGroup**](/api/chart#chartgetgroup)- Get the canvas group instance of the view.
* [chart.**getScale**](/api/chart#chartgetscale)- Get the scale of this view.
* [chart.**getScaleByChannel**](/api/chart#chartgetscalebychannel)- Get the scale of the specified channel.

### Render chart

* [chart.**render**](/api/chart#chartrender)- Render charts.
* [chart.**clear**](/api/chart#chartclear)- Clear the chart.
* [chart.**destroy**](/api/chart#chartdestroy)- Clear the view and destroy the canvas.
* [chart.**changeSize**](/api/chart#chartchangesize)- Modify chart size.
* [chart.**changeData**](/api/chart#changedata)- Modify chart data.
* [chart.**forceFit**](/api/chart#chartforceFit)- Force adaptive layout.
* [chart.**show**](/api/chart#show)- Display graph.
* [chart.**hide**](/api/chart#hide)- Hide chart.

### event

* [chart.**on**](/api/chart#charton)- Listen to chart events.
* [chart.**once**](/api/chart#chartonce)- Listen to chart events (only allowed to be executed once).
* [chart.**emit**](/api/chart#chartemit)- Trigger view events.
* [chart.**off**](/api/chart#chartoff)- Destroy view event.

## [Mark](/api/mark)

### Set properties

* [mark.**attr**](/api/mark#marketer)- Set or get the attributes of mark.
* [mark.**data**](/api/market#marketdata)- Set or get mark's data.
* [mark.**encode**](/papi/mark#markecode)- Set or get the encode of mark.
* [mark.**transform**](/api/mark#marktransform)- Set or get mark's transform.
* [mark.**scale**](/api/mark#markscale)- Set or get the scale of mark.
* [mark.**interaction**](/api/mark#markinteraction)- Set or get mark's interaction.
* [mark.**label**](/api/mark#marklabel)- Set or get the label of mark.
* [mark.**animate**](/api/mark#marknameitem)- Set or get mark's animate.
* [mark.**coordinate**](/api/mark#markcoordinate)- Set or get the coordinate of mark.
* [mark.**axis**](/api/mark#markaxis)- Set or get the axis of mark.
* [mark.**legend**](/api/mark#marklegend)- Set or get mark's legend.
* [mark.**slider**](/api/mark#markslider)- Set or get the slider of mark.
* [mark.**scrollbar**](/api/mark#markscrollbar)- Set or get mark's scrollbar.
* [mark.**state**](/api/mark#markstate)- Set or get mark's state.
* [mark.**tooltip**](/api/mark#marktooltip)- Set or get mark's tooltip.

### Get instance

* [mark.**changeData**](/api/mark#markchangedata)- Modify mark data.
* [mark.**getMark**](/api/market#marketgetmarket)- Get mark instance.
* [mark.**getScale**](/api/market#marketgetscale)- Get scale instance.
* [mark.**getScaleByChannel**](/api/market#marketgetscalebychannel)- Get the scale instance of the specified channel.
* [mark.**getGroup**](/api/market#marketgetgroup)- Get canvas group instance.

## [View](/api/view)

### Create a visualization

* [view.**interval**](/api/view#viewinterval)- Add interval tag to this view.
* [view.**rect**](/api/view#viewrect)- Add rect tag to this view.
* [view.**point**](/api/view#viewpoint)- Add a point marker to the view.
* [view.**area**](/api/view#viewarea)- Add area tag to this view.
* [view.**line**](/api/view#viewline)- Add line tag to this view.
* [view.**vector**](/api/view#viewvector)- Add vector tag to this view.
* [view.**link**](/api/view#viewlink)- Add link tag to this view.
* [view.**polygon**](/api/view#viewpolygon)- Add polygon tag to this view.
* [view.**image**](/api/view#viewimage)- Add image tag to this view.
* [view.**text**](/api/view#viewtext)- Add text tag to this view.
* [view.**lineX**](/api/view#viewlinex)- Add lineX markup to this view.
* [view.**lineY**](/api/view#viewliney)- Add lineY tag to this view.
* [view.**range**](/api/view#viewrange)- Add range tag to this view.
* [view.**rangeX**](/api/view#viewrangex)- Add rangeX tag to this view.
* [view.**rangeY**](/api/view#viewrangey)- Add rangeY tag to this view.
* [view.**connector**](/api/view#viewconnector)- Add connector tag to this view.
* [view.**sankey**](/api/view#viewsankey)- Add sankey tag to this view.
* [view.**treemap**](/api/view#viewtreemap)- Add treemap markup to this view.
* [view.**boxplot**](/api/view#viewboxplot)- Add boxplot markers to the view.
* [view.**shape**](/api/view#viewshape)- Add a shape tag to the view.
* [view.**pack**](/api/view#viewpack)- Add pack tag to this view.
* [view.**forceGraph**](/api/view#viewforcegraph)- Add forceGraph tag to this view.
* [view.**tree**](/api/view#viewtree)- Add tree tag to this view.
* [view.**wordCloud**](/api/view#viewwordcloud)- Add wordCloud markup to this view.
* [view.**gauge**](/api/view#viewgauge)- Add gauge markers to the view.

### Set properties

* [view.**attr**](/api/view#viewattr)- Set or get the properties of this view.
* [view.**coordinate**](/api/view#viewcoordinate)- Declare the coordinate of this view.
* [view.**data**](/api/view#viewdata)- Set or get the data of this view.
* [view.**transform**](/api/view#viewtransform)- Set or get the transform of this view.
* [view.**interaction**](/api/view#viewinteraction)- Set or get the interaction of the view.
* [view.**theme**](/api/view#viewtheme)- Set or get the theme of this view.
* [view.**style**](/api/view#viewstyle)- Set or get the style of this view.
* [view.**scale**](/api/view#viewscale)- Set or get the scale of this view.
* [view.**axis**](/api/view#viewaxis)- Set or get the axis of this view.
* [view.**legend**](/api/view#viewlegend)- Set or get the legend of this view.
* [view.**labelTransform**](/api/view#viewlabeltranform)- Set or get the labelTransform of this view.

### Get instance

* [view.**getNodeByKey**](/api/view#viewgetnodebykey)- Get the tag based on key.
* [view.**getNodeByType**](/api/view#viewgetnodesbytype)- Get the tag array based on key.
* [view.**getView**](/api/view#viewgetview)- Get the view instance of the view.
* [view.**getCoordinate**](/api/view#viewgetcoordinate)- Get the coordinate instance of the view.
* [view.**getGroup**](/api/view#viewgetgroup)- Get the canvas group instance of the view.
* [view.**getView**](/api/view#viewgetview)- Get the view instance of the view.
* [view.**getCoordinate**](/api/view#viewgetcoordinate)- Get the coordinate instance of the view.
* [view.**getGroup**](/api/view#viewgetgroup)- Get the canvas group instance of the view.
* [view.**getScale**](/api/view#viewgetscale)- Get the scale of this view.
* [view.**getScaleByChannel**](/api/view#viewgetscalebychannel)- Get the scale of the specified channel.

## [GeoView](/api/geo-view)

### Create a visualization

* [geoView.**view**](/api/geo-view#geoviewview)- Add view tag to this geoview.
* [geoView.**interval**](/api/geo-view#geoviewinterval)- Add interval tag to this geography view.
* [geoView.**rect**](/api/geo-view#geoviewrect)- Add rect tag to this geoview.
* [geoView.**point**](/api/geo-view#geoviewpoint)- Add point markers to this geographical view.
* [geoView.**area**](/api/geo-view#geoviewarea)- Add area tag to this geography view.
* [geoView.**line**](/api/geo-view#geoviewline)- Add line markers to this geography view.
* [geoView.**vector**](/api/geo-view#geoviewvector)- Add vector tags to this geography view.
* [geoView.**link**](/api/geo-view#geoviewlink)-Add link tag to this geographical view.
* [geoView.**polygon**](/api/geo-view#geoviewpolygon)- Add polygon tags to this geography view.
* [geoView.**image**](/api/geo-view#geoviewimage)- Add image tag to this geographical view.
* [geoView.**text**](/api/geo-view#geoviewtext)-Add text tag to this geography view.
* [geoView.**lineX**](/api/geo-view#geoviewlineX)- Add lineX markup to this geography view.
* [geoView.**lineY**](/api/geo-view#geoviewlineY)- Add lineY markers to this geographic view.
* [geoView.**range**](/api/geo-view#geoviewrange)- Add range markers to this geography view.
* [geoView.**rangeX**](/api/geo-view#geoviewrangeX)- Add rangeX markers to this geography view.
* [geoView.**rangeY**](/api/geo-view#geoviewrangeY)- Add rangeY marker to this geography view.
* [geoView.**connector**](/api/geo-view#geoviewconnector)- Add connector tag to this geography view.
* [geoView.**sankey**](/api/geo-view#geoviewsankey)- Add sankey tag to this geoview.
* [geoView.**treemap**](/api/geo-view#geoviewtreemap)- Add treemap markers to this geoview.
* [geoView.**boxplot**](/api/geo-view#geoviewboxplot)- Add boxplot markers to this geography view.
* [geoView.**shape**](/api/geo-view#geoviewshape)- Add shape markers to this geographic view.
* [geoView.**pack**](/api/geo-view#geoviewpack)- Add pack tag to this geography view.
* [geoView.**forceGraph**](/api/geo-view#geoviewforcegraph)- Add forceGraph tag to this geography view.
* [geoView.**tree**](/api/geo-view#geoviewtree)- Add tree markup to this geography view.
* [geoView.**wordCloud**](/api/geo-view#geoviewwordcloud)- Add wordCloud tags to this geographic view.
* [geoView.**gauge**](/api/geo-view#geoviewgauge)- Add gauge markers to this geography view.

### Set properties

* [geoView.**attr**](/api/geo-view#geoviewattr)- Set or get the properties of this composite view.
* [geoView.**data**](/api/geo-view#geoviewdata)- Set or get the data of this composite view.
* [geoView.**transform**](/api/geo-view#geoviewtransform)- Set or get the transform of this composite view.
* [geoView.**coordinate**](/api/geo-view#geoviewcoordinate)- Sets or gets the coordinate of this composite view.
* [geoView.**theme**](/api/geo-view#geoviewtheme)- Set or get the theme of this composite view.
* [geoView.**style**](/api/geo-view#geoviewstyle)- Set or get the style of this composite view.
* [geoView.**scale**](/api/geo-view#geoviewscale)- Set or get the scale of this composite view.
* [geoView.**legend**](/api/geo-view#geoviewlegend)- Set or get the legend of this composite view.

## [SpaceLayer](/api/space-layer)

### Create a visualization

* [spaceLayer.**view**](/api/space-layer#spacelayerview)- Add the view tag to the composite view.
* [spaceLayer.**interval**](/api/space-layer#spacelayerinterval)- Add interval tag to this composite view.
* [spaceLayer.**rect**](/api/space-layer#spacelayerrect)- Add a rect tag to the composite view.
* [spaceLayer.**point**](/api/space-layer#spacelayerpoint)- Add point markers to the composite view.
* [spaceLayer.**area**](/api/space-layer#spacelayerarea)- Add area tag to this composite view.
* [spaceLayer.**line**](/api/space-layer#spacelayerline)- Add line tags to the composite view.
* [spaceLayer.**vector**](/api/space-layer#spacelayervector)- Add vector tag to this composite view.
* [spaceLayer.**link**](/api/space-layer#spacelayerlink)- Add link tags to the composite view.
* [spaceLayer.**polygon**](/api/space-layer#spacelayerpolygon)- Add polygon tags to the composite view.
* [spaceLayer.**image**](/api/space-layer#spacelayerimage)- Add image tag to this composite view.
* [spaceLayer.**text**](/api/space-layer#spacelayertext)- Add text tag to the composite view.
* [spaceLayer.**lineX**](/api/space-layer#spacelayerlinex)- Add lineX markup to the compound view.
* [spaceLayer.**lineY**](/api/space-layer#spacelayerliney)- Add lineY tag to this compound view.
* [spaceLayer.**range**](/api/space-layer#spacelayerrange)- Add range tag to this composite view.
* [spaceLayer.**rangeX**](/api/space-layer#spacelayerrangex)- Add rangeX tag to this compound view.
* [spaceLayer.**rangeY**](/api/space-layer#spacelayerrangey)- Add rangeY tag to this composite view.
* [spaceLayer.**connector**](/api/space-layer#spacelayerconnector)- Add a connector tag to the composite view.
* [spaceLayer.**sankey**](/api/space-layer#spacelayersankey)- Add sankey tag to this composite view.
* [spaceLayer.**treemap**](/api/space-layer#spacelayertreemap)- Add treemap markup to the composite view.
* [spaceLayer.**boxplot**](/api/space-layer#spacelayerboxplot)- Add boxplot markers to the composite view.
* [spaceLayer.**shape**](/api/space-layer#spacelayershape)- Add a shape tag to the composite view.
* [spaceLayer.**pack**](/api/space-layer#spacelayerpack)- Add pack tag to the composite view.
* [spaceLayer.**forceGraph**](/api/space-layer#spacelayerforcegraph)- Add forceGraph tag to this view.
* [spaceLayer.**tree**](/api/space-layer#spacelayertree)- Add tree tag to this view.
* [spaceLayer.**wordCloud**](/api/space-layer#spacelayerwordcloud)- Add wordCloud markup to this view.
* [spaceLayer.**gauge**](/api/space-layer#spacelayergauge)- Add gauge markers to the view.

### Set properties

* [spaceLayer.**data**](/api/space-layer#spacelayerdata)- Set or get the data of this composite view.

## [SpaceFlex](/api/space-flex)

### Create a visualization

* [spaceFlex.**view**](/api/space-flex#spaceflexview)- Add the view tag to the composite view.
* [spaceFlex.**interval**](/api/space-flex#spaceflexinterval)- Add interval tag to this composite view.
* [spaceFlex.**rect**](/api/space-flex#spaceflexrect)- Add a rect tag to the composite view.
* [spaceFlex.**point**](/api/space-flex#spaceflexpoint)- Add point markers to the composite view.
* [spaceFlex.**area**](/api/space-flex#spaceflexarea)- Add area tag to this composite view.
* [spaceFlex.**line**](/api/space-flex#spaceflexline)- Add line tags to the composite view.
* [spaceFlex.**vector**](/api/space-flex#spaceflexvector)- Add vector tag to this composite view.
* [spaceFlex.**link**](/api/space-flex#spaceflexlink)- Add link tags to the composite view.
* [spaceFlex.**polygon**](/api/space-flex#spaceflexpolygon)- Add polygon tags to the composite view.
* [spaceFlex.**image**](/api/space-flex#spacefleximage)- Add image tag to this composite view.
* [spaceFlex.**text**](/api/space-flex#spaceflextext)- Add text tag to the composite view.
* [spaceFlex.**lineX**](/api/space-flex#spaceflexlinex)- Add lineX markup to the compound view.
* [spaceFlex.**lineY**](/api/space-flex#spaceflexliney)- Add lineY tag to this compound view.
* [spaceFlex.**range**](/api/space-flex#spaceflexrange)- Add range tag to this composite view.
* [spaceFlex.**rangeX**](/api/space-flex#spaceflexrangex)- Add rangeX tag to this compound view.
* [spaceFlex.**rangeY**](/api/space-flex#spaceflexrangey)- Add rangeY tag to this composite view.
* [spaceFlex.**connector**](/api/space-flex#spaceflexconnector)- Add a connector tag to the composite view.
* [spaceFlex.**sankey**](/api/space-flex#spaceflexsankey)- Add sankey tag to this composite view.
* [spaceFlex.**treemap**](/api/space-flex#spaceflextreemap)- Add treemap markup to the composite view.
* [spaceFlex.**boxplot**](/api/space-flex#spaceflexboxplot)- Add boxplot markers to the composite view.
* [spaceFlex.**shape**](/api/space-flex#spaceflexshape)- Add a shape tag to the composite view.
* [spaceFlex.**pack**](/api/space-flex#spaceflexpack)- Add pack tag to the composite view.
* [spaceFlex.**forceGraph**](/api/space-flex#spaceflexforcegraph)- Add forceGraph tag to this view.
* [spaceFlex.**tree**](/api/space-flex#spaceflextree)- Add tree tag to this view.
* [spaceFlex.**wordCloud**](/api/space-flex#spaceflexwordcloud)- Add wordCloud markup to this view.
* [spaceFlex.**gauge**](/api/space-flex#spaceflexgauge)- Add gauge markers to the view.

### Set properties

* [spaceFlex.**attr**](/api/space-flex#spaceflexattr)- Set or get the properties of this composite view.
* [spaceFlex.**data**](/api/space-flex#spaceflexdata)- Set or get the data of this composite view.

## [FacetRect](/api/facet-rect)

### Create a visualization

* [facetRect.**view**](/api/facet-rect#facetrectview)- Add the view tag to the composite view.
* [facetRect.**interval**](/api/facet-rect#facetrectinterval)- Add interval tag to this composite view.
* [facetRect.**rect**](/api/facet-rect#facetrectrect)- Add a rect tag to the composite view.
* [facetRect.**point**](/api/facet-rect#facetrectpoint)- Add point markers to the composite view.
* [facetRect.**area**](/api/facet-rect#facetrectarea)- Add area tag to this composite view.
* [facetRect.**line**](/api/facet-rect#facetrectline)- Add line tags to the composite view.
* [facetRect.**vector**](/api/facet-rect#facetrectvector)- Add vector tag to this composite view.
* [facetRect.**link**](/api/facet-rect#facetrectlink)- Add link tags to the composite view.
* [facetRect.**polygon**](/api/facet-rect#facetrectpolygon)- Add polygon tags to the composite view.
* [facetRect.**image**](/api/facet-rect#facetrectimage)- Add image tag to this composite view.
* [facetRect.**text**](/api/facet-rect#facetrecttext)- Add text tag to the composite view.
* [facetRect.**lineX**](/api/facet-rect#facetrectlinex)- Add lineX markup to the compound view.
* [facetRect.**lineY**](/api/facet-rect#facetrectliney)- Add lineY tag to this compound view.
* [facetRect.**range**](/api/facet-rect#facetrectrange)- Add range tag to this composite view.
* [facetRect.**rangeX**](/api/facet-rect#facetrectrangex)- Add rangeX tag to this compound view.
* [facetRect.**rangeY**](/api/facet-rect#facetrectrangey)- Add rangeY tag to this composite view.
* [facetRect.**connector**](/api/facet-rect#facetrectconnector)- Add a connector tag to the composite view.
* [facetRect.**sankey**](/api/facet-rect#facetrectsankey)- Add sankey tag to this composite view.
* [facetRect.**treemap**](/api/facet-rect#facetrecttreemap)- Add treemap markup to the composite view.
* [facetRect.**boxplot**](/api/facet-rect#facetrectboxplot)- Add boxplot markers to the composite view.
* [facetRect.**shape**](/api/facet-rect#facetrectshape)- Add a shape tag to the composite view.
* [facetRect.**pack**](/api/facet-rect#facetrectpack)- Add pack tag to the composite view.
* [facetRect.**forceGraph**](/api/facet-rect#facetrectforcegraph)- Add forceGraph tag to this view.
* [facetRect.**tree**](/api/facet-rect#facetrecttree)- Add tree tag to this view.
* [facetRect.**wordCloud**](/api/facet-rect#facetrectwordcloud)- Add wordCloud markup to this view.
* [facetRect.**gauge**](/api/facet-rect#facetrectgauge)- Add gauge markers to the view.

### Set properties

* [facetRect.**attr**](/api/facet-rect#facetrectattr)- Set or get the properties of this composite view.
* [facetRect.**data**](/api/facet-rect#facetrectdata)- Set or get the data of this composite view.
* [facetRect.**transform**](/api/facet-rect#facetrecttransform)- Set or get the transform of this composite view.
* [facetRect.**theme**](/api/facet-rect#facetrecttheme)- Set or get the theme of this composite view.
* [facetRect.**style**](/api/facet-rect#facetrectstyle)- Set or get the style of this composite view.
* [facetRect.**scale**](/api/facet-rect#facetrectscale)- Set or get the scale of this composite view.
* [facetRect.**axis**](/api/facet-rect#facetrectaxis)- Sets or gets the axis of this composite view.
* [facetRect.**legend**](/api/facet-rect#facetrectlegend)- Set or get the legend of this composite view.

## [FacetCircle](/api/facet-circle)

### Create a visualization

* [facetCircle.**view**](/api/facet-circle#facetcircleview)- Add the view tag to the composite view.
* [facetCircle.**interval**](/api/facet-circle#facetcircleinterval)- Add interval tag to this composite view.
* [facetCircle.**rect**](/api/facet-circle#facetcirclerect)- Add a rect tag to the composite view.
* [facetCircle.**point**](/api/facet-circle#facetcirclepoint)- Add point markers to the composite view.
* [facetCircle.**area**](/api/facet-circle#facetcirclearea)- Add area tag to this composite view.
* [facetCircle.**line**](/api/facet-circle#facetcircleline)- Add line tags to the composite view.
* [facetCircle.**vector**](/api/facet-circle#facetcirclevector)- Add vector tag to this composite view.
* [facetCircle.**link**](/api/facet-circle#facetcirclelink)- Add link tags to the composite view.
* [facetCircle.**polygon**](/api/facet-circle#facetcirclepolygon)- Add polygon tags to the composite view.
* [facetCircle.**image**](/api/facet-circle#facetcircleimage)- Add image tag to this composite view.
* [facetCircle.**text**](/api/facet-circle#facetcircletext)- Add text tag to the composite view.
* [facetCircle.**lineX**](/api/facet-circle#facetcirclelinex)- Add lineX markup to the compound view.
* [facetCircle.**lineY**](/api/facet-circle#facetcircleliney)- Add lineY tag to this compound view.
* [facetCircle.**range**](/api/facet-circle#facetcirclerange)- Add range tag to this composite view.
* [facetCircle.**rangeX**](/api/facet-circle#facetcirclerangex)- Add rangeX tag to this compound view.
* [facetCircle.**rangeY**](/api/facet-circle#facetcirclerangey)- Add rangeY tag to this composite view.
* [facetCircle.**connector**](/api/facet-circle#facetcircleconnector)- Add a connector tag to the composite view.
* [facetCircle.**sankey**](/api/facet-circle#facetcirclesankey)- Add sankey tag to this composite view.
* [facetCircle.**treemap**](/api/facet-circle#facetcircletreemap)- Add treemap markup to the composite view.
* [facetCircle.**boxplot**](/api/facet-circle#facetcircleboxplot)- Add boxplot markers to the composite view.
* [facetCircle.**shape**](/api/facet-circle#facetcircleshape)- Add a shape tag to the composite view.
* [facetCircle.**pack**](/api/facet-circle#facetcirclepack)- Add pack tag to the composite view.
* [facetCircle.**forceGraph**](/api/facet-circle#facetcircleforcegraph)- Add forceGraph tag to this view.
* [facetCircle.**tree**](/api/facet-circle#facetcircletree)- Add tree tag to this view.
* [facetCircle.**wordCloud**](/api/facet-circle#facetcirclewordcloud)- Add wordCloud markup to this view.
* [facetCircle.**gauge**](/api/facet-circle#facetcirclegauge)- Add gauge markers to the view.

### Set properties

* [facetCircle.**attr**](/api/facet-circle#facetcircleattr)- Set or get the properties of this composite view.
* [facetCircle.**data**](/api/facet-circle#facetcircledata)- Set or get the data of this composite view.
* [facetCircle.**transform**](/api/facet-circle#facetcircletransform)- Set or get the transform of this composite view.
* [facetCircle.**theme**](/api/facet-circle#facetcircletheme)- Set or get the theme of this composite view.
* [facetCircle.**style**](/api/facet-circle#facetcirclescale)- Set or get the style of this composite view.
* [facetCircle.**scale**](/api/facet-circle#facetcirclescale)- Set or get the scale of this composite view.
* [facetCircle.**axis**](/api/facet-circle#facetcircleaxis)- Sets or gets the axis of this composite view.
* [facetCircle.**legend**](/api/facet-circle#facetcirclelegend)- Set or get the legend of this composite view.

## [RepeatMatrix](/api/repeat-matrix)

### Create a visualization

* [repeatMatrix.**view**](/api/repeat-matrix#repeatmatrixview)- Add the view tag to the composite view.
* [repeatMatrix.**interval**](/api/repeat-matrix#repeatmatrixinterval)- Add interval tag to this composite view.
* [repeatMatrix.**rect**](/api/repeat-matrix#repeatmatrixrect)- Add a rect tag to the composite view.
* [repeatMatrix.**point**](/api/repeat-matrix#repeatmatrixpoint)- Add point markers to the composite view.
* [repeatMatrix.**area**](/api/repeat-matrix#repeatmatrixarea)- Add area tag to this composite view.
* [repeatMatrix.**line**](/api/repeat-matrix#repeatmatrixline)- Add line tags to the composite view.
* [repeatMatrix.**vector**](/api/repeat-matrix#repeatmatrixvector)- Add vector tag to this composite view.
* [repeatMatrix.**link**](/api/repeat-matrix#repeatmatrixlink)- Add link tags to the composite view.
* [repeatMatrix.**polygon**](/api/repeat-matrix#repeatmatrixpolygon)- Add polygon tags to the composite view.
* [repeatMatrix.**image**](/api/repeat-matrix#repeatmatriximage)- Add image tag to this composite view.
* [repeatMatrix.**text**](/api/repeat-matrix#repeatmatrixtext)- Add text tag to the composite view.
* [repeatMatrix.**lineX**](/api/repeat-matrix#repeatmatrixlinex)- Add lineX markup to the compound view.
* [repeatMatrix.**lineY**](/api/repeat-matrix#repeatmatrixliney)- Add lineY tag to this compound view.
* [repeatMatrix.**range**](/api/repeat-matrix#repeatmatrixrange)- Add range tag to this composite view.
* [repeatMatrix.**rangeX**](/api/repeat-matrix#repeatmatrixrangex)- Add rangeX tag to this compound view.
* [repeatMatrix.**rangeY**](/api/repeat-matrix#repeatmatrixrangey)- Add rangeY tag to this composite view.
* [repeatMatrix.**connector**](/api/repeat-matrix#repeatmatrixconnector)- Add a connector tag to the composite view.
* [repeatMatrix.**sankey**](/api/repeat-matrix#repeatmatrixsankey)- Add sankey tag to this composite view.
* [repeatMatrix.**treemap**](/api/repeat-matrix#repeatmatrixtreemap)- Add treemap markup to the composite view.
* [repeatMatrix.**boxplot**](/api/repeat-matrix#repeatmatrixboxplot)- Add boxplot markers to the composite view.
* [repeatMatrix.**shape**](/api/repeat-matrix#repeatmatrixshape)- Add a shape tag to the composite view.
* [repeatMatrix.**pack**](/api/repeat-matrix#repeatmatrixpack)- Add pack tag to the composite view.
* [repeatMatrix.**forceGraph**](/api/repeat-matrix#repeatmatrixforcegraph)- Add forceGraph tag to this view.
* [repeatMatrix.**tree**](/api/repeat-matrix#repeatmatrixtree)- Add tree tag to this view.
* [repeatMatrix.**wordCloud**](/api/repeat-matrix#repeatmatrixwordcloud)- Add wordCloud markup to this view.
* [repeatMatrix.**gauge**](/api/repeat-matrix#repeatmatrixgauge)- Add gauge markers to the view.

### Set properties

* [repeatMatrix.**attr**](/api/repeat-matrix#repeatmatrixattr)- Set or get the properties of this composite view.
* [repeatMatrix.**data**](/api/repeat-matrix#repeatmatrixdata)- Set or get the data of this composite view.
* [repeatMatrix.**transform**](/api/repeat-matrix#repeatmatrixtransform)- Set or get the transform of this composite view.
* [repeatMatrix.**theme**](/api/repeat-matrix#repeatmatrixtheme)- Set or get the theme of this composite view.
* [repeatMatrix.**style**](/api/repeat-matrix#repeatmatrixstyle)- Set or get the style of this composite view.
* [repeatMatrix.**scale**](/api/repeat-matrix#repeatmatrixscale)- Set or get the scale of this composite view.
* [repeatMatrix.**axis**](/api/repeat-matrix#repeatmatrixaxis)- Sets or gets the axis of this composite view.
* [repeatMatrix.**legend**](/api/repeat-matrix#repeatmatrixlegend)- Set or get the legend of this composite view.

## [TimingKeyframe](/api/timing-keyframe)

### Create a visualization

* [timingKeyframe.**interval**](/api/timing-keyframe#timingkeyframeinterval)- Add interval tag to this composite view.
* [timingKeyframe.**rect**](/api/timing-keyframe#timingkeyframerect)- Add a rect tag to the composite view.
* [timingKeyframe.**point**](/api/timing-keyframe#timingkeyframepoint)- Add point markers to the composite view.
* [timingKeyframe.**area**](/api/timing-keyframe#timingkeyframearea)- Add area tag to this composite view.
* [timingKeyframe.**line**](/api/timing-keyframe#timingkeyframeline)- Add line tags to the composite view.
* [timingKeyframe.**vector**](/api/timing-keyframe#timingkeyframevector)- Add vector tag to this composite view.
* [timingKeyframe.**link**](/api/timing-keyframe#timingkeyframelink)- Add link tags to the composite view.
* [timingKeyframe.**polygon**](/api/timing-keyframe#timingkeyframepolygon)- Add polygon tags to the composite view.
* [timingKeyframe.**image**](</API/nomination-key frame#timing key frame image>)- Add image tag to this composite view.
* [timingKeyframe.**text**](/api/timing-keyframe#timingkeyframetext)- Add text tag to the composite view.
* [timingKeyframe.**lineX**](/api/timing-keyframe#timingkeyframelinex)- Add lineX markup to the compound view.
* [timingKeyframe.**lineY**](/api/timing-keyframe#timingkeyframeliney)- Add lineY tag to this compound view.
* [timingKeyframe.**range**](/api/timing-keyframe#timingkeyframerange)- Add range tag to this composite view.
* [timingKeyframe.**rangeX**](/api/timing-keyframe#timingkeyframerangex)- Add rangeX tag to this compound view.
* [timingKeyframe.**rangeY**](/api/timing-keyframe#timingkeyframerangey)- Add rangeY tag to this composite view.
* [timingKeyframe.**connector**](/api/timing-keyframe#timingkeyframeconnector)- Add a connector tag to the composite view.
* [timingKeyframe.**sankey**](/api/timing-keyframe#timingkeyframesankey)- Add sankey tag to this composite view.
* [timingKeyframe.**treemap**](/api/timing-keyframe#timingkeyframetreemap)- Add treemap markup to the composite view.
* [timingKeyframe.**boxplot**](/api/timing-keyframe#timingkeyframeboxplot)- Add boxplot markers to the composite view.
* [timingKeyframe.**shape**](/api/timing-keyframe#timingkeyframeshape)- Add a shape tag to the composite view.
* [timingKeyframe.**pack**](/api/timing-keyframe#timingkeyframepack)- Add pack tag to the composite view.
* [timingKeyframe.**forceGraph**](/api/timing-keyframe#timingkeyframeforcegraph)- Add forceGraph tag to this view.
* [timingKeyframe.**tree**](/api/timing-keyframe#timingkeyframetree)- Add tree tag to this view.
* [timingKeyframe.**wordCloud**](/api/timing-keyframe#timingkeyframewordcloud)- Add wordCloud markup to this view.
* [timingKeyframe.**gauge**](/api/timing-keyframe#timingkeyframegauge)- Add gauge markers to the view.

### Set properties

* [timingKeyframe.**attr**](/api/timing-keyframe#timingkeyframeattr)- Set or get the properties of this composite view.
