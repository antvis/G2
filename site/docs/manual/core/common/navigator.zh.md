---
desc: 分页器属性选项
---

| 属性                   | 描述                                                                 | 类型                                                                       | 默认值       |
|------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------------|--------------|
| navEffect | 翻页显示效果                                                         | 参见 [Web Animations API](https://g-next.antv.vision/api/animation/waapi/) | `linear`     |
| navDuration            | 单次翻页动效时长                                                     | `number`                                                                   | `200`        |
| navOrientation         | 翻页滚动方向<br>- 横向`'horizontal'`<br>- 纵向`'vertical'`           | `'horizontal'\|'vertical'`                                                 | `'horizontal'` |
| navDefaultPage         | 默认展示页数                                                         | `number`                                                                   | `0`          |
| navLoop                | 是否启用循环翻页                                                     | `boolean`                                                                  | `false`      |
| navPageNumFill         | 分页数字颜色                                                         | `string`                                                                   | -            |
| navPageNumFontSize     | 分页数字大小                                                         | `number`                                                                   | -            |
| navPageNumOpacity      | 分页数字透明度                                                       | `number`                                                                   | -            |
| navPageNumStroke       | 分页数字描边                                                         | `string`                                                                   | -            |
| navPageNumStrokeOpacity| 分页数字描边透明度                                                   | `number`                                                                   | -            |
| navButtonFill          | 分页按钮颜色                                                         | `string`                                                                   | -            |
| navButtonOpacity       | 分页按钮透明度                                                       | `number`                                                                   | -            |
| navButtonStroke        | 分页按钮描边颜色                                                     | `string`                                                                   | -            |
| navButtonStrokeOpacity | 分页按钮描边透明度                                                   | `number`                                                                   | -            |
| navFormatter           | 页码文本格式化                                                       | `(current: number, total: number) => string`                               | -            |
