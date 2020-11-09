---
title: 图形 - Geometry
order: 6
---

`markdown:docs/common/style.md`

Geometry 几何标记基类，主要负责数据到图形属性的映射以及绘制逻辑。

<img alt='geometry' width='100%' style='max-width: 800px' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*urWQQJm0Wy8AAAAAAAAAAAAAARQnAQ'/>

### chart.interval(options)

用于绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等。

`markdown:docs/common/geom-base-cfg.md`

### chart.point(options)

用于绘制点图、折线图中的点等。

`markdown:docs/common/geom-base-cfg.md`

### chart.line(options)

用于绘制折线图、曲线图、阶梯线图等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述               |
| ------------ | ------- | -------- | ------ | ------------------ |
| sortable     | boolean |          | -      | 是否对数据进行排序 |
| theme        | object  |          | -      | 主题配置           |
| visible      | boolean |          | -      | 是否可见           |
| connectNulls | boolean |          | -      | 是否连接空值       |

### chart.area(options)

用于绘制区域图（面积图）、层叠区域图、区间区域图等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述                          |
| ------------ | ------- | -------- | ------ | ----------------------------- |
| sortable     | boolean |          | -      | 是否对数据进行排序            |
| theme        | object  |          | -      | 主题配置                      |
| visible      | boolean |          | -      | 是否可见                      |
| connectNulls | boolean |          | -      | 是否连接空值                  |
| startOnZero  | boolean |          | -      | 面积图是否从 0 基准线开始填充 |

<img alt='startOnZero-true' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png'/>
<img alt='startOnZero-false' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png'/>

### chart.path(options)

用于绘制路径图，地图上的路径等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述               |
| ------------ | ------- | -------- | ------ | ------------------ |
| sortable     | boolean |          | -      | 是否对数据进行排序 |
| theme        | object  |          | -      | 主题配置           |
| visible      | boolean |          | -      | 是否可见           |
| connectNulls | boolean |          | -      | 是否连接空值       |

### chart.polygon(options)

用于绘制色块图（像素图）、热力图、地图等。

`markdown:docs/common/geom-base-cfg.md`

### chart.edge(options)

用于绘制流程图、树、弧长连接图、和弦图、桑基图等。

`markdown:docs/common/geom-base-cfg.md`

### chart.heatmap(options)

用于绘制热力图。

`markdown:docs/common/geom-base-cfg.md`

### chart.schema(options)

用于绘制 k 线图，箱型图。

`markdown:docs/common/geom-base-cfg.md`
