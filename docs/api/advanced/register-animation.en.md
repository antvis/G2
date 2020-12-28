---
title: 自定义动画
order: 1
---

G2 提供了一套动画注册机制，主要用于：

1. 按需引用需要的动画执行函数。
1. 帮助用户自定义动画执行函数。

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
import { registerAnimation } from '@antv/g2';

// Step 1: 定义动画执行函数
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

// Step 2: 注册动画执行函数
registerAnimation('fadeIn', fadeIn);

// Step 3: 使用
chart.interval().animate({
  appear: {
    animation: 'fadeIn',
  },
});
```

<!-- [API 链接](../../api/register#g2register-animation)。 -->
