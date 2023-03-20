---
title: waveIn
order: 1
---

`waveIn` 划入入场动画效果，不同坐标系下效果不同。在直角坐标系下，影响 `transform.scale` 属性，在 polar 坐标系下，影响圆弧的 Path 属性。

## 开始使用

<img alt="waveIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ" width="400" />
<img alt="waveIn" src="https://mdn.alipayobjects.com/antforest/afts/img/A*FXpgRICdrXUAAAAAAAAAAAAADrd2AQ/polar-waveIn.gif" width="400" />

```ts
chart
  .interval()
  /* ... */
  .animate('enter', { type: 'waveIn' });
```
