# slider

> 基于 @antv/g 实现的滑块功能。


一个滑块包括以下几个内容：

 - min 滑块及文本
 - max 滑块及文本
 - 滑动区域背景
 - range 滑动
 - 事件 & 交互



## 使用方式


```js
import Slider from './slider';

const slider = new Slider({ ...cfg });

// 设置背景的样式
slider.setBackgroundShape(shape);

slider.on('sliderchange', ({ range, value }) => {});
// 然后就可以 add 到其他容器里面了
```

## API


### 属性
 
```ts
interface SliderCfg {
  // 布局 vertical | horizontal
  readonly layout: string;
  // rect | circle
  readonly sliderType: string;
  // 滑块大小是否随着值的变化而变化
  // readonly sliderReactive: boolean; 
  // 是够可交互（滑块可以拖拽）
  readonly operational: boolean;

  // 图例宽高
  readonly width: number;
  readonly height: number;

  // 图例 min max 值 
  readonly min: number;
  readonly max: number;
  // 初始的 range 范围，例如：[ 0, 1 ]
  readonly range: number[];

  // 文本样式
  readonly textStyle: object;
  // 文本和滑块之前的距离
  readonly textOffset: number;

  // 格式化
  readonly formatter: Function;
}
```
 
### 事件

 - **sliderchange**: 滑块数据变化的时候触发。
