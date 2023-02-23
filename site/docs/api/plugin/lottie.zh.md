---
title: lottie
order: 2
---

[Lottie](https://airbnb.design/lottie/) 能极大丰富动画的描述能力。在可视化叙事中也有不错的使用场景。

在 G2 中通过 [@antv/g-lottie-player](https://g.antv.antgroup.com/api/animation/lottie) 可以将 Lottie 加入画布。同时提供简单的动画控制方法例如播放、暂停以及跳转到指定时刻或帧，加入到画布后就可以像基础图形一样任意操作它们。

## 开始使用

首先安装 `@antv/g-lottie-player` 播放器：

```bash
npm install @antv/g-lottie-player --save
```

等待画布初始化、Lottie 文件加载完成后，即可创建 Lottie 动画对象，随后渲染到画布得到一个 [Group](https://g.antv.antgroup.com/api/basic/group)，可任意对它进行变换，例如缩放或者移动到指定地点：

```ts
import { loadAnimation } from '@antv/g-lottie-player';

(async () => {
  // 从上下文中获取画布
  const { canvas } = chart.getContext();
  await canvas.ready;

  // 加载 Lottie 文件
  const lottieJSON = await fetch(
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*C9f6TaadHikAAAAAAAAAAAAADmJ7AQ',
  ).then((res) => res.json());

  // 创建动画
  const animation = loadAnimation(lottieJSON, { loop: true, autoplay: true });
  // 渲染到画布，得到 Group 容器
  const wrapper = animation.render(canvas);
  // 任意操作容器，例如移动到指定位置
  wrapper.scale(0.5);
  wrapper.translate(160, 100);
})();
```

效果如下：

<img alt="lottie" src="https://gw.alipayobjects.com/zos/raptor/1668509306888/Nov-15-2022%25252018-48-05.gif" alt="lottie animation">

更多动画控制选项可以参考：[Lottie Animation 文档](https://g.antv.antgroup.com/api/animation/lottie#lottieanimation)。
