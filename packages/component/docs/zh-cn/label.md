# Label

Label 是文本标签类，负责渲染图表相关的文本标签，包括坐标轴（Axis）和几何元素（Element）上的文本。

```ts
import { Label } from `@antv/guide`;

const label:Label = new Label({
  name: 'point-label',
  type: 'scatter',
  items: [
    { x: 125, y: 124, text: 'test1' },
    { x: 135, y: 134, text: 'test2' },
  ],
});
label.render();
```

## Properties

### cfg

```ts
interface LabelCfg extends GuideCfg {
  readonly name?: string,
  /**
   * label类型
   */
  readonly type?: string,
  /**
   * 显示的文本集合
   */
  readonly items: TextType[] | null,
  /**
   * 是否使用html渲染label
   */
  readonly useHtml?: boolean,
  /**
   * html 渲染时用的容器的模板，必须存在 class = "g-labels"
   */
  readonly containerTpl?: string,
  /**
   * html 渲染时单个 label 的模板，必须存在 class = "g-label"
   */
  readonly itemTpl?: string,
  /**
   * label牵引线容器
   */
  readonly lineGroup?: object | null,
  /**
   * 需添加label的shape
   */
  readonly shapes?: object[] | null,
}
```

## Methods

### constructor

创建 Label 实例 `new Label(cfg:LabelCfg)`

### render

绘制 Label `render()`

```ts
label.render();
```

## Events

### beforerender

渲染前触发

```ts
label.on('beforerender', () => {
  console.log('render began!');
});
```

### afterrender

渲染后触发

```ts
label.on('afterrender', () => {
  console.log('render finished!');
});
```
