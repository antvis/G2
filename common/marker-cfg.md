_MarkerCfg_ 配置如下：

| 参数名  | 类型                         | 是否必选 | 默认值 | 描述                             |
| ------- | ---------------------------- | -------- | ------ | -------------------------------- |
| symbol  | _Marker_ \| _MarkerCallback_ |          | -      | 配置图例 marker 的 symbol 形状   |
| style   | [ShapeAttrs](shape)          |          | -      | 图例项 marker 的配置项           |
| spacing | number                       |          | -      | 图例项 marker 同后面 name 的间距 |

_Marker_ 为支持的标记类型有： "circle" | "square" | "line" | "diamond" | "triangle" | "triangleDown" | "hexagon" | "bowtie" | "cross" | "tick" | "plus" | "hyphen"；
_MarkerCallback_ 为 `(x: number, y: number, r: number) => PathCommand`；

<!--这里可以插入一个代码示例-->
