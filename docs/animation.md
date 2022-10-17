# Animation

在 G2 中，我们提供了 3 种动画场景类型：

- enter: 入场动画
- update: 更新动画
- exit: 出场动画

除了可以通过如下方式为图形配置动画之外，还可以对动画属性进行数据编码。

```markdown
// 配置入场动画，其他动画场景类型相同
mark.animate('enter', {
  type: 'fadeIn', // 动画类型
  easing: 'easeQuadIn', // 动画缓动效果
  delay: 100, // 动画延迟执行时间
  duration: 600 // 动画执行时间
})
```

## 动画类型

### FadeIn & FadeOut

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'fadeIn', //  Specify animation type.
      duration: 2000,
    });

  return chart.render().node();
})();
```

### WaveIn

```js
(() => {
  const chart = new G2.Chart({ height: 640 });

  chart.coordinate({ type: 'theta' });

  chart
    .interval()
    .transform({ type: 'stackY' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    })
    .encode('y', 'value')
    .encode('color', 'name')
    .style('stroke', 'white')
    .scale('color', {
      guide: null,
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    .label({ text: 'name', radius: 0.8, fontSize: 10, fontWeight: 'bold' })
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      radius: 0.8,
      fontSize: 9,
      dy: '0.75em',
    })
    .animate('enter', {
      type: 'waveIn',
      duration: 2000,
    });

  return chart.render().node();
})();
```

### ScaleInX & ScaleOutX

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'scaleInX', //  Specify animation type.
      duration: 2000,
    });

  return chart.render().node();
})();
```

### ScaleInY & ScaleOutY

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'scaleInY', //  Specify animation type.
      duration: 2000,
    });

  return chart.render().node();
})();
```

### ZoomIn & ZoomOut

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'zoomIn', //  Specify animation type.
      duration: 2000,
    });

  return chart.render().node();
})();
```

## 动画参数

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      duration: 1000, //  Specify effect time by animate options.
      delay: 300,
    });

  return chart.render().node();
})();
```

## 编码动画属性

### Encode EnterType

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('enterType', (d) => (d.sold > 200 ? 'high' : 'low'))
    .scale('enterType', { range: ['scaleInY', 'fadeIn'] })
    .animate('enter', { duration: 3000 });

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('enterType', (d) => (d.sold > 200 ? 'scaleInY' : 'fadeIn'))
    .scale('enterType', { type: 'identity' })
    .animate('enter', { duration: 3000 });

  return chart.render().node();
})();
```

### Encode EnterDelay and EnterDuration

```js
(() => {
  const chart = new G2.Chart({
    width: 720,
    paddingTop: 60,
    paddingLeft: 100,
  });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data([
      { name: 'event planning', startTime: 1, endTime: 4 },
      { name: 'layout logistics', startTime: 3, endTime: 13 },
      { name: 'select vendors', startTime: 5, endTime: 8 },
      { name: 'hire venue', startTime: 9, endTime: 13 },
      { name: 'hire caterer', startTime: 10, endTime: 14 },
      { name: 'hire event decorators', startTime: 12, endTime: 17 },
      { name: 'rehearsal', startTime: 14, endTime: 16 },
      { name: 'event celebration', startTime: 17, endTime: 18 },
    ])
    .encode('x', 'name')
    .encode('y', ['endTime', 'startTime'])
    .encode('color', 'name')
    // The appear time of interval is linearly related to startTime.
    .encode('enterDelay', 'startTime')
    // The duration of interval animation is linearly related to duration time.
    .encode('enterDuration', (d) => d.endTime - d.startTime)
    // All the intervals will show up in 10s.
    // But the animation will take more than 10s to finish.
    .scale('enter', { range: [0, 10000], zero: true })
    .scale('color', {
      guide: { size: 60, autoWrap: true, maxRows: 2, cols: 5 },
    });

  return chart.render().node();
})();
```
