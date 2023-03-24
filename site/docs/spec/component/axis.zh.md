---
title: axis
order: 1
---

## 开始使用

G2 会根据当前绘制的视图类型自动选择合适的坐标轴，目前支持直角坐标系坐标轴与极坐标系坐标轴。

<img alt="axis" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OM85QbMVPlQAAAAAAAAAAAAADmJ7AQ/original" width="400" />
<br/>
<img alt="axis" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*e6W3S69WPygAAAAAAAAAAAAADmJ7AQ/original" width="200" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
  })
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('x', {
    animate: { duration: 500 },
    labelAutoHide: true,
    labelDirection: 'positive',
    labelFilter: (datum, index, data) => index % 5 === 0,
    grid: true,
    style: {
      lineLineWidth: 5,
      lineStroke: '#675193',
      labelAlign: 'parallel',
      labelSpacing: 10,
    },
  });

chart.render();
```

## 选项

### 标题

| 属性                       | 描述                                                           | 类型                                             | 默认值 |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------------ | ------ |
| title                      | 关闭标题或设置标题内容                                         | `false`\|`string` \| `number` \| `DisplayObject` | -      |
| `style.`titleSpacing       | 标题到坐标轴的距离                                             | `number`                                         | 10     |
| `style.`titlePosition      | 标题相对坐标轴的位置，支持首字母简写形式，如`'top'`简写为`'t'` | `'top'`\|`'bottom'`\|`'left'`\|`'right'`         | `'lb'` |
| `style.`titleFontSize      | 标题文字大小                                                   | `number`                                         | -      |
| `style.`titleFontFamily    | 标题文字字体                                                   | `string`                                         | -      |
| `style.`titleFontWeight    | 标题字体粗细                                                   | `number`                                         | -      |
| `style.`titleStroke        | 标题字体颜色                                                   | `string`                                         | -      |
| `style.`titleStrokeOpacity | 标题透明度                                                     | `number`                                         | -      |

### 轴线

| 属性                      | 描述                                                                                                              | 类型               | 默认值 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| line                      | 是否显示轴线                                                                                                      | `boolean`          | true   |
| arrow                     | 是否显示箭头                                                                                                      | `boolean`          | true   |
| `style.`lineExtension     | 轴线两侧的延长线                                                                                                  | `[number, number]` | -      |
| `style.`lineArrow         | 定义轴线箭头形状，默认为箭头形状                                                                                  | `DisplayObject`    | -      |
| `style.`lineArrowOffset   | 箭头偏移长度                                                                                                      | `number`           | 15     |
| `style.`lineArrowSize     | 箭头尺寸                                                                                                          | `number`           | -      |
| `style.`lineLineWidth     | 轴线宽度                                                                                                          | `number`           | -      |
| `style.`lineLineDash      | 轴线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`  | -      |
| `style.`lineStroke        | 轴线描边色                                                                                                        | `string`           | -      |
| `style.`lineStrokeOpacity | 轴线描边色透明度                                                                                                  | `number`           | -      |

### 刻度

| 属性                      | 描述                                                                                                                | 类型                                                                 | 默认值     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------- |
| tick                      | 是否显示刻度                                                                                                        | `boolean`                                                            | true       |
| tickFilter                | 刻度线过滤                                                                                                          | `(datum, index, data)=>boolean`                                      | -          |
| tickFormatter             | 刻度线格式化，可用于自定义刻度样式，回调函数中会额外返回该刻度的方向                                                | `DisplayObject` \| `(datum, index, data, Vector)=> DisplayObject`    | -          |
| `style.`tickDirection     | 刻度朝向，为 `positive` 时，位于侧轴方向（即主轴顺时针 90 度方向）, 为 `negative` 时，刻度位于侧轴负方向            | `'positive'` \| `'negative'`                                         | 'positive' |
| `style.`tickLength        | 轴线长度                                                                                                            | `number`\|`(datum, index, data)=>number`                             | 15         |
| `style.`tickLineWidth     | 刻度线宽度                                                                                                          | `number` \| `(datum, index, data, Vector)=>number`                   | -          |
| `style.`tickLineDash      | 刻度线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `(datum, index, data, Vector)=>[number,number]` | -          |
| `style.`tickStroke        | 刻度线颜色                                                                                                          | `string` \| `(datum, index, data, Vector)=>string`                   | -          |
| `style.`tickStrokeOpacity | 刻度线透明度                                                                                                        | `number` \| `(datum, index, data, Vector)=>number`                   | -          |

### 刻度值

