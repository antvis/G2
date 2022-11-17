---
title: 坐标轴
order: 1
---

`Axis`

## 开始使用

G2 会根据当前绘制的视图类型自动选择合适的坐标轴，目前支持直角坐标系坐标轴与极坐标系坐标轴。

<img alt="axis" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OM85QbMVPlQAAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="axis" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*e6W3S69WPygAAAAAAAAAAAAADmJ7AQ/original" width="200" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
    labelAlign: 'parallel',
    labelDirection: 'positive',
    labelSpacing: 10,
    labelFilter: (datum, index, data) => index % 5 === 0,
    labelTransforms: [{ type: 'hide' }],
    lineLineWidth: 5,
    lineStroke: '#675193',
    showGrid: true,
  });

chart.render();
```

## 选项

### 标题

| 属性         | 描述                           | 类型                                    | 默认值    |
| ------------ | ------------------------------ | --------------------------------------- | --------- |
| title        | 标题，支持一段文本或自定义图形 | `string` \| `number` \| `DisplayObject` | `\-`      |
| titleSpacing | 标题到坐标轴的距离             | `number`                                | `10`      |
| titleAlign   | 标题相对坐标轴的位置           | `'start'` \| `'middle'` \| `'end'`      | `'start'` |
| title[Style] | 标题对应的样式属性             | 与 text `style` 一致                    | `\-`      |

### 轴线

| 属性            | 描述                             | 类型                 | 默认值 |
| --------------- | -------------------------------- | -------------------- | ------ |
| showLine        | 是否显示轴线                     | `boolean`            | `true` |
| lineExtension   | 轴线两侧的延长线                 | [`number`, `number`] | `\-`   |
| lineArrow       | 定义轴线箭头形状，默认为箭头形状 | `DisplayObject`      | `\-`   |
| lineArrowOffset | 箭头偏移长度                     | `number`             | `15`   |
| lineArrowSize   | 箭头尺寸                         | `number`             | `\-`   |
| line[Style]     | 轴线样式                         | 与 line `style` 一致 | `\-`   |

### 刻度

| 属性          | 描述                                                                                                     | 类型                                                              | 默认值       |
| ------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------ |
| showTick      | 是否显示刻度                                                                                             | `boolean`                                                         | `true`       |
| tickDirection | 刻度朝向，为 `positive` 时，位于侧轴方向（即主轴顺时针 90 度方向）, 为 `negative` 时，刻度位于侧轴负方向 | `'positive'` \| `'negative'`                                      | `'positive'` |
| tickLength    | 轴线长度                                                                                                 | `number`\|`(datum, index, data)=>number`                          | `15`         |
| tickFilter    | 刻度线过滤                                                                                               | `(datum, index, data)=>boolean`                                   | `\-`         |
| tickFormatter | 刻度线格式化，可用于自定义刻度样式，回调函数中会额外返回该刻度的方向                                     | `DisplayObject` \| `(datum, index, data, Vector)=> DisplayObject` | `\-`         |
| tick[Style]   | 刻度线样式                                                                                               | 与 line `style` 一致                                              | `\-`         |

### 刻度值

| 属性            | 描述                                                                                                              | 类型                                                                | 默认值       |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------ |
| showLabel       | 是否显示刻度值                                                                                                    | `boolean`                                                           | `\-`         |
| labelAlign      | 刻度值对齐方式<br/>- 'horizontal' 始终保持水平<br/> - 'parallel' 平行于坐标轴<br/> - 'perpendicular' 垂直于坐标轴 | `'horizontal'` \| `'parallel'` \| `'perpendicular'`                 | `'parallel'` |
| labelDirection  | 刻度值位于轴线的位置，参考`tickDirection`                                                                         | `'positive'` \| `'negative'`                                        | `'positive'` |
| labelSpacing    | 刻度值到其对应刻度的间距                                                                                          | `number`                                                            | `0`          |
| labelFilter     | 刻度值过滤                                                                                                        | `(datum, index, data)=> boolean`                                    | `\-`         |
| labelFormatter  | 刻度值线格式化                                                                                                    | `DisplayObject` \| `(datum, index, data, Vector)=> DisplayObject`   | `\-`         |
| labelTransforms | 刻度值转换，避免文本之间发生重叠。当前支持超长文本缩略、重叠刻度值隐藏、自动旋转                                  | `Overlap[]`                                                         | `\-`         |
| label[Style]    | 刻度值样式                                                                                                        | 与 text `style` 一致，样式支持回调形式 `(datum, index, data)=> any` | `\-`         |

```typescript
export interface Overlap {
  /** 避免刻度值重叠时的额外边距 */
  margin?: number[];
}
export interface EllipsisOverlapCfg extends Overlap {
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
export interface RotateOverlapCfg extends Overlap {
  type: 'rotate';
  /** 可选的旋转角度值 */
  optionalAngles: number[];
  /** 当旋转无法避免重叠时，是否恢复为默认旋转角度 */
  recoverWhenFailed?: boolean;
}
export interface HideOverlapCfg extends Overlap {
  type: 'hide';
  /** 保证第一个刻度值不被隐藏 */
  keepHeader?: boolean;
  /** 保证最后一个刻度值不被隐藏 */
  keepTail?: boolean;
}
```

### 网格线

在不同坐标系下网格线会具有不同的样式

| 样式                                                                                                                                        | 场景标签            |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  | `直角坐标系`        |
| <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="200" />  | `极坐标系`          |
| <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="200" />   | `极坐标系`          |
| <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="200" /> | `极坐标系` `雷达图` |

| 属性         | 描述           | 类型                                                     | 默认值  |
| ------------ | -------------- | -------------------------------------------------------- | ------- |
| showGrid     | 是否显示网格线 | `boolean`                                                | `false` |
| gridFilter   | 网格线过滤     | `(datum, index, data)=> boolean`                         | `\-`    |
| gridLength   | 网格线长度     | `number` \| `(datum, index, data)=> number`              | `0`     |
| gridAreaFill | 网格线区域颜色 | `string` \| `string[]`\| `(datum, index, data)=> string` | `\-`    |
| grid[Style]  | 网格线样式     | 与 line `style` 一致                                     | `\-`    |
