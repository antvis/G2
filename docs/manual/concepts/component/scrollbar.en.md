---
title: 滚动条
order: 7
---

在 G2 绘制大数据量图表的时候，Scrollbar 可以作为图表的滚动交互组件，尤其适用于大数据量的图表绘制，帮助用户更好地关注某一范围的数据可视化结果。

使用例子：

<playgroud path="column/basic/demo/scrollbar.ts"></playground>

Scrollbar 在 G2 4.0 中作为内置组件，方便使用。

## 使用方式

- 按需引入

如果使用 G2 core 进行自定义按需引入，可以参考：

```typescript
import Scrollbar from '@antv/g2/lib/chart/controller/scrollbar';
import { registerComponentController, Chart } from '@antv/g2/lib/core';

// 引入 slider 组件
registerComponentController('scrollbar', Scrollbar);

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 440,
  padding: [16, 32, 64, 32],
});

chart.data(DATA);

chart.option('scrollbar', {
  // 滚动条类型： 'horizontal' / 'vertical'
  type: 'horizontal',
});

chart.render();
```

- 全量引入

如果全量引入，那么 Scrollbar 作为 G2 内置组件，可以直接使用。

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 440,
  padding: [16, 32, 64, 32],
});

chart.data(DATA);

chart.option('scrollbar', {
  // 滚动条类型： 'horizontal' / 'vertical'
  type: 'horizontal',
});

chart.render();
```

### 配置项

Scrollbar 全量配置项见 [Scrollbar API](../../../api/general/scrollbar)。
