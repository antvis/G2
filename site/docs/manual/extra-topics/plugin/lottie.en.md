---
title: lottie
order: 3
---

[Lottie](https://airbnb.design/lottie/) greatly enhances the descriptive capabilities of animations and has excellent use cases in data visualization storytelling.

In G2, you can integrate Lottie into the canvas through [@antv/g-lottie-player](https://g.antv.antgroup.com/api/animation/lottie). It also provides simple animation control methods such as play, pause, and jumping to specific moments or frames. Once added to the canvas, you can manipulate them like basic graphics.

## Getting Started

First, install the `@antv/g-lottie-player` player:

```bash
npm install @antv/g-lottie-player --save
```

After the canvas is initialized and the Lottie file is loaded, you can create a Lottie animation object and render it to the canvas to get a [Group](https://g.antv.antgroup.com/api/basic/group). You can then transform it arbitrarily, such as scaling or moving it to a specific location:

```ts
import { loadAnimation } from '@antv/g-lottie-player';

(async () => {
  // Get canvas from context
  const { canvas } = chart.getContext();
  await canvas.ready;

  // Load Lottie file
  const lottieJSON = await fetch(
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*C9f6TaadHikAAAAAAAAAAAAADmJ7AQ',
  ).then((res) => res.json());

  // Create animation
  const animation = loadAnimation(lottieJSON, { loop: true, autoplay: true });
  // Render to canvas to get Group container
  const wrapper = animation.render(canvas);
  // Manipulate the container arbitrarily, e.g., move to a specific position
  wrapper.scale(0.5);
  wrapper.translate(160, 100);
})();
```

The effect is as follows:

<img alt="lottie" src="https://gw.alipayobjects.com/zos/raptor/1668509306888/Nov-15-2022%25252018-48-05.gif" alt="lottie animation">

For more animation control options, please refer to: [Lottie Animation Documentation](https://g.antv.antgroup.com/api/animation/lottie#lottieanimation).
