---
title: 使用滑块
order: 19
---

在 G2 绘制大数据量图表的时候，Slider 可以作为数据范围的选择插件，尤其适用于大数据量的图表绘制，帮助用户更好地关注某一范围的数据可视化结果。

如下图所示：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*dJbXTrNo2qcAAAAAAAAAAABkARQnAQ)

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

Slider 全量配置项如下：

```typescript
export interface TrendCfg {
  // 数据
  readonly data: number[];
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly backgroundStyle?: object;
  readonly lineStyle?: object;
  readonly areaStyle?: object;
}

export interface SliderOption {
  // 缩略轴高度
  readonly height?: number;

  // 背景趋势的配置
  readonly trendCfg?: TrendCfg;
  readonly backgroundStyle?: any;
  readonly foregroundStyle?: any;
  readonly handlerStyle?: any;
  readonly textStyle?: any;
  // 允许滑动位置
  readonly minLimit?: number;
  readonly maxLimit?: number;
  // 初始位置
  readonly start?: number;
  readonly end?: number;
  /** 滑块文本格式化函数 */
  readonly formatter?: (val: any, datum: Datum, idx: number) => any;
}
```

## 实例

[线上地址](../../../examples/area/basic#area-large)。
