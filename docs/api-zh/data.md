<!-- ## chart.data(_data_) 绑定数据 -->

`markdown:docs/common/style.md`

<div class='custom-api-docs'>

绑定数据，之前的调用方法为 `source`，将在 V4.1 移除。_data_ 为 json 数组。

```js
// highlight-start
chart.data(data);
chart.source(data);
// highlight-end

chart.data([
  { city: '杭州', sale: 100 },
  { city: '上海', sale: 110 },
]);
```

</div>
