---
title: waveIn
order: 2
---

`waveIn` is a wave entrance animation effect that behaves differently in different coordinate systems. In Cartesian coordinate systems, it affects the `transform.scale` property, while in polar coordinate systems, it affects the Path property of arcs.

## Getting Started

<img alt="waveIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ" width="400" />
<img alt="waveIn" src="https://mdn.alipayobjects.com/antforest/afts/img/A*FXpgRICdrXUAAAAAAAAAAAAADrd2AQ/polar-waveIn.gif" width="400" />

```ts
chart
  .interval()
  /* ... */
  .animate('enter', { type: 'waveIn' });
```
