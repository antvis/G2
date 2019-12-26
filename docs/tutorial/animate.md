---
title: 图表动画
order: 21
---

## 动画类型

同 G2 3.x 所提供的动画类型保持一致：

| **动画类型** | **解释**                                                 |
| ------------ | -------------------------------------------------------- |
| appear       | 图表第一次加载时的入场动画                               |
| enter        | 图表绘制完成，发生更新后，产生的新图形的进场动画         |
| update       | 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画 |
| leave        | 图表绘制完成，数据发生变更后，被销毁图形的销毁动画       |

> todo: 加个动图

## 动画元素

G2 图表中默认参与动画的元素：

1. Geometry shapes
1. Geometry labels
1. 图表组件 Component，在 G2 层，主要是以下组件进行动画
1. Axis
   1. ticks
   1. labels
   1. grid
1. Annotation

说明

> 为了更好的动画效果，G2 为  Geometry shapes 内置了初始化时的群组入场动画，当用户自己配置了 appear 动画执行函数时（animation）的时候，就会以用户配置的为准。

## 动画配置

### Chart

```typescript
// 开启或者关闭 chart 动画
chart.animate(boolean);
```

说明当 `chart.animate(false)`  关闭动画时，该图表所有的元素都不会进行动画，即使用户进行了动画配置。

### View

```typescript
// 开启或者关闭 view 上的动画
view.animate(boolean);
```

说明当 `.animate(false)` 关闭动画时，该视图下所有的元素都不会进行动画，即使用户进行了动画配置。

### Geometry

包含 Geometry Shapes 以及 Geometry labels.

```typescript
/** easing 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateEasingCallback = (data: Datum) => string;
/** delay 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDelayCallback = (data: Datum) => number;
/** duration 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDurationCallback = (data: Datum) => number;

export interface AnimateCfg {
  /** 动画缓动函数 */
  readonly easing?: string | AnimateEasingCallback;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画执行时间 */
  readonly duration?: number | AnimateDurationCallback;
  /** 动画延迟时间 */
  readonly delay?: number | AnimateDelayCallback;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}

export interface AnimateOption {
  /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画 */
  appear?: AnimateCfg | false | null;
  /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画 */
  enter?: AnimateCfg | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画 */
  update?: AnimateCfg | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画 */
  leave?: AnimateCfg | false | null;
}

// Geometry shapes 动画配置
<geometryType>().animate(AnimateOption | false);

// Geometry labels 动画配置
<geometryType>().label('labelField', {
  animate: AnimateOption | false,
});
```

说明当 geometry 关闭动画时，即 `geometry.animate(false)`，label 的动画也会关闭。

### Component 

```typescript
chart.axis('fieldName', {
  animate: boolean,
});

chart.annotation().line({
  animate: boolean,
});
```

动画优先级： Chart > View > Geometry(> label), Component

## 自定义动画

G2 提供了一套动画注册机制，主要用于：

1. 按需引用需要的动画执行函数
1. 帮助用户自定义动画执行函数

```typescript
type Animation = (element: IGroup | IShape, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) => void;
/**
 * 根据名称获取对应的动画执行函数
 * @param type 动画函数名称
 */
export function getAnimation(type: string) {
  return ANIMATIONS_MAP[type.toLowerCase()];
}

/**
 * 注册动画执行函数
 * @param type 动画执行函数名称
 * @param animation 动画执行函数
 */
export function registerAnimation(type: string, animation: Animation) {
  ANIMATIONS_MAP[type.toLowerCase()] = animation;
}
```

### 示例

```typescript
function fadeIn(shape: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const endState = {
    fillOpacity: isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity'),
    strokeOpacity: isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity'),
    opacity: isNil(shape.attr('opacity')) ? 1 : shape.attr('opacity'),
  };
  shape.attr({
    fillOpacity: 0,
    strokeOpacity: 0,
    opacity: 0,
  });
  shape.animate(endState, animateCfg);
}

registerAnimation('fadeIn', fadeIn);

chart.interval().animate({
  appear: {
    animation: 'fadeIn',
  },
});
```

## 4.0 内置默认动画函数

补充中
