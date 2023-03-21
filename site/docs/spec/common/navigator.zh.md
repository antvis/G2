---
desc: 分页器属性选项
---

| 属性                 | 描述                                                           | 类型                                                                       | 默认值       |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| `style.`navEffect    | 翻页显示效果                                                   | 参见 [Web Animations API](https://g-next.antv.vision/api/animation/waapi/) | linear       |
| `style.`navDuration  | 单次翻页动效时长                                               | `number`                                                                   | 200          |
| `style.`navOrient    | 翻页滚动方向<br/> - 横向`'horizontal'`<br/> - 纵向`'vertical'` | `'horizontal'`\|`'vertical'`                                               | 'horizontal' |
| `style.`navInitPage  | 默认展示页数                                                   | `number`                                                                   | 0            |
| `style.`navLoop      | 是否启用循环翻页                                               | `boolean`                                                                  | false        |
| `style.`navFormatter | 页码文本格式化                                                 | `(current: number, total: number) => string;`                              | -            |
