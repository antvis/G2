---
title: 标注 - Annotation
order: 10
---

图形标注，Annotation，作为 G2 图表的辅助元素，主要用于在图表上标识额外的标记注解。之前的调用方法为 `guide`，将在 V4.1 移除。

### chart.annotation().arc(option)

<img width='400' alt='arc' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ'/>

辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。_**option**_ 配置如下：

`markdown:docs/common/annotation-base-option.md`

`markdown:docs/common/region-position-base-option.md`

### chart.annotation().image(option)

<img width='400' alt='image' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ'/>

辅助图片，在图表上添加辅助图片。_**option**_ 配置如下：

#### option.src

<description> _string_ **optional** </description>

图片路径。

`markdown:docs/common/annotation-base-option.md`

`markdown:docs/common/region-position-base-option.md`

### chart.annotation().line(option)

<img width='400' alt='line' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ'/>

辅助线（可带文本），例如表示平均值或者预期分布的直线。_**option**_ 配置如下：

#### option.text

<description> _string_ **optional** </description>

文本配置定义。

`markdown:docs/common/annotation-base-option.md`

`markdown:docs/common/region-position-base-option.md`

### chart.annotation().text(option)

辅助文本，指定位置添加文本说明。

<img width='400' alt='text' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ'/>

_**option**_ 配置如下：

#### option.content

<description> _string | number | ((filteredData: object[]) => string | number)_ **optional** </description>

显示的文本内容。

#### option.rotate

<description> _number_ **optional** </description>

文本的旋转角度，弧度制。

`markdown:docs/common/annotation-position.md`

#### option.background

<description> _EnhancedTextBackgroundCfg_ **optional** </description>

文字包围盒样式设置。_EnhancedTextBackgroundCfg_ 配置如下：

| 参数名  | 类型                | 是否必选 | 默认值 | 描述               |
| ------- | ------------------- | -------- | ------ | ------------------ |
| padding | number \| number[]; |          | -      | 文本背景周围的留白 |
| style   | [ShapeAttrs](shape) |          | -      | 文本背景的样式     |

#### option.maxLength

<description> _number_ **optional** </description>

文本的最大长度。

#### option.autoEllipsis

<description> _boolean_ **optional** </description>

超出 maxLength 是否自动省略。

#### option.isVertical

<description> _boolean_ **optional** </description>

文本在二维坐标系的显示位置，是沿着 x 轴显示 还是沿着 y 轴显示。

#### option.ellipsisPosition

<description> _'head' | 'middle' | 'tail'_ **optional** </description>

文本截断的位置。

`markdown:docs/common/annotation-base-option.md`

### chart.annotation().region(option)

<img width='400' alt='region' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ'/>

辅助框，框选一段图区，设置背景、边框等。_**option**_ 配置如下：

`markdown:docs/common/annotation-base-option.md`

`markdown:docs/common/region-position-base-option.md`

### chart.annotation().regionFilter(option)

<img width='400' alt='regionFilter' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ'/>

区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。_**option**_ 配置如下：

#### option.color

<description> _string_ **optional** </description>

染色色值。

#### option.apply

<description> _string[]_ **optional** </description>

设定 regionFilter 只对特定 geometry 类型起作用，如 `apply: ['area']`。

`markdown:docs/common/annotation-base-option.md`

`markdown:docs/common/region-position-base-option.md`

### chart.annotation().dataMarker(option)

<img width='400' alt='dataMarker' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ'/>

特殊数据点标注，多用于折线图和面积图。_**option**_ 配置如下：

#### option.point

<description> _null | { style?: ShapeAttrs }_ **optional** </description>

point 设置。点击 [ShapeAttrs](shape) 查看详细样式配置。

#### option.line

<description> _null | { style?: ShapeAttrs, length?: number }_ **optional** </description>

line 设置。点击 [ShapeAttrs](shape) 查看详细样式配置。

#### option.text

<description> _null | EnhancedTextCfg_ **optional** </description>

text 设置。

`markdown:docs/common/enhanced-text-cfg.md`

#### option.autoAdjust

<description> _boolean_ **optional** _default:_ `true`</description>

文本超出绘制区域时，是否自动调节文本方向。

#### option.direction

<description> _'upward' | 'downward'_ **optional** _default:_ `'upward'`</description>

朝向。

`markdown:docs/common/annotation-position.md`

`markdown:docs/common/annotation-base-option.md`

### chart.annotation().dataRegion(option)

<img width='400' alt='dataRegion' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ'/>

特殊数据区间标注，多用于折线图和面积图。_**option**_ 配置如下：

#### option.lineLength

<description> _number_ **optional** _default:_ `0`</description>

line 长度。

#### option.region

<description> _null | { style?: ShapeAttrs }_ **optional** _default:_ `0`</description>

标注区间的配置。点击 [ShapeAttrs](shape) 查看详细样式配置。

#### option.text

<description> _null | EnhancedTextCfg_ **optional** _default:_ `0`</description>

文本的配置。

`markdown:docs/common/enhanced-text-cfg.md`

`markdown:docs/common/annotation-position.md`

`markdown:docs/common/annotation-base-option.md`
