---
title: 自定义分面
order: 3
---

## 简介

分面（Facet）是指利用 G2 提供的 View 递归嵌套能力，可以根据一定的规则对画布的分割画布，形成多个子 View，然后在子 View 中绘制对应的数据和图形，常用于多维数据分析。

G2 的分面大概的使用方式如下：

```typescript
const chart = new Chart({
  container: '#container',
  // ...
});

chart.facet(facatType, {
  ...facetConfig,
});
```

目前 G2 内置的分面包括五种：

- rect
- list
- matrix
- circle
- tree

具体的使用方式，配置数据结构，见[分面文档](../../api/general/facet)。

> 如果以上内置分面无法满足自己的定制需求，那么可以尝试 G2 提供的自定义分面能力。

下面我们将介绍如何开发一个自定义分面？这包括几个部分：

1. 分面子 View 的定位逻辑
1. 自定义分面机制
1. 实现自定义分面类

## 子 View 定位

分面的核心逻辑是将当前 View 大小，根据数据拆分成多个子 view。

G2 中 View 可以拥有多个子 view，形成无限的嵌套逻辑。而子 View 的大小通过 region 属性来确定自身大小。类型定义如下：

```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

type Region = {
  readonly start: Point;
  readonly end: Point;
};
```

其中 start、end 中的 x y 都是 0 ~ 1 的数字，表示子 view 的位置大小占父 view 的比例。举个例子：

```typescript
const region = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0.5 },
};
```

view 的 region 为以上数据的时候，那么这个 view 占整个画布空间的上半部分。

## 自定义分面机制

G2 提供自定义分面能力，实现并注册一个自定义分面的机制，大概如下代码：

```typescript
import { registerFacet, Facet } from '@antv/g2';

// 实现一个自定义分面，继承 G2 分面基类
class MyFacet extends Facet {
  // TODO 实现自己的分面逻辑
}

// 注册自定义分面到 G2 中
registerFacet('my-facet', Facet);

// 消费自己的自定义分面
const chart = new Chart({
  /*...*/
});

chart.facet('my-facet', {
  /* facetConfig */
});
```

## 实现自定义分面

> 基于上面自定义分面机制，实现自定义分面的核心内容就是开发自定义分面类 `MyFacet` 。

```typescript
import { Datum, Facet, FacetCfg, FacetData, View } from '@antv/g2';

interface MyFacetCfg extends FacetCfg {
  // TODO
}

interface MyFacetData extends FacetData {
  // TODO
}

class MyFacet extends Facet<MyFacetCfg, MyFacetData> {
  protected afterEachView(view: View, facet: MyFacetCfg) {}

  protected beforeEachView(view: View, facet: MyFacetCfg) {}

  protected generateFacets(data: Datum[]): MyFacetCfg[] {
    return [];
  }

  protected getXAxisOption(x: string, axes: any, option: object, facet: MyFacetCfg): object {
    return undefined;
  }

  protected getYAxisOption(y: string, axes: any, option: object, facet: MyFacetCfg): object {
    return undefined;
  }
}
```

### 1. 类型定义

首先定义 Facet 的配置 MyFacetCfg、分面数据的类型定义 MyFacetData。

### 2. 继承基类

继承 G2 提供的基类 Facet，Facet 有 5 个抽象方法必须实现，分别是：

- beforeEachView
- afterEachView
- generateFacets
- getXAxisOption
- getYAxisOption

1. **beforeEachView、afterEachView**

是初始化每一个子分面 view 的时候的钩子函数，可以用来使用 G2 的 annotation 绘制一些标题等信息。

2. **generateFacets**

generateFacets  是自定义分面的核心方法。方法返回一个分面数据的数组，每一个分面数据中包含：

- data：分面子 view 的数据
- region：分面子 View 的位置大小信息
- 分面标记信息：比如 rect 中行列 index
- 其他信息：比如 rect 中，行列的分面字段 field 等等

3. **getXAxisOption、getYAxisOption**

是根据每个分面来决定是否显示分面 view 中的坐标轴组件。

### 3. 注册使用

利用 G2 的自定义分面机制来消费使用。

```typescript
import { registerFacet } from '@antv/g2';

// 注册
registerFacet('my-facet', MyFacet);

// 使用
chart.facet('my-facet', MyFacetCfg);
```

## 源码参考

具体的实现逻辑，可以参考 G2 源码中[rect 分面](https://github.com/antvis/G2/blob/master/src/facet/rect.ts)的实现逻辑。
