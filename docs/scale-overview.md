# 比例尺（Scale）

将抽象数据映射为视觉数据。

## 通用 API

| 参数       | 说明                                                                                                                                                           | 类型                  | 默认值        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------- |
| formatter  | 格式化坐标轴刻度的函数，支持 [d3-format](https://github.com/d3/d3-format) 所定义的字符串。                                                                     | `string \| Formatter` | `d => d + ''` |
| tickFilter | 过滤坐标刻度的函数，常用语极坐标下隐藏部分坐标刻度 。                                                                                                          | `Filter`              | -             |
| palette    | color 通道对应比例尺使用的颜色，对离散的数据有效。支持 AntV 的所包含的色板以及 [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) 所定义的的色板。 | `string`              | `category5`   |
| offset     | 颜色的偏移量，当 palette 是 d3-scale-chromatic 里面的插值器的时候生效。                                                                                        | `Function`            | -             |
