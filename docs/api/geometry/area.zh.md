---
title: Area
order: 4
---

Area 几何标记类。<br />常用于绘制面积图。<br />

<a name="b821e2f0"></a>

## 继承关系

<br />↳ [Path](./path)<br />
<br />↳ **Area**<br />

<a name="d3474432"></a>

## 创建方式

```typescript
chart.area();
view.area();
```

<a name="3d0a2df9"></a>

### 参数

<br />• **connectNulls**? : _boolean_<br />
<br />是否连接空值<br />
<br />• **sortable**? : _boolean_<br />
<br />是否对数据进行排序<br />
<br />• **startOnZero**? : _boolean_<br />
<br />面积图是否从 0 基准线开始填充。<br />

1. 默认值为 `true`，表现如下：<br />![startOnZero_default_true](https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png#align=left&display=inline&height=500&margin=%5Bobject%20Object%5D&originHeight=500&originWidth=800&status=done&style=none&width=800)
2. 当值为 `false` 时，表现如下：<br />![startOnZero_default_false](https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png#align=left&display=inline&height=500&margin=%5Bobject%20Object%5D&originHeight=500&originWidth=800&status=done&style=none&width=800)

<br />• **theme**? : _object_<br />
<br />主题配置<br />
<br />• **visible**? : _boolean_<br />
<br />是否可见
