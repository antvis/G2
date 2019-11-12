---
title: Animate 动画
order: 6
---

在 G2 中，我们提供了四种动画场景类型：

* appear: 初始化时的入场动画；
* enter: 更新时的出现动画；
* update: 更新时的变化动画；
* leave: 更新时的动画；

通过如下方式为图形定义这四种动画场景的配置：

```js
// 配置更新时的入场动画，其他动画类型相同
geom.animate({
  enter: {
    animation: 'fadeIn', // 动画名称
    easing: 'easeQuadIn', // 动画缓动效果
    delay: 100, // 动画延迟执行时间
    duration: 600 // 动画执行时间
  }
});
```

另外 `easing` `delay` `duration` 均可支持回调，如下：

```js
/**
 * @param  {Number} index      shape 的索引值
 * @param  {Number} id shape 的 id 标识
 **/
delay(index, id) {}
```

参数 animation 为对应执行的动画名称，G2 默认内置了如下几种动画：

```js
{
  enter: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn
  },
  leave: {
    lineWidthOut,
    zoomOut,
    pathOut,
    fadeOut
  },
  appear: {
    clipIn,
    zoomIn,
    pathIn,
    scaleInY,
    scaleInX,
    fanIn,
    fadeIn
  },
  update: {
    fadeIn,
    fanIn
  }
}
```

如果上述动画动作不满足需求，用户也可以自己注册动画动作：

```js
const { Animate } = G2;
/**
 * @param  {String} animationType      动画场景类型 appear enter leave update
 * @param  {String} 动画名称，用户自定义即可
 * @param  {Function} 动画执行函数
 **/
Animate.registerAnimation(animationType, animationName, animationFun);
```

图形 Shape 的动画接口说明：`shape.animate(props, duration, delay, easing, callback)`

```js
/**
  * 执行动画
  * @param  {Object}   toProps  动画最终状态
  * @param  {Number}   duration 动画执行时间
  * @param  {Number}   delay    动画延迟时间
  * @param  {String}   easing   动画缓动效果
  * @param  {Function} callback 动画执行后的回调
  */
shape.animate(toProps, duration, delay = 0, easing, callback);
```

__说明：__

`easing` 动画缓动效果参见 [d3-ease](https://github.com/d3/d3-ease)。

##### <a name="xzxvdy"></a>例子

```javascript
const { Chart, Animate, Util } = G2;
Animate.registerAnimation('appear', 'delayScaleInY', function(shape, animateCfg) {
  const box = shape.getBBox(); // 获取柱子包围盒
  const origin = shape.get('origin'); // 获取柱子原始数据
  const points = origin.points; // 获取柱子顶点
  // 计算柱子的变换中点
  const centerX = (box.minX + box.maxX) / 2;
  let centerY;
  if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
    centerY = box.maxY;
  } else {
    centerY = box.minY;
  }
  // 设置初始态
  shape.attr('transform', [
    [ 't', -centerX, -centerY ],
    [ 's', 1, 0.1 ],
    [ 't', centerX, centerY ]
  ]);
  const index = shape.get('index');
  let delay = animateCfg.delay;
  if (Util.isFunction(delay)) {
    delay = animateCfg.delay(index);
  }
  let easing = animateCfg.easing;
  if (Util.isFunction(easing)) {
    easing = animateCfg.easing(index);
  }
  // 设置动画目标态
  shape.animate({
    transform: [
      [ 't', -centerX, -centerY ],
      [ 's', 1, 10 ],
      [ 't', centerX, centerY ]
    ]
  }, animateCfg.duration, easing, animateCfg.callback, delay);
});

const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    x: i,
    y: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5
  });
}
const chart = new Chart({
  container: 'c1',
  forceFit: true,
  height: 400
});
chart.axis('x', false);
chart.legend(false);
chart.source(data);
chart.interval()
  .position('x*y')
  .color('y', '#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
  .animate({
    appear: {
      animation: 'delayScaleInY',
      easing: 'easeElasticOut',
      delay(index) {
        return index * 10;
      }
    }
  });
chart.render();
```
