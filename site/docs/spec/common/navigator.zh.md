---
desc: 分页器属性选项
---

| 属性         | 描述                                                           | 类型                                                                       | 默认值       |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| navEffect    | 翻页显示效果                                                   | 参见 [Web Animations API](https://g-next.antv.vision/api/animation/waapi/) | linear       |
| navDuration  | 单次翻页动效时长                                               | `number`                                                                   | 200          |
<!-- 原文档: navOrient 是无效的; -->
| navOrientation    | 翻页滚动方向<br/> - 横向`'horizontal'`<br/> - 纵向`'vertical'` | `'horizontal'`\|`'vertical'`                                               | 'horizontal' |
<!-- 原文档: navInitPage 是无效的;   测试值: 0是第一页, 1是第二页; -->
| navDefaultPage    | 默认展示页数                                                   | `number`                                                                   | 0            |
<!-- 设置为true后没效果, 应该是能力层的问题 -->
| navLoop      | 是否启用循环翻页                                                     | `boolean`                                                                  | false        |
<!-- 原文档缺失: 设置分页数字颜色 -->
| navPageNumFill           | 分页数字颜色                                             | `string`                                                                   | -           |
<!-- 原文档缺失: 设置分页数字大小 -->
| navPageNumFontSize       | 分页数字大小                                             | `number`                                                                   | -           |
<!-- 原文档缺失: 设置分页数字透明度 -->
| navPageNumOpacity        | 分页数字透明度                                           | `number`                                                                   | -           |
<!-- 原文档缺失: 设置分页数字描边 -->
| navPageNumStroke         | 分页数字描边                                             | `string`                                                                   | -           |
<!-- 原文档缺失: 设置分页数字描边透明度 -->
| navPageNumStrokeOpacity  | 分页数字描边透明度                                        | `number`                                                                   | -           |
<!-- 原文档缺失: 设置分页按钮颜色 -->
| navButtonFill            | 分页按钮颜色                                             | `string`                                                                   | -           |
<!-- 原文档缺失: 设置分页按钮透明度 -->
| navButtonOpacity         | 分页数按钮透明度                                          | `number`                                                                   | -           |
<!-- 原文档缺失: 设置分页按钮描边颜色 -->
| navButtonStroke          | 分页按钮描边颜色                                          | `string`                                                                   | -           |
<!-- 原文档缺失: 设置分页按钮透明度 -->
| navButtonStrokeOpacity   | 分页按钮描边透明度                                      | `number`                                                                   | -            |
| navFormatter | 页码文本格式化                                                 | `(current: number, total: number) => string;`                              | -            |
