### options.type

<description> _'horizontal'_ | _'vertical'_ **optional**</description>

滚动条类型，默认 horizontal

### options.width

<description> _number_ **optional**</description>

滚动条宽度，仅在 vertical 下生效

### options.height

<description> _number_ **optional**</description>

滚动条高度，仅在 horizontal 下生效

### options.padding

<description> _number[]_ **optional**</description>

布局 padding

### options.categorySize

<description> _number_ **optional**</description>

对应水平滚动条，为 X 轴每个分类字段的宽度；对于垂直滚动条，为 X 轴每个分类字段的高度

### options.style

<description> _object_ **optional**</description>

滚动条的样式设置。

| 参数名              | 类型     | 描述                                                        |
| ------------------- | -------- | ----------------------------------------------------------- |
| trackColor          | _string_ | 滑道颜色                                                    |
| thumbColor          | _string_ | 滑块颜色                                                    |
| thumbHighlightColor | _string_ | 滑块高亮样式，对应主题的 `scrollbar.hover.style.thumbColor` |
| lineCap             | _string_ | 是否圆角                                                    |

### options.animate

<description> _boolean_ **optional**</description>

滚动的时候是否开启动画，默认跟随图表的 animate 配置
