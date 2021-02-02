#### *MarkerCfg*  配置

| 参数名  | 类型                  | 默认值 | 描述                                                                     |
| ------- | --------------------- | ------ | ------------------------------------------------------------------------ |
| symbol  | _string \| function_  | -      | 配置图例 marker 的 symbol 形状，详见 [marker.symbol 配置](#markersymbol) |
| style   | _ShapeAttrs \| ((style: ShapeAttrs) => ShapeAttrs)_  | -      | 图例项 marker 的配置项, 详见 [ShapeAttrs](/zh/docs/api/shape/shape-attrs)                                             |
| spacing | number                | -      | 图例项 marker 同后面 name 的间距                                         |

#### marker.symbol

内置一些 symbol 类型，可以指定具体的标记类型，也可以通过回调的方式返回 symbol 绘制的 path 命令

内置支持的标记类型有：`"circle" | "square" | "line" | "diamond" | "triangle" | "triangle-down" | "hexagon" | "bowtie" | "cross" | "tick" | "plus" | "hyphen"`

回调的方式为：`(x: number, y: number, r: number) => PathCommand`；

<!--这里可以插入一个代码示例-->
