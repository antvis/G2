---
title: 图表交互
order: 17
---

G2 默认内置的交互包括：

1. active 激活；
2. select 选中。

## 激活

开启以及关闭 shape 对于鼠标 hover 时的响应效果，G2 默认为各个 shape 内置了 active 效果。

```javascript
geom.active(false); // 关闭默认响应
geom.active(true); // 开启默认响应
```

## 选中

各个几何标记 geom 选中的模式包含如下三种：

1. 不可选中；
2. 单选；
3. 多选；
4. 选中是否可取消选中。

选中模式的设置方式如下：

```javascript
geom.select(false); // 关闭
geom.select(true); // 打开
geom.select([true,] {
  mode: 'single' || 'multiple', // 选中模式，单选、多选
  style: {}, // 选中后 shape 的样式
  cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
  animate: true | false // 选中是否执行动画，默认执行动画
});
```

默认情况下，G2 中只有饼图支持选中交互，其他 geom 的选中模式默认情况下都是关闭的。
