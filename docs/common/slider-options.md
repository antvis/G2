### options.height

<description> _number_ **optional**</description>

组件高度

### options.trendCfg

<description> _TrendCfg_ **optional**</description>

滑块背景趋势图配置。_TrendCfg_ 配置如下：

| 参数名          | 类型       | 是否必选 | 默认值 | 描述                                             |
| --------------- | ---------- | -------- | ------ | ------------------------------------------------ |
| data            | number[]   | 否       | -      | 趋势图数据，组件会默认根据图表数据填充，无需配置 |
| smooth          | boolean    | 否       | false  | 趋势图曲线是否圆滑                               |
| isArea          | boolean    | 否       | false  | 趋势图是否使用面积图                             |
| backgroundStyle | ShapeStyle | 否       | -      | 背景样式                                         |
| lineStyle       | ShapeStyle | 否       | -      | 折线图样式                                       |
| areaStyle       | ShapeStyle | 否       | -      | 面积图样式                                       |

### options.backgroundStyle

<description> _ShapeStyle_ **optional**</description>

滑块背景样式

### options.foregroundStyle

<description> _ShapeStyle_ **optional**</description>

滑块前景样式

### options.handlerStyle

<description> _ShapeStyle_ **optional**</description>

滑块两个操作块前景样式

### options.minLimit

<description> _number_ **optional**</description>

允许滑块位置的最大值

### options.maxLimit

<description> _number_ **optional**</description>

允许滑块位置的最小值

### options.start

<description> _number_ **optional**</description>

滑块初始化的起始位置

### options.end

<description> _number_ **optional**</description>

滑块初始化的结束位置

### options.padding

<description> _number[]_ **optional**</description>

布局的 padding

### options.formatter

<description> _(value: any, datum: Datum, idx:number) => string_ **optional**</description>