| 属性                       | 描述                                                                                                                | 类型                                                              | 默认值     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------- |
| label                      | 是否显示刻度值                                                                                                      | `boolean`                                                         | -          |
| labelFilter                | 刻度值过滤                                                                                                          | `(datum, index, data)=> boolean`                                  | -          |
| labelFormatter             | 刻度值线格式化                                                                                                      | `DisplayObject` \| `(datum, index, data, Vector)=> DisplayObject` | -          |
| transform                  | 刻度值转换，避免文本之间发生重叠。当前支持超长文本缩略、重叠刻度值隐藏、自动旋转                                    | `boolean`                                                         | -          |
| labelAutoHide              | 自动隐藏重叠的刻度值                                                                                                | `number` \| `(datum, index, data)=>number`                        | -          |
| labelAutoRotate            | 自动旋转刻度值                                                                                                      | `boolean`                                                         | -          |
| labelAutoEllipsis          | 自动缩略刻度值                                                                                                      | `boolean`                                                         | -          |
| `style.`labelAlign         | 刻度值对齐方式<br/>- 'horizontal' 始终保持水平<br/> - 'parallel' 平行于坐标轴<br/> - 'perpendicular' 垂直于坐标轴   | `'horizontal'` \| `'parallel'` \| `'perpendicular'`               | 'parallel' |
| `style.`labelDirection     | 刻度值位于轴线的位置，参考`tickDirection`                                                                           | `'positive'` \| `'negative'`                                      | 'positive' |
| `style.`labelSpacing       | 刻度值到其对应刻度的间距                                                                                            | `number`                                                          | 0          |
| `style.`labelLineWidth     | 刻度值宽度                                                                                                          | `number` \|`(datum, index, data)=>number`                         | -          |
| `style.`labelLineDash      | 刻度值描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `(datum, index, data)=>[number, number]`     | -          |
| `style.`labelFontSize      | 刻度值文字大小                                                                                                      | `number` \| `(datum, index, data)=>number`                        | -          |
| `style.`labelFontFamily    | 刻度值文字字体                                                                                                      | `string` \| `(datum, index, data)=>string`                        | -          |
| `style.`labelFontWeight    | 刻度值字体粗细                                                                                                      | `number` \|`(datum, index, data)=>number`                         | -          |
| `style.`labelStroke        | 刻度值字体颜色                                                                                                      | `string` \| `(datum, index, data)=>string`                        | -          |
| `style.`labelStrokeOpacity | 刻度值文本透明度                                                                                                    | `number` \| `(datum, index, data)=>number`                        | -          |

```ts
export interface Transform {
  /** 避免刻度值重叠时的额外边距 */
  margin?: number[];
}
export interface EllipsisOverlapCfg extends Transform {
  type: 'ellipsis';
  /** 缩略替换字符，默认为 ... */
  suffix?: string;
  /** 文本短于该长度时不再缩略 */
  minLength: string | number;
  /** 文本短于该长度时一定会进行缩略 */
  maxLength?: string | number;
  /** 每次缩略执行步长 */
  step?: string | number;
}
export interface RotateOverlapCfg extends Transform {
  type: 'rotate';
  /** 可选的旋转角度值 */
  optionalAngles: number[];
  /** 当旋转无法避免重叠时，是否恢复为默认旋转角度 */
  recoverWhenFailed?: boolean;
}
export interface HideOverlapCfg extends Transform {
  type: 'hide';
  /** 保证第一个刻度值不被隐藏 */
  keepHeader?: boolean;
  /** 保证最后一个刻度值不被隐藏 */
  keepTail?: boolean;
}
```

### 网格线

在不同坐标系下网格线会具有不同的样式

| 场景标签            | 样式                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `直角坐标系`        | <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  |
| `极坐标系`          | <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="100" />  |
| `极坐标系`          | <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="100" />   |
| `极坐标系` `雷达图` | <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="100" /> |

| 属性                      | 描述                                                                                                                | 类型                                                     | 默认值 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| grid                      | 是否显示网格线                                                                                                      | `boolean`                                                | false  |
| gridFilter                | 网格线过滤                                                                                                          | `(datum, index, data)=> boolean`                         | -      |
| `style.`gridLength        | 网格线长度。一般情况下，不需要用户配置。                                                                            | `number` \| `(datum, index, data)=> number`              | 0      |
| `style.`gridAreaFill      | 网格线区域颜色                                                                                                      | `string` \| `string[]`\| `(datum, index, data)=> string` | -      |
| `style.`gridLineWidth     | 网格线宽度                                                                                                          | `number`                                                 | -      |
| `style.`gridLineDash      | 网格线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]`                                        | -      |
| `style.`gridStroke        | 网格线颜色                                                                                                          | `string`                                                 | -      |
| `style.`gridStrokeOpacity | 网格线透明度                                                                                                        | `number`                                                 | -      |

### 网格线

支持设置更新时的动画效果

| 属性    | 描述         | 类型                        | 默认值 |
| ------- | ------------ | --------------------------- | ------ |
| animate | 是否开启动画 | `boolean` \| `EffectTiming` | -      |

EffectTiming 支持配置的属性如下：

| 属性     | 描述                           | 类型     | 默认值 |
| -------- | ------------------------------ | -------- | ------ |
| delay    | 延迟执行时间 (ms)              | `number` | -      |
| duration | 动画持续时间 (ms)              | `number` | -      |
| easing   | 动画的缓动函数                 | `Easing` | -      |
| endDelay | 延迟执行时间 (ms)              | `number` | -      |
| fill     | 动画处于非运行状态时的展示效果 | `Fill`   | -      |
