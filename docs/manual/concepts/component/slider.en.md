---
title: 滑块
order: 6
---

在 G2 绘制大数据量图表的时候，Slider 可以作为数据范围的选择插件，尤其适用于大数据量的图表绘制，帮助用户更好地关注某一范围的数据可视化结果。

使用例子：

<playground path="area/basic/demo/area-large.ts"></playground>

Slider 在 G2 4.0 中作为内置组件，方便使用。

## 使用方式

- 按需引入

如果使用 G2 core 进行自定义按需引入，可以参考：

```typescript
import Slider from '@antv/g2/lib/chart/controller/slider';
import { registerComponentController, Chart } from '@antv/g2/lib/core';

// 引入 slider 组件
registerComponentController('slider', Slider);

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 440,
  padding: [16, 32, 64, 32],
});

chart.data(DATA);

chart.option('slider', {
  end: 0.8,
});

chart.render();
```

- 全量引入

如果全量引入，那么 Slider 作为 G2 内置组件，可以直接使用。

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 440,
  padding: [16, 32, 64, 32],
});

chart.data(DATA);

chart.option('slider', {
  end: 0.8,
});

chart.render();
```

## 配置项

Slider 全量配置项见 [Slider API](../../../api/general/slider)
