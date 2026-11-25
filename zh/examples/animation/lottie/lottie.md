---
title: "Lottie"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/lottie/lottie/"
version: "5.4.8"
---

# Lottie

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/lottie/lottie/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { loadAnimation } from '@antv/g-lottie-player';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  animate: {
    enter: { type: 'fadeIn', duration: 1000 },
    exit: { type: 'fadeOut', duration: 2000 },
  },
});

chart.render();

(async () => {
  const { canvas } = chart.getContext();
  await canvas.ready;

  const lottieJSON = await fetch(
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*C9f6TaadHikAAAAAAAAAAAAADmJ7AQ',
  ).then((res) => res.json());
  const animation = loadAnimation(lottieJSON, { loop: true, autoplay: true });
  const wrapper = animation.render(canvas);
  wrapper.scale(0.5);
  wrapper.translate(160, 100);
})();
```
