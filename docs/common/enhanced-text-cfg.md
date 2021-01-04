_EnhancedTextCfg_ 配置如下：

| 参数名           | 类型                         | 是否必选 | 默认值 | 描述                                                          |
| ---------------- | ---------------------------- | -------- | ------ | ------------------------------------------------------------- |
| content          | string \| number             |          | -      | 文本标注内容                                                  |
| rotate           | number                       |          | -      | 旋转，弧度制                                                  |
| style            | _ShapeAttrs_                 |          | -      | 文本标注样式                                                  |
| background       | _EnhancedTextBackgroundCfg_  |          | -      | 文字包围盒样式设置                                            |
| maxLength        | number                       |          | -      | 文本的最大长度                                                |
| autoEllipsis     | boolean                      |          | -      | 超出 maxLength 是否自动省略                                   |
| isVertical       | boolean                      |          | -      | 文本在二维坐标系的显示位置，是沿着 x 轴显示 还是沿着 y 轴显示 |
| ellipsisPosition | 'head' \| 'middle' \| 'tail' |          | -      | 文本截断的位置                                                |

_EnhancedTextBackgroundCfg_ 配置如下：

| 参数名  | 类型                | 是否必选 | 默认值 | 描述               |
| ------- | ------------------- | -------- | ------ | ------------------ |
| padding | number \| number[]; |          | -      | 文本背景周围的留白 |
| style   | [ShapeAttrs](/zh/docs/api/shape/shape-attrs) |          | -      | 文本背景的样式     |
