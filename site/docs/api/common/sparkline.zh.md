---
desc: 迷你图属性选项
---

| 属性                       | 描述                                                                                                                        | 类型                                                | 默认值 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------ |
| sparklineType              | 迷你图类型：折线图、直方图                                                                                                  | `line` \| `column`                                  | line   |
| sparklineIsStack           | 是否对数据进行堆叠                                                                                                          | `boolean`                                           | false  |
| sparklineRange             | 指定值范围，未指定时将使用 data 的最小值和最大值                                                                            | `[number, number]`                                  | -      |
| sparklineColor             | 指定颜色                                                                                                                    | `string` \| `string[]` \| `(index: number)=>string` | -      |
| sparklineSmooth            | 适用于折线图，平滑曲线                                                                                                      | `boolean`                                           | false  |
| sparklineLineStroke        | 适用于折线图，线条颜色                                                                                                      | `string`                                            | -      |
| sparklineLineStrokeOpacity | 适用于折线图，线条透明度                                                                                                    | `number`                                            | -      |
| sparklineLineLineDash      | 适用于折线图，线条的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`                                   | -      |
| sparklineAreaFill          | 适用于折线图，填充区域颜色                                                                                                  | `string`                                            | -      |
| sparklineAreaFillOpacity   | 适用于折线图，填充区域透明度                                                                                                | `number`                                            | -      |
| sparklineColumnFill        | 适用于直方图，条形颜色                                                                                                      | `string`                                            | -      |
| sparklineColumnFillOpacity | 适用于直方图，条形透明度                                                                                                    | `number`                                            | -      |
| sparklineIsGroup           | 适用于直方图，是否分组显示                                                                                                  | `boolean`                                           | false  |
| sparklineSpacing           | 适用于直方图，分组直方的间距                                                                                                | `number`                                            | 0      |
