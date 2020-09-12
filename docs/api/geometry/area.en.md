---
title: Area
order: 4
---

Area 几何标记类。常用于绘制面积图。

<a name="b821e2f0"></a>

## 继承关系

↳ [Path](./path)

↳ **Area**

<a name="d3474432"></a>

## 创建方式

```typescript
chart.area();
view.area();
```

<a name="3d0a2df9"></a>

### 参数

• **connectNulls**? : _boolean_

是否连接空值

• **sortable**? : _boolean_

是否对数据进行排序

• **startOnZero**? : _boolean_

面积图是否从 0 基准线开始填充。

1. 默认值为 `true`，表现如下：![startOnZero_default_true](https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png#align=left&display=inline&height=500&margin=%5Bobject%20Object%5D&originHeight=500&originWidth=800&status=done&style=none&width=800)
2. 当值为 `false` 时，表现如下：![startOnZero_default_false](https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png#align=left&display=inline&height=500&margin=%5Bobject%20Object%5D&originHeight=500&originWidth=800&status=done&style=none&width=800)

• **theme**? : _object_

主题配置

• **visible**? : _boolean_

是否可见
